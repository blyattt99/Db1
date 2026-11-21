import fs from 'node:fs';
import vm from 'node:vm';

const SRC = 'DB.136.html';
const OUT = 'DB.137.html';

let html = fs.readFileSync(SRC, 'utf8');

function replaceUnique(label, target, replacement) {
  const idx = html.indexOf(target);
  if (idx === -1) {
    throw new Error(`Pattern not found [${label}]: ${target.slice(0, 120)}`);
  }
  const second = html.indexOf(target, idx + target.length);
  if (second !== -1) {
    throw new Error(`Pattern matched multiple times [${label}]: ${target.slice(0, 120)}`);
  }
  html = html.slice(0, idx) + replacement + html.slice(idx + target.length);
}

// =========================================================================
// PHASE 1 & 2 — BRANDING, PREMIUM TOPBAR, VIEWS DROPDOWN & NAVIGATION
// =========================================================================

// 1. Update document title & dropzone copy cleanly
replaceUnique(
  'title-db137',
  '<title>DEBOOGER2K | Project Studio — DB.136</title>',
  '<title>DEBOOGER2K | Project Studio — DB.137</title>'
);

replaceUnique(
  'dropzone-copy-db137',
  '<p class="dropzone-upload-help">Open HTML, React, ZIP, or project files. DEBOOGER DB.136</p>',
  '<p class="dropzone-upload-help">Open HTML, React, ZIP, or project files. DEBOOGER DB.137</p>'
);

// 2. Inject Phase 1 & 2 CSS right before </head>
const db137Styles = `<style id="db137-redesign-styles">
/* === DB.137 PHASE 1 & 2: COMPACT TOPBAR, VIEWS DROPDOWN, PANEL POLISH & NO-CLIP === */
:root {
  --db137-charcoal: #252936;
  --db137-violet: #6558d3;
  --db137-violet-dark: #5144bd;
  --db137-teal: #087f6e;
  --db137-teal-dark: #06695b;
  --db137-bg: #f5f6fb;
  --db137-surface: #ffffff;
  --db137-border: #e2e6ef;
  --db137-muted: #5a6478;
}
@keyframes db137MenuIn {
  from { opacity: 0; transform: translateY(-4px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
body, button, input, select, textarea {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.main-viewport > header,
header {
  overflow: visible !important;
  z-index: 4400 !important;
  background: var(--db137-surface) !important;
  border-bottom: 1px solid var(--db137-border) !important;
  box-shadow: 0 1px 3px rgba(37, 41, 54, 0.04) !important;
}
.db137-top-left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 0 0 auto;
  z-index: 3;
}
#db137-views-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}
#db137-views-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 11px;
  border: 1px solid #d9dfeb;
  border-radius: 8px;
  background: #ffffff;
  color: var(--db137-charcoal);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease, color 0.14s ease;
  box-shadow: 0 1px 2px rgba(37, 41, 54, 0.04);
}
#db137-views-btn:hover {
  background: #f8f9fc;
  border-color: #c5cde0;
}
#db137-views-btn[aria-expanded="true"] {
  background: #f4f2ff;
  border-color: #c8bef7;
  color: var(--db137-violet-dark);
  box-shadow: 0 0 0 2px rgba(101, 88, 211, 0.12);
}
.db137-views-pill {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 5px;
  background: #effaf7;
  color: var(--db137-teal-dark);
  font-size: 11px;
  font-weight: 650;
  line-height: 1.35;
}
#db137-views-btn .db137-chev {
  width: 13px;
  height: 13px;
  color: #6b768a;
  transition: transform 0.15s ease;
}
#db137-views-btn[aria-expanded="true"] .db137-chev {
  transform: rotate(180deg);
  color: var(--db137-violet);
}
#db137-views-menu {
  position: fixed;
  top: 52px;
  left: 14px;
  width: min(310px, calc(100vw - 20px));
  max-height: min(560px, calc(100dvh - 68px));
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  border: 1px solid #d9dfeb;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(37, 41, 54, 0.16), 0 2px 8px rgba(37, 41, 54, 0.06);
  padding: 7px;
  z-index: 9600;
  animation: db137MenuIn 0.14s cubic-bezier(0.16, 1, 0.3, 1);
}
#db137-views-menu[hidden] {
  display: none !important;
}
.db137-menu-sec {
  padding: 2px 0 4px;
}
.db137-menu-sec + .db137-menu-sec {
  border-top: 1px solid #eef1f7;
  margin-top: 4px;
  padding-top: 6px;
}
.db137-menu-label {
  padding: 4px 9px 5px;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.055em;
  color: #7c8599;
}
.db137-menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
}
.db137-menu-item {
  width: 100%;
  border: 1px solid transparent;
  background: transparent;
  color: var(--db137-charcoal);
  border-radius: 7px;
  padding: 7px 9px;
  font-size: 12.5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.12s ease, color 0.12s ease, border-color 0.12s ease;
}
.db137-menu-item svg {
  width: 15px;
  height: 15px;
  color: #6b768a;
  flex: 0 0 auto;
}
.db137-menu-item:hover {
  background: #f5f7fb;
  color: var(--db137-charcoal);
}
.db137-menu-item:hover svg {
  color: var(--db137-teal);
}
.db137-menu-item.active {
  background: #effaf7;
  border-color: #bfe8dd;
  color: var(--db137-teal-dark);
  font-weight: 600;
}
.db137-menu-item.active svg {
  color: var(--db137-teal);
}
.db137-menu-check {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  color: var(--db137-teal);
  opacity: 0;
}
.db137-menu-item.active .db137-menu-check {
  opacity: 1;
}
.db137-menu-item .visual-issue-badge,
.db137-menu-item .audit-nav-count {
  margin-left: auto;
  min-width: 17px;
  height: 17px;
  padding: 0 5px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 650;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
#db137-views-menu .db137-menu-grid .db137-menu-item {
  padding: 6px 8px;
  font-size: 12px;
  gap: 6px;
}

/* Header Actions & Page Select Polish (no clipping) */
#header-actions {
  overflow: visible !important;
  flex-wrap: nowrap;
  gap: 6px !important;
}
#header-actions .project-page-picker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 4px 0 9px;
  border: 1px solid #d9dfeb;
  border-radius: 8px;
  background: #ffffff;
  color: #5a6478;
  font-size: 12px;
  font-weight: 600;
  min-width: 0;
  max-width: min(260px, 34vw);
}
#header-actions .project-page-picker span {
  flex: 0 0 auto;
  font-size: 11.5px;
  color: #6b768a;
}
#d2-project-page-select {
  border: 0 !important;
  background: transparent !important;
  color: var(--db137-charcoal) !important;
  font-size: 12.5px !important;
  font-weight: 600 !important;
  height: 28px !important;
  padding: 0 18px 0 2px !important;
  max-width: 190px;
  text-overflow: ellipsis;
  cursor: pointer;
  outline: none !important;
  box-shadow: none !important;
}
body:not(.has-project) #header-actions .project-page-picker,
body:not(.has-project) #header-actions .db136-zoom-group,
body:not(.has-project) #header-actions #d2-capture-wrap,
body:not(.has-project) #header-actions #btn-top-reload,
body:not(.has-project) #header-actions #btn-top-trash {
  display: none !important;
}
.db136-zoom-group {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d9dfeb;
  border-radius: 8px;
  background: #ffffff;
  padding: 2px;
  gap: 1px;
  height: 32px;
  box-sizing: border-box;
}
.db136-zoom-btn {
  border: 0 !important;
  background: transparent !important;
  color: #4b5568 !important;
  border-radius: 6px !important;
  height: 26px !important;
  min-width: 26px !important;
  padding: 0 7px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  cursor: pointer;
  transition: background-color 0.12s ease, color 0.12s ease;
}
.db136-zoom-btn:hover {
  background: #effaf7 !important;
  color: var(--db137-teal-dark) !important;
}
#db116-view-switcher-menu,
#d2-capture-menu {
  z-index: 9500 !important;
  border-radius: 10px !important;
  border: 1px solid #d9dfeb !important;
  box-shadow: 0 14px 32px rgba(37, 41, 54, 0.14) !important;
  animation: db137MenuIn 0.13s ease;
}

/* Inspector Drawer Uniform Typography & Spacing (Phase 1.7–1.10) */
#view-workspace .workspace-pane-right {
  border-left: 1px solid var(--db137-border) !important;
  background: #ffffff !important;
  box-shadow: -8px 0 28px rgba(37, 41, 54, 0.08) !important;
}
#view-workspace .workspace-pane-right .db99-panel-header {
  padding: 10px 14px !important;
  border-bottom: 1px solid #eef1f7 !important;
  background: #ffffff !important;
}
#view-workspace .workspace-pane-right .db99-panel-header h4,
#view-workspace .workspace-pane-right .db99-panel-header h3 {
  font-size: 14px !important;
  font-weight: 650 !important;
  color: var(--db137-charcoal) !important;
  letter-spacing: -0.01em !important;
}
#view-workspace .workspace-pane-right .db99-section-card,
#view-workspace .workspace-pane-right .db122-group {
  border: 1px solid var(--db137-border) !important;
  border-radius: 10px !important;
  background: #ffffff !important;
  box-shadow: 0 1px 2px rgba(37, 41, 54, 0.03) !important;
}
#view-workspace .workspace-pane-right .d2-pop-btn,
#view-workspace .workspace-pane-right .db128-act-icon-btn {
  border-radius: 7px !important;
  font-weight: 550 !important;
  transition: background-color 0.12s ease, border-color 0.12s ease, color 0.12s ease !important;
}
#db107-empty-viewer {
  background: radial-gradient(circle at 50% 35%, rgba(101, 88, 211, 0.05), transparent 62%), var(--db137-bg) !important;
}
#db107-empty-viewer .hero-card {
  max-width: 500px;
  width: 100%;
}
#db107-empty-viewer .dropzone-box {
  background: #ffffff !important;
  border: 1.5px dashed #cbd3e3 !important;
  border-radius: 16px !important;
  box-shadow: 0 12px 34px rgba(37, 41, 54, 0.06) !important;
  transition: border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease !important;
}
#db107-empty-viewer .dropzone-box:hover,
#db107-empty-viewer .dropzone-box.dragover {
  border-color: var(--db137-violet) !important;
  box-shadow: 0 16px 40px rgba(101, 88, 211, 0.12) !important;
}
#db107-empty-viewer .drop-icon-wrap {
  background: #f4f2ff !important;
  color: var(--db137-violet) !important;
}

@media (max-width: 900px) {
  .db137-top-left { gap: 6px; }
  #db137-views-btn { height: 30px; padding: 0 8px; font-size: 12px; gap: 5px; }
  .db137-views-pill { display: none; }
  #header-actions .project-page-picker { height: 30px; max-width: 145px; padding: 0 2px 0 6px; }
  #header-actions .project-page-picker span { display: none; }
  #d2-project-page-select { font-size: 12px !important; max-width: 132px; }
  #header-actions .db136-zoom-group { display: none !important; }
  #db137-views-menu {
    left: 10px !important;
    right: 10px !important;
    width: auto !important;
    top: auto !important;
    bottom: calc(56px + env(safe-area-inset-bottom)) !important;
    max-height: 70dvh !important;
  }
}
</style>
</head>
<body class="mobile-shell project-empty">`;

