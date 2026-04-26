/* ─────────────────────────────────────────
   CiviBIM — script.js
   ───────────────────────────────────────── */

// ── Nav: scroll state ──────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Nav: hamburger toggle ──────────────
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── Footer year ───────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Intersection Observer: fade-up ────
const fadeTargets = document.querySelectorAll(
  '.problem-card, .training-module, .process-step, .outcome-card, ' +
  '.vision-node, .hero__stats .stat, .cta__form'
);

fadeTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.children].filter(c =>
        c.classList.contains('fade-up')
      );
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeTargets.forEach(el => observer.observe(el));

// ── Hero particles ────────────────────
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const x    = Math.random() * 100;
    const y    = Math.random() * 100;
    const dur  = Math.random() * 12 + 8;
    const del  = Math.random() * 6;
    const op   = Math.random() * 0.25 + 0.05;

    Object.assign(p.style, {
      position:        'absolute',
      width:           `${size}px`,
      height:          `${size}px`,
      borderRadius:    '50%',
      left:            `${x}%`,
      top:             `${y}%`,
      background:      `rgba(26,111,216,${op})`,
      animation:       `float-particle ${dur}s ${del}s ease-in-out infinite alternate`,
      pointerEvents:   'none',
    });
    container.appendChild(p);
  }

  // Inject keyframes once
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-particle {
      0%   { transform: translate(0, 0); opacity: var(--op, .12); }
      100% { transform: translate(${rand(-40,40)}px, ${rand(-40,40)}px); opacity: var(--op, .05); }
    }
    #hero-particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  `;
  document.head.appendChild(style);

  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
})();

// ── Form handling ─────────────────────
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation
  let valid = true;
  const required = form.querySelectorAll('[required]');

  required.forEach(field => {
    field.classList.remove('error');
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }
    // email check
    if (field.type === 'email' && field.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        field.classList.add('error');
        valid = false;
      }
    }
  });

  if (!valid) {
    const firstError = form.querySelector('.error');
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstError?.focus();
    return;
  }

  // Simulate submission (replace with real endpoint)
  const btn = form.querySelector('#form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'flex';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 900);
});

// Remove error state on input
form.addEventListener('input', (e) => {
  if (e.target.classList.contains('error')) {
    e.target.classList.remove('error');
  }
});

// ── Active nav link on scroll ─────────
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchorLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'white';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));
