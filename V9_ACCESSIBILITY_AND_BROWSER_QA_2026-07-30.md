# Justice for Gina V9 — Accessibility and Browser QA Ledger

**Date:** July 30, 2026  
**Candidate branch:** `integration/v9-seo-dns-2026-07-30`  
**Target release:** August 2, 2026  
**Status:** Deterministic controls implemented; visual browser review remains open.

## Deterministic accessibility controls completed

- Every recursively checked HTML page must have one document title, one H1, and `lang="en"`.
- Duplicate element IDs fail QA.
- Images without `alt` attributes fail QA.
- Links opened in a new tab without `rel="noopener"` fail QA.
- Broken, case-sensitive, repository-escaping, and root-relative local references fail QA.
- A visible skip link is present on primary pages and becomes visible when focused.
- Sitewide `:focus-visible` outlines are defined for links, buttons, form controls, text areas, and focusable elements.
- Search and select controls receive an additional visible focus border and focus ring.
- The mobile menu uses `aria-controls` and synchronizes `aria-expanded`.
- The mobile menu's accessible label changes between “Open menu” and “Close menu.”
- Opening the mobile menu transfers focus to the first navigation link.
- Escape closes an open mobile menu and restores focus to the menu button.
- Tab and Shift+Tab cycle through the open mobile navigation and menu button.
- Resizing above the mobile breakpoint closes the fixed mobile menu state.
- The reduced-motion media query disables smooth scrolling, transition duration, and animation duration and exposes reveal content without animation.
- JavaScript syntax is checked by the integration workflow.

## Responsive controls reviewed in source

- Primary navigation changes to a fixed vertical menu at widths below 980 pixels.
- Major V9 grids collapse from multi-column layouts to two columns and then one column.
- Hero, proof, status, archive, timeline, funding, support, footer, and action sections have mobile-specific layout rules.
- Primary action buttons become full-width on narrow screens.
- The release-status strip permits horizontal overflow rather than forcing clipped text.
- Print rules remove navigation and decorative elements and switch content to high-contrast black-on-white output.

## Color and contrast source review

The core palette uses near-black backgrounds with off-white text, light muted text, and bright gold, blue, green, purple, and red status accents. No page relies on color alone: status labels, headings, proof-versus-limit headings, and explanatory text accompany color distinctions.

This source review does not replace pixel-level contrast measurement against every rendered gradient, transparency layer, browser font rendering, and interaction state.

## Manual browser checks still required

The following must be completed on the final deployable commit in an actual browser:

### Desktop

- Chrome or Chromium at 1280 and 1440 pixel widths.
- Firefox at a common desktop width.
- Safari or WebKit where available.
- Page zoom at 200 percent without loss of content or controls.
- Keyboard-only navigation from the address bar through every primary page.
- Visible focus on header, cards, buttons, filters, record links, footer links, and external links.
- No focus obscured behind the sticky header.
- Record viewer loads every structured record ID.
- External links open safely and intentionally.

### Mobile

- 320, 375, 390, and 430 pixel widths.
- Mobile menu open, close, Escape, Tab, Shift+Tab, link activation, and rotation or resize behavior.
- No horizontal page overflow beyond the intentionally scrollable release strip.
- Cards, headings, status pills, tables or fact sheets, audio controls, and forms fit without clipping.
- Tap targets are practical and not overlapped.

### Assistive behavior

- Screen-reader announcement of the menu button label and expanded state.
- Skip-link destination works on every primary route.
- Archive result count changes are perceivable through the existing status region or are revised if testing shows they are not announced.
- Heading order remains understandable beyond the deterministic single-H1 check.
- Link text is understandable out of context.
- Audio content has an adequate transcript or equivalent accessible information if published.

### Motion and display

- Operating-system reduced-motion setting suppresses reveal motion and smooth scrolling.
- Forced-colors or high-contrast mode retains visible controls and focus.
- Dark-mode rendering matches the declared dark color scheme.
- Print preview is readable and excludes navigation-only controls.

## Privacy review still required

- Visually inspect all public pages for addresses, telephone numbers, dates of birth, account numbers, signatures, email addresses, medical identifiers, source-device details, and unnecessary third-party names.
- Confirm that every Drive link is intentionally public and points only to an approved derivative or public-safe source.
- Confirm that no restricted pleading, medical record, unredacted report, private witness material, or internal work product is reachable through a public link.
- Confirm that page source, JSON, JSON-LD, comments, metadata, and image URLs do not expose restricted information.

## Current disposition

- Deterministic accessibility and route controls: **implemented**.
- Source-level responsive and reduced-motion review: **completed**.
- Manual rendered-browser review: **open**.
- Human privacy and sensitive-information review: **open**.
- No claim is made that WCAG conformance is complete until rendered testing and issue remediation are finished.