replaceUnique('inject-db137-styles', '</head>\n<body class="mobile-shell project-empty">', db137Styles);

// 3. Replace <header> multi-button .top-nav + #workspace-more-menu with single clean Views dropdown + header actions
const headerStartIdx = html.indexOf('    <header>\n      <div class="topbar-brand"');
const headerEndMarker = '    </header>';
const headerEndIdx = html.indexOf(headerEndMarker, headerStartIdx);
if (headerStartIdx === -1 || headerEndIdx === -1) {
  throw new Error('Could not locate <header> block');
}
const newHeaderHtml = `    <header>
      <div class="db137-top-left">
        <div class="topbar-brand" onclick="goProjectHome()" title="Home">
          <div class="topbar-logo">
            <div class="brand-wordmark" aria-label="DEBOOGER2K">
              <span class="brand-name">DEBOOGER</span><span class="brand-2k">2K</span>
            </div>
          </div>
        </div>
        <div id="db137-views-wrap">
          <button type="button" id="db137-views-btn" aria-haspopup="menu" aria-expanded="false" aria-controls="db137-views-menu" onclick="db137ToggleViewsMenu(event)" title="Switch workspace views, inspector panels, and project tools">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            <span>Views</span>
            <span class="db137-views-pill" id="db137-views-current">Viewer</span>
            <svg class="db137-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div id="db137-views-menu" role="menu" aria-label="Views and tools" hidden>
            <div class="db137-menu-sec">
              <div class="db137-menu-label">Workspace Views</div>
              <button type="button" role="menuitemradio" class="db137-menu-item" data-db137-view="upload" onclick="db137OpenView('upload')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M4 15v4c0 1 .8 2 2 2h12c1 0 2-1 2-2v-4"/></svg>
                <span>Upload Project</span>
                <span class="db137-menu-check">✓</span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item active" data-db137-view="viewer" onclick="db137OpenView('viewer')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M8 22h8M12 19v3"/></svg>
                <span>Viewer</span>
                <span class="db137-menu-check">✓</span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item" id="btn-inspect-toolbar" data-edit-toggle="1" data-db137-view="edit" aria-pressed="false" onclick="db137OpenView('edit')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                <span>Edit</span>
                <span class="visual-issue-badge" id="visual-issue-badge">0</span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item" data-db137-view="pages" onclick="db137OpenView('pages')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                <span>Pages &amp; Design</span>
                <span class="db137-menu-check">✓</span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item" id="visual-editor-audit-toggle" data-db137-view="audit" aria-expanded="false" onclick="db137OpenView('audit')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h10l4 4v14H3V3h4Zm9 0v5h5"/><path d="m7 15 3 3 6-7"/></svg>
                <span>Audit</span>
                <span class="audit-nav-count audit-good" id="audit-nav-count" hidden></span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item" id="db133-open-functions" data-db137-view="functions" onclick="db137OpenView('functions')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                <span>Functions</span>
                <span class="db137-menu-check">✓</span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item" data-db137-view="captures" onclick="db137OpenView('captures')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h4l2-2h4l2 2h4v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>
                <span>Captures</span>
                <span class="db137-menu-check">✓</span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item" data-db137-view="files" onclick="db137OpenView('files')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h6l2 2h10v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/></svg>
                <span>Files</span>
                <span class="db137-menu-check">✓</span>
              </button>
              <button type="button" role="menuitemradio" class="db137-menu-item" data-db137-view="history" onclick="db137OpenView('history')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>
                <span>Saved Projects</span>
                <span class="db137-menu-check">✓</span>
              </button>
            </div>
            <div class="db137-menu-sec">
              <div class="db137-menu-label">Compare &amp; Inspect</div>
              <div class="db137-menu-grid">
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();db112OpenOriginalDiff()"><span>Edits vs start</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();db112OpenDeviceCompare()"><span>Phone vs PC</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();document.getElementById('b005-compare-input')?.click()"><span>Compare files</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();d2OpenMonitor('diagnostics')"><span>App health</span></button>
              </div>
            </div>
            <div class="db137-menu-sec">
              <div class="db137-menu-label">Save &amp; Share</div>
              <div class="db137-menu-grid">
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();db112ExportHostZip()"><span>Download ZIP</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();openConvertModal()"><span>Save HTML</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();openPreviewInBrowser()"><span>Open in tab</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();promptRenameActiveProject()"><span>Rename</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();openSettingsOverlay()"><span>GitHub</span></button>
                <button type="button" role="menuitem" class="db137-menu-item" onclick="db137CloseViewsMenu();b005OpenPagesDeploy()"><span>Publish</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="workspace-tools-backdrop" id="workspace-tools-backdrop" aria-hidden="true" onclick="closeWorkspacePopovers()"></div>
      <div class="workspace-popover" id="ai-repair-menu" role="menu" aria-label="Saved edits">
        <div class="workspace-popover-title">Saved edits</div>
        <button type="button" onclick="copyCurrentVisualCorrection()">Copy this edit</button>
        <button type="button" onclick="copyAllVisualCorrections()">Copy all <span id="ai-repair-count">0</span></button>
        <button type="button" onclick="exportRepairHandoff()">Save ZIP</button>
        <button type="button" onclick="clearCompletedCorrections()">Clear done</button>
        <div class="workspace-correction-list" id="workspace-correction-list"></div>
      </div>
      <div class="header-actions" id="header-actions">
        <label class="project-page-picker" for="d2-project-page-select"><span>Page</span><select id="d2-project-page-select" aria-label="Choose preview page" title="Choose a page from the uploaded project"></select></label>
        <div class="db136-zoom-group" role="group" aria-label="Preview zoom controls">
          <button type="button" class="db136-zoom-btn" onclick="adjustPreviewZoom(-0.15)" title="Zoom out">−</button>
          <button type="button" class="db136-zoom-btn" onclick="resetPreviewZoom()" title="Fit preview">Fit</button>
          <button type="button" class="db136-zoom-btn" onclick="adjustPreviewZoom(0.15)" title="Zoom in">+</button>
          <button type="button" class="db136-zoom-btn" onclick="togglePanoramicPreview()" title="Full preview">Full</button>
        </div>
        <div id="db116-view-switcher-wrap" class="project-only-action">
          <button type="button" id="db116-view-switcher-btn" aria-label="Switch screen size" title="Switch screen size" aria-expanded="false" aria-controls="db116-view-switcher-menu" onclick="db116ToggleViewMenu(event)"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></button>
          <div id="db116-view-switcher-menu" role="menu" aria-label="Screen size" hidden>
            <button type="button" role="menuitemradio" class="workspace-device-btn active" data-preset="desktop" aria-checked="true" onclick="db116PickViewport('desktop')"><span>Computer</span><span class="db116-check">✓</span></button>
            <button type="button" role="menuitemradio" class="workspace-device-btn" data-preset="tablet" aria-checked="false" onclick="db116PickViewport('tablet')"><span>Tablet</span><span class="db116-check">✓</span></button>
            <button type="button" role="menuitemradio" class="workspace-device-btn" data-preset="mobile" aria-checked="false" onclick="db116PickViewport('mobile')"><span>Phone</span><span class="db116-check">✓</span></button>
            <hr />
            <button type="button" role="menuitem" id="db112-compare-devices-btn" data-preset="compare" onclick="db116PickViewport('compare')"><span>Compare</span></button>
          </div>
        </div>
        <div id="d2-capture-wrap" class="d2-capture-wrap">
          <button type="button" id="d2-capture-button" aria-label="Take a picture" title="Take a screenshot of the page" aria-expanded="false"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h4l2-2h4l2 2h4v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg></button>
          <div id="d2-capture-menu" hidden><button type="button" data-capture="full">Full Page</button><button type="button" data-capture="area">Pick Area</button><button type="button" data-capture="gallery">Saved Captures</button></div>
        </div>
        <button type="button" class="workspace-icon-btn" id="btn-top-reload" onclick="refreshSandboxViewer()" title="Reload preview" aria-label="Reload preview"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15.36-6.36L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15.36 6.36L3 16"/></svg></button>
        <button type="button" class="workspace-icon-btn workspace-delete-btn" id="btn-top-trash" onclick="clearLoadedProject()" title="Delete loaded project" aria-label="Delete loaded project"><svg class="top-trash-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 6.5h17M9 6.5V4.2c0-.6.5-1.1 1.1-1.1h3.8c.6 0 1.1.5 1.1 1.1v2.3M6.2 6.5l.85 12.8c.05.9.8 1.6 1.7 1.6h6.5c.9 0 1.65-.7 1.7-1.6l.85-12.8M10 10.5v6.4M14 10.5v6.4"/></svg></button>
        <input type="file" id="file-input-folder" aria-label="Choose project folder" webkitdirectory directory multiple style="display:none;" />
      </div>
    </header>`;

