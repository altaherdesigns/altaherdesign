/* Al Taher Group: main.js. Small, dependency free. */
(function () {
  'use strict';
  var doc = document;
  var WA = '971506499697';
  var isAr = doc.documentElement.lang === 'ar';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function openWhatsApp(text) {
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
    var w = window.open(url, '_blank', 'noopener');
    if (!w) { window.location.href = url; }
  }

  /* Menu (below 1080px) */
  var toggle = $('.menu-toggle');
  var menu = $('#site-menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.hidden = !open;
    doc.body.classList.toggle('menu-open', open);
    if (open) { var first = $('a', menu); if (first) first.focus(); }
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1080 && !menu.hidden) setMenu(false); });
  }

  /* Language choice: remembered only when the visitor picks it (never navigator.language) */
  $$('[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () { try { localStorage.setItem('atg_lang', a.getAttribute('data-lang')); } catch (e) {} });
  });

  /* The villa: six parts, one panel each. All panels are in the HTML; this only toggles them. */
  var villa = $('.villa');
  if (villa) {
    var svg = $('.villa__svg', villa);
    var hotspots = $$('.hotspot', villa);
    var listBtns = $$('.villa__parts button', villa);
    var panels = $$('.part-panel', villa);
    var order = hotspots.map(function (b) { return b.getAttribute('data-part'); });
    var select = function (part, fromTap) {
      hotspots.concat(listBtns).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-part') === part ? 'true' : 'false'); });
      panels.forEach(function (p) { p.hidden = p.id !== 'part-' + part; });
      $$('.part', svg).forEach(function (g) { g.classList.toggle('is-selected', g.id === 'vp-' + part); });
      if (fromTap && window.innerWidth < 1024) {
        var panel = $('#part-' + part);
        if (panel) {
          var r = panel.getBoundingClientRect();
          if (r.top > window.innerHeight - 120 || r.top < 0) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
      }
    };
    hotspots.concat(listBtns).forEach(function (b) {
      b.addEventListener('click', function () { select(b.getAttribute('data-part'), b.classList.contains('hotspot') || b.closest('.villa__parts')); });
    });
    hotspots.forEach(function (b, i) {
      b.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') n = (i + 1) % hotspots.length;
        else if (k === 'ArrowLeft' || k === 'ArrowUp') n = (i - 1 + hotspots.length) % hotspots.length;
        else if (k === 'Home') n = 0;
        else if (k === 'End') n = hotspots.length - 1;
        if (n === null) return;
        e.preventDefault();
        hotspots[n].focus();
        select(order[n], false);
      });
    });
    /* Draw the lines in once when the band comes into view. Static when motion is reduced. */
    if (svg && !reduceMotion && 'IntersectionObserver' in window) {
      svg.classList.add('js-draw');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { svg.classList.add('is-drawing'); io.disconnect(); }
        });
      }, { threshold: 0.25 });
      io.observe(svg);
    }
  }

  /* WhatsApp booking forms */
  $$('form[data-wa-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name, phone = form.elements.phone, part = form.elements.part, details = form.elements.details;
      var err = $('.form-error', form);
      if (!name.value.trim()) {
        name.setAttribute('aria-invalid', 'true');
        if (err) { err.hidden = false; }
        name.focus();
        return;
      }
      name.removeAttribute('aria-invalid');
      if (err) err.hidden = true;
      var lines = isAr
        ? ['السلام عليكم، أرغب في حجز زيارة موقع مجانية.', 'الاسم: ' + name.value.trim()]
        : ['Hello Al Taher Group, I would like to book a free site visit.', 'Name: ' + name.value.trim()];
      if (phone && phone.value.trim()) lines.push((isAr ? 'الهاتف: ' : 'Phone: ') + phone.value.trim());
      if (part && part.value) lines.push((isAr ? 'جزء الفيلا: ' : 'Part of the villa: ') + part.value);
      if (details && details.value.trim()) lines.push((isAr ? 'التفاصيل: ' : 'Details: ') + details.value.trim());
      openWhatsApp(lines.join('\n'));
    });
  });

  /* Portfolio: filters and a native dialog for larger photos */
  var grid = $('.work-grid');
  if (grid) {
    var items = $$('.work-item', grid);
    var count = $('#workCount');
    $$('.filters button').forEach(function (btn, _, all) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter'), shown = 0;
        all.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        items.forEach(function (it) {
          var on = cat === 'all' || it.getAttribute('data-cat') === cat;
          it.hidden = !on; if (on) shown++;
        });
        if (count) count.textContent = shown;
      });
    });
    var box = $('#lightbox');
    if (box && typeof box.showModal === 'function') {
      var img = $('img', box), cap = $('.lightbox__caption', box), idx = 0, visible = [];
      var show = function (i) {
        idx = (i + visible.length) % visible.length;
        var b = $('button', visible[idx]);
        img.src = b.getAttribute('data-full');
        img.alt = $('img', b).alt;
        cap.textContent = $('span', b) ? $('span', b).textContent : '';
      };
      items.forEach(function (it) {
        $('button', it).addEventListener('click', function () {
          visible = items.filter(function (x) { return !x.hidden; });
          show(visible.indexOf(it));
          box.showModal();
        });
      });
      $('.lightbox__close', box).addEventListener('click', function () { box.close(); });
      $('.lightbox__prev', box).addEventListener('click', function () { show(idx - 1); });
      $('.lightbox__next', box).addEventListener('click', function () { show(idx + 1); });
      box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lightbox__inner')) box.close(); });
      box.addEventListener('keydown', function (e) {
        var fwd = isAr ? 'ArrowLeft' : 'ArrowRight', back = isAr ? 'ArrowRight' : 'ArrowLeft';
        if (e.key === fwd) show(idx + 1);
        if (e.key === back) show(idx - 1);
      });
    }
  }

  /* FAQ accordions on the contact page */
  $$('.faq-item').forEach(function (item) {
    var q = $('.faq-q', item);
    if (!q) return;
    var flip = function () {
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    q.addEventListener('click', flip);
    q.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  });
})();
