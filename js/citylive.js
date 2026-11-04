/* Pagina di City Live su city-live.it (4/11/2026).
   · I blocchi compaiono mentre si scorre.
   · Il telefono disegnato in apertura cambia città ogni pochi secondi, per far
     capire che l'app è una sola e le città sono tante. Si ferma quando il
     puntatore è sopra, quando la scheda non è visibile e per chi ha chiesto
     al sistema di ridurre le animazioni.
   Nessun conteggio e nessuna connessione verso terzi. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var ridotto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // comparsa dei blocchi
  var blocchi = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || ridotto) {
    for (var k = 0; k < blocchi.length; k++) blocchi[k].classList.add('in');
  } else {
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) { v.target.classList.add('in'); io.unobserve(v.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    for (var j = 0; j < blocchi.length; j++) io.observe(blocchi[j]);
  }

  // il telefono che cambia città
  var nome = document.querySelector('[data-citta-nome]');
  var lista = document.querySelector('[data-citta-lista]');
  var tel = document.querySelector('.tel');
  if (!nome || !lista || !tel || ridotto) return;

  var ICONE = {
    musica: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    mostra: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 8"/>',
    farmacia: '<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"/>',
    teatro: '<path d="M4 4h16v6a8 8 0 0 1-16 0z"/><path d="M9 9h.01M15 9h.01M9.5 13a3.5 3.5 0 0 0 5 0"/>',
    festa: '<path d="M5 21 9 9l6 6-12 6z"/><path d="M14 4l1 2M19 9l2-1M17 3l-1 3M20 14l-2-.5"/>',
    bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 18v3M16 18v3M8 14.5h.01M16 14.5h.01"/>',
    stella: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    cuore: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'
  };
  var CITTA = [
    { nome: "L'Aquila", eventi: [
      ['c1', 'musica', 'Jazz sotto i portici', '21:00 · Centro storico', 'live', 'Live ora'],
      ['c2', 'mostra', 'Mostra di fotografia', 'Fino a domenica · Museo', 'giorni', 'Più giorni'],
      ['c3', 'farmacia', 'Farmacia di turno', 'Aperta adesso · 600 m', 'servizio', 'Servizio']
    ] },
    { nome: 'Lanciano', eventi: [
      ['c1', 'teatro', 'Commedia a teatro', '21:15 · Centro', 'live', 'Live ora'],
      ['c2', 'festa', "Sagra d'autunno", 'Sabato e domenica · Piazza', 'giorni', 'Più giorni'],
      ['c3', 'bus', 'Bus per la costa', 'Linee e fermate · Stazione', 'servizio', 'Servizio']
    ] },
    { nome: 'La tua città', eventi: [
      ['c1', 'stella', 'Il prossimo evento', 'Stasera · Vicino a te', 'live', 'Live ora'],
      ['c2', 'cuore', 'I posti che ami', 'Salvati nei preferiti', 'giorni', 'Preferiti'],
      ['c3', 'farmacia', 'I servizi di ogni giorno', 'Farmacie, bus, rifiuti', 'servizio', 'Servizio']
    ] }
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function disegna(c) {
    var html = '';
    for (var i = 0; i < c.eventi.length; i++) {
      var e = c.eventi[i];
      html += '<li><span class="s-img ' + e[0] + '"><svg viewBox="0 0 24 24">' + ICONE[e[1]] + '</svg></span>' +
        '<span class="s-txt"><b>' + esc(e[2]) + '</b><small>' + esc(e[3]) + '</small>' +
        '<span class="s-badge ' + e[4] + '">' + esc(e[5]) + '</span></span></li>';
    }
    lista.innerHTML = html;
    nome.textContent = c.nome;
  }

  var indice = 0, fermo = false, timer = null;
  function avanti() {
    if (fermo || document.hidden) return;
    indice = (indice + 1) % CITTA.length;
    lista.classList.add('via');
    nome.parentNode.style.opacity = '0.35';
    setTimeout(function () {
      disegna(CITTA[indice]);
      lista.classList.remove('via');
      nome.parentNode.style.opacity = '';
    }, 360);
  }
  timer = setInterval(avanti, 3800);
  tel.addEventListener('mouseenter', function () { fermo = true; });
  tel.addEventListener('mouseleave', function () { fermo = false; });
})();
