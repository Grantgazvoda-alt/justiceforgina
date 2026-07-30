(() => {
  document.documentElement.dataset.siteVersion = '8';
  document.body.classList.add('v8-active');

  // Upgrade shared navigation without rewriting every preserved public page.
  const nav = document.querySelector('.primary-nav');
  if (nav && !nav.querySelector('a[href="case-status.html"]')) {
    const home = nav.querySelector('a[href="index.html"]');
    const caseLink = document.createElement('a');
    caseLink.href = 'case-status.html';
    caseLink.textContent = 'Case Status';
    if (document.body.dataset.page === 'case-status') {
      caseLink.classList.add('active');
      caseLink.setAttribute('aria-current', 'page');
    }
    if (home?.nextSibling) nav.insertBefore(caseLink, home.nextSibling);
    else nav.prepend(caseLink);
  }

  if (nav && !nav.querySelector('a[href="gina-gazvoda.html"]')) {
    const home = nav.querySelector('a[href="index.html"]');
    const ginaLink = document.createElement('a');
    ginaLink.href = 'gina-gazvoda.html';
    ginaLink.textContent = 'Gina';
    if (document.body.dataset.page === 'gina') {
      ginaLink.classList.add('active');
      ginaLink.setAttribute('aria-current', 'page');
    }
    if (home?.nextSibling) nav.insertBefore(ginaLink, home.nextSibling);
    else nav.prepend(ginaLink);
  }

  document.querySelectorAll('.brand-copy small').forEach((node) => {
    if (/seeking truth through evidence/i.test(node.textContent || '')) node.textContent = 'Follow the record';
  });
  document.querySelectorAll('.footer-bottom span').forEach((node) => {
    if (/V4|V5|V6|V7/.test(node.textContent || '')) node.textContent = (node.textContent || '').replace(/V[4-7]/g, 'V8');
  });
  document.querySelectorAll('.eyebrow').forEach((node) => {
    if (/EVIDENCE INTELLIGENCE\s*·\s*V4/i.test(node.textContent || '')) node.textContent = 'EVIDENCE INTELLIGENCE · V8';
  });

  // Keep publisher and official social identity visible across preserved legacy pages.
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

  // Add a shared identity graph to legacy pages that do not already define it.
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