html = html.slice(0, headerStartIdx) + newHeaderHtml + html.slice(headerEndIdx + headerEndMarker.length);

// 4. Wire mobile "More" button to open the unified Views menu smoothly
replaceUnique(
  'mobile-more-nav-btn',
  `<button type="button" id="mobile-more-nav-btn" aria-expanded="false" onclick="toggleWorkspacePopover('workspace-more-menu')">`,
  `<button type="button" id="mobile-more-nav-btn" aria-expanded="false" onclick="db137ToggleViewsMenu(event)">`
);

// 5. Phase 2 Navigation JS: Views dropdown handlers, ESC/outside dismissal, active indicator, and view switching preserving state
replaceUnique(
  'db137-views-nav-handlers',
  `    function syncWorkspacePopoverHost() {
      const toolsOpen = document.getElementById('workspace-more-menu')?.classList.contains('open') || false;
      const fixesOpen = document.getElementById('ai-repair-menu')?.classList.contains('open') || false;
      document.body.classList.toggle('mobile-popover-open', toolsOpen || fixesOpen);
      const toolsBackdrop = document.getElementById('workspace-tools-backdrop');
      if (toolsBackdrop) {
        toolsBackdrop.classList.toggle('open', toolsOpen);
        toolsBackdrop.setAttribute('aria-hidden', String(!toolsOpen));
      }
      const mobileMore = document.getElementById('mobile-more-nav-btn');
      if(mobileMore)mobileMore.setAttribute('aria-expanded',String(toolsOpen));
      const toolsBtn = document.getElementById('btn-workspace-more');
      if (toolsBtn) { toolsBtn.setAttribute('aria-expanded', String(toolsOpen)); toolsBtn.classList.toggle('active', toolsOpen); }
    }`,
  `    const DB137_VIEW_LABELS = {
      upload: 'Upload',
      viewer: 'Viewer',
      edit: 'Edit',
      pages: 'Pages & Design',
      audit: 'Audit',
      functions: 'Functions',
      captures: 'Captures',
      files: 'Files',
      history: 'Saved Projects'
    };
    let DB137_ACTIVE_VIEW = 'viewer';
    function db137SyncActiveView(key) {
      if (key) DB137_ACTIVE_VIEW = key;
      const lbl = document.getElementById('db137-views-current');
      if (lbl) lbl.textContent = DB137_VIEW_LABELS[DB137_ACTIVE_VIEW] || 'Viewer';
      document.querySelectorAll('#db137-views-menu [data-db137-view]').forEach(el => {
        const match = el.dataset.db137View === DB137_ACTIVE_VIEW;
        el.classList.toggle('active', match);
        el.setAttribute('aria-checked', String(match));
        if (match) el.setAttribute('aria-current', 'page');
        else el.removeAttribute('aria-current');
      });
    }
    function db137CloseViewsMenu() {
      const m = document.getElementById('db137-views-menu');
      const b = document.getElementById('db137-views-btn');
      if (m) m.hidden = true;
      if (b) b.setAttribute('aria-expanded', 'false');
      syncWorkspacePopoverHost();
    }
    function db137ToggleViewsMenu(event) {
      if (event) event.stopPropagation();
      const m = document.getElementById('db137-views-menu');
      const b = document.getElementById('db137-views-btn');
      if (!m || !b) return;
      const willOpen = m.hidden;
      closeWorkspacePopovers('db137-views-menu');
      m.hidden = !willOpen;
      b.setAttribute('aria-expanded', String(willOpen));
      if (willOpen && window.innerWidth > 900) {
        const r = b.getBoundingClientRect();
        m.style.left = Math.max(8, Math.min(r.left, window.innerWidth - Math.min(310, window.innerWidth - 20) - 8)) + 'px';
        m.style.top = (r.bottom + 6) + 'px';
      }
      syncWorkspacePopoverHost();
      if (willOpen) requestAnimationFrame(() => m.querySelector('[role="menuitemradio"].active, button')?.focus?.());
    }
    function db137OpenView(key) {
      db137CloseViewsMenu();
      const hasFiles = Object.keys(STATE.files || {}).length > 0;
      if (key === 'upload') {
        if (STATE.activeView !== 'view-workspace') switchView('view-workspace', { skipSave: true });
        if (STATE.inspectMode) toggleVisualInspectMode(false);
        closeWorkspaceOverlays();
        db137SyncActiveView('upload');
        triggerOpenMenu();
        return;
      }
      if (key === 'viewer') {
        switchView('view-workspace', { skipSave: true });
        if (STATE.inspectMode) toggleVisualInspectMode(false);
        closeWorkspaceOverlays();
        if (window.matchMedia('(max-width:900px)').matches) setMobileWorkspaceScreen('preview', { skipSave: true });
        db137SyncActiveView('viewer');
        return;
      }
      if (key === 'edit') {
        if (!hasFiles || !projectIsValid()) { showToast('Open a project first to edit.'); return; }
        if (STATE.activeView !== 'view-workspace') switchView('view-workspace', { skipSave: true });
        if (!STATE.inspectMode) toggleVisualInspectMode(true, { keepDrawer: true });
        window.db99SwitchInspectorTab?.('edit');
        if (window.matchMedia('(max-width:900px)').matches) setMobileWorkspaceScreen('preview', { skipSave: true });
        else toggleWorkspaceDrawer('diagnostics', true);
        db137SyncActiveView('edit');
        return;
      }
      if (key === 'pages' || key === 'functions' || key === 'captures') {
        if (STATE.activeView !== 'view-workspace') switchView('view-workspace', { skipSave: true });
        if (key === 'functions') db98RestoreFunctionsToDrawer?.();
        window.db99SwitchInspectorTab?.(key);
        if (window.matchMedia('(max-width:900px)').matches) setMobileWorkspaceScreen('results', { skipSave: true, allowAudit: true });
        else toggleWorkspaceDrawer('diagnostics', true);
        db137SyncActiveView(key);
        return;
      }
      if (key === 'audit') {
        db137SyncActiveView('audit');
        openAuditFromNav();
        return;
      }
      if (key === 'files') {
        if (STATE.activeView !== 'view-workspace') switchView('view-workspace', { skipSave: true });
        if (window.matchMedia('(max-width:900px)').matches) openFilesSheet();
        else toggleWorkspaceDrawer('files', true);
        db137SyncActiveView('files');
        return;
      }
      if (key === 'history') {
        switchView('view-history');
        db137SyncActiveView('history');
        return;
      }
    }
    function syncWorkspacePopoverHost() {
      const viewsMenu = document.getElementById('db137-views-menu');
      const toolsOpen = Boolean(viewsMenu && !viewsMenu.hidden);
      const fixesOpen = document.getElementById('ai-repair-menu')?.classList.contains('open') || false;
      document.body.classList.toggle('mobile-popover-open', toolsOpen || fixesOpen);
      const toolsBackdrop = document.getElementById('workspace-tools-backdrop');
      if (toolsBackdrop) {
        toolsBackdrop.classList.toggle('open', toolsOpen);
        toolsBackdrop.setAttribute('aria-hidden', String(!toolsOpen));
      }
      const mobileMore = document.getElementById('mobile-more-nav-btn');
      if (mobileMore) mobileMore.setAttribute('aria-expanded', String(toolsOpen));
    }`
);

// Update closeWorkspacePopovers + toggleWorkspacePopover + dismissOpenChrome to manage #db137-views-menu
replaceUnique(
  'close-popovers-db137',
  `    function closeWorkspacePopovers(exceptId = '') {
      document.querySelectorAll('.workspace-popover.open').forEach(pop => {
        if (pop.id === exceptId) return;
        pop.classList.remove('open');
      });
      if (exceptId !== 'db116-view-switcher-menu') db116CloseViewMenu();
      syncWorkspacePopoverHost();
    }

    function toggleWorkspacePopover(id) {
      const pop = document.getElementById(id);`,
  `    function closeWorkspacePopovers(exceptId = '') {
      document.querySelectorAll('.workspace-popover.open').forEach(pop => {
        if (pop.id === exceptId) return;
        pop.classList.remove('open');
      });
      if (exceptId !== 'db116-view-switcher-menu') db116CloseViewMenu();
      if (exceptId !== 'db137-views-menu') {
        const vm = document.getElementById('db137-views-menu');
        const vb = document.getElementById('db137-views-btn');
        if (vm) vm.hidden = true;
        if (vb) vb.setAttribute('aria-expanded', 'false');
      }
      syncWorkspacePopoverHost();
    }

    function toggleWorkspacePopover(id) {
      if (id === 'workspace-more-menu') { db137ToggleViewsMenu(); return; }
      const pop = document.getElementById(id);`
);

replaceUnique(
  'dismiss-chrome-db137',
  `      if (t.closest('#btn-workspace-more') || t.closest('#mobile-more-nav-btn') || t.closest('.workspace-menu-wrap') || t.closest('#workspace-more-menu') || t.closest('.workspace-popover-trigger')) return;`,
  `      if (t.closest('#db137-views-wrap') || t.closest('#mobile-more-nav-btn') || t.closest('.workspace-popover-trigger')) return;`
);

// Sync Views dropdown label whenever db99SwitchInspectorTab / switchView / toggleVisualInspectMode / toggleWorkspaceDrawer runs
replaceUnique(
  'sync-views-on-tab',
  `    const cur=document.getElementById('db99-panel-'+tab);`,
  `    if (typeof db137SyncActiveView === 'function') db137SyncActiveView(tab === 'pages' ? 'pages' : tab);
    const cur=document.getElementById('db99-panel-'+tab);`
);

replaceUnique(
  'sync-views-on-switchView',
  `      if (viewId === 'view-workspace') {`,
  `      if (typeof db137SyncActiveView === 'function') {
        if (viewId === 'view-history') db137SyncActiveView('history');
        else if (viewId === 'view-workspace' && !STATE.inspectMode && !document.querySelector('.workspace-pane-right.drawer-open')) db137SyncActiveView('viewer');
      }
      if (viewId === 'view-workspace') {`
);

