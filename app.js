/* ============================================================
   SIGEP v2 · chrome + interacciones (vanilla JS, sin build)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Logo oficial PDI embebido (data-URI, self-contained) ---------- */
  var PDI_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAC+CAYAAADJN8YKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABIpJREFUeNrs3YFxIjcABdDlxgXQQXwVhFSQvQriVBC7Al8qCK7AcQW2KzhfBXAVmFQQrgOnAiLFIrdDDMRGwmL93swOYzwDq9VHKy1I2zQAAAAAAAAAAAAAAL01WPePxWIxCg+Xe9iHWdj+6vz9kJ5rBoPBNMcbhLLEcoxe6Rh/SY/zWK5QptmOZTkND78UC8Rg8CHn6x1t+N8wbO0eKqDdcDD/rZhUUdMXVtBoT2XZWr5UpruwfY6PoTwPz3y941csy7O9O4B9jAf0JLWm96GC/gzbx7AND/jMEctzHbZYlvGBl+XgA/ZU4C5T5Xw88OMfg/VbKksrYPVVzmWomEkPWoC4/5PUvxKwyrSpcvpwmrnuW8je9aQcsRP/qSdluUwjeAGrrSXryad/2Ozn8pCAvfDTP+zJh6UVsDo//Sc9Kcu5gKmYkk760Bof9TBgo1gxL7hC/hzztHUHGSXCEE+Td30NWPxKpvu91CTD+61+z3Wctu8zn9pWK+bXTgDi93i7DgZuQ4DH3SdSa9OmFjRX/2n0RMBuwjbt/H/XAcEsHZ/Xtchgy+sfh+1+kcd4w/uMS75+xveIPm15nzbDe0xK5qaaPlhoEeaphctxavvxlcsy7rQyuw5adPIzVsxDOgX0wVWmU6SAZfa5JxWjBas0YPM+VEzhUayA7dgXQ8BAwBAwBAz6ErB4RV+1CFhJOQLmEoGArfVThteYqVoBW3d6PNWCCViJcLXN48SNHFfh/1C1dTjac4jGTzwdfws2ytT3Wpqq2jcYsOZxFnNxuRZNoZ+d/F3dqVYBK+lWtQpYKfNwetSCCVgxZ6pUwEq50bkXsFLqmHpFLwP2z/xNP1EWsBJ+D8H6QbgELLc4UozBclqs3CGtTRE78MuVmeeqTsCecvHMvlU89T3surY8byRgqwuGoA8GAoaAIWAgYAfD9DsBK63N8BoPAsY6OVa7ngkYq6fGYdjirfpyLII3P/TjcbTpQDWZVwpcuXvFbF9fUqd7/yynw31XIlTpWMVJw6dNvgXwvqzp2y37dznqZ9itl9y/qRtsCUPJFYg/7OsHgmkl5fYAG4D3q9+7pql/xWZnhfcbOEW+Db34Uv9IPVbrqqadSd2A0+bb2iFxAHK17UOgBavTtKb5BanfN0nhisFf/irmftstFLVg9YkDn9pmR12nFisOOs7TPt6mLd5teLbuJ1VasPqc1dT3SiPw47BPZ2n0Ok8BO0+humo2XPMTsPrCVdvE4Tj6vlv5u22+XaObNhsWrnGKrOe0+HOl8zrjvnXv/RT3cdj8z9WQtGAVXI5oHq93TSvdv7hfbefmqF+bx/XXurdHnGnB6qy4i9pno8f+YAjXTRpFXqQWbZ76Z3EEGe/z+V7A6gnVIc6Mukgt1nVqcb+mSxbxuY2Tngdbrn2cFtzpm30d5PRJO37FUGWbGZW+wmsLtljjLSPKNgVrZiUjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+K+/BRgALmSuUd6qYF8AAAAASUVORK5CYII=';
  window.PDI_LOGO = PDI_LOGO;

  /* ---------- Íconos ---------- */
  const I = {
    grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    users:'<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 6M15.5 20a5.5 5.5 0 0 1 5-3.2"/>',
    gun:'<path d="M3 8h13l2 3h3v3h-6l-2 3H8v-3H3z"/><path d="M6 14v3"/>',
    vest:'<path d="M8 3l4 3 4-3 3 3-2 4v8H7v-8L5 6z"/>',
    box:'<path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
    coins:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    alert:'<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
    log:'<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    plug:'<path d="M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>',
    truck:'<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    key:'<circle cx="8" cy="8" r="4"/><path d="M11 11l8 8M16 16l2-2M19 19l2-2"/>',
    scan:'<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2M7 12h10"/>',
    lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    shield:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/>',
    check:'<path d="M20 6L9 17l-5-5"/>', chev:'<path d="M9 6l6 6-6 6"/>', back:'<path d="M15 18l-6-6 6-6"/>'
  };
  function ico(name, cls) {
    return '<svg class="ico ' + (cls||'') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">' + (I[name]||'') + '</svg>';
  }
  window.ico = ico;

  /* ---------- Emblema institucional (cóndor + estrella, oro sobre navy;
       evoca la placa PDI sin reproducir el escudo oficial) ---------- */
  function crest(size) {
    size = size || 46;
    return '' +
    '<svg class="crest" width="' + size + '" height="' + size + '" viewBox="0 0 48 48" aria-hidden="true">' +
      '<defs><radialGradient id="cgN" cx="50%" cy="36%" r="72%">' +
        '<stop offset="0%" stop-color="#1a4488"/><stop offset="100%" stop-color="#0a2150"/>' +
      '</radialGradient></defs>' +
      '<circle cx="24" cy="24" r="22.5" fill="url(#cgN)" stroke="#f4c400" stroke-width="2"/>' +
      '<circle cx="24" cy="24" r="18.6" fill="none" stroke="#ffd633" stroke-width="0.8" opacity="0.7"/>' +
      '<path d="M24 7.4l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5z" fill="#ffd633"/>' +
      '<path d="M24 22.4c-4.1-4.3-9-5.1-14.3-3.4 3.7.2 5.5 1.2 7.4 2.9-2.4-.5-4.5-.1-6.8 1.3 4-.2 6.8.6 9.8 3z" fill="#f4c400"/>' +
      '<path d="M24 22.4c4.1-4.3 9-5.1 14.3-3.4-3.7.2-5.5 1.2-7.4 2.9 2.4-.5 4.5-.1 6.8 1.3-4-.2-6.8.6-9.8 3z" fill="#f4c400"/>' +
      '<path d="M24 20.2c1.35 0 2.3 1.05 2.3 2.5 0 2.3-2.3 5.8-2.3 5.8s-2.3-3.5-2.3-5.8c0-1.45.95-2.5 2.3-2.5z" fill="#ffd633"/>' +
      '<path d="M17.6 33h12.8l-1.5 3.3H19.1z" fill="#f4c400"/>' +
    '</svg>';
  }
  window.crest = crest;

  /* ---------- IA de navegación ---------- */
  const NAV = [
    { h:null, items:[
      {id:'dashboard', t:'Cuadro de mando', href:'index.html', ic:'grid'},
      {id:'guia', t:'Guía del sistema', href:'guia.html', ic:'log'} ]},
    { h:'Personas', items:[
      {id:'funcionarios', t:'Funcionarios', href:'funcionarios.html', ic:'users'},
      {id:'remuneraciones', t:'Remuneraciones', href:'remuneraciones.html', ic:'coins'},
      {id:'rrhh', t:'Asistencia y bienestar', href:'rrhh.html', ic:'users'},
      {id:'autoservicio', t:'Autoservicio funcionario', href:'autoservicio.html', ic:'users'} ]},
    { h:'Logística y activos', items:[
      {id:'armamento', t:'Armamento y munición', href:'armamento.html', ic:'gun'},
      {id:'epp', t:'EPP y equipamiento', href:'epp.html', ic:'vest'},
      {id:'panol', t:'Pañol · control de turno', href:'panol.html', ic:'scan'},
      {id:'compras', t:'Compras y abastecimiento', href:'compras.html', ic:'box'},
      {id:'activos', t:'Activos y flota', href:'flota.html', ic:'truck'},
      {id:'bodegas', t:'Bodegas e inventario', href:'bodegas.html', ic:'box'} ]},
    { h:'Finanzas', items:[
      {id:'presupuesto', t:'Presupuesto y ejecución', href:'presupuesto.html', ic:'coins'},
      {id:'finanzas', t:'Contabilidad y tesorería', href:'finanzas.html', ic:'coins'},
      {id:'viaticos', t:'Viáticos y honorarios', href:'viaticos.html', ic:'coins'} ]},
    { h:'Seguridad y control', items:[
      {id:'incidentes', t:'Incidentes ANCI', href:'incidentes.html', ic:'alert', n:'2'},
      {id:'auditoria', t:'Registro de auditoría', href:'auditoria.html', ic:'log'},
      {id:'accesos', t:'Accesos y roles', href:'accesos.html', ic:'key'},
      {id:'documental', t:'Firma y documental', href:'documental.html', ic:'log'} ]},
    { h:'Interoperabilidad', items:[
      {id:'integraciones', t:'Integraciones del Estado', href:'integraciones.html', ic:'plug'},
      {id:'transparencia', t:'Transparencia Activa', href:'transparencia.html', ic:'plug'} ]},
    { h:'Plataforma', items:[
      {id:'maestros', t:'Datos maestros', href:'maestros.html', ic:'box'},
      {id:'onboarding', t:'Puesta en marcha', href:'onboarding.html', ic:'grid'},
      {id:'infra', t:'Nube y continuidad', href:'infraestructura.html', ic:'shield'},
      {id:'soporte', t:'Soporte y mesa de ayuda', href:'soporte.html', ic:'log'},
      {id:'adopcion', t:'Adopción y cambio', href:'adopcion.html', ic:'users'} ]}
  ];

  function renderShell() {
    const active = window.SIGEP_PAGE || '';
    const clf = window.SIGEP_CLF || 'reservado';
    const clfName = {publico:'Público', reservado:'Reservado', secreto:'Secreto'}[clf];

    const bar = document.getElementById('clfbar');
    if (bar) bar.innerHTML = ico('lock','lock') + ' ' + clfName + ' · uso institucional exclusivo' +
      '<span class="sp">SIGEP · Policía de Investigaciones de Chile · toda acción queda trazada en auditoría</span>';

    const nav = document.getElementById('nav');
    if (nav) {
      let h = '<div class="nav__mast">' +
        '<img class="nav__logo" src="' + PDI_LOGO + '" alt="Policía de Investigaciones de Chile">' +
        '<div class="nav__wm"><strong>SIGEP</strong><span>Sistema de Gestión Institucional</span><em>Policía de Investigaciones de Chile</em></div></div>';
      NAV.forEach(function (g) {
        var slug = (g.h || 'cuadro').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
        h += '<div class="nav__grp" data-grp="' + slug + '">';
        if (g.h) h += '<h4>' + g.h + '</h4>';
        g.items.forEach(function (it) {
          h += '<a class="nav__i' + (it.id === active ? ' on' : '') + '" href="' + it.href + '">' +
            ico(it.ic) + '<span>' + it.t + '</span>' +
            (it.n ? '<span class="n">' + it.n + '</span>' : '') +
            (it.pronto ? '<span class="pronto">pronto</span>' : '') + '</a>';
        });
        h += '</div>';
      });
      h += '<div class="nav__foot">Prototipo Lemon · datos ficticios<br>Materializa docs/decisions 0001–0003</div>';
      nav.innerHTML = h;
    }

    const top = document.getElementById('top');
    if (top) {
      const crumbs = window.SIGEP_CRUMBS || ['Inicio'];
      const cr = crumbs.map(function (c, i) {
        if (i === crumbs.length - 1) return '<b>' + c + '</b>';
        return '<span>' + c + '</span>';
      }).join('<i>/</i>');
      top.innerHTML =
        '<div class="crumbs">' + cr + '</div>' +
        '<div class="search">' + ico('search') + '<input placeholder="Buscar funcionario, arma, serie, OC…" aria-label="Buscar"></div>' +
        '<div class="top__r">' +
          '<button class="tour-launch" onclick="if(window.SIGEPTour)SIGEPTour.launch()" title="Recorrido guiado">' + ico('grid') + 'Guía interactiva</button>' +
          '<span class="chip chip--' + (clf==='secreto'?'sec':clf==='publico'?'pub':'res') + ' chip--lg">' + ico('lock') + clfName + '</span>' +
          '<span class="chip chip--ok chip--lg">ClaveÚnica · MFA</span>' +
          '<div class="uchip"><div class="uchip__a">DF</div><div class="uchip__m"><strong>Comisario D. Figueroa</strong><span>JENATID · Dirección</span></div></div>' +
        '</div>';
      top.querySelectorAll('.chip .ico').forEach(function(s){ s.setAttribute('width','13'); s.setAttribute('height','13'); });
    }
  }

  /* ---------- Toast ---------- */
  window.toast = function (title, msg, type) {
    let w = document.getElementById('toasts');
    if (!w) { w = document.createElement('div'); w.className = 'toasts'; w.id = 'toasts'; document.body.appendChild(w); }
    const el = document.createElement('div');
    el.className = 'toast toast--' + (type || 'ok');
    el.innerHTML = ico(type === 'danger' ? 'alert' : 'check') + '<div><strong>' + title + '</strong>' + (msg ? '<span>' + msg + '</span>' : '') + '</div>';
    w.appendChild(el);
    setTimeout(function () { el.style.transition = 'opacity .3s'; el.style.opacity = '0'; setTimeout(function () { el.remove(); }, 300); }, 4400);
  };

  /* ---------- Modales ---------- */
  window.openModal = function (id) { const m = document.getElementById(id); if (m) m.classList.add('open'); };
  window.closeModal = function (el) { const m = el ? el.closest('.scrim') : null; if (m) m.classList.remove('open'); };

  /* ---------- Delegación ---------- */
  document.addEventListener('click', function (e) {
    const op = e.target.closest('[data-open]');
    if (op) { e.preventDefault(); openModal(op.getAttribute('data-open')); return; }
    const cl = e.target.closest('[data-close]');
    if (cl) { e.preventDefault(); closeModal(cl); return; }
    if (e.target.classList && e.target.classList.contains('scrim')) { e.target.classList.remove('open'); return; }
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      const group = tab.closest('[data-tabs]');
      group.querySelectorAll('[data-tab]').forEach(function (t) { t.classList.remove('on'); });
      tab.classList.add('on');
      const name = tab.getAttribute('data-tab');
      group.parentElement.querySelectorAll('[data-panel]').forEach(function (p) {
        p.style.display = p.getAttribute('data-panel') === name ? '' : 'none';
      });
      return;
    }
    const rl = e.target.closest('[data-href]');
    if (rl && !e.target.closest('a,button,input')) { window.location.href = rl.getAttribute('data-href'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.scrim.open').forEach(function (m) { m.classList.remove('open'); });
  });

  window.validateForm = function (form) {
    let ok = true;
    form.querySelectorAll('[required]').forEach(function (inp) {
      const f = inp.closest('.field');
      if (!inp.value.trim()) { f && f.classList.add('bad'); ok = false; } else { f && f.classList.remove('bad'); }
    });
    return ok;
  };

  /* querystring helper (para proximamente.html) */
  window.qs = function (k) { return new URLSearchParams(location.search).get(k); };

  /* Filas navegables: accesibles por teclado y expuestas como enlaces */
  function enhanceRows() {
    document.querySelectorAll('[data-href]').forEach(function (r) {
      if (r.dataset.enh) return; r.dataset.enh = '1';
      r.setAttribute('tabindex', '0');
      r.setAttribute('role', 'link');
      if (!r.getAttribute('aria-label')) {
        var s = r.querySelector('strong'); if (s) r.setAttribute('aria-label', s.textContent.trim());
      }
      r.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = r.getAttribute('data-href'); }
      });
    });
  }

  function loadTour(){
    if (window.SIGEPTour || document.getElementById('sigep-tour-js')) return;
    var s=document.createElement('script'); s.src='tour.js'; s.id='sigep-tour-js'; document.body.appendChild(s);
  }
  function init(){ renderShell(); enhanceRows(); loadTour(); }
  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();
})();
