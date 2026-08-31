 // main.js (al inicio)
if (/[?&]freeze=1\b/.test(location.search)) {
  document.body.classList.add('debug-freeze');
}

/* =========================================================
 ExpIRI Ti - main.js (FINAL) v2026.01.08-r2 (COMPACTO + COMENTARIOS)
 - FIX: evita que 1 error rompa TODO (módulos con try/catch)
 - FIX: bloque 10 (CALC) rearmado (cierre de llaves seguro)
 - GATE: Calc/Compact/Icons solo si DOM esperado existe
========================================================= */
window.__EXP_SAFE__=/(?:\?|&)safe=1\b/.test(location.search);

(()=>{"use strict";
if(window.__EXP_SAFE__){console.warn("[SAFE MODE] main.js detenido");return;}
if(window.__EXP_MAIN_FINAL__)return;window.__EXP_MAIN_FINAL__=1;

const D=document,W=window;
const TRY=(name,fn)=>{try{fn()}catch(e){console.warn("[main.js] módulo falló:",name,e)}};

      /* 0) BASE PROD ROOT */
TRY("base_prod",()=>{const abs=p=>{if(!p)return p;if(/^https?:\/\//i.test(p)||/^(mailto:|tel:|data:|blob:|javascript:)/i.test(p))return p;if(p.startsWith("/"))return p;if(p.startsWith("../"))return"/"+p.replace(/^(\.\.\/)+/,"");if(p.startsWith("./"))return"/"+p.replace(/^\.\//,"");return"/"+p};W.__EXP_ABS__=abs;W.__EXP_BASE__="/";const y=D.getElementById("gf-year")||D.getElementById("year");if(y)y.textContent=(new Date).getFullYear()});
      


TRY("preview_project_base",()=>{const PB="/expiriti-r19-preview-20260826/";const abs=p=>{if(!p)return p;if(/^https?:\/\//i.test(p)||/^(mailto:|tel:|data:|blob:|javascript:)/i.test(p)||p.startsWith("//")||p.startsWith("#"))return p;if(p.startsWith(PB))return p;if(p==="/")return PB;if(p.startsWith("/"))return PB+p.slice(1);if(p.startsWith("../"))return PB+p.replace(/^(\.\.\/)+/,"");if(p.startsWith("./"))return PB+p.replace(/^\.\//,"");return PB+p;};W.__EXP_ABS__=abs;W.__EXP_BASE__=PB;});

/* =========================================================
 1.5) CATALOGO SISTEMAS (GLOBAL)
========================================================= */
TRY("catalog_sistemas",()=>{const W=window;W.CATALOG_SISTEMAS=[{name:"CONTPAQi Contabilidad",img:"IMG/logos/contabilidad-nsq-160.webp",imgLogo:"IMG/logos/contabilidad-hz-384.webp"},{name:"CONTPAQi Bancos",img:"IMG/logos/bancos-nsq-160.webp",imgLogo:"IMG/logos/bancos-hz-384.webp"},{name:"CONTPAQi Nóminas",img:"IMG/logos/nominas-nsq-160.webp",imgLogo:"IMG/logos/nominas-hz-384.webp"},{name:"CONTPAQi XML en Línea",img:"IMG/logos/xml-nsq-160.webp",imgLogo:"IMG/logos/xml-hz-384.webp",noDiscount:!0},{name:"CONTPAQi Comercial START",img:"IMG/logos/comercial-start-nsq-160.webp",imgLogo:"IMG/logos/comercial-start-hz-384.webp"},{name:"CONTPAQi Comercial PRO",img:"IMG/logos/comercial-pro-nsq-160.webp",imgLogo:"IMG/logos/comercial-pro-hz-384.webp"},{name:"CONTPAQi Comercial PREMIUM",img:"IMG/logos/comercial-premium-nsq-160.webp",imgLogo:"IMG/logos/comercial-premium-hz-384.webp"},{name:"CONTPAQi Factura Electrónica",img:"IMG/logos/factura-nsq-160.webp",imgLogo:"IMG/logos/factura-hz-384.webp"}].map(x=>({...x,img:(W.__EXP_ABS__?W.__EXP_ABS__(x.img):x.img),imgLogo:(W.__EXP_ABS__?W.__EXP_ABS__(x.imgLogo):x.imgLogo)}))});
TRY("r19_dynamic_logo_srcset",()=>{const apply=img=>{if(!img||img.srcset)return;const src=img.getAttribute("src")||"",m=src.match(/(?:^|\/)IMG\/logos\/(.+)-(nsq|hz)-(160|384)\.webp$/);if(!m)return;const name=m[1],kind=m[2];if(kind==="nsq"){img.srcset=`/expiriti-r19-preview-20260826/IMG/logos/${name}-nsq-160.webp 160w, /IMG/logos/${name}-nsq-320.webp 320w`;img.sizes=img.closest(".sys-icon")?"90px":"92px";img.width=160;img.height=160}else{const dimensions={"anticipa":[384,124],"bancos":[384,96],"comercial-premium":[384,129],"comercial-pro":[384,120],"comercial-start":[384,131],"contabilidad":[384,111],"contabilidad-nube":[384,109],"evalua":[384,136],"factura":[384,104],"nominas":[384,86],"nominas-nube":[384,126],"optimiza":[384,112],"vende":[384,100],"xml":[384,131]},dim=dimensions[name]||[384,128],top=name==="comercial-start"?740:name==="comercial-pro"?738:768;img.srcset=`/expiriti-r19-preview-20260826/IMG/logos/${name}-hz-384.webp 384w, /IMG/logos/${name}-hz-${top}.webp ${top}w`+(name==="nominas"?", /IMG/logos/nominas-hz-1440.webp 1440w":"");img.sizes=img.classList.contains("calc-syslogo")?"260px":img.classList.contains("sum-logo")?"120px":"240px";img.width=dim[0];img.height=dim[1]}img.dataset.r19Logo="dynamic-"+kind};const scan=root=>(root.matches?.('img[src*="IMG/logos/"]')&&apply(root),root.querySelectorAll?.('img[src*="IMG/logos/"]').forEach(apply));scan(D);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>n.nodeType===1&&scan(n)))).observe(D.documentElement,{childList:true,subtree:true})});
TRY("pricing_nube_json",()=>{const Q=(s,c=D)=>c.querySelector(s),money=n=>"$"+Number(n||0).toLocaleString("es-MX"),txt=v=>v===undefined||v===null?"—":String(v),isNube=()=>D.body&&D.body.getAttribute("data-calc")==="nube",PR=()=>W.preciosContpaqi||null,recommendedBySystem={"CONTPAQi Evalúa":"Equipos","CONTPAQi Contabiliza":"Equipos","CONTPAQi Personia":"Equipos","CONTPAQi Analiza":"Equipos","CONTPAQi Optimiza":"Equipos","CONTPAQi Anticipa":"Equipos","CONTPAQi Vende":"Equipos"},descBySystem={"CONTPAQi Evalúa":{Inicial:"Ideal para comenzar evaluación laboral",Equipos:"Para áreas o equipos medianos",Empresarial:"Para operación más amplia",Corporativo:"Máxima capacidad y cobertura"},"CONTPAQi Contabiliza":{Inicial:"Ideal para operación básica",Equipos:"Más capacidad para crecer",Empresarial:"Para empresas medianas",Corporativo:"Administración avanzada"},"CONTPAQi Personia":{Inicial:"Ideal para pequeñas empresas",Equipos:"Más capacidad para crecer",Empresarial:"Para empresas medianas",Corporativo:"Administración avanzada"},"CONTPAQi Analiza":{Trial:"Prueba 20 días",Inicial:"Para iniciar BI con CONTPAQi",Equipos:"Colaboración y más RFC",Empresarial:"Para operación multiárea",Corporativo:"Máxima capacidad"},"CONTPAQi Optimiza":{Demo:"Prueba 20 días",Inicial:"Control esencial de flujo",Equipos:"Visión estratégica PYME",Empresarial:"Mayor capacidad operativa",Corporativo:"Poder total e ilimitado"},"CONTPAQi Anticipa":{Demo:"Prueba 20 días",Inicial:"Protección inicial",Equipos:"Más RFC y colaboración",Empresarial:"Para operación multiárea",Corporativo:"Cobertura avanzada"},"CONTPAQi Vende":{LIGHT:"Entrada / operaciones básicas",Inicial:"Para facturar y cobrar sin complicarte",Equipos:"Para operar con 2 usuarios",Empresarial:"Operación multiusuario",Corporativo:"Máxima capacidad"}},recBadge=(sys,plan)=>recommendedBySystem[sys]===plan?`<span class="plan-rec">Recomendado</span>`:"",planLabel=(sys,plan)=>`<span class="plan-name">${plan}${recBadge(sys,plan)}${descBySystem[sys]&&descBySystem[sys][plan]?`<div class="plan-desc">${descBySystem[sys][plan]}</div>`:""}</span>`,row=(cells,cls="")=>`<tr${cls?` class="${cls}"`:""}>${cells.map(x=>`<td>${x}</td>`).join("")}</tr>`,noteText=html=>`<div class="pricing-table-note">${html}</div>`,wrapTable=(thead,tbody,tfoot="",after="",note="")=>`<div class="pricing-table-nube-wrap"><table class="pricing-table-nube" aria-describedby="calc">${thead}<tbody>${tbody}</tbody>${tfoot}</table></div>${after}${note}`,extrasBar=items=>items&&items.length?`<div class="pricing-nube-extras">${items.map(x=>`<div class="pricing-nube-extra"><div><span class="k">${x.k}</span>${x.v?`<span class="v">${x.v}</span>`:""}</div><span class="price">${x.p}</span></div>`).join("")}</div>`:"",NOTE="Precios en Moneda Nacional (MXN) + IVA, conforme a la lista de precios CONTPAQi 2026.",builders={"CONTPAQi Evalúa":p=>{const n=p.nube||{},o=["Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Evalúa",k),txt(x.usuarios_incluidos==="multi"?"Multiusuario":x.usuarios_incluidos),`${txt(x.empleados_incluidos)} empleados`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"");x.empleado_adicional&&extras.push({k:`Empleado adicional ${k}`,v:"Costo por empleado",p:money(x.empleado_adicional)})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios incluidos</th><th>Empleados incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Contabiliza":p=>{const n=p.nube||{},o=["Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Contabiliza",k),`${txt(x.usuarios_incluidos)} Usuario${Number(x.usuarios_incluidos)===1?"":"s"}`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios Incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Personia":p=>{const n=p.nube||{},o=["Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Personia",k),txt(x.usuarios_incluidos==="multi"?"Multiusuario":x.usuarios_incluidos),`${txt(x.empleados_incluidos)} empleados`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"");x.empleado_adicional&&extras.push({k:`Empleado adicional ${k}`,v:"Costo por empleado",p:money(x.empleado_adicional)})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios Incluidos</th><th>Empleados Incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Analiza":p=>{const n=p.nube||{},o=["Trial","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Analiza",k),txt(x.usuarios_incluidos),txt(x.rfc_incluidos),txt(x.carga_xml==="ilimitado"?"Ilimitado":x.carga_xml),`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});n.rfc_adicional&&typeof n.rfc_adicional==="object"&&["Inicial","Equipos","Empresarial","Corporativo"].forEach(k=>{n.rfc_adicional[k]&&extras.push({k:`RFC adicional ${k}`,v:"Costo anual",p:money(n.rfc_adicional[k])})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios</th><th>RFC incluidos</th><th>Carga XML</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Optimiza":p=>{const n=p.nube||{},o=["Demo","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Optimiza",k),txt(x.usuarios_incluidos),txt(x.rfc_incluidos),`${txt(x.almacenamiento_gb)} GB`,`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});n.rfc_adicional&&extras.push({k:"RFC adicional",v:"Costo anual",p:money(n.rfc_adicional)});n.espacio_adicional&&typeof n.espacio_adicional==="object"&&Object.keys(n.espacio_adicional).forEach(k=>{extras.push({k:`Espacio adicional ${k}`,v:"Almacenamiento extra",p:money(n.espacio_adicional[k])})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios</th><th>RFC incluidos</th><th>Almacenamiento</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Anticipa":p=>{const n=p.nube||{},o=["Demo","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;b+=row([planLabel("CONTPAQi Anticipa",k),txt(x.usuarios_incluidos),txt(x.rfc_incluidos),`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Costo anual",p:money(n.usuario_adicional)});n.rfc_adicional&&typeof n.rfc_adicional==="object"&&["Inicial","Equipos","Empresarial","Corporativo"].forEach(k=>{n.rfc_adicional[k]&&extras.push({k:`RFC adicional ${k}`,v:"Costo anual",p:money(n.rfc_adicional[k])})});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios</th><th>RFC incluidos</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))},"CONTPAQi Vende":p=>{const n=p.nube||{},o=["LIGHT","Inicial","Equipos","Empresarial","Corporativo"];let b="",extras=[];o.forEach(k=>{const x=n[k];if(!x)return;const m={LIGHT:"Funciones esenciales",Inicial:"Para la mayoría de PyMEs",Equipos:"Mejor para equipos",Empresarial:"Para equipos con más volumen",Corporativo:"Operación avanzada"};b+=row([planLabel("CONTPAQi Vende",k),`${txt(x.usuarios_incluidos)} Usuario${Number(x.usuarios_incluidos)===1?"":"s"}`,m[k]||"—",`<span class="price">${money(x.precio_base)}</span>`],k==="Equipos"?"is-rec":"")});n.usuario_adicional&&extras.push({k:"Usuario adicional",v:"Licenciamiento anual",p:money(n.usuario_adicional)});n.addendas===!0&&extras.push({k:"Addendas",v:"Incluidas",p:"Sin costo"});n.complementos===!0&&extras.push({k:"Complementos",v:"Incluidos",p:"Sin costo"});return wrapTable(`<thead><tr><th>Plan</th><th>Usuarios Incluidos</th><th>Notas</th><th style="text-align:right">Precio Base Anual</th></tr></thead>`,b,"",extrasBar(extras),noteText(NOTE))}},render=()=>{if(!isNube())return;const a=Q("#app"),s=Q("#calculadora-section"),d=PR();if(!a||!s||!d)return;const sys=(a.dataset.system||"").trim();if(!sys)return;const product=d[sys],build=builders[sys];if(!product||!product.nube||typeof build!=="function")return;Q(".hint",s)?.remove();Q(".hint",Q(".card.body",s)||s)?.remove();const card=Q(".card.body",s);if(!card)return;const html=build(product);if(!html)return;const oldWrap=Q(".pricing-table-nube-wrap",card),oldExtras=Q(".pricing-nube-extras",card),oldNote=Q(".pricing-table-note",card),oldTable=Q(".pricing-table-nube",card);if(oldWrap){oldWrap.outerHTML=html;oldExtras&&oldExtras.remove();oldNote&&oldNote.remove()}else if(oldTable){oldTable.outerHTML=html;oldExtras&&oldExtras.remove();oldNote&&oldNote.remove()}else card.insertAdjacentHTML("afterbegin",html)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",render,{once:!0}):render();W.addEventListener("pageshow",render,{passive:!0})});TRY("pricing_nube_refine",()=>{const mark=()=>{D.querySelectorAll(".pricing-table-nube").forEach(t=>{const rows=[...t.querySelectorAll("tbody tr")];let cut=!1;rows.forEach(r=>{r.classList.remove("first-extra");if(r.classList.contains("row-soft")&&!cut){r.classList.add("first-extra");cut=!0}})})};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",mark,{once:!0}):mark();W.addEventListener("pageshow",mark,{passive:!0})});

/* =========================================================
 2) VIDEOS: AGRUPAR EN SLIDES DE 2 (solo si existe #carouselVideos)
========================================================= */
TRY("videos_group2",()=>{
  const q=(s,c=D)=>c.querySelector(s),qa=(s,c=D)=>Array.from(c.querySelectorAll(s));

  const groupVideos2=()=>{
    const car=D.getElementById("carouselVideos");
    if(!car||car.dataset.grp2==="1")return;

    const track=q(".carousel-track",car);
    if(!track){car.dataset.grp2="1";return;}

    if(qa(":scope > .carousel-slide",track).length){car.dataset.grp2="1";return;}

    const kids=qa(":scope > *",track).filter(n=>n&&n.nodeType===1);
    const items=kids.filter(n=>!n.classList.contains("carousel-nav")&&!n.classList.contains("yt-titlesbar"));
    if(!items.length){car.dataset.grp2="1";return;}

    track.innerHTML="";
    for(let i=0;i<items.length;i+=2){
      const slide=D.createElement("div");
      slide.className="carousel-slide vid-slide";
      slide.appendChild(items[i]);
      if(items[i+1]) slide.appendChild(items[i+1]);
      else slide.classList.add("is-single");
      track.appendChild(slide);
    }

    car.dataset.grp2="1";
    if(car._grpObs){ try{car._grpObs.disconnect()}catch{} car._grpObs=null; }
  };

  const boot=()=>groupVideos2();

  D.readyState==="loading"
    ? D.addEventListener("DOMContentLoaded",boot,{once:!0})
    : boot();

  W.addEventListener("load",boot,{passive:!0});
  W.addEventListener("pageshow",boot,{passive:!0});

  const car=D.getElementById("carouselVideos");
  if(car && !car._grpObs){
    car._grpObs=new MutationObserver(()=>groupVideos2());
    car._grpObs.observe(car,{childList:!0,subtree:!0});
  }
});

/* =========================================================
 3) YOUTUBE MANAGER (static first paint + click activation)
========================================================= */
TRY("yt_manager",()=>{
  if(W.__EXP_YT_MGR__)return;W.__EXP_YT_MGR__=1;W.exPlayers=W.exPlayers||[];
  const badThumbnailIds=new Set(["W_BN48xljEs","Im5t0qxDx_I","DEi0pOpkYOs","MULFWVkojUQ"]);
  W.__EXP_BAD_THUMBNAIL_IDS__=[...badThumbnailIds];
  W.pauseAllYTIframes=function(except){(W.exPlayers||[]).forEach(p=>{if(!p||p===except||typeof p.pauseVideo!=="function")return;try{const s=p.getPlayerState();if(s===1||s===3)p.pauseVideo()}catch{}})};
  const onState=e=>{if(e&&e.data===1)W.pauseAllYTIframes(e.target)};
  const ensureAPI=()=>{if(W.__EXP_YT_API_REQ__)return;W.__EXP_YT_API_REQ__=1;const s=D.createElement("script");s.src="https://www.youtube.com/iframe_api";D.head.appendChild(s)};
  const whenYT=cb=>{if(W.YT&&W.YT.Player){cb();return}ensureAPI();let t=0;const it=setInterval(()=>{if(W.YT&&W.YT.Player){clearInterval(it);cb()}else if(++t>80)clearInterval(it)},100)};
  const registerIframe=ifr=>{if(!ifr||ifr.dataset.ytInit)return;ifr.dataset.ytInit="1";try{W.exPlayers.push(new YT.Player(ifr,{events:{onStateChange:onState}}))}catch{}};
  const warmYouTube=()=>[["https://www.youtube-nocookie.com","anonymous"],["https://i.ytimg.com",""]].forEach(([href,crossOrigin])=>{if(D.head.querySelector('link[rel="preconnect"][href="'+href+'"]'))return;const link=D.createElement("link");link.rel="preconnect";link.href=href;if(crossOrigin)link.crossOrigin=crossOrigin;D.head.appendChild(link)});
  const mount=wrap=>{
    if(!wrap||wrap.dataset.ytBound==="1")return;
    const id=wrap.dataset.ytid||"",title=wrap.dataset.title||"Video",button=wrap.querySelector(":scope > .exp-media-poster");
    if(!/^[A-Za-z0-9_-]{11}$/.test(id)||!button)return;
    const generated=wrap.classList.contains("generated-preview");
    if(badThumbnailIds.has(id)&&!generated){wrap.dataset.mediaContractError="allowlist-mismatch";return}
    wrap.dataset.ytBound="1";
    const load=()=>{
      if(wrap.dataset.ytMounted==="1")return;
      const clickAt=performance.now();wrap.dataset.ytMounted="1";wrap.classList.add("is-loading");button.disabled=true;button.setAttribute("aria-pressed","true");W.pauseAllYTIframes();
      const iframe=D.createElement("iframe"),createdAt=performance.now();
      iframe.loading="eager";iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";iframe.allowFullscreen=true;iframe.title=title;
      iframe.src="https://www.youtube-nocookie.com/embed/"+id+"?rel=0&modestbranding=1&playsinline=1&autoplay=1&enablejsapi=1&vq=hd1080";
      const srcAt=performance.now();W.__EXP_VIDEO_LAST_TIMING__={id,clickAt,createdAt,srcAt,loadAt:null};wrap.dataset.expClickToCreateMs=(createdAt-clickAt).toFixed(3);wrap.dataset.expClickToSrcMs=(srcAt-clickAt).toFixed(3);wrap.appendChild(iframe);wrap.classList.add("has-iframe");
      iframe.addEventListener("load",()=>{const loadAt=performance.now();if(W.__EXP_VIDEO_LAST_TIMING__?.id===id)W.__EXP_VIDEO_LAST_TIMING__.loadAt=loadAt;wrap.dataset.expIframeLoadMs=(loadAt-srcAt).toFixed(3);button.remove();wrap.classList.remove("is-loading");wrap.classList.add("is-ready")},{once:true});
      whenYT(()=>registerIframe(iframe));
    };
    button.addEventListener("click",load);
    ["pointerenter","focus","touchstart"].forEach(type=>button.addEventListener(type,warmYouTube,{once:true,passive:type!=="focus"}));
  };
  const init=()=>D.querySelectorAll(".yt-wrap[data-ytid],.reel-embed[data-ytid]").forEach(mount);
  const prevReady=W.onYouTubeIframeAPIReady;W.onYouTubeIframeAPIReady=function(){try{prevReady&&prevReady()}catch{}D.querySelectorAll('iframe[src*="youtube"]').forEach(registerIframe)};
  D.readyState==="loading"?D.addEventListener("DOMContentLoaded",init,{once:true}):init();
});

/* =========================================================
 4) CARRUSEL UNIVERSAL (.carousel)
========================================================= */
/* EXPIRITI_R17_DOT_SETTLE_OWNER_START =======================================
 * Modelo unico de estado para los dots de TODOS los carruseles de SISTEMAS:
 *
 *   indice logico pedido -> scroll/teleport -> indice asentado -> UN solo pintado
 *
 * Antes cada familia resolvia esto por su cuenta:
 *   - carousel_universal (#carouselReels, #carouselVideos): lock booleano con
 *     setTimeout fijo; dos navegaciones seguidas liberaban el lock antes de que
 *     terminara el scroll.
 *   - carouselX (#integra "sistemas que complementan"): SIN lock; el listener de
 *     scroll repintaba cada pagina intermedia durante el scroll suave, de ahi el
 *     "cambia -> vuelve al anterior -> cambia otra vez" observado por el usuario.
 *
 * Comportamiento de referencia: los reels de SERVICIOS (lock por timestamp +
 * indice cuantizado). Aqui se generaliza sin tocar ningun carrusel de Servicios.
 *
 * Un solo mecanismo de repintado: scroll con debounce. NO se añade 'scrollend'
 * para que no compitan dos pintores por el mismo estado.
 * ========================================================================= */
(()=>{
  if(window.__expDotNav)return;

  const SETTLE=110;

  window.__expDotNav=track=>{
    const st={until:0,raf:0,timer:0,last:null};

    const clearPending=()=>{
      if(st.raf){cancelAnimationFrame(st.raf);st.raf=0}
      if(st.timer){clearTimeout(st.timer);st.timer=0}
    };

    return {
      /* empieza un movimiento programatico: extiende el bloqueo y cancela
         cualquier repintado pendiente de un gesto anterior */
      begin(ms,idx){
        st.until=Math.max(st.until,performance.now()+(ms||520));
        clearPending();
        if(idx!==undefined&&idx!==null)st.last=idx;
      },
      /* registra el indice ya pintado, para no volver a pintarlo */
      mark(idx){st.last=idx},
      locked(){return performance.now()<st.until},
      /* se llama en CADA evento de scroll; solo pinta una vez, cuando el scroll
         dejo de moverse y el bloqueo del movimiento programatico ya vencio */
      settle(compute,paint){
        clearPending();
        const wait=Math.max(SETTLE,st.until-performance.now()+40);
        st.timer=setTimeout(()=>{
          st.timer=0;
          st.raf=requestAnimationFrame(()=>{
            st.raf=0;
            const v=compute();
            if(v===null||v===undefined||v===st.last)return;
            st.last=v;
            paint(v);
          });
        },wait);
      }
    };
  };
})();
/* EXPIRITI_R17_DOT_SETTLE_OWNER_END */

TRY("carousel_universal",()=>{const pause=()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes()};const syncDots=(r,l)=>{const n=r.querySelector(".carousel-nav");if(!n)return[];let d=[...n.querySelectorAll(".dot")];for(;d.length<l;){const b=D.createElement("button");b.type="button";b.className="dot";b.setAttribute("aria-label",`Ir al slide ${d.length+1}`);n.appendChild(b);d.push(b)}for(;d.length>l;){const x=d.pop();x&&x.remove()}return d};const hideUI=(r,l)=>{const p=r.querySelector(".arrowCircle.prev"),n=r.querySelector(".arrowCircle.next"),v=r.querySelector(".carousel-nav"),s=l<=1;if(p){p.disabled=s;p.style.display=s?"none":""}if(n){n.disabled=s;n.style.display=s?"none":""}if(v)v.style.display=s?"none":"";r.toggleAttribute("data-single",s)};const titlesFor=c=>{const sel=c.getAttribute("data-titles");if(sel){const n=[...D.querySelectorAll(sel)];if(n.length)return n}const a=c.closest("aside");if(a){const t=[...a.querySelectorAll(":scope > .reel-title")];return t.length?t:null}const p=c.parentElement||D,t=[...p.querySelectorAll(".reel-title")];return t.length?t:null};const slideReelTitle=s=>{if(!s)return"";const w=s.querySelector(".reel-embed[data-title],.yt-wrap[data-title]");if(w){const x=(w.getAttribute("data-title")||"").trim();if(x)return x}const i=s.querySelector("iframe[title]");if(i){const x=(i.getAttribute("title")||"").trim();if(x)return x}const h=s.querySelector("h4,h3");return h?(h.textContent||"").trim():""};const applyMarquee=h=>{if(!h)return;if(h.dataset.mqInit==="1")return;const t=(h.textContent||"").trim();if(!t)return;h.textContent=t;if(h.dataset.mqTouch!=="1"){h.dataset.mqTouch="1";h.addEventListener("pointerdown",()=>{h.classList.add("mq-paused")},{passive:!0});h.addEventListener("pointerup",()=>{setTimeout(()=>h.classList.remove("mq-paused"),600)},{passive:!0});h.addEventListener("pointercancel",()=>{h.classList.remove("mq-paused")},{passive:!0});h.addEventListener("touchstart",()=>{h.classList.add("mq-paused")},{passive:!0});h.addEventListener("touchend",()=>{setTimeout(()=>h.classList.remove("mq-paused"),600)},{passive:!0})}requestAnimationFrame(()=>{const sw=h.scrollWidth,cw=h.clientWidth;if(sw<=cw+8){h.classList.remove("is-marquee");return}const tr=document.createElement("span");tr.className="__mqTrack";const a=document.createElement("span");a.textContent=t;const b=document.createElement("span");b.textContent=t;tr.append(a,b);h.innerHTML="";h.appendChild(tr);h.style.setProperty("--mq-dur",Math.min(18,Math.max(10,t.length*.22))+"s");h.classList.add("is-marquee");h.dataset.mqInit="1"})};const ensureVideosBar=c=>{if(!c||c.dataset.vbarInit==="1")return;c.dataset.vbarInit="1";const t=c.querySelector(".carousel-track");if(!t)return;const bar=D.createElement("div");bar.className="yt-titlesbar";bar.setAttribute("role","presentation");const l=D.createElement("div"),r=D.createElement("div");l.className="yt-tab";r.className="yt-tab";bar.append(l,r);t.parentElement.insertBefore(bar,t);c._vbar={bar,left:l,right:r}};const slideVideoTitles=s=>{if(!s)return[];const h=[...s.querySelectorAll(".yt-title")].map(x=>(x.textContent||"").trim()).filter(Boolean);if(h.length)return h;const d=[...s.querySelectorAll(".yt-wrap[data-title],.reel-embed[data-title]")].map(x=>(x.getAttribute("data-title")||"").trim()).filter(Boolean);if(d.length)return d;return[...s.querySelectorAll("iframe[title]")].map(x=>(x.getAttribute("title")||"").trim()).filter(Boolean)};const updateVideosBar=(c,i)=>{if(!c||c.id!=="carouselVideos")return;ensureVideosBar(c);c.querySelectorAll(".yt-title").forEach(h=>h.classList.add("yt-title--hidden"));const t=c.querySelector(".carousel-track"),s=t?[...t.querySelectorAll(":scope > .carousel-slide")]:[];if(!s.length)return;const sl=s[i]||s[0],tt=slideVideoTitles(sl),a=tt[0]||"",b=tt[1]||"",v=c._vbar;if(!v)return;v.left.textContent=a;v.right.textContent=b;v.right.style.display=b?"":"none";v.bar.style.gridTemplateColumns=b?"1fr 1fr":"1fr"};const initCar=(r,onChange)=>{const t=r.querySelector(".carousel-track");if(!t||r.dataset.cInit==="1")return;r.dataset.cInit="1";const p=r.querySelector(".arrowCircle.prev"),n=r.querySelector(".arrowCircle.next"),s=[...t.querySelectorAll(":scope > .carousel-slide")],l=s.length;let d=syncDots(r,l);hideUI(r,l);let i=0;/* EXPIRITI_R17: el lock booleano+setTimeout se sustituye por el modelo de settle compartido */const nav=W.__expDotNav(t);const paint=x=>d.forEach((o,k)=>o.classList.toggle("active",k===x)),leftFor=x=>(s[x]?.offsetLeft)||0,set=(x,b)=>{if(l<=0)return;const prev=i;i=(x+l)%l;const wrap=Math.abs(i-prev)>1;nav.begin(wrap?320:640,i);paint(i);t.scrollTo({left:leftFor(i),behavior:b||(wrap?"instant":"smooth")});onChange&&onChange(i)};if(l<=1){paint(0);onChange&&onChange(0);return}d.forEach((o,k)=>o.addEventListener("click",()=>{pause();set(k)}));p&&p.addEventListener("click",()=>{pause();set(i-1)});n&&n.addEventListener("click",()=>{pause();set(i+1)});t.addEventListener("scroll",()=>{nav.settle(()=>{const pos=t.scrollLeft;let best=0,dist=1e18;for(let k=0;k<l;k++){const dd=Math.abs(leftFor(k)-pos);if(dd<dist){dist=dd;best=k}}return best;},v=>{i=v;paint(i);onChange&&onChange(i)})},{passive:!0});set(0,"auto")};const boot=()=>{D.querySelectorAll(".carousel").forEach(c=>{const titles=titlesFor(c);initCar(c,i=>{if(titles&&c.id!=="carouselVideos"){const t=c.querySelector(".carousel-track"),s=t?[...t.querySelectorAll(":scope > .carousel-slide")]:[],sl=s[i]||s[0];if(titles.length===1){const txt=slideReelTitle(sl);if(txt){titles[0].dataset.mqInit="0";titles[0].textContent=txt;applyMarquee(titles[0])}titles[0].classList.add("active")}else titles.forEach((x,k)=>x.classList.toggle("active",k===i))}if(c.id==="carouselVideos")updateVideosBar(c,i)});if(titles&&c.id!=="carouselVideos"&&titles.length===1){const t=c.querySelector(".carousel-track"),s=t?[...t.querySelectorAll(":scope > .carousel-slide")]:[],txt=slideReelTitle(s[0]);if(txt){titles[0].dataset.mqInit="0";titles[0].textContent=txt;applyMarquee(titles[0])}titles[0].classList.add("active")}if(c.id==="carouselVideos")updateVideosBar(c,0)})};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:!0}):boot()});
      

/* 6) listSlider legacy owner removed by T23; see consolidated owner below. */

/* =========================================================
 9) CAROUSEL SISTEMAS (.carouselX) — SINGLE OWNER
========================================================= */
TRY("carouselX",()=>{
  const QA=(s,c=D)=>Array.from(c.querySelectorAll(s));
  const abs=p=>W.__EXP_ABS__?W.__EXP_ABS__(p):p;
  const ensureUI=r=>{
    let p=r.querySelector(".arrowCircle.prev"),n=r.querySelector(".arrowCircle.next"),d=r.querySelector(".group-dots");
    if(!p){p=D.createElement("button");p.type="button";p.className="arrowCircle prev";p.setAttribute("aria-label","Anterior");p.innerHTML='<span class="chev">‹</span>';r.appendChild(p)}
    if(!n){n=D.createElement("button");n.type="button";n.className="arrowCircle next";n.setAttribute("aria-label","Siguiente");n.innerHTML='<span class="chev">›</span>';r.appendChild(n)}
    if(!d){d=D.createElement("div");d.className="group-dots";d.setAttribute("aria-label","Paginación carrusel");r.appendChild(d)}
    return{p,n,d};
  };

  QA(".carouselX").forEach(root=>{
    if(root.dataset.cxInit==="1")return;root.dataset.cxInit="1";
    const track=root.querySelector(".track");if(!track)return;
    const items=QA(".sys",root);if(!items.length)return;
    const ui=ensureUI(root),prev=ui.p,next=ui.n,dotsWrap=ui.d;
    const isMob=()=>W.matchMedia&&W.matchMedia("(max-width: 768px)").matches;

items.forEach(it=>{
  it.setAttribute("role","link");
  it.setAttribute("tabindex","0");

  const nav=()=>{
    const href=it.getAttribute("data-href");
    if(!href)return;
    location.href=abs(href);
  };

  it.addEventListener("touchstart",()=>{
    if(isMob()) it.classList.add("show-hover");
  },{passive:true});

  it.addEventListener("touchend",()=>{
    if(isMob()) setTimeout(()=>it.classList.remove("show-hover"),180);
  },{passive:true});

  it.addEventListener("click",e=>{
    e.preventDefault();
    nav();
  },{passive:false});

  it.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===" "){
      e.preventDefault();
      nav();
    }
  });
});
    const perView=()=>W.innerWidth<=980?1:3;
    const vw=()=>track.clientWidth||root.clientWidth||1;
    const pages=()=>Math.max(1,Math.ceil((track.scrollWidth-1)/vw()));

    let idx=0,dots=[];
    const build=()=>{
      dotsWrap.innerHTML="";
      const total=pages();
      dots=Array.from({length:total}).map((_,j)=>{
        const b=D.createElement("button");b.type="button";b.className="dot"+(j===0?" active":"");
        b.setAttribute("aria-label","Ir a página "+(j+1));
        b.addEventListener("click",()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes();go(j)},{passive:!0});
        dotsWrap.appendChild(b);
        return b;
      });
    };
    const paint=j=>dots.forEach((d,i)=>d.classList.toggle("active",i===j));
    const toggle=()=>{
      const few=items.length<3;
      if(few){
        prev.style.display="none";next.style.display="none";dotsWrap.style.display="none";
        track.style.justifyContent="center";track.style.scrollSnapType="none";track.style.overflowX="hidden";
        return;
      }
      track.style.justifyContent="flex-start";track.style.overflowX="auto";
      const multi=pages()>1;
      prev.style.display=multi?"":"none";next.style.display=multi?"":"none";dotsWrap.style.display=multi?"":"none";
    };
    /* EXPIRITI_R17_DOT_SETTLE: posFor() es ahora la UNICA definicion de "donde
       empieza la pagina j". go() la usa para desplazarse y el listener de scroll
       la usa para deducir la pagina asentada, asi que ya no pueden discrepar
       (antes go() usaba items[j*perView()].offsetLeft y el listener usaba
       Math.round(scrollLeft/vw()) -> el dot podia quedarse en otra pagina). */
    const nav=W.__expDotNav(track);
    const posFor=j=>{
      const total=pages(),jj=((j%total)+total)%total;
      const start=Math.min(jj*perView(),items.length-1),el=items[start];
      const base=jj===0?0:(el?el.offsetLeft-(track.firstElementChild?track.firstElementChild.offsetLeft:0):jj*vw());
      const max=Math.max(0,track.scrollWidth-vw());
      return Math.min(Math.max(0,base),max);
    };
    const nearestPage=()=>{
      const total=pages(),pos=track.scrollLeft;
      let best=0,dist=Infinity;
      for(let k=0;k<total;k++){
        const dd=Math.abs(posFor(k)-pos);
        if(dd<dist){dist=dd;best=k}
      }
      return best;
    };
    const go=j=>{
      const total=pages();idx=((j%total)+total)%total;
      nav.begin(640,idx);
      track.scrollTo({left:posFor(idx),behavior:"smooth"});
      paint(idx);toggle();
    };

    build();toggle();go(0);

    prev.addEventListener("click",()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes();go(idx-1)},{passive:!0});
    next.addEventListener("click",()=>{W.pauseAllYTIframes&&W.pauseAllYTIframes();go(idx+1)},{passive:!0});
    /* un solo repintado, cuando el scroll ya asento y venció el bloqueo del
       movimiento programatico; antes repintaba cada pagina intermedia. */
    track.addEventListener("scroll",()=>{
      nav.settle(nearestPage,v=>{idx=v;paint(idx)});
    },{passive:!0});
    W.addEventListener("resize",()=>{const now=pages();if(dots.length!==now)build();toggle();requestAnimationFrame(()=>go(idx))},{passive:!0});
    requestAnimationFrame(()=>{nav.begin(200,0);track.scrollTo({left:0,behavior:"auto"});idx=0;paint(0);toggle()});
    W.addEventListener("pageshow",e=>{if(e&&e.persisted){nav.begin(200,0);track.scrollTo({left:0,behavior:"auto"});idx=0;paint(0);toggle()}});
  });
});
/* =========================================================
 7) PÍLDORAS (filtros cards)
========================================================= */
TRY("pills",()=>{const Q=(s,c=D)=>c.querySelector(s),QA=(s,c=D)=>Array.from(c.querySelectorAll(s)),C="__span2",upd=s=>{const g=Q(".feature-grid",s);if(!g)return;const c=QA(".fcard",g);c.forEach(x=>x.classList.remove(C));const v=c.filter(x=>x.offsetParent!==null&&getComputedStyle(x).display!=="none"&&!x.hidden);v.length&&v.length%2===1&&v[v.length-1].classList.add(C)};QA("#caracteristicas").forEach(s=>{const pills=QA(".pillbar .pill",s),g=Q(".feature-grid",s);if(!pills.length||!g)return;const cards=QA(".fcard",g),apply=t=>{cards.forEach(x=>x.style.display=!t||x.classList.contains("tag-"+t)?"":"none");upd(s)};pills.forEach(p=>p.addEventListener("click",()=>{pills.forEach(x=>x.classList.remove("active"));p.classList.add("active");apply(p.dataset.filter||"")}));const first=pills[0];first?(first.classList.add("active"),apply(first.dataset.filter||"")):upd(s)})});


/* =========================================================
 8) FAQ (solo uno abierto)
========================================================= */
TRY("faq",()=>{
  const wrap=D.getElementById("faqWrap");if(!wrap)return;wrap.style.overflowAnchor="none";W.__EXP_FAQ_LAST_TRACE__=null;
  [...wrap.querySelectorAll(".faq-item")].forEach(it=>{const summary=it.querySelector(":scope > summary");if(!summary)return;
    summary.addEventListener("pointerdown",event=>{if(event.isPrimary&&event.pointerType==="mouse"&&event.button===0){event.preventDefault();summary.focus({preventScroll:true})}},{passive:false});
    summary.addEventListener("click",event=>{event.preventDefault();const root=D.scrollingElement,scrollBefore=root.scrollTop,wasOpen=it.open;
      [...wrap.querySelectorAll(".faq-item")].forEach(other=>{if(other!==it)other.open=false});it.open=!wasOpen;summary.focus({preventScroll:true});
      requestAnimationFrame(()=>{const safeBottom=(W.visualViewport?.height||W.innerHeight)-20,clipped=it.open?Math.max(0,it.getBoundingClientRect().bottom-safeBottom):0;if(clipped>24)W.scrollBy({top:Math.min(clipped,Math.max(0,it.getBoundingClientRect().top-76)),behavior:W.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});const visibleDelta=root.scrollTop-scrollBefore;W.__EXP_FAQ_LAST_TRACE__={scrollBefore,scrollAfter:root.scrollTop,clippedReveal:clipped,visibleDelta};wrap.dataset.expFaqVisibleDelta=visibleDelta.toFixed(3);wrap.dataset.expFaqClippedReveal=clipped.toFixed(3)});
    });
  });
});

/* 10) CALCULADORA — COMPAT (ANTI-LOOP) */
TRY("calc_hooks",()=>{const has=()=>{const a=D.getElementById("app");return!!(a&&((a.dataset.system||"").trim())&&D.getElementById("calc-row"))},kick=()=>{if(!has())return;try{W.dispatchEvent(new Event("calc-recompute"))}catch{}};if(W.__EXP_CALC_KICKED__)return;W.__EXP_CALC_KICKED__=1;D.readyState==="loading"?D.addEventListener("DOMContentLoaded",kick,{once:!0}):kick()});

/* 10.5) ICONS CAROUSEL (-15%) — DEBOUNCE + THROTTLE */
TRY("icons_carousel",()=>{const has=()=>{const a=D.getElementById("app");return!!(a&&((a.dataset.system||"").trim())&&D.getElementById("calc-row"))},enhance=wrap=>{if(!wrap)return;const ensure=()=>{if(wrap.dataset.icInit==="1")return;if(!wrap.querySelector(".sys-icon"))return;wrap.dataset.icInit="1";const slot=wrap.closest("#calc-slot-2,.calc-container,.placeholder")||wrap.parentElement,note=slot&&slot.querySelector?slot.querySelector(".note"):null;note&&note.classList.add("note-center");let host=wrap.closest(".icons-carousel");host||(host=D.createElement("div"),host.className="icons-carousel",wrap.parentElement.insertBefore(host,wrap),host.appendChild(wrap));const mk=(cls,lab,chev)=>{const b=D.createElement("button");return b.type="button",b.className=`arrowCircle ${cls}`,b.setAttribute("aria-label",lab),b.innerHTML=`<span class="chev">${chev}</span>`,b},step=()=>Math.max(220,Math.round(((wrap.querySelector(".sys-icon")?.offsetWidth)||200)+18)),scroll=dir=>wrap.scrollBy({left:step()*dir,behavior:"smooth"});let prev=host.querySelector(".arrowCircle.prev"),next=host.querySelector(".arrowCircle.next");prev||(prev=mk("prev","Anterior","‹"),host.appendChild(prev));next||(next=mk("next","Siguiente","›"),host.appendChild(next));prev.onclick=()=>scroll(-1);next.onclick=()=>scroll(1);let raf=0;const paint=()=>{raf=0;const can=wrap.scrollWidth>wrap.clientWidth+4;prev.style.display=can?"":"none";next.style.display=can?"":"none";const c=wrap.closest(".calc-container")||slot;c&&c.classList.toggle("has-icons",wrap.children.length>0)},paintQ=()=>{raf||(raf=requestAnimationFrame(paint))};paintQ();if(!wrap.dataset.icResize){wrap.dataset.icResize="1";W.addEventListener("resize",paintQ,{passive:!0})}let t=0;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(paintQ,80)}).observe(wrap,{childList:!0,subtree:!1})};if(!wrap.dataset.icObs){wrap.dataset.icObs="1";let t2=0;new MutationObserver(()=>{clearTimeout(t2);t2=setTimeout(ensure,80)}).observe(wrap,{childList:!0,subtree:!1})}ensure()},boot=()=>{if(!has())return;enhance(D.getElementById("icons-sec-sys"));enhance(D.getElementById("icons-third-sys"))};let lock=0;const bootQ=()=>{if(lock)return;lock=1;setTimeout(()=>{lock=0;boot()},120)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",bootQ,{once:!0}):bootQ();W.addEventListener("calc-render",bootQ,{passive:!0})});

      /* =========================================================
 13) TOC (FIX “no abre”)
========================================================= */
TRY("toc",()=>{const e=D.getElementById("toc");if(!e)return;const t=D.getElementById("tocToggle")||e.querySelector(".toc-toggle"),n=e.querySelector(".toc-close"),c=Array.from(e.querySelectorAll("a[href^='#']")),O="open",R="collapsed",isOpen=()=>e.classList.contains(O)&&!e.classList.contains(R),set=a=>{e.classList.toggle(O,!!a);e.classList.toggle(R,!a);e.setAttribute("aria-hidden",a?"false":"true");t&&t.setAttribute("aria-expanded",a?"true":"false")},open=()=>set(!0),close=()=>set(!1),toggle=()=>isOpen()?close():open();set(!e.classList.contains(R));t&&t.addEventListener("click",ev=>{ev.preventDefault();ev.stopPropagation();toggle()},{passive:!1});n&&n.addEventListener("click",ev=>{ev.preventDefault();ev.stopPropagation();close()},{passive:!1});c.forEach(a=>a.addEventListener("click",close,{passive:!0}));D.addEventListener("keydown",ev=>{if(ev.key==="Escape")close()});D.addEventListener("click",ev=>{if(!isOpen())return;const trg=ev.target;if(e.contains(trg))return;if(t&&t.contains(trg))return;close()})});

})(); /* FIN IIFE PRINCIPAL */

(()=>{try{const o=()=>{const abs=window.__EXP_ABS__||((t)=>t),app=document.getElementById("app");if(!app)return;const sys=(app.dataset.system||"").trim(),pdf=(app.dataset.pdf||"").trim(),wa=t=>"https://wa.me/525568437918?text="+encodeURIComponent(t),pdfUrl=pdf?abs("PDFS/"+encodeURIComponent(pdf)):"",pdfLink=pdfUrl?`<a href="${pdfUrl}" target="_blank" rel="noopener">Ficha técnica PDF</a>`:"";if(document.getElementById("toc-actions"))return;const el=document.createElement("aside");el.id="toc-actions";el.className="toc collapsed";el.style.cssText="position:fixed;right:16px;bottom:72px;z-index:9999";el.innerHTML=`<button class="toc-toggle" aria-expanded="false" title="Más acciones">⚡</button><div class="toc-panel" hidden><a href="${wa(`Hola Expiriti, quiero comprar mi licencia de CONTPAQi ${sys}`)}" target="_blank" rel="noopener">Compra ahora</a><a href="${wa(`Hola Expiriti, quiero mi prueba gratis de 30 días de CONTPAQi ${sys}`)}" target="_blank" rel="noopener">Prueba gratis</a><a href="${wa(`Hola Expiriti, quiero agendar una demo de 45 min por Zoom de CONTPAQi ${sys}`)}" target="_blank" rel="noopener">Demo 45 min por Zoom</a>${pdfLink}</div>`;document.body.appendChild(el);const btn=el.querySelector(".toc-toggle"),panel=el.querySelector(".toc-panel");btn.addEventListener("click",e=>{e.preventDefault();const open=panel.hidden;panel.hidden=!open;btn.setAttribute("aria-expanded",open?"true":"false");el.classList.toggle("open",open);el.classList.toggle("collapsed",!open)});document.addEventListener("click",e=>{if(!el.contains(e.target)){panel.hidden=!0;btn.setAttribute("aria-expanded","false");el.classList.remove("open");el.classList.add("collapsed")}});document.addEventListener("keydown",e=>{"Escape"===e.key&&(panel.hidden=!0,btn.setAttribute("aria-expanded","false"),el.classList.remove("open"),el.classList.add("collapsed"))})};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",o,{once:!0}):o()}catch(e){console.warn("[main.js] toc_actions falló",e)}})();

(()=>{const G=document.getElementById("impGrid");if(!G)return;const C=[...G.querySelectorAll(".fcard")];const V=()=>C.filter(el=>el.offsetParent!==null&&getComputedStyle(el).display!=="none");window.EX_impLayout=()=>{C.forEach(x=>x.classList.remove("__vLast1","__vLast2a","__vLast2b"));const a=V(),m=a.length%3;if(m===1&&a.length)a[a.length-1].classList.add("__vLast1");else if(m===2&&a.length>1){a[a.length-2].classList.add("__vLast2a");a[a.length-1].classList.add("__vLast2b")}};new MutationObserver(()=>EX_impLayout()).observe(G,{subtree:!0,attributes:!0,attributeFilter:["style","class"]});addEventListener("resize",()=>EX_impLayout(),{passive:!0});EX_impLayout()})();


/* EXPIRITI TABLE SWIPE MOBILE (aprobado 2026-07): envuelve tablas sin wrapper de scroll
   en .table-scroll (overflow-x:auto) para swipe horizontal interno sin romper el scroll vertical. */
(()=>{if(window.__EXP_TABLE_SCROLL__)return;window.__EXP_TABLE_SCROLL__=1;const boot=()=>{try{document.querySelectorAll("main table").forEach(t=>{let w=t.closest(".cmp-scroll,.lp-compare-wrap,.pricing-table-nube-wrap,#combined-wrap,.table-scroll");if(!w){w=document.createElement("div");w.className="table-scroll";t.parentNode.insertBefore(w,t);w.appendChild(t)}if(w.matches(".cmp-scroll,.lp-compare-wrap,.pricing-table-nube-wrap,.table-scroll")){w.setAttribute("role","region");w.setAttribute("aria-label",t.getAttribute("aria-label")||"Tabla desplazable horizontalmente");w.tabIndex=0}})}catch(_){}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();

/* Axis-aware wheel for tables and horizontal system controls. */

/* EXPIRITI PARTIALS FALLBACK SISTEMAS */
(()=>{if(window.__EXP_PARTIALS_FALLBACK__)return;window.__EXP_PARTIALS_FALLBACK__=1;const isGh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&seg?"/"+seg:"",parts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?parts.slice(1):parts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./",prefix=p=>{if(!p)return p;if(/^(https?:)?\/\//i.test(p)||/^(mailto:|tel:|data:)/i.test(p)||p.startsWith("#"))return p;const base=isGh?repoBase+"/":depth;return(base+p).replace(/([^:]\/)\/+/g,"$1")},load=async(id,file)=>{const ph=document.getElementById(id);if(!ph)return;const urls=[prefix("PARTIALS/"+file),"/expiriti-r19-preview-20260826/PARTIALS/"+file].filter(Boolean);for(const u of urls){try{const r=await fetch(u+(u.includes("?")?"&":"?")+"v=2026.08-r19-human8",{cache:"force-cache"});if(!r.ok)continue;const html=await r.text(),template=document.createElement("template");template.innerHTML=html;ph.replaceWith(template.content);return}catch(_){}}console.warn("[Expiriti] partial no cargó",file)},norm=()=>{document.querySelectorAll(".js-abs-src[data-src]").forEach(img=>{const raw=img.getAttribute("data-src")||"";if(raw){img.src=prefix(raw);img.style.opacity="1"}});document.querySelectorAll(".js-abs-href[data-href]").forEach(a=>{const raw=a.getAttribute("data-href")||"";if(raw)a.href=prefix(raw)});const y=document.getElementById("gf-year");if(y)y.textContent=new Date().getFullYear()};const boot=async()=>{await Promise.all([load("header-placeholder","global-header.html"),load("footer-placeholder","global-footer.html")]);norm()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();

/* EXPIRITI GLOBAL HEADER FINAL BIND */
(()=>{if(window.__EXP_GH_FINAL_BIND__)return;window.__EXP_GH_FINAL_BIND__=1;const D=document,W=window,Q=(s,c=D)=>c.querySelector(s),QA=(s,c=D)=>[...c.querySelectorAll(s)],isGh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&seg?"/"+seg:"",parts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?parts.slice(1):parts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./",path=p=>{if(!p)return p;if(/^(https?:)?\/\//i.test(p)||/^(mailto:|tel:|data:)/i.test(p)||p.startsWith("#"))return p;if(p.startsWith("/"))return isGh?repoBase+p:p;return((isGh?repoBase+"/":depth)+p).replace(/([^:]\/)\/+/g,"$1")};function assets(root=D){QA(".js-img[data-src]",root).forEach(img=>{const raw=img.dataset.src;if(raw){img.src=path(raw);img.style.opacity="1"}});QA(".js-link[data-href]",root).forEach(a=>{const raw=a.dataset.href;if(raw)a.href=path(raw)});QA('a[href^="/"]',root).forEach(a=>a.href=path(a.getAttribute("href")));QA('img[src^="/"]',root).forEach(img=>img.src=path(img.getAttribute("src")));D.body.classList.add("has-gh");const y=Q("#gf-year");y&&(y.textContent=new Date().getFullYear())}function drawer(open){const h=Q("#gh-header"),dr=Q("#gh-drawer"),dim=Q("#gh-dim"),bg=Q("#gh-burger");if(!h||!dr||!dim||!bg)return;if(open){dr.hidden=false;dim.hidden=false;requestAnimationFrame(()=>{D.documentElement.classList.add("gh-open");D.body.classList.add("gh-open");dr.setAttribute("aria-hidden","false");bg.setAttribute("aria-expanded","true");D.body.style.overflow="hidden";assets(dr)})}else{D.documentElement.classList.remove("gh-open");D.body.classList.remove("gh-open");dr.setAttribute("aria-hidden","true");bg.setAttribute("aria-expanded","false");D.body.style.overflow="";setTimeout(()=>{if(!D.documentElement.classList.contains("gh-open")){dr.hidden=true;dim.hidden=true}},220)}}function mobileSystems(cat){const root=Q("#gh-msys"),track=Q("#gh-sysswipe");if(!root||!track)return;const order=["contables","comerciales","nube","prod"],i=Math.max(0,order.indexOf(cat));QA(".gh-cat",root).forEach(b=>{const on=(b.dataset.cat||"")===cat;b.classList.toggle("is-active",on);b.setAttribute("aria-selected",on?"true":"false")});track.scrollTo({left:i*(track.clientWidth||1),behavior:"smooth"});QA(".gh-sysdots .dot",root).forEach((d,k)=>d.classList.toggle("is-active",k===i))}function mobileServices(dir=1){const tr=Q("#gh-msvc .gh-svctrack");if(!tr)return;tr.scrollBy({left:dir*(tr.clientWidth||1),behavior:"smooth"})}function bind(){const h=Q("#gh-header");if(!h)return;assets(h);assets(D);if(!D.__ghFinalClicks){D.__ghFinalClicks=1;D.addEventListener("click",e=>{const b=e.target.closest("#gh-burger");if(b){e.preventDefault();e.stopImmediatePropagation();drawer(!D.documentElement.classList.contains("gh-open"));return}const c=e.target.closest("#gh-close,#gh-dim");if(c){e.preventDefault();e.stopImmediatePropagation();drawer(false);return}const t=e.target.closest("#gh-theme");if(t){e.preventDefault();e.stopImmediatePropagation();const cur=D.documentElement.getAttribute("data-theme")||localStorage.getItem("expiriti_theme")||"light",next=cur==="light"?"dark":"light";D.documentElement.setAttribute("data-theme",next);localStorage.setItem("expiriti_theme",next);t.setAttribute("aria-pressed",next==="dark"?"true":"false");return}/* EXPIRITI_R5_BURGER_CONTROLS_DELEGATED_TO_GH_CANON */const link=e.target.closest("a.js-link[data-href]");if(link){const raw=link.dataset.href,want=path(raw);link.href=want;e.preventDefault();e.stopImmediatePropagation();if(link.closest("#gh-drawer"))drawer(false);if(e.metaKey||e.ctrlKey||link.target==="_blank")W.open(want,"_blank","noopener");else location.href=want;return}},true);D.addEventListener("keydown",e=>{if(e.key==="Escape")drawer(false)},{passive:true})}if(!D.__ghFinalHover){D.__ghFinalHover=1;QA("#gh-header .gh-dd-wrap").forEach(w=>{let tm=0;const open=()=>{if(W.matchMedia("(max-width:1023px)").matches)return;clearTimeout(tm);QA("#gh-header .gh-dd-wrap").forEach(x=>x!==w&&x.classList.remove("gh-open"));w.classList.add("gh-open")},close=()=>{clearTimeout(tm);tm=setTimeout(()=>w.classList.remove("gh-open"),160)};w.addEventListener("mouseenter",open);w.addEventListener("mouseleave",close)})}}const boot=()=>{bind();setTimeout(bind,120);setTimeout(bind,450)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:true}):boot();W.addEventListener("pageshow",boot,{passive:true})})();

/* EXPIRITI_T16_SYSTEMS_UX_START */

(()=>{
  const boot=()=>{

    if(
      !document.body ||
      !document.body.classList.contains("page-sistemas")
    ){
      return;
    }


    /* =====================================================
       BENEFICIOS DEL HERO
       ===================================================== */

    document
      .querySelectorAll(".listSlider")
      .forEach(slider=>{

        const grid=
          slider.closest(".grid-2");

        if(
          !grid ||
          !grid.querySelector(".carousel")
        ){
          return;
        }


        grid.classList.add(
          "exp-t16-benefit-grid"
        );


        let column=slider;

        while(
          column.parentElement &&
          column.parentElement!==grid
        ){
          column=column.parentElement;
        }


        if(
          !column ||
          column.parentElement!==grid
        ){
          return;
        }


        column.classList.add(
          "exp-t16-benefit-column"
        );


        slider.classList.add(
          "exp-t16-benefit-slider"
        );


        const heading=
          column.querySelector(
            "h2.title-gradient,h2"
          );


        if(heading){

          heading
            .querySelectorAll(".badge")
            .forEach(badge=>{
              badge.style.setProperty(
                "display",
                "none",
                "important"
              );
            });
        }


        /*
         * CTA: "Pedir ficha técnica"
         * porque la acción abre WhatsApp para solicitarla.
         */
        if(
          !column.querySelector(
            ".exp-t16-system-ctas"
          )
        ){

          const strip=
            document.createElement("div");

          strip.className=
            "exp-t16-system-ctas";


          const explicit=
            document
              .querySelector(
                ".cta-strip[data-sistema]"
              )
              ?.dataset
              ?.sistema
              ?.trim();


          const titleSystem=
            document.title
              .split("|")[0]
              .replace(
                /^CONTPAQi\s+/i,
                ""
              )
              .trim();


          const system=
            explicit ||
            titleSystem ||
            "CONTPAQi";


          const wa=
            document.createElement("a");

          wa.className=
            "btn btn-grad-green hero-btn "
            +"exp-t16-tech-sheet";


          wa.href=
            "https://wa.me/525568437918?text="
            +encodeURIComponent(
              "Hola ExpIRI Ti, quiero recibir la ficha técnica de CONTPAQi "
              +system
              +"."
            );


          wa.target="_blank";
          wa.rel="noopener";


          wa.innerHTML=
            '<span>Pedir ficha técnica</span>'
            +'<img '
            +'src="/expiriti-r19-preview-20260826/IMG/whatsapp.svg" '
            +'class="exp-t16-wa-icon" '
            +'alt="" '
            +'aria-hidden="true">';


          const call=
            document.createElement("a");

          call.className=
            "btn btn-grad-blue hero-btn "
            +"exp-t16-call";


          call.href=
            "tel:+525568437918";


          /* EXPIRITI_R17: icono SVG en vez de emoji */
          call.innerHTML=
            '<span>Llamada</span>'
            +'<svg class="qa-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 13 13 0 0 0 4.1.7 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A18.7 18.7 0 0 1 2.8 2.4 1.2 1.2 0 0 1 4 1.2h3.3a1.2 1.2 0 0 1 1.2 1.2c0 1.4.2 2.8.7 4.1a1.2 1.2 0 0 1-.3 1.2z"/></svg>';


          strip.append(
            wa,
            call
          );


          slider.insertAdjacentElement(
            "afterend",
            strip
          );
        }
      });


    /* =====================================================
       REELS — UNA SOLA LEYENDA
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


        aside.classList.add(
          "exp-t16-reels"
        );


        [
          ...aside.querySelectorAll(
            "h4.title-gradient"
          )
        ]
        .filter(el=>
          /^reels\s+destacados\s*:/i
            .test(
              el.textContent.trim()
            )
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


        let single=
          aside.querySelector(
            ".exp-t16-reel-title"
          );


        if(!single){

          single=
            document.createElement("h4");

          single.className=
            "title-gradient exp-t16-reel-title";

          carousel.insertAdjacentElement(
            "beforebegin",
            single
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


          single.textContent=value;
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
       TABLAS COMPARATIVAS

       Primera comparativa:
       estilo Servicios, lectura natural izquierda.

       Segunda o posteriores:
       datos centrados.
       ===================================================== */

    let comparisonIndex=0;


    document
      .querySelectorAll("table")
      .forEach(table=>{

        const firstRow=
          table.querySelector("thead tr")
          ||
          table.querySelector("tr");


        if(!firstRow){
          return;
        }


        const cells=[
          ...firstRow.children
        ];


        if(cells.length<3){
          return;
        }


        const firstText=
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


        const sectionId=
          (
            section?.id
            ||""
          )
          .toLowerCase();


        const isComparison=
          /^caracter[ií]stica/.test(firstText)
          ||
          /comparativ/.test(title)
          ||
          /compar/.test(sectionId);


        if(!isComparison){
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
       FLECHAS DE REELS
       No saltan, sólo feedback visual.
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

/* EXPIRITI_T16_SYSTEMS_UX_END */

/* EXPIRITI_T16_SYSTEM_PDF_CTA_R2_START */

(()=>{
  const sheets={"analiza":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Analiza.pdf","anticipa":"/expiriti-r19-preview-20260826/PDFS/FichaAnticipa.pdf","bancos":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Bancos.pdf","colabora":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Colabora.pdf","comercialpremium":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Comercial%20Premium.pdf","comercialpro":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Comercial%20PRO.pdf","comercialstart":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Comercial%20Start.pdf","contabilidad":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Contabilidad.pdf","contabiliza":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Contabiliza.pdf","evalua":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%20Evalua.pdf","facturaelectronica":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%20Factura%20Electronica.pdf","nominas":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%20Nominas.pdf","optimiza":"/expiriti-r19-preview-20260826/PDFS/FichaOptimiza.pdf","personia":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Personia.pdf","vende":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20Vende.pdf","xmlenlinea":"/expiriti-r19-preview-20260826/PDFS/Ficha%20CONTPAQi%C2%AE%20XML.pdf"};


  const apply=()=>{

    if(
      !document.body ||
      !document.body.classList.contains(
        "page-sistemas"
      )
    ){
      return;
    }


    const slug=
      location.pathname
        .split("/")
        .pop()
        .replace(/\.html$/i,"")
        .toLowerCase();


    const sheet=
      document.querySelector(
        ".exp-t16-tech-sheet"
      );


    const call=
      document.querySelector(
        ".exp-t16-call"
      );


    /*
     * CTA 2 is always simply "Llamar".
     */
    if(call){

      /* EXPIRITI_R17: icono SVG en vez de emoji (hereda currentColor y no
         depende de la fuente de emoji del sistema). */
      call.innerHTML=
        '<span>Llamar</span>'
        +'<svg class="qa-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 13 13 0 0 0 4.1.7 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A18.7 18.7 0 0 1 2.8 2.4 1.2 1.2 0 0 1 4 1.2h3.3a1.2 1.2 0 0 1 1.2 1.2c0 1.4.2 2.8.7 4.1a1.2 1.2 0 0 1-.3 1.2z"/></svg>';
    }


    /*
     * CTA 1 exists ONLY if a real ficha PDF exists.
     */
    if(sheets[slug]){

      if(sheet){

        sheet.href=
          sheets[slug];

        sheet.target=
          "_blank";

        sheet.rel=
          "noopener";


        sheet.innerHTML=
          '<span>Ficha técnica</span>'
          +'<span '
          +'class="exp-t16-pdf-open" '
          +'aria-hidden="true">'
          +'↗'
          +'</span>';


        sheet.setAttribute(
          "aria-label",
          "Abrir ficha técnica en PDF"
        );
      }

      return;
    }


    /*
     * Defensive default:
     * if a future unrecognized page appears, never leave
     * the old WhatsApp CTA pretending to be a ficha.
     */
    if(sheet){
      sheet.remove();
    }
  };


  if(document.readyState==="loading"){

    document.addEventListener(
      "DOMContentLoaded",
      apply,
      {once:true}
    );

  }else{

    apply();
  }

})();

/* EXPIRITI_T16_SYSTEM_PDF_CTA_R2_END */

/* EXPIRITI_T17_SYSTEMS_FINAL_START */

(()=>{
 const boot=()=>{

  if(
   !document.body ||
   !document.body.classList.contains("page-sistemas")
  ) return;


  /* =======================================================
     BENEFICIOS:
     tarjeta visual como Servicios/Cursos,
     pero SIN separadores horizontales.
     ======================================================= */

  document
   .querySelectorAll(".listSlider")
   .forEach(slider=>{

    const grid=slider.closest(".grid-2");

    if(
     !grid ||
     !grid.querySelector(".carousel")
    ) return;

    slider.classList.add(
     "exp-t17-system-benefits"
    );

    let col=slider;

    while(
     col.parentElement &&
     col.parentElement!==grid
    ){
     col=col.parentElement;
    }

    if(
     col &&
     col.parentElement===grid
    ){
     col.classList.add(
      "exp-t17-system-benefit-column"
     );
    }
   });


  /* =======================================================
     COMPARATIVAS:
     se consideran ÚNICAMENTE tablas cuyo primer encabezado
     sea exactamente "Característica".
     Esto evita que una tabla anterior altere primary/secondary.
     ======================================================= */

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

   table.classList.remove(
    "exp-t16-compare-primary",
    "exp-t16-compare-secondary",
    "exp-t15-compare-table"
   );

   table.classList.add(
    "exp-t17-compare-table",
    index===0
     ?"exp-t17-compare-primary"
     :"exp-t17-compare-secondary"
   );


   let wrap=
    table.closest(
     ".table-scroll,"
     +".cmp-scroll,"
     +".pricing-table-nube-wrap,"
     +".lp-compare-wrap,"
     +".exp-t17-compare-wrap"
    );


   if(!wrap){

    wrap=document.createElement("div");

    wrap.className=
     "exp-t17-compare-wrap";

    table.parentNode.insertBefore(
     wrap,
     table
    );

    wrap.appendChild(table);

   }else{

    wrap.classList.add(
     "exp-t17-compare-wrap"
    );
   }


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

       const align=
        index===0
         ?"left"
         :(i===0 ? "left" : "center");


       cell.style.setProperty(
        "text-align",
        align,
        "important"
       );


       cell.style.setProperty(
        "vertical-align",
        "middle",
        "important"
       );


       cell.style.setProperty(
        "width",
        (i===0 ? firstPct : otherPct)+"%",
        "important"
       );


       cell.style.setProperty(
        "min-width",
        "0",
        "important"
       );


       cell.style.setProperty(
        "word-break",
        "normal",
        "important"
       );


       cell.style.setProperty(
        "overflow-wrap",
        "break-word",
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

/* EXPIRITI_T17_SYSTEMS_FINAL_END */

/* EXPIRITI_T18_SYSTEM_HERO_START */

(()=>{
  const boot=()=>{

    if(
      !document.body ||
      !document.body.classList.contains(
        "page-sistemas"
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


    /* =====================================================
       HERO:
       logo + microbeneficios en una sola línea.
       ===================================================== */

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


    if(h1 && badges){

      /*
       * "Nube" como badge de hero es redundante.
       * Sólo se elimina si el texto es EXACTAMENTE Nube.
       */
      [
        ...badges.querySelectorAll(
          ".badge"
        )
      ]
      .filter(el=>
        el.textContent
          .trim()
          .toLowerCase()
        ===
        "nube"
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
          +"exp-t18-system-hero-row";


        hero.insertBefore(
          row,
          h1
        );


        row.appendChild(h1);
        row.appendChild(badges);
      }
    }


    /* =====================================================
       RESUMEN:
       quitar SOLO la tarjeta exterior que encierra
       beneficios + reel.

       Las dos tarjetas internas permanecen.
       ===================================================== */

    [
      ...hero.querySelectorAll(
        "section"
      )
    ]
    .forEach(section=>{

      const grid=
        section.querySelector(
          ".grid-2"
        );


      if(
        !grid ||
        !grid.querySelector(
          ".listSlider"
        )
        ||
        !grid.querySelector(
          ".carousel"
        )
      ){
        return;
      }


      const directShell=
        [...section.children]
          .find(el=>
            el.classList
              ?.contains("card")
            &&
            el.classList
              ?.contains("body")
            &&
            el.querySelector(
              ".grid-2"
            )
          );


      if(directShell){

        directShell.classList.add(
          "exp-t18-flat-summary-shell"
        );
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

/* EXPIRITI_T18_SYSTEM_HERO_END */

/* EXPIRITI_T24_SYSTEM_LISTSLIDER_OWNER_START
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

/* EXPIRITI_T24_SYSTEM_LISTSLIDER_OWNER_END */
/* EXPIRITI_PAGE_NAV_RAIL loader: T23 release candidate. */
(()=>{if(!document.querySelector('script[data-exp-page-nav-rail-loader]')){const s=document.createElement('script');s.src='/expiriti-r19-preview-20260826/EXPIRITI_PAGE_NAV_RAIL.js';s.defer=true;s.dataset.expPageNavRailLoader='1';document.head.appendChild(s)}})();


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

  /* EXPIRITI_R16_DOT_WRAP_SYNC
     Indice LOGICO consciente de los sentinels de R8.
     nearest() solo mide contra las paginas reales, asi que mientras el usuario
     esta viendo un sentinel (clon) el dot se quedaba marcando la pagina real
     anterior -> estado intermedio visible al hacer wrap. Los clones de R8 ya
     llevan data-r8-logical, asi que aqui medimos contra TODAS las paginas
     fisicas y devolvemos su indice logico. Sin sentinels presentes, cae a
     nearest() y el comportamiento es identico al de R6. */
  const logicalIndex=(track,pages)=>{
    if(!track||!pages.length)return 0;

    const phys=[...track.children].filter(
      n=>n.dataset && n.dataset.r8Logical!==undefined
    );

    if(phys.length){
      const x=track.scrollLeft||0;
      let best=null,dist=Infinity;

      phys.forEach(p=>{
        const d=Math.abs((p.offsetLeft||0)-x);
        if(d<dist){dist=d;best=p;}
      });

      if(best){
        const v=parseInt(best.dataset.r8Logical,10);
        if(Number.isInteger(v))return mod(v,pages.length);
      }
    }

    return nearest(track,pages);
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
        : logicalIndex(track,pages);
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
        paint(logicalIndex(track,pages));
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
      /* R16: durante el teleport sentinel -> pagina real no se repinta nada;
         R8 llama a __r6Repaint una sola vez cuando el salto ya asento. */
      if(track.__r8Teleport)return;
      if(raf)return;

      raf=requestAnimationFrame(()=>{
        raf=0;
        paint(logicalIndex(track,pages));
      });
    },{passive:true});

    /* R16: unico punto de repintado post-teleport (lo invoca R8). */
    track.__r6Repaint=()=>{
      if(performance.now()<(root.__r6NavLock||0))return;
      paint(logicalIndex(track,pages));
    };

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

    paint(logicalIndex(track,pages));

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
        : logicalIndex(track,pages);
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
        paint(logicalIndex(track,pages));
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
      /* R16: durante el teleport sentinel -> pagina real no se repinta nada;
         R8 llama a __r6Repaint una sola vez cuando el salto ya asento. */
      if(track.__r8Teleport)return;
      if(raf)return;

      raf=requestAnimationFrame(()=>{
        raf=0;
        paint(logicalIndex(track,pages));
      });
    },{passive:true});

    /* R16: unico punto de repintado post-teleport (lo invoca R8). */
    track.__r6Repaint=()=>{
      if(performance.now()<(root.__r6NavLock||0))return;
      paint(logicalIndex(track,pages));
    };

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

    paint(logicalIndex(track,pages));

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

    /* R16: marca el teleport para que el owner R6 no repinte los dots con un
       valor intermedio mientras scrollLeft esta saltando. Se libera dos frames
       despues y se pide UN solo repintado del dot logico correcto. */
    track.__r8Teleport=1;

    track.style.scrollBehavior="auto";
    track.scrollLeft=left;

    /* El repintado va en la MISMA tarea que el salto: cuando el navegador
       compone el frame ya coinciden pagina visible y dot. Ningun frame puede
       observar el estado intermedio. */
    if(typeof track.__r6Repaint==="function"){
      track.__r6Repaint();
    }

    requestAnimationFrame(()=>{
      track.style.scrollBehavior=old;

      requestAnimationFrame(()=>{
        track.__r8Teleport=0;

        if(typeof track.__r6Repaint==="function"){
          track.__r6Repaint();
        }
      });
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


/* ==========================================================
   EXPIRITI_R13_SYSTEM_VISUAL_RUNTIME_START
   ========================================================== */

(()=>{
  "use strict";


  if(
    window.__EXPIRITI_R13_SYSTEM_VISUAL__
  ) return;


  window.__EXPIRITI_R13_SYSTEM_VISUAL__=1;


  const important=(
    node,
    prop,
    value
  )=>{

    if(!node)return;

    node.style.setProperty(
      prop,
      value,
      "important"
    );
  };


  const pureWhite=node=>{

    if(!node)return;

    important(
      node,
      "background",
      "#fff"
    );

    important(
      node,
      "background-color",
      "#fff"
    );

    important(
      node,
      "background-image",
      "none"
    );

    important(
      node,
      "box-shadow",
      "none"
    );

    important(
      node,
      "filter",
      "none"
    );

    important(
      node,
      "backdrop-filter",
      "none"
    );

    important(
      node,
      "opacity",
      "1"
    );
  };


  const pelon=node=>{

    if(!node)return;

    node.classList.add(
      "exp-r13-system-reel-pelon"
    );

    node.dataset.expR13Pelon="1";


    [
      ["background","transparent"],
      ["background-color","transparent"],
      ["background-image","none"],
      ["border","0"],
      ["outline","0"],
      ["border-radius","0"],
      ["box-shadow","none"],
      ["filter","none"],
      ["backdrop-filter","none"],
      ["overflow","visible"]
    ].forEach(
      ([prop,value])=>{
        important(
          node,
          prop,
          value
        );
      }
    );
  };


  /* EXPIRITI_R15: styleSession NEUTRALIZADO.
     El runtime R13 aplicaba estilos inline !important a #sesion-guiada
     (position:absolute de las acciones, padding 18px 22px 70px, margin
     24px 10px 30px). Esa implementacion queda REEMPLAZADA por el owner CSS
     EXPIRITI_R15_SESSION_GUIDED_OWNER de theme.css. No se toca styleReels. */
  const styleSession=()=>{};

  const styleReels=()=>{

    let count=0;


    document
      .querySelectorAll(
        ".carousel"
      )
      .forEach(
        carousel=>{


          const media=
            carousel.querySelector(
              [
                ".reel-embed",
                ".yt-wrap",
                'iframe[src*="youtube"]',
                'iframe[src*="youtu.be"]'
              ].join(",")
            );


          if(!media)return;


          /*
            Sólo carousel de contenido/reel.
          */

          let shell=
            carousel.closest(
              [
                "aside.reels-card",
                "aside.card.body",
                "aside.card",
                ".reels-card",
                ".card.body"
              ].join(",")
            );


          if(!shell){

            let n=
              carousel.parentElement;


            while(
              n &&
              n !== document.body &&
              n.tagName !== "MAIN"
            ){

              const cls=
                typeof n.className==="string"
                  ? n.className
                  : "";


              if(
                /\b(card|body|reels-card)\b/.test(
                  cls
                )
              ){
                shell=n;
                break;
              }


              n=n.parentElement;
            }
          }


          if(shell){

            pelon(
              shell
            );


            /*
              Si existe un segundo wrapper de tarjeta
              inmediatamente encima del shell y sólo
              envuelve este reel, también limpiarlo.
            */

            const parent=
              shell.parentElement;


            if(
              parent &&
              parent !== document.body &&
              parent.tagName !== "MAIN"
            ){

              const pcls=
                typeof parent.className==="string"
                  ? parent.className
                  : "";


              if(
                /\b(card|body|reels-card)\b/.test(
                  pcls
                )
              ){
                pelon(
                  parent
                );
              }
            }


            count+=1;
          }
        }
      );


    document.documentElement
      .dataset
      .expR13SystemReels=
        String(count);
  };


  const boot=()=>{

    if(
      !location.pathname.includes(
        "/expiriti-r19-preview-20260826/SISTEMAS/"
      )
    ) return;


    styleSession();

    styleReels();
  };


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


  window.addEventListener(
    "resize",
    styleSession,
    {passive:true}
  );


  setTimeout(
    boot,
    80
  );

  setTimeout(
    boot,
    260
  );

  setTimeout(
    boot,
    700
  );

})();

/* EXPIRITI_R13_SYSTEM_VISUAL_RUNTIME_END */

/* EXPIRITI_R17_GUIDED_DUAL_CTA_OWNER_START */
(()=>{
  const boot=()=>{
    if(!document.body?.classList.contains("page-sistemas"))return;
    document.querySelectorAll("#sesion-guiada .exp-session-actions").forEach(row=>{
      if(row.dataset.expR17DualCta==="1")return;
      const system=(document.querySelector("h1")?.textContent||"CONTPAQi").trim();
      const wa=document.createElement("a");
      wa.className="btn btn-grad-green hero-btn exp-guided-wa";
      wa.href="https://wa.me/525568437918?text="+encodeURIComponent("Hola ExpIRI Ti, quiero orientación sobre "+system+".");
      wa.target="_blank";wa.rel="noopener";
      wa.setAttribute("aria-label","Enviar mensaje por WhatsApp sobre "+system);
      wa.innerHTML='<span>Enviar</span><img src="/expiriti-r19-preview-20260826/IMG/whatsapp.svg" alt="" width="18" height="18">';
      const call=document.createElement("a");
      call.className="btn btn-grad-blue hero-btn exp-guided-call";
      call.href="tel:+525568437918";
      call.setAttribute("aria-label","Llamar a ExpIRI Ti para orientación sobre "+system);
      call.innerHTML='<span>Llamar</span><svg class="qa-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 13 13 0 0 0 4.1.7 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A18.7 18.7 0 0 1 2.8 2.4 1.2 1.2 0 0 1 4 1.2h3.3a1.2 1.2 0 0 1 1.2 1.2c0 1.4.2 2.8.7 4.1a1.2 1.2 0 0 1-.3 1.2z"/></svg>';
      row.replaceChildren(wa,call);
      row.dataset.expR17DualCta="1";
    });
  };
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
})();
/* EXPIRITI_R17_GUIDED_DUAL_CTA_OWNER_END */

/* EXPIRITI_R17_SYSTEMS_TWO_QUICK_ACTIONS_OWNER_START */
(()=>{
  const boot=()=>{
    if(!document.body?.classList.contains("page-sistemas"))return;
    const row=document.querySelector(".exp-t16-system-ctas");
    if(!row||row.dataset.expR17TwoActions==="1")return;
    const sheet=row.querySelector(".exp-t16-tech-sheet");
    const call=row.querySelector(".exp-t16-call");
    row.replaceChildren(...[sheet,call].filter(Boolean));
    row.dataset.expR17TwoActions="1";
  };
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
})();
/* EXPIRITI_R17_SYSTEMS_TWO_QUICK_ACTIONS_OWNER_END */

/* EXPIRITI_R17_CUSTOM_PREVIEW_TITLE_OWNER_START
 * CSS reads the generated-preview class from initial HTML; no post-paint title mutation.
 * EXPIRITI_R17_CUSTOM_PREVIEW_TITLE_OWNER_END */
/* EXPIRITI_R17_FINAL_RESMOKE_SINGLE_REEL_OWNER_START */
(()=>{"use strict";const clean=()=>document.querySelectorAll('.carousel[id^="carouselReels"]').forEach(root=>{const slides=[...root.querySelectorAll(".carousel-track > .carousel-slide")],playable=slides.filter(sl=>{const wrap=sl.querySelector(".reel-embed[data-ytid],.yt-wrap[data-ytid]"),id=wrap?.dataset.ytid||"";return /^[A-Za-z0-9_-]{11}$/.test(id)&&!wrap.classList.contains("is-media-pending")&&!wrap.querySelector(".exp-media-pending")});if(playable.length!==1)return;slides.filter(sl=>!playable.includes(sl)).forEach(sl=>{sl.hidden=true;sl.setAttribute("aria-hidden","true")});const nav=root.querySelector(".carousel-nav");nav?.replaceChildren();nav?.style.setProperty("display","none","important");root.querySelectorAll(".arrowCircle.prev,.arrowCircle.next").forEach(btn=>{btn.hidden=true;btn.style.setProperty("display","none","important")});root.toggleAttribute("data-single",true)});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",clean,{once:true}):queueMicrotask(clean);window.addEventListener("pageshow",clean,{passive:true})})();
/* EXPIRITI_R17_FINAL_RESMOKE_SINGLE_REEL_OWNER_END */

/* R19_GATE3_VISIBLE_CLOUD_NAMES_OWNER */
(()=>{"use strict";const replacements=[["Contabiliza","Contabilidad Nube"],["Personia","Nóminas Nube"]],replace=value=>replacements.reduce((out,[from,to])=>out.replace(new RegExp(`\\b${from}\\b`,"g"),to),value),scan=root=>{if(root.nodeType===3){if(!root.parentElement?.closest("script,style,noscript"))root.nodeValue=replace(root.nodeValue);return}if(root.nodeType!==1)return;const element=root;element.querySelectorAll("[alt],[title],[aria-label]").forEach(el=>["alt","title","aria-label"].forEach(attr=>{const value=el.getAttribute(attr);if(value)el.setAttribute(attr,replace(value))}));const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{if(!node.parentElement?.closest("script,style,noscript"))node.nodeValue=replace(node.nodeValue)})},boot=()=>{scan(document.documentElement);new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(scan))).observe(document.documentElement,{childList:true,subtree:true})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();