// 6. Phase 2: Fix page switching freezes, SPA navigation interception in Edit mode, and active page selection retention
replaceUnique(
  'iframe-prog-nav-flag',
  `            function d2InspectClick(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode)return;
              // Programmatic navigation is how the Pages panel opens in-app routes.
              if(!e.isTrusted && e.target?.closest?.('button,[role="tab"],a[href],[data-page]'))return;`,
  `            let d2ProgrammaticNav=false;
            function d2InspectClick(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode||d2ProgrammaticNav)return;
              // Programmatic navigation is how the Pages panel opens in-app routes.
              if(!e.isTrusted && e.target?.closest?.('button,[role="tab"],[role="menuitem"],[role="button"],a,[data-page],[class*="nav-item"],[class*="menu-item"]'))return;`
);

replaceUnique(
  'iframe-open-page-reliable',
  `                    if(target){
                      target.click();clearInterval(d2PendingPageOpen);d2PendingPageOpen=null;
                      requestAnimationFrame(()=>{post({type:'DEBOOGER_PAGE_OPENED',page:live?label:page});d2ReportLivePages();});
                      return;
                    }`,
  `                    if(target){
                      clearInterval(d2PendingPageOpen);d2PendingPageOpen=null;
                      d2CommitInPlaceText(false);
                      d2Locked=null;d2LockedEl=null;d2MultiTargets=[];d2Paint(null);d2PaintMultiHighlights([]);
                      d2ProgrammaticNav=true;
                      try{target.click();}finally{setTimeout(()=>{d2ProgrammaticNav=false;},60);}
                      requestAnimationFrame(()=>{
                        post({type:'DEBOOGER_PAGE_OPENED',page:live?label:page});
                        d2ReportLivePages();
                        setTimeout(()=>{d2ScanLiveDesign();},140);
                      });
                      return;
                    }`
);

replaceUnique(
  'parent-page-select-retain',
  `      const selected=pages.find(page=>page.id===select.dataset.current&&page.html===STATE.entryFile);
      const current=selected||pages.find(page=>page.kind==='html'&&page.html===STATE.entryFile)||pages[0];`,
  `      const curLabel=(DB117_STATE?.activePageLabel||'').toLowerCase();
      const selected=pages.find(page=>page.id===select.dataset.current&&page.html===STATE.entryFile)
        || (curLabel ? pages.find(page=>page.html===STATE.entryFile && page.label.toLowerCase()===curLabel) : null);
      const current=selected||pages.find(page=>page.kind==='html'&&page.html===STATE.entryFile)||pages[0];`
);

replaceUnique(
  'parent-open-page-state',
  `      if(page.kind==='live'){
        document.getElementById('live-sandbox-frame')?.contentWindow?.postMessage({type:'DEBOOGER_OPEN_LIVE_PAGE',index:page.index,label:page.sourceLabel||page.label},'*');`,
  `      DB117_STATE.activePageLabel = page.label || d2CleanPageLabel(page.html);
      if(page.kind==='live'){
        document.getElementById('live-sandbox-frame')?.contentWindow?.postMessage({type:'DEBOOGER_OPEN_LIVE_PAGE',index:page.index,label:page.sourceLabel||page.label},'*');`
);

// =========================================================================
// PHASE 3 — COMPLETE EDIT SYSTEM (SELECTION, DRAG, RESIZE, UNDO/REDO, COPY/PASTE, CONTEXT MENU, MOBILE)
// =========================================================================

// P3-1: Inject Phase 3 & Phase 4 CSS polish (steppers, searchable font combobox, mobile action access, tree reorder buttons)
replaceUnique(
  'inject-p3-p4-css',
  `</style>
</head>
<body class="mobile-shell project-empty">`,
  `
/* === DB.137 PHASE 3 & 4: EDITING, CONTEXT MENU, TREE REORDER & STEPPERS === */
.db137-step-wrap {
  display: inline-flex;
  align-items: center;
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  background: #fff;
  overflow: hidden;
  height: 30px;
}
.db137-step-btn {
  width: 26px;
  height: 100%;
  border: 0;
  background: #f8fafc;
  color: #334155;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  flex: 0 0 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background .12s;
}
.db137-step-btn:hover { background: #e2e8f0; color: #0f172a; }
.db137-step-inp {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  border: 0 !important;
  text-align: center;
  font-size: 12px !important;
  font-weight: 600;
  color: #0f172a;
  padding: 0 2px !important;
  background: transparent !important;
  height: 100% !important;
  box-shadow: none !important;
}
.db137-step-unit {
  font-size: 10.5px;
  color: #64748b;
  padding-right: 5px;
  flex: 0 0 auto;
  user-select: none;
}
.db136-sec-actions {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex: 0 0 auto;
}
.db136-sec-move-btn {
  width: 22px;
  height: 22px;
  border: 1px solid #d5dce6;
  border-radius: 5px;
  background: #fff;
  color: #334155;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.db136-sec-move-btn:hover:not(:disabled) { border-color: #6558d3; color: #6558d3; background: #f5f3ff; }
.db136-sec-move-btn:disabled { opacity: .35; cursor: not-allowed; }
#d2-float-toolbar {
  flex-wrap: nowrap;
  max-width: calc(100vw - 16px);
  overflow-x: auto;
  scrollbar-width: none;
}
#d2-float-toolbar::-webkit-scrollbar { display: none; }
#d2-context-menu {
  z-index: 2147483647;
  animation: db137MenuIn .12s ease-out;
}
@media (max-width: 900px) {
  .db128-mouse-bar {
    position: sticky;
    top: 0;
    z-index: 5;
    background: #fff;
    padding-bottom: 6px;
  }
  .db128-action-bar {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
  .db136-sec-scope-bar {
    flex-wrap: wrap;
    gap: 4px;
  }
  #db128-design-editor-pop {
    left: 10px !important;
    right: 10px !important;
    width: auto !important;
    max-width: none !important;
  }
}
</style>
</head>
<body class="mobile-shell project-empty">`
);

// P3-2: Deduplicate Pages & Design HTML (remove unused hidden placeholders & duplicate sections reorder box since reordering lives inside Pages -> Sections tree)
replaceUnique(
  'dedupe-pages-design-html',
  `              <div id="db110-pages-list" style="display:flex;flex-direction:column;gap:7px;"><span class="db99-empty-hint">Open a project to see its pages.</span></div>
              <div id="db117-app-areas-list" hidden style="display:none;"></div>
            </div>
            <div id="db117-design-match-bar" class="db117-match-bar" hidden></div>
            <div id="db128-pd-subpanel"></div>
            <div id="db117-design-colors-live" hidden></div>
            <div id="db99-mini-palette" hidden></div>
            <div id="db111-design-color-swap" hidden></div>
            <div id="db117-design-fonts-live" hidden></div>
            <div id="db117-design-boxes-live" hidden></div>
            <div id="db117-design-lines-live" hidden></div>
            <details class="db99-section-card db124-details">
              <summary>Reorder sections on active page</summary>
              <div id="db110-sections-list" style="display:flex;flex-direction:column;gap:5px;"><span class="db99-empty-hint">Sections appear when a page loads.</span></div>
            </details>`,
  `              <div id="db110-pages-list" style="display:flex;flex-direction:column;gap:7px;"><span class="db99-empty-hint">Open a project to see its pages.</span></div>
            </div>
            <div id="db117-design-match-bar" class="db117-match-bar" hidden></div>
            <div id="db128-pd-subpanel"></div>`
);

// P3-3: Larger, touch/mouse-friendly resize handles + hide hover outline whenever element is locked or multi-highlighted + clear extra highlights
replaceUnique(
  'iframe-handles-size-touch',
  `                const t=6,c=9;
                const w=Math.max(4,r.width),h=Math.max(4,r.height);
                const boxes={
                  n:[r.left+c/2,r.top-t/2,Math.max(4,w-c),t],
                  s:[r.left+c/2,r.bottom-t/2,Math.max(4,w-c),t],
                  e:[r.right-t/2,r.top+c/2,t,Math.max(4,h-c)],
                  w:[r.left-t/2,r.top+c/2,t,Math.max(4,h-c)],
                  nw:[r.left-c/2,r.top-c/2,c,c],
                  ne:[r.right-c/2,r.top-c/2,c,c],
                  se:[r.right-c/2,r.bottom-c/2,c,c],
                  sw:[r.left-c/2,r.bottom-c/2,c,c]
                };`,
  `                const t=8,c=12;
                const w=Math.max(4,r.width),h=Math.max(4,r.height);
                const boxes={
                  n:[r.left+c/2,r.top-t/2,Math.max(4,w-c),t],
                  s:[r.left+c/2,r.bottom-t/2,Math.max(4,w-c),t],
                  e:[r.right-t/2,r.top+c/2,t,Math.max(4,h-c)],
                  w:[r.left-t/2,r.top+c/2,t,Math.max(4,h-c)],
                  nw:[r.left-c/2,r.top-c/2,c,c],
                  ne:[r.right-c/2,r.top-c/2,c,c],
                  se:[r.right-c/2,r.bottom-c/2,c,c],
                  sw:[r.left-c/2,r.bottom-c/2,c,c]
                };`
);

replaceUnique(
  'iframe-touchaction-paint',
  `              if(d2TouchDragEl!==touchTarget){
                if(d2TouchDragEl)d2TouchDragEl.style.touchAction=d2TouchDragOld;
                d2TouchDragEl=touchTarget;d2TouchDragOld=touchTarget?.style.touchAction||'';
                if(touchTarget&&d2MouseMode==='move')touchTarget.style.touchAction='none';
              }
              if(!sel||!d2LockedEl||!d2LockedEl.isConnected){
                d2Overlay.style.display='none';d2HandlesHost.style.display='none';return;
              }`,
  `              if(d2TouchDragEl!==touchTarget){
                if(d2TouchDragEl)d2TouchDragEl.style.touchAction=d2TouchDragOld;
                d2TouchDragEl=touchTarget;d2TouchDragOld=touchTarget?.style.touchAction||'';
              }
              if(touchTarget){
                touchTarget.style.touchAction=(d2MouseMode==='move'||d2MouseMode==='select')?'none':d2TouchDragOld;
              }
              if(!sel||!d2LockedEl||!d2LockedEl.isConnected){
                d2Overlay.style.display='none';d2HandlesHost.style.display='none';return;
              }
              if(d2HoverBox)d2HoverBox.style.display='none';`
);

