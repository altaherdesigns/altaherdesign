/* ============================================
   AL TAHER GROUP — main.js
   altaherdesign.com
   ============================================ */

/* ---- NAV SCROLL ---- */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- MOBILE NAV ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
hamburger?.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

/* ---- LANGUAGE TOGGLE ---- */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    if (lang === 'ar') window.location.href = '/ar/';
    else window.location.href = '/';
  });
});

/* ---- AUDIENCE TABS ---- */
document.querySelectorAll('.audience-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.audience-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.audience-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

/* ---- PORTFOLIO FILTER + MASONRY ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const countEl = document.getElementById('portfolioCount');

function updateCount() {
  const visible = [...portfolioItems].filter(i => i.style.display !== 'none').length;
  if (countEl) countEl.textContent = `${visible} projects`;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    portfolioItems.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.style.display = '';
        item.style.animation = 'fadeUp 0.3s ease both';
      } else {
        item.style.display = 'none';
      }
    });
    updateCount();
  });
});
updateCount();

/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCat = document.getElementById('lbCat');
const lbName = document.getElementById('lbName');
let currentIdx = 0;
let visibleItems = [];

function getVisible() {
  return [...portfolioItems].filter(i => i.style.display !== 'none');
}

function openLightbox(idx) {
  visibleItems = getVisible();
  currentIdx = idx;
  showLbItem(currentIdx);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLbItem(idx) {
  const item = visibleItems[idx];
  if (!item) return;
  lbImg.src = item.querySelector('img').src;
  lbCat.textContent = item.dataset.cat;
  lbName.textContent = item.dataset.name;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
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
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') { currentIdx=(currentIdx+1)%visibleItems.length; showLbItem(currentIdx); }
  if (e.key === 'ArrowLeft') { currentIdx=(currentIdx-1+visibleItems.length)%visibleItems.length; showLbItem(currentIdx); }
});

/* ---- FLOATING WHATSAPP TOGGLE ---- */
const waToggle = document.getElementById('waToggle');
const waPopup = document.getElementById('waPopup');
waToggle?.addEventListener('click', () => waPopup.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!e.target.closest('.wa-float')) waPopup?.classList.remove('open');
});

/* ---- SMOOTH SCROLL NAV ACTIVE ---- */
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const id = e.target.id;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.style.color = e.isIntersecting ? 'var(--teal)' : '';
  });
}, { threshold: 0.3 });
sections.forEach(s => observer.observe(s));

/* ---- QUOTE FORM ---- */
const quoteForm = document.getElementById('quoteForm');
quoteForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name = quoteForm.querySelector('[name="name"]').value;
  const service = quoteForm.querySelector('[name="service"]').value;
  const msg = quoteForm.querySelector('[name="message"]').value;
  const phone = encodeURIComponent(
    `Hello Al Taher Group, my name is ${name}. I'm interested in: ${service}. ${msg}`
  );
  window.open(`https://wa.me/971506499697?text=${phone}`, '_blank');
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, suffix='') {
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
