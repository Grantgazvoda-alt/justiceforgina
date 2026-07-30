(() => {
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('id');
  const errorBox = document.getElementById('record-error');
  const content = document.getElementById('record-content');

  const setText = (id, value, fallback = 'Not listed') => {
    const node = document.getElementById(id);
    if (node) node.textContent = value || fallback;
  };

  const humanize = (value) => (value || '').replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  const formatDate = (value) => {
    if (!value) return 'Not listed';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };

  const fillList = (id, values, fallback) => {
    const list = document.getElementById(id);
    if (!list) return;
    list.replaceChildren();
    const items = Array.isArray(values) && values.length ? values : [fallback];
    items.forEach((value) => {
      const item = document.createElement('li');
      item.textContent = value;
      list.appendChild(item);
    });
  };

  const showError = () => {
    if (errorBox) errorBox.hidden = false;
    if (content) content.hidden = true;
    setText('record-title', 'Evidence record not found');
    setText('record-summary', 'Return to the evidence archive and choose an available structured record.');
  };

  if (!requestedId) {
    showError();
    return;
  }

  fetch('data/public-evidence.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`Evidence index unavailable: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const record = data.records?.find((item) => item.record_id === requestedId);
      if (!record) {
        showError();
        return;
      }

      document.title = `${record.title} | Justice for Gina V9`;
      setText('record-title', record.title);
      setText('record-summary', record.summary);
      setText('record-id', record.record_id);
      setText('record-type', humanize(record.record_type));
      setText('source-class', humanize(record.source_class));
      setText('verification-status', humanize(record.verification_status));
      setText('publication-status', humanize(record.publication_status));
      setText('sensitivity-class', humanize(record.sensitivity_class));
      setText('record-source-chip', humanize(record.source_class));
      setText('record-verification-chip', humanize(record.verification_status));
      setText('source-name', record.source_name);
      setText('provenance-notes', record.provenance?.notes);
      setText('acquired-at', formatDate(record.provenance?.acquired_at));
      setText('publication-authority', record.publication_authority, 'Public-safe metadata and summary under the V9 evidence controls.');
      setText('redaction-notes', record.redaction_notes, 'Restricted originals and unnecessary private identifiers remain outside the public repository.');
      setText('related-claims', record.related_claims?.map(humanize).join(', '), 'None listed');
      setText('related-events', record.related_events?.map(humanize).join(', '), 'None listed');

      fillList('record-establishes', record.establishes, 'No affirmative proposition is listed.');
      fillList('record-does-not-establish', record.does_not_establish, 'No additional limit is listed.');
      fillList('records-needed', record.records_needed, 'No additional record is listed.');

      const citations = document.getElementById('page-citations');
      if (citations) {
        citations.textContent = record.page_citations?.length
          ? record.page_citations.map((citation) => `Page ${citation.page}${citation.label ? ` — ${citation.label}` : ''}`).join('; ')
          : 'No page-level citations have been published for this summary yet; consult the linked public module and controlled source archive.';
      }

      const revisionHistory = document.getElementById('revision-history');
      if (revisionHistory) {
        revisionHistory.replaceChildren();
        (record.revision_history || []).forEach((revision) => {
          const entry = document.createElement('p');
          entry.textContent = `${formatDate(revision.changed_at)} — ${revision.change_summary}${revision.changed_by_role ? ` (${revision.changed_by_role})` : ''}`;
          revisionHistory.appendChild(entry);
        });
        if (!record.revision_history?.length) revisionHistory.textContent = 'No public revisions recorded.';
      }

      const sourceLink = document.getElementById('source-link');
      if (sourceLink) {
        const destination = record.route || record.source_url;
        if (destination && !['withheld', 'restricted-reviewer'].includes(record.publication_status)) {
          sourceLink.href = destination;
          sourceLink.hidden = false;
          const isExternal = /^https?:\/\//i.test(destination);
          if (isExternal) {
            sourceLink.target = '_blank';
            sourceLink.rel = 'noopener noreferrer';
            sourceLink.textContent = 'Open approved source';
          } else {
            sourceLink.removeAttribute('target');
            sourceLink.removeAttribute('rel');
            sourceLink.textContent = 'Open public summary';
          }
        } else {
          sourceLink.hidden = true;
        }
      }

      if (errorBox) errorBox.hidden = true;
      if (content) content.hidden = false;
    })
    .catch(() => showError());
})();