// P3-4: Repair double-click inline text editing (support simple inline markup inside headings/buttons/paragraphs & prevent outline clutter)
replaceUnique(
  'iframe-dblclick-inline-edit',
  `            document.addEventListener('dblclick',function(e){
              if(!inspectEnabled||!inspectPicking||!d2LockedEl)return;
              if(e.target===d2LockedEl||d2LockedEl.contains(e.target)){
                const leaf=(e.target&&e.target.children&&e.target.children.length===0&&d2IsTextEditableEl(e.target))?e.target:d2LockedEl;
                if(leaf&&d2IsTextEditableEl(leaf)&&leaf.children.length===0){
                  e.preventDefault();e.stopPropagation();
                  d2StartInPlaceText(leaf,d2Locked||d2ElementSelection(leaf));
                }
              }
            },true);`,
  `            function d2HasOnlyInlineKids(el){
              if(!el||!el.children||!el.children.length)return true;
              return !Array.from(el.children).some(ch=>!/^(BR|SPAN|STRONG|EM|B|I|U|SMALL|CODE|MARK)$/.test(ch.tagName));
            }
            document.addEventListener('dblclick',function(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode)return;
              const hitEl=(e.target instanceof Element)?d2NormalizeExactEl(e.target)||e.target:d2LockedEl;
              const target=hitEl||d2LockedEl;
              if(!target)return;
              const leaf=(target.children&&target.children.length===0&&d2IsTextEditableEl(target))?target:(d2HasOnlyInlineKids(target)&&d2IsTextEditableEl(target)?target:null);
              if(leaf){
                e.preventDefault();e.stopPropagation();
                d2StartInPlaceText(leaf,d2ElementSelection(leaf));
              }
            },true);`
);

replaceUnique(
  'iframe-start-inplace-inline-kids',
  `              if(/^(TD|TH|TR|TABLE|THEAD|TBODY|SECTION|MAIN|HEADER|FOOTER|NAV|ASIDE)$/.test(el.tagName))return;
              if(el.children&&el.children.length>0)return;`,
  `              if(/^(TD|TH|TR|TABLE|THEAD|TBODY|SECTION|MAIN|HEADER|FOOTER|NAV|ASIDE)$/.test(el.tagName))return;
              if(el.children&&el.children.length>0&&!d2HasOnlyInlineKids(el))return;`
);

// P3-5: Remove duplicate selection outlines (clear audit/design highlights & hover outline on element pick) + add iframe Right-Click Context Menu handler
replaceUnique(
  'iframe-pick-single-outline-and-contextmenu',
  `              d2MultiTargets=[];d2PaintMultiHighlights([]);
              d2Paint(sel);
              post({type:'DEBOOGER_INSPECT_RESULT',selection:sel});
              return false;
            }`,
  `              d2MultiTargets=[];d2PaintMultiHighlights([]);
              if(typeof db81HighlightHost!=='undefined'&&db81HighlightHost){db81HighlightHost.remove();db81HighlightHost=null;db81HighlightNodes=[];}
              d2Paint(sel);
              post({type:'DEBOOGER_INSPECT_RESULT',selection:sel});
              return false;
            }
            document.addEventListener('contextmenu',function(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode)return;
              e.preventDefault();e.stopPropagation();
              const raw=(e.target instanceof Element)?(d2NormalizeExactEl(e.target)||e.target):null;
              const el=(d2LockedEl&&(raw===d2LockedEl||d2LockedEl.contains(raw)))?d2LockedEl:(raw||d2LockedEl);
              if(!el||el===document.body||el===document.documentElement||String(el.id||'').startsWith('d2-'))return;
              const sel=d2ElementSelection(el);
              sel.page=sourceFile;sel.candidates=d2CandidatesAt(el);sel.computed=d2Computed(el,true);sel.group=d2GroupContext(el);
              d2Locked=sel;d2LockedEl=el;d2Paint(sel);
              post({type:'DEBOOGER_INSPECT_RESULT',selection:sel});
              post({type:'DEBOOGER_CONTEXT_MENU',x:e.clientX,y:e.clientY,selection:sel});
            },true);`
);

// P3-6: Enable smooth mouse & touch dragging for locked elements, groups, non-text blocks & sections even in 'select' mode (preserving bare text selection when dragging across unlocked text)
replaceUnique(
  'iframe-smooth-drag-select-move',
  `            document.addEventListener('pointerdown',function(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode||e.button!==0||d2ResizeState||d2InlineEdit||!e.isPrimary)return;
              if(d2MouseMode==='text')return;
              if(e.target?.closest?.('#d2-drag-handle'))return;
              if(e.target?.closest?.('#d2-handles-host,input,textarea,select,[contenteditable],[draggable="true"]'))return;
              const target=e.target;
              const onBlank=(!(target instanceof Element)||target===document.documentElement||target===document.body);
              if(d2MouseMode==='box'||(onBlank&&d2MouseMode!=='select')){
                d2Marquee={startX:e.clientX,startY:e.clientY,curX:e.clientX,curY:e.clientY,active:false,pointerId:e.pointerId};
                return;
              }
              // In default 'select' mode: let mouse dragging highlight text words naturally! Dragging only runs via 'move' mode or the dedicated #d2-drag-handle.
              if(d2MouseMode==='select')return;
              if(e.pointerType==='touch'&&(!d2LockedEl||(e.target!==d2LockedEl&&!d2LockedEl.contains(e.target))))return;
              const multiHits=d2MultiTargets.map(s=>{try{return document.querySelector(s);}catch(_){return null;}}).filter(Boolean);
              const inMulti=multiHits.find(el=>el===target||el.contains(target));
              if(inMulti&&multiHits.length>1){d2BeginElementOrGroupDrag(e,inMulti);return;}
              const el=d2LockedEl&&(d2LockedEl===target||d2LockedEl.contains(target))?d2LockedEl:target;
              if(!el?.parentElement||el.closest('#d2-inspect-overlay,#d2-handles-host'))return;
              d2BeginElementOrGroupDrag(e,el);
            },true);`,
  `            document.addEventListener('pointerdown',function(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode||e.button!==0||d2ResizeState||d2InlineEdit||!e.isPrimary)return;
              if(d2MouseMode==='text')return;
              if(e.target?.closest?.('#d2-drag-handle'))return;
              if(e.target?.closest?.('#d2-handles-host,input,textarea,select,[contenteditable],[draggable="true"]'))return;
              const target=e.target;
              const onBlank=(!(target instanceof Element)||target===document.documentElement||target===document.body);
              if(d2MouseMode==='box'||(onBlank&&d2MouseMode!=='select')){
                d2Marquee={startX:e.clientX,startY:e.clientY,curX:e.clientX,curY:e.clientY,active:false,pointerId:e.pointerId};
                return;
              }
              const multiHits=d2MultiTargets.map(s=>{try{return document.querySelector(s);}catch(_){return null;}}).filter(Boolean);
              const inMulti=multiHits.find(el=>el===target||el.contains(target));
              if(inMulti&&multiHits.length>1){d2BeginElementOrGroupDrag(e,inMulti);return;}
              if(d2MouseMode==='select'){
                const isLockedHit=Boolean(d2LockedEl&&(target===d2LockedEl||d2LockedEl.contains(target)));
                if(isLockedHit){
                  d2BeginElementOrGroupDrag(e,d2LockedEl);
                  return;
                }
                const hitNode=(target instanceof Element)?target:null;
                const isPureTextLeaf=hitNode&&/^(P|H1|H2|H3|H4|H5|H6|SPAN|STRONG|EM|SMALL|LI|TD|TH|BLOCKQUOTE|LABEL)$/.test(hitNode.tagName)&&d2HasOnlyInlineKids(hitNode);
                if(hitNode&&!isPureTextLeaf&&e.pointerType!=='touch'){
                  const blk=d2NormalizeExactEl(hitNode)||hitNode;
                  if(blk&&blk!==document.body&&blk.parentElement)d2BeginElementOrGroupDrag(e,blk);
                }
                return;
              }
              if(e.pointerType==='touch'&&(!d2LockedEl||(target!==d2LockedEl&&!d2LockedEl.contains(target))))return;
              const el=d2LockedEl&&(d2LockedEl===target||d2LockedEl.contains(target))?d2LockedEl:target;
              if(!el?.parentElement||el.closest('#d2-inspect-overlay,#d2-handles-host'))return;
              d2BeginElementOrGroupDrag(e,el);
            },true);`
);

// P3-7: Preserve content reflow during/after resize & move (clear stale single outline, keep flex/grid children wrapping)
replaceUnique(
  'iframe-resize-reflow-fix',
  `                if(st.dir!=='n'&&st.dir!=='s'){st.el.style.width=w+'px';st.el.style.maxWidth='100%';}
                if(st.dir!=='e'&&st.dir!=='w'){st.el.style.minHeight=h+'px';st.el.style.height='auto';}
                st.el.style.overflowWrap='anywhere';
                if((st.display==='flex'||st.display==='inline-flex')&&String(st.flexDir||'row').startsWith('row')){
                  st.el.style.flexWrap='wrap';
                }`,
  `                st.el.style.minWidth='0';
                if(st.dir!=='n'&&st.dir!=='s'){st.el.style.width=w+'px';st.el.style.maxWidth='100%';}
                if(st.dir!=='e'&&st.dir!=='w'){st.el.style.minHeight=h+'px';st.el.style.height='auto';}
                st.el.style.overflowWrap='anywhere';
                if((st.display==='flex'||st.display==='inline-flex')&&String(st.flexDir||'row').startsWith('row')){
                  st.el.style.flexWrap='wrap';
                }`
);

