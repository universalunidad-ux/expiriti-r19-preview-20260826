const Q=(s,c=document)=>c.querySelector(s),QA=(s,c=document)=>Array.from(c.querySelectorAll(s));

/* 1) Servicios complementarios: <li> completo como link */
(()=>{QA('#servicios-complementarios .svc-link[data-url]').forEach(e=>{const t=()=>{const t=e.getAttribute("data-url");t&&(window.location.href=t)};e.addEventListener("click",t),e.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),t())})})})();

/* 2) BASE PROD ROOT */
(()=>{const abs=p=>{if(!p)return p;if(/^https?:\/\//i.test(p)||/^(mailto:|tel:|data:|blob:|javascript:)/i.test(p))return p;if(p.startsWith("/")){const gh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),base=gh&&seg?"/"+seg:"";if(gh&&base&&(p===base||p.startsWith(base+"/")))return p;return gh&&base?base+p:p}if(p.startsWith("../"))return"/"+p.replace(/^(\.\.\/)+/,"");if(p.startsWith("./"))return"/"+p.replace(/^\.\//,"");return"/"+p};window.__EXP_ABS__=window.__EXP_ABS__||abs;const y=document.getElementById("gf-year")||document.getElementById("year");y&&(y.textContent=(new Date).getFullYear())})();


/* 3) TOC flotante */
(()=>{const toc=Q("#toc"),openBtn=Q("#tocToggle"),closeBtn=toc?.querySelector(".toc-close");if(!toc||!openBtn||!closeBtn)return;openBtn.addEventListener("click",e=>{e.stopPropagation(),toc.classList.toggle("collapsed")}),closeBtn.addEventListener("click",()=>toc.classList.add("collapsed")),toc.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>toc.classList.add("collapsed"))),document.addEventListener("click",e=>{toc.contains(e.target)||e.target===openBtn||toc.classList.add("collapsed")})})();

/* 4) listSlider legacy owner removed by T23; see the consolidated owner below. */

/* EXPIRITI_COURSE_FILTER_OWNER_START */
/* 5) Píldoras (filtros) */
(()=>{const C="__span2",upd=s=>{const g=Q(".feature-grid",s);if(!g)return;const c=QA(".fcard",g);c.forEach(x=>x.classList.remove(C));const v=c.filter(x=>x.offsetParent!==null&&getComputedStyle(x).display!=="none"&&!x.hidden);v.length&&v.length%2===1&&v[v.length-1].classList.add(C)};QA("#caracteristicas").forEach(s=>{const p=QA(".pillbar .pill",s),g=Q(".feature-grid",s);if(!p.length||!g)return;const c=QA(".fcard",g),a=t=>{c.forEach(x=>{x.style.display=!t||x.classList.contains("tag-"+t)?"":"none"}),upd(s)};p.forEach(b=>b.addEventListener("click",()=>{p.forEach(x=>x.classList.remove("active")),b.classList.add("active"),a(b.dataset.filter||"")}));const f=p[0];f?(f.classList.add("active"),a(f.dataset.filter||"")):upd(s)})})();
/* EXPIRITI_COURSE_FILTER_OWNER_END */

/* 6) FAQ: activación controlada; cero desplazamiento salvo revelado mínimo */
(()=>{const wrap=Q("#faqWrap,#faq .faq-wrap");if(!wrap)return;wrap.style.overflowAnchor="none";window.__EXP_FAQ_LAST_TRACE__=null;QA(".faq-item",wrap).forEach(item=>{const summary=Q(":scope > summary",item);if(!summary)return;summary.addEventListener("pointerdown",event=>{if(event.isPrimary&&event.pointerType==="mouse"&&event.button===0){event.preventDefault();summary.focus({preventScroll:true})}},{passive:false});summary.addEventListener("click",event=>{event.preventDefault();const root=document.scrollingElement,scrollBefore=root.scrollTop,wasOpen=item.open;QA(".faq-item",wrap).forEach(other=>{if(other!==item)other.open=false});item.open=!wasOpen;summary.focus({preventScroll:true});const safeBottom=(window.visualViewport?.height||window.innerHeight)-20,clipped=item.open?Math.max(0,item.getBoundingClientRect().bottom-safeBottom):0;if(clipped>.5)root.scrollTop+=clipped;const visibleDelta=root.scrollTop-scrollBefore;window.__EXP_FAQ_LAST_TRACE__={scrollBefore,scrollAfter:root.scrollTop,clippedReveal:clipped,visibleDelta};wrap.dataset.expFaqVisibleDelta=visibleDelta.toFixed(3);wrap.dataset.expFaqClippedReveal=clipped.toFixed(3)})})})();

/* 7) Carrusel de sistemas (.carouselX) — UI + dots + links opcionales */
(()=>{const ensureUI=root=>{let prev=root.querySelector(".arrowCircle.prev"),next=root.querySelector(".arrowCircle.next");prev||(prev=document.createElement("button"),prev.className="arrowCircle prev",prev.setAttribute("aria-label","Anterior"),prev.innerHTML='<span class="chev">‹</span>',root.appendChild(prev)),next||(next=document.createElement("button"),next.className="arrowCircle next",next.setAttribute("aria-label","Siguiente"),next.innerHTML='<span class="chev">›</span>',root.appendChild(next));let dotsWrap=root.querySelector(".group-dots");return dotsWrap||(dotsWrap=document.createElement("div"),dotsWrap.className="group-dots",root.appendChild(dotsWrap)),{prev,next,dotsWrap}};QA(".carouselX").forEach(root=>{const track=root.querySelector(".track");if(!track)return;const items=QA(".sys",root);if(!items.length)return;items.forEach(it=>{const href=it.getAttribute("data-href");if(!href)return;it.setAttribute("role","link"),it.setAttribute("tabindex","0");const go=()=>{location.href=window.__EXP_ABS__?window.__EXP_ABS__(href):href};it.addEventListener("click",go),it.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),go())})});const{prev,next,dotsWrap}=ensureUI(root),perView=()=>window.innerWidth<=980?1:3,viewportW=()=>track.clientWidth||root.clientWidth||1,pageCount=()=>Math.max(1,Math.ceil((track.scrollWidth-1)/viewportW()));let idx=0,dots=[];const paint=j=>dots.forEach((d,i)=>d.classList.toggle("active",i===j)),toggleUI=()=>{const multi=pageCount()>1;prev.style.display=multi?"":"none",next.style.display=multi?"":"none",dotsWrap.style.display=multi?"":"none"},buildDots=()=>{dotsWrap.innerHTML="";const total=pageCount();dots=[...Array(total)].map((_,j)=>{const b=document.createElement("button");return b.className="dot"+(j===0?" active":""),b.setAttribute("aria-label","Ir a página "+(j+1)),b.addEventListener("click",()=>{window.pauseAllYTIframes&&window.pauseAllYTIframes(),go(j)}),dotsWrap.appendChild(b),b})},go=j=>{const total=pageCount();idx=((j%total)+total)%total;const startIdx=Math.min(idx*perView(),items.length-1),first=items[startIdx],baseLeft=idx===0?0:first?first.offsetLeft-(track.firstElementChild?.offsetLeft||0):idx*viewportW(),maxLeft=Math.max(0,track.scrollWidth-viewportW()),left=Math.min(Math.max(0,baseLeft),maxLeft);track.scrollTo({left,behavior:"smooth"}),paint(idx),toggleUI()};buildDots(),prev.addEventListener("click",()=>{window.pauseAllYTIframes&&window.pauseAllYTIframes(),go(idx-1)}),next.addEventListener("click",()=>{window.pauseAllYTIframes&&window.pauseAllYTIframes(),go(idx+1)}),track.addEventListener("scroll",()=>{const i=Math.round(track.scrollLeft/viewportW());i!==idx&&(idx=i,paint(idx))}),window.addEventListener("resize",()=>{dots.length!==pageCount()&&buildDots(),setTimeout(()=>go(idx),0)});const resetStart=()=>{track.scrollLeft=0,idx=0,paint(0),toggleUI()};requestAnimationFrame(resetStart),window.addEventListener("load",()=>setTimeout(resetStart,0)),window.addEventListener("pageshow",resetStart),track.style.overflowX="auto",track.style.scrollBehavior="smooth",toggleUI(),go(0)})})();

