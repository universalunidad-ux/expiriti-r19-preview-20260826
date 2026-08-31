/* __R19_OWNER_REEL_POSTER_FIX_20260826__ */
/* =========================================================
 Expiriti — index.js (MIN + COMMS) v2026.01.20
 - Core init + rutas + parciales + forms + tabs + promos + hero + reels + servicios
 - SplitBG + Tab center + Smart swipe patch
========================================================= */
(function(){"use strict";if(window.__EXPIRITI_INDEX_INIT__)return;window.__EXPIRITI_INDEX_INIT__=!0;
const Q=(s,c=document)=>c.querySelector(s),QA=(s,c=document)=>Array.from(c.querySelectorAll(s)),on=(el,ev,fn,opt)=>{el&&el.addEventListener(ev,fn,opt)},safe=fn=>{try{fn()}catch(_){}},DEBUG_NOCACHE=/[?&]nocache=1\b/.test(location.search);

/* 0) preload image (LCP) */
function addPreloadImage(href){if(!href)return;const abs=prefix(href);if(document.querySelector(`link[rel="preload"][as="image"][href="${abs}"]`))return;const l=document.createElement("link");l.rel="preload";l.as="image";l.href=abs;document.head.appendChild(l)}

/* 1) rutas GH Pages + local */
const isGh=location.hostname.endsWith("github.io"),firstSeg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&firstSeg?"/"+firstSeg:"",pathParts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?pathParts.slice(1):pathParts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./";
function prefix(path){if(!path)return path;if(/^(https?:)?\/\//i.test(path))return path;if(/^(mailto:|tel:|data:)/i.test(path))return path;if(path.startsWith("#"))return path;if(isGh&&repoBase&&(path===repoBase||path.startsWith(repoBase+"/")))return path;const base=isGh?repoBase+"/":depth,joined=(base+path).replace(/\\/g,"/");return joined.replace(/([^:]\/)\/+/g,"$1")}
function normalizeRoutes(root=document){QA(".js-abs-src[data-src]",root).forEach(img=>{const raw=img.getAttribute("data-src")||"",fin=prefix(raw);if(!img.getAttribute("src"))img.setAttribute("src",fin);else img.src=fin;img.style.opacity="1"});QA(".js-abs-href[data-href]",root).forEach(a=>{const raw=a.getAttribute("data-href")||"";if(!raw)return;const parts=raw.split("#"),p=parts[0]||"",h=parts[1]||"";a.href=prefix(p)+(h?"#"+h:"")});const y=root.getElementById?.("gf-year")||document.getElementById("gf-year");y&&(y.textContent=new Date().getFullYear())}

/* 2) parciales header/footer (versión determinista; reload sólo bajo diagnóstico explícito) */
async function loadPartial(placeholderId,fileName){const ph=document.getElementById(placeholderId);if(!ph)return;const cands=[prefix(`PARTIALS/${fileName}`),isGh&&repoBase?`${repoBase}/PARTIALS/${fileName}`:null,!isGh?`${depth}PARTIALS/${fileName}`:null,"/PARTIALS/"+fileName].filter(Boolean);let html="",lastErr=null;for(const u of cands)try{const url=u+(u.includes("?")?"&":"?")+"v=2026.08-r19-human8";const resp=await fetch(url,{cache:DEBUG_NOCACHE?"reload":"force-cache"});if(!resp.ok)throw new Error("HTTP "+resp.status+" "+resp.statusText);html=await resp.text();break}catch(e){lastErr=e}if(!html){console.warn("[Expiriti] No se pudo cargar partial:",fileName,lastErr);return}const template=document.createElement("template");template.innerHTML=html;ph.replaceWith(template.content)}

/* 3) La rueda vertical conserva el scroll de página; deltaX sigue siendo nativo. */
function bindWheelOnTabs(){/* intencionalmente nativo */}

function initFooterObserver(){const footer=Q("#gf-root"),toc=Q("#toc");if(!footer||!toc||footer.dataset.observerBound==="1")return;footer.dataset.observerBound="1";const set=visible=>{document.body.classList.toggle("gf-footer-in-view",visible);toc.setAttribute("aria-hidden",visible?"true":"false")};if("IntersectionObserver" in window){new IntersectionObserver(entries=>set(entries.some(entry=>entry.isIntersecting)),{threshold:0}).observe(footer)}else{const sync=()=>{const r=footer.getBoundingClientRect();set(r.top<innerHeight&&r.bottom>0)};on(window,"scroll",sync,{passive:true});on(window,"resize",sync,{passive:true});sync()}}

/* 4) forms: quick whatsapp + contact (Apps Script) */
function initForms(){const quickForm=Q("#quickForm");if(quickForm&&quickForm.dataset.bound!=="1"){quickForm.dataset.bound="1";on(quickForm,"submit",e=>{e.preventDefault();const modulo=encodeURIComponent(Q("#modulo")?.value||""),mensaje=encodeURIComponent((Q("#mensaje")?.value||"").trim()),texto=`Hola ExpIRI Ti, me interesa ${modulo}. ${mensaje}`;window.open(`https://wa.me/525568437918?text=${texto}`,"_blank","noopener")})}const contactForm=Q("#contactForm");if(contactForm&&contactForm.dataset.bound!=="1"){contactForm.dataset.bound="1";const tsEl=Q("#ts",contactForm);tsEl&&(tsEl.value=String(Date.now()));const pageEl=Q("#page",contactForm);pageEl&&(pageEl.value=location.href);const uaEl=Q("#ua",contactForm);uaEl&&(uaEl.value=navigator.userAgent);const GAS_URL="PEGA_AQUI_TU_URL_DE_APPS_SCRIPT_EXEC";const GAS_OK=/^https:\/\//i.test(GAS_URL);const buildWaText=fd=>{const g=k=>(fd.get(k)||"").toString().trim();const partes=["Hola ExpIRI Ti, quiero información."];g("nombre")&&partes.push("Nombre: "+g("nombre"));g("correo")&&partes.push("Correo: "+g("correo"));g("telefono")&&partes.push("Tel: "+g("telefono"));g("interes")&&partes.push("Interés: "+g("interes"));g("detalle")&&partes.push("Detalle: "+g("detalle"));return encodeURIComponent(partes.join("\n"))};on(contactForm,"submit",async e=>{e.preventDefault();const interes=(Q("#interes",contactForm)?.value||"").trim();if(!interes)return;const empresa=(Q("#empresa",contactForm)?.value||"").trim();if(empresa)return;const fd=new FormData(contactForm);fd.get("ts")||fd.set("ts",String(Date.now()));fd.get("page")||fd.set("page",location.href);fd.get("ua")||fd.set("ua",navigator.userAgent);if(!GAS_OK){window.open("https://wa.me/525568437918?text="+buildWaText(fd),"_blank","noopener");return}try{await fetch(GAS_URL,{method:"POST",body:fd,mode:"no-cors"});alert("Listo. Recibimos tu mensaje. En breve te contactamos.");contactForm.reset();tsEl&&(tsEl.value=String(Date.now()));pageEl&&(pageEl.value=location.href);uaEl&&(uaEl.value=navigator.userAgent)}catch(_){window.open("https://wa.me/525568437918?text="+buildWaText(fd),"_blank","noopener")}})}}

/* 5) tabs productos + autoscroll tab activo */
function smartRailReveal(btn,behavior="smooth"){const rail=btn?.closest(".prod-tabs,.promo-filters");if(!rail||rail.scrollWidth<=rail.clientWidth+2)return;const items=QA(":scope > button",rail).filter(x=>x.offsetParent!==null),idx=items.indexOf(btn),max=Math.max(0,rail.scrollWidth-rail.clientWidth);if(idx<0||max<=0)return;const target=idx===0?0:idx===items.length-1?max:Math.max(0,Math.min(max,btn.offsetLeft-(rail.clientWidth-btn.offsetWidth)/2));rail.scrollTo({left:target,behavior})}
function initTabsProductos(){const tabs=QA(".prod-tabs .tab"),panels=QA(".panel-productos");if(!tabs.length||!panels.length)return;function activar(btn,behavior="smooth"){const targetId=btn?.dataset?.target;if(!targetId)return;tabs.forEach(t=>{const act=t.dataset.target===targetId;t.classList.toggle("active",act);t.setAttribute("aria-selected",act?"true":"false");t.tabIndex=act?0:-1});panels.forEach(p=>p.classList.toggle("hidden",p.id!==targetId));hydrateVisibleReelPosters();const panel=document.getElementById(targetId),visibleBtn=panel?QA(".prod-tabs .tab",panel).find(t=>t.dataset.target===targetId):null;requestAnimationFrame(()=>smartRailReveal(visibleBtn,behavior));window.dispatchEvent(new Event("splitbg:update"))}tabs.forEach(btn=>{if(btn.dataset.bound==="1")return;btn.dataset.bound="1";on(btn,"click",()=>activar(btn,"smooth"))});const tabInicial=document.getElementById("tab-contable");activar(tabInicial||tabs[0],"auto")}

/* 6) promos filter (solo hijos directos) */
function initPromosFilter(){const grid=document.getElementById("promoGrid");if(!grid)return;const promoBtns=QA("#promociones .promo-btn[data-filter]");if(!promoBtns.length)return;const promoItems=Array.from(grid.querySelectorAll(":scope > [data-type]"));if(!promoItems.length)return;function setPromoFilter(filter,btn=null,behavior="smooth"){promoBtns.forEach(b=>{const act=b.dataset.filter===filter;b.classList.toggle("active",act);b.setAttribute("aria-pressed",act?"true":"false")});promoItems.forEach(el=>{const type=(el.dataset.type||"").trim(),ok=filter==="all"||type===filter;el.toggleAttribute("hidden",!ok);el.style.display=ok?"":"none"});requestAnimationFrame(()=>smartRailReveal(btn||promoBtns.find(b=>b.dataset.filter===filter),behavior))}promoBtns.forEach(b=>{if(b.dataset.bound==="1")return;b.dataset.bound="1";on(b,"click",e=>{e.preventDefault();setPromoFilter(b.dataset.filter||"all",b,"smooth")})});setPromoFilter("nuevos",null,"auto")}

/* 7) cards clicables */
function initClickableCards(){QA(".card.product-card[data-href]").forEach(card=>{if(card.dataset.bound==="1")return;card.dataset.bound="1";const href=card.getAttribute("data-href");on(card,"click",e=>{if(e.target.closest("a,button,input,select,textarea,label"))return;href&&(location.href=prefix(href))})})}

/* 7.1) PERF/CLS helpers (lock + cache centers + RO) */
function lockElHeight(el){if(!el)return()=>{};const r=el.getBoundingClientRect(),h=Math.round(r.height||0);h>0&&(el.style.minHeight=h+"px");return()=>{el.style.minHeight=""}}
function lockTrackHeight(track){return lockElHeight(track)}
function buildOffsetsCache(track,slides){track.__centers=slides.map(s=>s.offsetLeft+s.clientWidth/2)}
function closestIndexFromCache(track){const centers=track.__centers||[];if(!centers.length)return 0;const x=(track.scrollLeft||0)+track.clientWidth/2;let best=0,bestDist=1/0;for(let i=0;i<centers.length;i++){const d=Math.abs(x-centers[i]);d<bestDist&&(bestDist=d,best=i)}return best}
function observeTrack(track){if(!track||!("ResizeObserver"in window)||track.__ro)return;track.__ro=new ResizeObserver(()=>{const slides=QA(".carousel-slide",track);slides.length&&buildOffsetsCache(track,slides)});track.__ro.observe(track)}

/* 8) HERO gallery data */
const HERO_GALLERY_DATA={contable:{label:"Contables",defaultSys:"nominas",systems:{contabilidad:{label:"Contabilidad",icon:"/IMG/logos/contabilidad-hz-384.webp",images:[{src:"IMG/contamate.webp"},{src:"IMG/contadesglo.webp"},{src:"IMG/conta%20y%20bancos.webp"},{src:"IMG/conta%20y%20bancos%202.webp"},{src:"IMG/impuestos%20sin%20estres%20conta%20y%20bancos.webp"},{src:"IMG/1conta.webp"}]},nominas:{label:"Nóminas",icon:"/IMG/logos/nominas-hz-384.webp",images:[{src:"IMG/primera.webp"},{src:"IMG/nomisr.webp"},{src:"IMG/490962328_1082897360538668_175183934644162321_n.webp"},{src:"IMG/ptu.webp"},{src:"IMG/posible.webp"}]},bancos:{label:"Bancos",icon:"/IMG/logos/bancos-hz-384.webp",images:[{src:"IMG/efectivamente.webp"},{src:"IMG/olvida.webp"},{src:"IMG/CONTROL%20MOVIMIENTOS%20BANCARIOS.webp"},{src:"IMG/CARRUSEL%20CONECTA%201jpg.webp"},{src:"IMG/CARRUSEL%20CONECTA%202.webp"},{src:"IMG/PAGARAN.webp"}]},xml:{label:"XML en Línea+",icon:"/IMG/logos/xml-hz-384.webp",images:[{src:"IMG/dos.webp"},{src:"IMG/SOFTWARE%20FAVORITO%201.webp"},{src:"IMG/SOFTWARE%20FAVORITO%202.webp"}]}}},comercial:{label:"Comerciales",defaultSys:"pro",systems:{pro:{label:"Comercial Pro",icon:"/IMG/logos/comercial-pro-hz-384.webp",images:[{src:"IMG/captura%20manual.webp"},{src:"IMG/procumple.webp"},{src:"IMG/prorenta.webp"},{src:"IMG/COMPRAVENTA.webp"},{src:"IMG/FUNCIONES%20PRO.webp"},{src:"IMG/FUNCIONES%20PRO2.webp"}]},premium:{label:"Comercial Premium",icon:"/IMG/logos/comercial-premium-hz-384.webp",images:[{src:"IMG/desde%20compras%20ventas%20traslados.webp"},{src:"IMG/INVENTARIO%20Y%20VENTAS.webp"},{src:"IMG/LIGAS%20DE%20PAGO.webp"},{src:"IMG/NOTAS%20DE%20VENTA.webp"},{src:"IMG/COSTOS%20Y%20UTILIDADES.webp"},{src:"IMG/INVENTARIOS,%20FINANZAS%20jpg.webp"}]},factura:{label:"Factura electrónica",icon:"/IMG/logos/factura-hz-384.webp",images:[{src:"IMG/INCLUYE%201.webp"},{src:"IMG/INCLUYE%202.webp"},{src:"IMG/INCLUYE%203.webp"},{src:"IMG/CARACTERISTICAS%202.webp"},{src:"IMG/CARACTERISTICAS%203.webp"},{src:"IMG/carta%20porte.webp"}]}}},nube:{label:"En la Nube",defaultSys:"contabiliza",systems:{contabiliza:{label:"Contabiliza",icon:"/IMG/logos/contabilidad-nube-hz-384.webp",images:[{src:"IMG/contatranq.webp"},{src:"IMG/contaclari.webp"},{src:"IMG/contabprocesos.webp"},{src:"IMG/contabireal.webp"}]},personia:{label:"Personia",icon:"/IMG/logos/nominas-nube-hz-384.webp",images:[{src:"IMG/personiasbc.webp"},{src:"IMG/persoseg.webp"},{src:"IMG/personmas.webp"},{src:"IMG/personiaptu.webp"},{src:"IMG/persobime.webp"}]},vende:{label:"Vende",icon:"/IMG/logos/vende-hz-384.webp",images:[{src:"IMG/vendevendes.webp"},{src:"IMG/vendesigue.webp"},{src:"IMG/vendexml.webp"},{src:"IMG/vendesegui.webp"},{src:"IMG/venderuta.webp"},{src:"IMG/vendequien.webp"}]},colabora:{label:"Colabora",icon:"/IMG/colabora.webp",images:[{src:"IMG/colabacceso.webp"},{src:"IMG/colabtoda.webp"},{src:"IMG/colacentra.webp"},{src:"IMG/colacola.webp"}]}}},productividad:{label:"Productividad",defaultSys:"analiza",systems:{analiza:{label:"Analiza",icon:"IMG/analiza.webp",images:[{src:"IMG/analizareportes.webp"},{src:"IMG/anadecide.webp"},{src:"IMG/ananocuadr.webp"},{src:"IMG/analizarespues.webp"},{src:"IMG/analizadescuadr.webp"},{src:"IMG/analizacorrige.webp"},{src:"IMG/analizacfdi.webp"}]},evalua:{label:"Evalúa",icon:"/IMG/logos/evalua-hz-384.webp",images:[{src:"IMG/evaluaencu.webp"},{src:"IMG/evaluabien.webp"},{src:"IMG/nom37.webp"}]},optimiza:{label:"Optimiza",icon:"/IMG/logos/optimiza-hz-384.webp",images:[{src:"/IMG/logos/optimiza-hz-384.webp",logo:"optimiza"}]},anticipa:{label:"Anticipa",icon:"/IMG/logos/anticipa-hz-384.webp",images:[{src:"/IMG/logos/anticipa-hz-384.webp",logo:"anticipa"}]}}},servicios:{label:"Servicios",defaultSys:"polizas",systems:{}}};
const HERO_GALLERY={groupNav:Q("#heroGalleryGroups"),tabsContainer:Q("#heroGalleryTabs"),titleEl:Q("#heroGalleryTitle"),carousel:Q("#heroGalleryCarousel"),defaultGroup:"contable"};
function r19ResponsiveLogo(img,src,sizes){if(/\/(?:colabora|analiza)\.webp$/.test(String(src||""))){const name=String(src).match(/([^/]+)\.webp$/)[1];img.srcset=`/IMG/${name}.webp 600w`;img.sizes=sizes;img.width=600;img.height=210;img.dataset.r19Logo=name+"-hz-legacy";return}const m=String(src||"").match(/\/IMG\/logos\/(.+)-(nsq|hz)-(160|384)\.webp$/);if(!m)return;const [,name,kind]=m;let candidates="";if(kind==="nsq")candidates=`/IMG/logos/${name}-nsq-160.webp 160w, /IMG/logos/${name}-nsq-320.webp 320w`;else{const top=name==="comercial-start"?740:name==="comercial-pro"?738:768;candidates=`/IMG/logos/${name}-hz-384.webp 384w, /IMG/logos/${name}-hz-${top}.webp ${top}w`;if(name==="nominas")candidates+=", /IMG/logos/nominas-hz-1440.webp 1440w"}img.srcset=candidates;img.sizes=sizes;img.dataset.r19Logo=name+"-"+kind;if(kind==="nsq"){img.width=160;img.height=160}else{const dims={"anticipa":[384,131],"bancos":[384,136],"comercial-premium":[384,129],"comercial-pro":[384,130],"comercial-start":[384,130],"contabilidad":[384,112],"contabilidad-nube":[384,97],"evalua":[384,146],"factura":[384,123],"nominas":[384,129],"nominas-nube":[384,101],"optimiza":[384,126],"vende":[384,147],"xml":[384,83]}[name]||[384,160];img.width=dims[0];img.height=dims[1]}}

/* 8.1) HERO build slides (lock .carousel para CLS) */
function buildHeroGallerySlides(groupKey,sysKey){const g=HERO_GALLERY_DATA[groupKey];if(!g)return;const sys=g.systems[sysKey];if(!sys||!sys.images?.length)return;HERO_GALLERY.titleEl&&(HERO_GALLERY.titleEl.textContent=sys.label||"");const carousel=HERO_GALLERY.carousel;if(!carousel)return;const track=carousel.querySelector(".carousel-track"),nav=carousel.querySelector(".carousel-nav");if(!track||!nav)return;const unlockCarousel=lockElHeight(carousel);track.innerHTML="";nav.innerHTML="";const fragTrack=document.createDocumentFragment(),fragNav=document.createDocumentFragment();sys.images.forEach((item,idx)=>{const slide=document.createElement("div");slide.className="carousel-slide hero-slide"+(idx===0?" is-active":"");const img=document.createElement("img");img.src=prefix(item.src);img.alt=item.title||sys.label||"Expiriti";img.width=600;img.height=600;if(item.logo)r19ResponsiveLogo(img,item.src,"(max-width: 980px) calc(100vw - 48px), 675px");img.decoding="async";const isLCP=groupKey===HERO_GALLERY.defaultGroup&&sysKey===g.defaultSys&&idx===0;if(isLCP){img.loading="eager";img.setAttribute("fetchpriority","high");addPreloadImage(item.src)}else img.loading="lazy";slide.appendChild(img);fragTrack.appendChild(slide);const dot=document.createElement("button");dot.type="button";dot.className="dot"+(idx===0?" active":"");dot.setAttribute("aria-label","Ir a imagen "+(idx+1));on(dot,"click",()=>{const slides=QA(".carousel-slide",track);slides.forEach(s=>s.classList.remove("is-active"));slides[idx]?.classList.add("is-active");QA(".dot",nav).forEach(d=>d.classList.remove("active"));dot.classList.add("active");track.scrollTo({left:slides[idx].offsetLeft,behavior:"smooth"})});fragNav.appendChild(dot)});track.appendChild(fragTrack);nav.appendChild(fragNav);requestAnimationFrame(()=>{const slides=QA(".carousel-slide",track);slides.length&&buildOffsetsCache(track,slides);observeTrack(track);unlockCarousel()})}
function buildHeroSystemTabs(groupKey){const g=HERO_GALLERY_DATA[groupKey];if(!g)return;const c=HERO_GALLERY.tabsContainer;if(!c)return;c.innerHTML="";const def=g.defaultSys;Object.entries(g.systems||{}).forEach(([sysKey,sys])=>{const btn=document.createElement("button");btn.type="button";btn.className="hero-tab"+(sysKey===def?" active":"");btn.dataset.group=groupKey;btn.dataset.sys=sysKey;btn.setAttribute("aria-label",sys.label||sysKey);btn.setAttribute("title",sys.label||sysKey);const img=document.createElement("img");img.src=prefix(sys.icon);img.alt="";img.loading="lazy";img.decoding="async";r19ResponsiveLogo(img,sys.icon,"56px");btn.appendChild(img);on(btn,"click",()=>{QA(".hero-tab",c).forEach(b=>b.classList.toggle("active",b===btn));buildHeroGallerySlides(groupKey,sysKey);HERO_GALLERY.carousel?.__resetHeroSync?.()});c.appendChild(btn)})}
function initHeroGallery(){const groupNav=HERO_GALLERY.groupNav,carousel=HERO_GALLERY.carousel;if(!groupNav||!carousel)return;groupNav.innerHTML="";Object.entries(HERO_GALLERY_DATA).forEach(([groupKey,group])=>{if(groupKey==="servicios")return;const btn=document.createElement("button");btn.type="button";btn.className="hero-group-tab"+(groupKey===HERO_GALLERY.defaultGroup?" active":"");btn.dataset.group=groupKey;btn.textContent=group.label;on(btn,"click",()=>{QA(".hero-group-tab",groupNav).forEach(b=>b.classList.toggle("active",b===btn));const cfg=HERO_GALLERY_DATA[groupKey];buildHeroSystemTabs(groupKey);buildHeroGallerySlides(groupKey,cfg.defaultSys);carousel.__resetHeroSync?.()});groupNav.appendChild(btn)});const track=carousel.querySelector(".carousel-track"),prev=carousel.querySelector(".arrowCircle.prev"),next=carousel.querySelector(".arrowCircle.next");if(!track)return;observeTrack(track);const slidesFor=()=>QA(".carousel-slide",track),getIdxFromScroll=()=>closestIndexFromCache(track),goTo=(i,behavior="smooth")=>{const slides=slidesFor();if(!slides.length)return;/* EXPIRITI_T25S_CAROUSEL_WRAP_OWNER: wrap infinito (last+next=first, first+prev=last). */const len=slides.length,idx=(i%len+len)%len;/* EXPIRITI_RC1_CAROUSEL_STABILITY_OWNER: en un salto de wrap el scroll suave atravesaria todos los slides intermedios y el sync de scroll repintaria los dots en cada frame (parpadeo). El salto no adyacente se hace instantaneo y se bloquea el sync mientras dura la transicion. */const __cur=slides.findIndex(x=>x.classList.contains("is-active"));const __wrap=__cur>=0&&Math.abs(idx-__cur)>1;carousel.__expNavLock=performance.now()+(__wrap?260:520);if(__wrap)behavior="instant";/* EXPIRITI_RC1R2_WRAP_INSTANT_FIX: "auto" delega en el CSS, y .carousel-track declara scroll-behavior:smooth, asi que el salto de wrap seguia animandose y encendia los dots intermedios en cascada. "instant" si es inmediato. */slides.forEach(s=>s.classList.remove("is-active"));slides[idx].classList.add("is-active");const navEl=carousel.querySelector(".carousel-nav");QA(".dot",navEl).forEach((d,k)=>d.classList.toggle("active",k===idx));track.scrollTo({left:slides[idx].offsetLeft,behavior})};const curIdx=()=>{const s=slidesFor(),i=s.findIndex(x=>x.classList.contains("is-active"));return i<0?getIdxFromScroll():i};carousel.dataset.arrowsBound!=="1"&&(carousel.dataset.arrowsBound="1",on(prev,"click",()=>goTo(curIdx()-1)),on(next,"click",()=>goTo(curIdx()+1)));if(carousel.dataset.scrollSync!=="1"){carousel.dataset.scrollSync="1";let raf=0,lastIdx=-1;const syncFromScroll=()=>{raf=0;const slides=slidesFor(),len=slides.length;if(!len)return;if(performance.now()<(carousel.__expNavLock||0))return;/* RC1: no repintar durante la transicion programada */const idx=getIdxFromScroll();if(idx===lastIdx)return;lastIdx=idx;slides.forEach((s,k)=>s.classList.toggle("is-active",k===idx));const navEl=carousel.querySelector(".carousel-nav");QA(".dot",navEl).forEach((d,k)=>d.classList.toggle("active",k===idx))};on(track,"scroll",()=>{raf&&cancelAnimationFrame(raf);raf=requestAnimationFrame(syncFromScroll)},{passive:!0});on(window,"resize",()=>{lastIdx=-1;const slides=slidesFor();slides.length&&buildOffsetsCache(track,slides);syncFromScroll()});carousel.__resetHeroSync=()=>{lastIdx=-1;track.scrollTo({left:0,behavior:"auto"});requestAnimationFrame(()=>{const slides=slidesFor();slides.length&&buildOffsetsCache(track,slides);syncFromScroll()})}}const cfg=HERO_GALLERY_DATA[HERO_GALLERY.defaultGroup];buildHeroSystemTabs(HERO_GALLERY.defaultGroup);buildHeroGallerySlides(HERO_GALLERY.defaultGroup,cfg.defaultSys)}

/* 9) REELS data */
const REELS_DATA={contable:{titleEl:Q("#reelTitle-contable"),carousel:Q("#carouselReels-contable"),defaultSys:"contabilidad",reelsBySys:{contabilidad:[{id:"yblBsFFv6bc",title:"Contabilidad y Contabiliza te ayudan en la DIOT"},{id:"BIhYNn2O0og",title:"Evita errores en la DIOT con Contabilidad"},{id:"rESYB37TP-M",title:"Declaración anual en 5 pasos con Contabilidad"},{id:"LqptaBOF7h4",title:"Fernanda redujo su carga contable con Contabilidad"}],nominas:[{id:"gae67GDse30",title:"Nóminas y Nóminas Nube | Checador por GPS"},{id:"8-2rT99euog",title:"Nóminas | Software #1 en México"},{id:"2eVOzoBoP6s",title:"Nóminas | Automatiza tus procesos"},{id:"nLRgiOPQM80",title:"App Colabora gratis con Nóminas"},{id:"MfiiX1La2vQ",title:"Qué hace CONTPAQi Nóminas por ti"},{id:"XJQDFDowH0U",title:"Colabora, app sin costo con CONTPAQi Nóminas"}],bancos:[{id:"3YUbSEyU678",title:"Conciliación bancaria en 3 pasos con Bancos"},{id:"LC1Ccpv_jzo",title:"4 señales de que necesitas Bancos"}],xml:[{id:"nhoUDNnGQ90",title:"El día que José dejó de sufrir con el SAT descargando CFDIs"}]}},comercial:{titleEl:Q("#reelTitle-comercial"),carousel:Q("#carouselReels-comercial"),defaultSys:"pro",reelsBySys:{start:[{id:"XvBHmrMRv64",title:"Trazabilidad avanzada en inventarios"}],pro:[{id:"-SJq6t2SM7c",title:"Flujo completo con Comercial Pro"},{id:"rEYzPXOX1_Y",title:"Comercial Pro: control total de inventario"}],premium:[{id:"IYwNBfmWxJU",title:"Controla tus inventarios con Comercial Premium"},{id:"_Krv5nTyFuY",title:"Notas de venta más rápido en Comercial Premium"},{id:"HmgOQrasCVw",title:"Notas de venta en Comercial Premium"},{id:"WGPOzQ1GsSE",title:"Documentos por WhatsApp en Comercial Premium"}],factura:[{id:"nMEgM_BvxTs",title:"Factura Electrónica v13 | Novedades"},{id:"IA5-tguZzCc",title:"Carta Porte CFDI 3.1 en Factura Electrónica"},{id:"2uBSGZHLsGs",title:"Factura Electrónica para sector notarial"}]}},nube:{titleEl:Q("#reelTitle-nube"),carousel:Q("#carouselReels-nube"),defaultSys:"contabilidadnube",reelsBySys:{contabilidadnube:[{id:"yblBsFFv6bc",title:"Contabilidad y Contabilidad Nube te ayudan en la DIOT"}],nominasnube:[{id:"gae67GDse30",title:"Nóminas y Nóminas Nube | Checador por GPS"},{id:"nLRgiOPQM80",title:"App Colabora gratis con Nóminas"},{id:"XJQDFDowH0U",title:"Colabora, app sin costo con CONTPAQi Nóminas"}],vende:[{id:"AxadLJcVo4M",title:"Caso de éxito CONTPAQi Vende"},{id:"UPyufjDByNc",title:"Testimonio CONTPAQi Vende"},{id:"Grx1woHMGsU",title:"Vende en la nube"},{id:"2Ty_SD8B_FU",title:"Vende | Carta Porte fácil y rápida"}]}},productividad:{titleEl:Q("#reelTitle-productividad"),carousel:Q("#carouselReels-productividad"),defaultSys:"analiza",reelsBySys:{analiza:[{id:"wr-eeR3eE7w",title:"Analiza | Conciliación fiscal y bancaria"},{id:"gAIGxMHaCLQ",title:"Analiza | Identifica descuadres CFDIs y Nóminas"},{id:"iEQM_21OmBI",title:"Conciliación fiscal y contable con Analiza"}],evalua:[{id:"Cn1A4-GJiNs",title:"Evalúa"}],optimiza:[{id:"iVFSWCEOu_c",title:"Optimiza | Comienza a usar Optimiza"},{id:"M2wUCMsQ2b4",title:"Optimiza | Integración con CONTPAQi Bancos"}],anticipa:[{id:"Cn1A4-GJiNs",title:"Anticipa | Blindaje fiscal preventivo"}]}},servicios:{titleEl:null,carousel:Q("#carouselReels-servicios"),defaultSys:"polizas",reelsBySys:{implementaciones:[{id:"aHGJ-TNpJ-U",title:"Testimonio Martha: Implementación Contable"}],migraciones:[{id:"4QqrKkTPZ6U",title:"Testimonio Uriel: Migración a CONTPAQi"}],desarrollos:[{id:"uBl5UWkwbr8",title:"Testimonio Luis: Desarrollo en Nóminas"}],servidores:[{id:"Vmf2CcSd8G4",title:"Testimonio Erika: Servidores Virtuales"}],cursos:[{id:"TgAkwNt4YCA",title:"Testimonio Ana: Curso Contabilidad"}],soporte:[{id:"inPKGICgxLc",title:"Testimonio Jaquie: Soporte Técnico"}],polizas:[{id:"sTvwf2ISsJU"}]}}};

/* 10) reels helpers + render */
function setArrowsEnabled(prev,next,enabled){[prev,next].forEach(btn=>{if(!btn)return;btn.style.pointerEvents=enabled?"":"none";btn.style.opacity=enabled?"":"0.35";btn.setAttribute("aria-disabled",enabled?"false":"true");btn.classList.toggle("is-disabled",!enabled);"disabled"in btn&&(btn.disabled=!enabled)})}
function setSingleLineReelTitle(c,t){if(!c||!c.titleEl)return;c.titleEl.textContent=t||""}
function renderReelThumb(wrap,priority=false,defer=false){const id=wrap.dataset.ytid;if(!id)return;const title=wrap.dataset.title||"",poster=(id==="XvBHmrMRv64"||id==="-SJq6t2SM7c"||id==="rEYzPXOX1_Y")?`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`:`https://i.ytimg.com/vi/${id}/oar2.jpg`,source=defer?`data-src="${poster}"`:`src="${poster}"`;delete wrap.dataset.ytMounted;wrap.classList.remove("is-loading","is-ready","has-iframe");wrap.innerHTML=`<button class="yt-thumb exp-media-poster" type="button" aria-label="Reproducir: ${title}" aria-pressed="false"><img class="exp-media-thumbnail" ${source} loading="${priority?"eager":"lazy"}" decoding="async" width="1080" height="1920" ${priority?'fetchpriority="high"':""} alt="${title}" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${id}/hqdefault.jpg';"><span class="yt-play"></span></button>`;const btn=wrap.querySelector(".yt-thumb");btn&&btn.dataset.bound!=="1"&&(btn.dataset.bound="1",on(btn,"click",()=>{stopAllReels();renderReelIframe(wrap)}))}
function hydrateVisibleReelPosters(){QA(".panel-productos:not(.hidden) .exp-media-thumbnail[data-src]").forEach((img,idx)=>{img.src=img.dataset.src;delete img.dataset.src;img.loading=idx===0?"eager":"lazy";idx===0&&img.setAttribute("fetchpriority","high")})}
function renderReelIframe(wrap){if(!wrap||wrap.dataset.ytMounted==="1")return;const id=wrap.dataset.ytid,title=wrap.dataset.title||"",poster=wrap.querySelector(":scope > .exp-media-poster");if(!id||!poster)return;wrap.dataset.ytMounted="1";wrap.classList.add("is-loading");poster.disabled=true;poster.setAttribute("aria-pressed","true");const iframe=document.createElement("iframe");iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;iframe.title=title;iframe.allow="autoplay; encrypted-media; picture-in-picture";iframe.allowFullscreen=true;iframe.addEventListener("load",()=>{poster.remove();wrap.classList.remove("is-loading");wrap.classList.add("is-ready")},{once:true});wrap.appendChild(iframe);wrap.classList.add("has-iframe")}
function stopAllReels(){document.querySelectorAll(".reel-embed").forEach(w=>{w.querySelector("iframe")&&renderReelThumb(w)});document.querySelectorAll(".yt-lite").forEach(node=>{if(node.dataset.ytLoaded==="1"){const id=node.dataset.ytid,title=node.dataset.title||"Video",thumb=`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;node.innerHTML=`<button class="yt-lite-inner" type="button" aria-label="Reproducir: ${title}"><span class="yt-lite-thumb" style="background-image:url('${thumb}')"></span><span class="yt-lite-play"></span></button>`;node.dataset.ytLoaded=""}})}
function buildReelsSlides(panelKey,sysKey){const cfg=REELS_DATA[panelKey];if(!cfg)return;const track=cfg.carousel?.querySelector(".carousel-track"),nav=cfg.carousel?.querySelector(".carousel-nav");if(!track||!nav)return;const prev=cfg.carousel.querySelector(".arrowCircle.prev"),next=cfg.carousel.querySelector(".arrowCircle.next"),reels=cfg.reelsBySys[sysKey]||[],multi=reels.length>1,unlock=lockElHeight(cfg.carousel);track.innerHTML="";nav.innerHTML="";cfg.carousel.toggleAttribute("data-single-reel",reels.length===1);setArrowsEnabled(prev,next,multi);reels.forEach((reel,idx)=>{const slide=document.createElement("div");slide.className="carousel-slide"+(idx===0?" is-active":"");slide.classList.add("blur-frame");const thumbUrl=`https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`;slide.style.setProperty("--blur-src",`url("${thumbUrl}")`);const wrap=document.createElement("div");wrap.className="reel-embed exp-media-shell exp-media-shell--reel";wrap.dataset.mediaFamily="reel";wrap.dataset.ytid=reel.id;wrap.dataset.title=reel.title||"";renderReelThumb(wrap,idx===0 && cfg.carousel.offsetParent!==null,cfg.carousel.offsetParent===null);slide.appendChild(wrap);track.appendChild(slide);if(multi){const dot=document.createElement("button");dot.type="button";dot.className="dot"+(idx===0?" active":"");dot.setAttribute("aria-label","Ir al reel "+(idx+1));on(dot,"click",()=>{const slides=QA(".carousel-slide",track);slides.forEach(s=>s.classList.remove("is-active"));slides[idx]?.classList.add("is-active");QA(".dot",nav).forEach(d=>d.classList.remove("active"));dot.classList.add("active");track.scrollTo({left:slides[idx].offsetLeft,behavior:"smooth"});stopAllReels();panelKey!=="servicios"&&setSingleLineReelTitle(cfg,reel.title||"")});nav.appendChild(dot)}});panelKey!=="servicios"&&reels[0]?.title&&setSingleLineReelTitle(cfg,reels[0].title);requestAnimationFrame(()=>{unlock();const slides=QA(".carousel-slide",track);slides.length&&buildOffsetsCache(track,slides);observeTrack(track)})}
function initReelsCarousel(panelKey){const cfg=REELS_DATA[panelKey];if(!cfg||!cfg.carousel)return;const track=cfg.carousel.querySelector(".carousel-track"),prev=cfg.carousel.querySelector(".arrowCircle.prev"),next=cfg.carousel.querySelector(".arrowCircle.next");if(!track)return;observeTrack(track);const slidesFor=()=>QA(".carousel-slide",track),dotsFor=()=>QA(".carousel-nav .dot",cfg.carousel);if(cfg.carousel.dataset.arrowsBound!=="1"){cfg.carousel.dataset.arrowsBound="1";const goTo=i=>{const slides=slidesFor(),len=slides.length;if(!len||len<=1)return;const idx=(i%len+len)%len;/* EXPIRITI_RC1_CAROUSEL_STABILITY_OWNER: wrap sin barrido intermedio ni repintado de dots */const __cur=slides.findIndex(x=>x.classList.contains("is-active"));const __wrap=__cur>=0&&Math.abs(idx-__cur)>1;cfg.carousel.__expNavLock=performance.now()+(__wrap?260:520);slides.forEach(s=>s.classList.remove("is-active"));slides[idx].classList.add("is-active");dotsFor().forEach((d,k)=>d.classList.toggle("active",k===idx));track.scrollTo({left:slides[idx].offsetLeft,behavior:__wrap?"instant":"smooth"});/* EXPIRITI_RC1R2_WRAP_INSTANT_FIX */const sys=cfg._activeSys||cfg.defaultSys,reels=cfg.reelsBySys[sys]||[];panelKey!=="servicios"&&setSingleLineReelTitle(cfg,reels[idx]?.title||"");stopAllReels()};on(prev,"click",()=>{const slides=slidesFor();if(slides.length<=1)return;const i=slides.findIndex(s=>s.classList.contains("is-active"));goTo(i-1)});on(next,"click",()=>{const slides=slidesFor();if(slides.length<=1)return;const i=slides.findIndex(s=>s.classList.contains("is-active"));goTo(i+1)})}if(cfg.carousel.dataset.scrollSync!=="1"){cfg.carousel.dataset.scrollSync="1";let raf=0,lastIdx=-1;const syncFromScroll=()=>{raf=0;if(performance.now()<(cfg.carousel.__expNavLock||0))return;/* RC1 */const slides=slidesFor(),len=slides.length;if(!len)return;const idx=closestIndexFromCache(track);if(idx===lastIdx)return;lastIdx=idx;slides.forEach((s,k)=>s.classList.toggle("is-active",k===idx));dotsFor().forEach((d,k)=>d.classList.toggle("active",k===idx));const sys=cfg._activeSys||cfg.defaultSys,reels=cfg.reelsBySys[sys]||[];panelKey!=="servicios"&&setSingleLineReelTitle(cfg,reels[idx]?.title||"")};on(track,"scroll",()=>{raf&&cancelAnimationFrame(raf);raf=requestAnimationFrame(syncFromScroll)},{passive:!0});on(window,"resize",()=>{lastIdx=-1;const slides=slidesFor();slides.length&&buildOffsetsCache(track,slides);syncFromScroll()})}cfg._activeSys=cfg.defaultSys;buildReelsSlides(panelKey,cfg.defaultSys)}
function initYTLiteVideos(){QA(".yt-lite").forEach(node=>{if(node.dataset.ytReady==="1")return;const id=node.dataset.ytid,title=node.dataset.title||"Video";if(!id)return;node.dataset.ytReady="1";const thumb=`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;node.innerHTML=`<button class="yt-lite-inner" type="button" aria-label="Reproducir: ${title}"><span class="yt-lite-thumb" style="background-image:url('${thumb}')"></span><span class="yt-lite-play"></span></button>`;on(node,"click",()=>{if(node.dataset.ytLoaded==="1")return;stopAllReels();node.innerHTML=`<iframe class="yt-iframe" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;node.dataset.ytLoaded="1"})})}
function initFAQ(){const wrap=Q("#faq .faq-wrap");if(!wrap||wrap.dataset.bound==="1")return;wrap.dataset.bound="1";wrap.style.overflowAnchor="none";const items=QA(".faq-item",wrap);items.forEach(item=>{const summary=Q(":scope > summary",item);if(!summary)return;on(summary,"click",event=>{event.preventDefault();const opening=!item.open;items.forEach(other=>{if(other!==item)other.open=false});item.open=opening;summary.focus({preventScroll:true});if(!opening)return;requestAnimationFrame(()=>{const vh=visualViewport?.height||innerHeight,safeBottom=vh-20,rect=item.getBoundingClientRect(),overflow=rect.bottom-safeBottom;if(overflow<=24)return;scrollBy({top:Math.min(overflow,Math.max(0,rect.top-76)),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})})})})}
function initReelsTabs(){QA(".reel-tab").forEach(tab=>{if(tab.dataset.bound==="1")return;tab.dataset.bound="1";on(tab,"click",()=>{const panelKey=tab.dataset.panel,sysKey=tab.dataset.sys;if(!panelKey||!sysKey)return;const cfg=REELS_DATA[panelKey];cfg&&(cfg._activeSys=sysKey);stopAllReels();QA(".reel-tab").forEach(t=>{t.dataset.panel===panelKey&&t.classList.toggle("active",t===tab)});buildReelsSlides(panelKey,sysKey);const reels0=cfg?.reelsBySys?.[sysKey]||[];cfg?.carousel?.querySelector(".carousel-track")?.scrollTo({left:0,behavior:"auto"});panelKey!=="servicios"&&setSingleLineReelTitle(cfg,reels0[0]?.title||"");window.dispatchEvent(new Event("splitbg:update"))})})}
function initPromoLightbox(){
  const modal=Q("#promoModal"),grid=Q("#promoGrid");
  if(!modal||!grid||modal.dataset.bound==="1")return;
  modal.dataset.bound="1";
  const dialog=Q(".promo-modal-dialog",modal),image=Q("[data-promo-image]",modal),title=Q("#promoModalTitle",modal),thumbs=Q("[data-promo-thumbs]",modal),prev=Q("[data-promo-prev]",modal),next=Q("[data-promo-next]",modal),zoomIn=Q("[data-promo-zoom-in]",modal),zoomOut=Q("[data-promo-zoom-out]",modal),download=Q("[data-promo-download]",modal),wa=Q("[data-promo-wa]",modal),imageWrap=Q(".promo-modal-image-wrap",modal);
  on(image,"load",()=>{const w=image.naturalWidth||1,h=image.naturalHeight||1;dialog.style.setProperty("--promo-aspect",String(w/h));dialog.dataset.promoShape=w===h?"square":w>h?"landscape":"portrait"});
  let group=[],index=0,zoom=1,panX=0,panY=0,origin=null,pointer=null,zoomDiscovered=false,waDiscovered=false;
  const focusables=()=>QA('button:not([hidden]):not([disabled]),a[href]:not([hidden]),[tabindex]:not([tabindex="-1"]):not([hidden])',dialog);
  const limits=()=>({x:Math.max(0,(image.offsetWidth*zoom-imageWrap.clientWidth)/2),y:Math.max(0,(image.offsetHeight*zoom-imageWrap.clientHeight)/2)});
  const paint=()=>{const lim=limits();panX=Math.max(-lim.x,Math.min(lim.x,panX));panY=Math.max(-lim.y,Math.min(lim.y,panY));image.style.transform=`translate(${panX}px,${panY}px) scale(${zoom})`;imageWrap.classList.toggle("is-zoomed",zoom>1)};
  const setZoom=value=>{zoom=Math.max(1,Math.min(2.5,value));if(zoom===1){panX=0;panY=0}zoomOut.disabled=zoom<=1;zoomIn.disabled=zoom>=2.5;requestAnimationFrame(paint)};
  const render=()=>{const item=group[index],source=Q("img",item),promoTitle=source?.alt?.trim()||"Promoción ExpIRI Ti";if(!source)return;image.src=source.currentSrc||source.src;image.alt=promoTitle;title.textContent=promoTitle;download.href=source.currentSrc||source.src;download.setAttribute("download",(source.src.split("/").pop()||"promocion.webp").split("?")[0]);wa.href=`https://wa.me/525568437918?text=${encodeURIComponent(`Hola! Quiero aplicar este descuento: ${promoTitle}. Lo vi en su página web.`)}`;setZoom(1);const multi=group.length>1;prev.hidden=!multi;next.hidden=!multi;thumbs.hidden=!multi;thumbs.replaceChildren(...group.map((entry,i)=>{const sourceThumb=Q("img",entry),button=document.createElement("button");button.type="button";button.className="promo-modal-thumb"+(i===index?" active":"");button.setAttribute("aria-label",`Ver imagen ${i+1} de ${group.length}`);i===index&&button.setAttribute("aria-current","true");const thumb=document.createElement("img");thumb.src=sourceThumb.currentSrc||sourceThumb.src;thumb.alt="";button.appendChild(thumb);on(button,"click",()=>{index=i;render()});return button}))};
  const open=item=>{const type=item.dataset.type;group=QA(`.promo-item[data-type="${CSS.escape(type)}"]`,grid).filter(entry=>!entry.hidden&&getComputedStyle(entry).display!=="none");if(!group.includes(item))group=QA(`.promo-item[data-type="${CSS.escape(type)}"]`,grid);index=Math.max(0,group.indexOf(item));origin=item;render();modal.hidden=false;document.body.classList.add("promo-modal-open");zoomIn.classList.toggle("is-discovery-cue",!zoomDiscovered);wa.classList.toggle("is-discovery-cue",!waDiscovered);requestAnimationFrame(()=>dialog.focus())};
  const close=()=>{if(modal.hidden)return;modal.hidden=true;document.body.classList.remove("promo-modal-open");setZoom(1);image.removeAttribute("src");origin?.focus();origin=null};
  const move=delta=>{if(group.length<=1)return;index=(index+delta+group.length)%group.length;render()};
  QA(".promo-item",grid).forEach(item=>{on(item,"click",()=>open(item));on(item,"keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();open(item)}})});
  QA("[data-promo-close]",modal).forEach(control=>on(control,"click",close));
  on(prev,"click",()=>move(-1));on(next,"click",()=>move(1));on(zoomIn,"click",()=>{zoomDiscovered=true;zoomIn.classList.remove("is-discovery-cue");setZoom(zoom+.25)});on(zoomOut,"click",()=>setZoom(zoom-.25));on(wa,"click",()=>{waDiscovered=true;wa.classList.remove("is-discovery-cue")});
  on(window,"resize",paint);
  on(modal,"keydown",event=>{if(event.key==="Escape"){event.preventDefault();close();return}if(event.key==="ArrowLeft"){event.preventDefault();move(-1);return}if(event.key==="ArrowRight"){event.preventDefault();move(1);return}if(event.key!=="Tab")return;const items=focusables();if(!items.length)return;const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}})
}
function initTOC(){const toc=Q("#toc");if(!toc||toc.dataset.bound==="1")return;toc.dataset.bound="1";const toggle=Q("#tocToggle",toc),closeBtn=Q(".toc-close",toc),links=QA('a[href^="#"]',toc),open=()=>{toc.classList.remove("collapsed");toc.classList.add("open");toggle&&toggle.setAttribute("aria-label","Cerrar mapa");toggle&&toggle.setAttribute("aria-expanded","true")},close=()=>{toc.classList.add("collapsed");toc.classList.remove("open");toggle&&toggle.setAttribute("aria-label","Abrir mapa");toggle&&toggle.setAttribute("aria-expanded","false")},toggleTOC=()=>{toc.classList.contains("collapsed")?open():close()};on(toggle,"click",e=>{e.preventDefault();e.stopPropagation();toggleTOC()});on(closeBtn,"click",e=>{e.preventDefault();e.stopPropagation();close()});links.forEach(a=>on(a,"click",()=>close()));on(document,"click",e=>{toc.contains(e.target)||close()});on(document,"keydown",e=>{"Escape"===e.key&&close()});close()}

            
/* 11) services pager (mobile) */
function initServicesPager(){const root=document.getElementById("servicesCarousel"),dotsWrap=document.getElementById("servicesDots");if(!root||!dotsWrap)return;const isDesktop=window.matchMedia("(min-width: 981px)").matches,isCarousel=root.classList.contains("is-carousel");if(isDesktop||!isCarousel){dotsWrap.innerHTML="";root.__svcPagerSync=null;return}const pages=Array.from(root.querySelectorAll(".svc-page"));if(pages.length<=1){dotsWrap.innerHTML="";root.__svcPagerSync=null;return}dotsWrap.innerHTML="";const base=pages[0].offsetLeft,dots=pages.map((p,i)=>{const b=document.createElement("button");b.type="button";b.className="dot"+(i===0?" active":"");b.setAttribute("aria-label",`Ir a página ${i+1} de servicios`);b.addEventListener("click",()=>{/* EXPIRITI_RC1R4_MOBILE_DOTS_OWNER: DOT n -> SLIDE n directo. Los saltos no adyacentes son instantaneos para no recorrer los slides intermedios ni encender dots en cascada. */const cur=typeof root.__expIdx==="number"?root.__expIdx:0;const jump=Math.abs(i-cur)>1;root.__expNavLock=performance.now()+(jump?260:520);setActive(i);root.scrollTo({left:pages[i].offsetLeft-base,behavior:jump?"instant":"smooth"})});dotsWrap.appendChild(b);return b});const setActive=i=>{dots.forEach((d,idx)=>{const on=idx===i;d.classList.toggle("active",on);on?d.setAttribute("aria-current","true"):d.removeAttribute("aria-current")});root.__expIdx=i},mids=pages.map(p=>p.offsetLeft-base+p.clientWidth/2),sync=()=>{/* EXPIRITI_RC1R4_MOBILE_DOTS_OWNER: una sola fuente de verdad. Mientras dura una navegacion programada el scroll no repinta. */if(performance.now()<(root.__expNavLock||0))return;const x=(root.scrollLeft||0)+root.clientWidth/2;let best=0,bestDist=1/0;for(let i=0;i<mids.length;i++){const d=Math.abs(x-mids[i]);d<bestDist&&(bestDist=d,best=i)}setActive(best)};root.__svcPagerSync=sync;if(root.dataset.pagerBound!=="1"){root.dataset.pagerBound="1";let raf=0;root.addEventListener("scroll",()=>{raf&&cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{typeof root.__svcPagerSync=="function"&&root.__svcPagerSync()})},{passive:!0})}requestAnimationFrame(()=>requestAnimationFrame(sync))}

function initDiscreteGestures(){
  const hero=document.getElementById("heroGalleryCarousel"),promo=document.querySelector(".promo-modal-image-wrap");
  hero&&(hero.dataset.swipeOwner="gate3-discrete");
  promo&&(promo.dataset.swipeOwner="gate3-discrete");
  document.addEventListener("click",event=>{if(event.target.closest(".interest-system"))requestAnimationFrame(()=>normalizeCloudProductNames(document))},{passive:true});
}

function normalizeCloudProductNames(root=document){
  const names=new Map([["Contabiliza","Contabilidad Nube"],["Personia","Nóminas Nube"]]);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest("script,style,noscript")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>names.forEach((next,old)=>{node.nodeValue=node.nodeValue.replace(new RegExp(`\\b${old}\\b`,"g"),next)}));
  root.querySelectorAll("[alt],[title],[aria-label]").forEach(el=>["alt","title","aria-label"].forEach(attr=>{const value=el.getAttribute(attr);if(!value)return;let next=value;names.forEach((replacement,old)=>{next=next.replace(new RegExp(`\\b${old}\\b`,"g"),replacement)});next!==value&&el.setAttribute(attr,next)}));
}

/* 12) INIT principal */
on(window,"DOMContentLoaded",async()=>{await Promise.all([loadPartial("header-placeholder","global-header.html"),loadPartial("footer-placeholder","global-footer.html")]);normalizeRoutes(document);bindWheelOnTabs();initForms();initTabsProductos();initPromosFilter();initClickableCards();initTOC();initFooterObserver();initHeroGallery();["contable","comercial","nube","productividad","servicios"].forEach(initReelsCarousel);hydrateVisibleReelPosters();initReelsTabs();initYTLiteVideos();initFAQ();initPromoLightbox();initServicesPager();initDiscreteGestures();normalizeCloudProductNames();const yearSpan=document.getElementById("gf-year");yearSpan&&(yearSpan.textContent=new Date().getFullYear())});

/* 12.1) mapa: lazy load PSI */
(function(){"use strict";function addPreconnect(href){if(document.querySelector(`link[rel="preconnect"][href="${href}"]`))return;const l=document.createElement("link");l.rel="preconnect";l.href=href;l.crossOrigin="anonymous";document.head.appendChild(l)}function loadMap(root){if(!root||root.dataset.loaded==="1")return;root.dataset.loaded="1";addPreconnect("https://www.google.com");addPreconnect("https://www.google.com.mx");addPreconnect("https://maps.google.com");addPreconnect("https://maps.gstatic.com");const src=root.getAttribute("data-embed");if(!src)return;const iframe=document.createElement("iframe");iframe.src=src;iframe.loading="lazy";iframe.referrerPolicy="no-referrer-when-downgrade";iframe.allowFullscreen=!0;iframe.title="Mapa: ExpIRI Ti";iframe.setAttribute("aria-hidden","false");root.innerHTML="";root.appendChild(iframe)}function initLazyMap(){const root=document.getElementById("mapExpiriti");if(!root)return;if(root.dataset.mapBound==="1")return;root.dataset.mapBound="1";root.addEventListener("click",e=>{const cta=e.target.closest(".map-cover-cta");if(!cta)return;e.preventDefault();loadMap(root)});if("IntersectionObserver"in window){const io=new IntersectionObserver(entries=>{entries.forEach(ent=>{if(ent.isIntersecting){loadMap(root);io.disconnect()}})},{rootMargin:"200px 0px"});io.observe(root)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",initLazyMap,{once:!0}):initLazyMap()})();

/* 13) eventos globales */
on(window,"resize",()=>safe(initServicesPager));
on(window,"pageshow",()=>{safe(()=>normalizeRoutes(document));safe(bindWheelOnTabs);safe(initServicesPager)});
})(); /* END main IIFE */

/* =========================================================
 SplitBG — calcula splits para fondos por secciones
========================================================= */
(()=>{if(window.__EXPIRITI_SPLITBG__)return;window.__EXPIRITI_SPLITBG__=!0;const D=document,root=D.documentElement,px=n=>`${Math.max(0,Math.round(n))}px`,getTop=el=>{if(!el)return null;const r=el.getBoundingClientRect();return r.top+window.scrollY},getBottom=el=>{if(!el)return null;const r=el.getBoundingClientRect();return r.bottom+window.scrollY},getHeaderOffset=()=>{const gh=getComputedStyle(root).getPropertyValue("--gh-height").trim(),n=parseFloat(gh||"0");return Number.isFinite(n)?n:0},setSplits=()=>{const headerOffset=getHeaderOffset(),sistemas=D.getElementById("productos-con"),sectores=D.getElementById("sectores"),servicios=D.getElementById("servicios"),promos=D.getElementById("promociones"),s1=getTop(sistemas),s2=getBottom(sectores),s3=getBottom(servicios),s4=getTop(promos);s1!=null&&root.style.setProperty("--split-sistemas",px(s1-headerOffset));s2!=null&&root.style.setProperty("--split-sectores-end",px(s2-headerOffset));s3!=null&&root.style.setProperty("--split-servicios-end",px(s3-headerOffset));s4!=null&&root.style.setProperty("--split-promos",px(s4-headerOffset))},rafSet=()=>requestAnimationFrame(setSplits);D.readyState==="loading"?D.addEventListener("DOMContentLoaded",rafSet,{once:!0}):rafSet();window.addEventListener("load",rafSet,{once:!0});window.addEventListener("resize",rafSet);window.addEventListener("orientationchange",rafSet);document.fonts&&document.fonts.ready&&document.fonts.ready.then(rafSet).catch(()=>{});window.addEventListener("splitbg:update",rafSet)})();

/* =========================================================
 Patch — centrar tab activo (HERO + productos) sin duplicar
========================================================= */
(()=>{if(window.__IX_TAB_CENTER__)return;window.__IX_TAB_CENTER__=1;function centerInRail(el){const rail=el&&el.closest(".hero-gallery-groups");if(!rail)return;const max=Math.max(0,rail.scrollWidth-rail.clientWidth),left=Math.max(0,Math.min(max,el.offsetLeft-(rail.clientWidth-el.offsetWidth)/2));rail.scrollTo({left,behavior:"smooth"})}document.addEventListener("click",e=>{const t=e.target.closest(".hero-gallery-groups .hero-group-tab");t&&centerInRail(t)},{passive:!0})})();

/* =========================================================
 PATCH v2026.01.13 — SMART SWIPE + ARROWS MOBILE (INDEX)
========================================================= */
(()=>{"use strict";if(window.__EXPIRITI_SWIPE_PATCH__)return;window.__EXPIRITI_SWIPE_PATCH__=!0;const $$=(s,c=document)=>Array.from(c.querySelectorAll(s)),clamp=(v,min,max)=>Math.max(min,Math.min(max,v));function scrollByPage(t,d){const w=t.clientWidth||320;t.scrollBy({left:d*w,behavior:"smooth"})}function ensureArrows(c){const t=c.querySelector(".carousel-track"),p=c.querySelector(".arrowCircle.prev"),n=c.querySelector(".arrowCircle.next");if(!t||!p||!n)return;p.style.display="";n.style.display="";p.hidden=!1;n.hidden=!1;/* EXPIRITI_T25S_CAROUSEL_WRAP_OWNER: sin binding de flechas aqui. El owner unico de la navegacion por flechas es initReelsCarousel()/initHeroGallery(), que envuelven de forma infinita. Evita handlers duplicados. */const s=()=>{const m=Math.max(0,t.scrollWidth-t.clientWidth),x=t.scrollLeft;/* EXPIRITI_T25S_CAROUSEL_WRAP_OWNER: no se deshabilitan las flechas en los bordes (navegacion infinita). */const h=m>4;p.style.opacity=h?"":"0";n.style.opacity=h?"":"0";p.style.pointerEvents=h?"":"none";n.style.pointerEvents=h?"":"none"};t.__boundArrowSync||(t.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s,{passive:!0}),t.__boundArrowSync=!0,setTimeout(s,0))}function bindSmartSwipe(t){if(!t||t.__smartSwipeBound)return;t.__smartSwipeBound=!0;t.style.touchAction="pan-y";let d=!1,x0=0,y0=0,l0=0,i=0;const TH=10,R=1.15;function down(e){d=!0;i=0;x0=e.clientX;y0=e.clientY;l0=t.scrollLeft;try{t.setPointerCapture(e.pointerId)}catch(_){}}function move(e){if(!d)return;const dx=e.clientX-x0,dy=e.clientY-y0;if(i===0){if(Math.abs(dx)<TH&&Math.abs(dy)<TH)return;if(Math.abs(dx)>Math.abs(dy)*R)i=1;else{i=-1;return}}if(i===1){e.preventDefault();const m=Math.max(0,t.scrollWidth-t.clientWidth);t.scrollLeft=clamp(l0-dx,0,m)}}function up(e){d=!1;i=0;try{t.releasePointerCapture(e.pointerId)}catch(_){}}t.addEventListener("pointerdown",down,{passive:!0});t.addEventListener("pointermove",move,{passive:!1});t.addEventListener("pointerup",up,{passive:!0});t.addEventListener("pointercancel",up,{passive:!0})}$$(".carousel[id^='carouselReels-']").forEach(c=>{bindSmartSwipe(c.querySelector(".carousel-track"));ensureArrows(c)})})();

/* =========================================================
 Expiriti — INDEX FIX PACK (JS) v2026.01.21 Swipe real (pointer + touch fallback) Nunca bloquear scroll vertical salvo gesto horizontal claro
========================================================= */



/* =========================================================
 Expiriti — PATCH v2026.01.22 (JS)
 OBJ: “Kill-switch” de interceptores de swipe (pointer/touch) en tracks
      => el navegador maneja pan-y vs pan-x nativo (UX estándar)
 NOTA: esto evita la situación “no hace nada” en diagonales.
========================================================= */
(()=>{"use strict";if(window.__EXPIRITI_GESTURE_NATIVE__)return;window.__EXPIRITI_GESTURE_NATIVE__=1;
/* The hero gallery has an intentional axis-aware swipe owner above. Keep the
   legacy interceptor away from it so mobile pointer swipes reach that owner. */
const SEL=".page-index .carousel-track:not(#heroGalleryCarousel .carousel-track)";
function killInterceptors(el){
  if(!el||el.dataset.nativeGestures==="1")return;el.dataset.nativeGestures="1";
  const stop=e=>{try{e.stopImmediatePropagation()}catch(_){try{e.stopPropagation()}catch(__){}}};
  /* Captura: bloquea handlers anteriores (normalmente en burbuja) sin tocar el default scroll */
  ["pointerdown","pointermove","pointerup","pointercancel","touchstart","touchmove","touchend","touchcancel"].forEach(ev=>{
    el.addEventListener(ev,stop,{capture:true,passive:true});
  });
  /* Asegura que CSS no limite el gesto */
  el.style.touchAction="auto";
}
function init(){document.querySelectorAll(SEL).forEach(killInterceptors)}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init,{once:true}):init();
window.addEventListener("pageshow",init,{passive:true});
})();

/* R19_D3_2_HERO_CROSSFADE_OWNER_20260831
   Un solo owner para flechas, puntos y swipe discreto. Los inputs rápidos se
   consolidan en un destino determinista; nunca hay dos transiciones activas. */
(()=>{
  if(window.__R19_D3_2_HERO_CROSSFADE__)return;
  window.__R19_D3_2_HERO_CROSSFADE__=1;
  const D=document;
  const install=()=>{
    const carousel=D.getElementById("heroGalleryCarousel");
    const track=carousel&&carousel.querySelector(".carousel-track");
    if(!carousel||!track||carousel.__crossfadeBound)return;
    carousel.__crossfadeBound=1;
    carousel.dataset.transition="crossfade";
    carousel.__expNavLock=Number.POSITIVE_INFINITY;

    let settled=0;
    let desired=0;
    let running=false;
    let transitionTarget=0;
    let finishTimer=0;
    let finishListener=null;
    const reduced=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slides=()=>Array.from(track.querySelectorAll(".carousel-slide.hero-slide"));
    const dots=()=>Array.from(carousel.querySelectorAll(".carousel-nav .dot"));
    const wrap=(i,len)=>(i%len+len)%len;

    const paint=idx=>{
      slides().forEach((slide,i)=>{
        const active=i===idx;
        slide.classList.toggle("is-active",active);
        slide.setAttribute("aria-hidden",active?"false":"true");
      });
      dots().forEach((dot,i)=>{
        const active=i===idx;
        dot.classList.toggle("active",active);
        active?dot.setAttribute("aria-current","true"):dot.removeAttribute("aria-current");
      });
    };

    const clearFinish=()=>{
      clearTimeout(finishTimer);
      finishTimer=0;
      if(finishListener){track.removeEventListener("transitionend",finishListener);finishListener=null;}
    };

    const start=idx=>{
      const list=slides();
      if(!list.length)return;
      idx=wrap(idx,list.length);
      if(idx===settled&&!running){desired=idx;paint(idx);return;}
      if(running){desired=idx;return;}
      desired=idx;
      transitionTarget=idx;
      running=true;
      paint(idx);
      if(reduced()){
        settled=transitionTarget;
        running=false;
        return;
      }
      const finish=()=>{
        if(!running)return;
        clearFinish();
        settled=transitionTarget;
        running=false;
        if(desired!==settled)start(desired);
      };
      finishListener=e=>{
        if(e.propertyName==="opacity"&&e.target===list[transitionTarget])finish();
      };
      track.addEventListener("transitionend",finishListener);
      finishTimer=setTimeout(finish,340);
    };

    const reset=()=>{
      clearFinish();
      running=false;
      track.scrollLeft=0;
      carousel.__expNavLock=Number.POSITIVE_INFINITY;
      const list=slides();
      settled=Math.max(0,list.findIndex(slide=>slide.classList.contains("is-active")));
      desired=settled;
      transitionTarget=settled;
      paint(settled);
    };

    carousel.__heroGoTo=i=>start(i);
    carousel.__resetHeroSync=reset;
    new MutationObserver(()=>reset()).observe(track,{childList:true});
    carousel.addEventListener("click",e=>{
      const arrow=e.target.closest(".arrowCircle.prev,.arrowCircle.next");
      const dot=e.target.closest(".carousel-nav .dot");
      if(!arrow&&!dot)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if(dot){
        const idx=dots().indexOf(dot);
        if(idx>=0)start(idx);
        return;
      }
      const list=slides();
      if(!list.length)return;
      const visible=list.findIndex(slide=>slide.classList.contains("is-active"));
      const base=running?desired:Math.max(0,visible);
      start(base+(arrow.classList.contains("prev")?-1:1));
    },true);
    reset();
  };
  const boot=()=>setTimeout(install,0);
  D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
  window.addEventListener("pageshow",boot,{passive:true});
})();
(()=>{const boot=()=>{const root=document.querySelector("#interestUi"),sel=document.querySelector("#interes"),msg=document.querySelector("#interestCurrent"),form=document.querySelector("#contactForm");if(!root||!sel)return;const modeBtns=[...root.querySelectorAll(".interest-mode")],catBtns=[...root.querySelectorAll(".interest-cat")],modePanels=[...root.querySelectorAll("[data-mode-panel]")],sysGroups=[...root.querySelectorAll("[data-sysgroup]")],pickBtns=[...root.querySelectorAll(".interest-system,.interest-service")],setMode=m=>{root.dataset.mode=m;modeBtns.forEach(b=>{const on=b.dataset.mode===m;b.classList.toggle("is-active",on);b.setAttribute("aria-selected",on?"true":"false")});modePanels.forEach(p=>p.hidden=p.dataset.modePanel!==m)},setCat=c=>{root.dataset.syscat=c;catBtns.forEach(b=>{const on=b.dataset.syscat===c;b.classList.toggle("is-active",on);b.setAttribute("aria-selected",on?"true":"false")});sysGroups.forEach(g=>{const on=g.dataset.sysgroup===c;g.hidden=!on;g.classList.toggle("is-active",on)})},setValue=btn=>{pickBtns.forEach(b=>b.classList.remove("is-active"));btn.classList.add("is-active");sel.value=btn.dataset.value||"";msg.textContent=sel.value?`Seleccionado: ${sel.value}`:"Selecciona un sistema o servicio.";msg.classList.remove("is-error")};modeBtns.forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.mode)));catBtns.forEach(b=>b.addEventListener("click",()=>setCat(b.dataset.syscat)));pickBtns.forEach(b=>b.addEventListener("click",()=>setValue(b)));form&&form.addEventListener("submit",e=>{if(sel.value)return;e.preventDefault();msg.textContent="Selecciona un sistema o servicio para continuar.";msg.classList.add("is-error");root.scrollIntoView({behavior:"smooth",block:"center"})});setMode(root.dataset.mode||"sistemas");setCat(root.dataset.syscat||"contables")};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();

/* EXPIRITI GLOBAL HEADER FINAL BIND */
(()=>{if(window.__EXP_GH_FINAL_BIND__)return;window.__EXP_GH_FINAL_BIND__=1;const D=document,W=window,Q=(s,c=D)=>c.querySelector(s),QA=(s,c=D)=>[...c.querySelectorAll(s)],isGh=location.hostname.endsWith("github.io"),seg=(location.pathname.split("/")[1]||"").trim(),repoBase=isGh&&seg?"/"+seg:"",parts=location.pathname.replace(/\/+$/,"").split("/").filter(Boolean),contentParts=isGh?parts.slice(1):parts,depth=contentParts.length>1?"../".repeat(contentParts.length-1):"./",path=p=>{if(!p)return p;if(/^(https?:)?\/\//i.test(p)||/^(mailto:|tel:|data:)/i.test(p)||p.startsWith("#"))return p;if(isGh&&repoBase&&(p===repoBase||p.startsWith(repoBase+"/")))return p;if(p.startsWith("/"))return isGh?repoBase+p:p;return((isGh?repoBase+"/":depth)+p).replace(/([^:]\/)\/+/g,"$1")};function assets(root=D){QA(".js-img[data-src]",root).forEach(img=>{const raw=img.dataset.src;if(raw){const want=path(raw);if(img.getAttribute("src")!==want)img.setAttribute("src",want);img.style.opacity="1"}});QA(".js-link[data-href]",root).forEach(a=>{const raw=a.dataset.href;if(raw){const want=path(raw);if(a.getAttribute("href")!==want)a.setAttribute("href",want)}});QA('a[href^="/"]',root).forEach(a=>{const raw=a.getAttribute("href"),want=path(raw);if(raw!==want)a.setAttribute("href",want)});QA('img[src^="/"]',root).forEach(img=>{const raw=img.getAttribute("src"),want=path(raw);if(raw!==want)img.setAttribute("src",want)});D.body.classList.add("has-gh");const y=Q("#gf-year");y&&(y.textContent=new Date().getFullYear())}function drawer(open){const h=Q("#gh-header"),dr=Q("#gh-drawer"),dim=Q("#gh-dim"),bg=Q("#gh-burger");if(!h||!dr||!dim||!bg)return;if(open){dr.hidden=false;dim.hidden=false;requestAnimationFrame(()=>{D.documentElement.classList.add("gh-open");D.body.classList.add("gh-open");dr.setAttribute("aria-hidden","false");bg.setAttribute("aria-expanded","true");D.body.style.overflow="hidden";assets(dr)})}else{D.documentElement.classList.remove("gh-open");D.body.classList.remove("gh-open");dr.setAttribute("aria-hidden","true");bg.setAttribute("aria-expanded","false");D.body.style.overflow="";setTimeout(()=>{if(!D.documentElement.classList.contains("gh-open")){dr.hidden=true;dim.hidden=true}},220)}}function mobileSystems(cat){const root=Q("#gh-msys"),track=Q("#gh-sysswipe");if(!root||!track)return;const order=["contables","comerciales","nube","prod"],i=Math.max(0,order.indexOf(cat));QA(".gh-cat",root).forEach(b=>{const on=(b.dataset.cat||"")===cat;b.classList.toggle("is-active",on);b.setAttribute("aria-selected",on?"true":"false")});track.scrollTo({left:i*(track.clientWidth||1),behavior:"smooth"});QA(".gh-sysdots .dot",root).forEach((d,k)=>d.classList.toggle("is-active",k===i))}function mobileServices(dir=1){const tr=Q("#gh-msvc .gh-svctrack");if(!tr)return;tr.scrollBy({left:dir*(tr.clientWidth||1),behavior:"smooth"})}function bind(){const h=Q("#gh-header");if(!h)return;assets(h);assets(D);if(!D.__ghFinalClicks){D.__ghFinalClicks=1;D.addEventListener("click",e=>{const b=e.target.closest("#gh-burger");if(b){e.preventDefault();e.stopImmediatePropagation();drawer(!D.documentElement.classList.contains("gh-open"));return}const c=e.target.closest("#gh-close,#gh-dim");if(c){e.preventDefault();e.stopImmediatePropagation();drawer(false);return}const t=e.target.closest("#gh-theme");if(t){e.preventDefault();e.stopImmediatePropagation();const cur=D.documentElement.getAttribute("data-theme")||localStorage.getItem("expiriti_theme")||"light",next=cur==="light"?"dark":"light";D.documentElement.setAttribute("data-theme",next);localStorage.setItem("expiriti_theme",next);t.setAttribute("aria-pressed",next==="dark"?"true":"false");return}/* EXPIRITI_R5_BURGER_CONTROLS_DELEGATED_TO_GH_CANON */const link=e.target.closest("a.js-link[data-href]");if(link){const raw=link.dataset.href,want=path(raw);link.href=want;e.preventDefault();e.stopImmediatePropagation();if(link.closest("#gh-drawer"))drawer(false);if(e.metaKey||e.ctrlKey||link.target==="_blank")W.open(want,"_blank","noopener");else location.href=want;return}},true);D.addEventListener("keydown",e=>{if(e.key==="Escape")drawer(false)},{passive:true})}if(!D.__ghFinalHover){D.__ghFinalHover=1;QA("#gh-header .gh-dd-wrap").forEach(w=>{let tm=0;const open=()=>{if(W.matchMedia("(max-width:1023px)").matches)return;clearTimeout(tm);QA("#gh-header .gh-dd-wrap").forEach(x=>x!==w&&x.classList.remove("gh-open"));w.classList.add("gh-open")},close=()=>{clearTimeout(tm);tm=setTimeout(()=>w.classList.remove("gh-open"),160)};w.addEventListener("mouseenter",open);w.addEventListener("mouseleave",close)})}}const boot=()=>{bind();setTimeout(bind,120);setTimeout(bind,450)};D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:true}):boot();W.addEventListener("pageshow",boot,{passive:true})})();

/* EXPIRITI PROMO BANNER MENSUAL v2 (lee /data/promociones.json; falla en silencio)
   Aprobado 2026-07: arriba SOLO el mes (kicker); el CTA "Pide tu Promo" va DEBAJO del grid de imágenes. */
(()=>{if(window.__EXP_PROMO_BANNER__)return;window.__EXP_PROMO_BANNER__=1;
const boot=async()=>{const slot=document.getElementById("promoBannerSlot");if(!slot)return;
try{
  const url="/data/promociones.json?d="+(new Date).toISOString().slice(0,10);
  const r=await fetch(url,{cache:"no-cache"});if(!r.ok)return;
  const p=await r.json();if(!p||p.activo!==true)return;
  const hoy=(new Date).toISOString().slice(0,10);
  if(p.fechaInicio&&hoy<p.fechaInicio)return;
  if(p.fechaFin&&hoy>p.fechaFin)return;
  if(p.mes){const m=document.createElement("p");m.className="pb-mes";m.textContent=p.mes;slot.replaceChildren(m)}
  const grid=document.getElementById("promoGrid");
  if(grid&&p.ctaUrl&&!document.getElementById("promoCtaAfter")){
    const wrap=document.createElement("div");wrap.id="promoCtaAfter";wrap.style.cssText="display:flex;justify-content:center;margin-top:16px";
    const a=document.createElement("a");a.className="btn btn-grad-green";a.href=p.ctaUrl;a.textContent=p.ctaTexto||"Pide tu Promo";
    if(/^https?:/i.test(p.ctaUrl)){a.target="_blank";a.rel="noopener"}
    wrap.appendChild(a);grid.insertAdjacentElement("afterend",wrap);
  }
}catch(_){/* si el JSON falla, la página sigue normal */}};
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot,{once:true}):boot()})();

/* EXPIRITI_R5_BURGER_DUPLICATE_OWNER_REMOVED:
   mobile Sistemas/Servicios pager belongs exclusively to
   PARTIALS/global-header.html :: __EXPIRITI_GH_CANON__. */

/* EXPIRITI CONTACT ANCHOR OFFSET FIX */
(()=>{if(window.__EXP_CONTACT_ANCHOR_FIX__)return;window.__EXP_CONTACT_ANCHOR_FIX__=1;const go=()=>{const el=document.querySelector("#contacto");if(!el)return;const h=document.querySelector("#gh-header")?.getBoundingClientRect().height||68;const y=el.getBoundingClientRect().top+scrollY-h-10;scrollTo({top:Math.max(0,y),behavior:"smooth"})};document.addEventListener("click",e=>{const a=e.target.closest('a[href$="#contacto"],a[data-href$="#contacto"]');if(!a)return;const raw=a.getAttribute("href")||a.dataset.href||"";if(!raw.includes("#contacto"))return;if(location.pathname.endsWith("/")||location.pathname.endsWith("/index.html")||location.pathname==="/index.html"){e.preventDefault();e.stopImmediatePropagation();history.replaceState(null,"","#contacto");go()}},true);window.addEventListener("load",()=>{if(location.hash==="#contacto")setTimeout(go,80)},{once:true})})();

/* Axis-aware wheel: vertical-dominant diagonals stay on the page; horizontal input remains native. */

/* __EXP_T12AR4_FORM_OWNER__ */
(()=>{
  const mq=matchMedia("(max-width:780px)");

  const apply=()=>{

    document
      .querySelectorAll(
        "#contactForm .contact-top-grid"
      )
      .forEach(grid=>{

        grid.style.setProperty(
          "display",
          "grid",
          "important"
        );

        grid.style.setProperty(
          "grid-template-columns",
          mq.matches
            ?"minmax(0,1fr)"
            :"repeat(3,minmax(0,1fr))",
          "important"
        );

        grid.style.setProperty(
          "gap",
          "14px",
          "important"
        );

        grid.style.setProperty(
          "width",
          "100%",
          "important"
        );


        grid
          .querySelectorAll(
            ".contact-field"
          )
          .forEach(field=>{

            field.style.setProperty(
              "width",
              "auto",
              "important"
            );

            field.style.setProperty(
              "min-width",
              "0",
              "important"
            );

            field.style.setProperty(
              "max-width",
              "none",
              "important"
            );
          });


        ["#nombre","#correo","#telefono"]
          .forEach(sel=>{

            const input=
              grid.querySelector(sel);

            if(!input)return;

            input.style.setProperty(
              "display",
              "block",
              "important"
            );

            input.style.setProperty(
              "width",
              "100%",
              "important"
            );

            input.style.setProperty(
              "min-width",
              "0",
              "important"
            );

            input.style.setProperty(
              "max-width",
              "none",
              "important"
            );

            input.style.setProperty(
              "box-sizing",
              "border-box",
              "important"
            );
          });
      });
  };


  const boot=()=>{

    apply();

    if(mq.addEventListener){
      mq.addEventListener(
        "change",
        apply
      );
    }else if(mq.addListener){
      mq.addListener(apply);
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
/* END___EXP_T12AR4_FORM_OWNER__ */

/* __EXP_T12AR4_DARK_OWNER__ */
(()=>{
  const id=
    "exp-t12ar4-dark";

  if(
    document.getElementById(id)
  )return;

  const s=
    document.createElement(
      "style"
    );

  s.id=id;

  s.textContent=`
    html[data-theme="dark"]
    .hero .hero-piece.gradient-word,
    html[data-theme="dark"]
    .hero .hero-piece.gradient-word .hero-lock{
      color:#fff!important;
      -webkit-text-fill-color:#fff!important;
      background-image:none!important;
    }
  `;

  document.head.appendChild(s);
})();
/* END___EXP_T12AR4_DARK_OWNER__ */
/* EXPIRITI_PAGE_NAV_RAIL loader: T23 release candidate. */
(()=>{if(!document.querySelector('script[data-exp-page-nav-rail-loader]')){const s=document.createElement('script');s.src='/EXPIRITI_PAGE_NAV_RAIL.js';s.defer=true;s.dataset.expPageNavRailLoader='1';document.head.appendChild(s)}})();


/* EXPIRITI_T24_INDEX_FORM_OWNER_START
 * Owner T24 del formulario de contacto (index).
 * 3B) Altura estable del panel al cambiar Sistemas/Servicios.
 * 3C) Teléfono: solo dígitos, base México de 10 dígitos, inputmode numérico.
 * 3D) Microcontrol WhatsApp ARRIBA del teléfono al completar 10 dígitos.
 * 3E) Dígito 11 -> no se concatena; se ofrece extensión separada.
 *     Pegado >10: se conservan los primeros 10 como base y el sobrante
 *     queda SOLO como candidato de extensión, previa confirmación.
 * No cambia el payload existente: "telefono" sigue siendo el número base.
 * Campos nuevos: "wa_opt" y "telefono_ext".
 */
(()=>{
  "use strict";

  const boot=()=>{

    const form=document.querySelector("#contactForm");
    if(!form || form.dataset.expT24Form==="1") return;
    form.dataset.expT24Form="1";

    /* ---------- 3B) altura estable del panel ---------- */

    const ui=document.querySelector("#interestUi");

    const stabilize=()=>{

      if(!ui) return;

      const panels=[...ui.querySelectorAll("[data-mode-panel]")];
      if(panels.length<2) return;

      let max=0;

      panels.forEach(panel=>{

        const wasHidden=panel.hidden;

        if(wasHidden){
          panel.style.position="absolute";
          panel.style.visibility="hidden";
          panel.style.left="-99999px";
          panel.hidden=false;
        }

        max=Math.max(max,panel.getBoundingClientRect().height);

        if(wasHidden){
          panel.hidden=true;
          panel.style.position="";
          panel.style.visibility="";
          panel.style.left="";
        }
      });

      if(max>0){
        ui.style.setProperty("--exp-t24-panel-h",Math.ceil(max)+"px");
        panels.forEach(p=>{p.style.minHeight=Math.ceil(max)+"px";});
      }
    };

    let stabTimer=0;
    const requestStabilize=()=>{
      window.clearTimeout(stabTimer);
      stabTimer=window.setTimeout(stabilize,120);
    };

    stabilize();
    window.addEventListener("resize",requestStabilize,{passive:true});
    window.addEventListener("load",requestStabilize);

    /* ---------- 3C/3D/3E) teléfono ---------- */

    const tel=form.querySelector("#telefono");
    if(!tel) return;

    const micro=form.querySelector("#phoneMicro");
    const waWrap=form.querySelector("#waOptWrap");
    const waOpt=form.querySelector("#waOpt");
    const extWrap=form.querySelector("#extOptWrap");
    const extOpt=form.querySelector("#extOpt");
    const extInput=form.querySelector("#telefonoExt");
    const icoLabel=form.querySelector(".contact-icons-duo");
    const icoPhone=icoLabel?icoLabel.querySelector("svg.contact-ico"):null;
    const icoSep=icoLabel?icoLabel.querySelector(".contact-ico-sep"):null;
    const icoWa=icoLabel?icoLabel.querySelector(".contact-ico-wa"):null;

    const MAX=10;
    let extCandidate="";

    const digits=value=>String(value||"").replace(/\D+/g,"");

    const format=raw=>{
      const d=digits(raw).slice(0,MAX);
      if(d.length<=2) return d;
      if(d.length<=6) return d.slice(0,2)+" "+d.slice(2);
      return d.slice(0,2)+" "+d.slice(2,6)+" "+d.slice(6);
    };

    const syncIcons=()=>{

      if(!icoLabel) return;

      icoLabel.classList.add("is-single-ico");

      const wa=!!(waOpt && waOpt.checked);

      if(icoPhone) icoPhone.hidden=wa;
      if(icoSep) icoSep.hidden=true;
      if(icoWa) icoWa.hidden=!wa;
    };

    const syncMicro=()=>{

      const d=digits(tel.value);
      const complete=d.length===MAX;

      if(waWrap){
        waWrap.hidden=!complete;
        if(!complete && waOpt) waOpt.checked=false;
      }

      if(extWrap){
        const offer=complete && (extCandidate!=="" || extOpt?.checked || extWrap.dataset.expOffer==="1");
        extWrap.hidden=!offer;
        if(!offer && extOpt) extOpt.checked=false;
      }

      if(extInput){
        const show=!!(extOpt && extOpt.checked);
        extInput.hidden=!show;
        if(!show) extInput.value="";
      }

      if(micro) micro.hidden=false;

      syncIcons();
    };

    const offerExtension=candidate=>{
      extCandidate=digits(candidate).slice(0,6);
      if(extWrap) extWrap.dataset.expOffer="1";
      syncMicro();
    };

    tel.setAttribute("inputmode","numeric");
    tel.setAttribute("autocomplete","tel");

    tel.addEventListener("beforeinput",event=>{

      if(event.inputType && event.inputType.indexOf("insert")!==0) return;

      const incoming=digits(event.data||"");
      if(!incoming) return;

      const current=digits(tel.value);

      if(current.length>=MAX){
        event.preventDefault();
        offerExtension(incoming);
      }
    });

    tel.addEventListener("paste",event=>{

      const text=(event.clipboardData||window.clipboardData);
      if(!text) return;

      const raw=digits(text.getData("text"));
      if(raw.length<=MAX) return;

      event.preventDefault();
      tel.value=format(raw.slice(0,MAX));
      offerExtension(raw.slice(MAX));
    });

    tel.addEventListener("input",()=>{
      const before=tel.value;
      const after=format(before);
      if(before!==after) tel.value=after;
      syncMicro();
    });

    tel.addEventListener("blur",()=>{
      tel.value=format(tel.value);
      syncMicro();
    });

    if(waOpt) waOpt.addEventListener("change",syncMicro);

    if(extOpt) extOpt.addEventListener("change",()=>{
      if(extOpt.checked && extInput && extCandidate){
        extInput.value=extCandidate;
      }
      syncMicro();
      if(extOpt.checked && extInput) extInput.focus();
    });

    if(extInput) extInput.addEventListener("input",()=>{
      const d=digits(extInput.value).slice(0,6);
      if(extInput.value!==d) extInput.value=d;
    });

    form.addEventListener("submit",()=>{
      tel.value=format(tel.value);
    },true);

    syncMicro();
  };

  document.readyState==="loading"
    ? document.addEventListener("DOMContentLoaded",boot,{once:true})
    : boot();

})();

/* EXPIRITI_T24_INDEX_FORM_OWNER_END */


/* EXPIRITI_RC1R4_EDGE_SWIPE_WRAP_OWNER_START
 * Addendum R4 — swipe infinito en los sliders mobile.
 *
 * NO es un motor nuevo: solo DETECTA el swipe que ocurre cuando la pista ya
 * esta en un extremo (el scroll nativo no puede ir mas alla) y delega el
 * cambio en el control ya aprobado de ese carrusel — la flecha si existe, o
 * el dot correspondiente. Todo el estado (slide visible, dot unico, wrap
 * instantaneo) lo sigue calculando el owner existente: aqui no se duplica
 * ningun handler de flechas, dots ni scroll.
 *
 * Los listeners van en DOCUMENT y en fase de CAPTURA porque el owner
 * __EXPIRITI_GESTURE_NATIVE__ hace stopImmediatePropagation() de los eventos
 * tactiles sobre .carousel-track; en captura desde document se recibe el
 * evento antes de que esa barrera actue. Un unico juego de listeners para
 * toda la pagina => imposible duplicarlos.
 *
 * Son passive y nunca llaman preventDefault: el scroll vertical no se toca.
 * Solo se actua si el gesto es claramente horizontal y la pista no pudo
 * avanzar (ya estaba topada contra el extremo).
 */
(()=>{
  "use strict";
  if(window.__EXP_EDGE_SWIPE_WRAP__)return;window.__EXP_EDGE_SWIPE_WRAP__=1;

  const SEL=[
    '.carousel[id^="carouselReels"] .carousel-track'
    /* #servicesCarousel movido a bindDiscreteSwipe (R19_GATE3_DISCRETE_SWIPE): evita doble owner */
  ].join(",");

  const MIN_DX=40;      /* recorrido minimo para considerarlo swipe        */
  const H_RATIO=1.2;    /* dominancia horizontal frente a la vertical      */
  const EDGE=6;         /* tolerancia en px para considerar "en el borde"  */
  const STUCK=10;       /* si la pista casi no se movio, estaba topada     */

  const dotsFor=(track,carousel)=>{
    if(track.id==="servicesCarousel"){
      const w=document.getElementById("servicesDots");
      return w?[...w.querySelectorAll(".dot")]:[];
    }
    const nav=carousel&&carousel.querySelector(".carousel-nav");
    return nav?[...nav.querySelectorAll(".dot")]:[];
  };

  const wrapTo=(track,dir)=>{
    const carousel=track.closest(".carousel");
    const arrow=carousel&&carousel.querySelector(dir>0?".arrowCircle.next":".arrowCircle.prev");
    if(arrow&&getComputedStyle(arrow).display!=="none"){arrow.click();return}
    const dots=dotsFor(track,carousel);
    if(dots.length>1)(dir>0?dots[0]:dots[dots.length-1]).click();
  };

  let track=null,x0=0,y0=0,left0=0;

  document.addEventListener("touchstart",e=>{
    track=null;
    const t=e.touches&&e.touches[0];if(!t)return;
    const el=e.target&&e.target.closest?e.target.closest(SEL):null;
    if(!el)return;
    track=el;x0=t.clientX;y0=t.clientY;left0=el.scrollLeft;
  },{passive:true,capture:true});

  document.addEventListener("touchend",e=>{
    const el=track;track=null;
    if(!el||!el.isConnected)return;
    const t=e.changedTouches&&e.changedTouches[0];if(!t)return;
    const dx=t.clientX-x0,dy=t.clientY-y0;
    if(Math.abs(dx)<MIN_DX)return;
    if(Math.abs(dx)<Math.abs(dy)*H_RATIO)return;      /* gesto vertical: no tocar */
    const max=Math.max(0,el.scrollWidth-el.clientWidth);
    if(max<=0)return;
    const moved=Math.abs(el.scrollLeft-left0);
    if(moved>STUCK)return;                             /* si avanzo, ya cambio de slide */

    /* Que sea "el ultimo" lo decide el dot activo, que es la unica fuente de
       verdad del motor; la posicion de scroll es solo el respaldo, porque la
       ultima pagina puede ser mas estrecha y no llegar nunca a scrollLeft=max. */
    const dots=dotsFor(el,el.closest(".carousel"));
    const idx=dots.length?dots.findIndex(d=>d.classList.contains("active")):-1;
    const atEnd  = idx>=0 ? idx===dots.length-1 : el.scrollLeft>=max-EDGE;
    const atStart= idx>=0 ? idx===0             : el.scrollLeft<=EDGE;

    if(dx<0&&atEnd)wrapTo(el,1);                       /* ultimo + izquierda -> primero */
    else if(dx>0&&atStart)wrapTo(el,-1);               /* primero + derecha  -> ultimo  */
  },{passive:true,capture:true});

  document.addEventListener("touchcancel",()=>{track=null},{passive:true,capture:true});
})();
/* EXPIRITI_RC1R4_EDGE_SWIPE_WRAP_OWNER_END */


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
/* Hero gesture is owned by the single Gate 3 discrete gesture controller. */
/* R19 CONTACT CATEGORY RAIL — SELECTED PILL REVEAL */
(()=>{
  if(window.__R19_CONTACT_CAT_REVEAL__)return;
  window.__R19_CONTACT_CAT_REVEAL__=1;

  document.addEventListener(
    "click",
    event=>{
      const btn=
        event.target.closest(
          "#contactForm .interest-cats .interest-cat"
        );

      if(!btn)return;

      requestAnimationFrame(()=>{
        const rail=btn.closest(".interest-cats");

        if(
          !rail ||
          rail.scrollWidth<=rail.clientWidth+2
        ) return;

        const max=Math.max(
          0,
          rail.scrollWidth-rail.clientWidth
        );

        const target=Math.max(
          0,
          Math.min(
            max,
            btn.offsetLeft-
            (rail.clientWidth-btn.offsetWidth)/2
          )
        );

        rail.scrollTo({
          left:target,
          behavior:"smooth"
        });
      });
    },
    {passive:true}
  );
})();



/* R19_GATE3_DISCRETE_SWIPE_HELPER_20260827 (Opción 2 — gesto JS por flechas/dots)
   UN único owner por root. Navegación primaria = flechas/dots existentes.
   Swipe horizontal ADICIONAL, ±1 exacto, SIN follow visual:
     touch    -> touchstart/touchend (touch-action:pan-y; vertical nativo intacto)
     mouse    -> pointer-drag discreto (down->umbral->up->±1)
     trackpad -> wheel horizontal (deltaX dominante, cooldown, ±1 por burst)
   Reemplaza al owner pointer-only anterior (forzaba pan-y y rompía el scroll
   nativo sin fallback y no atendía wheel). Sin owners nuevos. */
(()=>{
  if(window.__R19_GATE3_DISCRETE_SWIPE__)return;
  window.__R19_GATE3_DISCRETE_SWIPE__=1;

  const D=document;

  function bindDiscreteSwipe({root,onPrev,onNext,isActive}){
    if(!root||root.__discreteSwipeBound)return;
    root.__discreteSwipeBound=1;
    const active=()=>!isActive||!!isActive();
    /* 1 paso por gesto lo garantizan los guards por-entrada (touch: tOn; mouse: mId;
       wheel: re-armado por flick). SIN lock temporal: el lock de 480ms bloqueaba el
       segundo swipe consecutivo y el owner tenía que tocar para "esperar" a que expirara. */
    const step=dir=>{const fn=dir<0?onPrev:onNext;if(typeof fn==="function")fn();};
    const TH=18,R=1.1,WHEEL_TH=34;
    /* touch-action:pan-y persistente (inline !important vence CSS auto!important):
       horizontal -> gesto JS ±1 ; vertical -> scroll nativo intacto. */
    try{root.style.setProperty("touch-action","pan-y","important");}catch(_){}
    /* Suprime SOLO el click accidental posterior a un swipe/drag real dentro del root.
       (Los taps sin desplazamiento y los enlaces conservan su click normal.) */
    let suppressNextClick=false,suppressTimer=0;
    const armSuppress=()=>{suppressNextClick=true;clearTimeout(suppressTimer);suppressTimer=setTimeout(()=>{suppressNextClick=false;},600);};
    root.addEventListener("click",e=>{
      if(suppressNextClick){suppressNextClick=false;clearTimeout(suppressTimer);e.stopPropagation();} /* one-shot; sin preventDefault (evita quirks) */
    },{capture:true});
    /* ---- TOUCH (móvil): start/move/end; SENSIBLE (usa el desplazamiento horizontal
       MÁXIMO del gesto, no sólo el punto final => un flick corto ya activa) ; ±1 exacto ---- */
    let tX=0,tY=0,tOn=false,tPeakX=0;
    root.addEventListener("touchstart",e=>{
      if(!active()||!e.touches||e.touches.length!==1){tOn=false;return;}
      const t=e.touches[0];tX=t.clientX;tY=t.clientY;tPeakX=0;tOn=true;
    },{passive:true});
    root.addEventListener("touchmove",e=>{
      if(!tOn||!e.touches||!e.touches[0])return;
      const dx=e.touches[0].clientX-tX;
      if(Math.abs(dx)>Math.abs(tPeakX))tPeakX=dx;   /* pico horizontal del flick */
    },{passive:true});
    root.addEventListener("touchend",e=>{
      if(!tOn)return;tOn=false;
      const t=e.changedTouches&&e.changedTouches[0];if(!t)return;
      const dxEnd=t.clientX-tX,dy=t.clientY-tY;
      const dx=Math.abs(tPeakX)>=Math.abs(dxEnd)?tPeakX:dxEnd;  /* mayor desplazamiento del gesto */
      if(Math.abs(dx)<TH||Math.abs(dx)<Math.abs(dy)*R)return;   /* vertical/tap: intacto */
      armSuppress();step(dx<0?1:-1);                            /* izq->next(+1), der->prev(-1) */
    },{passive:true});
    root.addEventListener("touchcancel",()=>{tOn=false;},{passive:true});
    /* ---- MOUSE (desktop): pointer-drag discreto, sin follow visual ---- */
    let mId=null,mX=0,mY=0;
    root.addEventListener("pointerdown",e=>{
      if(e.pointerType!=="mouse"||e.button!==0||!active())return;
      mId=e.pointerId;mX=e.clientX;mY=e.clientY;
    },{passive:true});
    root.addEventListener("pointerup",e=>{
      if(mId===null||e.pointerId!==mId)return;mId=null;
      const dx=e.clientX-mX,dy=e.clientY-mY;
      if(Math.abs(dx)<TH||Math.abs(dx)<Math.abs(dy)*R)return;
      armSuppress();step(dx<0?1:-1);
    },{passive:true});
    root.addEventListener("pointercancel",e=>{if(e.pointerId===mId)mId=null;},{passive:true});
    /* neutraliza el arrastre nativo de <img>/enlaces SOLO dentro de este root (sin ghost/follow) */
    root.addEventListener("dragstart",e=>{e.preventDefault();},{passive:false});
    /* ---- TRACKPAD: 1 paso por flick, PERMITIENDO flicks consecutivos.
       El momentum decae de forma monótona (nunca acelera) y mantenía "wheelLast" fresco,
       así que el hueco de tiempo nunca ocurría y el 2º swipe quedaba bloqueado hasta un tap.
       Ahora se re-arma sólo por (a) settle |deltaX|<6, o (b) flanco de subida de un flick
       NUEVO (>250ms tras el último paso). El momentum, al sólo decaer, no re-arma. ---- */
    let wheelArmed=true,wheelPrevAbs=0,acc=0,wheelLast=0,wheelLastStep=0;
    root.addEventListener("wheel",e=>{
      if(!active())return;
      if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;      /* vertical: no tocar */
      e.preventDefault();                                    /* horizontal ya clasificado */
      const now=performance.now(),a=Math.abs(e.deltaX);
      if(now-wheelLast>200){acc=0;wheelArmed=true;wheelPrevAbs=0;}            /* hueco real => nuevo gesto */
      wheelLast=now;
      if(a<6){wheelArmed=true;acc=0;}                                        /* settle/cola => re-arma */
      else if(a>wheelPrevAbs+4&&now-wheelLastStep>250){wheelArmed=true;acc=0;} /* flick NUEVO (flanco), no momentum */
      wheelPrevAbs=a;
      if(!wheelArmed)return;                                                 /* ya avanzó en este flick */
      acc+=e.deltaX;
      if(Math.abs(acc)>=WHEEL_TH){wheelArmed=false;wheelLastStep=now;acc=0;step(e.deltaX<0?-1:1);} /* +X->next, -X->prev */
    },{passive:false});
  }

  /* Smoke humano del owner: HERO/SERVICIOS en modo scroll NATIVO = FAIL; PROMO con
     gesto JS = OK. Causa raíz: el scroll horizontal nativo NO se activa de forma fiable
     en el entorno del owner. Por eso los TRES usan el MISMO gesto JS discreto.
     touch-action:pan-y (inline) suprime el pan horizontal nativo => nunca hay doble
     avance; el scroll vertical de la página queda intacto. */
  function bindHero(){
    const track=D.querySelector("#heroGalleryCarousel .carousel-track");
    if(!track)return;
    const carousel=track.closest("#heroGalleryCarousel");
    bindDiscreteSwipe({
      root:track,
      onPrev:()=>{const b=carousel&&carousel.querySelector(".arrowCircle.prev");b&&b.click();},
      onNext:()=>{const b=carousel&&carousel.querySelector(".arrowCircle.next");b&&b.click();}
    });
  }

  /* PROMO MODAL: wrapper estable; controles data-promo-prev/next existentes. */
  function bindPromo(){
    const wrap=D.querySelector(".promo-modal-image-wrap");
    if(!wrap)return;
    bindDiscreteSwipe({
      root:wrap,
      onPrev:()=>{const b=D.querySelector("[data-promo-prev]");b&&b.click();},
      onNext:()=>{const b=D.querySelector("[data-promo-next]");b&&b.click();}
    });
  }

  /* SERVICIOS COMPLEMENTARIOS: #servicesCarousel; nav = dots de initServicesPager.
     Sólo activo en modo carrusel (>=2 dots, es decir <=980px); en desktop-grid inactivo. */
  function svcDots(){const w=D.getElementById("servicesDots");return w?[...w.querySelectorAll(".dot")]:[];}
  function svcGo(dir){
    const dots=svcDots();if(dots.length<2)return;
    let cur=dots.findIndex(d=>d.classList.contains("active"));if(cur<0)cur=0;
    const t=cur+dir;if(t<0||t>=dots.length)return;
    dots[t].click();
  }
  function bindComplementary(){
    const root=D.getElementById("servicesCarousel");
    if(!root)return;
    bindDiscreteSwipe({
      root,
      onPrev:()=>svcGo(-1),
      onNext:()=>svcGo(1),
      isActive:()=>svcDots().length>=2
    });
  }

  const boot=()=>{bindHero();bindPromo();bindComplementary();};
  D.readyState==="loading"?D.addEventListener("DOMContentLoaded",boot,{once:true}):boot();
  window.addEventListener("pageshow",boot,{passive:true});
})();