replaceUnique(
  'iframe-resize-end-reflow',
  `                if(st.el.style.display)styles['display']=st.el.style.display;
                if(st.dir!=='n'&&st.dir!=='s'){styles['width']=Math.round(r.width)+'px';styles['max-width']='100%';}
                if(st.dir!=='e'&&st.dir!=='w'){styles['min-height']=Math.round(r.height)+'px';styles['height']='auto';}
                styles['overflow-wrap']='anywhere';`,
  `                if(st.el.style.display)styles['display']=st.el.style.display;
                styles['min-width']='0';
                if(st.dir!=='n'&&st.dir!=='s'){styles['width']=Math.round(r.width)+'px';styles['max-width']='100%';}
                if(st.dir!=='e'&&st.dir!=='w'){styles['min-height']=Math.round(r.height)+'px';styles['height']='auto';}
                styles['overflow-wrap']='anywhere';`
);

// P3-8: Support live DOM paste/duplicate/copy/delete fallback + multi-step Undo/Redo selection restoration + Context Menu handling in parent
replaceUnique(
  'parent-undo-restore-selection',
  `    renderDrawerEditMirror();
    buildSandboxLiveViewer();reRunAudit();
    showToast(reverse?'Undid: '+(entry.label||'last edit'):'Redid: '+(entry.label||'edit'));`,
  `    const prevSel=STATE.activeVisualSelection?.selector||'';
    renderDrawerEditMirror();
    buildSandboxLiveViewer();reRunAudit();
    if(prevSel&&STATE.inspectMode){
      setTimeout(()=>{
        document.getElementById('live-sandbox-frame')?.contentWindow?.postMessage({type:'DEBOOGER_INSPECT_LOCK_SELECTOR',selector:prevSel},'*');
      },240);
    }
    showToast(reverse?'Undid: '+(entry.label||'last edit'):'Redid: '+(entry.label||'edit'));`
);

replaceUnique(
  'parent-dom-action-react-and-html',
  `  let DB122_CLIPBOARD=null;
  function db122ElementAction(action,selector){
    const path=STATE.entryFile;
    if(!path||!STATE.files[path]||STATE.files[path].binary||!/\\.html?$/i.test(path)){
      showToast('This action needs an editable HTML source. Other project formats are preserved.');return false;
    }`,
  `  let DB122_CLIPBOARD=null;
  function db122ElementAction(action,selector){
    const path=STATE.entryFile;
    if(!path||!STATE.files[path]||STATE.files[path].binary||!/\\.html?$/i.test(path)){
      const frame=document.getElementById('live-sandbox-frame');
      if(frame?.contentWindow&&['copy','cut','paste','delete','duplicate'].includes(action)){
        if(action==='copy'){
          const sel=STATE.activeVisualSelection;
          if(!sel?.selector){showToast('Select an item first.');return false;}
          DB122_CLIPBOARD={selector:sel.selector,tag:sel.tag,text:sel.text||''};
          showToast('Copied selection.');return true;
        }
        frame.contentWindow.postMessage({type:'DEBOOGER_DOM_ACTION',action:action==='paste'?'duplicate':action,selector:(action==='paste'?DB122_CLIPBOARD?.selector:selector)||selector},'*');
        return true;
      }
      showToast('Select an editable item on the page first.');return false;
    }`
);

replaceUnique(
  'parent-duplicate-paste-reselect',
  `    if(action==='cut'||action==='delete')clearVisualSelection();
    buildSandboxLiveViewer();renderFileTree();scheduleWorkspaceSave();`,
  `    if(action==='cut'||action==='delete')clearVisualSelection();
    buildSandboxLiveViewer();renderFileTree();scheduleWorkspaceSave();
    if((action==='duplicate'||action==='paste')&&nextSelector&&STATE.inspectMode){
      setTimeout(()=>{
        document.getElementById('live-sandbox-frame')?.contentWindow?.postMessage({type:'DEBOOGER_FOCUS_ELEMENT',selector:nextSelector},'*');
      },240);
    }`
);

replaceUnique(
  'parent-handle-context-menu-msg',
  `    }else if(t==='DEBOOGER_EDITOR_SHORTCUT'){
      db122Shortcut(String(e.data.command||''),String(e.data.selector||''));`,
  `    }else if(t==='DEBOOGER_CONTEXT_MENU'&&e.data.selection){
      STATE.activeVisualSelection=e.data.selection;
      renderDrawerEditMirror();
      openContextMenu(Number(e.data.x||20),Number(e.data.y||20),e.data.selection);
    }else if(t==='DEBOOGER_EDITOR_SHORTCUT'){
      db122Shortcut(String(e.data.command||''),String(e.data.selector||''));`
);

// P3-9: Add right-click / quick Actions button to Floating Toolbar so Duplicate, Copy, Paste, Move Section, Delete work on both Desktop & Mobile
replaceUnique(
  'float-toolbar-actions-btn',
  `    ['undo','Undo last edit','<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',''],
    ['delete','Delete only this item','<path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 11v5m4-5v5"/>','danger']`,
  `    ['undo','Undo last edit','<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',''],
    ['more','More actions (Copy, Paste, Move Section)','<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',''],
    ['delete','Delete only this item','<path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 11v5m4-5v5"/>','danger']`
);

replaceUnique(
  'float-toolbar-more-handler',
  `        if(act==='duplicate'){db122ElementAction('duplicate',sel.selector);return;}
        if(act==='parent'){document.getElementById('live-sandbox-frame')?.contentWindow?.postMessage({type:'DEBOOGER_SELECT_PARENT'},'*');return;}
        window.db129FocusEditSection(act);`,
  `        if(act==='duplicate'){db122ElementAction('duplicate',sel.selector);return;}
        if(act==='more'){const r=b.getBoundingClientRect();openContextMenu((sel.rect?.left||r.left),(sel.rect?.bottom||r.bottom),sel);return;}
        if(act==='parent'){document.getElementById('live-sandbox-frame')?.contentWindow?.postMessage({type:'DEBOOGER_SELECT_PARENT'},'*');return;}
        window.db129FocusEditSection(act);`
);

// P3-10: Ensure openContextMenu maps accurately using virtual frame dimensions (with zoom support) and closes on outside click
replaceUnique(
  'context-menu-scale-fix',
  `    const frame=document.getElementById('live-sandbox-frame'),fr=frame?.getBoundingClientRect()||{left:0,top:0};
    const scale=fr.width/Math.max(1,frame?.offsetWidth||fr.width);
    const sx=clamp(fr.left+x*scale,8,innerWidth-210),sy=clamp(fr.top+y*scale,8,innerHeight-280);`,
  `    const frame=document.getElementById('live-sandbox-frame'),fr=frame?.getBoundingClientRect()||{left:0,top:0,width:innerWidth};
    const vw=Math.max(1,Number(STATE.previewVirtW)||frame?.clientWidth||fr.width);
    const scale=fr.width/vw;
    const sx=clamp(fr.left+x*scale,8,innerWidth-216),sy=clamp(fr.top+y*scale,8,innerHeight-300);`
);

// =========================================================================
// PHASE 4 — PAGES & DESIGN HIERARCHY, FONT SEARCH, +/- STEPPERS, LOCATE
// =========================================================================

