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

      document.title = `${record.title} | Justice for Gina`;
      setText('record-title', record.title);
      setText('record-summary', record.summary);
      setText('record-id', record.record_id);
      setText('record-type', humanize(record.record_type));
      setText('source-class', humanize(record.source_class));
      setText('verification-status', humanize(record.verification_status));
      setText('publication-status', humanize(record.publication_status));
      setText('sensitivity-class', humanize(record.sensitivity_class));
      setText('source-name', record.source_name);
      setText('provenance-notes', record.provenance?.notes);
      setText('acquired-at', formatDate(record.provenance?.acquired_at));
      setText('publication-authority', record.publication_authority);
      setText('redaction-notes', record.redaction_notes);
      setText('related-people', record.related_people?.join(', '), 'None listed');
      setText('related-events', record.related_events?.map(humanize).join(', '), 'None listed');

      const citations = document.getElementById('page-citations');
      if (citations) {
        citations.textContent = record.page_citations?.length
          ? record.page_citations.map((citation) => `Page ${citation.page}${citation.label ? ` — ${citation.label}` : ''}`).join('; ')
          : 'No page-level citations have been published for this record yet.';
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
        if (record.source_url && record.publication_status === 'public') {
          sourceLink.href = record.source_url;
          sourceLink.hidden = false;
        } else {
          sourceLink.hidden = true;
        }
      }

      if (errorBox) errorBox.hidden = true;
      if (content) content.hidden = false;
    })
    .catch(() => showError());
})();
