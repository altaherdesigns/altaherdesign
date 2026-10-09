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

  /* Analytics: GA4 events. gtag() exists before gtag.js loads (it queues into dataLayer). */
  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
  }
  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var where = a.closest('[id], section, header, footer');
    var place = where ? (where.id || String(where.className || '').split(' ')[0] || where.tagName.toLowerCase()) : 'page';
    if (href.indexOf('https://wa.me/') === 0) track('whatsapp_click', { link_location: place, link_text: (a.textContent || '').trim().slice(0, 60) });
    else if (href.indexOf('tel:') === 0) track('phone_click', { link_location: place });
    else if (href.indexOf('mailto:') === 0) track('email_click', { link_location: place });
  });

  /* My villa list: on the homepage villa, visitors tick parts and photos they like, then send the whole
     list in one WhatsApp message. Kept in localStorage on this device only (60 days); when storage is
     blocked it still works for the visit. Part ids match the villa panels (#part-<id>). */
  var VL_KEY = 'atg_villa_list', VL_DAYS = 60;
  /* each part: name on the page, what goes after "I need a quote for", and the product as a list line (EN, AR) */
  var VL_PARTS = {
    entrance: [['Entrance', 'المدخل'], ['gates, fencing and side doors', 'للبوابات والأسوار والأبواب الجانبية'], ['Gates, fencing and side doors', 'البوابات والأسوار والأبواب الجانبية']],
    carshade: [['Car shade', 'مظلة السيارات'], ['a car shade', 'لمظلة سيارات'], ['Car shade', 'مظلة السيارات']],
    doors: [['Doors', 'الأبواب'], ['main and interior doors', 'للأبواب الرئيسية والداخلية'], ['Main and interior doors', 'الأبواب الرئيسية والداخلية']],
    windows: [['Windows', 'النوافذ'], ['windows', 'للنوافذ'], ['Windows', 'النوافذ']],
    balcony: [['Balcony', 'الشرفة'], ['a balcony canopy, glass and railings', 'لمظلة الشرفة وزجاجها ودرابزينها'], ['Balcony canopy, glass and railings', 'مظلة الشرفة وزجاجها ودرابزينها']],
    stairs: [['Stairs', 'الدرج'], ['stair railings', 'لدرابزين الدرج'], ['Stair railings', 'درابزين الدرج']],
    kitchen: [['Kitchen', 'المطبخ'], ['a kitchen', 'لمطبخ'], ['Kitchen', 'المطبخ']],
    wardrobes: [['Wardrobes and TV units', 'الخزائن ووحدات التلفزيون'], ['wardrobes and TV units', 'للخزائن ووحدات التلفزيون'], ['Wardrobes and TV units', 'الخزائن ووحدات التلفزيون']],
    bathroom: [['Bathroom', 'الحمام'], ['a bathroom', 'لأعمال الحمام'], ['Bathroom', 'الحمام']],
    garden: [['Garden and roof', 'الحديقة والسطح'], ['pergolas, glass rooms and shades', 'للبرجولات والغرف الزجاجية والمظلات'], ['Pergolas, glass rooms and shades', 'البرجولات والغرف الزجاجية والمظلات']]
  };
  var VL_ORDER = ['entrance', 'carshade', 'doors', 'windows', 'balcony', 'stairs', 'kitchen', 'wardrobes', 'bathroom', 'garden'];
  var L = isAr ? 1 : 0;
  var vlData = null, vlChipEl = null;
  function vlLoad() {
    if (vlData) return vlData;
    var d = null, p = {};
    try { d = JSON.parse(localStorage.getItem(VL_KEY) || 'null'); } catch (e) {}
    if (d && d.v === 1 && d.p && typeof d.p === 'object' && !(d.t && Date.now() - d.t > VL_DAYS * 864e5)) {
      VL_ORDER.forEach(function (id) {
        var ks = d.p[id];
        if (Object.prototype.toString.call(ks) === '[object Array]') {
          p[id] = ks.filter(function (k) { return typeof k === 'string' && /^[a-z0-9-]{3,90}$/.test(k); }).slice(0, 12);
        }
      });
    }
    vlData = p;
    return p;
  }
  function vlParts() { var p = vlLoad(); return VL_ORDER.filter(function (id) { return !!p[id]; }); }
  function vlPhotos() { var p = vlLoad(); return vlParts().reduce(function (n, id) { return n + p[id].length; }, 0); }
  function vlStore() {
    try {
      if (vlParts().length) localStorage.setItem(VL_KEY, JSON.stringify({ v: 1, t: Date.now(), p: vlData }));
      else localStorage.removeItem(VL_KEY);
    } catch (e) {}
  }
  function vlName(id) { return VL_PARTS[id] ? VL_PARTS[id][0][L] : id; }
  function vlTopic(id) { return VL_PARTS[id] ? VL_PARTS[id][1][L] : null; }
  function vlLine(id) { return VL_PARTS[id] ? VL_PARTS[id][2][L] : id; }
  function vlNumParts(n) { return isAr ? (n === 1 ? 'جزء واحد' : n === 2 ? 'جزآن' : n + ' أجزاء') : n + (n === 1 ? ' part' : ' parts'); }
  function vlNumPhotos(n) { return isAr ? (n === 1 ? 'صورة واحدة' : n === 2 ? 'صورتان' : n <= 10 ? n + ' صور' : n + ' صورة') : n + (n === 1 ? ' photo' : ' photos'); }
  /* one line for the booking forms: "Gates, fencing and side doors (2 photos), Kitchen" */
  function vlSummary() {
    var p = vlLoad();
    return vlParts().map(function (id) { return vlLine(id) + (p[id].length ? ' (' + vlNumPhotos(p[id].length) + ')' : ''); }).join(isAr ? '، ' : ', ');
  }

  /* WhatsApp messages name the product the visitor was looking at (owner, 9 Oct 2026).
     Same wording as the links in the HTML (Claude's tools/wa_topics.py writes those). */
  function waLink(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function waChat(t) {
    if (isAr) return t ? 'السلام عليكم، أحتاج إلى عرض سعر ' + t + '.' : 'السلام عليكم، مجموعة الطاهر';
    return t ? 'Hello Al Taher Group, I need a quote for ' + t + '.' : 'Hello Al Taher Group';
  }
  function waBook(t) {
    if (isAr) return t ? 'السلام عليكم، أحتاج إلى عرض سعر ' + t + '، وأرغب في حجز زيارة موقع مجانية.' : 'السلام عليكم، أرغب في حجز زيارة موقع مجانية.';
    return t ? 'Hello Al Taher Group, I need a quote for ' + t + '. I would like to book a free site visit.' : 'Hello Al Taher Group, I would like to book a free site visit.';
  }
  /* the homepage and the portfolio cover everything: once the visitor picks a part or a category,
     the WhatsApp button and the "Book a free site visit" buttons carry it */
  function waTopic(t) {
    $$('a[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa') === 'chat' ? waChat(t) : waBook(t)); });
  }
  /* a small link back to the list, on every page while the list has something in it */
  function vlChip(onHome, listInView) {
    var n = vlParts().length;
    if (!n || listInView) { if (vlChipEl) vlChipEl.hidden = true; return; }
    if (!vlChipEl) {
      vlChipEl = doc.createElement('a');
      vlChipEl.className = 'vlist-chip';
      vlChipEl.href = onHome ? '#villa-list' : (isAr ? '/ar/#villa-list' : '/#villa-list');
      vlChipEl.addEventListener('click', function () { track('villa_list_chip', { page: location.pathname }); });
      doc.body.appendChild(vlChipEl);
    }
    vlChipEl.textContent = (isAr ? 'قائمة فيلتي' : 'My villa list') + ' (' + n + ')';
    vlChipEl.hidden = false;
  }

  /* Photo strips: swipe on touch, buttons with a mouse or keyboard. Works as a plain scroller without JS. */
  function initStrip(strip, onFirstScroll) {
    var track_ = $('.strip__track', strip);
    var items = $$('.strip__item', strip);
    var prev = $('.strip__prev', strip), next = $('.strip__next', strip);
    var count = $('.strip__count', strip), now = $('.strip__now', strip);
    if (!track_ || items.length < 2) return;
    strip.classList.add('is-enhanced');
    [prev, next, count].forEach(function (el) { if (el) el.hidden = false; });
    var rtl = getComputedStyle(track_).direction === 'rtl';
    var current = 0, scrolled = false;
    function edge(el) { var r = el.getBoundingClientRect(); return rtl ? r.right : r.left; }
    function update() {
      var t = edge(track_), best = 0, bestD = Infinity;
      items.forEach(function (it, n) { var d = Math.abs(edge(it) - t); if (d < bestD) { bestD = d; best = n; } });
      current = best;
      if (now) now.textContent = String(current + 1);
      if (prev) prev.disabled = current === 0;
      if (next) next.disabled = current === items.length - 1;
    }
    function go(n) {
      n = Math.max(0, Math.min(items.length - 1, n));
      var delta = edge(items[n]) - edge(track_);
      track_.scrollBy({ left: delta, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { go(current - 1); });
    if (next) next.addEventListener('click', function () { go(current + 1); });
    var raf = 0;
    track_.addEventListener('scroll', function () {
      if (!scrolled) { scrolled = true; if (onFirstScroll) onFirstScroll(); }
      if (raf) return;
      raf = window.requestAnimationFrame(function () { raf = 0; update(); });
    }, { passive: true });
    track_.addEventListener('keydown', function (e) {
      var fwd = rtl ? 'ArrowLeft' : 'ArrowRight', back = rtl ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === fwd) { e.preventDefault(); go(current + 1); }
      else if (e.key === back) { e.preventDefault(); go(current - 1); }
    });
    strip._update = update;
    update();
  }

  /* The villa: ten parts, one panel each with a photo strip. All panels are in the HTML; this only toggles them. */
  var villa = $('.villa');
  if (villa) {
    var svg = $('.villa__svg', villa);
    var hotspots = $$('.hotspot', villa);
    var listBtns = $$('.villa__parts button', villa);
    var panels = $$('.part-panel', villa);
    var status = $('#villa-status');
    var order = hotspots.map(function (b) { return b.getAttribute('data-part'); });
    var ready = {};
    var armStrip = function (part) {
      if (ready[part]) { var st = $('#part-' + part + ' .strip'); if (st && st._update) st._update(); return; }
      ready[part] = true;
      var strip = $('#part-' + part + ' .strip');
      if (strip) initStrip(strip, function () { track('villa_photos_scroll', { part: part }); });
    };
    var select = function (part, fromTap, silent) {
      hotspots.concat(listBtns).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-part') === part ? 'true' : 'false'); });
      panels.forEach(function (p) { p.hidden = p.id !== 'part-' + part; });
      $$('.part', svg).forEach(function (g) { g.classList.toggle('is-selected', g.id === 'vp-' + part); });
      armStrip(part);
      waTopic(vlTopic(part));
      var panel = $('#part-' + part);
      if (status && panel && !silent) status.textContent = panel.getAttribute('aria-label');
      if (!silent) track('villa_part_open', { part: part });
      if (fromTap && window.innerWidth < 1024 && panel) {
        var r = panel.getBoundingClientRect();
        if (r.top > window.innerHeight - 120 || r.top < 0) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };
    hotspots.concat(listBtns).forEach(function (b) {
      b.addEventListener('click', function () { select(b.getAttribute('data-part'), true, false); });
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
        select(order[n], false, false);
      });
    });
    panels.forEach(function (p) {
      var part = p.id.replace('part-', '');
      p.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
        if (!a) return;
        if (a.classList.contains('strip__ask')) track('villa_photo_whatsapp', { part: part, photo: Number(a.getAttribute('data-photo')) || 0 });
        else track('villa_book_whatsapp', { part: part });
      });
    });
    /* a link to /#part-kitchen opens that part */
    var fromHash = (location.hash || '').match(/^#part-([a-z]+)$/);
    if (fromHash && $('#part-' + fromHash[1])) {
      select(fromHash[1], false, true);
      villa.scrollIntoView({ block: 'start' });
    } else {
      armStrip(order[0]);
    }
    /* My villa list: a tick on each part and under each photo; the list sits under the drawing
       (after the open panel on phones). Parts on the list turn gold in the drawing. */
    var T = isAr ? {
      head: 'قائمة فيلتي',
      hint: 'حدّد الأجزاء والصور التي تعجبك أثناء تصفحك، ثم أرسل القائمة كاملة إلينا في رسالة واتساب واحدة. تبقى القائمة على هذا الجهاز حتى تمسحها.',
      send: 'أرسل قائمتي عبر واتساب', clear: 'امسح القائمة', remove: 'إزالة', add: 'أضف إلى قائمة فيلتي', save: 'احفظ',
      flag: ' (في قائمة فيلتي)', sep: '، ', photo: 'الصورة ',
      intro: 'السلام عليكم، أحتاج إلى عرض سعر لهذه الأجزاء من فيلتي، وأرغب في حجز زيارة موقع مجانية:',
      outro: 'أعددت هذه القائمة في موقعكم.',
      removeLabel: function (n) { return 'إزالة ' + n + ' من قائمة فيلتي'; },
      added: function (n) { return 'تمت إضافة ' + n + ' إلى قائمة فيلتي.'; },
      removed: function (n) { return 'تمت إزالة ' + n + ' من قائمة فيلتي.'; },
      saved: function (i) { return 'تم حفظ الصورة ' + i + ' في قائمة فيلتي.'; },
      unsaved: function (i) { return 'تمت إزالة الصورة ' + i + ' من قائمة فيلتي.'; },
      cleared: 'أصبحت قائمة فيلتي فارغة.',
      more: function (n) { return n === 1 ? 'وصورة أخرى في قائمتي' : n === 2 ? 'وصورتان أخريان في قائمتي' : 'و' + n + (n <= 10 ? ' صور أخرى في قائمتي' : ' صورة أخرى في قائمتي'); }
    } : {
      head: 'My villa list',
      hint: 'Tick the parts and photos you like as you go, then send the whole list to us in one WhatsApp message. It stays on this device until you clear it.',
      send: 'Send my list on WhatsApp', clear: 'Clear my list', remove: 'Remove', add: 'Add to my villa list', save: 'Save',
      flag: ' (in my villa list)', sep: ', ', photo: 'Photo ',
      intro: 'Hello Al Taher Group, I need a quote for these parts of my villa, and I would like to book a free site visit:',
      outro: 'I made this list on your website.',
      removeLabel: function (n) { return 'Remove ' + n + ' from my villa list'; },
      added: function (n) { return n + ' added to my villa list.'; },
      removed: function (n) { return n + ' removed from my villa list.'; },
      saved: function (i) { return 'Photo ' + i + ' saved to my villa list.'; },
      unsaved: function (i) { return 'Photo ' + i + ' removed from my villa list.'; },
      cleared: 'My villa list is empty.',
      more: function (n) { return 'And ' + n + ' more ' + (n === 1 ? 'photo' : 'photos') + ' on my list'; }
    };
    var vlBox = doc.createElement('section');
    vlBox.className = 'vlist';
    vlBox.id = 'villa-list';
    vlBox.setAttribute('aria-labelledby', 'vlist-title');
    vlBox.innerHTML = '<div class="vlist__head"><h3 id="vlist-title" tabindex="-1"></h3><p class="vlist__count"></p></div>' +
      '<p class="vlist__hint"></p><ul class="vlist__rows"></ul>' +
      '<div class="vlist__foot"><a class="btn btn--light vlist__send" href="https://wa.me/' + WA + '" target="_blank" rel="noopener nofollow"></a>' +
      '<button type="button" class="vlist__clear"></button></div>';
    var vlTitle = $('h3', vlBox), vlCount = $('.vlist__count', vlBox), vlHint = $('.vlist__hint', vlBox);
    var vlRows = $('.vlist__rows', vlBox), vlFoot = $('.vlist__foot', vlBox);
    var vlSend = $('.vlist__send', vlBox), vlClear = $('.vlist__clear', vlBox);
    vlTitle.textContent = T.head; vlHint.textContent = T.hint; vlSend.textContent = T.send; vlClear.textContent = T.clear;
    var vlSeen = false;
    var say = function (msg) { if (status) status.textContent = msg; };
    var keyOf = function (img) { return (img.getAttribute('src') || '').replace(/^.*\//, '').replace(/-(?:160|600|1200)\.webp$/, ''); };
    var photoOf = function (id, key) {
      var items = $$('#part-' + id + ' .strip__item');
      for (var i = 0; i < items.length; i++) {
        var im = $('img', items[i]);
        if (im && keyOf(im) === key) return { n: i + 1, alt: im.alt, src: im.currentSrc || im.getAttribute('src') };
      }
      return null;
    };
    /* forget anything no longer on the page */
    (function () {
      var p = vlLoad(), changed = false;
      Object.keys(p).forEach(function (id) {
        if (!$('#part-' + id)) { delete p[id]; changed = true; return; }
        var ok = p[id].filter(function (k) { return !!photoOf(id, k); });
        if (ok.length !== p[id].length) { p[id] = ok; changed = true; }
      });
      if (changed) vlStore();
    })();
    var vlMessage = function () {
      var p = vlLoad(), out = [T.intro, ''], shown = 0, total = vlPhotos();
      vlParts().forEach(function (id, i) {
        out.push((i + 1) + '. ' + vlLine(id));
        p[id].forEach(function (k) {
          var ph = photoOf(id, k);
          if (!ph || shown >= 20) return;
          shown++;
          out.push(T.photo + ph.n + ': ' + ph.alt);
        });
      });
      if (total > shown) out.push(T.more(total - shown));
      out.push('', T.outro);
      return out.join('\n');
    };
    var vlSync = function () {
      var p = vlLoad();
      $$('input[data-vl-part]', villa).forEach(function (cb) { cb.checked = !!p[cb.getAttribute('data-vl-part')]; });
      $$('input[data-vl-photo]', villa).forEach(function (cb) {
        var ks = p[cb.getAttribute('data-vl-of')];
        cb.checked = !!(ks && ks.indexOf(cb.getAttribute('data-vl-photo')) > -1);
      });
      hotspots.forEach(function (b) {
        var id = b.getAttribute('data-part'), on = !!p[id];
        b.classList.toggle('is-saved', on);
        b.setAttribute('aria-label', vlName(id) + (on ? T.flag : ''));
      });
      listBtns.forEach(function (b) {
        var on = !!p[b.getAttribute('data-part')], flag = $('.vlist-flag', b);
        b.classList.toggle('is-saved', on);
        if (on && !flag) { flag = doc.createElement('span'); flag.className = 'visually-hidden vlist-flag'; flag.textContent = T.flag; b.appendChild(flag); }
        else if (!on && flag) b.removeChild(flag);
      });
      if (svg) $$('.part', svg).forEach(function (g) { g.classList.toggle('is-saved', !!p[g.id.replace('vp-', '')]); });
    };
    var mqDesk = window.matchMedia ? window.matchMedia('(min-width:1024px)') : null;
    var drawingCol = $('.villa__drawing', villa), panelsCol = $('.villa__panels', villa);
    var vlFit = function () {
      vlRows.style.maxHeight = '';
      if (!mqDesk || !mqDesk.matches || !drawingCol || vlRows.hidden) return;
      /* the drawing column stays in view on desktop: keep the list inside the window and scroll it */
      var top = parseFloat(getComputedStyle(drawingCol).top) || 96;
      var room = window.innerHeight - top - (drawingCol.offsetHeight - vlRows.offsetHeight) - 16;
      vlRows.style.maxHeight = Math.max(156, room) + 'px';
    };
    var vlPlace = function () {
      var target = mqDesk && mqDesk.matches ? drawingCol : panelsCol;
      if (target && vlBox.parentNode !== target) target.appendChild(vlBox);
      vlFit();
    };
    var vlRender = function () {
      var p = vlLoad(), ids = vlParts(), photos = vlPhotos();
      vlCount.textContent = ids.length ? vlNumParts(ids.length) + (photos ? T.sep + vlNumPhotos(photos) : '') : '';
      vlHint.hidden = ids.length > 0;
      vlRows.hidden = !ids.length;
      vlFoot.hidden = !ids.length;
      vlRows.innerHTML = '';
      ids.forEach(function (id) {
        var name = vlName(id);
        var li = doc.createElement('li');
        li.className = 'vlist__row';
        li.setAttribute('data-part', id);
        var open = doc.createElement('button');
        open.type = 'button'; open.className = 'vlist__name'; open.textContent = name;
        open.addEventListener('click', function () { select(id, true, false); });
        li.appendChild(open);
        if (p[id].length) {
          var th = doc.createElement('span');
          th.className = 'vlist__thumbs';
          p[id].forEach(function (k) {
            var ph = photoOf(id, k);
            if (!ph) return;
            var im = doc.createElement('img');
            im.src = ph.src; im.alt = ''; im.width = 36; im.height = 36; im.decoding = 'async';
            th.appendChild(im);
          });
          var hid = doc.createElement('span');
          hid.className = 'visually-hidden';
          hid.textContent = T.sep + vlNumPhotos(p[id].length);
          li.appendChild(th); li.appendChild(hid);
        }
        var rm = doc.createElement('button');
        rm.type = 'button'; rm.className = 'vlist__remove'; rm.textContent = T.remove;
        rm.setAttribute('aria-label', T.removeLabel(name));
        rm.addEventListener('click', function () {
          var next = li.nextElementSibling || li.previousElementSibling;
          var nextId = next && next.getAttribute('data-part');
          vlRemove(id, 'list');
          var to = nextId && $('.vlist__row[data-part="' + nextId + '"] .vlist__remove', vlBox);
          (to || vlTitle).focus();
        });
        li.appendChild(rm);
        vlRows.appendChild(li);
      });
      vlSend.href = waLink(vlMessage());
      vlSync();
      vlFit();
      vlChip(true, vlSeen);
    };
    var vlAdd = function (id, key) {
      var p = vlLoad();
      if (!p[id]) p[id] = [];
      if (key && p[id].indexOf(key) < 0) p[id].push(key);
      vlStore(); vlRender();
      var ph = key ? photoOf(id, key) : null;
      say(ph ? T.saved(ph.n) : T.added(vlName(id)));
      track('villa_list_add', { part: id, photo: ph ? ph.n : 0 });
    };
    var vlRemove = function (id, from, key) {
      var p = vlLoad();
      if (!p[id]) return;
      var ph = key ? photoOf(id, key) : null;
      if (key) p[id] = p[id].filter(function (k) { return k !== key; });
      else delete p[id];
      vlStore(); vlRender();
      say(ph ? T.unsaved(ph.n) : T.removed(vlName(id)));
      track('villa_list_remove', { part: id, photo: ph ? ph.n : 0, from: from });
    };
    var tick = function (cls, text, hidden) {
      var lab = doc.createElement('label'), cb = doc.createElement('input'), t = doc.createElement('span');
      lab.className = 'vlist-check ' + cls;
      cb.type = 'checkbox';
      t.textContent = text;
      lab.appendChild(cb); lab.appendChild(t);
      if (hidden) { var h = doc.createElement('span'); h.className = 'visually-hidden'; h.textContent = hidden; lab.appendChild(h); }
      return { label: lab, box: cb };
    };
    panels.forEach(function (panel) {
      var id = panel.id.replace('part-', '');
      if (!VL_PARTS[id]) return;
      var body = $('.part-panel__body', panel), acts = body && $('.actions', body);
      if (acts) {
        var tp = tick('vlist-check--part', T.add, ' (' + vlName(id) + ')');
        tp.box.setAttribute('data-vl-part', id);
        tp.box.addEventListener('change', function () { if (tp.box.checked) vlAdd(id, null); else vlRemove(id, 'panel'); });
        body.insertBefore(tp.label, acts);
      }
      $$('.strip__item', panel).forEach(function (it) {
        var im = $('img', it), cap = $('figcaption', it), ask = $('.strip__ask', it);
        if (!im || !cap || !ask) return;
        var key = keyOf(im);
        var tq = tick('strip__save', T.save, ': ' + im.alt);
        tq.box.setAttribute('data-vl-photo', key);
        tq.box.setAttribute('data-vl-of', id);
        tq.box.addEventListener('change', function () { if (tq.box.checked) vlAdd(id, key); else vlRemove(id, 'photo', key); });
        var row = doc.createElement('span');
        row.className = 'strip__acts';
        cap.insertBefore(row, ask);
        row.appendChild(tq.label); row.appendChild(ask);
        cap.classList.add('has-acts');
      });
    });
    vlClear.addEventListener('click', function () {
      var n = vlParts().length;
      vlData = {};
      vlStore(); vlRender();
      say(T.cleared);
      vlTitle.focus();
      track('villa_list_clear', { parts: n });
    });
    vlSend.addEventListener('click', function () { track('villa_list_send', { parts: vlParts().length, photos: vlPhotos() }); });
    vlPlace();
    vlRender();
    if (mqDesk) {
      if (mqDesk.addEventListener) mqDesk.addEventListener('change', vlPlace);
      else if (mqDesk.addListener) mqDesk.addListener(vlPlace);
    }
    var fitRaf = 0;
    window.addEventListener('resize', function () {
      if (fitRaf) return;
      fitRaf = window.requestAnimationFrame(function () { fitRaf = 0; vlFit(); });
    });
    /* on the homepage the link back only shows once the villa band is out of view */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { vlSeen = en[0].isIntersecting; vlChip(true, vlSeen); }).observe(villa);
    }
    /* another tab changed the list */
    window.addEventListener('storage', function (e) { if (e.key === VL_KEY) { vlData = null; vlRender(); } });
    /* /#villa-list (the link back from other pages) opens on the list */
    if (location.hash === '#villa-list') {
      var toList = function () { vlBox.scrollIntoView({ block: 'start' }); };
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(toList); else toList();
    }

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

  /* Photo strips outside the villa (service pages) */
  $$('.strip').forEach(function (st) {
    if (st.closest('.villa')) return;
    var name = st.getAttribute('data-part') || 'strip';
    initStrip(st, function () { track('photos_scroll', { strip: name }); });
    st.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a.strip__ask');
      if (a) track('photo_whatsapp', { strip: name, photo: Number(a.getAttribute('data-photo')) || 0 });
    });
  });

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
      /* the first line names what they need: "I need a quote for a kitchen. I would like to book a free site visit." */
      var pv = part ? part.value : '', topic = null;
      if (pv === 'whole') topic = isAr ? 'لفيلتي كاملة' : 'my whole villa';
      else if (VL_PARTS[pv]) topic = vlTopic(pv);
      var lines = [waBook(topic), (isAr ? 'الاسم: ' : 'Name: ') + name.value.trim()];
      if (phone && phone.value.trim()) lines.push((isAr ? 'الهاتف: ' : 'Phone: ') + phone.value.trim());
      if (details && details.value.trim()) lines.push((isAr ? 'التفاصيل: ' : 'Details: ') + details.value.trim());
      var vls = vlSummary();
      if (vls) lines.push((isAr ? 'قائمة فيلتي: ' : 'My villa list: ') + vls);
      track('whatsapp_click', { link_location: form.closest('[id]') ? form.closest('[id]').id : 'form', link_text: 'booking form' });
      openWhatsApp(lines.join('\n'));
    });
  });

  /* Portfolio: filters and a native dialog for larger photos */
  var PF_TOPIC = {
    gates: ['gates', 'للبوابات'], 'alu-doors': ['aluminium doors', 'لأبواب الألمنيوم'], 'wpc-doors': ['WPC doors', 'لأبواب WPC'],
    'wooden-doors': ['wooden doors', 'للأبواب الخشبية'], windows: ['windows', 'للنوافذ'], railings: ['railings', 'للدرابزين'],
    pergolas: ['pergolas and car shades', 'للبرجولات ومظلات السيارات'], balconies: ['balcony canopies and glass', 'لمظلات الشرفات وزجاجها'],
    kitchens: ['a kitchen', 'لمطبخ'], bathrooms: ['a bathroom', 'لأعمال الحمام'], interiors: ['interior joinery', 'لأعمال النجارة الداخلية']
  };
  var grid = $('.work-grid');
  if (grid) {
    var items = $$('.work-item', grid);
    var count = $('#workCount');
    var filterBtns = $$('.filters button');
    var applyFilter = function (cat) {
      var btn = filterBtns.filter(function (b) { return b.getAttribute('data-filter') === cat; })[0];
      if (!btn) return false;
      var shown = 0;
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      items.forEach(function (it) {
        var on = cat === 'all' || it.getAttribute('data-cat') === cat;
        it.hidden = !on; if (on) shown++;
      });
      if (count) count.textContent = shown;
      waTopic(PF_TOPIC[cat] ? PF_TOPIC[cat][L] : null);
      /* on phones the categories are one sideways row: bring the chosen one into view */
      var row = btn.parentNode;
      if (row && row.scrollWidth > row.clientWidth) {
        var r = btn.getBoundingClientRect(), rr = row.getBoundingClientRect();
        row.scrollBy({ left: (r.left + r.width / 2) - (rr.left + rr.width / 2), behavior: 'auto' });
      }
      return true;
    };
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        applyFilter(cat);
        track('portfolio_filter', { category: cat });
        /* keep the choice in the address so it can be shared, without adding history entries */
        try { history.replaceState(null, '', cat === 'all' ? location.pathname : '#' + cat); } catch (e) {}
      });
    });
    /* /portfolio/#kitchens opens on that category */
    var startCat = (location.hash || '').replace('#', '');
    if (startCat && applyFilter(startCat)) {
      var fl = $('.filters'), hdr = $('.site-header');
      var jump = function () { if (fl) window.scrollTo(0, Math.max(0, fl.getBoundingClientRect().top + window.pageYOffset - (hdr ? hdr.offsetHeight : 72) - 12)); };
      /* wait for the web fonts, which change the height of the text above the filters */
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(jump); else jump();
    }
    window.addEventListener('hashchange', function () { applyFilter((location.hash || '#all').replace('#', '')); });
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
          track('portfolio_photo_open', { category: it.getAttribute('data-cat') });
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

  /* FAQ answers are native <details>; note which questions people open */
  $$('details.faq').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) { var q = $('summary', d); track('faq_open', { question: q ? q.textContent.trim().slice(0, 90) : '' }); }
    });
  });

  /* every other page: a small link back to the villa list while it has something in it */
  if (!villa) {
    vlChip(false, false);
    window.addEventListener('storage', function (e) { if (e.key === VL_KEY) { vlData = null; vlChip(false, false); } });
  }
})();
