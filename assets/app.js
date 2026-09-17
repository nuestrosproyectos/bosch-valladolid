/* Reparación Bosch Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=', PRECIO: '60,50 €',
    MARCA: 'Bosch', MARCA_RE: /\b(BOSCH)\b/g, SAT_TXT: '<a href="https://www.bosch-home.es" rel="nofollow noopener" target="_blank">bosch-home.es</a> · 976 305 713', ETIQUETA: 'E-Nr', F_ES_E: true,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"e16-lavadora","cod":"E16/F16","ap":"lavadora","keys":["E16"],"titulo":"Puerta mal cerrada","sig":"La lavadora detecta que la puerta no cierra bien.","pasos":["Cerrar bien la puerta","Retirar ropa atrapada en la goma"],"sem":"verde","llamar":"Si persiste con la puerta bien cerrada, es el cierre."},{"id":"e17-lavadora","cod":"E17/F17","ap":"lavadora","keys":["E17"],"titulo":"No entra agua","sig":"La lavadora no recibe agua suficiente.","pasos":["Revisar que el grifo está abierto","Manguera sin dobleces","Limpiar el filtro de entrada"],"sem":"verde","llamar":"Con agua y sin dobleces, y persiste: electroválvula."},{"id":"e18-lavadora","cod":"E18/F18","ap":"lavadora","keys":["E18"],"titulo":"No desagua","sig":"La lavadora no vacía el agua (bomba o filtro).","pasos":["Limpiar el filtro de la bomba (parte baja delantera)","Revisar la manguera de desagüe"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"e19-lavadora","cod":"E19/F19","ap":"lavadora","keys":["E19"],"titulo":"No calienta","sig":"Fallo en el calentamiento del agua.","pasos":[],"sem":"ambar","llamar":"Siempre (resistencia o sonda)."},{"id":"e20-lavadora","cod":"E20/F20","ap":"lavadora","keys":["E20"],"titulo":"Control de temperatura","sig":"Fallo en el sensor de temperatura.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e23-lavadora","cod":"E23/F23","ap":"lavadora","keys":["E23"],"titulo":"AquaStop activado","sig":"Se ha detectado agua en la base de la lavadora.","pasos":[],"sem":"ambar","llamar":"Siempre. La propia Bosch indica que no se puede corregir en casa."},{"id":"e25-lavadora","cod":"E25/F25","ap":"lavadora","keys":["E25"],"titulo":"Bomba de desagüe bloqueada","sig":"Objeto o resto atascado en la bomba.","pasos":["Limpiar la bomba y el filtro","Buscar objetos pequeños (monedas, botones)"],"sem":"verde","llamar":"Si persiste tras limpiar."},{"id":"e26-lavadora","cod":"E26/F26","ap":"lavadora","keys":["E26"],"titulo":"Sensor de presión/turbidez","sig":"Fallo en el sensor que mide el nivel o la suciedad del agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f27-lavadora","cod":"F27","ap":"lavadora","keys":["E27","F27"],"titulo":"Sensor de caudal","sig":"Fallo en el sensor que mide el flujo de agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e28-lavadora","cod":"E28/F28","ap":"lavadora","keys":["E28"],"titulo":"Motor / control de motor","sig":"Fallo en el motor o su electrónica.","pasos":["Parar la lavadora y desconectarla"],"sem":"ambar","llamar":"Siempre."},{"id":"e09-lavavajillas","cod":"E09","ap":"lavavajillas","keys":["E09","E9"],"titulo":"Circuito de calentamiento","sig":"No calienta o no seca correctamente.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e15-lavavajillas","cod":"E15","ap":"lavavajillas","keys":["E15"],"titulo":"Agua en la base (AquaStop)","sig":"El sistema AquaStop ha detectado agua fuera de la cuba.","pasos":["Inclinar el lavavajillas 45° y vaciar la bandeja de la base","Mirar si hay fugas visibles"],"sem":"verde","llamar":"Si reaparece, es una fuga interna."},{"id":"e16-lavavajillas","cod":"E16/E17","ap":"lavavajillas","keys":["E16","E17"],"titulo":"Entrada de agua / filtrado","sig":"Problema al entrar o filtrar el agua (nomenclatura Bosch literal).","pasos":["Revisar la válvula angular","Manguera sin dobleces"],"sem":"verde","llamar":"Si persiste tras revisar."},{"id":"e18-lavavajillas","cod":"E18","ap":"lavavajillas","keys":["E18"],"titulo":"Nivel de agua insuficiente","sig":"No entra agua suficiente en la cuba.","pasos":["Limpiar el filtro de entrada","Grifo abierto"],"sem":"verde","llamar":"Si persiste, revisar caudalímetro."},{"id":"e22-lavavajillas","cod":"E22","ap":"lavavajillas","keys":["E22"],"titulo":"Filtro obstruido","sig":"Los filtros de la cuba están sucios o bloqueados.","pasos":["Limpiar los filtros del fondo de la cuba"],"sem":"verde","llamar":"Si persiste tras limpiar."},{"id":"e23-lavavajillas","cod":"E23","ap":"lavavajillas","keys":["E23"],"titulo":"Bomba de desagüe","sig":"Fallo en la bomba que expulsa el agua.","pasos":["Limpiar la bomba, en el fondo de la cuba"],"sem":"verde","llamar":"Si persiste."},{"id":"e24-lavavajillas","cod":"E24","ap":"lavavajillas","keys":["E24"],"titulo":"No desagua","sig":"El agua no sale del lavavajillas.","pasos":["Revisar la manguera de desagüe","Revisar el sifón del fregadero","Limpiar el filtro"],"sem":"verde","llamar":"Si persiste, es la bomba."},{"id":"e25-lavavajillas","cod":"E25","ap":"lavavajillas","keys":["E25"],"titulo":"Bomba de desagüe bloqueada","sig":"Objeto (cristal, resto de comida) bloqueando la bomba.","pasos":["Retirar restos visibles con cuidado"],"sem":"verde","llamar":"Si persiste."},{"id":"e01-secadora","cod":"E01/E02","ap":"secadora","keys":["E01","E02","E1","E2"],"titulo":"Filtro de pelusas bloqueado","sig":"El filtro de pelusas está obstruido y reduce el secado.","pasos":["Limpiar el filtro de pelusas (delante o arriba, según modelo)"],"sem":"verde","llamar":"Si persiste con el filtro limpio."},{"id":"e03-secadora","cod":"E03","ap":"secadora","keys":["E03","E3"],"titulo":"Tubo de condensación obstruido","sig":"El circuito de condensación no evacúa bien el agua.","pasos":["Limpiar el tubo de condensación","Limpiar el sifón de condensación"],"sem":"verde","llamar":"Si persiste tras limpiar."},{"id":"e06-secadora","cod":"E06","ap":"secadora","keys":["E06","E6"],"titulo":"Circuito de calefacción","sig":"Fallo en la resistencia o el circuito de calor.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e08-secadora","cod":"E08/E09/E24/E25/E28/E90","ap":"secadora","keys":["E08","E8","E09","E9","E24","E25","E28","E90"],"titulo":"Fallo electrónico","sig":"Fallo en la electrónica de control de la secadora.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e01-frigorifico","cod":"E01","ap":"frigorifico","keys":["E01","E1"],"titulo":"Sensor compartimento frigorífico","sig":"Fallo en el sensor de temperatura del frigorífico.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e02-frigorifico","cod":"E02","ap":"frigorifico","keys":["E02","E2"],"titulo":"Sensor congelador","sig":"Fallo en el sensor de temperatura del congelador.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e04-frigorifico","cod":"E04","ap":"frigorifico","keys":["E04","E4"],"titulo":"Sensor condensador","sig":"Fallo en el sensor del condensador.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e20-frigorifico","cod":"E20","ap":"frigorifico","keys":["E20"],"titulo":"Comunicación placa–display","sig":"Fallo de comunicación entre la placa y la pantalla.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"verde","llamar":"Si persiste tras el reinicio."},{"id":"e011-horno","cod":"E011","ap":"horno","keys":["E011"],"titulo":"Tecla pulsada o atascada","sig":"El panel detecta una tecla pulsada de forma continua.","pasos":["Limpiar el panel","Revisar restos de grasa o humedad"],"sem":"verde","llamar":"Si persiste, es el panel."},{"id":"e115-horno","cod":"E115","ap":"horno","keys":["E115"],"titulo":"Temperatura demasiado alta","sig":"El horno ha superado la temperatura máxima de seguridad.","pasos":["Dejar enfriar","Borrar el aviso con la tecla del reloj"],"sem":"verde","llamar":"Si se repite, es la sonda o el relé."},{"id":"e305-horno","cod":"E305","ap":"horno","keys":["E305"],"titulo":"Sin conexión entre placas","sig":"Fallo de comunicación entre las placas electrónicas del horno.","pasos":["Apagar, esperar un minuto y reiniciar"],"sem":"verde","llamar":"Si persiste tras reiniciar."},{"id":"er1-horno","cod":"Er1/Er4","ap":"horno","keys":["ER1","ER4"],"titulo":"Sensor de temperatura","sig":"Fallo en el sensor que mide la temperatura del horno.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"er6-horno","cod":"Er6/Er7","ap":"horno","keys":["ER6","ER7"],"titulo":"Bloqueo de puerta (pirólisis)","sig":"Fallo en el bloqueo de seguridad durante la limpieza por pirólisis.","pasos":[],"sem":"ambar","llamar":"Siempre — no fuerces la puerta."},{"id":"safe-horno","cod":"SAFE / E106","ap":"horno","keys":["SAFE","E106"],"titulo":"Bloqueo infantil / puerta bloqueada","sig":"El bloqueo de seguridad está activado.","pasos":["Mantener pulsada la tecla en forma de llave unos 4 segundos"],"sem":"verde","llamar":"Solo si no se desbloquea así."},{"id":"e02-congelador","cod":"E02","ap":"congelador","keys":["E02","E2"],"titulo":"Sensor del compartimento congelador","sig":"Fallo en el sensor que mide la temperatura del congelador.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e04-congelador","cod":"E04","ap":"congelador","keys":["E04","E4"],"titulo":"Sensor condensador","sig":"Fallo en el sensor del condensador.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e20-congelador","cod":"E20","ap":"congelador","keys":["E20"],"titulo":"Comunicación placa–display","sig":"Fallo de comunicación entre la placa y la pantalla.","pasos":["Desenchufar 5 minutos y volver a enchufar"],"sem":"verde","llamar":"Si persiste tras el reinicio."},{"id":"alarma-congelador","cod":"Alarma + piloto rojo","ap":"congelador","keys":["ALARMA","PILOTO","PITA"],"titulo":"Temperatura demasiado alta","sig":"Aviso estándar de los congeladores NoFrost Bosch cuando la temperatura interior sube por encima del umbral de seguridad, normalmente tras un corte de luz o la puerta abierta mucho tiempo. No es un código E propiamente dicho.","pasos":["Comprobar que la puerta cierra bien","Comprobar que no ha habido un corte de luz reciente","Mantener pulsado el botón de alarma para silenciarla una vez comprobado"],"sem":"verde","llamar":"Si la alarma vuelve a saltar sin corte de luz ni puerta abierta.","aviso":1},{"id":"e16-lavasecadora","cod":"E16/F16","ap":"lavasecadora","keys":["E16"],"titulo":"Puerta mal cerrada","sig":"La lavasecadora detecta que la puerta no cierra bien.","pasos":["Cerrar bien la puerta","Retirar ropa atrapada en la goma"],"sem":"verde","llamar":"Si persiste con la puerta bien cerrada, es el cierre."},{"id":"e17-lavasecadora","cod":"E17/F17","ap":"lavasecadora","keys":["E17"],"titulo":"No entra agua","sig":"No recibe agua suficiente para el lavado.","pasos":["Grifo abierto","Manguera sin dobleces","Limpiar el filtro de entrada"],"sem":"verde","llamar":"Con agua y sin dobleces, y persiste: electroválvula."},{"id":"e18-lavasecadora","cod":"E18/F18","ap":"lavasecadora","keys":["E18"],"titulo":"No desagua","sig":"No vacía el agua del lavado (bomba o filtro).","pasos":["Limpiar el filtro de la bomba","Revisar la manguera de desagüe"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"e19-lavasecadora","cod":"E19/F19","ap":"lavasecadora","keys":["E19"],"titulo":"No calienta el agua de lavado","sig":"Fallo en el calentamiento del agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e20-lavasecadora","cod":"E20/F20","ap":"lavasecadora","keys":["E20"],"titulo":"Control de temperatura","sig":"Fallo en el sensor de temperatura.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e23-lavasecadora","cod":"E23/F23","ap":"lavasecadora","keys":["E23"],"titulo":"AquaStop activado","sig":"Se ha detectado agua en la base del aparato.","pasos":[],"sem":"ambar","llamar":"Siempre. La propia Bosch indica que no se puede corregir en casa."},{"id":"e25-lavasecadora","cod":"E25/F25","ap":"lavasecadora","keys":["E25"],"titulo":"Bomba de desagüe bloqueada","sig":"Objeto o resto atascado en la bomba.","pasos":["Limpiar la bomba y el filtro","Buscar objetos pequeños"],"sem":"verde","llamar":"Si persiste tras limpiar."},{"id":"e26-lavasecadora","cod":"E26/F26","ap":"lavasecadora","keys":["E26"],"titulo":"Sensor de presión/turbidez","sig":"Fallo en el sensor que mide el nivel o la suciedad del agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f27-lavasecadora","cod":"F27","ap":"lavasecadora","keys":["E27","F27"],"titulo":"Sensor de caudal","sig":"Fallo en el sensor que mide el flujo de agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e28-lavasecadora","cod":"E28/F28","ap":"lavasecadora","keys":["E28"],"titulo":"Motor / control de motor","sig":"Fallo en el motor o su electrónica.","pasos":["Parar el aparato y desconectarlo"],"sem":"ambar","llamar":"Siempre."},{"id":"campana-filtro","cod":"Indicador de filtro","ap":"campana","keys":["FILTRO","INDICADOR","SATURACION"],"titulo":"Filtro antigrasa saturado","sig":"La campana avisa con un indicador electrónico de saturación; no es un código de error.","pasos":["Limpiar el filtro antigrasa metálico (apto para lavavajillas en muchos modelos)","Con el filtro limpio, mantener pulsado el botón del indicador hasta el aviso sonoro para resetearlo"],"sem":"verde","llamar":"Si el indicador sigue encendido tras resetear, o si no aspira con el filtro limpio.","aviso":1},{"id":"ea-caldera","cod":"EA","ap":"caldera","keys":["EA"],"titulo":"Error de encendido","sig":"La caldera no detecta llama tras varios intentos (gas cortado, electrodo sucio o válvula de gas defectuosa).","pasos":["Comprobar que la llave de gas está abierta y que no hay corte de suministro","Pulsar el botón de rearme (reset) como máximo 3 veces, dejando unos minutos entre intentos"],"sem":"verde","llamar":"Si persiste tras 3 intentos de rearme. Si hueles a gas, no reinicies: cierra la llave y llama a la distribuidora."},{"id":"a7-caldera","cod":"A7","ap":"caldera","keys":["A7"],"titulo":"Sensor de temperatura del agua caliente sanitaria","sig":"El sensor que mide la temperatura del ACS está averiado; el agua caliente sale irregular.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f7-caldera","cod":"F7","ap":"caldera","keys":["F7"],"titulo":"Señal de llama anómala","sig":"La electrónica detecta una señal de llama incorrecta.","pasos":["Intentar un único rearme con el botón de reset; si reaparece, no insistir más veces"],"sem":"ambar","llamar":"Si reaparece tras un rearme, es el electrodo o la electrónica."},{"id":"c6-caldera","cod":"C6","ap":"caldera","keys":["C6"],"titulo":"El ventilador no alcanza revoluciones mínimas","sig":"El ventilador está bloqueado o el condensador de su motor está agotado; afecta a la evacuación de humos.","pasos":[],"sem":"ambar","llamar":"Siempre. Es un fallo de seguridad de combustión; no lo fuerces."},{"id":"f0-caldera","cod":"F0/F4","ap":"caldera","keys":["F0","F4"],"titulo":"Fallo del sensor NTC de temperatura","sig":"Fallo en el sensor que mide la temperatura del agua de calefacción.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f9-caldera","cod":"F9","ap":"caldera","keys":["F9"],"titulo":"Temperatura límite alcanzada","sig":"La caldera se ha sobrecalentado y se ha parado por seguridad.","pasos":["Dejar enfriar","Pulsar el botón de rearme una sola vez"],"sem":"verde","llamar":"Si se repite."},{"id":"fd-caldera","cod":"Fd","ap":"caldera","keys":["FD"],"titulo":"Fallo de llama momentáneo","sig":"Puede activarse sin que haya una avería real.","pasos":["Pulsar la tecla de rearme"],"sem":"verde","llamar":"Si es persistente (puede ser un problema de suministro o la sonda de ionización sucia)."},{"id":"e1-calentador","cod":"E1","ap":"calentador","keys":["E1","E01"],"titulo":"Temperatura de salida demasiado alta","sig":"El sensor de salida detecta una temperatura excesiva (por acumulación de cal o un fallo del propio sensor).","pasos":["Comprobar que el grifo de agua caliente no está casi cerrado forzando el sobrecalentamiento","Si el agua de tu zona es muy dura, puede necesitar descalcificación periódica"],"sem":"verde","llamar":"Si persiste, es el sensor o hace falta descalcificar el intercambiador."},{"id":"e2-calentador","cod":"E2","ap":"calentador","keys":["E2","E02"],"titulo":"Sensor de temperatura de entrada defectuoso","sig":"El sensor que protege al calentador de las heladas está averiado.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"a2-calentador","cod":"A2","ap":"calentador","keys":["A2"],"titulo":"Límite de gases de combustión superado (solo gas)","sig":"La temperatura de los gases de combustión es demasiado alta.","pasos":[],"sem":"ambar","llamar":"Siempre, por seguridad de la combustión. No manipules el conducto de salida de humos."},{"id":"a3-calentador","cod":"A3","ap":"calentador","keys":["A3"],"titulo":"Fallo en el cableado interno","sig":"Avería en el cableado o los conectores internos.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"a4-calentador","cod":"A4/E4","ap":"calentador","keys":["A4","E4","E04"],"titulo":"Sensor de temperatura de retorno","sig":"Fallo en el sensor que mide la temperatura de retorno del agua.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e3-calentador","cod":"E3","ap":"calentador","keys":["E3","E03"],"titulo":"Sensor de temperatura de salida de humos (solo gas)","sig":"El sensor de humos detecta una temperatura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e9-calentador","cod":"E9","ap":"calentador","keys":["E9","E09"],"titulo":"Sensor de sobrecalentamiento (ECO) en circuito abierto","sig":"El sensor de seguridad frente al sobrecalentamiento está en circuito abierto.","pasos":["Comprobar que las rejillas de ventilación del calentador no están tapadas ni obstruidas"],"sem":"verde","llamar":"Si persiste tras despejar la ventilación."},{"id":"ea-calentador","cod":"EA","ap":"calentador","keys":["EA"],"titulo":"Fallo de encendido (solo gas)","sig":"El calentador no detecta llama tras varios intentos.","pasos":["Comprobar que la llave de gas está abierta","Pulsar el rearme como máximo 3 veces"],"sem":"verde","llamar":"Si persiste tras 3 intentos, o sin esperar si hueles a gas (cerrando antes la llave)."},{"id":"e1-clima","cod":"E1","ap":"aire-acondicionado","keys":["E1","E01"],"titulo":"Fallo EEPROM de la unidad interior","sig":"Error en la memoria de la placa de la unidad interior.","pasos":["Apagar por el mando y por el diferencial durante 5 minutos","Volver a encender"],"sem":"verde","llamar":"Si persiste tras el reinicio."},{"id":"e2-clima","cod":"E2","ap":"aire-acondicionado","keys":["E2","E02"],"titulo":"Fallo de comunicación entre unidad interior y exterior","sig":"Las dos unidades no se comunican correctamente.","pasos":["Comprobar que ambas unidades reciben corriente"],"sem":"verde","llamar":"Si persiste."},{"id":"e3-clima","cod":"E3","ap":"aire-acondicionado","keys":["E3","E03"],"titulo":"Fallo en la velocidad del ventilador interior","sig":"El ventilador de la unidad interior no gira a la velocidad correcta.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e4-clima","cod":"E4","ap":"aire-acondicionado","keys":["E4","E04"],"titulo":"Sensor de temperatura de retorno de aire (unidad interior)","sig":"Fallo en el sensor que mide la temperatura del aire que entra a la unidad interior.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e5-clima","cod":"E5","ap":"aire-acondicionado","keys":["E5","E05"],"titulo":"Sensor de temperatura del evaporador (unidad interior)","sig":"Fallo en el sensor de la serpentina interior.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e6-clima","cod":"E6/EC","ap":"aire-acondicionado","keys":["E6","E06","EC"],"titulo":"Aviso de poco refrigerante","sig":"El sistema detecta una carga de refrigerante baja.","pasos":[],"sem":"ambar","llamar":"Siempre — requiere certificado de manipulación de gases fluorados, que nuestros técnicos tienen. Nunca manipules el circuito de gas refrigerante."},{"id":"e8-clima","cod":"E8","ap":"aire-acondicionado","keys":["E8","E08"],"titulo":"Sensor de temperatura ambiente de la unidad exterior","sig":"Fallo en el sensor de temperatura exterior.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"p4-clima","cod":"P4","ap":"aire-acondicionado","keys":["P4"],"titulo":"Protección repetida","sig":"Una protección de seguridad ha saltado 3 veces en 100 minutos.","pasos":["Dejar el equipo apagado al menos 30 minutos antes de volver a intentarlo"],"sem":"verde","llamar":"Si vuelve a saltar."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"},"caldera":{"id":"caldera","nombre":"Caldera","art":"una caldera","slug":"caldera"},"calentador":{"id":"calentador","nombre":"Calentador de agua","art":"un calentador","slug":"calentador"},"aire-acondicionado":{"id":"aire-acondicionado","nombre":"Aire acondicionado","art":"un aire acondicionado","slug":"aire-acondicionado"}};
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
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
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
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
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
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
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
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      /* defensa: cualquier atajo de código que haya quedado fuera de .bus-top se elimina al elegir aparato */
      $$('[data-cod]', root).forEach(function (b) { if (!b.closest('.bus-top') && !b.closest('.bus-res')) { var li = b.closest('li'); (li || b).remove(); } });
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      /* al cambiar de aparato se empieza de cero: el código anterior no se arrastra */
      input.value = ''; x.classList.remove('on'); limpia(); if (res) res.innerHTML = '';
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
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
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
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


  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'), km = z.getAttribute('data-km'); Z.set(n);
      var dist = km === 'capital' ? 'Valladolid capital' : 'a ' + km + ' km del centro de Valladolid, dentro de nuestro radio de 20 km';
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + ' · ' + dist + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="' + CONFIG.TEL_HREF + '">Llamar · ' + CONFIG.TEL + '</a>') + '</div>';
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
    /* el anillo de 20 km también responde: explica el área de actuación */
    var an = $('.anillo-20', mapa);
    if (an) {
      var radio = function () {
        zs.forEach(function (o) { o.classList.remove('on'); }); an.classList.add('on');
        info.innerHTML = '<p class="kicker">Área de actuación</p><h3>' + an.getAttribute('data-radio') + ' km a la redonda de Valladolid</h3><p>Trabajamos únicamente dentro de este círculo: Valladolid capital y los municipios a menos de 20 km del centro, todos con el mismo precio de visita: ' + CONFIG.PRECIO + ' IVA incl., descontados si reparas. Fuera del radio no damos servicio.</p>' +
          '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ') + '">' + ico('wa') + 'WhatsApp</a><a class="btn btn-ghost btn-sm" href="' + CONFIG.TEL_HREF + '">Llamar · ' + CONFIG.TEL + '</a></div>';
      };
      an.addEventListener('click', radio); an.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); radio(); } });
      zs.forEach(function (z) { z.addEventListener('click', function () { an.classList.remove('on'); }); });
    }
  }
})();
