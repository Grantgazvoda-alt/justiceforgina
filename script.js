(() => {
  document.documentElement.dataset.siteVersion = '9';
  document.body.classList.add('v9-active');

  const nav = document.querySelector('.primary-nav');
  const links = () => (nav ? Array.from(nav.querySelectorAll('a')) : []);
  const hasRoute = (route) => links().some((link) => {
    const href = link.getAttribute('href') || '';
    return href.split(/[?#]/)[0].endsWith(route);
  });
  const home = links().find((link) => {
    const href = link.getAttribute('href') || '';
    return href.split(/[?#]/)[0].endsWith('index.html');
  });
  const homeHref = home?.getAttribute('href') || 'index.html';
  const prefix = homeHref.slice(0, Math.max(0, homeHref.length - 'index.html'.length));

  const insertRoute = (route, label, page, afterRoute) => {
    if (!nav || hasRoute(route)) return;
    const link = document.createElement('a');
    link.href = `${prefix}${route}`;
    link.textContent = label;
    if (document.body.dataset.page === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
    const after = links().find((candidate) => {
      const href = candidate.getAttribute('href') || '';
      return href.split(/[?#]/)[0].endsWith(afterRoute);
    });
    if (after?.nextSibling) nav.insertBefore(link, after.nextSibling);
    else nav.prepend(link);
  };

  insertRoute('gina-gazvoda.html', 'Gina', 'gina', 'index.html');
  insertRoute('case-status.html', 'Case Status', 'case-status', hasRoute('gina-gazvoda.html') ? 'gina-gazvoda.html' : 'index.html');

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

  const footerGrid = document.querySelector('.footer-grid');
  if (footerGrid) {
    const identityColumn = footerGrid.firstElementChild;
    if (identityColumn && !/Publisher:\s*Grant Gazvoda/i.test(identityColumn.textContent || '')) {
      const publisher = document.createElement('p');
      publisher.className = 'publisher-credit';
      publisher.innerHTML = '<strong>Publisher:</strong> Grant Gazvoda';
      identityColumn.append(publisher);
    }
    const socialColumn = footerGrid.lastElementChild;
    if (socialColumn && !socialColumn.querySelector('a[href="https://www.tiktok.com/tag/justiceforgina"]')) {
      const social = document.createElement('p');
      social.className = 'publisher-social';
      social.innerHTML = '<a href="https://www.tiktok.com/@c5corvetteguy" rel="noopener noreferrer" target="_blank">TikTok @c5corvetteguy</a><br/><a href="https://www.tiktok.com/tag/justiceforgina" rel="noopener noreferrer" target="_blank">#JusticeForGina</a>';
      socialColumn.append(social);
    }
  }

  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !/Published by Grant Gazvoda/i.test(footerBottom.textContent || '')) {
    const publisherLine = document.createElement('span');
    publisherLine.textContent = 'Published by Grant Gazvoda · #JusticeForGina';
    footerBottom.append(publisherLine);
  }

  const schemaScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  const hasPublisherSchema = schemaScripts.some((node) => /#grant-gazvoda/.test(node.textContent || ''));
  if (!hasPublisherSchema) {
    const identitySchema = document.createElement('script');
    identitySchema.type = 'application/ld+json';
    identitySchema.dataset.siteIdentitySchema = 'true';
    identitySchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://justiceforgina.org/#website',
          name: 'Justice for Gina',
          alternateName: ['#JusticeForGina', 'Gina Marie Gazvoda public record project'],
          url: 'https://justiceforgina.org/',
          publisher: { '@id': 'https://justiceforgina.org/#grant-gazvoda' },
          about: { '@id': 'https://justiceforgina.org/#gina-gazvoda' },
          sameAs: ['https://www.tiktok.com/@c5corvetteguy', 'https://www.tiktok.com/tag/justiceforgina']
        },
        {
          '@type': 'Person',
          '@id': 'https://justiceforgina.org/#grant-gazvoda',
          name: 'Grant Gazvoda',
          jobTitle: 'Publisher',
          sameAs: ['https://www.tiktok.com/@c5corvetteguy']
        },
        {
          '@type': 'Person',
          '@id': 'https://justiceforgina.org/#gina-gazvoda',
          name: 'Gina Marie Gazvoda',
          alternateName: 'Gina Gazvoda',
          url: 'https://justiceforgina.org/gina-gazvoda.html'
        }
      ]
    });
    document.head.append(identitySchema);
  }

  const menuButton = document.querySelector('.menu-button');
  const menuLabel = menuButton?.querySelector('.sr-only');
  const setMenuLabel = (isOpen) => {
    if (!menuButton) return;
    const label = isOpen ? 'Close menu' : 'Open menu';
    menuButton.setAttribute('aria-label', label);
    if (menuLabel) menuLabel.textContent = label;
  };
  const closeMenu = ({ restoreFocus = false } = {}) => {
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
    window.requestAnimationFrame(() => links()[0]?.focus());
  };

  if (menuButton && nav) {
    setMenuLabel(false);
    menuButton.addEventListener('click', () => {
      if (nav.classList.contains('open')) closeMenu({ restoreFocus: true });
      else openMenu();
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', (event) => {
      if (!nav.classList.contains('open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [menuButton, ...links()];
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
      if (window.innerWidth > 980) closeMenu();
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
