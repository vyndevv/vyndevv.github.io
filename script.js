/* =========================================
   VYNDEV — Core Script
   ========================================= */

/* -----------------------------------------------------------------------
   LANGUAGE SYSTEM
   ----------------------------------------------------------------------- */
let currentLang = localStorage.getItem('vyn-lang') || 'en';

/** Translate a key */
function tr(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || key;
}

/** Apply translations to all [data-i18n] elements */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = tr(key);
    if (!val || val === key) return;

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  // Lang button shows the OTHER language
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = currentLang === 'fr' ? 'EN' : 'FR';

  // html[lang]
  document.documentElement.lang = currentLang;
}

/** Toggle FR ↔ EN */
function toggleLang() {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  localStorage.setItem('vyn-lang', currentLang);
  applyTranslations();

  // Let each page re-render dynamic content
  if (typeof onLangChange === 'function') onLangChange();
}

/* -----------------------------------------------------------------------
   HELPER — detect relative base path (root vs projects/ subfolder)
   ----------------------------------------------------------------------- */
function getBasePath() {
  const path = window.location.pathname.replace(/\\/g, '/');
  return path.includes('/projects/') ? '../' : '';
}

function getActivePage() {
  const path = window.location.pathname.replace(/\\/g, '/').toLowerCase();
  if (path.endsWith('projects.html'))    return 'projects';
  if (path.endsWith('about.html'))       return 'about';
  if (path.endsWith('contact.html'))     return 'contact';
  if (path.includes('/projects/'))       return 'projects';
  return 'home';
}

/* -----------------------------------------------------------------------
   NAVBAR INJECTION
   ----------------------------------------------------------------------- */
function initNav() {
  const base   = getBasePath();
  const active = getActivePage();

  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.id = 'mainNav';
  navbar.innerHTML = `
    <div class="nav-container">
      <a href="${base}index.html" class="nav-logo" id="navLogo">
        <span class="logo-badge"></span>
        VynDev
      </a>

      <div class="nav-links">
        <a href="${base}index.html"    class="${active === 'home'     ? 'active' : ''}" data-i18n="nav.home">Home</a>
        <a href="${base}projects.html" class="${active === 'projects' ? 'active' : ''}" data-i18n="nav.projects">Projects</a>
        <a href="${base}about.html"    class="${active === 'about'    ? 'active' : ''}" data-i18n="nav.about">About</a>
        <a href="${base}contact.html"  class="${active === 'contact'  ? 'active' : ''}" data-i18n="nav.contact">Contact</a>
      </div>

      <div class="nav-actions">
        <button class="lang-btn" id="langBtn" onclick="toggleLang()">FR</button>
        <div class="nav-divider"></div>
        <a href="https://github.com/vyndevv" target="_blank" rel="noopener" class="nav-icon" title="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://discord.gg/sUQR89VY" target="_blank" rel="noopener" class="nav-icon" title="Discord">
          <i class="fab fa-discord"></i>
        </a>
        <a href="mailto:pro.vyn7@gmail.com" class="nav-icon" title="Email">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  `;

  document.body.insertBefore(navbar, document.body.firstChild);

  // Scrolled effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* -----------------------------------------------------------------------
   FOOTER INJECTION
   ----------------------------------------------------------------------- */
function initFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-container">
      <p class="footer-copy">© 2026 VynDev — <span data-i18n="footer.rights">All rights reserved.</span></p>
      <div class="footer-socials">
        <a href="https://github.com/vyndevv" target="_blank" rel="noopener" class="footer-social-link" title="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://discord.gg/sUQR89VY" target="_blank" rel="noopener" class="footer-social-link" title="Discord">
          <i class="fab fa-discord"></i>
        </a>
        <a href="mailto:pro.vyn7@gmail.com" class="footer-social-link" title="Email">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

/* -----------------------------------------------------------------------
   PROJECT CARD FACTORY
   ----------------------------------------------------------------------- */
/**
 * @param {object} project  - entry from PROJECTS array
 * @param {string} basePath - '' for root pages, '../' for projects/ pages
 */
function createProjectCard(project, basePath) {
  const base      = (basePath !== undefined) ? basePath : getBasePath();
  const title     = currentLang === 'fr' ? project.titleFr : project.titleEn;
  const desc      = currentLang === 'fr' ? project.descFr  : project.descEn;
  const statusKey = project.status === 'active' ? 'status.active' : 'status.completed';
  const pageUrl   = base + project.page;

  // Use a <div> so we can nest a real <a> for the demo link without invalid HTML
  const card = document.createElement('div');
  card.className = 'project-card fade-in';
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => { window.location.href = pageUrl; });

  // Demo pill (stops the card click from also firing)
  let demoPill = '';
  if (project.demoUrl) {
    const demoUrl = project.demoUrl.startsWith('http')
      ? project.demoUrl
      : base + project.demoUrl;
    const label = tr('project.demo_card');
    demoPill = `
      <a href="${demoUrl}" target="_blank" rel="noopener"
         class="card-demo-btn"
         title="${label}"
         onclick="event.stopPropagation()">
        <i class="fas fa-external-link-alt"></i> ${label}
      </a>`;
  }

  card.innerHTML = `
    <div class="project-card-image">
      <img src="${base}${project.image}" alt="${title}" loading="lazy">
    </div>
    <div class="project-card-content">
      <h3 class="project-card-title">${title}</h3>
      <p class="project-card-description">${desc}</p>
      <div class="project-tags">
        ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
    <div class="project-card-footer">
      <span class="project-status ${project.status}" data-i18n="${statusKey}">${tr(statusKey)}</span>
      <div class="card-footer-right">
        ${demoPill}
        <span class="project-arrow">→</span>
      </div>
    </div>
  `;

  return card;
}

