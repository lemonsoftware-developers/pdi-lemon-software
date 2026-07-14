/* ============================================================
   SIGEP · Tour guiado / onboarding (el WOW)
   Depende de app.js (crest, ico). Se carga en todas las páginas.
   ============================================================ */
(function () {
  "use strict";
  var I = window.ico || function(){return '';};
  var crest = window.crest || function(){return '';};

  var STEPS = [
    { sel:'[data-tour="stats"]', eye:'Cuadro de mando',
      title:'Una sola verdad para la Dirección',
      why:'La Dirección debe decidir con datos en tiempo real, no con planillas sueltas.',
      problem:'Hoy la información vive en silos: un sistema para finanzas, otro para personal, Excel para el armamento.',
      flow:'KPIs cruzados Finanzas · Logística · Personas → clic en cualquiera para bajar al detalle.' },
    { sel:'[data-grp="personas"]', eye:'Personas',
      title:'La gente, con carrera y estatuto propios',
      why:'Una policía se administra distinto: escalafón, grados y previsión DIPRECA (no AFP).',
      problem:'Una nómina civil genérica no sirve, y falta el ciclo de vida completo (ingreso → ascenso → sumario → egreso).',
      flow:'Funcionario → sus activos en custodia → ciclo de vida → egreso, todo trazado en SIAPER.' },
    { sel:'[data-tour="traza"]', eye:'El diferenciador',
      title:'¿Quién tiene qué arma, y quién responde?',
      why:'En una policía el activo crítico está en manos de personas: armas, munición, EPP, credenciales.',
      problem:'Un ERP contable lo trata como “activo fijo” despersonalizado — no sabe quién lo custodia hoy.',
      flow:'Cadena de custodia por funcionario · pañol con lector · extravío → incidente automático.' },
    { sel:'[data-grp="logisticayactivos"]', eye:'Logística y activos',
      title:'Comprar en el Estado, de punta a punta',
      why:'Cada compra pública es un flujo largo y auditado por Contraloría.',
      problem:'Procesos desconectados de Mercado Público y SIGFE generan retrabajo y hallazgos.',
      flow:'Requerimiento → OC ChileCompra → recepción → devengo SIGFE → pago TGR, en una sola línea.' },
    { sel:'[data-grp="finanzas"]', eye:'Finanzas',
      title:'Rendir al Estado sin dolor',
      why:'La PDI rinde a DIPRES y Contraloría; su contabilidad es gubernamental.',
      problem:'La homologación a SIGFE hecha a mano es lenta y propensa a error.',
      flow:'Ejecución presupuestaria homologada a SIGFE 2.0 · cierre y rendición trazados.' },
    { sel:'[data-grp="seguridadycontrol"]', eye:'Operador de Importancia Vital',
      title:'Secreto por diseño, no por sello',
      why:'La PDI maneja información secreta y es OIV bajo la Ley 21.663.',
      problem:'Hay que cumplir ANCI (incidentes 3 h / 72 h / 30 d), clasificar la información y probar cada acceso.',
      flow:'Clasificación público/reservado/secreto · audit-trail inmutable · incidentes ANCI · ClaveÚnica + MFA.' },
    { sel:'[data-tour="integra"]', eye:'Interoperabilidad',
      title:'El ERP no vive aislado',
      why:'Operar legalmente exige una decena de integraciones estatales obligatorias.',
      problem:'Cada una parchada por separado es frágil e inauditable.',
      flow:'Un bus único: SIGFE · ChileCompra · SII · DGMN · SIAPER · TGR · DIPRECA · ClaveÚnica.' },
    { sel:'[data-grp="plataforma"]', eye:'Plataforma',
      title:'Que sea soberano y que no fracase',
      why:'La soberanía real y la adopción son lo que hace —o quiebra— un proyecto ERP de Estado.',
      problem:'Lock-in del proveedor, migración de sistemas legados y resistencia al cambio.',
      flow:'Nube soberana en Chile (llaves propias) · datos maestros · migración por olas · gestión del cambio.' },
    { final:true, eye:'El momento clave',
      title:'Míralo funcionar de verdad',
      body:'Todo esto se conecta. Cuando <b>suspendes a un funcionario</b>, el sistema retira su arma, bloquea su credencial, revoca sus accesos y abre un incidente — <b>automáticamente y trazado</b>. Eso es entender cómo opera una policía.',
      ctas:[ {t:'Ver el caso borde en vivo', href:'funcionario-detalle.html', pri:true}, {t:'Ver el manual completo', href:'guia.html'} ] }
  ];

  var i = 0, root, spot, card, skip;

  function el(tag, cls, html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }

  function welcome(){
    var old = document.getElementById('tour-welcome'); if (old) old.remove(); // dedupe
    if (root) end();
    var w = el('div','tour-welcome on');
    w.id = 'tour-welcome';
    w.innerHTML =
      '<div class="tw-card">'+
        '<div class="tw-crest"><img src="assets/pdi-logo.png" alt="Policía de Investigaciones de Chile" style="height:82px;width:auto"></div>'+
        '<div class="tw-eye">Sistema de Gestión Institucional · PDI</div>'+
        '<h2>No es un ERP más.<br>Es el sistema que <span>entiende cómo opera una policía</span>.</h2>'+
        '<p>Finanzas, logística y personas en una sola verdad — con la trazabilidad de cada arma, cada credencial y cada acceso, y conectado al Estado. Te muestro en 2 minutos por qué existe cada módulo.</p>'+
        '<div class="tw-pillars">'+
          '<div class="tw-pill">'+I('grid')+'<strong>Visión unificada</strong><span>Finanzas + Logística + Personas en un solo cuadro de mando.</span></div>'+
          '<div class="tw-pill">'+I('gun')+'<strong>Trazabilidad real</strong><span>Quién tiene qué arma, desde cuándo y quién responde.</span></div>'+
          '<div class="tw-pill">'+I('shield')+'<strong>Soberano y seguro</strong><span>Datos en Chile y cumplimiento OIV (Ley 21.663) por diseño.</span></div>'+
        '</div>'+
        '<div class="tw-actions">'+
          '<button class="btn btn--gold" id="tw-start">Iniciar recorrido guiado</button>'+
          '<button class="btn btn--ghost" id="tw-skip">Explorar por mi cuenta</button>'+
        '</div>'+
      '</div>';
    document.body.appendChild(w);
    function dismiss(){ document.removeEventListener('keydown', onEsc, true); w.remove(); seen(); }
    function onEsc(e){ if(e.key==='Escape'){ e.preventDefault(); dismiss(); } }
    document.addEventListener('keydown', onEsc, true);
    w.addEventListener('click', function(e){ if(e.target === w) dismiss(); });   // tap en el fondo cierra
    w.querySelector('#tw-start').addEventListener('click', function(){ document.removeEventListener('keydown', onEsc, true); w.remove(); start(); });
    w.querySelector('#tw-skip').addEventListener('click', dismiss);
  }

  function next(){ if(i<STEPS.length-1){i++;render();} else end(); }
  function prev(){ if(i>0){i--;render();} }
  function onKey(e){
    if(!root) return;
    if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='Enter'||e.key===' '){ e.preventDefault(); next(); }
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){ e.preventDefault(); prev(); }
    else if(e.key==='Escape'){ e.preventDefault(); end(); }
  }

  function start(){
    i = 0;
    root = el('div','tour-root on');
    spot = el('div','tour-spot');
    card = el('div','tour-card');
    root.appendChild(spot); root.appendChild(card);
    document.body.appendChild(root);
    skip = el('button','tour-skip','Saltar recorrido ✕ (Esc)');
    skip.onclick = end;
    document.body.appendChild(skip);
    window.addEventListener('keydown', onKey, true);
    render();
  }

  function render(){
    var s = STEPS[i];
    var dots = STEPS.map(function(_,k){ return '<i class="'+(k===i?'on':'')+'"></i>'; }).join('');
    var body;
    if (s.final){
      body = '<div class="tour-card__h"><div class="tour-card__eye">'+I('check')+s.eye+'</div><h4>'+s.title+'</h4></div>'+
        '<div class="tour-card__b"><p>'+s.body+'</p><div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">'+
        s.ctas.map(function(c){ return '<a class="btn '+(c.pri?'btn--pri':'btn--ghost')+' btn--sm" href="'+c.href+'">'+c.t+'</a>'; }).join('')+'</div></div>';
    } else {
      body = '<div class="tour-card__h"><div class="tour-card__eye"><span class="n">'+(i+1)+'/'+(STEPS.length)+'</span>'+s.eye+'</div><h4>'+s.title+'</h4></div>'+
        '<div class="tour-card__b">'+
          '<span class="lbl">Por qué existe</span><p>'+s.why+'</p>'+
          '<span class="lbl">Qué problema resuelve</span><p>'+s.problem+'</p>'+
          '<span class="lbl">El flujo</span><div class="flow">'+s.flow+'</div>'+
        '</div>';
    }
    var foot = '<div class="tour-card__f"><div class="tour-dots">'+dots+'</div>'+
      '<span style="font-size:11px;color:var(--tx-faint);margin-right:8px">usa ← → </span>'+
      (i>0?'<button class="btn btn--ghost btn--sm" id="t-prev">Atrás</button>':'')+
      '<button class="btn btn--pri btn--sm" id="t-next">'+(i===STEPS.length-1?'Terminar':'Siguiente')+'</button></div>';
    card.innerHTML = body + foot;
    document.getElementById('t-next').onclick = next;
    var p=document.getElementById('t-prev'); if(p) p.onclick=prev;
    card.setAttribute('tabindex','-1');
    try{ card.focus({preventScroll:true}); }catch(e){ card.focus(); }
    place(s);
  }

  function place(s){
    if (s.final || !document.querySelector(s.sel)){
      spot.style.opacity='0';
      card.style.top='50%'; card.style.left='50%'; card.style.transform='translate(-50%,-50%)';
      return;
    }
    spot.style.opacity='1';
    var t = document.querySelector(s.sel);
    t.scrollIntoView({block:'center', behavior:'smooth'});
    setTimeout(function(){
      var r = t.getBoundingClientRect(), pad=8;
      spot.style.top=(r.top-pad)+'px'; spot.style.left=(r.left-pad)+'px';
      spot.style.width=(r.width+pad*2)+'px'; spot.style.height=(r.height+pad*2)+'px';
      var cw=378, ch=card.offsetHeight||360, vw=window.innerWidth, vh=window.innerHeight, gap=18;
      var left, top;
      card.style.transform='none';
      if (r.right + gap + cw < vw-12) left = r.right + gap;           // a la derecha
      else if (r.left - gap - cw > 12) left = r.left - gap - cw;      // a la izquierda
      else left = Math.min(Math.max(12, r.left), vw - cw - 12);      // debajo
      top = Math.min(Math.max(66, r.top), vh - ch - 16);
      card.style.left=left+'px'; card.style.top=top+'px';
    }, 320);
  }

  function seen(){ try{ sessionStorage.setItem('sigep_tour_seen','1'); }catch(e){} }
  function end(){
    seen();
    document.removeEventListener('keydown', onKey, true);
    if(root) root.remove();
    if(skip) skip.remove();
    root = null;
    var w=document.getElementById('tour-welcome'); if(w) w.remove();
  }

  window.SIGEPTour = {
    launch: function(){
      if (!document.querySelector('[data-tour="stats"]')){ location.href='index.html?tour=1'; return; }
      end(); welcome();
    }
  };

  function auto(){
    if (!document.querySelector('[data-tour="stats"]')) return; // solo el dashboard auto-lanza
    var forced = new URLSearchParams(location.search).get('tour')==='1';
    var first = !sessionStorage.getItem('sigep_tour_seen');
    if (forced || first) setTimeout(function(){ if(!document.getElementById('tour-welcome') && !root) welcome(); }, 500);
  }
  // tour.js se carga async (después de DOMContentLoaded): ejecutar ya si el DOM está listo
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto);
  else auto();
})();
