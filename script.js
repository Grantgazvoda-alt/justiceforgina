const button = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');

if (button && nav) {
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.focus();
    }
  });
}

// Add the designated family press contact to the Press card.
const pressCard = Array.from(document.querySelectorAll('.media-cards article'))
  .find((card) => card.querySelector('span')?.textContent.trim() === 'PRESS');

if (pressCard && !pressCard.querySelector('.press-contact')) {
  const contact = document.createElement('div');
  contact.className = 'press-contact';
  contact.innerHTML = `
    <hr>
    <p><strong>Press Contact</strong><br>
    Garrison Gazvoda, son of Gina Gazvoda<br>
    <a href="tel:+12036951721">203-695-1721</a><br>
    <a href="mailto:GarrisonGazvoda3@gmail.com">GarrisonGazvoda3@gmail.com</a></p>`;
  pressCard.appendChild(contact);
}

// Publish a curated, verified document index. Full medical files remain restricted
// because they contain private health information and unrelated personal identifiers.
const recordsSection = document.querySelector('#records .shell');
const archiveRule = document.querySelector('#records .archive-rule');

if (recordsSection && archiveRule && !document.getElementById('public-document-index')) {
  const library = document.createElement('section');
  library.id = 'public-document-index';
  library.className = 'document-library reveal visible';
  library.setAttribute('aria-labelledby', 'document-library-title');
  library.innerHTML = `
    <div class="section-heading centered">
      <p class="eyebrow">PUBLIC DOCUMENT INDEX</p>
      <h2 id="document-library-title">Verified records and case materials</h2>
      <p>These materials were selected for public review because they are relevant to the documented timeline and case presentation. Each opens from the family's source archive.</p>
    </div>
    <div class="record-grid">
      <article>
        <span class="record-icon">PDF</span>
        <h3>Key Evidence — Gina Gazvoda</h3>
        <p>Curated case-evidence packet assembled for structured review.</p>
        <a class="button secondary" href="https://drive.google.com/file/d/1SWQ6q0FsSvhHSXLVkuil2mI0NJHJkXpN/view" target="_blank" rel="noopener noreferrer">Open document</a>
      </article>
      <article>
        <span class="record-icon">DOC</span>
        <h3>Gina Gazvoda Case Presentation</h3>
        <p>Organized case overview prepared for attorneys, journalists, advocates, and qualified reviewers.</p>
        <a class="button secondary" href="https://drive.google.com/file/d/1urm8H1ssXVctMahTUHlAG0zqjc9fLdXq/view" target="_blank" rel="noopener noreferrer">Open document</a>
      </article>
      <article>
        <span class="record-icon">DOC</span>
        <h3>Gina Gazvoda Case Timeline</h3>
        <p>Chronological case material supporting review of events and related records.</p>
        <a class="button secondary" href="https://drive.google.com/file/d/1OIlIwi6ALz5aR4--1feJJMPpnvlZcoGd/view" target="_blank" rel="noopener noreferrer">Open document</a>
      </article>
      <article>
        <span class="record-icon">PDF</span>
        <h3>Signature Expert Report</h3>
        <p>Expert analysis concerning signatures relevant to the family's document concerns.</p>
        <a class="button secondary" href="https://drive.google.com/file/d/1Ov5NTnpiqCVDF3toUhkibTNPr5Ec-2WX/view" target="_blank" rel="noopener noreferrer">Open document</a>
      </article>
      <article>
        <span class="record-icon">DOC</span>
        <h3>Affidavit V3</h3>
        <p>Affidavit maintained in the family's legal and evidentiary archive.</p>
        <a class="button secondary" href="https://drive.google.com/file/d/1DAznRufZmvykJ4OLbImipEg5RL565uz-/view" target="_blank" rel="noopener noreferrer">Open document</a>
      </article>
      <article>
        <span class="record-icon">🔒</span>
        <h3>Medical-record archive</h3>
        <p>Full medical records are preserved for authorized legal and expert review but are not posted publicly because they contain private health information and unrelated identifiers.</p>
        <span class="status protected">Restricted review</span>
      </article>
    </div>
    <div class="archive-rule">
      <strong>Publication standard:</strong> Public inclusion does not replace independent authentication or legal analysis. Readers should evaluate each record in context and avoid publishing private information contained in source files.
    </div>`;
  archiveRule.insertAdjacentElement('afterend', library);
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
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
