(() => {
  document.documentElement.dataset.siteVersion = '9';
  document.body.classList.add('v9-active');

  const nav = document.querySelector('.primary-nav');
  const hasCaseStatusLink = nav
    ? Array.from(nav.querySelectorAll('a')).some((link) => {
        const href = link.getAttribute('href') || '';
        return href.split(/[?#]/)[0].endsWith('case-status.html');
      })
    : false;

  // Upgrade preserved top-level pages without adding broken duplicate links to nested routes.
  if (nav && !hasCaseStatusLink) {
    const home = Array.from(nav.querySelectorAll('a')).find((link) => {
      const href = link.getAttribute('href') || '';
      return href.split(/[?#]/)[0].endsWith('index.html');
    });
    const homeHref = home?.getAttribute('href') || 'index.html';
    const prefix = homeHref.slice(0, Math.max(0, homeHref.length - 'index.html'.length));
    const caseLink = document.createElement('a');
    caseLink.href = `${prefix}case-status.html`;
    caseLink.textContent = 'Case Status';
    if (document.body.dataset.page === 'case-status') {
      caseLink.classList.add('active');
      caseLink.setAttribute('aria-current', 'page');
    }
    if (home?.nextSibling) nav.insertBefore(caseLink, home.nextSibling);
    else nav.prepend(caseLink);
  }

  document.querySelectorAll('.brand-copy small').forEach((node) => {
    if (/seeking truth through evidence/i.test(node.textContent || '')) node.textContent = 'Follow the record';
  });
  document.querySelectorAll('.footer-bottom span').forEach((node) => {
    if (/V[4-8]/.test(node.textContent || '')) node.textContent = (node.textContent || '').replace(/V[4-8]/g, 'V9');
  });
  document.querySelectorAll('.eyebrow').forEach((node) => {
    if (/EVIDENCE INTELLIGENCE\s*·\s*V[4-8]/i.test(node.textContent || '')) node.textContent = 'EVIDENCE INTELLIGENCE · V9';
    if (/EVIDENCE-LINKED CHRONOLOGY\s*·\s*V[4-8]/i.test(node.textContent || '')) node.textContent = 'SOURCE-CONTROLLED CHRONOLOGY · V9';
  });

  const menuButton = document.querySelector('.menu-button');
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
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

  const normalize = (value) => value.trim().toLowerCase();
  const filterArchive = () => {
    if (!archiveItems.length) return;
    const query = normalize(searchInput?.value || '');
    const category = categorySelect?.value || 'all';
    const status = statusSelect?.value || 'all';
    let visible = 0;

    archiveItems.forEach((item) => {
      const haystack = normalize(item.textContent || '');
      const categoryMatch = category === 'all' || item.dataset.category === category;
      const statusMatch = status === 'all' || item.dataset.status === status;
      const queryMatch = !query || haystack.includes(query);
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