/* 8) Gestor YouTube (pausa entre videos) + carga lazy API */
(()=>{window.exPlayers||(window.exPlayers=[]),window.pauseAllYTIframes||(window.pauseAllYTIframes=exceptPlayer=>{(window.exPlayers||[]).forEach(p=>{if(!p||p===exceptPlayer)return;try{if("function"==typeof p.getPlayerState&&"function"==typeof p.pauseVideo){const s=p.getPlayerState();(s===1||s===3)&&p.pauseVideo()}}catch(e){}})});const onPlayerStateChange=e=>{1===e.data&&window.pauseAllYTIframes(e.target)},initYTPlayers=()=>{if(!(window.YT&&window.YT.Player))return;document.querySelectorAll('iframe[src*="youtube"]').forEach(iframe=>{if(iframe.dataset.ytInit)return;iframe.dataset.ytInit="1";let src=iframe.src||"";src&&!src.includes("enablejsapi=1")&&(src+=(src.includes("?")?"&":"?")+"enablejsapi=1",iframe.src=src);try{const player=new YT.Player(iframe,{events:{onStateChange:onPlayerStateChange}});window.exPlayers.push(player)}catch(e){}})},prevOnReady=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{"function"==typeof prevOnReady&&prevOnReady(),initYTPlayers()};const loadYTApiOnce=()=>{if(window.__YT_API_LOADING__||window.YT&&window.YT.Player)return;window.__YT_API_LOADING__=!0;const tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api",document.head.appendChild(tag)};window.__ensureYTApiLoaded__=loadYTApiOnce,window.__initYTPlayersExpiriti__=initYTPlayers})();

/* 9) Carrusel REELS (título 1-línea + oculta flechas si 1) */
(()=>{const ensureDots=(root,count)=>{let nav=root.querySelector(".carousel-nav");nav||(nav=document.createElement("div"),nav.className="carousel-nav",nav.setAttribute("aria-label","Paginación de reels"),root.appendChild(nav)),nav.innerHTML="";for(let i=0;i<count;i++){const b=document.createElement("button");b.className="dot"+(i===0?" active":""),b.type="button",b.setAttribute("aria-label",`Ir al reel ${i+1}`),nav.appendChild(b)}return[...nav.querySelectorAll(".dot")]},findTitleEl=scope=>{let t=scope.querySelector("[data-reel-title]");if(t)return t;const all=[...scope.querySelectorAll(".reel-title")];return all.length?(all.slice(1).forEach(x=>x.style.display="none"),all[0]):null};QA('.carousel[id^="carouselReels"]').forEach(root=>{const scope=root.closest("aside")||root,track=root.querySelector(".carousel-track"),slides=[...(track?.querySelectorAll(".carousel-slide")||[])],prev=root.querySelector(".arrowCircle.prev"),next=root.querySelector(".arrowCircle.next"),titleEl=findTitleEl(scope);if(titleEl&&titleEl.classList.add("active"),!track||!slides.length){prev&&(prev.style.display="none"),next&&(next.style.display="none");const nav=root.querySelector(".carousel-nav");return nav&&(nav.style.display="none"),void(titleEl&&(titleEl.textContent=""))}const titles=slides.map(sl=>{const dt=sl.getAttribute("data-title");if(dt)return dt.trim();const wrap=sl.querySelector(".reel-embed"),wdt=wrap?.getAttribute("data-title");if(wdt)return wdt.trim();const ifr=sl.querySelector("iframe"),it=ifr?.getAttribute("title");return(it||"").trim()});let dots=[...root.querySelectorAll(".carousel-nav .dot")];dots.length!==slides.length&&(dots=ensureDots(root,slides.length));const multi=slides.length>1;prev&&(prev.style.display=multi?"":"none"),next&&(next.style.display=multi?"":"none");const nav=root.querySelector(".carousel-nav");nav&&(nav.style.display=multi?"":"none");let idx=0;const paint=()=>{dots.forEach((d,di)=>d.classList.toggle("active",di===idx)),slides.forEach((sl,si)=>sl.classList.toggle("is-active",si===idx)),titleEl&&(titleEl.textContent=titles[idx]||"")},setActive=i=>{window.pauseAllYTIframes&&window.pauseAllYTIframes();/* EXPIRITI_RC1_CAROUSEL_STABILITY_OWNER: wrap instantaneo + lock del sync de scroll */const prev=idx;idx=(i+slides.length)%slides.length;const wrap=Math.abs(idx-prev)>1;root.__expNavLock=performance.now()+(wrap?260:520);const w=track.clientWidth||root.clientWidth||1;track.scrollTo({left:w*idx,behavior:wrap?"instant":"smooth"}),paint()/* EXPIRITI_RC1R2_WRAP_INSTANT_FIX */};dots.forEach((d,i)=>d.addEventListener("click",()=>setActive(i))),prev?.addEventListener("click",()=>setActive(idx-1)),next?.addEventListener("click",()=>setActive(idx+1)),track.addEventListener("scroll",()=>{if(performance.now()<(root.__expNavLock||0))return;/* RC1 */const w=track.clientWidth||1,i=Math.round(track.scrollLeft/w);i!==idx&&i>=0&&i<slides.length&&(idx=i,paint())}),window.addEventListener("resize",()=>setActive(idx)),setActive(0)})})();

/* 10) YT-LITE owner removed: no active ytLite markup; static media owner is authoritative. */

/* 11) Paginador de servicios complementarios */
(()=>{"use strict";

if(window.__EXP_SVC_COMPLEMENT_PAGER_V1010__)return;
window.__EXP_SVC_COMPLEMENT_PAGER_V1010__=true;
/* R17: owner legacy neutralizado. Reconstruía el grid y conservaba referencias
   stale a flechas que el owner R10R sustituye por clones. */
return;

const boot=()=>{

  const root=document.querySelector(
    "#servicios-complementarios"
  );

  if(!root)return;

  if(root.dataset.expPagerV1010==="1")return;

  root.dataset.expPagerV1010="1";


  const grid=root.querySelector(
    ".svc-grid"
  );

  const prev=root.querySelector(
    ".svc-prev"
  );

  const next=root.querySelector(
    ".svc-next"
  );


  if(!grid||!prev||!next)return;


  const mq=matchMedia(
    "(min-width:981px)"
  );


  const originalHTML=
    grid.innerHTML;


  const temp=
    document.createElement("div");

  temp.innerHTML=
    originalHTML;


  const lists=[
    ...temp.querySelectorAll(
      ":scope > .svc-list"
    )
  ];


  const ordered=[];


  const longest=Math.max(
    0,
    ...lists.map(
      list=>list.children.length
    )
  );


  /*
   * Orden visual:
   *
   * A1 B1
   * A2 B2
   *
   * Máximo cuatro cards por página móvil.
   */
  for(
    let row=0;
    row<longest;
    row++
  ){

    lists.forEach(
      list=>{

        const item=
          list.children[row];

        if(item){
          ordered.push(item);
        }
      }
    );
  }


  root.dataset.expOriginalItemCount=
    String(ordered.length);


  let mobileBuilt=false;
  let mobileIndex=0;
  let desktopIndex=0;


  let dots=root.querySelector(
    ".exp-svc-dots"
  );


  if(!dots){

    dots=document.createElement(
      "div"
    );

    dots.className=
      "exp-svc-dots";

    dots.setAttribute(
      "aria-label",
      "Paginación de servicios complementarios"
    );

    grid.insertAdjacentElement(
      "afterend",
      dots
    );
  }


  const mobilePages=()=>[
    ...grid.querySelectorAll(
      ":scope > .exp-svc-mobile-page"
    )
  ];


  const pageLeft=(pages,index)=>{

    if(
      !pages.length
      ||
      !pages[index]
    )return 0;


    return Math.max(
      0,
      pages[index].offsetLeft
      -
      pages[0].offsetLeft
    );
  };


  const nearestIndex=()=>{

    const pages=mobilePages();

    if(!pages.length)return 0;

    if(pages.length===1)return 0;


    const maxScroll=Math.max(
      0,
      grid.scrollWidth-grid.clientWidth
    );


    if(maxScroll<=1)return 0;


    const progress=Math.max(
      0,
      Math.min(
        1,
        grid.scrollLeft/maxScroll
      )
    );


    return Math.max(
      0,
      Math.min(
        pages.length-1,
        Math.round(
          progress*(pages.length-1)
        )
      )
    );
  };


  const paintDots=()=>{

    [
      ...dots.querySelectorAll(
        ".exp-svc-dot"
      )
    ].forEach(
      (dot,index)=>{

        const active=
          index===mobileIndex;


        dot.classList.toggle(
          "is-active",
          active
        );


        dot.setAttribute(
          "aria-current",
          active
            ? "true"
            : "false"
        );
      }
    );
  };


  const buildDots=count=>{

    dots.innerHTML="";


    if(count<=1){

      dots.hidden=true;
      return;
    }


    dots.hidden=false;


    for(
      let index=0;
      index<count;
      index++
    ){

      const dot=
        document.createElement(
          "button"
        );


      dot.type="button";
      dot.className=
        "exp-svc-dot";


      dot.setAttribute(
        "aria-label",
        "Ir al grupo "+(index+1)
      );


      dot.addEventListener(
        "click",
        ()=>{

          const pages=
            mobilePages();


          mobileIndex=index;


          grid.scrollTo({
            left:
              pageLeft(
                pages,
                index
              ),

            behavior:"smooth"
          });


          paintDots();
        }
      );


      dots.appendChild(dot);
    }


    paintDots();
  };


  const buildMobile=()=>{

    if(mobileBuilt)return;


    grid.innerHTML="";


    for(
      let i=0;
      i<ordered.length;
      i+=4
    ){

      const page=
        document.createElement(
          "ul"
        );


      page.className=
        "svc-list exp-svc-mobile-page";


      /*
       * FINAL GEOMETRY OWNER.
       */
      page.style.setProperty(
        "display",
        "grid",
        "important"
      );

      page.style.setProperty(
        "grid-template-columns",
        "repeat(2,minmax(0,1fr))",
        "important"
      );

      page.style.setProperty(
        "grid-auto-flow",
        "row",
        "important"
      );

      page.style.setProperty(
        "gap",
        "12px",
        "important"
      );

      page.style.setProperty(
        "box-sizing",
        "border-box",
        "important"
      );

      page.style.setProperty(
        "margin",
        "0",
        "important"
      );

      page.style.setProperty(
        "padding",
        "0",
        "important"
      );

      page.style.setProperty(
        "list-style",
        "none",
        "important"
      );


      ordered
        .slice(i,i+4)
        .forEach(
          item=>{

            page.appendChild(
              item.cloneNode(true)
            );
          }
        );


      grid.appendChild(page);
    }


    mobileBuilt=true;
    mobileIndex=0;

    grid.scrollLeft=0;


    buildDots(
      mobilePages().length
    );
  };


  const restoreDesktop=()=>{

    if(!mobileBuilt)return;


    grid.innerHTML=
      originalHTML;


    mobileBuilt=false;

    dots.hidden=true;
  };


  const syncMobile=()=>{

    const pages=
      mobilePages();


    mobileIndex=
      nearestIndex();


    const multi=
      pages.length>1;


    prev.hidden=
    next.hidden=
      !multi;


    prev.disabled=
      !multi
      ||
      mobileIndex===0;


    next.disabled=
      !multi
      ||
      mobileIndex===pages.length-1;


    paintDots();
  };


  const renderMobile=()=>{

    buildMobile();
    syncMobile();
  };


  const renderDesktop=()=>{

    restoreDesktop();


    const groups=[
      ...grid.querySelectorAll(
        ":scope > .svc-list"
      )
    ].map(
      list=>[
        ...list.querySelectorAll(
          ":scope > li"
        )
      ]
    );


    const longest=Math.max(
      0,
      ...groups.map(
        group=>group.length
      )
    );


    const pageCount=Math.max(
      1,
      Math.ceil(longest/3)
    );


    desktopIndex=
      (
        (
          desktopIndex
          %
          pageCount
        )
        +
        pageCount
      )
      %
      pageCount;


    groups.forEach(
      group=>{

        group.forEach(
          (item,index)=>{

            const first=
              desktopIndex*3;


            item.style.display=
              (
                index>=first
                &&
                index<first+3
              )
                ? ""
                : "none";
          }
        );
      }
    );


    prev.hidden=
    next.hidden=
      pageCount<=1;


    prev.disabled=
    next.disabled=
      pageCount<=1;


    dots.hidden=true;
  };


  const render=()=>{

    mq.matches
      ? renderDesktop()
      : renderMobile();
  };


  prev.addEventListener(
    "click",
    ()=>{

      if(mq.matches){

        desktopIndex--;
        renderDesktop();

        return;
      }


      const pages=
        mobilePages();


      mobileIndex=
        Math.max(
          0,
          mobileIndex-1
        );


      grid.scrollTo({
        left:
          pageLeft(
            pages,
            mobileIndex
          ),

        behavior:"smooth"
      });


      paintDots();
    }
  );


  next.addEventListener(
    "click",
    ()=>{

      if(mq.matches){

        desktopIndex++;
        renderDesktop();

        return;
      }


      const pages=
        mobilePages();


      mobileIndex=
        Math.min(
          pages.length-1,
          mobileIndex+1
        );


      grid.scrollTo({
        left:
          pageLeft(
            pages,
            mobileIndex
          ),

        behavior:"smooth"
      });


      paintDots();
    }
  );


  /*
   * Swipe NATIVO.
   *
   * No preventDefault.
   * No wheel → horizontal.
   * No pointer capture.
   */
  grid.addEventListener(
    "scroll",
    ()=>{

      if(mq.matches)return;

      /*
       * Actualización inmediata.
       *
       * No preventDefault.
       * No wheel conversion.
       * No pointer capture.
       *
       * Sólo calcula índice + pinta dots/flechas.
       */
      syncMobile();
    },
    {passive:true}
  );


  grid.addEventListener(
    "scrollend",
    ()=>{

      if(mq.matches)return;


      syncMobile();


      const pages=
        mobilePages();


      if(!pages.length)return;


      const target=
        pageLeft(
          pages,
          mobileIndex
        );


      /*
       * El swipe sigue siendo NATIVO.
       * Sólo al terminar el gesto alineamos la página.
       */
      if(
        Math.abs(
          grid.scrollLeft-target
        )>4
      ){

        grid.scrollTo({
          left:target,
          behavior:"smooth"
        });
      }
    },
    {passive:true}
  );


  /*
   * Cards móviles son clones.
   */
  grid.addEventListener(
    "click",
    event=>{

      if(mq.matches)return;


      const item=
        event.target.closest(
          ".svc-link[data-url]"
        );


      if(!item)return;


      const url=
        item.getAttribute(
          "data-url"
        );


      if(url){
        location.href=url;
      }
    }
  );


  grid.addEventListener(
    "keydown",
    event=>{

      if(mq.matches)return;


      if(
        event.key!=="Enter"
        &&
        event.key!==" "
      )return;


      const item=
        event.target.closest(
          ".svc-link[data-url]"
        );


      if(!item)return;


      event.preventDefault();


      const url=
        item.getAttribute(
          "data-url"
        );


      if(url){
        location.href=url;
      }
    }
  );


  mq.addEventListener?.(
    "change",
    render
  );


  window.addEventListener(
    "resize",
    render,
    {passive:true}
  );


  render();
};


document.readyState==="loading"
  ? document.addEventListener(
      "DOMContentLoaded",
      boot,
      {once:true}
    )
  : boot();


window.addEventListener(
  "pageshow",
  boot,
  {passive:true}
);

})();



(function(){"use strict";if(window.__EXP_SVC_ACTIONS__)return;window.__EXP_SVC_ACTIONS__=!0;const D=document,W=window,$=(s,ctx=D)=>ctx.querySelector(s),$$=(s,ctx=D)=>Array.from(ctx.querySelectorAll(s));function safeText(v,fallback=""){return"string"==typeof v&&v.trim()?v.trim():fallback}function esc(str){return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function iconWhats(){return'<svg aria-hidden="true" viewBox="0 0 32 32" width="18" height="18" fill="currentColor"><path d="M19.11 17.21c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.36-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.46.07-.7.35-.24.28-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.72.14.18 1.85 2.83 4.48 3.97.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.64-.67 1.87-1.31.23-.64.23-1.18.16-1.3-.07-.12-.25-.19-.53-.33Z"/><path d="M26.67 5.29A13.21 13.21 0 0 0 16.02 1C8.3 1 2.02 7.29 2.02 15.01c0 2.47.65 4.88 1.88 7L1 31l9.2-2.83a13.98 13.98 0 0 0 5.82 1.29h.01c7.72 0 14-6.29 14-14 0-3.74-1.46-7.25-4.36-10.17ZM16.03 27.1h-.01a11.6 11.6 0 0 1-5.92-1.63l-.42-.25-5.46 1.68 1.78-5.32-.27-.43A11.58 11.58 0 0 1 4.4 15c0-6.41 5.22-11.63 11.64-11.63 3.1 0 6.02 1.21 8.2 3.4a11.54 11.54 0 0 1 3.4 8.21c0 6.42-5.22 11.64-11.61 11.64Z"/></svg>'}function iconPhone(){return'<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.23a2 2 0 0 1 2.11-.45c.83.32 1.71.54 2.61.66A2 2 0 0 1 22 16.92Z"/></svg>'}

const CONTENT={
cursos:{
process:{title:"Cómo armamos el curso",body:["Primero entendemos qué sistemas usan, qué nivel tiene su equipo y qué temas sí necesitan ver.","Después ajustamos el temario por sistema, rol y nivel para que la sesión sea realmente útil.","Impartimos el curso con enfoque práctico y cerramos con dudas, recomendaciones y siguientes pasos."]},
audience:{title:"Ideal para tu equipo",body:["Empresas que acaban de adquirir CONTPAQi y quieren arrancar bien.","Equipos que ya usan el sistema pero lo aprovechan poco.","Despachos o áreas administrativas que necesitan capacitación por rol."]},
cases:{title:"Escenarios comunes",body:["Capacitar a facturistas en Comercial o Factura Electrónica.","Entrenar responsables de nómina en cálculo, timbrado e incidencias.","Reforzar cierres y reportes en Contabilidad para auxiliares o contadores."]},
cta:{title:"Agendar curso",body:["Cuéntanos qué sistemas usan, cuántas personas tomarán la sesión y qué temas les interesan.","Con eso te proponemos modalidad, enfoque y alcance del curso."]}
},
desarrollos:{
process:{title:"Cómo trabajamos tu proyecto",body:["Empezamos entendiendo el problema real, el flujo actual y el resultado que esperan.","Después definimos alcance, propuesta técnica y etapas de trabajo.","Desarrollamos, probamos con casos reales y damos seguimiento después de la entrega."]},
audience:{title:"Ideal para tu empresa",body:["Empresas que hacen procesos manuales repetitivos.","Negocios que necesitan conectar CONTPAQi con otros sistemas.","Equipos que requieren reportes, portales o automatizaciones a la medida."]},
cases:{title:"Casos comunes",body:["Integrar CONTPAQi con eCommerce, delivery o sistemas administrativos.","Crear módulos internos para captura, consulta o autorización.","Automatizar reportes, sincronizaciones o tareas operativas."]},
cta:{title:"Agendar sesión",body:["Compártenos qué proceso quieres mejorar, qué sistemas usas y qué resultado esperas.","Con eso podemos orientarte y plantear una ruta clara de desarrollo."]}
},
migraciones:{
process:{title:"Cómo migramos",body:["Primero revisamos de qué sistema vienes, cuántas empresas son y qué respaldos tienes.","Luego definimos el plan de migración o conversión y hacemos pruebas controladas.","Al final validamos acceso, estructura y puntos clave antes de operar."]},
audience:{title:"Ideal para este servicio",body:["Empresas que cambian de equipo o servidor.","Despachos que quieren consolidarse en CONTPAQi.","Negocios que necesitan convertir información histórica desde otros sistemas."]},
cases:{title:"Casos comunes",body:["Migrar CONTPAQi a otro equipo sin perder empresas ni configuración.","Convertir datos desde ASPEL, Contafiscal o ContaSIX.","Restaurar bases y dejar listo el entorno para continuar operación."]},
cta:{title:"Agendar revisión",body:["Envíanos qué sistema origen tienes, cuántas empresas son y qué archivos o respaldos conservas.","Te diremos el procedimiento correcto antes de tocar tu información."]}
},
implementaciones:{
process:{title:"Cómo implementamos",body:["Revisamos el sistema, el tipo de operación y lo que necesitan dejar funcionando.","Configuramos empresa, parámetros, pruebas y flujo básico.","Cerramos con validación operativa y capacitación inicial."]},
audience:{title:"Ideal para tu operación",body:["Empresas que van arrancando con CONTPAQi.","Negocios que quieren salir a producción sin improvisar.","Equipos que necesitan dejar bien configurado el sistema desde el inicio."]},
cases:{title:"Casos comunes",body:["Implementar Comercial con catálogos, documentos y pruebas.","Configurar Nóminas para timbrar correctamente.","Dejar Contabilidad o Bancos listos para operar y capacitar al usuario."]},
cta:{title:"Agendar implementación",body:["Cuéntanos qué sistema adquiriste, cuántos usuarios lo usarán y qué necesitas dejar listo.","Así te proponemos el mejor arranque."]}
},
soporte:{
process:{title:"Cómo atendemos",body:["Recibimos tu caso, identificamos el error y revisamos si aplica soporte inmediato.","Entramos por remoto o te guiamos según el problema.","Resolvemos, validamos y te decimos cómo evitar que vuelva a ocurrir."]},
audience:{title:"Ideal para tu operación",body:["Usuarios que necesitan resolver incidencias sin detener la operación.","Empresas que usan varios sistemas CONTPAQi.","Equipos que requieren acompañamiento técnico cercano."]},
cases:{title:"Casos comunes",body:["Errores al timbrar, cancelar o abrir empresa.","Problemas de configuración, licencias o conexión.","Dudas operativas en Contabilidad, Nóminas, Bancos, Comercial y nube."]},
cta:{title:"Agendar soporte",body:["Envíanos el sistema, una breve descripción y si puedes una captura del error.","Así entramos más rápido al problema real."]}
},
poliza:{
process:{title:"Cómo funciona la póliza",body:["Primero levantamos usuarios, sistemas y número de empresas.","Con eso definimos el alcance y te proponemos una póliza anual con pagos mensuales.","Después operamos con seguimiento, atención recurrente y mejora continua."]},
audience:{title:"Ideal para tu empresa",body:["Empresas que requieren soporte frecuente.","Operaciones con varios usuarios o varias empresas.","Equipos que quieren continuidad, orden y acompañamiento real."]},
cases:{title:"Casos comunes",body:["Negocios que ya usan CONTPAQi todos los días y no pueden detenerse.","Equipos que combinan soporte, capacitación y ajustes menores.","Operaciones multiempresa que necesitan seguimiento continuo."]},
cta:{title:"Agendar llamada",body:["Compártenos cuántos usuarios atiendes, qué sistemas manejan y cuántas empresas operan.","Con eso te damos una propuesta más clara desde el inicio."]}
},
servidores:{
process:{title:"Cómo montamos tu entorno",body:["Primero revisamos usuarios, sistemas, carga de trabajo y necesidad real de acceso remoto.","Después dimensionamos servidor, accesos, seguridad y respaldo.","Configuramos el entorno y acompañamos la entrada a operación."]},
audience:{title:"Ideal para tu operación",body:["Despachos contables con trabajo remoto.","Empresas con varios usuarios o sucursales.","Equipos que necesitan centralizar CONTPAQi y archivos en un solo entorno."]},
cases:{title:"Casos comunes",body:["Centralizar varias empresas contables en un servidor remoto.","Dar acceso seguro a usuarios que trabajan desde distintas ubicaciones.","Correr CONTPAQi y Excel pesado sin depender de las PCs del equipo."]},
cta:{title:"Agendar sesión",body:["Cuéntanos cuántos usuarios son, qué sistemas usan y si ya tienen bases activas.","Así te proponemos un entorno a la medida."]}
}
};

function getPageConfig(el){const page=safeText(el?.dataset?.svcPage,"soporte").toLowerCase();return CONTENT[page]||CONTENT.soporte}
function getLabels(el){return{process:safeText(el?.dataset?.svcProcessLabel,"Cómo atendemos"),audience:safeText(el?.dataset?.svcAudienceLabel,"Ideal para tu operación"),cases:safeText(el?.dataset?.svcCasesLabel,"Casos comunes"),cta:safeText(el?.dataset?.svcCtaLabel,"Agendar sesión")}}
const SVC_PHONE_TEL="+525568437918",SVC_PHONE_WA="525568437918";
function getServiceName(el){const page=safeText(el?.dataset?.svcPage,"soporte").toLowerCase(),map={cursos:"curso",desarrollos:"desarrollo",migraciones:"migración",implementaciones:"implementación",soporte:"soporte",poliza:"póliza",servidores:"servidor virtual"};return map[page]||"servicio"}
function waHref(msg){return"https://wa.me/"+SVC_PHONE_WA+"?text="+encodeURIComponent(msg)}
const SVC_ASSET=(window.__EXP_ABS__?window.__EXP_ABS__.bind(window):s=>/^(https?:|\/|mailto:|tel:|data:|blob:)/i.test(s)?s:"/"+s.replace(/^(\.\/|\.\.\/)+/,"")),SVC_RELATED_BASE=[{key:"contabilidad",label:"Contabilidad",img:SVC_ASSET("IMG/logos/contabilidad-nsq-160.webp"),srcset:"/IMG/logos/contabilidad-nsq-160.webp 160w, /IMG/logos/contabilidad-nsq-320.webp 320w"},{key:"bancos",label:"Bancos",img:SVC_ASSET("IMG/logos/bancos-nsq-160.webp"),srcset:"/IMG/logos/bancos-nsq-160.webp 160w, /IMG/logos/bancos-nsq-320.webp 320w"},{key:"nominas",label:"Nóminas",img:SVC_ASSET("IMG/logos/nominas-nsq-160.webp"),srcset:"/IMG/logos/nominas-nsq-160.webp 160w, /IMG/logos/nominas-nsq-320.webp 320w"},{key:"xml",label:"XML en Línea",img:SVC_ASSET("IMG/logos/xml-nsq-160.webp"),srcset:"/IMG/logos/xml-nsq-160.webp 160w, /IMG/logos/xml-nsq-320.webp 320w"},{key:"factura",label:"Factura Electrónica",img:SVC_ASSET("IMG/logos/factura-nsq-160.webp"),srcset:"/IMG/logos/factura-nsq-160.webp 160w, /IMG/logos/factura-nsq-320.webp 320w"},{key:"comercialstart",label:"Comercial START",img:SVC_ASSET("IMG/logos/comercial-start-nsq-160.webp"),srcset:"/IMG/logos/comercial-start-nsq-160.webp 160w, /IMG/logos/comercial-start-nsq-320.webp 320w"},{key:"comercialpro",label:"Comercial",img:SVC_ASSET("IMG/logos/comercial-pro-nsq-160.webp"),srcset:"/IMG/logos/comercial-pro-nsq-160.webp 160w, /IMG/logos/comercial-pro-nsq-320.webp 320w"},{key:"comercialpremium",label:"Comercial PREMIUM",img:SVC_ASSET("IMG/logos/comercial-premium-nsq-160.webp"),srcset:"/IMG/logos/comercial-premium-nsq-160.webp 160w, /IMG/logos/comercial-premium-nsq-320.webp 320w"},{key:"contpaqi",label:"CONTPAQi",img:SVC_ASSET("IMG/contpaqi.webp")},{key:"excel",label:"Excel",img:SVC_ASSET("IMG/excel.webp")}];
function getRelatedSystems(page,role,bodyLines){const txt=(bodyLines||[]).join(" ").toLowerCase(),out=[],push=k=>{const it=SVC_RELATED_BASE.find(x=>x.key===k);it&&!out.some(x=>x.key===k)&&out.push(it)};/contabilidad/.test(txt)&&push("contabilidad"),/\bbancos?\b/.test(txt)&&push("bancos"),/(nóminas|nominas)/.test(txt)&&push("nominas"),/(xml en línea|xml en linea|xml)/.test(txt)&&push("xml"),/(factura electrónica|factura electronica)/.test(txt)&&push("factura"),/comercial premium/.test(txt)?push("comercialpremium"):/comercial start/.test(txt)?push("comercialstart"):/comercial/.test(txt)&&push("comercialpro"),"servidores"===page&&(push("contpaqi"),push("excel"));return"audience"===role&&out.length<2?[]:out.slice(0,4)}            
function svcToken(key,text){const it=SVC_RELATED_BASE.find(x=>x.key===key);if(!it)return esc(text||"");return `<span class="svc-inline-token" title="${esc(it.label)}"><img src="${esc(it.img)}"${it.srcset?` srcset="${esc(it.srcset)}" sizes="40px" width="160" height="160" data-r19-logo="dynamic-nsq"`:""} alt="${esc(it.label)}" loading="lazy"><span>${esc(text||it.label)}</span></span>`}
function renderInlineLine(page,role,line){let html=esc(safeText(line));html=html.replace(/Factura Electr[oó]nica/gi,svcToken("factura","Factura Electrónica")).replace(/XML en L[ií]nea/gi,svcToken("xml","XML en Línea")).replace(/Comercial PREMIUM/gi,svcToken("comercialpremium","Comercial PREMIUM")).replace(/Comercial START/gi,svcToken("comercialstart","Comercial START")).replace(/Comercial PRO/gi,svcToken("comercialpro","Comercial PRO")).replace(/N[oó]minas/gi,svcToken("nominas","Nóminas")).replace(/\bContabilidad\b/gi,svcToken("contabilidad","Contabilidad")).replace(/\bBancos\b/gi,svcToken("bancos","Bancos")).replace(/\bComercial\b/gi,svcToken("comercialpro","Comercial"));return"servidores"===page&&"cases"===role?`<p>${html.replace(/\bCONTPAQi\b/gi,svcToken("contpaqi","CONTPAQi")).replace(/\bExcel\b/gi,svcToken("excel","Excel"))}</p>`:`<p>${html}</p>`}
            

            
            function ensureModal(){let modal=$("#svcModal");if(modal)return modal;modal=D.createElement("div"),modal.id="svcModal",modal.className="svc-modal",modal.hidden=!0,modal.innerHTML=`<div class="svc-modal__backdrop" data-close="1"></div><div class="svc-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="svcModalTitle"><button class="svc-modal__close" type="button" aria-label="Cerrar" data-close="1">×</button><div class="svc-modal__body"><h3 id="svcModalTitle" class="title-gradient"></h3><div id="svcModalContent" class="svc-modal__content"></div><div id="svcModalCtas" class="svc-modal__ctas"></div></div></div>`,D.body.appendChild(modal),modal.addEventListener("click",e=>{e.target.closest("[data-close='1']")&&closeModal()}),D.addEventListener("keydown",e=>{"Escape"===e.key&&!modal.hidden&&closeModal()});return modal}
function closeModal(){const modal=$("#svcModal");modal&&(modal.hidden=!0,D.body.classList.remove("svc-modal-open"))}
function openModal(title,bodyLines,role){const modal=ensureModal(),titleEl=$("#svcModalTitle",modal),contentEl=$("#svcModalContent",modal),ctasEl=$("#svcModalCtas",modal),host=$("#svc-actions"),serviceName=getServiceName(host),page=safeText(host?.dataset?.svcPage,"soporte").toLowerCase(),waMsg=`Hola ExpIRI Ti, quiero agendar mi ${serviceName}.`,waLink=waHref(waMsg);titleEl.textContent=title,contentEl.innerHTML=(bodyLines||[]).map(line=>renderInlineLine(page,role,line)).join(""),ctasEl.innerHTML=`<a class="btn btn-grad-green hero-btn" href="${waLink}" target="_blank" rel="noopener"><span>WhatsApp</span>${iconWhats()}</a><a class="btn btn-grad-blue hero-btn" href="tel:${SVC_PHONE_TEL}"><span>Llamar</span>${iconPhone()}</a>`,modal.hidden=!1,D.body.classList.add("svc-modal-open")}
function ensureModalStyles(){if($("#svcModalStyles"))return;const s=D.createElement("style");s.id="svcModalStyles",s.textContent=`.svc-modal[hidden]{display:none!important}.svc-modal{position:fixed;inset:0;z-index:10060;display:grid;place-items:center;padding:18px}.svc-modal__backdrop{position:absolute;inset:0;background:rgba(2,6,23,.54);backdrop-filter:blur(8px) saturate(1.02);-webkit-backdrop-filter:blur(8px) saturate(1.02)}.svc-modal__dialog{position:relative;z-index:1;width:min(760px,calc(100vw - 24px));max-height:min(82svh,720px);overflow:auto;border-radius:28px;border:1px solid rgba(148,163,184,.18);background:linear-gradient(180deg,rgba(15,23,42,.985),rgba(15,23,42,.965));box-shadow:0 36px 100px rgba(0,0,0,.38),0 10px 28px rgba(0,0,0,.18)}html[data-theme="light"] .svc-modal__dialog{background:linear-gradient(180deg,rgba(255,255,255,.995),rgba(248,250,252,.975));border-color:rgba(2,6,23,.10);box-shadow:0 32px 90px rgba(2,6,23,.18),0 8px 24px rgba(2,6,23,.08)}.svc-modal__body{padding:26px 24px 22px}.svc-modal__body h3{margin:0 56px 14px 0;font-size:clamp(28px,3vw,42px);line-height:1.02;font-weight:950;letter-spacing:-.035em}.svc-modal__body h3.title-gradient{background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;-webkit-text-fill-color:#f8fafc!important;color:#f8fafc!important;min-height:0!important}html[data-theme="light"] .svc-modal__body h3.title-gradient{-webkit-text-fill-color:#0f172a!important;color:#0f172a!important}.svc-modal__close{position:absolute;right:14px;top:14px;width:42px;height:42px;border:1px solid rgba(148,163,184,.16);border-radius:999px;background:rgba(255,255,255,.04);color:inherit;font-size:28px;line-height:1;cursor:pointer;display:grid;place-items:center;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}html[data-theme="light"] .svc-modal__close{background:#fff;border-color:rgba(2,6,23,.10)}.svc-modal__close:hover{transform:translateY(-1px);border-color:rgba(96,165,250,.34);box-shadow:0 12px 24px rgba(96,165,250,.12)}.svc-modal__content{display:grid;gap:10px}.svc-modal__content p{position:relative;margin:0;padding:14px 14px 14px 50px;border-radius:18px;border:1px solid rgba(148,163,184,.14);background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.02));line-height:1.62;color:rgba(232,238,246,.92)}html[data-theme="light"] .svc-modal__content p{background:linear-gradient(180deg,rgba(2,6,23,.02),rgba(2,6,23,.01));border-color:rgba(2,6,23,.08);color:rgba(15,23,42,.84)}.svc-modal__content p:before{content:"";position:absolute;left:16px;top:15px;width:22px;height:22px;border-radius:8px;background:linear-gradient(135deg,#14b8a6,#0ea5e9);box-shadow:0 0 0 5px rgba(56,189,248,.12)}.svc-modal__content p:after{content:"";position:absolute;left:23px;top:22px;width:8px;height:8px;border-radius:999px;background:#fff}.svc-inline-token{display:inline-flex!important;align-items:center!important;justify-content:center!important;vertical-align:middle!important;white-space:nowrap!important;padding:5px 10px!important;margin:0 2px!important;border-radius:999px!important;border:1px solid rgba(148,163,184,.16)!important;background:linear-gradient(180deg,rgba(203,213,225,.92),rgba(191,201,214,.86))!important;box-shadow:0 6px 14px rgba(2,6,23,.08)!important}.svc-inline-token img,.svc-modal__content .svc-inline-token img,.svc-modal__content p .svc-inline-token img{display:block!important;width:auto!important;min-width:0!important;max-width:118px!important;height:30px!important;max-height:30px!important;object-fit:contain!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;filter:none!important;transform:none!important}.svc-inline-token span{display:none!important}.svc-modal__ctas{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:16px;padding-top:16px;border-top:1px solid rgba(148,163,184,.14)}.svc-modal__ctas .btn{display:inline-flex;align-items:center;gap:8px}.svc-modal-open{overflow:hidden}@media(max-width:640px){.svc-modal{padding:12px}.svc-modal__dialog{width:min(100vw - 16px,560px);max-height:min(84svh,760px);border-radius:24px}.svc-modal__body{padding:22px 16px 18px}.svc-modal__body h3{margin-right:48px;font-size:clamp(24px,8vw,32px)}.svc-modal__content p{padding:13px 12px 13px 46px;border-radius:16px}.svc-inline-token{padding:4px 8px!important}.svc-inline-token img,.svc-modal__content .svc-inline-token img,.svc-modal__content p .svc-inline-token img{max-width:96px!important;height:24px!important;max-height:24px!important}.svc-modal__ctas{display:grid;grid-template-columns:1fr;gap:10px}.svc-modal__ctas .btn{justify-content:center}}`,D.head.appendChild(s)}
            
            function mountSvcActions(){const host=$("#svc-actions");if(!host||"1"===host.dataset.ready)return;const cfg=getPageConfig(host),labels=getLabels(host);host.dataset.ready="1",host.innerHTML=`<div class="toc-panel svc-actions-panel" hidden><a href="#" data-role="process">${esc(labels.process)}</a><a href="#" data-role="audience">${esc(labels.audience)}</a><a href="#" data-role="cases">${esc(labels.cases)}</a><a href="#" data-role="cta">${esc(labels.cta)}</a></div><button class="toc-toggle svc-actions-toggle" type="button" aria-label="Abrir acciones del servicio">⚡</button>`;const toggle=$(".svc-actions-toggle",host),panel=$(".svc-actions-panel",host),toc=$("#toc"),closePanel=()=>{panel.hidden=!0,host.classList.remove("open")},openPanel=()=>{panel.hidden=!1,host.classList.add("open")},syncWithToc=()=>{const tocOpen=!!(toc&&!toc.classList.contains("collapsed"));tocOpen&&closePanel(),host.setAttribute("aria-hidden",tocOpen?"true":"false")};toggle.addEventListener("click",e=>{e.preventDefault(),panel.hidden?openPanel():closePanel()}),panel.addEventListener("click",e=>{const a=e.target.closest("a[data-role]");if(!a)return;e.preventDefault();const role=a.dataset.role,item=cfg[role];item&&(closePanel(),openModal(item.title,item.body,role))}),D.addEventListener("click",e=>{host.contains(e.target)||closePanel()}),D.addEventListener("keydown",e=>{"Escape"===e.key&&closePanel()}),ensureModalStyles(),toc&&(new MutationObserver(syncWithToc)).observe(toc,{attributes:!0,attributeFilter:["class","hidden"]}),syncWithToc()}
            "loading"===D.readyState?D.addEventListener("DOMContentLoaded",mountSvcActions,{once:!0}):mountSvcActions()})();

/* EXPIRITI TABLE SWIPE MOBILE (aprobado 2026-07): mismo blindaje de tablas que en sistemas */
(()=>{if(window.__EXP_TABLE_SCROLL__)return;window.__EXP_TABLE_SCROLL__=1;const boot=()=>{try{document.querySelectorAll("main table").forEach(t=>{let w=t.closest(".cmp-scroll,.lp-compare-wrap,.pricing-table-nube-wrap,#combined-wrap,.table-scroll");if(!w){w=document.createElement("div");w.className="table-scroll";t.parentNode.insertBefore(w,t);w.appendChild(t)}if(w.matches(".cmp-scroll,.lp-compare-wrap,.pricing-table-nube-wrap,.table-scroll")){w.setAttribute("role","region");w.setAttribute("aria-label",t.getAttribute("aria-label")||"Tabla desplazable horizontalmente");w.tabIndex=0}})}catch(_){}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();

/* Axis-aware wheel for tables and horizontal service controls. */

/* EXPIRITI PARTIALS FALLBACK SERVICIOS */
(()=>{if(window.__EXP_PARTIALS_FALLBACK__)return;window.__EXP_PARTIALS_FALLBACK__=1;const isGh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&seg?"/"+seg:"",parts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?parts.slice(1):parts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./",prefix=p=>{if(!p)return p;if(/^(https?:)?\/\//i.test(p)||/^(mailto:|tel:|data:)/i.test(p)||p.startsWith("#"))return p;if(isGh&&repoBase&&(p===repoBase||p.startsWith(repoBase+"/")))return p;const base=isGh?repoBase+"/":depth;return(base+p).replace(/([^:]\/)\/+/g,"$1")},load=async(id,file)=>{const ph=document.getElementById(id);if(!ph)return;const urls=[prefix("PARTIALS/"+file),"/PARTIALS/"+file].filter(Boolean);for(const u of urls){try{const r=await fetch(u+(u.includes("?")?"&":"?")+"v=2026.08-r19-human8",{cache:"force-cache"});if(!r.ok)continue;const html=await r.text(),template=document.createElement("template");template.innerHTML=html;ph.replaceWith(template.content);return}catch(_){}}console.warn("[Expiriti] partial no cargó",file)},norm=()=>{document.querySelectorAll(".js-abs-src[data-src]").forEach(img=>{const raw=img.getAttribute("data-src")||"";if(raw){img.src=prefix(raw);img.style.opacity="1"}});document.querySelectorAll(".js-abs-href[data-href]").forEach(a=>{const raw=a.getAttribute("data-href")||"";if(raw)a.href=prefix(raw)});const y=document.getElementById("gf-year");if(y)y.textContent=new Date().getFullYear()};const boot=async()=>{await Promise.all([load("header-placeholder","global-header.html"),load("footer-placeholder","global-footer.html")]);norm()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();

/* EXPIRITI GLOBAL HEADER FINAL BIND */
(()=>{if(window.__EXP_GH_FINAL_BIND__)return;window.__EXP_GH_FINAL_BIND__=1;const D=document,W=window,Q=(s,c=D)=>c.querySelector(s),QA=(s,c=D)=>[...c.querySelectorAll(s)],isGh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&seg?"/"+seg:"",parts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?parts.slice(1):parts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./",path=p=>{if(!p)return p;if(/^(https?:)?\/\//i.test(p)||/^(mailto:|tel:|data:)/i.test(p)||p.startsWith("#"))return p;if(isGh&&repoBase&&(p===repoBase||p.startsWith(repoBase+"/")))return p;if(p.startsWith("/"))return isGh?repoBase+p:p;return((isGh?repoBase+"/":depth)+p).replace(/([^:]\/)\/+/g,"$1")};function assets(root=D){QA(".js-img[data-src]",root).forEach(img=>{const raw=img.dataset.src;if(raw){const want=path(raw);if(img.getAttribute("src")!==want)img.setAttribute("src",want);img.style.opacity="1"}});QA(".js-link[data-href]",root).forEach(a=>{const raw=a.dataset.href;if(raw){const want=path(raw);if(a.getAttribute("href")!==want)a.setAttribute("href",want)}});QA('a[href^="/"]',root).forEach(a=>{const raw=a.getAttribute("href"),want=path(raw);if(raw!==want)a.setAttribute("href",want)});QA('img[src^="/"]',root).forEach(img=>{const raw=img.getAttribute("src"),want=path(raw);if(raw!==want)img.setAttribute("src",want)});D.body.classList.add("has-gh");const y=Q("#gf-year");y&&(y.textContent=new Date().getFullYear())}function drawer(open){const h=Q("#gh-header"),dr=Q("#gh-drawer"),dim=Q("#gh-dim"),bg=Q("#gh-burger");if(!h||!dr||!dim||!bg)return;if(open){dr.hidden=false;dim.hidden=false;requestAnimationFrame(()=>{D.documentElement.classList.add("gh-open");D.body.classList.add("gh-open");dr.setAttribute("aria-hidden","false");bg.setAttribute("aria-expanded","true");D.body.style.overflow="hidden";assets(dr)})}else{D.documentElement.classList.remove("gh-open");D.body.classList.remove("gh-open");dr.setAttribute("aria-hidden","true");bg.setAttribute("aria-expanded","false");D.body.style.overflow="";setTimeout(()=>{if(!D.documentElement.classList.contains("gh-open")){dr.hidden=true;dim.hidden=true}},220)}}function mobileSystems(cat){const root=Q("#gh-msys"),track=Q("#gh-sysswipe");if(!root||!track)return;const order=["contables","comerciales","nube","prod"],i=Math.max(0,order.indexOf(cat));QA(".gh-cat",root).forEach(b=>{const on=(b.dataset.cat||"")===cat;b.classList.toggle("is-active",on);b.setAttribute("aria-selected",on?"true":"false")});track.scrollTo({left:i*(track.clientWidth||1),behavior:"smooth"});QA(".gh-sysdots .dot",root).forEach((d,k)=>d.classList.toggle("is-active",k===i))}function mobileServices(dir=1){const tr=Q("#gh-msvc .gh-svctrack");if(!tr)return;tr.scrollBy({left:dir*(tr.clientWidth||1),behavior:"smooth"})}function bind(){const h=Q("#gh-header");if(!h)return;assets(h);assets(D);if(!D.__ghFinalClicks){D.__ghFinalClicks=1;D.addEventListener("click",e=>{const b=e.target.closest("#gh-burger");if(b){e.preventDefault();e.stopImmediatePropagation();drawer(!D.documentElement.classList.contains("gh-open"));return}const c=e.target.closest("#gh-close,#gh-dim");if(c){e.preventDefault();e.stopImmediatePropagation();drawer(false);return}const t=e.target.closest("#gh-theme");if(t){e.preventDefault();e.stopImmediatePropagation();const cur=D.documentElement.getAttribute("data-theme")||localStorage.getItem("expiriti_theme")||"light",next=cur==="light"?"dark":"light";D.documentElement.setAttribute("data-theme",next);localStorage.setItem("expiriti_theme",next);t.setAttribute("aria-pressed",next==="dark"?"true":"false");return}/* EXPIRITI_R5_BURGER_CONTROLS_DELEGATED_TO_GH_CANON */const link=e.target.closest("a.js-link[data-href]");if(link){const raw=link.dataset.href,want=path(raw);link.href=want;e.preventDefault();e.stopImmediatePropagation();if(link.closest("#gh-drawer"))drawer(false);if(e.metaKey||e.ctrlKey||link.target==="_blank")W.open(want,"_blank","noopener");else location.href=want;return}},true);D.addEventListener("keydown",e=>{if(e.key==="Escape")drawer(false)},{passive:true})}if(!D.__ghFinalHover){D.__ghFinalHover=1;QA("#gh-header .gh-dd-wrap").forEach(w=>{let tm=0;const open=()=>{if(W.matchMedia("(max-width:1023px)").matches)return;clearTimeout(tm);QA("#gh-header .gh-dd-wrap").forEach(x=>x!==w&&x.classList.remove("gh-open"));w.classList.add("gh-open")},close=()=>{clearTimeout(tm);tm=setTimeout(()=>w.classList.remove("gh-open"),160)};w.addEventListener("mouseenter",open);w.addEventListener("mouseleave",close)})}}const boot=()=>{bind();setTimeout(bind,120);setTimeout(bind,450)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:true}):boot();W.addEventListener("pageshow",boot,{passive:true})})();

/* EXPIRITI_T16_SERVICE_UX_START */

(()=>{
  const boot=()=>{

    if(
      !document.body ||
      !document.body.classList.contains("page-servicios")
    ){
      return;
    }


    /* =====================================================
       REELS
       ===================================================== */

    document
      .querySelectorAll("aside")
      .forEach(aside=>{

        const carousel=
          aside.querySelector(".carousel");

        const legacy=[
          ...aside.querySelectorAll(
            ".reel-title"
          )
        ];


        if(
          !carousel ||
          !legacy.length
        ){
          return;
        }


        [
          ...aside.querySelectorAll(
            "h4.title-gradient"
          )
        ]
        .filter(el=>
          /^reels\s+destacados\s*:/i
            .test(el.textContent.trim())
        )
        .forEach(el=>{
          el.style.setProperty(
            "display",
            "none",
            "important"
          );
        });


        legacy.forEach(el=>{
          el.style.setProperty(
            "display",
            "none",
            "important"
          );
        });


        let title=
          aside.querySelector(
            ".exp-t16-reel-title"
          );


        if(!title){

          title=
            document.createElement("h4");

          title.className=
            "title-gradient exp-t16-reel-title";

          carousel.insertAdjacentElement(
            "beforebegin",
            title
          );
        }


        const update=()=>{

          const slides=[
            ...carousel.querySelectorAll(
              ".carousel-slide"
            )
          ];


          const active=
            slides.find(slide=>
              slide.classList.contains("is-active") ||
              slide.classList.contains("active") ||
              slide.getAttribute("aria-current")==="true"
            );


          let value=
            active?.dataset?.title
            ||
            active
              ?.querySelector("[data-title]")
              ?.dataset
              ?.title
            ||
            "";


          if(!value){

            const activeLegacy=
              legacy.find(el=>
                el.classList.contains("active") ||
                el.getAttribute("aria-current")==="true"
              )
              ||
              (
                legacy.length===1
                ?legacy[0]
                :null
              );


            value=
              activeLegacy
                ?.textContent
                ?.trim()
              ||
              "";
          }


          if(!value){

            value=
              carousel
                .querySelector("[data-title]")
                ?.dataset
                ?.title
              ||
              carousel
                .querySelector("iframe[title]")
                ?.getAttribute("title")
              ||
              legacy[0]
                ?.textContent
                ?.trim()
              ||
              "";
          }


          title.textContent=value;
        };


        update();


        const observer=
          new MutationObserver(
            ()=>requestAnimationFrame(update)
          );


        observer.observe(
          aside,
          {
            subtree:true,
            attributes:true,
            attributeFilter:[
              "class",
              "aria-current",
              "aria-hidden"
            ]
          }
        );


        aside.addEventListener(
          "click",
          ()=>setTimeout(update,90)
        );
      });


    /* =====================================================
       COMPARATIVAS
       ===================================================== */

    let comparisonIndex=0;


    document
      .querySelectorAll("table")
      .forEach(table=>{

        const row=
          table.querySelector("thead tr")
          ||
          table.querySelector("tr");


        if(!row){
          return;
        }


        const cells=[
          ...row.children
        ];


        if(cells.length<3){
          return;
        }


        const first=
          (
            cells[0]?.textContent
            ||""
          )
          .trim()
          .toLowerCase();


        const section=
          table.closest("section");


        const title=
          (
            section
              ?.querySelector("h2,h3,h4")
              ?.textContent
            ||""
          )
          .toLowerCase();


        const id=
          (
            section?.id
            ||""
          )
          .toLowerCase();


        const compare=
          /^caracter[ií]stica/.test(first)
          ||
          /comparativ/.test(title)
          ||
          /compar/.test(id);


        if(!compare){
          return;
        }


        comparisonIndex++;


        table.classList.add(
          "exp-t16-compare-table"
        );


        table.classList.add(
          comparisonIndex===1
            ?"exp-t16-compare-primary"
            :"exp-t16-compare-secondary"
        );


        let wrap=
          table.closest(
            ".table-scroll,"
            +".cmp-scroll,"
            +".pricing-table-nube-wrap,"
            +".lp-compare-wrap,"
            +".exp-t16-compare-wrap"
          );


        if(!wrap){

          wrap=
            document.createElement("div");

          wrap.className=
            "exp-t16-compare-wrap";

          table.parentNode.insertBefore(
            wrap,
            table
          );

          wrap.appendChild(table);

        }else{

          wrap.classList.add(
            "exp-t16-compare-wrap"
          );
        }
      });


    /* =====================================================
       CURSOS — PEDIR INFO CENTRADO
       ===================================================== */

    document
      .querySelectorAll(
        ".exp-course-info-badge"
      )
      .forEach(badge=>{

        badge.style.setProperty(
          "display",
          "flex",
          "important"
        );

        badge.style.setProperty(
          "width",
          "max-content",
          "important"
        );

        badge.style.setProperty(
          "max-width",
          "calc(100% - 24px)",
          "important"
        );

        badge.style.setProperty(
          "margin-left",
          "auto",
          "important"
        );

        badge.style.setProperty(
          "margin-right",
          "auto",
          "important"
        );

        badge.style.setProperty(
          "justify-self",
          "center",
          "important"
        );

        badge.style.setProperty(
          "align-self",
          "center",
          "important"
        );

        badge.style.setProperty(
          "position",
          "static",
          "important"
        );

        badge.style.setProperty(
          "transform",
          "none",
          "important"
        );


        const icon=
          badge.querySelector(
            ".exp-course-wa-icon"
          );


        if(icon){

          icon.style.setProperty(
            "background",
            "transparent",
            "important"
          );

          icon.style.setProperty(
            "border",
            "0",
            "important"
          );

          icon.style.setProperty(
            "box-shadow",
            "none",
            "important"
          );

          icon.style.setProperty(
            "filter",
            "none",
            "important"
          );
        }
      });


    /* =====================================================
       FLECHAS REELS
       ===================================================== */

    document
      .querySelectorAll(
        ".carousel .arrowCircle"
      )
      .forEach(btn=>{

        const pulse=()=>{

          btn.classList.add(
            "exp-t16-arrow-feedback"
          );

          setTimeout(
            ()=>btn.classList.remove(
              "exp-t16-arrow-feedback"
            ),
            180
          );
        };


        btn.addEventListener(
          "pointerdown",
          pulse
        );

        btn.addEventListener(
          "click",
          pulse
        );
      });
  };


  if(document.readyState==="loading"){

    document.addEventListener(
      "DOMContentLoaded",
      boot,
      {once:true}
    );

  }else{

    boot();
  }

})();

/* EXPIRITI_T16_SERVICE_UX_END */

/* EXPIRITI_T17_SERVICES_FINAL_START */

(()=>{
 const boot=()=>{

  if(
   !document.body ||
   !document.body.classList.contains("page-servicios")
  ) return;


  const comparisons=[
   ...document.querySelectorAll("table")
  ].filter(table=>{

   const row=
    table.querySelector("thead tr")
    ||
    table.querySelector("tr");

   if(!row) return false;

   const first=
    row.children[0]
     ?.textContent
     ?.trim()
     ||"";

   return /^caracter[ií]stica$/i.test(first);
  });


  comparisons.forEach((table,index)=>{

   table.classList.add(
    "exp-t17-compare-table",
    index===0
     ?"exp-t17-compare-primary"
     :"exp-t17-compare-secondary"
   );


   const header=
    table.querySelector("thead tr")
    ||
    table.querySelector("tr");

   const count=
    Math.max(
     2,
     header?.children.length || 2
    );


   const firstPct=
    index===0 ? 28 : 25;

   const otherPct=
    (100-firstPct)/(count-1);


   table
    .querySelectorAll("tr")
    .forEach(row=>{

     [...row.children]
      .forEach((cell,i)=>{

       cell.style.setProperty(
        "text-align",
        index===0
         ?"left"
         :(i===0 ? "left" : "center"),
        "important"
       );


       cell.style.setProperty(
        "width",
        (i===0 ? firstPct : otherPct)+"%",
        "important"
       );


       cell.style.setProperty(
        "vertical-align",
        "middle",
        "important"
       );
      });
    });
  });
 };


 if(document.readyState==="loading"){

  document.addEventListener(
   "DOMContentLoaded",
   boot,
   {once:true}
  );

 }else{

  boot();
 }

})();

/* EXPIRITI_T17_SERVICES_FINAL_END */

/* EXPIRITI_T18_SERVICE_HERO_START */

(()=>{
  const boot=()=>{

    if(
      !document.body ||
      !document.body.classList.contains(
        "page-servicios"
      )
    ){
      return;
    }


    const hero=
      document.querySelector(
        "main.hero"
      );


    if(!hero){
      return;
    }


    const h1=
      [...hero.children]
        .find(el=>
          el.tagName==="H1"
        );


    const badges=
      [...hero.children]
        .find(el=>
          el.classList
            ?.contains("badges")
        );


    if(!h1 || !badges){
      return;
    }


    /*
     * El badge "Servicio" es redundante
     * porque ya estamos en una página de Servicio.
     */
    [
      ...h1.querySelectorAll(
        ".badge"
      )
    ]
    .filter(el=>
      el.textContent
        .trim()
        .toLowerCase()
      ===
      "servicio"
    )
    .forEach(el=>el.remove());


    if(
      !h1.parentElement
        .classList
        .contains(
          "exp-t18-hero-row"
        )
    ){

      const row=
        document.createElement(
          "div"
        );


      row.className=
        "exp-t18-hero-row "
        +"exp-t18-service-hero-row";


      hero.insertBefore(
        row,
        h1
      );


      row.appendChild(h1);
      row.appendChild(badges);
    }
  };


  if(document.readyState==="loading"){

    document.addEventListener(
      "DOMContentLoaded",
      boot,
      {once:true}
    );

  }else{

    boot();
  }

})();

/* EXPIRITI_T18_SERVICE_HERO_END */

/* EXPIRITI_T19_SERVICE_RUNTIME_START */

(()=>{
 const boot=()=>{

  if(
   !document.body ||
   !document.body.classList.contains(
    "page-servicios"
   )
  ){
   return;
  }


  /*
   * Courses:
   * identify the ACTUAL anchor, regardless of whether
   * exp-course-info-badge is itself the <a> or a child.
   */
  document
   .querySelectorAll(
    ".exp-course-info-badge"
   )
   .forEach(badge=>{

    const link=
     badge.matches("a")
      ?badge
      :(
        badge.closest("a")
        ||
        badge.querySelector("a")
       );


    badge.classList.add(
     "exp-t19-course-decoration-clean"
    );


    if(link){

     link.classList.add(
      "exp-t19-course-decoration-clean"
     );


     for(const el of [
      link,
      badge,
      ...link.querySelectorAll("*")
     ]){

      el.style.setProperty(
       "text-decoration",
       "none",
       "important"
      );

      el.style.setProperty(
       "text-decoration-line",
       "none",
       "important"
      );

      el.style.setProperty(
       "border-bottom",
       "0",
       "important"
      );
     }
    }
   });
 };


 if(document.readyState==="loading"){

  document.addEventListener(
   "DOMContentLoaded",
   boot,
   {once:true}
  );

 }else{

  boot();
 }

})();

/* EXPIRITI_T19_SERVICE_RUNTIME_END */

/* EXPIRITI_T24_SERVICE_LISTSLIDER_OWNER_START
 * Owner único (T24) del slider TEXTUAL .listSlider.
 * Reemplaza al owner T23 de este archivo (no se agrega un tercer override).
 * Contrato:
 *  - loop infinito bidireccional por páginas (.listPage)
 *  - next desde la última -> primera ; prev desde la primera -> última
 *  - nunca is-disabled en los extremos (solo si hay <=1 página)
 *  - cada .listSlider controla exclusivamente su track/pages/prev/next
 *  - no cambia la URL, no dispara history del header
 *  - NO toca reels/carruseles de video (#carouselReels, .carousel, .carouselX)
 */
(()=>{

  const reduce=()=>
    window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  const setup=slider=>{

    if(slider.dataset.expT24Slider==="1"){
      return;
    }

    const track=
      slider.querySelector(":scope > .listTrack")
      || slider.querySelector(".listTrack");

    if(!track){
      return;
    }

    slider.dataset.expT24Slider="1";

    const prev=
      slider.querySelector(":scope > .arrowCircle.prev")
      || slider.querySelector(".arrowCircle.prev");

    const next=
      slider.querySelector(":scope > .arrowCircle.next")
      || slider.querySelector(".arrowCircle.next");

    const pages=()=>[
      ...track.querySelectorAll(":scope > .listPage")
    ];

    let index=0;
    let programmatic=0;

    const offsetOf=i=>{
      const items=pages();
      if(!items.length) return 0;
      return items[i].offsetLeft-items[0].offsetLeft;
    };

    const update=()=>{

      const single=pages().length<=1;

      [prev,next]
        .filter(Boolean)
        .forEach(btn=>{

          btn.classList.toggle("is-disabled",single);

          btn.setAttribute(
            "aria-hidden",
            single?"true":"false"
          );
        });

      slider.dataset.expT24Index=String(index);
      slider.dataset.expT24Pages=String(pages().length);
    };

    const go=target=>{

      const items=pages();

      if(!items.length){
        return;
      }

      index=((target%items.length)+items.length)%items.length;

      programmatic=Date.now();

      track.scrollTo({
        left:offsetOf(index),
        behavior:reduce()?"instant":"smooth"
      });

      update();
    };

    const syncFromScroll=()=>{

      if(Date.now()-programmatic<700){
        return;
      }

      const items=pages();

      if(!items.length){
        return;
      }

      const base=items[0].offsetLeft;

      index=items.reduce((best,page,i)=>
        Math.abs((page.offsetLeft-base)-track.scrollLeft)
        <Math.abs((items[best].offsetLeft-base)-track.scrollLeft)
          ?i
          :best
      ,0);

      slider.dataset.expT24Index=String(index);
    };

    const bind=(btn,dir)=>{

      if(!btn || btn.dataset.expT24Bound==="1"){
        return;
      }

      btn.dataset.expT24Bound="1";
      btn.dataset.expT23Bound="1";

      btn.addEventListener(
        "click",
        event=>{

          event.preventDefault();
          event.stopImmediatePropagation();

          go(index+dir);
        },
        true
      );
    };

    bind(prev,-1);
    bind(next,1);

    track.style.setProperty("touch-action","pan-y","important");
    let gesture=null;
    const resetGesture=()=>{gesture=null};
    track.addEventListener("pointerdown",event=>{if(event.isPrimary===false)return;gesture={id:event.pointerId,x:event.clientX,y:event.clientY,axis:0,fired:false,start:index}},{passive:true});
    track.addEventListener("pointermove",event=>{if(!gesture||gesture.id!==event.pointerId||gesture.fired)return;const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;if(!gesture.axis){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;gesture.axis=Math.abs(dx)>Math.abs(dy)*1.2?1:-1}if(gesture.axis!==1)return;event.preventDefault();if(Math.abs(dx)<44)return;gesture.fired=true;go(gesture.start+(dx<0?1:-1))},{passive:false});
    track.addEventListener("pointerup",resetGesture,{passive:true});
    track.addEventListener("pointercancel",resetGesture,{passive:true});

    let scrollTimer=0;

    track.addEventListener(
      "scroll",
      ()=>{
        window.clearTimeout(scrollTimer);
        scrollTimer=window.setTimeout(syncFromScroll,140);
      },
      {passive:true}
    );

    update();

    if("ResizeObserver" in window){

      new ResizeObserver(()=>{

        update();

        track.scrollTo({
          left:offsetOf(index),
          behavior:"instant"
        });

      }).observe(track);
    }
  };


  const boot=()=>{

    document
      .querySelectorAll(".listSlider")
      .forEach(setup);
  };


  if(document.readyState==="loading"){

    document.addEventListener(
      "DOMContentLoaded",
      boot,
      {once:true}
    );

  }else{

    boot();
  }

  window.addEventListener("load",boot);

})();

/* EXPIRITI_T24_SERVICE_LISTSLIDER_OWNER_END */

/* EXPIRITI_PAGE_NAV_RAIL loader: T23 release candidate. */
(()=>{if(!document.querySelector('script[data-exp-page-nav-rail-loader]')){const s=document.createElement('script');s.src='/EXPIRITI_PAGE_NAV_RAIL.js';s.defer=true;s.dataset.expPageNavRailLoader='1';document.head.appendChild(s)}})();


/* EXPIRITI_RC1_ODD_GRID_OWNER_START
 * RC1/13 — cuando en una rejilla de 3 columnas sobra UNA sola tarjeta visible,
 * se centra (X X X / _X_) en vez de dejarla pegada a la izquierda.
 * Se recalcula ante cualquier cambio (filtros, resize) con un unico observer;
 * no toca la logica de filtrado ni agrega handlers a los botones.
 */
(()=>{
  if(window.__EXP_RC1_ODD_GRID__)return;window.__EXP_RC1_ODD_GRID__=1;
  const SEL="#cursosGrid,.grid-3.feature-grid,.grid-3.cards-grid";
  const CLS="exp-rc1-odd-center";
  let raf=0;
  const apply=()=>{
    raf=0;
    document.querySelectorAll(SEL).forEach(grid=>{
      const cols=getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length;
      const kids=[...grid.children];
      kids.forEach(k=>k.classList.remove(CLS));
      if(cols!==3)return;
      const vis=kids.filter(k=>getComputedStyle(k).display!=="none");
      if(vis.length>3&&vis.length%3===1) vis[vis.length-1].classList.add(CLS);
    });
  };
  const schedule=()=>{if(raf)return;raf=requestAnimationFrame(apply)};
  const boot=()=>{
    apply();
    document.querySelectorAll(SEL).forEach(g=>{
      new MutationObserver(schedule).observe(g,{attributes:true,attributeFilter:["style","class","hidden"],subtree:true,childList:true});
    });
    window.addEventListener("resize",schedule,{passive:true});
  };
  document.readyState==="loading"
    ? document.addEventListener("DOMContentLoaded",boot,{once:true})
    : boot();
})();
/* EXPIRITI_RC1_ODD_GRID_OWNER_END */


/* EXPIRITI_R6_BURGER_RUNTIME_OWNER_START */
(()=>{
  "use strict";

  if(window.__EXPIRITI_R6_BURGER_RUNTIME__)return;
  window.__EXPIRITI_R6_BURGER_RUNTIME__=1;

  const D=document,W=window;
  const mod=(i,n)=>n?((i%n)+n)%n:0;

  const nearest=(track,pages)=>{
    if(!track||!pages.length)return 0;

    const x=track.scrollLeft||0;
    let best=0,dist=Infinity;

    pages.forEach((p,i)=>{
      const d=Math.abs((p.offsetLeft||0)-x);
      if(d<dist){
        dist=d;
        best=i;
      }
    });

    return best;
  };

  const instant=(track,left)=>{
    const old=track.style.scrollBehavior;

    track.style.scrollBehavior="auto";
    track.scrollLeft=left;

    requestAnimationFrame(()=>{
      track.style.scrollBehavior=old;
    });
  };

  const bindEdgeSwipe=(root,track,pages,go,getIndex)=>{
    if(!root||!track||track.__r7EdgeBound||pages.length<=1)return;

    track.__r7EdgeBound=1;

    const MIN=34;
    const RATIO=1.15;

    let armed=false;
    let x0=0;
    let y0=0;
    let startIndex=0;
    let pointerId=null;

    const begin=(x,y,id)=>{
      x0=x;
      y0=y;
      startIndex=getIndex();
      pointerId=id;
      armed=true;
    };

    const finish=(x,y,id)=>{
      if(!armed)return;

      if(
        pointerId!==null &&
        id!==null &&
        pointerId!==id
      ) return;

      armed=false;

      const dx=x-x0;
      const dy=y-y0;

      if(Math.abs(dx)<MIN)return;

      if(
        Math.abs(dx) <
        Math.abs(dy)*RATIO
      ) return;

      const current=getIndex();
      const last=pages.length-1;

      /*
       * SWIPE LEFT = avanzar.
       * Si ya está en último, el scroll nativo no puede
       * moverse más: hacemos wrap directo a primero.
       */
      if(
        startIndex===last &&
        current===last &&
        dx<0
      ){
        go(0,false);
        return;
      }

      /*
       * SWIPE RIGHT = retroceder.
       * Si ya está en primero: wrap directo a último.
       */
      if(
        startIndex===0 &&
        current===0 &&
        dx>0
      ){
        go(last,false);
      }
    };

    if("PointerEvent" in window){

      track.addEventListener(
        "pointerdown",
        e=>{
          if(e.isPrimary===false)return;

          begin(
            e.clientX,
            e.clientY,
            e.pointerId
          );
        },
        {passive:true}
      );

      track.addEventListener(
        "pointerup",
        e=>{
          if(e.isPrimary===false)return;

          finish(
            e.clientX,
            e.clientY,
            e.pointerId
          );
        },
        {passive:true}
      );

      track.addEventListener(
        "pointercancel",
        ()=>{
          armed=false;
          pointerId=null;
        },
        {passive:true}
      );

    }else{

      /* Safari/engine antiguo fallback */

      track.addEventListener(
        "touchstart",
        e=>{
          const t=e.touches&&e.touches[0];
          if(!t)return;

          begin(
            t.clientX,
            t.clientY,
            null
          );
        },
        {passive:true}
      );

      track.addEventListener(
        "touchend",
        e=>{
          const t=
            e.changedTouches &&
            e.changedTouches[0];

          if(!t)return;

          finish(
            t.clientX,
            t.clientY,
            null
          );
        },
        {passive:true}
      );

      track.addEventListener(
        "touchcancel",
        ()=>{
          armed=false;
        },
        {passive:true}
      );
    }
  };

  function bindSystems(){
    const root=D.getElementById("gh-msys");
    const track=D.getElementById("gh-sysswipe");

    if(!root||!track||root.__r6SystemsBound)return false;

    root.__r6SystemsBound=1;

    const pages=[...track.querySelectorAll(".gh-syspage")];
    const cats=[...root.querySelectorAll(".gh-cat[data-cat]")];
    const dots=[...root.querySelectorAll(".gh-sysdots .dot")];
    const bar=root.querySelector(".gh-catbar");
    const order=["contables","comerciales","nube","prod"];

    if(!pages.length)return false;

    pages.forEach(p=>{
      p.style.scrollSnapStop="always";
    });

    const centerCat=btn=>{
      if(!btn||!bar)return;

      const left=
        btn.offsetLeft -
        (bar.clientWidth-btn.clientWidth)/2;

      bar.scrollTo({
        left:Math.max(0,left),
        behavior:"smooth"
      });
    };

    const paint=raw=>{
      const i=mod(raw,pages.length);
      const changed=root.__r6Index!==i;

      root.__r6Index=i;

      cats.forEach((b,k)=>{
        const on=k===i;

        b.classList.toggle("is-active",on);
        b.setAttribute(
          "aria-selected",
          on?"true":"false"
        );

        if(on&&changed)centerCat(b);
      });

      dots.forEach((d,k)=>{
        const on=k===i;

        d.classList.toggle("is-active",on);

        if(on)d.setAttribute("aria-current","true");
        else d.removeAttribute("aria-current");
      });
    };

    const getIndex=()=>{
      return Number.isInteger(root.__r6Index)
        ? root.__r6Index
        : nearest(track,pages);
    };

    const go=(raw,smooth=true)=>{
      const cur=getIndex();
      const i=mod(raw,pages.length);

      const wrap=
        (cur===0 && i===pages.length-1) ||
        (cur===pages.length-1 && i===0);

      const distant=Math.abs(i-cur)>1;
      const direct=!smooth||wrap||distant;

      root.__r6NavLock=
        performance.now()+(direct?120:540);

      paint(i);

      const left=pages[i].offsetLeft||0;

      if(direct){
        instant(track,left);
      }else{
        track.scrollTo({
          left,
          behavior:"smooth"
        });
      }

      setTimeout(()=>{
        root.__r6NavLock=0;
        paint(nearest(track,pages));
      },direct?150:580);
    };

    cats.forEach((b,k)=>{
      if(b.__r6Bound)return;
      b.__r6Bound=1;

      b.addEventListener("click",e=>{
        e.preventDefault();
        go(k,true);
      });
    });

    dots.forEach((d,k)=>{
      if(d.__r6Bound)return;
      d.__r6Bound=1;

      d.addEventListener("click",e=>{
        e.preventDefault();
        go(k,true);
      });
    });

    let raf=0;

    track.addEventListener("scroll",()=>{
      if(performance.now()<(root.__r6NavLock||0))return;
      if(raf)return;

      raf=requestAnimationFrame(()=>{
        raf=0;
        paint(nearest(track,pages));
      });
    },{passive:true});

    bindEdgeSwipe(
      root,
      track,
      pages,
      go,
      getIndex
    );

    W.addEventListener("resize",()=>{
      const keep=getIndex();

      requestAnimationFrame(()=>{
        go(keep,false);
      });
    },{passive:true});

    paint(nearest(track,pages));

    return true;
  }

  function bindServices(){
    const root=D.getElementById("gh-msvc");
    const track=D.getElementById("gh-svctrack");

    if(!root||!track||root.__r6ServicesBound)return false;

    root.__r6ServicesBound=1;

    const pages=[...track.querySelectorAll(".gh-svcpage")];
    const dots=[...root.querySelectorAll(".gh-svcdots .dot")];
    const prev=root.querySelector(".gh-svcarrow.prev");
    const next=root.querySelector(".gh-svcarrow.next");

    if(!pages.length)return false;

    pages.forEach(p=>{
      p.style.scrollSnapStop="always";
    });

    /* En el burger estas flechas son controles reales. */
    [prev,next].forEach(b=>{
      if(!b)return;

      b.hidden=false;
      b.disabled=false;
      b.setAttribute("aria-disabled","false");
    });

    const paint=raw=>{
      const i=mod(raw,pages.length);

      root.__r6Index=i;

      dots.forEach((d,k)=>{
        const on=k===i;

        d.classList.toggle("is-active",on);

        if(on)d.setAttribute("aria-current","true");
        else d.removeAttribute("aria-current");
      });

      [prev,next].forEach(b=>{
        if(!b)return;
        b.disabled=false;
        b.setAttribute("aria-disabled","false");
      });
    };

    const getIndex=()=>{
      return Number.isInteger(root.__r6Index)
        ? root.__r6Index
        : nearest(track,pages);
    };

    const go=(raw,smooth=true)=>{
      const cur=getIndex();
      const i=mod(raw,pages.length);

      const wrap=
        (cur===0 && i===pages.length-1) ||
        (cur===pages.length-1 && i===0);

      const distant=Math.abs(i-cur)>1;
      const direct=!smooth||wrap||distant;

      root.__r6NavLock=
        performance.now()+(direct?120:540);

      paint(i);

      const left=pages[i].offsetLeft||0;

      if(direct){
        instant(track,left);
      }else{
        track.scrollTo({
          left,
          behavior:"smooth"
        });
      }

      setTimeout(()=>{
        root.__r6NavLock=0;
        paint(nearest(track,pages));
      },direct?150:580);
    };

    if(prev&&!prev.__r6Bound){
      prev.__r6Bound=1;

      prev.addEventListener("click",e=>{
        e.preventDefault();
        go(getIndex()-1,true);
      });
    }

    if(next&&!next.__r6Bound){
      next.__r6Bound=1;

      next.addEventListener("click",e=>{
        e.preventDefault();
        go(getIndex()+1,true);
      });
    }

    dots.forEach((d,k)=>{
      if(d.__r6Bound)return;
      d.__r6Bound=1;

      d.addEventListener("click",e=>{
        e.preventDefault();
        go(k,true);
      });
    });

    let raf=0;

    track.addEventListener("scroll",()=>{
      if(performance.now()<(root.__r6NavLock||0))return;
      if(raf)return;

      raf=requestAnimationFrame(()=>{
        raf=0;
        paint(nearest(track,pages));
      });
    },{passive:true});

    bindEdgeSwipe(
      root,
      track,
      pages,
      go,
      getIndex
    );

    W.addEventListener("resize",()=>{
      const keep=getIndex();

      requestAnimationFrame(()=>{
        go(keep,false);
      });
    },{passive:true});

    paint(nearest(track,pages));

    return true;
  }

  const boot=()=>{
    bindSystems();
    bindServices();
  };

  /* El header se inyecta después de cargar el JS. */
  const mo=new MutationObserver(boot);

  mo.observe(D.documentElement,{
    childList:true,
    subtree:true
  });

  boot();

  setTimeout(boot,120);
  setTimeout(boot,400);
  setTimeout(boot,900);

  W.addEventListener("pageshow",()=>{
    setTimeout(boot,40);
  },{passive:true});

})();
/* EXPIRITI_R6_BURGER_RUNTIME_OWNER_END */

/* EXPIRITI_R8_NATIVE_LOOP_SENTINELS_START */
(()=>{
  "use strict";

  if(window.__EXPIRITI_R8_NATIVE_LOOP_SENTINELS__)return;
  window.__EXPIRITI_R8_NATIVE_LOOP_SENTINELS__=1;

  const D=document;

  function stripCloneIdentity(node){
    node.removeAttribute("id");
    node.setAttribute("data-r8-loop-clone","1");
    node.setAttribute("aria-hidden","true");

    node.querySelectorAll("[id]").forEach(el=>{
      el.removeAttribute("id");
    });

    node.querySelectorAll(
      "button,input,select,textarea"
    ).forEach(el=>{
      el.tabIndex=-1;
    });
  }

  function nearestPhysical(track,pages){
    const x=track.scrollLeft||0;
    let best=0;
    let dist=Infinity;

    pages.forEach((p,i)=>{
      const d=Math.abs((p.offsetLeft||0)-x);

      if(d<dist){
        dist=d;
        best=i;
      }
    });

    return best;
  }

  function instant(track,left){
    const old=track.style.scrollBehavior;

    track.style.scrollBehavior="auto";
    track.scrollLeft=left;

    requestAnimationFrame(()=>{
      track.style.scrollBehavior=old;
    });
  }

  function enhance(track,selector){
    if(!track || track.__r8LoopBound)return false;

    const real=[
      ...track.querySelectorAll(selector)
    ].filter(x=>!x.hasAttribute("data-r8-loop-clone"));

    if(real.length<=1)return false;

    track.__r8LoopBound=1;

    real.forEach((p,i)=>{
      p.dataset.r8Logical=String(i);
    });

    const before=real[real.length-1].cloneNode(true);
    const after=real[0].cloneNode(true);

    stripCloneIdentity(before);
    stripCloneIdentity(after);

    before.dataset.r8Logical=
      String(real.length-1);

    after.dataset.r8Logical="0";

    track.insertBefore(before,real[0]);
    track.appendChild(after);

    const physical=[
      ...track.querySelectorAll(selector)
    ];

    const realFirst=real[0];
    const realLast=real[real.length-1];

    /*
      Reposicionamiento invisible después de llegar
      a un sentinel.
    */
    const settle=()=>{
      const i=nearestPhysical(track,physical);
      const node=physical[i];

      if(!node)return;

      if(node===before){
        instant(
          track,
          realLast.offsetLeft||0
        );
        return;
      }

      if(node===after){
        instant(
          track,
          realFirst.offsetLeft||0
        );
      }
    };

    let timer=0;

    track.addEventListener(
      "scroll",
      ()=>{
        clearTimeout(timer);
        timer=setTimeout(settle,70);
      },
      {passive:true}
    );

    if("onscrollend" in window){
      track.addEventListener(
        "scrollend",
        settle,
        {passive:true}
      );
    }

    /*
      El owner de R6/R7 ya conoce los nodos reales.
      Como offsetLeft es dinámico, dots/pills siguen
      apuntando correctamente después de insertar
      el clone anterior.
    */
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        const root=
          track.closest("#gh-msys,#gh-msvc");

        let logical=0;

        if(
          root &&
          Number.isInteger(root.__r6Index)
        ){
          logical=Math.max(
            0,
            Math.min(
              real.length-1,
              root.__r6Index
            )
          );
        }

        instant(
          track,
          real[logical].offsetLeft||0
        );
      });
    });

    return true;
  }

  function boot(){
    enhance(
      D.getElementById("gh-sysswipe"),
      ".gh-syspage"
    );

    enhance(
      D.getElementById("gh-svctrack"),
      ".gh-svcpage"
    );
  }

  const mo=new MutationObserver(boot);

  mo.observe(
    D.documentElement,
    {
      childList:true,
      subtree:true
    }
  );

  boot();

  setTimeout(boot,100);
  setTimeout(boot,350);
  setTimeout(boot,800);

})();
/* EXPIRITI_R8_NATIVE_LOOP_SENTINELS_END */

/* EXPIRITI_R10R_COMPLEMENT_OWNER_START */
(()=>{
  "use strict";

  if(window.__EXPIRITI_R10R_COMPLEMENT__)return;

  window.__EXPIRITI_R10R_COMPLEMENT__=1;

  const PAGE_SIZE=4;

  const mod=(i,n)=>
    n ? ((i%n)+n)%n : 0;

  function init(root){

    if(
      !root ||
      root.__r10rComplementBound
    ) return;

    const panel=
      root.querySelector(".svc-panel");

    const grid=
      root.querySelector(".svc-grid");

    if(
      !panel ||
      !grid
    ) return;

    const items=[
      ...grid.querySelectorAll(
        ".svc-link"
      )
    ];

    if(items.length!==8){
      console.warn(
        "EXPIRITI_R13_COMPLEMENT_EXPECTED_8",
        items.length
      );

      return;
    }

    let oldPrev=
      panel.querySelector(".svc-prev");

    let oldNext=
      panel.querySelector(".svc-next");

    if(
      !oldPrev ||
      !oldNext
    ) return;

    /*
      Sustituimos nodos de flecha para retirar
      cualquier listener heredado anterior.
    */

    const prev=
      oldPrev.cloneNode(true);

    const next=
      oldNext.cloneNode(true);

    oldPrev.replaceWith(prev);
    oldNext.replaceWith(next);

    root.__r10rComplementBound=1;
    root.__r10rPage=0;

    const pageCount=
      Math.ceil(
        items.length/PAGE_SIZE
      );

    function paint(raw){

      const page=
        mod(
          raw,
          pageCount
        );

      root.__r10rPage=page;

      const first=
        page*PAGE_SIZE;

      const last=
        first+PAGE_SIZE;

      const currentItems=[
        ...grid.querySelectorAll(".svc-link")
      ];

      currentItems.forEach(
        (item,i)=>{
          item.hidden=! (
            i>=first &&
            i<last
          );
        }
      );

      [prev,next].forEach(
        btn=>{
          btn.hidden=false;
          btn.disabled=false;

          btn.setAttribute(
            "aria-disabled",
            "false"
          );
        }
      );

      root.dataset.page=
        String(page+1);

      root.dataset.pages=
        String(pageCount);
    }

    root.addEventListener("click",e=>{
      const button=e.target.closest(".svc-prev,.svc-next");
      if(!button||!root.contains(button))return;
      e.preventDefault();
      e.stopPropagation();
      root.dataset.expComplementHandledClicks=String(Number(root.dataset.expComplementHandledClicks||0)+1);
      paint(root.__r10rPage+(button.classList.contains("svc-next")?1:-1));
    });
    root.dataset.expComplementDelegatedListeners="1";

    /* A swipe changes one complete page on desktop and mobile. The content
       never follows the pointer, and vertical document scrolling stays native. */
    let swipeId=null,swipeX=0,swipeY=0;
    panel.addEventListener("pointerdown",e=>{
      if(e.isPrimary===false)return;
      swipeId=e.pointerId;swipeX=e.clientX;swipeY=e.clientY;
    },{passive:true});
    const finishSwipe=e=>{
      if(e.pointerId!==swipeId)return;
      const dx=e.clientX-swipeX,dy=e.clientY-swipeY;
      swipeId=null;
      if(Math.abs(dx)<44||Math.abs(dx)<=Math.abs(dy)*1.2)return;
      (dx<0?next:prev).click();
    };
    panel.addEventListener("pointerup",finishSwipe,{passive:true});
    panel.addEventListener("pointercancel",e=>{if(e.pointerId===swipeId)swipeId=null},{passive:true});
    panel.style.touchAction="pan-y";
    root.dataset.expComplementSwipeOwner="R19_GATE3_DISCRETE";

    let resizeRaf=0;
    const refresh=()=>{
      if(resizeRaf)return;
      resizeRaf=requestAnimationFrame(()=>{
        resizeRaf=0;
        paint(root.__r10rPage);
      });
    };
    const breakpoint=matchMedia("(min-width:981px)");
    breakpoint.addEventListener?.("change",refresh);
    window.addEventListener("resize",refresh,{passive:true});
    root.dataset.expComplementListenerOwners="1";

    paint(0);
  }

  function boot(){

    document
      .querySelectorAll(
        "#servicios-complementarios"
      )
      .forEach(init);
  }

  document.readyState==="loading"
    ?document.addEventListener(
        "DOMContentLoaded",
        boot,
        {once:true}
      )
    :boot();

  window.addEventListener(
    "pageshow",
    boot,
    {passive:true}
  );

})();
/* EXPIRITI_R10R_COMPLEMENT_OWNER_END */



/* EXPIRITI_R10R_BURGER_OPEN_RESET_START */
(()=>{
  "use strict";

  if(window.__EXPIRITI_R10R_BURGER_OPEN_RESET__)return;

  window.__EXPIRITI_R10R_BURGER_OPEN_RESET__=1;

  const D=document;

  const realPages=(track,selector)=>
    [...track.querySelectorAll(selector)]
      .filter(
        el=>
          !el.hasAttribute(
            "data-r8-loop-clone"
          )
      );

  const instant=(track,left)=>{

    const old=
      track.style.scrollBehavior;

    track.style.scrollBehavior="auto";

    track.scrollLeft=left;

    requestAnimationFrame(()=>{
      track.style.scrollBehavior=old;
    });
  };


  function resetSystems(){

    const root=
      D.getElementById("gh-msys");

    const track=
      D.getElementById("gh-sysswipe");

    if(
      !root ||
      !track
    ) return;

    const pages=
      realPages(
        track,
        ".gh-syspage"
      );

    if(!pages.length)return;

    root.__r6Index=0;

    root.__r6NavLock=
      performance.now()+180;

    root
      .querySelectorAll(
        ".gh-cat[data-cat]"
      )
      .forEach(
        (btn,i)=>{
          const on=i===0;

          btn.classList.toggle(
            "is-active",
            on
          );

          btn.setAttribute(
            "aria-selected",
            on?"true":"false"
          );
        }
      );

    root
      .querySelectorAll(
        ".gh-sysdots .dot"
      )
      .forEach(
        (dot,i)=>{
          const on=i===0;

          dot.classList.toggle(
            "is-active",
            on
          );

          if(on){
            dot.setAttribute(
              "aria-current",
              "true"
            );
          }else{
            dot.removeAttribute(
              "aria-current"
            );
          }
        }
      );

    instant(
      track,
      pages[0].offsetLeft||0
    );
  }


  function resetServices(){

    const root=
      D.getElementById("gh-msvc");

    const track=
      D.getElementById("gh-svctrack");

    if(
      !root ||
      !track
    ) return;

    const pages=
      realPages(
        track,
        ".gh-svcpage"
      );

    if(!pages.length)return;

    root.__r6Index=0;

    root.__r6NavLock=
      performance.now()+180;

    root
      .querySelectorAll(
        ".gh-svcdots .dot"
      )
      .forEach(
        (dot,i)=>{
          const on=i===0;

          dot.classList.toggle(
            "is-active",
            on
          );

          if(on){
            dot.setAttribute(
              "aria-current",
              "true"
            );
          }else{
            dot.removeAttribute(
              "aria-current"
            );
          }
        }
      );

    instant(
      track,
      pages[0].offsetLeft||0
    );
  }


  function resetAll(){

    /*
      Drawer ya fue puesto visible por header.
      Dos RAF permiten medir offsetLeft real.
    */

    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        resetSystems();
        resetServices();
      });
    });

    /*
      Segundo pase breve por si todavía
      estaba terminando layout del drawer.
    */

    setTimeout(()=>{
      resetSystems();
      resetServices();
    },80);
  }


  let wasOpen=
    D.documentElement
      .classList
      .contains("gh-open");


  const observeOpen=()=>{

    const open=
      D.documentElement
        .classList
        .contains("gh-open");

    if(
      open &&
      !wasOpen
    ){
      resetAll();
    }

    wasOpen=open;
  };


  const observer=
    new MutationObserver(
      observeOpen
    );

  observer.observe(
    D.documentElement,
    {
      attributes:true,
      attributeFilter:["class"]
    }
  );


  if(wasOpen){
    resetAll();
  }

})();
/* EXPIRITI_R10R_BURGER_OPEN_RESET_END */


/* EXPIRITI_R13_SERVICE_SESSION_RUNTIME  --  ELIMINADO EN R15.
   Aplicaba estilos inline !important a #sesion-guiada de Servicios
   (position:absolute, padding 18px 22px 70px, margin 24px 10px 30px).
   REEMPLAZADO por EXPIRITI_R15_SESSION_GUIDED_OWNER en theme.css. */

/* EXPIRITI_R17_PASS4_SERVICE_STATIC_MEDIA_OWNER_START */
(()=>{
  const warmYouTube=()=>[["https://www.youtube-nocookie.com","anonymous"],["https://i.ytimg.com",""]].forEach(([href,crossOrigin])=>{if(document.head.querySelector('link[rel="preconnect"][href="'+href+'"]'))return;const link=document.createElement("link");link.rel="preconnect";link.href=href;if(crossOrigin)link.crossOrigin=crossOrigin;document.head.appendChild(link)});
  const boot=()=>document.querySelectorAll(".reel-embed[data-ytid]").forEach(wrap=>{
    if(wrap.dataset.expPass4Bound==="1")return;
    const id=wrap.dataset.ytid||"",title=wrap.dataset.title||"Video",button=wrap.querySelector(":scope > .exp-media-poster");
    if(!/^[A-Za-z0-9_-]{11}$/.test(id)||!button)return;
    wrap.dataset.expPass4Bound="1";
    const load=()=>{
      if(wrap.dataset.expPass4Playing==="1")return;
      const clickAt=performance.now();wrap.dataset.expPass4Playing="1";wrap.classList.add("is-loading");button.disabled=true;button.setAttribute("aria-pressed","true");window.pauseAllYTIframes?.();
      const iframe=document.createElement("iframe"),createdAt=performance.now();iframe.title=title;iframe.loading="eager";iframe.allow="autoplay; encrypted-media; picture-in-picture; web-share";iframe.setAttribute("allowfullscreen","");
      iframe.src="https://www.youtube-nocookie.com/embed/"+id+"?rel=0&modestbranding=1&controls=1&fs=1&playsinline=1&autoplay=1&enablejsapi=1";
      const srcAt=performance.now();window.__EXP_VIDEO_LAST_TIMING__={id,clickAt,createdAt,srcAt,loadAt:null};wrap.dataset.expClickToCreateMs=(createdAt-clickAt).toFixed(3);wrap.dataset.expClickToSrcMs=(srcAt-clickAt).toFixed(3);wrap.appendChild(iframe);window.__ensureYTApiLoaded__?.();
      iframe.addEventListener("load",()=>{const loadAt=performance.now();if(window.__EXP_VIDEO_LAST_TIMING__?.id===id)window.__EXP_VIDEO_LAST_TIMING__.loadAt=loadAt;wrap.dataset.expIframeLoadMs=(loadAt-srcAt).toFixed(3);button.remove();wrap.classList.remove("is-loading");wrap.classList.add("is-ready");window.__initYTPlayersExpiriti__?.()},{once:true});
    };
    button.addEventListener("click",load);["pointerenter","focus","touchstart"].forEach(type=>button.addEventListener(type,warmYouTube,{once:true,passive:type!=="focus"}));
  });
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
})();
/* EXPIRITI_R17_PASS4_SERVICE_STATIC_MEDIA_OWNER_END */

/* EXPIRITI_R17_SERVICE_GUIDED_DUAL_CTA_OWNER_START */
(()=>{
  const iconPhone='<svg class="qa-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 13 13 0 0 0 4.1.7 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A18.7 18.7 0 0 1 2.8 2.4 1.2 1.2 0 0 1 4 1.2h3.3a1.2 1.2 0 0 1 1.2 1.2c0 1.4.2 2.8.7 4.1a1.2 1.2 0 0 1-.3 1.2z"/></svg>';
  const boot=()=>document.querySelectorAll("#sesion-guiada .exp-session-actions").forEach(row=>{
    if(row.dataset.expR17DualCta==="1")return;
    const service=(document.querySelector("h1")?.textContent||"servicios ExpIRI Ti").trim();
    const wa=document.createElement("a");
    wa.className="btn btn-grad-green hero-btn exp-guided-wa";wa.target="_blank";wa.rel="noopener";
    wa.href="https://wa.me/525568437918?text="+encodeURIComponent("Hola ExpIRI Ti, quiero orientación sobre "+service+".");
    wa.setAttribute("aria-label","Enviar mensaje por WhatsApp sobre "+service);
    wa.innerHTML='<span>Enviar</span><img src="/IMG/whatsapp.svg" alt="" width="18" height="18">';
    const call=document.createElement("a");
    call.className="btn btn-grad-blue hero-btn exp-guided-call";call.href="tel:+525568437918";
    call.setAttribute("aria-label","Llamar a ExpIRI Ti para orientación sobre "+service);
    call.innerHTML='<span>Llamar</span>'+iconPhone;
    row.replaceChildren(wa,call);row.dataset.expR17DualCta="1";
  });
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
})();
/* EXPIRITI_R17_SERVICE_GUIDED_DUAL_CTA_OWNER_END */

/* EXPIRITI_R17_SOLUCIONES_STICKY_VISIBILITY_OWNER_START */
(()=>{
  const boot=()=>{
    if(!document.body?.classList.contains("page-soluciones"))return;
    const inline=document.querySelector(".lp-panel--nose > .lp-cta-row"),sticky=document.querySelector(".lp-sticky");
    if(!inline||!sticky||!("IntersectionObserver" in window))return;
    new IntersectionObserver(([entry])=>{
      const covered=entry.isIntersecting&&entry.intersectionRatio>=.55;
      sticky.hidden=covered;sticky.setAttribute("aria-hidden",covered?"true":"false");
    },{threshold:[0,.55,1]}).observe(inline);
  };
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
})();
/* EXPIRITI_R17_SOLUCIONES_STICKY_VISIBILITY_OWNER_END */

/* EXPIRITI_R17_POLIZAS_SUMMARY_OWNER_START */
(()=>{
  const boot=()=>{
    if(!/\/SERVICIOS\/polizas\.html$/i.test(location.pathname))return;
    document.querySelectorAll('#beneficios a[href="#caracteristicas"]').forEach(link=>{
      if((link.textContent||"").trim()==="Ver qué incluye")link.remove();
    });
  };
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
})();
/* EXPIRITI_R17_POLIZAS_SUMMARY_OWNER_END */
/* EXPIRITI_R17_FINAL_RESMOKE_SINGLE_REEL_OWNER_START */
(()=>{"use strict";const clean=()=>document.querySelectorAll('.carousel[id^="carouselReels"]').forEach(root=>{const slides=[...root.querySelectorAll(".carousel-track > .carousel-slide")],playable=slides.filter(sl=>{const wrap=sl.querySelector(".reel-embed[data-ytid],.yt-wrap[data-ytid]"),id=wrap?.dataset.ytid||"";return /^[A-Za-z0-9_-]{11}$/.test(id)&&!wrap.classList.contains("is-media-pending")&&!wrap.querySelector(".exp-media-pending")});if(playable.length!==1)return;slides.filter(sl=>!playable.includes(sl)).forEach(sl=>{sl.hidden=true;sl.setAttribute("aria-hidden","true")});const nav=root.querySelector(".carousel-nav");nav?.replaceChildren();nav?.style.setProperty("display","none","important");root.querySelectorAll(".arrowCircle.prev,.arrowCircle.next").forEach(btn=>{btn.hidden=true;btn.style.setProperty("display","none","important")});root.toggleAttribute("data-single",true)});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",clean,{once:true}):queueMicrotask(clean);window.addEventListener("pageshow",clean,{passive:true})})();
/* EXPIRITI_R17_FINAL_RESMOKE_SINGLE_REEL_OWNER_END */
/* R18_HUMAN_SMOKE_SERVICE_ODD_GRID_OWNER */
(()=>{const boot=()=>{const grids=[...document.querySelectorAll('#cursosGrid,#serverUseGrid')];if(!grids.length)return;const sync=grid=>{const all=[...grid.querySelectorAll(':scope>.fcard')];all.forEach(c=>c.classList.remove('exp-tail-one','exp-tail-two-first','exp-tail-two-last'));const visible=all.filter(c=>getComputedStyle(c).display!=='none'),columns=innerWidth<=640?1:innerWidth<=980?2:3,rem=visible.length%columns;if(columns>1&&rem===1)visible.at(-1)?.classList.add('exp-tail-one');else if(columns===3&&rem===2){visible.at(-2)?.classList.add('exp-tail-two-first');visible.at(-1)?.classList.add('exp-tail-two-last')}};grids.forEach(grid=>{sync(grid);new MutationObserver(()=>sync(grid)).observe(grid,{subtree:true,attributes:true,attributeFilter:['style','hidden']})});setTimeout(()=>grids.forEach(sync),120);let raf=0;addEventListener('resize',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>grids.forEach(sync))},{passive:true});document.addEventListener('click',e=>{if(e.target.closest('.pillbar,.pill'))requestAnimationFrame(()=>grids.forEach(sync))})};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot()})();
/* R18_EXTERNAL_REVIEW_FOOTER_OBSERVER_OWNER */
(()=>{if(window.__EXP_SERVICE_FOOTER_OBSERVER__)return;window.__EXP_SERVICE_FOOTER_OBSERVER__=1;let observer=null;const bind=()=>{const footer=document.getElementById("gf-root"),toc=document.getElementById("toc");if(!footer||!toc||footer.dataset.observerBound==="1")return false;footer.dataset.observerBound="1";const set=hidden=>{document.body.classList.toggle("gf-footer-in-view",hidden);toc.style.opacity=hidden?"0":"";toc.style.visibility=hidden?"hidden":"";toc.style.pointerEvents=hidden?"none":"";toc.setAttribute("aria-hidden",hidden?"true":"false")};observer=new IntersectionObserver(entries=>set(entries.some(entry=>entry.isIntersecting)),{threshold:0});observer.observe(footer);return true};if(!bind()){const mo=new MutationObserver(()=>{if(bind())mo.disconnect()});mo.observe(document.documentElement,{childList:true,subtree:true})}})();

/* R19_GATE3_VISIBLE_CLOUD_NAMES_OWNER */
(()=>{"use strict";const replacements=[["Contabiliza","Contabilidad Nube"],["Personia","Nóminas Nube"]],replace=value=>replacements.reduce((out,[from,to])=>out.replace(new RegExp(`\\b${from}\\b`,"g"),to),value),scan=root=>{if(root.nodeType===3){if(!root.parentElement?.closest("script,style,noscript"))root.nodeValue=replace(root.nodeValue);return}if(root.nodeType!==1)return;const element=root;element.querySelectorAll("[alt],[title],[aria-label]").forEach(el=>["alt","title","aria-label"].forEach(attr=>{const value=el.getAttribute(attr);if(value)el.setAttribute(attr,replace(value))}));const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{if(!node.parentElement?.closest("script,style,noscript"))node.nodeValue=replace(node.nodeValue)})},boot=()=>{scan(document.documentElement);new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(scan))).observe(document.documentElement,{childList:true,subtree:true})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();
