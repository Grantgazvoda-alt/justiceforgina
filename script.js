(() => {
  document.documentElement.dataset.siteVersion = '9';
  document.body.classList.add('v9-active');

  const publicEmail = 'info@justiceforgina.org';
  const personalEmailPattern = /garrisongazvoda3@gmail\.com/gi;
  const personalPhonePatterns = [
    /\(203\)\s*695[-\s]?1721/g,
    /203[-\s]?695[-\s]?1721/g,
    /\+1\s*203[-\s]?695[-\s]?1721/g
  ];

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (personalEmailPattern.test(href)) {
      link.setAttribute('href', href.replace(personalEmailPattern, publicEmail));
      personalEmailPattern.lastIndex = 0;
    }
    if (personalEmailPattern.test(link.textContent || '')) {
      link.textContent = (link.textContent || '').replace(personalEmailPattern, publicEmail);
      personalEmailPattern.lastIndex = 0;
    }
  });

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const text = link.textContent || '';
    const isPersonalPhone = href.includes('12036951721') || href.includes('2036951721') || personalPhonePatterns.some((pattern) => pattern.test(text));
    personalPhonePatterns.forEach((pattern) => { pattern.lastIndex = 0; });
    if (isPersonalPhone) link.remove();
  });

  document.querySelectorAll('body *:not(script):not(style)').forEach((node) => {
    if (node.children.length || !node.textContent) return;
    let text = node.textContent.replace(personalEmailPattern, publicEmail);
    personalEmailPattern.lastIndex = 0;
    personalPhonePatterns.forEach((pattern) => {
      text = text.replace(pattern, '');
      pattern.lastIndex = 0;
    });
    node.textContent = text.replace(/\b(?:Phone|Telephone):\s*$/i, '').trim();
  });

  const nav = document.querySelector('.primary-nav');
  if (nav && !nav.id) nav.id = 'primary-nav';

  const existingLinks = nav ? Array.from(nav.querySelectorAll('a')) : [];
  const homeLink = existingLinks.find((link) => /index\.html(?:$|[?#])/.test(link.getAttribute('href') || ''));
  const homeHref = homeLink?.getAttribute('href') || 'index.html';
  const prefix = homeHref.slice(0, Math.max(0, homeHref.length - 'index.html'.length));
  const currentPage = document.body.dataset.page || '';

  const routes = [
    ['index.html', 'Home', 'home'],
    ['case-status.html', 'Case Status', 'case-status'],
    ['evidence.html', 'Evidence', 'evidence'],
    ['timeline.html', 'Timeline', 'timeline'],
    ['gina-gazvoda.html', 'Gina', 'gina'],
    ['press.html', 'Press', 'press'],
    ['funding.html', 'Funding', 'funding']
  ];

  if (nav) {
    nav.replaceChildren();
    routes.forEach(([route, label, page]) => {
      const link = document.createElement('a');
      link.href = `${prefix}${route}`;
      link.textContent = label;
      if (currentPage === page || (!currentPage && route === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
      nav.append(link);
    });
    const support = document.createElement('a');
    support.className = 'nav-support';
    support.href = 'https://www.gofundme.com/f/justice-for-gina-exposing-murder-fraud-coverup';
    support.target = '_blank';
    support.rel = 'noopener noreferrer';
    support.textContent = 'Help Fund the Work';
    nav.append(support);
  }

  document.querySelectorAll('.brand-copy small').forEach((node) => {
    node.textContent = 'Follow the verified record';
  });

  let menuButton = document.querySelector('.menu-button');
  if (!menuButton && nav?.parentElement) {
    menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-controls', nav.id);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span></span><span></span><span></span><span class="sr-only">Open menu</span>';
    nav.parentElement.insertBefore(menuButton, nav);
  }

  const menuLabel = menuButton?.querySelector('.sr-only');
  const navLinks = () => nav ? Array.from(nav.querySelectorAll('a')) : [];
  const setMenuLabel = (open) => {
    if (!menuButton) return;
    const label = open ? 'Close menu' : 'Open menu';
    menuButton.setAttribute('aria-label', label);
    if (menuLabel) menuLabel.textContent = label;
  };
  const closeMenu = (restoreFocus = false) => {
    if (!menuButton || !nav) return;
    const wasOpen = nav.classList.contains('open');
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    setMenuLabel(false);
    if (restoreFocus && wasOpen) menuButton.focus();
  };
  const openMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.add('open');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    setMenuLabel(true);
    requestAnimationFrame(() => navLinks()[0]?.focus());
  };

  if (menuButton && nav) {
    setMenuLabel(false);
    menuButton.addEventListener('click', () => nav.classList.contains('open') ? closeMenu(true) : openMenu());
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (!nav.classList.contains('open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [menuButton, ...navLinks()];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu(false);
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const searchInput = document.getElementById('archive-search');
  const categorySelect = document.getElementById('archive-category');
  const statusSelect = document.getElementById('archive-status');
  const archiveItems = Array.from(document.querySelectorAll('.archive-item'));
  const resultCount = document.getElementById('archive-count');
  const noResults = document.getElementById('archive-no-results');
  const normalize = (value) => String(value || '').trim().toLowerCase();
  const filterArchive = () => {
    if (!archiveItems.length) return;
    const query = normalize(searchInput?.value);
    const category = categorySelect?.value || 'all';
    const status = statusSelect?.value || 'all';
    let visible = 0;
    archiveItems.forEach((item) => {
      const categoryMatch = category === 'all' || item.dataset.category === category;
      const statusMatch = status === 'all' || item.dataset.status === status;
      const queryMatch = !query || normalize(item.textContent).includes(query);
      const show = categoryMatch && statusMatch && queryMatch;
      item.hidden = !show;
      if (show) visible += 1;
    });
    if (resultCount) resultCount.textContent = `${visible} ${visible === 1 ? 'record' : 'records'} shown`;
    if (noResults) noResults.classList.toggle('visible', visible === 0);
  };
  [searchInput, categorySelect, statusSelect].forEach((control) => {
    if (!control) return;
    control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', filterArchive);
  });
  filterArchive();
})();