// P4-1: Upgrade db136BuildSectionEditor with:
//   - All 5 scopes (element, matching, section, page, project)
//   - Searchable Font Combobox + Google Font auto-loading (DB121_FONT_CHOICES + db125EnsureFontResource)
//   - Precise manual inputs paired with +/- stepper buttons for size, padding, margin, gap, min-height, corners, border-width
//   - Border color picker + HEX input
replaceUnique(
  'p4-section-editor-upgrade',
  `    const scope=DB128_STATE.sectionScope||'section';

    const applySectionStyle=(props,label,previewOnly=false)=>{
      const path=styleTargetPath();if(!path)return;
      const rules=parseStyleBlock(path).rules;
      let selList=[targetSec];
      if(scope==='element'&&STATE.activeVisualSelection?.selector){
        selList=[STATE.activeVisualSelection.selector];
      }else if(scope==='matching'){
        selList=[targetSec+' '+(STATE.activeVisualSelection?.tag||'*')];
      }else if(scope==='page'){
        selList=['body','main, section'];
      }
      selList.forEach(s=>{rules[s]=Object.assign({},rules[s],props);});
      writeCssRules(rules,label||'Section edit',previewOnly,true);
    };

    // Scope selector bar
    const scBar=document.createElement('div');scBar.className='db136-sec-scope-bar';
    [['element','This element'],['section','Whole section'],['matching','Matching items'],['page','This page']].forEach(([val,lbl])=>{
      const b=document.createElement('button');b.type='button';b.className='db136-sec-scope-btn'+(scope===val?' active':'');
      b.textContent=lbl;
      b.onclick=()=>{DB128_STATE.sectionScope=val;renderPagesList();};
      scBar.append(b);
    });
    box.append(scBar);

    const mkField=(lbl,ctrl)=>{const w=document.createElement('div');w.className='db117-field';const l=document.createElement('div');l.className='db117-label-bar';l.textContent=lbl;w.append(l,ctrl);return w;};
    const mkNum=(lbl,rawVal,unit,prop,step=1,min=0,max=2000)=>{
      const inp=document.createElement('input');inp.type='number';inp.step=String(step);inp.min=String(min);inp.max=String(max);
      inp.value=String(Math.round((parseFloat(rawVal)||0)*10)/10);
      inp.onchange=()=>{
        const v=parseFloat(inp.value);if(!Number.isFinite(v))return;
        const val=unit?v+unit:String(v);
        const extra=prop==='border-width'?{'border-style':v>0?'solid':'none'}:{};
        applySectionStyle(Object.assign({[prop]:val},extra),lbl,false);
      };
      return mkField(lbl+(unit?' ('+unit+')':''),inp);
    };
    const mkColor=(lbl,rawVal,prop)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:5px;align-items:center;';
      const hex=db116CssToHex(rawVal,prop==='color'?'#252936':'#ffffff');
      const pk=document.createElement('input');pk.type='color';pk.value=hex;
      const hx=document.createElement('input');hx.type='text';hx.value=hex;hx.style.flex='1';hx.style.minWidth='0';
      pk.oninput=()=>{hx.value=pk.value;applySectionStyle({[prop]:pk.value},lbl,true);};
      pk.onchange=()=>{hx.value=pk.value;applySectionStyle({[prop]:pk.value},lbl,false);};
      hx.onchange=()=>{const v=hx.value.trim();if(v){if(/^#[0-9a-f]{6}$/i.test(v))pk.value=v;applySectionStyle({[prop]:v},lbl,false);}};
      row.append(pk,hx);
      return mkField(lbl,row);
    };

    // 1. Typography
    const bType=document.createElement('div');bType.className='db136-sec-block';
    bType.innerHTML='<div class="db136-sec-block-title">Fonts &amp; Alignment</div>';
    const fSel=document.createElement('select');
    DB121_FONT_CHOICES.forEach(([stack,nm])=>{
      const o=document.createElement('option');o.value=stack;o.textContent=nm;
      if(String(st.fontFamily||'').toLowerCase().includes(nm.toLowerCase()))o.selected=true;
      fSel.append(o);
    });
    fSel.onchange=()=>applySectionStyle({'font-family':fSel.value},'Section font',false);
    const gType=document.createElement('div');gType.className='db117-grid-2';
    const wSel=document.createElement('select');
    [['400','Normal'],['500','Medium'],['600','Semi-bold'],['700','Bold']].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;if(String(st.fontWeight)===v)o.selected=true;wSel.append(o);});
    wSel.onchange=()=>applySectionStyle({'font-weight':wSel.value},'Section weight',false);
    gType.append(mkField('Font family',fSel),mkNum('Text size',st.fontSize||15,'px','font-size',1,10,96),mkField('Weight',wSel));`,
  `    const scope=DB128_STATE.sectionScope||'section';

    const applySectionStyle=(props,label,previewOnly=false,fontName='')=>{
      const htmlPaths=scope==='project'
        ? Object.keys(STATE.files||{}).filter(p=>/\\.html?$/i.test(p)&&!STATE.files[p].binary)
        : [styleTargetPath()].filter(Boolean);
      const getTargets=()=>{
        if(scope==='element'&&STATE.activeVisualSelection?.selector)return [STATE.activeVisualSelection.selector];
        if(scope==='matching')return [targetSec+' '+(STATE.activeVisualSelection?.tag||'*')];
        if(scope==='page'||scope==='project')return ['body','main, section','body *'];
        return [targetSec];
      };
      const selList=getTargets();
      if(previewOnly){
        const path=styleTargetPath();if(!path)return;
        const rules=parseStyleBlock(path).rules;
        selList.forEach(s=>{rules[s]=Object.assign({},rules[s],props);});
        writeCssRules(rules,label||'Section edit',true);
        return;
      }
      if(fontName&&frame?.contentWindow){
        const url=db125FontUrl(fontName);
        if(url)frame.contentWindow.postMessage({type:'DEBOOGER_LOAD_WEB_FONT',name:fontName,url},'*');
      }
      if(scope==='project'&&htmlPaths.length>1){
        recordAtomicEdit(label||'Project design edit',()=>{
          let changed=false;
          for(const fp of htmlPaths){
            const r=parseStyleBlock(fp).rules;
            selList.forEach(s=>{r[s]=Object.assign({},r[s],props);});
            if(db125WriteSourceRules(fp,r))changed=true;
            if(fontName&&db125EnsureFontResource(fp,fontName))changed=true;
          }
          return changed;
        });
        const curRules=parseStyleBlock(styleTargetPath()||htmlPaths[0]).rules;
        frame?.contentWindow?.postMessage({type:'DEBOOGER_APPLY_STYLE',css:serializeRules(curRules)},'*');
      }else{
        const path=htmlPaths[0];if(!path)return;
        const rules=parseStyleBlock(path).rules;
        selList.forEach(s=>{rules[s]=Object.assign({},rules[s],props);});
        writeCssRules(rules,label||'Section edit',false);
        if(fontName)db125EnsureFontResource(path,fontName);
      }
      Object.entries(props).forEach(([k,v])=>{
        const ck=k.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
        st[ck]=String(v);
      });
    };

    // Scope selector bar (Element, Matching, Section, Page, Project)
    const scBar=document.createElement('div');scBar.className='db136-sec-scope-bar';
    [['element','Element'],['matching','Matching'],['section','Section'],['page','Page'],['project','Project']].forEach(([val,lbl])=>{
      const b=document.createElement('button');b.type='button';b.className='db136-sec-scope-btn'+(scope===val?' active':'');
      b.textContent=lbl;
      b.onclick=()=>{DB128_STATE.sectionScope=val;renderPagesList();};
      scBar.append(b);
    });
    box.append(scBar);

    const mkField=(lbl,ctrl)=>{const w=document.createElement('div');w.className='db117-field';const l=document.createElement('div');l.className='db117-label-bar';l.textContent=lbl;w.append(l,ctrl);return w;};
    const mkNum=(lbl,rawVal,unit,prop,step=1,min=0,max=2000)=>{
      const wrap=document.createElement('div');wrap.className='db137-step-wrap';
      const dn=document.createElement('button');dn.type='button';dn.className='db137-step-btn';dn.textContent='−';dn.title='Decrease '+lbl;
      const inp=document.createElement('input');inp.type='number';inp.className='db137-step-inp';
      inp.step=String(step);inp.min=String(min);inp.max=String(max);
      inp.value=String(Math.round((parseFloat(rawVal)||0)*10)/10);
      const uEl=document.createElement('span');uEl.className='db137-step-unit';uEl.textContent=unit||'';
      const up=document.createElement('button');up.type='button';up.className='db137-step-btn';up.textContent='+';up.title='Increase '+lbl;
      const commit=(v,pv)=>{
        const num=Math.max(min,Math.min(max,Math.round((Number(v)||0)*10)/10));
        inp.value=String(num);
        const val=unit?num+unit:String(num);
        const extra=prop==='border-width'?{'border-style':num>0?'solid':'none'}:{};
        applySectionStyle(Object.assign({[prop]:val},extra),lbl,pv);
      };
      dn.onclick=()=>commit((parseFloat(inp.value)||0)-step,false);
      up.onclick=()=>commit((parseFloat(inp.value)||0)+step,false);
      inp.onchange=()=>commit(inp.value,false);
      wrap.append(dn,inp);if(unit)wrap.append(uEl);wrap.append(up);
      return mkField(lbl,wrap);
    };
    const mkColor=(lbl,rawVal,prop)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:5px;align-items:center;';
      const hex=db116CssToHex(rawVal,prop==='color'?'#252936':'#ffffff');
      const pk=document.createElement('input');pk.type='color';pk.value=hex;
      const hx=document.createElement('input');hx.type='text';hx.value=hex;hx.style.flex='1';hx.style.minWidth='0';hx.placeholder='#HEX';
      pk.oninput=()=>{hx.value=pk.value.toUpperCase();applySectionStyle({[prop]:pk.value},lbl,true);};
      pk.onchange=()=>{hx.value=pk.value.toUpperCase();applySectionStyle({[prop]:pk.value},lbl,false);};
      hx.onchange=()=>{const v=hx.value.trim();if(v){if(/^#[0-9a-f]{6}$/i.test(v))pk.value=v;applySectionStyle({[prop]:v},lbl,false);}};
      row.append(pk,hx);
      return mkField(lbl,row);
    };

    // 1. Typography (Searchable Font Combobox + Size Stepper + Weight + Align)
    const bType=document.createElement('div');bType.className='db136-sec-block';
    bType.innerHTML='<div class="db136-sec-block-title">Fonts &amp; Alignment</div>';
    const curFontName=DB121_FONT_CHOICES.find(([stack,nm])=>String(st.fontFamily||'').toLowerCase().includes(nm.toLowerCase()))?.[1]||'Inter';
    const fCombo=document.createElement('div');fCombo.className='db128-font-combo';
    const fInp=document.createElement('input');fInp.type='text';fInp.className='db125-font-search';
    fInp.setAttribute('autocomplete','new-password');fInp.placeholder='Search fonts...';fInp.value=curFontName;
    const fList=document.createElement('div');fList.className='db128-font-list';fList.hidden=true;
    const fillFontList=(q='')=>{
      fList.replaceChildren();
      const needle=q.trim().toLowerCase();
      const matches=DB121_FONT_CHOICES.filter(([,nm])=>!needle||nm.toLowerCase().includes(needle));
      (matches.length?matches:DB121_FONT_CHOICES).forEach(([stack,nm])=>{
        const b=document.createElement('button');b.type='button';b.className='db128-font-opt'+(nm===fInp.value.trim()?' active':'');
        b.textContent=nm;b.style.fontFamily=stack;
        b.onmousedown=(ev)=>{ev.preventDefault();fInp.value=nm;fList.hidden=true;applySectionStyle({'font-family':stack},'Font: '+nm,false,nm);};
        fList.append(b);
      });
    };
    fInp.onfocus=()=>{fillFontList('');fList.hidden=false;};
    fInp.oninput=()=>{fillFontList(fInp.value);fList.hidden=false;};
    fInp.onblur=()=>{setTimeout(()=>{fList.hidden=true;},140);};
    fCombo.append(fInp,fList);
    const gType=document.createElement('div');gType.className='db117-grid-2';
    const wSel=document.createElement('select');
    [['300','Light'],['400','Normal'],['500','Medium'],['600','Semi-bold'],['700','Bold']].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;if(String(st.fontWeight)===v)o.selected=true;wSel.append(o);});
    wSel.onchange=()=>applySectionStyle({'font-weight':wSel.value},'Font weight',false);
    gType.append(mkField('Font family',fCombo),mkNum('Text size',st.fontSize||15,'px','font-size',1,10,96),mkField('Weight',wSel));`
);

