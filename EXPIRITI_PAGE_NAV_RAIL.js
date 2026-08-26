/* EXPIRITI_PAGE_NAV_RAIL_OWNER_START: T23-R2 release candidate. */
(()=>{
  'use strict';
  if(document.querySelector('[data-exp-page-nav-rail]')) return;

  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='/expiriti-r19-preview-20260826/EXPIRITI_PAGE_NAV_RAIL.css';
  css.dataset.expPageNavRailAsset='1';
  let cssReady=false;
  css.addEventListener('load',()=>{
    cssReady=true;
    headerNav.hidden=false;
    update();
  },{once:true});
  document.head.appendChild(css);

  const rail=document.createElement('nav');
  rail.className='exp-page-nav-rail';
  rail.dataset.expPageNavRail='1';
  rail.setAttribute('aria-label','Navegación de página');
  rail.innerHTML=`
    <button class="exp-page-nav-rail__up" type="button" aria-label="Subir aproximadamente una pantalla" title="Subir">↑</button>
    <button class="exp-page-nav-rail__down" type="button" aria-label="Bajar aproximadamente una pantalla" title="Bajar">↓</button>`;
  document.body.appendChild(rail);

  const headerNav=document.createElement('nav');
  headerNav.className='exp-page-nav-header';
  /* Fail closed until this component's own responsive CSS is applied. */
  headerNav.hidden=true;
  headerNav.dataset.expPageNavHeader='1';
  headerNav.setAttribute('aria-label','Historial de navegación');
  headerNav.innerHTML=`
    <button class="exp-page-nav-header__prev" type="button" aria-label="Atrás" title="Atrás">‹</button>
    <button class="exp-page-nav-header__next" type="button" aria-label="Adelante" title="Adelante">›</button>`;

  const prev=headerNav.querySelector('.exp-page-nav-header__prev');
  const next=headerNav.querySelector('.exp-page-nav-header__next');
  const up=rail.querySelector('.exp-page-nav-rail__up');
  const down=rail.querySelector('.exp-page-nav-rail__down');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)');
  prev.addEventListener('click',()=>history.back());
  next.addEventListener('click',()=>history.forward());

  /* EXPIRITI_T25S_HEADER_HISTORY_LEFT_OWNER
     T25: los controles de historial (< >) se montan a la IZQUIERDA del brand.
     REEMPLAZA el punto de montaje T24 ('afterend'); no se agrega un tercer
     override: este sigue siendo el unico lugar donde se inserta headerNav.
     La rejilla del header pasa de 3 a 4 columnas SOLO en >=1024, que es el
     unico rango donde .exp-page-nav-header es visible. */
  const gridStyle=document.createElement('style');
  gridStyle.dataset.expPageNavRailAsset='1';
  gridStyle.textContent='@media(min-width:1024px){#gh-header .gh-container.exp-nav-history-left{grid-template-columns:auto auto minmax(0,1fr) auto}}';
  document.head.appendChild(gridStyle);

  const mountHeaderNav=()=>{
    const container=document.querySelector('#gh-header .gh-container');
    if(!container) return false;
    const brand=container.querySelector(':scope > .gh-brand');
    if(brand){
      if(headerNav.nextElementSibling!==brand) brand.insertAdjacentElement('beforebegin',headerNav);
    }else if(container.firstElementChild!==headerNav){
      container.insertBefore(headerNav,container.firstElementChild);
    }
    container.classList.add('exp-nav-history-left');
    if(cssReady) headerNav.hidden=false;
    return true;
  };

  /* R19 TERMINAL FINAL: motion owner ↑ ↓
     Objetivo:
     - trayectoria natural
     - sin arranque brusco
     - sin repintado estructural por frame
     - sin bounce/overshoot
     - reduced-motion intacto. */

  const scrollDuration=720;
  const scrollDistanceRatio=.62;
  const easeInOutSine=t=>-(Math.cos(Math.PI*t)-1)/2;

  rail.dataset.expScrollTiming='easeInOutSine';
  rail.dataset.expScrollDistanceRatio=String(scrollDistanceRatio);
  rail.dataset.expScrollDurationTarget=String(scrollDuration);

  const scrollingKeys=new Set([
    'PageUp','PageDown','Home','End','ArrowUp','ArrowDown'
  ]);

  let scrollFrame=0;
  let programmaticScroll=false;
  let fullUpdatePendingAfterScroll=false;

  const lightweightScrollState=()=>{
    const root=document.documentElement;
    const max=Math.max(0,root.scrollHeight-innerHeight);
    up.disabled=scrollY<8;
    down.disabled=scrollY>max-8||max<8;
  };

  const finishProgrammaticScroll=()=>{
    programmaticScroll=false;
    rail.classList.remove('is-programmatic-scroll');
    scrollFrame=0;
    rail.dataset.expLastScrollDuration=
      rail.dataset.expLastScrollDuration||'0';

    const pending=fullUpdatePendingAfterScroll;
    fullUpdatePendingAfterScroll=false;

    if(typeof requestUpdate==='function'){
      requestUpdate();
    }
  };

  const cancelScrollAnimation=()=>{
    if(scrollFrame){
      cancelAnimationFrame(scrollFrame);
      scrollFrame=0;
    }

    if(programmaticScroll){
      programmaticScroll=false;
      rail.classList.remove('is-programmatic-scroll');
      fullUpdatePendingAfterScroll=false;

      if(typeof requestUpdate==='function'){
        requestUpdate();
      }
    }
  };

  const move=direction=>{
    cancelScrollAnimation();

    const root=document.documentElement;
    const max=Math.max(0,root.scrollHeight-innerHeight);
    const start=scrollY;
    const startX=scrollX;
    const target=Math.max(
      0,
      Math.min(
        max,
        start+direction*innerHeight*scrollDistanceRatio
      )
    );

    if(Math.abs(target-start)<1){
      lightweightScrollState();
      return;
    }

    if(reduce.matches){
      window.scrollTo({
        left:startX,
        top:target,
        behavior:'instant'
      });
      rail.dataset.expLastScrollDuration='0';
      lightweightScrollState();
      if(typeof requestUpdate==='function') requestUpdate();
      return;
    }

    programmaticScroll=true;
    rail.classList.add('is-programmatic-scroll');

    const started=performance.now();

    const step=now=>{
      const progress=Math.min(
        1,
        (now-started)/scrollDuration
      );

      const eased=easeInOutSine(progress);

      window.scrollTo({
        left:startX,
        top:start+(target-start)*eased,
        behavior:'instant'
      });

      lightweightScrollState();

      if(progress<1){
        scrollFrame=requestAnimationFrame(step);
      }else{
        rail.dataset.expLastScrollDuration=
          String(Math.round(now-started));
        finishProgrammaticScroll();
      }
    };

    scrollFrame=requestAnimationFrame(step);
  };

  up.addEventListener('click',()=>move(-1));
  down.addEventListener('click',()=>move(1));

  addEventListener('wheel',cancelScrollAnimation,{passive:true});
  addEventListener('touchstart',cancelScrollAnimation,{passive:true});

  /* pointerdown sobre los propios botones NO cancela el nuevo click;
     pointerdown externo sí cancela una trayectoria en curso. */
  addEventListener('pointerdown',event=>{
    if(event.target===up||event.target===down) return;
    cancelScrollAnimation();
  },{passive:true});

  addEventListener('keydown',event=>{
    const target=event.target;
    const typing=target instanceof HTMLElement
      &&(
        target.isContentEditable
        ||/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName)
      );

    if(
      scrollingKeys.has(event.key)
      ||(event.key===' '&&!typing)
    ){
      cancelScrollAnimation();
    }
  });

  const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
  const visible=node=>{
    const style=getComputedStyle(node),rect=node.getBoundingClientRect();
    return style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)!==0
      &&rect.width>0&&rect.height>0&&rect.bottom>0&&rect.top<innerHeight;
  };
  const fixedCollisionFor=rect=>{
    return [...document.body.querySelectorAll('*')].some(node=>{
      if(node===rail||node.closest('[data-exp-page-nav-rail]')) return false;
      const style=getComputedStyle(node);
      return style.position==='fixed'&&visible(node)&&intersects(rect,node.getBoundingClientRect());
    });
  };

  const normalizeSiteMap=()=>{
    document.querySelectorAll('#toc .toc-toggle').forEach(button=>{
      const toc=button.closest('#toc');
      if(!toc) return;
      if(button.dataset.expT23MapNormalized!=='1'){
        button.dataset.expT23MapNormalized='1';
        if(!button.querySelector('.exp-t23-site-map-icon')) button.insertAdjacentHTML('afterbegin','<img class="exp-t23-site-map-icon" src="/expiriti-r19-preview-20260826/IMG/ubicacion.png" alt="" width="22" height="22">');
        if(!button.querySelector('span')) button.insertAdjacentHTML('beforeend','<span>Mapa de sitio</span>');
      }
      if(document.body.classList.contains('page-servicios')&&toc.dataset.expT23MapEscapeBound!=='1'){
        toc.dataset.expT23MapEscapeBound='1';
        document.addEventListener('keydown',event=>{
          if(event.key!=='Escape'||toc.classList.contains('collapsed')) return;
          toc.classList.add('collapsed');
          toc.classList.remove('open');
          toc.setAttribute('aria-hidden','true');
          requestUpdate();
        });
      }
      let links=toc.querySelector('.exp-t23-site-map-links');
      if(!links){
        links=document.createElement('div');
        links.className='exp-t23-site-map-links';
        links.id=`${toc.id||'toc'}-sections`;
        links.setAttribute('role','navigation');
        links.setAttribute('aria-label','Secciones');
        [...toc.querySelectorAll(':scope > a')].forEach(link=>links.appendChild(link));
        toc.appendChild(links);
      }
      const open=!toc.classList.contains('collapsed');
      const label=open?'Secciones':'Mapa de sitio';
      button.setAttribute('aria-label',label);
      button.setAttribute('aria-expanded',String(open));
      button.setAttribute('aria-controls',links.id);
      button.title=label;
      const text=button.querySelector('span');
      if(text&&text.textContent!==label) text.textContent=label;
      const title=toc.querySelector('.toc-title');
      if(title){
        if(title.textContent.trim()!=='Secciones') title.textContent='Secciones';
        title.hidden=open;
        title.setAttribute('aria-hidden',String(open));
      }
    });
    document.querySelectorAll('#toc[aria-label]').forEach(toc=>toc.setAttribute('aria-label','Secciones'));
  };
  const normalizeLightning=()=>{
    if(!document.body.matches('.page-sistemas,.page-servicios')) return;
    document.querySelectorAll('#toc-actions .toc-toggle,#svc-actions .toc-toggle').forEach(button=>{
      if(button.dataset.expT23LightningBound==='1') return;
      button.dataset.expT23LightningBound='1';
      button.classList.add('exp-t23-lightning-pulse');
      const stop=()=>button.classList.add('is-interacted');
      button.addEventListener('pointerdown',stop,{once:true,passive:true});
      button.addEventListener('keydown',stop,{once:true});
    });
  };
  const normalizeSystemBackLink=()=>{
    if(!document.body.classList.contains('page-sistemas')) return;
    document.querySelectorAll('main.container.hero > a.hint[href^="/expiriti-r19-preview-20260826/index.html#productos-con"]').forEach(link=>{
      if(link.textContent.trim()!=='← Volver a sistemas') link.textContent='← Volver a sistemas';
      const hero=link.parentElement;
      const logoLine=hero?.querySelector(':scope > .exp-t19-system-hero-line');
      if(logoLine&&logoLine.nextElementSibling!==link) logoLine.insertAdjacentElement('afterend',link);
    });
  };

  let fullScheduled=false;
  let scrollScheduled=false;
  let scrollIdleTimer=0;

  const update=()=>{
    fullScheduled=false;

    /* Structural work happens outside the animation frames. */
    normalizeSystemBackLink();
    normalizeSiteMap();
    normalizeLightning();
    mountHeaderNav();

    const root=document.documentElement;
    const max=Math.max(0,root.scrollHeight-innerHeight);

    up.disabled=scrollY<8;
    down.disabled=scrollY>max-8||max<8;

    rail.classList.remove(
      'is-context-hidden',
      'is-tight-gutter'
    );

    rail.hidden=
      root.classList.contains('gh-open')
      ||[
        ...document.querySelectorAll(
          '[aria-modal="true"]:not([hidden]),'
          +'.svc-modal[role="dialog"]:not([hidden]),'
          +'#svcModal:not([hidden])'
        )
      ].some(visible);

    if(rail.hidden) return;

    if(innerWidth>=1280){
      const content=
        document.querySelector(
          'main > .container,main > .wrap,'
          +'main .container,main .wrap'
        )
        ||document.querySelector('main')
        ||document.querySelector(
          '.wrap,.container,[class*="container"]'
        );

      const tight=
        (content?.getBoundingClientRect().left??0)<58;

      rail.classList.toggle(
        'is-tight-gutter',
        tight
      );

      root.classList.toggle(
        'exp-page-nav-rail-desktop-visible',
        !tight
      );
    }else{
      root.classList.remove(
        'exp-page-nav-rail-desktop-visible'
      );
    }

    rail.classList.toggle(
      'is-context-hidden',
      fixedCollisionFor(
        rail.getBoundingClientRect()
      )
    );
  };

  const requestUpdate=()=>{
    if(programmaticScroll){
      fullUpdatePendingAfterScroll=true;
      return;
    }

    if(fullScheduled) return;

    fullScheduled=true;
    requestAnimationFrame(update);
  };

  const requestScrollUpdate=()=>{
    if(!scrollScheduled){
      scrollScheduled=true;

      requestAnimationFrame(()=>{
        scrollScheduled=false;
        lightweightScrollState();
      });
    }

    if(programmaticScroll) return;

    clearTimeout(scrollIdleTimer);

    /* Full DOM/collision reconciliation only once after
       the user's scroll settles. */
    scrollIdleTimer=setTimeout(
      requestUpdate,
      110
    );
  };

  addEventListener(
    'scroll',
    requestScrollUpdate,
    {passive:true}
  );

  addEventListener(
    'resize',
    requestUpdate,
    {passive:true}
  );

  new MutationObserver(()=>{
    if(programmaticScroll){
      fullUpdatePendingAfterScroll=true;
      return;
    }
    requestUpdate();
  }).observe(
    document.documentElement,
    {
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:['class','hidden']
    }
  );

  update();
})();
/* EXPIRITI_PAGE_NAV_RAIL_OWNER_END */
