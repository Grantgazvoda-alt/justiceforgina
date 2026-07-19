(() => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.primary-nav');

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