replaceUnique(
  'p4-section-borders-color',
  `    gLay.append(
      mkNum('Corners',st.borderRadius||8,'px','border-radius',1,0,99),
      mkNum('Border width',st.borderWidth||0,'px','border-width',1,0,20)
    );`,
  `    gLay.append(
      mkNum('Corners',st.borderRadius||8,'px','border-radius',1,0,99),
      mkNum('Border width',st.borderWidth||0,'px','border-width',1,0,20),
      mkColor('Border color',st.borderColor||'#cbd5e1','border-color')
    );`
);

// P4-2: Add inline Section Reorder (↑ / ↓) buttons & mobile screen-switch into renderPagesList, and make Locate select + highlight cleanly
replaceUnique(
  'p4-pages-tree-reorder-and-locate',
  `            const loc=document.createElement('button');loc.type='button';loc.className='db136-locate-btn';loc.textContent='Locate';
            loc.title='Scroll to and highlight this section in preview';
            loc.onclick=(ev)=>{
              ev.stopPropagation();
              if(!STATE.inspectMode)toggleVisualInspectMode(true,{keepDrawer:true});
              const frame=document.getElementById('live-sandbox-frame');
              frame?.contentWindow?.postMessage({type:'DEBOOGER_SCROLL_TO_SECTION',selector:sec.selector},'*');
              frame?.contentWindow?.postMessage({type:'DEBOOGER_HIGHLIGHT_SELECTORS',selectors:[sec.selector],scrollFirst:true},'*');
              showToast('Located: '+(sec.label||sec.tag));
            };
            bar.append(tog,loc);sc.append(bar);`,
  `            const acts=document.createElement('div');acts.className='db136-sec-actions';
            const up=document.createElement('button');up.type='button';up.className='db136-sec-move-btn';up.textContent='↑';up.title='Move section up';up.disabled=(idx===0);
            up.onclick=(ev)=>{ev.stopPropagation();window.db112MoveSection?.(idx,idx-1,secs);};
            const dn=document.createElement('button');dn.type='button';dn.className='db136-sec-move-btn';dn.textContent='↓';dn.title='Move section down';dn.disabled=(idx===secs.length-1);
            dn.onclick=(ev)=>{ev.stopPropagation();window.db112MoveSection?.(idx,idx+1,secs);};
            const loc=document.createElement('button');loc.type='button';loc.className='db136-locate-btn';loc.textContent='Locate';
            loc.title='Scroll to and highlight this section in preview';
            loc.onclick=(ev)=>{
              ev.stopPropagation();
              if(!STATE.inspectMode)toggleVisualInspectMode(true,{keepDrawer:true});
              if(window.matchMedia('(max-width:900px)').matches)setMobileWorkspaceScreen('preview',{skipSave:true});
              const frame=document.getElementById('live-sandbox-frame');
              frame?.contentWindow?.postMessage({type:'DEBOOGER_SCROLL_TO_SECTION',selector:sec.selector},'*');
              frame?.contentWindow?.postMessage({type:'DEBOOGER_FOCUS_ELEMENT',selector:sec.selector},'*');
              showToast('Located: '+(sec.label||sec.tag));
            };
            acts.append(up,dn,loc);
            bar.append(tog,acts);sc.append(bar);`
);

// P4-3: Refresh section tree + elements reliably after reordering sections (HTML and live DOM)
replaceUnique(
  'p4-move-section-refresh',
  `    if(ok){
      buildSandboxLiveViewer();
      showToast('Moved section cleanly.');
    }`,
  `    if(ok){
      buildSandboxLiveViewer();
      setTimeout(()=>{window.db110RefreshSections?.();},240);
      showToast('Moved section cleanly.');
    }else{
      setTimeout(()=>{window.db110RefreshSections?.();},120);
    }`
);

// P4-4: Upgrade db128OpenDesignEditor font editor to also use searchable font combobox + +/- stepper sizing
replaceUnique(
  'p4-design-editor-font-search-stepper',
  `    }else if(opts.kind==='font'){
      const fSel=document.createElement('select');
      DB121_FONT_CHOICES.forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;if(t.toLowerCase()===String(opts.family||'').toLowerCase())o.selected=true;fSel.append(o);});
      const r2=document.createElement('div');r2.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
      const szInp=document.createElement('input');szInp.type='number';szInp.value=String(opts.size||14);szInp.min='8';szInp.max='120';szInp.step='0.5';
      const wSel=document.createElement('select');
      [300,350,400,450,500,550,600,650,700,750].forEach(w=>{const o=document.createElement('option');o.value=String(w);o.textContent=String(w);if(String(w)===String(opts.weight))o.selected=true;wSel.append(o);});
      r2.append(szInp,wSel);
      const ap=document.createElement('button');ap.type='button';ap.className='d2-pop-btn primary';ap.textContent='Apply font rule';
      ap.onclick=()=>{
        const fName=fSel.selectedOptions[0]?.textContent||'Inter';
        const props={'font-family':fSel.value,'font-size':szInp.value+'px','font-weight':wSel.value};`,
  `    }else if(opts.kind==='font'){
      let chosenStack=DB121_FONT_CHOICES.find(([,t])=>t.toLowerCase()===String(opts.family||'').toLowerCase())?.[0]||DB121_FONT_CHOICES[0][0];
      let chosenName=DB121_FONT_CHOICES.find(([,t])=>t.toLowerCase()===String(opts.family||'').toLowerCase())?.[1]||'Inter';
      const fCombo=document.createElement('div');fCombo.className='db128-font-combo';
      const fInp=document.createElement('input');fInp.type='text';fInp.className='db125-font-search';fInp.autocomplete='new-password';fInp.placeholder='Search fonts...';fInp.value=chosenName;
      const fList=document.createElement('div');fList.className='db128-font-list';fList.hidden=true;
      const fillFL=(q='')=>{
        fList.replaceChildren();const n=q.trim().toLowerCase();
        const ms=DB121_FONT_CHOICES.filter(([,nm])=>!n||nm.toLowerCase().includes(n));
        (ms.length?ms:DB121_FONT_CHOICES).forEach(([stk,nm])=>{
          const b=document.createElement('button');b.type='button';b.className='db128-font-opt'+(nm===chosenName?' active':'');
          b.textContent=nm;b.style.fontFamily=stk;
          b.onmousedown=(ev)=>{ev.preventDefault();chosenStack=stk;chosenName=nm;fInp.value=nm;fList.hidden=true;};
          fList.append(b);
        });
      };
      fInp.onfocus=()=>{fillFL('');fList.hidden=false;};
      fInp.oninput=()=>{fillFL(fInp.value);fList.hidden=false;};
      fInp.onblur=()=>{setTimeout(()=>{fList.hidden=true;},140);};
      fCombo.append(fInp,fList);
      const r2=document.createElement('div');r2.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
      const szStep=document.createElement('div');szStep.className='db137-step-wrap';
      const szDn=document.createElement('button');szDn.type='button';szDn.className='db137-step-btn';szDn.textContent='−';
      const szInp=document.createElement('input');szInp.type='number';szInp.className='db137-step-inp';szInp.value=String(opts.size||14);szInp.min='8';szInp.max='120';szInp.step='1';
      const szUp=document.createElement('button');szUp.type='button';szUp.className='db137-step-btn';szUp.textContent='+';
      szDn.onclick=()=>{szInp.value=String(Math.max(8,(parseFloat(szInp.value)||14)-1));};
      szUp.onclick=()=>{szInp.value=String(Math.min(120,(parseFloat(szInp.value)||14)+1));};
      szStep.append(szDn,szInp,szUp);
      const wSel=document.createElement('select');
      [300,350,400,450,500,550,600,650,700,750].forEach(w=>{const o=document.createElement('option');o.value=String(w);o.textContent=String(w);if(String(w)===String(opts.weight))o.selected=true;wSel.append(o);});
      r2.append(szStep,wSel);
      const ap=document.createElement('button');ap.type='button';ap.className='d2-pop-btn primary';ap.textContent='Apply font rule';
      ap.onclick=()=>{
        const fName=chosenName||'Inter';
        const props={'font-family':chosenStack,'font-size':szInp.value+'px','font-weight':wSel.value};`
);

replaceUnique(
  'p4-design-editor-append-fcombo',
  `      body.append(fSel,r2,ap);`,
  `      body.append(fCombo,r2,ap);`
);

// P4-5: Switch mobile screen cleanly when focusing an element from Pages/Design hierarchy so user immediately sees it in preview
replaceUnique(
  'p4-locate-element-mobile-sync',
  `      sendFocus();
      setTimeout(()=>{
        if(DB129_OPEN_CATEGORY)window.db129FocusEditSection?.(DB129_OPEN_CATEGORY);
        else { window.db99SwitchInspectorTab?.('edit'); toggleWorkspaceDrawer('diagnostics', true); }
      }, 90);`,
  `      sendFocus();
      if(window.matchMedia('(max-width:900px)').matches){
        setMobileWorkspaceScreen('preview',{skipSave:true});
        return;
      }
      setTimeout(()=>{
        if(DB129_OPEN_CATEGORY)window.db129FocusEditSection?.(DB129_OPEN_CATEGORY);
        else { window.db99SwitchInspectorTab?.('edit'); toggleWorkspaceDrawer('diagnostics', true); }
      }, 90);`
);

// Validate every inline <script> inside built HTML before writing
const scriptRe = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, count = 0;
while ((m = scriptRe.exec(html))) {
  count++;
  try {
    new vm.Script(m[1], { filename: `inline-script-${count}.js` });
  } catch (err) {
    console.error(`Syntax error in script #${count}:`, err.message);
    process.exit(1);
  }
}

fs.writeFileSync(OUT, html, 'utf8');
console.log(`Built ${OUT} successfully (${(html.length / 1024 / 1024).toFixed(2)} MB, validated ${count} inline scripts).`);
