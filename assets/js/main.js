/* ============================================
   AL TAHER GROUP — main.js
   Shared logic across all pages
   ============================================ */

/* ---- NAV SCROLL ---- */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---- MOBILE NAV ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- LANGUAGE TOGGLE ----
   Auto-detection runs inline in <head> before render to avoid flash.
   This handles user-initiated switching. */
document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    localStorage.setItem('atg_lang', lang);
    const current = window.location.pathname;
    let target;
    if (lang === 'ar') {
      target = current.startsWith('/ar') ? current : '/ar' + current;
    } else {
      target = current.startsWith('/ar') ? current.replace(/^\/ar/, '') || '/' : current;
    }
    window.location.href = target;
  });
});

/* ---- AUDIENCE TABS (services page) ---- */
document.querySelectorAll('.audience-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.audience-tab').forEach(t => t.classList.toggle('active', t === tab));
    document.querySelectorAll('.audience-content').forEach(c => {
      c.classList.toggle('active', c.dataset.tab === target);
    });
  });
});

/* ---- PORTFOLIO FILTER (portfolio page) ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const countEl = document.getElementById('portfolioCount');

function getVisible() {
  return Array.from(portfolioItems).filter(i => i.style.display !== 'none');
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    filterBtns.forEach(b => b.classList.toggle('active', b === btn));
    let shown = 0;
    portfolioItems.forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    if (countEl) countEl.textContent = shown;
  });
});

/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let visibleItems = [];
let currentIdx = 0;

function openLightbox(idx) {
  visibleItems = getVisible();
  currentIdx = idx;
  showLbItem(currentIdx);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function showLbItem(idx) {
  const item = visibleItems[idx];
  if (!item || !lbImg) return;
  const img = item.querySelector('img');
  lbImg.src = img.src;
  if (lbCaption) lbCaption.textContent = item.dataset.caption || '';
}

portfolioItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    visibleItems = getVisible();
    const idx = visibleItems.indexOf(item);
    openLightbox(idx >= 0 ? idx : 0);
  });
});

document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
document.getElementById('lbPrev')?.addEventListener('click', () => {
  currentIdx = (currentIdx - 1 + visibleItems.length) % visibleItems.length;
  showLbItem(currentIdx);
});
document.getElementById('lbNext')?.addEventListener('click', () => {
  currentIdx = (currentIdx + 1) % visibleItems.length;
  showLbItem(currentIdx);
});
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') { currentIdx=(currentIdx+1)%visibleItems.length; showLbItem(currentIdx); }
  if (e.key === 'ArrowLeft')  { currentIdx=(currentIdx-1+visibleItems.length)%visibleItems.length; showLbItem(currentIdx); }
});

/* ---- FLOATING WHATSAPP ---- */
const waToggle = document.getElementById('waToggle');
const waPopup = document.getElementById('waPopup');
waToggle?.addEventListener('click', e => {
  e.stopPropagation();
  waPopup.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!e.target.closest('.wa-float')) waPopup?.classList.remove('open');
});

/* ---- QUOTE FORM — all pages ---- */
/* Routes to the correct WhatsApp number based on service selection.
   Falls back to mailto: if window.open is blocked.                 */
function routeFormService(service) {
  const s = (service || '').toLowerCase();
  if (/gate|door|fabricat|powder|weld|lchid|bab|bawab|لحام|معدن|طلاء|بواب|باب/.test(s)) {
    return '971544463447'; // Sales & Operations
  }
  if (/railing|درابزين|pergola|برجول|مظل/.test(s)) {
    return '971506499697'; // Marketing & Operations
  }
  return '971506705015'; // General Manager (kitchen, aluminium, glass, facade, etc.)
}

document.querySelectorAll('form[id="quoteForm"]').forEach(quoteForm => {
  quoteForm.addEventListener('submit', e => {
    e.preventDefault();
    const isAr = document.documentElement.lang === 'ar';
    const nameEl  = quoteForm.querySelector('[name="name"]');
    const phoneEl = quoteForm.querySelector('[name="phone"]');
    const svcEl   = quoteForm.querySelector('[name="service"]');
    const msgEl   = quoteForm.querySelector('[name="message"]');

    const name    = nameEl?.value?.trim()  || '';
    const phone   = phoneEl?.value?.trim() || '';
    const service = svcEl?.value  || '';
    const msg     = msgEl?.value?.trim()  || '';

    if (!name) { nameEl?.focus(); return; }
    if (!service) { svcEl?.focus(); return; }

    const number = routeFormService(service);
    const greeting = isAr ? 'السلام عليكم' : 'Hello Al Taher Group';
    const intro    = isAr
      ? `${greeting}، اسمي ${name}. الخدمة المطلوبة: ${service}.${phone ? ' رقم التواصل: '+phone+'.' : ''} ${msg}`
      : `${greeting}, my name is ${name}. Service needed: ${service}.${phone ? ' My number: '+phone+'.' : ''} ${msg}`;

    const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(intro.trim())}`;

    // Try window.open; fall back to direct location change if blocked
    const w = window.open(waUrl, '_blank');
    if (!w || w.closed || typeof w.closed === 'undefined') {
      window.location.href = waUrl;
    }
  });
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.hero-stats, .why-inner').forEach(el => statsObserver.observe(el));

/* ---- REVEAL ON SCROLL ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- FAQ ACCORDION ---- */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

/* ---- ANIMATION SAFETY NET ----
   Checks after 800ms (after all delays finish) whether any animated elements
   are still invisible. Forces them visible if so — handles Windows with
   "Show animations" disabled and any other animation-blocking scenario. */
setTimeout(function() {
  document.querySelectorAll('.fade-up').forEach(function(el) {
    if (parseFloat(window.getComputedStyle(el).opacity) < 0.5) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
    }
  });
  document.querySelectorAll('.reveal').forEach(function(el) {
    if (parseFloat(window.getComputedStyle(el).opacity) < 0.5) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
    }
  });
}, 800);
