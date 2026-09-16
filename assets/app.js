/* Reparación Bosch Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '883 861 141', TEL_HREF: 'tel:+34883861141',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=',
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"e16-lavadora","cod":"E16/F16","ap":"lavadora","keys":["E16"],"titulo":"Puerta mal cerrada","sig":"La lavadora detecta que la puerta no cierra bien.","pasos":["Cerrar bien la puerta","Retirar ropa atrapada en la goma"],"sem":"verde","llamar":"Si persiste con la puerta bien cerrada, es el cierre."},{"id":"e17-lavadora","cod":"E17/F17","ap":"lavadora","keys":["E17"],"titulo":"No entra agua","sig":"La lavadora no recibe agua suficiente.","pasos":["Revisar que el grifo está abierto","Manguera sin dobleces","Limpiar el filtro de entrada"],"sem":"verde","llamar":"Con agua y sin dobleces, y persiste: electroválvula."},{"id":"e18-lavadora","cod":"E18/F18","ap":"lavadora","keys":["E18"],"titulo":"No desagua","sig":"La lavadora no vacía el agua (bomba o filtro).","pasos":["Limpiar el filtro de la bomba (parte baja delantera)","Revisar la manguera de desagüe"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"e19-lavadora","cod":"E19/F19","ap":"lavadora","keys":["E19"],"titulo":"No calienta","sig":"Fallo en el calentamiento del agua.","pasos":[],"sem":"ambar","llamar":"Siempre (resistencia o sonda)."},{"id":"e20-lavadora","cod":"E20/F20","ap":"lavadora","keys":["E20"],"titulo":"Control de temperatura","sig":"Fallo en el sensor de temperatura.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e23-lavadora","cod":"E23/F23","ap":"lavadora","keys":["E23"],"titulo":"AquaStop activado","sig":"Se ha detectado agua en la base de la lavadora.","pasos":[],"sem":"ambar","llamar":"Siempre. La propia Bosch indica que no se puede corregir en casa."},{"id":"e25-lavadora","cod":"E25/F25","ap":"lavadora","keys":["E25"],"titulo":"Bomba de desagüe bloqueada","sig":"Objeto o resto atascado en la bomba.","pasos":["Limpiar la bomba y el filtro","Buscar objetos pequeños (monedas, botones)"],"sem":"verde","llamar":"Si persiste tras limpiar."},{"id":"e26-lavadora","cod":"E26/F26","ap":"lavadora","keys":["E26"],"titulo":"Sensor de presión/turbidez","sig":"Fallo en el sensor que mide el nivel o la suciedad del agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f27-lavadora","cod":"F27","ap":"lavadora","keys":["E27","F27"],"titulo":"Sensor de caudal","sig":"Fallo en el sensor que mide el flujo de agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e28-lavadora","cod":"E28/F28","ap":"lavadora","keys":["E28"],"titulo":"Motor / control de motor","sig":"Fallo en el motor o su electrónica.","pasos":["Parar la lavadora y desconectarla"],"sem":"ambar","llamar":"Siempre."},{"id":"e09-lavavajillas","cod":"E09","ap":"lavavajillas","keys":["E09","E9"],"titulo":"Circuito de calentamiento","sig":"No calienta o no seca correctamente.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e15-lavavajillas","cod":"E15","ap":"lavavajillas","keys":["E15"],"titulo":"Agua en la base (AquaStop)","sig":"El sistema AquaStop ha detectado agua fuera de la cuba.","pasos":["Inclinar el lavavajillas 45° y vaciar la bandeja de la base","Mirar si hay fugas visibles"],"sem":"verde","llamar":"Si reaparece, es una fuga interna."},{"id":"e16-lavavajillas","cod":"E16/E17","ap":"lavavajillas","keys":["E16","E17"],"titulo":"Entrada de agua / filtrado","sig":"Problema al entrar o filtrar el agua (nomenclatura Bosch literal).","pasos":["Revisar la válvula angular","Manguera sin dobleces"],"sem":"verde","llamar":"Si persiste tras revisar."},{"id":"e18-lavavajillas","cod":"E18","ap":"lavavajillas","keys":["E18"],"titulo":"Nivel de agua insuficiente","sig":"No entra agua suficiente en la cuba.","pasos":["Limpiar el filtro de entrada","Grifo abierto"],"sem":"verde","llamar":"Si persiste, revisar caudalímetro."},{"id":"e22-lavavajillas","cod":"E22","ap":"lavavajillas","keys":["E22"],"titulo":"Filtro obstruido","sig":"Los filtros de la cuba están sucios o bloqueados.","pasos":["Limpiar los filtros del fondo de la cuba"],"sem":"verde","llamar":"Si persiste tras limpiar."},{"id":"e23-lavavajillas","cod":"E23","ap":"lavavajillas","keys":["E23"],"titulo":"Bomba de desagüe","sig":"Fallo en la bomba que expulsa el agua.","pasos":["Limpiar la bomba, en el fondo de la cuba"],"sem":"verde","llamar":"Si persiste."},{"id":"e24-lavavajillas","cod":"E24","ap":"lavavajillas","keys":["E24"],"titulo":"No desagua","sig":"El agua no sale del lavavajillas.","pasos":["Revisar la manguera de desagüe","Revisar el sifón del fregadero","Limpiar el filtro"],"sem":"verde","llamar":"Si persiste, es la bomba."},{"id":"e25-lavavajillas","cod":"E25","ap":"lavavajillas","keys":["E25"],"titulo":"Bomba de desagüe bloqueada","sig":"Objeto (cristal, resto de comida) bloqueando la bomba.","pasos":["Retirar restos visibles con cuidado"],"sem":"verde","llamar":"Si persiste."},{"id":"e01-secadora","cod":"E01/E02","ap":"secadora","keys":["E01","E02","E1","E2"],"titulo":"Filtro de pelusas bloqueado","sig":"El filtro de pelusas está obstruido y reduce el secado.","pasos":["Limpiar el filtro de pelusas (delante o arriba, según modelo)"],"sem":"verde","llamar":"Si persiste con el filtro limpio."},{"id":"e03-secadora","cod":"E03","ap":"secadora","keys":["E03","E3"],"titulo":"Tubo de condensación obstruido","sig":"El circuito de condensación no evacúa bien el agua.","pasos":["Limpiar el tubo de condensación","Limpiar el sifón de condensación"],"sem":"verde","llamar":"Si persiste tras limpiar."},{"id":"e06-secadora","cod":"E06","ap":"secadora","keys":["E06","E6"],"titulo":"Circuito de calefacción","sig":"Fallo en la resistencia o el circuito de calor.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e08-secadora","cod":"E08/E09/E24/E25/E28/E90","ap":"secadora","keys":["E08","E8","E09","E9","E24","E25","E28","E90"],"titulo":"Fallo electrónico","sig":"Fallo en la electrónica de control de la secadora.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e01-frigorifico","cod":"E01","ap":"frigorifico","keys":["E01","E1"],"titulo":"Sensor compartimento frigorífico","sig":"Fallo en el sensor de temperatura del frigorífico.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e02-frigorifico","cod":"E02","ap":"frigorifico","keys":["E02","E2"],"titulo":"Sensor congelador","sig":"Fallo en el sensor de temperatura del congelador.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e04-frigorifico","cod":"E04","ap":"frigorifico","keys":["E04","E4"],"titulo":"Sensor condensador","sig":"Fallo en el sensor del condensador.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e20-frigorifico","cod":"E20","ap":"frigorifico","keys":["E20"],"titulo":"Comunicación placa–display","sig":"Fallo de comunicación entre la placa y la pantalla.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"verde","llamar":"Si persiste tras el reinicio."},{"id":"e011-horno","cod":"E011","ap":"horno","keys":["E011"],"titulo":"Tecla pulsada o atascada","sig":"El panel detecta una tecla pulsada de forma continua.","pasos":["Limpiar el panel","Revisar restos de grasa o humedad"],"sem":"verde","llamar":"Si persiste, es el panel."},{"id":"e115-horno","cod":"E115","ap":"horno","keys":["E115"],"titulo":"Temperatura demasiado alta","sig":"El horno ha superado la temperatura máxima de seguridad.","pasos":["Dejar enfriar","Borrar el aviso con la tecla del reloj"],"sem":"verde","llamar":"Si se repite, es la sonda o el relé."},{"id":"e305-horno","cod":"E305","ap":"horno","keys":["E305"],"titulo":"Sin conexión entre placas","sig":"Fallo de comunicación entre las placas electrónicas del horno.","pasos":["Apagar, esperar un minuto y reiniciar"],"sem":"verde","llamar":"Si persiste tras reiniciar."},{"id":"er1-horno","cod":"Er1/Er4","ap":"horno","keys":["ER1","ER4"],"titulo":"Sensor de temperatura","sig":"Fallo en el sensor que mide la temperatura del horno.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"er6-horno","cod":"Er6/Er7","ap":"horno","keys":["ER6","ER7"],"titulo":"Bloqueo de puerta (pirólisis)","sig":"Fallo en el bloqueo de seguridad durante la limpieza por pirólisis.","pasos":[],"sem":"ambar","llamar":"Siempre — no fuerces la puerta."},{"id":"safe-horno","cod":"SAFE / E106","ap":"horno","keys":["SAFE","E106"],"titulo":"Bloqueo infantil / puerta bloqueada","sig":"El bloqueo de seguridad está activado.","pasos":["Mantener pulsada la tecla en forma de llave unos 4 segundos"],"sem":"verde","llamar":"Solo si no se desbloquea así."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };

  /* ---------- horario */
  function abierto() {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60, w = d.getDay();
    if (w >= 1 && w <= 5) return h >= 8 && h < 20;
    if (w === 6) return h >= 9 && h < 14;
    return false;
  }
  if (!abierto()) $$('[data-chip-hora]').forEach(function (el) { el.textContent = 'Te llamamos a primera hora (L–V desde las 8)'; });

  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('883861141').then(function () { cp.textContent = 'Copiado: 883 861 141'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'CONGELADOR', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    up = up.replace(/\b(ERROR|CODIGO|CODE|BOSCH|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    k = k.replace(/^F(?=\d)/, 'E');
    if (/^\d+$/.test(k)) k = 'E' + k;
    return { key: k, ap: ap, fIn: /^F\d/.test(up.replace(/\s/g, '')) };
  }
  function buscar(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' Bosch que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' Bosch</span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' Bosch →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: <a href="https://www.bosch-home.es" rel="nofollow noopener" target="_blank">bosch-home.es</a> · 976 305 713</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        bTel.innerHTML = ico('tel') + 'Que me llame un técnico · 60,50 € IVA incl., se descuenta';
        bTel.setAttribute('href', '#contacto'); bTel.removeAttribute('data-cta-tel');
        bTel.addEventListener('click', function (e) { e.preventDefault(); prefill(c.ap, codigo); });
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      if (input.value.trim()) go(input.value);
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa') placa(); }); });
    $$('[data-cod]', root).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' Bosch que marca ' : 'mi aparato Bosch marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong> verificado con documentación de Bosch y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta E-Nr (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el E-Nr →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas Bosch avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa Bosch que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa') { placa(); return; }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || apq === 'placa') { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0; })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.replace(p.key, '<mark>' + p.key + '</mark>');
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En Bosch, F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    var f = $('form', root); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);

  /* ================================================================ FORMULARIO */
  var form = $('#form-llamada');
  function prefill(apId, codigo) {
    if (!form) return;
    if (apId) $$('[name=aparato]', form).forEach(function (r) { r.checked = r.value === APARATOS[apId].nombre; });
    if (codigo) { $('[name=codigo]', form).value = codigo; var s = $$('[name=sintoma]', form).filter(function (r) { return r.value === 'Error en pantalla'; })[0]; if (s) s.checked = true; }
    form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('[name=telefono]', form).focus({ preventScroll: true }); }, 500);
  }
  window.RBV = { prefill: prefill, zona: Z };
  function abreWA(t) { var w = window.open(wa(t), '_blank'); if (w) w.opener = null; else location.href = wa(t); }
  if (form) {
    var zsel = $('[name=zona]', form);
    if (zsel) { if (Z.get()) zsel.value = Z.get(); zsel.addEventListener('change', function () { Z.set(zsel.value); $$('a[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); }); }); }
    var dl = $('#lista-codigos'); if (dl) { var ks = {}; CODIGOS.forEach(function (c) { c.keys.forEach(function (k) { if (k.length > 2) ks[k] = APARATOS[c.ap].nombre; }); }); dl.innerHTML = Object.keys(ks).sort().map(function (k) { return '<option value="' + k + '">' + ks[k] + '</option>'; }).join(''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', form).value) return; /* honeypot */
      var tel = $('[name=telefono]', form), g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, '');
      var okTel = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !okTel);
      var rg = $('[name=rgpd]', form), gr = rg.closest('.f-g'); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = ($$('[name=aparato]:checked', form)[0] || {}).value || '', si = ($$('[name=sintoma]:checked', form)[0] || {}).value || '';
      var cod = $('[name=codigo]', form).value.trim().toUpperCase(), zona = zsel ? zsel.value : '';
      var t = 'Hola, quiero que me llaméis.';
      if (ap) t += ' Aparato: ' + ap + ' Bosch.'; if (si) t += ' Le pasa: ' + si.toLowerCase() + '.'; if (cod) t += ' Código: ' + cod + '.';
      if (zona) t += ' Zona: ' + zona + '.'; t += ' Teléfono: ' + tel.value.trim() + '.';
      var fin = function () { form.hidden = true; var ok = $('.f-ok', form.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ aparato: ap, sintoma: si, codigo: cod, telefono: tel.value, zona: zona, mensaje: t }) })
          .then(function (r) { if (!r.ok) throw 0; fin(); }).catch(function () { abreWA(t); fin(); });
      } else { abreWA(t); fin(); }
    });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'); Z.set(n);
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un Bosch que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="#contacto">Te llamamos en &lt; 1 h</a>') + '</div>';
      if (zsel) zsel.value = n;
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
  }
})();
