// ════════════════════════════════════════════════════
// THEME TOGGLE (persisted)
// ════════════════════════════════════════════════════
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}
}

(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (e) {}
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }
})();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ════════════════════════════════════════════════════
// MOBILE NAV TOGGLE
// ════════════════════════════════════════════════════
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ════════════════════════════════════════════════════
// NAVBAR ACTIVE LINK ON SCROLL
// ════════════════════════════════════════════════════
const sections = document.querySelectorAll('main .section, .hero');
const navLinkEls = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(sec => navObserver.observe(sec));

// ════════════════════════════════════════════════════
// SCROLL REVEAL
// ════════════════════════════════════════════════════
document.querySelectorAll(
  '.about-grid, .exp-card, .skill-card, .project-card, .edu-card, .achieve-col, .contact-grid, .stat-card'
).forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ════════════════════════════════════════════════════
// TYPED ROLE TEXT IN HERO
// ════════════════════════════════════════════════════
const roles = [
  'Full-Stack Developer',
  'Data Analyst',
  'Machine Learning Enthusiast',
  'Problem Solver'
];
const typedEl = document.getElementById('typed-role');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeRole() {
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 1600);
      return;
    }
    setTimeout(typeRole, 55);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeRole, 300);
      return;
    }
    setTimeout(typeRole, 28);
  }
}

if (typedEl) setTimeout(typeRole, 500);

// ════════════════════════════════════════════════════
// NAVBAR BACKGROUND ON SCROLL (subtle shadow)
// ════════════════════════════════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 6px 24px rgba(0,0,0,.18)' : 'none';
});

// ════════════════════════════════════════════════════
// CONTACT FORM (client-side demo handling)
// ════════════════════════════════════════════════════
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = '#e85d3f';
      formStatus.textContent = 'Please fill in all fields.';
      return;
    }

    formStatus.style.color = 'var(--accent2)';
    formStatus.textContent = 'Sending…';

    setTimeout(() => {
      formStatus.textContent = `Thanks, ${name}! I'll get back to you at ${email} soon.`;
      contactForm.reset();
    }, 700);
  });
}