/* -----------------------------------------------------------------------
   PROJECT DETAIL PAGE — inject demo / github buttons from config
   ----------------------------------------------------------------------- */
/**
 * Reads data-project-id on <body>, finds the matching PROJECTS entry,
 * then injects GitHub and/or demo buttons into .project-detail-meta
 */
function initProjectPage() {
  const projectId = document.body.getAttribute('data-project-id');
  if (!projectId || typeof PROJECTS === 'undefined') return;

  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const meta = document.querySelector('.project-detail-meta');
  if (!meta) return;

  const base = getBasePath();

  // Add a thin divider before action buttons
  let hasAction = project.github || project.demoUrl;
  if (hasAction) {
    const hr = document.createElement('div');
    hr.style.cssText = 'height:1px;background:var(--border);margin:4px 0';
    meta.appendChild(hr);
  }

  // GitHub button
  if (project.github) {
    const wrap = document.createElement('div');
    wrap.className = 'meta-item';
    wrap.innerHTML = `
      <a href="${project.github}" target="_blank" rel="noopener"
         class="meta-action-btn secondary" id="projectGithubBtn">
        <i class="fab fa-github"></i>
        <span data-i18n="project.github">${tr('project.github')}</span>
      </a>`;
    meta.appendChild(wrap);
  }

  // Demo button
  if (project.demoUrl) {
    const demoUrl = project.demoUrl.startsWith('http')
      ? project.demoUrl
      : base + project.demoUrl;
    const wrap = document.createElement('div');
    wrap.className = 'meta-item';
    wrap.innerHTML = `
      <a href="${demoUrl}" target="_blank" rel="noopener"
         class="meta-action-btn" id="projectDemoBtn">
        <i class="fas fa-external-link-alt"></i>
        <span data-i18n="project.demo">${tr('project.demo')}</span>
      </a>`;
    meta.appendChild(wrap);
  }
}

/* -----------------------------------------------------------------------
   SCROLL ANIMATIONS
   ----------------------------------------------------------------------- */
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* -----------------------------------------------------------------------
   RE-OBSERVE after dynamic inject (for project cards added after DOMContentLoaded)
   ----------------------------------------------------------------------- */
function observeNewCards() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

/* -----------------------------------------------------------------------
   CONTACT FORM
   ----------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('#formName').value.trim();
    const email   = form.querySelector('#formEmail').value.trim();
    const message = form.querySelector('#formMessage').value.trim();

    if (!name || !email || !message) return;

    // Build mailto link
    const subject  = encodeURIComponent(`Portfolio contact — ${name}`);
    const body     = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:pro.vyn7@gmail.com?subject=${subject}&body=${body}`;

    // Show success message
    const successEl = document.getElementById('formSuccess');
    if (successEl) {
      successEl.textContent = tr('contact.form.success');
      successEl.classList.add('show');
      form.reset();
      setTimeout(() => successEl.classList.remove('show'), 5000);
    }
  });
}

/* -----------------------------------------------------------------------
   BOOT
   ----------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFooter();
  applyTranslations();
  initAnimations();
  initContactForm();
  initProjectPage();  // No-op on non-project pages
});
