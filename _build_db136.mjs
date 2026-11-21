import fs from 'fs';
import vm from 'vm';

const srcPath = 'DB.135.html';
const outPath = 'DB.136.html';

let html = fs.readFileSync(srcPath, 'utf8');

function mustReplace(needle, replacement, label) {
  const idx = html.indexOf(needle);
  if (idx === -1) {
    throw new Error(`Anchor not found for [${label}]: ${needle.slice(0, 120)}`);
  }
  const second = html.indexOf(needle, idx + needle.length);
  if (second !== -1) {
    throw new Error(`Multiple matches found for [${label}]`);
  }
  html = html.slice(0, idx) + replacement + html.slice(idx + needle.length);
  console.log(`✓ Applied: ${label}`);
}

// 1. Update page title & dropzone version label cleanly
mustReplace(
  '<title>DEBOOGER2K | Project Studio — DB.135</title>',
  '<title>DEBOOGER2K | Project Studio — DB.136</title>',
  'Document title'
);
mustReplace(
  '<p class="dropzone-upload-help">Open HTML, React, ZIP, or project files. DEBOOGER DB.135</p>',
  '<p class="dropzone-upload-help">Open HTML, React, ZIP, or project files. DEBOOGER DB.136</p>',
  'Dropzone version badge'
);

// 2. Restore original DB.135 signature palette tokens (:root) and remove dead #view-styles CSS + inject #db136-phase1-styles
mustReplace(
  `:root {
  --font-sans: 'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  --bg-canvas: #f8fafc !important;
  --bg-surface: #ffffff !important;
  --bg-subtle: #f1f5f9 !important;
  --bg-hover: #f8fafc !important;
  --border-subtle: #e2e8f0 !important;
  --border-strong: #cbd5e1 !important;
  --text-main: #0f172a !important;
  --text-muted: #475569 !important;
  --text-subtle: #64748b !important;
  --primary: #2563eb !important;
  --primary-dark: #1d4ed8 !important;
  --primary-light: #eff6ff !important;
  --danger: #dc2626 !important;
  --danger-light: #fef2f2 !important;
  --warning: #d97706 !important;
  --warning-light: #fffbeb !important;
  --success: #16a34a !important;
  --success-light: #f0fdf4 !important;
  --header-h: 56px !important;
  --radius-sm: 6px !important;
  --radius-md: 8px !important;
  --radius-lg: 12px !important;
  --v30-bg: #f8fafc !important;
  --v30-surface: #ffffff !important;
  --v30-panel: #ffffff !important;
  --v30-line: #e2e8f0 !important;
  --v30-primary: #2563eb !important;
  --v30-primary-strong: #1d4ed8 !important;
  --v30-shadow: 0 4px 20px rgba(15, 23, 42, 0.06) !important;
  --v30-radius: 8px !important;
  --v30-text: #0f172a !important;
  --v30-muted: #475569 !important;
  --dark-accent: #0f172a !important;
}`,
  `:root {
  --font-sans: 'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  --bg-canvas: #f5f6fb !important;
  --bg-surface: #ffffff !important;
  --bg-subtle: #f1f4f8 !important;
  --bg-hover: #f8fafb !important;
  --border-subtle: #e2e6ef !important;
  --border-strong: #cfd6e3 !important;
  --text-main: #252936 !important;
  --text-muted: #4b5568 !important;
  --text-subtle: #6b768a !important;
  --primary: #6558d3 !important;
  --primary-dark: #5144bd !important;
  --primary-light: #f3f1ff !important;
  --teal: #087f6e !important;
  --teal-hover: #06695b !important;
  --teal-light: #effaf7 !important;
  --teal-border: #b6e3d7 !important;
  --danger: #dc4c64 !important;
  --danger-light: #fef2f4 !important;
  --warning: #d89525 !important;
  --warning-light: #fffbeb !important;
  --success: #087f6e !important;
  --success-light: #effaf7 !important;
  --header-h: 56px !important;
  --radius-sm: 6px !important;
  --radius-md: 8px !important;
  --radius-lg: 12px !important;
  --v30-bg: #f5f6fb !important;
  --v30-surface: #ffffff !important;
  --v30-panel: #ffffff !important;
  --v30-line: #e2e6ef !important;
  --v30-primary: #6558d3 !important;
  --v30-primary-strong: #5144bd !important;
  --v30-shadow: 0 4px 20px rgba(37, 41, 54, 0.06) !important;
  --v30-radius: 8px !important;
  --v30-text: #252936 !important;
  --v30-muted: #4b5568 !important;
  --dark-accent: #252936 !important;
  --db136-drawer-w: clamp(380px, 35vw, 490px);
}`,
  'Restore original signature palette tokens in :root'
);

// Remove dead #view-styles CSS block (HTML #view-styles container was already removed in prior version)
mustReplace(
  `/* Longer, cleaner Design page cards & color rows */
#view-styles .db80-palette {
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)) !important;
  gap: 10px !important;
  max-height: none !important;
  overflow: visible !important;
}
#view-styles .db80-palette-row {
  padding: 12px 14px !important;
  gap: 12px !important;
  border-radius: 8px !important;
  min-height: 76px !important;
  grid-template-columns: 28px minmax(0, 1fr) auto !important;
}
#view-styles .db80-palette-row .db80-swatch {
  width: 26px !important;
  height: 26px !important;
  border-radius: 6px !important;
}
#view-styles .design-guide-grid {
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)) !important;
  gap: 14px !important;
}
#view-styles .design-guide-row {
  padding: 14px 16px !important;
  gap: 12px !important;
}
#view-styles .design-guide-where {
  font-size: 13.5px !important;
  font-weight: 600 !important;
  color: #0f172a !important;
  margin-bottom: 3px !important;
}
#view-styles .design-guide-what {
  font-size: 12.5px !important;
  color: #475569 !important;
  margin-bottom: 6px !important;
}`,
  `/* Removed unused #view-styles CSS rules cleanly in DB.136 */`,
  'Prune confirmed dead #view-styles CSS'
);

// Replace end </style> with comprehensive #db136-phase1-styles restoring DB.135 signature palette & ultra-premium drawer/Pages/Section/Selection styling
const db136Styles = `<style id="db136-phase1-styles">
/* === DB.136 PHASE 1: ULTRA-PREMIUM VISUAL REDESIGN (DEBOOGER INTERFACE ONLY) === */
:root { --db136-drawer-w: clamp(380px, 35vw, 490px); }

/* Brand & Topbar harmony with Deep Charcoal (#252936), Royal Violet (#6558d3/#7563ac) & Emerald Teal (#087f6e) */
.top-nav .workspace-icon-btn.active,
.top-nav .workspace-icon-btn[aria-pressed="true"] {
  background: #f3f1ff !important;
  border-color: #d6cffc !important;
  color: #5144bd !important;
}
#btn-inspect-toolbar[aria-pressed="true"],
#btn-inspect-toolbar.active {
  background: #effaf7 !important;
  border-color: #a9ded0 !important;
  color: #06695b !important;
}
.header-actions .project-page-picker select:focus-visible {
  outline: 2px solid #087f6e !important;
  border-color: #087f6e !important;
}

/* Compact inline zoom & fit group inside desktop topbar actions when project loaded */
.db136-zoom-group {
  display: none;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border: 1px solid #e2e6ef;
  border-radius: 7px;
  background: #f8fafc;
}
.header-actions.has-project .db136-zoom-group { display: inline-flex; }
@media (max-width: 1020px) { .db136-zoom-group { display: none !important; } }
.db136-zoom-btn {
  height: 26px !important;
  min-width: 26px !important;
  padding: 0 7px !important;
  border: 0 !important;
  border-radius: 5px !important;
  background: transparent !important;
  color: #4b5568 !important;
  font-size: 12px !important;
  font-weight: 550 !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.14s ease, color 0.14s ease;
}
.db136-zoom-btn:hover { background: #ffffff !important; color: #252936 !important; box-shadow: 0 1px 2px rgba(37,41,54,.06); }

/* Right Drawer Container: Resizable, Ultra-Clean, Zero Overlap */
#view-workspace .workspace-pane-right {
  width: var(--db136-drawer-w, 440px) !important;
  max-width: min(740px, 94vw) !important;
  min-width: 330px !important;
  background: #ffffff !important;
  color: #252936 !important;
  border-left: 1px solid #e2e6ef !important;
  box-shadow: -12px 0 36px rgba(37, 41, 54, 0.10) !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  resize: none !important;
  direction: ltr !important;
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.18s ease !important;
}
body.db110-drawer-open #d2-drawer-edge-toggle {
  right: var(--db136-drawer-w, 440px) !important;
  transition: right 0.22s cubic-bezier(0.22, 1, 0.36, 1) !important;
}
body.db136-resizing #view-workspace .workspace-pane-right,
body.db136-resizing #d2-drawer-edge-toggle {
  transition: none !important;
}
body.db136-resizing #live-sandbox-frame {
  pointer-events: none !important;
}
#d2-drawer-edge-toggle {
  background: #ffffff !important;
  color: #4b5568 !important;
  border: 1px solid #dde2ec !important;
  box-shadow: -4px 4px 16px rgba(37, 41, 54, 0.12) !important;
}
#d2-drawer-edge-toggle:hover {
  background: #effaf7 !important;
  color: #087f6e !important;
  border-color: #9dd8c8 !important;
}

/* Desktop Left-Edge Resizer Handle */
#db136-drawer-resizer {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 7px;
  cursor: col-resize;
  z-index: 40;
  background: transparent;
  transition: background-color 0.15s ease;
}
#db136-drawer-resizer::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 36px;
  border-radius: 3px;
  background: #cbd5e1;
  opacity: 0;
  transition: opacity 0.16s ease, background-color 0.16s ease;
}
#db136-drawer-resizer:hover,
body.db136-resizing #db136-drawer-resizer {
  background: rgba(8, 127, 110, 0.06);
}
#db136-drawer-resizer:hover::after,
body.db136-resizing #db136-drawer-resizer::after {
  opacity: 1;
  background: #087f6e;
}
@media (max-width: 900px) { #db136-drawer-resizer { display: none !important; } }

/* Drawer Unified Top Header + 5-Tab Segmented Bar + Close Button */
#db136-drawer-top {
  flex: 0 0 auto;
  background: #f8fafc;
  border-bottom: 1px solid #e2e6ef;
  display: flex;
  flex-direction: column;
}
.db136-drawer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 7px 8px 7px 10px;
}
#view-workspace .workspace-pane-right .db99-inspector-tabs {
  flex: 1 1 auto !important;
  min-width: 0 !important;
  background: #eef1f6 !important;
  border: 1px solid #e2e6ef !important;
  border-bottom: 1px solid #e2e6ef !important;
  border-radius: 8px !important;
  padding: 3px !important;
  gap: 2px !important;
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  overflow: visible !important;
}
#view-workspace .workspace-pane-right .db99-tab-btn {
  background: transparent !important;
  color: #556175 !important;
  border: 1px solid transparent !important;
  border-radius: 6px !important;
  padding: 5px 4px !important;
  font-size: 12px !important;
  font-weight: 550 !important;
  min-height: 29px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 4px !important;
  transition: background-color 0.14s ease, color 0.14s ease, box-shadow 0.14s ease !important;
}
#view-workspace .workspace-pane-right .db99-tab-btn:hover {
  color: #252936 !important;
  background: rgba(255,255,255,0.65) !important;
}
#view-workspace .workspace-pane-right .db99-tab-btn.active {
  background: #ffffff !important;
  color: #087f6e !important;
  border-color: #d6e2df !important;
  box-shadow: 0 1px 3px rgba(37, 41, 54, 0.08) !important;
  font-weight: 650 !important;
}
#view-workspace .workspace-pane-right .db99-tab-badge {
  background: #e5e9f2 !important;
  color: #364152 !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
  padding: 1px 5px !important;
  border-radius: 4px !important;
  line-height: 1.25 !important;
}
#view-workspace .workspace-pane-right .db99-tab-btn.active .db99-tab-badge {
  background: #e2f5ef !important;
  color: #087f6e !important;
}
#db136-drawer-close {
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border: 1px solid #dde2ec;
  border-radius: 7px;
  background: #ffffff;
  color: #4b5568;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.14s ease;
}
#db136-drawer-close:hover {
  background: #fef2f4;
  border-color: #f3c4cc;
  color: #b42338;
}

/* Mobile Sheet Handle & Peek Preview Mode */
.db136-mobile-sheet-bar {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px 2px;
  background: #f8fafc;
}
.db136-sheet-grip {
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: #cbd5e1;
  margin: 0 auto;
}
.db136-peek-btn {
  border: 1px solid #d7dfe9 !important;
  background: #ffffff !important;
  color: #364152 !important;
  border-radius: 6px !important;
  padding: 3px 9px !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
  cursor: pointer;
}
.db136-peek-btn.active {
  background: #effaf7 !important;
  border-color: #9dd8c8 !important;
  color: #087f6e !important;
}
@media (max-width: 900px) {
  .db136-mobile-sheet-bar { display: flex; }
  body.mobile-shell.workspace-view-active.mobile-workspace-results.db136-mobile-peek .workspace-pane-right.drawer-open {
    top: auto !important;
    height: 52dvh !important;
    max-height: 52dvh !important;
    bottom: calc(46px + env(safe-area-inset-bottom)) !important;
    border-top: 1px solid #cfd6e3 !important;
    border-radius: 14px 14px 0 0 !important;
    box-shadow: 0 -10px 30px rgba(37, 41, 54, 0.16) !important;
    z-index: 4002 !important;
  }
}

/* Scrollable Interior Panel Bodies */
#view-workspace .workspace-pane-right .db99-inspector-panel-body {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  overflow-y: auto !important;
  background: #ffffff !important;
  color: #252936 !important;
}
#view-workspace .workspace-pane-right .db99-inspector-panel-body[hidden] {
  display: none !important;
}

/* Signature Colors for Drawer Interactive Controls (Replacing Generic Cobalt Blue) */
#view-workspace .workspace-pane-right .d2-pop-btn:hover,
#view-workspace .workspace-pane-right .btn:hover,
#view-workspace .workspace-pane-right .db116-seg-btn:hover,
#view-workspace .workspace-pane-right .db116-scope-chip:hover,
#view-workspace .workspace-pane-right .db116-outer-btn:hover,
#view-workspace .workspace-pane-right .audit-quick-actions button:hover,
#view-workspace .workspace-pane-right .db128-mouse-btn:hover,
#view-workspace .workspace-pane-right .db128-pd-subtab:hover,
#view-workspace .workspace-pane-right .db128-align-btn:hover,
#view-workspace .workspace-pane-right .db128-act-icon-btn:hover,
#view-workspace .workspace-pane-right .db117-area-btn:hover {
  background: #effaf7 !important;
  border-color: #9ad8c6 !important;
  color: #06695b !important;
}
#view-workspace .workspace-pane-right .d2-pop-btn.primary,
#view-workspace .workspace-pane-right .db116-scope-chip.active,
#view-workspace .workspace-pane-right .db116-seg-btn.active,
#view-workspace .workspace-pane-right .db128-mouse-btn.active,
#view-workspace .workspace-pane-right .db128-pd-subtab.active,
#view-workspace .workspace-pane-right .db128-align-btn.active,
#view-workspace .workspace-pane-right .db117-area-btn.active {
  background: #087f6e !important;
  border-color: #087f6e !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}
#view-workspace .workspace-pane-right input:focus,
#view-workspace .workspace-pane-right select:focus,
#view-workspace .workspace-pane-right textarea:focus {
  border-color: #087f6e !important;
  box-shadow: 0 0 0 2px rgba(8, 127, 110, 0.18) !important;
}
#view-workspace .workspace-pane-right .db117-sub-meta,
#view-workspace .workspace-pane-right .db128-crumb button,
#view-workspace .workspace-pane-right .db117-ai-item-meta {
  color: #6558d3 !important;
}
#view-workspace .workspace-pane-right .db117-match-bar,
#view-workspace .workspace-pane-right .db128-multi-banner {
  background: #f3f1ff !important;
  border-color: #cfc6fb !important;
  color: #3e329e !important;
}
#view-workspace .workspace-pane-right .db117-overview-card:hover,
#view-workspace .workspace-pane-right .db128-overview-card:hover,
#view-workspace .workspace-pane-right .db117-color-tile:hover,
#view-workspace .workspace-pane-right .db128-token-row:hover,
#view-workspace .workspace-pane-right .db129-el-row:hover {
  background: #effaf7 !important;
  border-color: #9ad8c6 !important;
}
#view-workspace .workspace-pane-right .db129-el-row.active,
#view-workspace .workspace-pane-right .db128-token-row.active,
#view-workspace .workspace-pane-right .db117-color-tile.active {
  background: #effaf7 !important;
  border-color: #087f6e !important;
  color: #06695b !important;
}
#view-workspace .workspace-pane-right .db129-el-row.active .db129-el-kind {
  background: #d9f3ec !important;
  color: #06695b !important;
}
#view-workspace .workspace-pane-right .db129-flash-focus {
  outline: 2px solid #087f6e !important;
}
#view-workspace .workspace-pane-right .db117-help-btn:hover,
#view-workspace .workspace-pane-right .db117-help-btn[aria-expanded="true"] {
  border-color: #6558d3 !important;
  color: #5144bd !important;
  background: #f3f1ff !important;
}
#view-workspace .workspace-pane-right .db117-step-btn:hover {
  background: #e2f5ef !important;
  color: #06695b !important;
}

/* Text Highlighted Actions Banner inside Edit & Toolbar */
.db136-text-sel-card {
  background: #f8fafc;
  border: 1px solid #d6cffc;
  border-left: 3px solid #6558d3;
  border-radius: 8px;
  padding: 9px 10px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.db136-text-sel-quote {
  font-size: 12px;
  color: #252936;
  background: #ffffff;
  border: 1px solid #e2e6ef;
  border-radius: 6px;
  padding: 5px 8px;
  max-height: 54px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.db136-text-sel-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

/* === PAGES & EXPANDABLE SECTION ACCORDIONS (PHASE 1) === */
.db136-page-acc {
  border: 1px solid #e2e6ef;
  border-radius: 9px;
  background: #ffffff;
  overflow: hidden;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.db136-page-acc.active {
  border-color: #9ad8c6;
  box-shadow: 0 2px 10px rgba(8, 127, 110, 0.07);
}
.db136-page-head {
  width: 100%;
  border: 0;
  background: #f8fafc;
  color: #252936;
  padding: 9px 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  transition: background-color 0.13s ease;
}
.db136-page-head:hover { background: #f1f5f9; }
.db136-page-acc.active > .db136-page-head {
  background: #effaf7;
  color: #06695b;
}
.db136-page-title-wrap {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  flex: 1;
}
.db136-page-chev {
  font-size: 11px;
  color: #6b768a;
  transition: transform 0.16s ease;
  flex: 0 0 auto;
}
.db136-page-acc.expanded > .db136-page-head .db136-page-chev { transform: rotate(90deg); color: #087f6e; }
.db136-page-meta {
  font-size: 11px;
  font-weight: 500;
  color: #6b768a;
  flex: 0 0 auto;
}
.db136-page-sections {
  border-top: 1px solid #e6ebf2;
  background: #ffffff;
  padding: 7px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Individual Expandable Section Card inside Page Dropdown */
.db136-sec-card {
  border: 1px solid #e2e6ef;
  border-radius: 8px;
  background: #fafbfd;
  overflow: hidden;
}
.db136-sec-card.expanded {
  border-color: #6558d3;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(37, 41, 54, 0.06);
}
.db136-sec-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 8px;
}
.db136-sec-toggle {
  flex: 1 1 auto;
  min-width: 0;
  border: 0 !important;
  background: transparent !important;
  padding: 2px 4px !important;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  color: #252936 !important;
}
.db136-sec-name {
  font-size: 12.5px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}
.db136-sec-tag {
  font-size: 10.5px;
  font-weight: 550;
  color: #556175;
  background: #edf1f6;
  border-radius: 4px;
  padding: 1px 6px;
  flex: 0 0 auto;
}
.db136-locate-btn {
  flex: 0 0 auto;
  border: 1px solid #d5dce7 !important;
  background: #ffffff !important;
  color: #087f6e !important;
  border-radius: 5px !important;
  padding: 3px 8px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  cursor: pointer;
}
.db136-locate-btn:hover {
  background: #effaf7 !important;
  border-color: #087f6e !important;
}

/* Spacious Section Editor Workspace */
.db136-sec-editor {
  border-top: 1px solid #e7ecf3;
  background: #ffffff;
  padding: 11px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.db136-sec-scope-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 6px;
  background: #f8fafc;
  border: 1px solid #e2e6ef;
  border-radius: 7px;
}
.db136-sec-scope-btn {
  flex: 1 1 auto;
  border: 1px solid transparent !important;
  background: transparent !important;
  color: #4b5568 !important;
  border-radius: 5px !important;
  padding: 4px 7px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  cursor: pointer;
}
.db136-sec-scope-btn.active {
  background: #ffffff !important;
  border-color: #cfd6e3 !important;
  color: #6558d3 !important;
  box-shadow: 0 1px 2px rgba(37,41,54,0.06);
}
.db136-sec-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 8px;
  border-top: 1px solid #f0f3f8;
}
.db136-sec-block:first-of-type { padding-top: 0; border-top: 0; }
.db136-sec-block-title {
  font-size: 11px;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b768a;
}
.db136-sec-el-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 180px;
  overflow-y: auto;
}

/* Floating Toolbar & Context Menu harmonized to Emerald Teal / Royal Violet */
#d2-float-toolbar {
  border-color: #d7dfe9 !important;
  box-shadow: 0 10px 28px rgba(37, 41, 54, 0.16) !important;
}
#d2-float-toolbar .d2-ft-btn.active {
  background: #effaf7 !important;
  color: #087f6e !important;
}
#d2-context-menu button:hover {
  background: #effaf7 !important;
  color: #06695b !important;
}

/* Functions inside drawer seamlessly */
#view-workspace .workspace-pane-right #db99-panel-functions .db99-panel-content {
  padding: 10px 12px 20px !important;
}
</style>`;

mustReplace(
  `@media(pointer:coarse){#d2-float-toolbar .d2-ft-btn{position:relative;touch-action:manipulation}#d2-float-toolbar .d2-ft-btn::after{content:"";position:absolute;left:0;right:0;top:-6px;bottom:-6px}#db133-functions-dialog button,#db133-functions-dialog select{touch-action:manipulation}}
</style>`,
  `@media(pointer:coarse){#d2-float-toolbar .d2-ft-btn{position:relative;touch-action:manipulation}#d2-float-toolbar .d2-ft-btn::after{content:"";position:absolute;left:0;right:0;top:-6px;bottom:-6px}#db133-functions-dialog button,#db133-functions-dialog select{touch-action:manipulation}}
</style>\n` + db136Styles.replace(/^<\/style>\n?/, ''),
  'Inject #db136-phase1-styles'
);

// 3. Clean up Topbar: remove redundant Design nav button, keep Tools Design button routing to drawer Design tab, and add subtle desktop Zoom/Fit controls in header-actions
mustReplace(
  `<button type="button" class="workspace-icon-btn" data-desktop-view="view-styles" onclick="switchView('view-styles')" aria-label="Design guide" title="Design — Switch real pages, pick items, and adjust colors, fonts &amp; spacing"><svg class="nav-symbol" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h2a2.5 2.5 0 0 0 1.6-4.4c-1-.8-.7-2.1.5-2.1H18A3 3 0 0 0 21 11 9 9 0 0 0 12 3Z"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="10" r="1"/></svg><span class="nav-label">Design</span></button>`,
  '',
  'Remove redundant Design button from topbar'
);

mustReplace(
  `<div class="header-actions" id="header-actions"><label class="project-page-picker" for="d2-project-page-select"><span>Pages</span><select id="d2-project-page-select" aria-label="Choose preview page" title="Choose a page from the uploaded project"></select></label>`,
  `<div class="header-actions" id="header-actions"><label class="project-page-picker" for="d2-project-page-select"><span>Pages</span><select id="d2-project-page-select" aria-label="Choose preview page" title="Choose a page from the uploaded project"></select></label>
        <div class="db136-zoom-group" role="group" aria-label="Preview zoom controls">
          <button type="button" class="db136-zoom-btn" onclick="adjustPreviewZoom(-0.15)" title="Zoom out">−</button>
          <button type="button" class="db136-zoom-btn" onclick="resetPreviewZoom()" title="Fit preview">Fit</button>
          <button type="button" class="db136-zoom-btn" onclick="adjustPreviewZoom(0.15)" title="Zoom in">+</button>
          <button type="button" class="db136-zoom-btn" onclick="togglePanoramicPreview()" title="Full preview">Full</button>
        </div>`,
  'Add compact zoom/fit quick controls in header-actions'
);

// 4. Right Drawer HTML: Add resizer, mobile sheet peek bar, 5-tab segmented bar (Edit | Design | Audit | Functions | Captures) + Close button
mustReplace(
  `      <!-- Right: Debooger diagnostics workspace -->
      <div class="workspace-pane-right" aria-label="Project panel">
        <!-- Main drawer tabs: Edit | Design | Audit. Internal utility panels remain for compatibility. -->
        <div class="db99-inspector-tabs" role="tablist" aria-label="Panel tabs">
          <button type="button" class="db99-tab-btn" id="db99-tab-edit" role="tab" aria-selected="false" onclick="db99SwitchInspectorTab('edit')">
            <span>Edit</span>
          </button>
          <button type="button" class="db99-tab-btn" id="db99-tab-pages" role="tab" aria-selected="false" onclick="db99SwitchInspectorTab('pages')">
            <span>Design</span>
          </button>
          <button type="button" class="db99-tab-btn active" id="db99-tab-audit" role="tab" aria-selected="true" onclick="db99SwitchInspectorTab('audit')">
            <span>Audit</span>
            <span class="db99-tab-badge" id="db99-audit-tab-count">0</span>
          </button>
        </div>`,
  `      <!-- Right: Debooger Studio Drawer -->
      <div class="workspace-pane-right" aria-label="Project panel">
        <div id="db136-drawer-resizer" role="separator" aria-orientation="vertical" aria-label="Resize side drawer" title="Drag to resize panel"></div>
        <div id="db136-drawer-top">
          <div class="db136-mobile-sheet-bar">
            <button type="button" class="db136-peek-btn" id="db136-mobile-peek-btn" onclick="window.db136ToggleMobilePeek()" aria-pressed="false" title="Show live preview above editor">Peek Preview</button>
            <div class="db136-sheet-grip" aria-hidden="true"></div>
            <span style="width:72px;"></span>
          </div>
          <div class="db136-drawer-bar">
            <div class="db99-inspector-tabs" role="tablist" aria-label="Panel tabs">
              <button type="button" class="db99-tab-btn" id="db99-tab-edit" role="tab" aria-selected="false" onclick="db99SwitchInspectorTab('edit')">
                <span>Edit</span>
              </button>
              <button type="button" class="db99-tab-btn" id="db99-tab-pages" role="tab" aria-selected="false" onclick="db99SwitchInspectorTab('pages')">
                <span>Design</span>
              </button>
              <button type="button" class="db99-tab-btn active" id="db99-tab-audit" role="tab" aria-selected="true" onclick="db99SwitchInspectorTab('audit')">
                <span>Audit</span>
                <span class="db99-tab-badge" id="db99-audit-tab-count">0</span>
              </button>
              <button type="button" class="db99-tab-btn" id="db99-tab-functions" role="tab" aria-selected="false" onclick="db99SwitchInspectorTab('functions')">
                <span>Functions</span>
              </button>
              <button type="button" class="db99-tab-btn" id="db99-tab-captures" role="tab" aria-selected="false" onclick="db99SwitchInspectorTab('captures')">
                <span>Captures</span>
                <span class="db99-tab-badge" id="db110-captures-tab-count">0</span>
              </button>
            </div>
            <button type="button" id="db136-drawer-close" onclick="closeAuditOrDrawer()" aria-label="Close panel" title="Close panel (Esc)">×</button>
          </div>
        </div>`,
  'Upgrade Right Drawer Header with Resizer, 5 Tabs, Close Button, and Mobile Peek'
);

// 5. Update Mouse Bar in #db99-panel-edit: Separate "Select" (select elements + normal text highlighting!) from "Move" (move elements/sections), "Box Pick", and "Use Page"
mustReplace(
  `            <div class="db128-mouse-bar" role="group" aria-label="What your mouse does">
              <button type="button" class="db128-mouse-btn" data-mmode="browse" onclick="window.db128SetMouseMode('browse')" title="Use page links and buttons normally">Use Page</button>
              <button type="button" class="db128-mouse-btn active" data-mmode="move" onclick="window.db128SetMouseMode('move')" title="Click any item to edit it, or drag it to move it">Pick &amp; Move</button>
              <button type="button" class="db128-mouse-btn" data-mmode="box" onclick="window.db128SetMouseMode('box')" title="Drag a box with your mouse to pick several items at once">Box Pick</button>
              <button type="button" class="db128-mouse-btn" data-mmode="text" onclick="window.db128SetMouseMode('text')" title="Drag across words to highlight them, then click the trash icon">Pick Words</button>
            </div>`,
  `            <div class="db128-mouse-bar" role="group" aria-label="Mouse tool mode">
              <button type="button" class="db128-mouse-btn active" data-mmode="select" onclick="window.db128SetMouseMode('select')" title="Click items to edit, drag across words to highlight text, or drag the ⋮⋮ handle to move">Select</button>
              <button type="button" class="db128-mouse-btn" data-mmode="move" onclick="window.db128SetMouseMode('move')" title="Drag selected elements or sections freely to move them">Move</button>
              <button type="button" class="db128-mouse-btn" data-mmode="box" onclick="window.db128SetMouseMode('box')" title="Drag a rectangle box to pick multiple items at once">Box Pick</button>
              <button type="button" class="db128-mouse-btn" data-mmode="browse" onclick="window.db128SetMouseMode('browse')" title="Browse and click links normally without selecting">Use Page</button>
            </div>`,
  'Upgrade Edit drawer Mouse Mode segmented bar'
);

// Simplify Design panel #db99-panel-pages layout to center Pages -> Expandable Sections while retaining subtabs & tokens cleanly
mustReplace(
  `          <div class="db99-panel-content" id="db128-pages-design-content">
            <div class="db99-section-card" style="padding:8px 10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <div class="db128-crumb" id="db128-pd-breadcrumb"><span>All pages</span></div>
                <span style="font-size:11px;color:#64748b;" id="db117-design-specs-status">Live sync</span>
              </div>
              <div id="db110-pages-list" style="display:flex;flex-direction:column;gap:4px;"><span class="db99-empty-hint">Open a project to see pages.</span></div>
              <div id="db117-app-areas-list" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;"></div>
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
              <summary>Sections on this page</summary>
              <div id="db110-sections-list" style="display:flex;flex-direction:column;gap:4px;"><span class="db99-empty-hint">Sections show up when the page loads.</span></div>
            </details>`,
  `          <div class="db99-panel-content" id="db128-pages-design-content">
            <div class="db99-section-card" style="padding:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <div class="db128-crumb" id="db128-pd-breadcrumb"><span>Pages &amp; Sections</span></div>
                <span style="font-size:11px;color:#6b768a;" id="db117-design-specs-status">Live sync</span>
              </div>
              <div id="db110-pages-list" style="display:flex;flex-direction:column;gap:7px;"><span class="db99-empty-hint">Open a project to see its pages.</span></div>
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
  'Streamline Design panel Pages & Sections layout'
);

// 6. Upgrade toggleWorkspaceDrawer so Design ('pages') and Edit ('edit') keep desktop preview clickable without click-outside blocker
mustReplace(
  `        const leftOpen = Boolean(document.querySelector('.workspace-pane-left.drawer-open'));
        const editTabActive = Boolean(STATE.inspectMode && (window.DB110Studio?.activeTab?.() || '') === 'edit');
        clickOutside.hidden = !(leftOpen || (rightOpen && !editTabActive));`,
  `        const leftOpen = Boolean(document.querySelector('.workspace-pane-left.drawer-open'));
        const curTab = window.DB110Studio?.activeTab?.() || '';
        const interactivePreviewTab = Boolean(STATE.inspectMode && (curTab === 'edit' || curTab === 'pages'));
        clickOutside.hidden = !(leftOpen || (rightOpen && !interactivePreviewTab));`,
  'Keep preview interactive for both Edit and Design drawer tabs'
);

// 7. Injected Iframe Runtime Upgrades:
// - Signature colors (#087f6e Emerald Teal primary, #7563ac Royal Violet multi/hover)
// - Visible minimal resize corner handles + subtle edge pills
// - Dedicated Drag Handle (#d2-drag-handle) on top-left of selection box
// - Separate 'select' mode (clicks select, text dragging selects words naturally without hijack) vs 'move' mode
// - Ctrl/Shift+click multi-select in d2InspectClick
// - Inline text range format/replace/delete handler (DEBOOGER_FORMAT_TEXT_RANGE)
// - Live section child element inspector (DEBOOGER_GET_SECTION_DETAILS) & smooth scroll keeping selected visible
mustReplace(
  `            let d2Overlay=null,d2HoverBox=null,d2MultiHost=null,d2HandlesHost=null,d2SizePill=null,d2SnapHost=null,d2DropLine=null,d2Locked=null,d2LockedEl=null,d2ResizeState=null,d2JustDragged=false,d2InlineEdit=null,d2MultiTargets=[];
            const d2HandleCursors={n:'ns-resize',s:'ns-resize',e:'ew-resize',w:'ew-resize',nw:'nwse-resize',ne:'nesw-resize',se:'nwse-resize',sw:'nesw-resize'};
            function d2EnsureUi(){
              if(!d2HoverBox){
                d2HoverBox=document.createElement('div');d2HoverBox.id='d2-hover-box';
                d2HoverBox.style.cssText='position:fixed;z-index:2147483643;pointer-events:none;border:1.5px solid rgba(59,130,246,.82);background:rgba(59,130,246,.07);border-radius:2px;box-sizing:border-box;display:none;transition:none;';
                document.documentElement.appendChild(d2HoverBox);
              }
              if(!d2MultiHost){
                d2MultiHost=document.createElement('div');d2MultiHost.id='d2-multi-highlight';
                d2MultiHost.style.cssText='position:fixed;inset:0;z-index:2147483644;pointer-events:none;display:none;';
                document.documentElement.appendChild(d2MultiHost);
              }
              if(!d2Overlay){
                d2Overlay=document.createElement('div');d2Overlay.id='d2-inspect-overlay';
                d2Overlay.style.cssText='position:fixed;z-index:2147483645;pointer-events:none;border:1.5px solid #2563eb;background:rgba(37,99,235,.04);border-radius:2px;box-sizing:border-box;display:none;';
                document.documentElement.appendChild(d2Overlay);
              }
              if(!d2HandlesHost){
                d2HandlesHost=document.createElement('div');d2HandlesHost.id='d2-handles-host';
                d2HandlesHost.style.cssText='position:fixed;inset:0;z-index:2147483647;pointer-events:none;display:none;';
                // Clean invisible edge & corner grab strips right along the blue border lines (no cluttered boxes!)
                Object.keys(d2HandleCursors).forEach(function(dir){
                  const h=document.createElement('div');
                  h.className='d2-resize-edge';h.dataset.dir=dir;
                  h.setAttribute('aria-label','Resize '+dir);
                  h.style.cssText='position:fixed;background:transparent;border:0;box-sizing:border-box;pointer-events:auto;touch-action:none;cursor:'+d2HandleCursors[dir]+';';
                  h.addEventListener('pointerdown',d2StartResize,true);
                  d2HandlesHost.appendChild(h);
                });
                document.documentElement.appendChild(d2HandlesHost);
              }
              if(!d2SizePill){
                d2SizePill=document.createElement('div');d2SizePill.id='d2-size-pill';
                d2SizePill.style.cssText='display:none !important;pointer-events:none;';
                document.documentElement.appendChild(d2SizePill);
              }
              if(!d2SnapHost){
                d2SnapHost=document.createElement('div');d2SnapHost.id='d2-snap-guides';
                d2SnapHost.style.cssText='position:fixed;inset:0;z-index:2147483646;pointer-events:none;display:none;';
                document.documentElement.appendChild(d2SnapHost);
              }
              if(!d2DropLine){
                d2DropLine=document.createElement('div');d2DropLine.id='d2-drop-line';
                d2DropLine.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;display:none;background:#2563eb;border-radius:2px;box-shadow:0 0 0 2px rgba(37,99,235,.22);';
                document.documentElement.appendChild(d2DropLine);
              }
            }
            function d2PaintMultiHighlights(selectors){
              d2EnsureUi();
              if(Array.isArray(selectors))d2MultiTargets=selectors.slice(0,140);
              d2MultiHost.replaceChildren();
              if(!d2MultiTargets.length){d2MultiHost.style.display='none';return;}
              const frag=document.createDocumentFragment();
              let drawn=0;
              d2MultiTargets.forEach(function(s){
                let el=null;
                try{el=typeof s==='string'?document.querySelector(s):s;}catch(_){}
                if(!el||!el.isConnected||el===d2LockedEl)return;
                const r=el.getBoundingClientRect();
                if(r.width<2||r.height<2||r.bottom<0||r.top>innerHeight)return;
                const b=document.createElement('div');
                b.style.cssText='position:fixed;left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px;border:1.5px solid rgba(59,130,246,.82);background:rgba(59,130,246,.09);border-radius:2px;box-sizing:border-box;pointer-events:none;';
                frag.appendChild(b);drawn++;
              });
              if(drawn){d2MultiHost.appendChild(frag);d2MultiHost.style.display='block';}
              else d2MultiHost.style.display='none';
            }
            function d2IsButtonLike(el){
              if(!el)return false;
              const tag=String(el.tagName||'').toLowerCase();
              const role=(el.getAttribute&&el.getAttribute('role'))||'';
              const cls=String(el.className||'').toLowerCase();
              return tag==='button'||tag==='a'||role==='button'||/\\\\b(?:btn|button|badge|pill|chip)\\\\b/.test(cls);
            }
            function d2CanResize(sel){return !!(sel&&d2LockedEl&&d2LockedEl.isConnected&&d2LockedEl!==document.documentElement&&d2LockedEl!==document.body);}
            let d2TouchDragEl=null,d2TouchDragOld='';
            function d2Paint(sel){
              d2EnsureUi();
              d2SizePill.style.display='none';
              const touchTarget=sel&&d2LockedEl?.isConnected?d2LockedEl:null;
              if(d2TouchDragEl!==touchTarget){
                if(d2TouchDragEl)d2TouchDragEl.style.touchAction=d2TouchDragOld;
                d2TouchDragEl=touchTarget;d2TouchDragOld=touchTarget?.style.touchAction||'';
                if(touchTarget)touchTarget.style.touchAction='none';
              }
              if(!sel||!d2LockedEl||!d2LockedEl.isConnected){
                d2Overlay.style.display='none';d2HandlesHost.style.display='none';return;
              }
              const r=d2LockedEl.getBoundingClientRect();
              d2Overlay.style.display='block';d2Overlay.style.left=r.left+'px';d2Overlay.style.top=r.top+'px';
              d2Overlay.style.width=Math.max(1,r.width)+'px';d2Overlay.style.height=Math.max(1,r.height)+'px';
              if(d2CanResize(sel)){
                d2HandlesHost.style.display='block';
                const t=6,c=10;
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
                };
                d2HandlesHost.querySelectorAll('.d2-resize-edge').forEach(function(el){
                  const bx=boxes[el.dataset.dir];if(!bx)return;
                  el.style.left=Math.round(bx[0])+'px';el.style.top=Math.round(bx[1])+'px';
                  el.style.width=Math.round(bx[2])+'px';el.style.height=Math.round(bx[3])+'px';
                });
              }else{d2HandlesHost.style.display='none';}
              if(d2MultiTargets.length)d2PaintMultiHighlights();
            }`,
  `            let d2Overlay=null,d2HoverBox=null,d2MultiHost=null,d2HandlesHost=null,d2DragHandle=null,d2SizePill=null,d2SnapHost=null,d2DropLine=null,d2Locked=null,d2LockedEl=null,d2ResizeState=null,d2JustDragged=false,d2InlineEdit=null,d2MultiTargets=[],d2SavedTextRange=null;
            const d2HandleCursors={n:'ns-resize',s:'ns-resize',e:'ew-resize',w:'ew-resize',nw:'nwse-resize',ne:'nesw-resize',se:'nwse-resize',sw:'nesw-resize'};
            function d2EnsureUi(){
              if(!d2HoverBox){
                d2HoverBox=document.createElement('div');d2HoverBox.id='d2-hover-box';
                d2HoverBox.style.cssText='position:fixed;z-index:2147483643;pointer-events:none;border:1.5px dashed rgba(117,99,172,.82);background:rgba(117,99,172,.05);border-radius:3px;box-sizing:border-box;display:none;transition:none;';
                document.documentElement.appendChild(d2HoverBox);
              }
              if(!d2MultiHost){
                d2MultiHost=document.createElement('div');d2MultiHost.id='d2-multi-highlight';
                d2MultiHost.style.cssText='position:fixed;inset:0;z-index:2147483644;pointer-events:none;display:none;';
                document.documentElement.appendChild(d2MultiHost);
              }
              if(!d2Overlay){
                d2Overlay=document.createElement('div');d2Overlay.id='d2-inspect-overlay';
                d2Overlay.style.cssText='position:fixed;z-index:2147483645;pointer-events:none;border:1.5px solid #087f6e;background:rgba(8,127,110,.035);border-radius:3px;box-sizing:border-box;display:none;';
                document.documentElement.appendChild(d2Overlay);
              }
              if(!d2HandlesHost){
                d2HandlesHost=document.createElement('div');d2HandlesHost.id='d2-handles-host';
                d2HandlesHost.style.cssText='position:fixed;inset:0;z-index:2147483647;pointer-events:none;display:none;';
                Object.keys(d2HandleCursors).forEach(function(dir){
                  const isCorner=dir.length===2;
                  const h=document.createElement('div');
                  h.className='d2-resize-edge'+(isCorner?' d2-resize-corner':'');h.dataset.dir=dir;
                  h.setAttribute('aria-label','Resize '+dir);
                  h.style.cssText='position:fixed;box-sizing:border-box;pointer-events:auto;touch-action:none;cursor:'+d2HandleCursors[dir]+';'+(isCorner
                    ?'background:#ffffff;border:1.5px solid #087f6e;border-radius:2px;box-shadow:0 1px 4px rgba(37,41,54,.24);'
                    :'background:transparent;border:0;');
                  h.addEventListener('pointerdown',d2StartResize,true);
                  d2HandlesHost.appendChild(h);
                });
                d2DragHandle=document.createElement('button');
                d2DragHandle.type='button';d2DragHandle.id='d2-drag-handle';
                d2DragHandle.title='Drag to move selected element or section';
                d2DragHandle.setAttribute('aria-label','Drag to move');
                d2DragHandle.innerHTML='⋮⋮';
                d2DragHandle.style.cssText='position:fixed;height:20px;min-width:22px;padding:0 5px;border:1px solid #087f6e;border-radius:5px;background:#087f6e;color:#ffffff;font:700 11px/1 Inter,sans-serif;letter-spacing:-1px;cursor:grab;pointer-events:auto;touch-action:none;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(37,41,54,.22);user-select:none;';
                d2DragHandle.addEventListener('pointerdown',function(ev){
                  if(!inspectEnabled||!d2LockedEl||ev.button!==0)return;
                  ev.preventDefault();ev.stopPropagation();
                  d2BeginElementOrGroupDrag(ev,d2LockedEl);
                },true);
                d2HandlesHost.appendChild(d2DragHandle);
                document.documentElement.appendChild(d2HandlesHost);
              }
              if(!d2SizePill){
                d2SizePill=document.createElement('div');d2SizePill.id='d2-size-pill';
                d2SizePill.style.cssText='display:none !important;pointer-events:none;';
                document.documentElement.appendChild(d2SizePill);
              }
              if(!d2SnapHost){
                d2SnapHost=document.createElement('div');d2SnapHost.id='d2-snap-guides';
                d2SnapHost.style.cssText='position:fixed;inset:0;z-index:2147483646;pointer-events:none;display:none;';
                document.documentElement.appendChild(d2SnapHost);
              }
              if(!d2DropLine){
                d2DropLine=document.createElement('div');d2DropLine.id='d2-drop-line';
                d2DropLine.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;display:none;background:#087f6e;border-radius:2px;box-shadow:0 0 0 2px rgba(8,127,110,.22);';
                document.documentElement.appendChild(d2DropLine);
              }
            }
            function d2PaintMultiHighlights(selectors){
              d2EnsureUi();
              if(Array.isArray(selectors))d2MultiTargets=selectors.slice(0,140);
              d2MultiHost.replaceChildren();
              if(!d2MultiTargets.length){d2MultiHost.style.display='none';return;}
              const frag=document.createDocumentFragment();
              let drawn=0;
              d2MultiTargets.forEach(function(s){
                let el=null;
                try{el=typeof s==='string'?document.querySelector(s):s;}catch(_){}
                if(!el||!el.isConnected||el===d2LockedEl)return;
                const r=el.getBoundingClientRect();
                if(r.width<2||r.height<2||r.bottom<0||r.top>innerHeight)return;
                const b=document.createElement('div');
                b.style.cssText='position:fixed;left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px;border:1.5px solid #6558d3;background:rgba(101,88,211,.08);border-radius:3px;box-sizing:border-box;pointer-events:none;';
                frag.appendChild(b);drawn++;
              });
              if(drawn){d2MultiHost.appendChild(frag);d2MultiHost.style.display='block';}
              else d2MultiHost.style.display='none';
            }
            function d2IsButtonLike(el){
              if(!el)return false;
              const tag=String(el.tagName||'').toLowerCase();
              const role=(el.getAttribute&&el.getAttribute('role'))||'';
              const cls=String(el.className||'').toLowerCase();
              return tag==='button'||tag==='a'||role==='button'||/\\\\b(?:btn|button|badge|pill|chip)\\\\b/.test(cls);
            }
            function d2CanResize(sel){return !!(sel&&d2LockedEl&&d2LockedEl.isConnected&&d2LockedEl!==document.documentElement&&d2LockedEl!==document.body);}
            let d2TouchDragEl=null,d2TouchDragOld='';
            function d2Paint(sel){
              d2EnsureUi();
              d2SizePill.style.display='none';
              const touchTarget=sel&&d2LockedEl?.isConnected?d2LockedEl:null;
              if(d2TouchDragEl!==touchTarget){
                if(d2TouchDragEl)d2TouchDragEl.style.touchAction=d2TouchDragOld;
                d2TouchDragEl=touchTarget;d2TouchDragOld=touchTarget?.style.touchAction||'';
                if(touchTarget&&d2MouseMode==='move')touchTarget.style.touchAction='none';
              }
              if(!sel||!d2LockedEl||!d2LockedEl.isConnected){
                d2Overlay.style.display='none';d2HandlesHost.style.display='none';return;
              }
              const r=d2LockedEl.getBoundingClientRect();
              d2Overlay.style.display='block';d2Overlay.style.left=r.left+'px';d2Overlay.style.top=r.top+'px';
              d2Overlay.style.width=Math.max(1,r.width)+'px';d2Overlay.style.height=Math.max(1,r.height)+'px';
              if(d2CanResize(sel)){
                d2HandlesHost.style.display='block';
                const t=6,c=9;
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
                };
                d2HandlesHost.querySelectorAll('.d2-resize-edge').forEach(function(el){
                  const bx=boxes[el.dataset.dir];if(!bx)return;
                  el.style.left=Math.round(bx[0])+'px';el.style.top=Math.round(bx[1])+'px';
                  el.style.width=Math.round(bx[2])+'px';el.style.height=Math.round(bx[3])+'px';
                });
                if(d2DragHandle){
                  const dl=Math.max(4,Math.min(innerWidth-28,r.left));
                  const dt=r.top>=26?(r.top-23):Math.min(innerHeight-24,r.top+4);
                  d2DragHandle.style.left=Math.round(dl)+'px';
                  d2DragHandle.style.top=Math.round(dt)+'px';
                }
              }else{d2HandlesHost.style.display='none';}
              if(d2MultiTargets.length)d2PaintMultiHighlights();
            }`,
  'Upgrade iframe selection overlay, visible resize handles & dedicated drag handle'
);

// Update hover suppress + d2MouseMode default + Ctrl/Shift multi-select + separate select vs move modes + DEBOOGER_FORMAT_TEXT_RANGE + DEBOOGER_GET_SECTION_DETAILS
mustReplace(
  `            // document.write previews inherit the viewer's base URL. Keep fragment
            // and project-file navigation inside the uploaded project.
            let d2BrowseMode=false,d2MouseMode='move';`,
  `            // document.write previews inherit the viewer's base URL. Keep fragment
            // and project-file navigation inside the uploaded project.
            let d2BrowseMode=false,d2MouseMode='select';`,
  'Default d2MouseMode to select (normal text highlighting + element pick)'
);

mustReplace(
  `              if(d2LockedEl){if(d2HoverBox)d2HoverBox.style.display='none';d2HoverEl=null;return;}`,
  `              if(e.target?.closest?.('#d2-drag-handle,#d2-inspect-overlay')||(d2LockedEl&&d2LockedEl===hit)){if(d2HoverBox)d2HoverBox.style.display='none';d2HoverEl=null;return;}
              if(d2LockedEl){if(d2HoverBox)d2HoverBox.style.display='none';d2HoverEl=null;return;}`,
  'Suppress duplicate hover outline over drag handle or locked element'
);

mustReplace(
  `            function d2InspectClick(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode)return;
              // Programmatic navigation is how the Pages panel opens in-app routes.
              // It must reach the app's own click handler during Edit mode.
              if(!e.isTrusted && e.target?.closest?.('button,[role="tab"],a[href],[data-page]'))return;
              if(d2MouseMode==='text'){
                const selTxt=String(window.getSelection()?.toString()||'').trim();
                if(selTxt){
                  const rng=window.getSelection().getRangeAt(0);
                  const box=(rng.commonAncestorContainer.nodeType===1?rng.commonAncestorContainer:rng.commonAncestorContainer.parentElement);
                  if(box&&box!==document.body)post({type:'DEBOOGER_TEXT_HIGHLIGHTED',selector:d2Selector(box),text:selTxt});
                }
                return;
              }
              if(d2JustDragged){d2JustDragged=false;return false;}
              if(e.target?.closest?.('#d2-handles-host'))return false;
              if(d2InlineEdit&&(e.target===d2InlineEdit.el||d2InlineEdit.el.contains(e.target)))return;
              if(e.altKey||e.metaKey)return;
              d2CommitInPlaceText(false);
              e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
              const ptEl=d2NormalizeExactEl(document.elementFromPoint(e.clientX,e.clientY))||(e.target instanceof Element?d2NormalizeExactEl(e.target):null);
              const exact=ptEl||(e.target instanceof Element?e.target:null);
              const sel=exact && exact!==document.body && exact!==document.documentElement
                ? Object.assign(d2ElementSelection(exact),{candidates:d2CandidatesAt(exact)})
                : d2SelectionAt(e.clientX,e.clientY);
              if(!sel)return false;
              sel.page=sourceFile;sel.routePath=location.pathname+location.hash;sel.scrollX=scrollX;sel.scrollY=scrollY;sel.viewport={width:innerWidth,height:innerHeight};sel.click={x:d2Round(e.clientX),y:d2Round(e.clientY),xPercent:d2Round(e.clientX/Math.max(1,innerWidth)*100),yPercent:d2Round(e.clientY/Math.max(1,innerHeight)*100)};
              d2Locked=sel;
              d2LockedEl=(exact&&exact.isConnected)?exact:null;
              if(!d2LockedEl){try{d2LockedEl=sel.selector?document.querySelector(sel.selector):document.elementFromPoint(e.clientX,e.clientY);}catch(_){d2LockedEl=document.elementFromPoint(e.clientX,e.clientY);}}
              if(d2LockedEl===document.body||d2LockedEl===document.documentElement){
                d2Locked=null;d2LockedEl=null;d2MultiTargets=[];d2PaintMultiHighlights([]);d2Paint(null);
                post({type:'DEBOOGER_IFRAME_CLICK_OUTSIDE'});
                return false;
              }
              if(d2HoverBox)d2HoverBox.style.display='none';
              if(d2LockedEl){
                const context=d2ElementSelection(d2LockedEl);
                if(!sel.parent)sel.parent=context.parent;
                if(!sel.sectionId)sel.sectionId=context.sectionId;
                sel.computed=d2Computed(d2LockedEl,true);
                sel.group=d2GroupContext(d2LockedEl);
                if(d2LockedEl.parentElement&&sel.parent)sel.parent.computed=d2Computed(d2LockedEl.parentElement,true);
                sel.children=d2VisibleChildren(d2LockedEl).slice(0,20).map(function(child){return {selector:d2Selector(child),tag:String(child.tagName||'').toLowerCase(),rect:d2Rect(child.getBoundingClientRect()),computed:d2Computed(child)};});
              }
              d2MultiTargets=[];d2PaintMultiHighlights([]);
              d2Paint(sel);
              post({type:'DEBOOGER_INSPECT_RESULT',selection:sel});
              return false;
            }`,
  `            function d2CaptureTextHighlight(){
              try{
                const ws=window.getSelection();
                const txt=String(ws?.toString()||'').trim();
                if(txt&&ws&&ws.rangeCount){
                  const rng=ws.getRangeAt(0);
                  d2SavedTextRange=rng.cloneRange();
                  const anc=rng.commonAncestorContainer;
                  const box=anc.nodeType===1?anc:anc.parentElement;
                  if(box&&box!==document.body&&!String(box.id||'').startsWith('d2-')){
                    post({type:'DEBOOGER_TEXT_HIGHLIGHTED',selector:d2Selector(box),text:txt});
                    return true;
                  }
                }
              }catch(_){}
              d2SavedTextRange=null;
              return false;
            }
            function d2InspectClick(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode)return;
              // Programmatic navigation is how the Pages panel opens in-app routes.
              if(!e.isTrusted && e.target?.closest?.('button,[role="tab"],a[href],[data-page]'))return;
              if(d2JustDragged){d2JustDragged=false;return false;}
              if(e.target?.closest?.('#d2-handles-host,#d2-drag-handle'))return false;
              if(d2InlineEdit&&(e.target===d2InlineEdit.el||d2InlineEdit.el.contains(e.target)))return;
              // If user just finished highlighting text with mouse drag in Select or Text mode, preserve the text selection!
              const ws=window.getSelection();
              if((d2MouseMode==='select'||d2MouseMode==='text')&&ws&&!ws.isCollapsed&&String(ws.toString()||'').trim().length>0){
                d2CaptureTextHighlight();
                return;
              }
              if(e.altKey)return;
              d2CommitInPlaceText(false);
              e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
              const ptEl=d2NormalizeExactEl(document.elementFromPoint(e.clientX,e.clientY))||(e.target instanceof Element?d2NormalizeExactEl(e.target):null);
              const exact=ptEl||(e.target instanceof Element?e.target:null);
              const sel=exact && exact!==document.body && exact!==document.documentElement
                ? Object.assign(d2ElementSelection(exact),{candidates:d2CandidatesAt(exact)})
                : d2SelectionAt(e.clientX,e.clientY);
              if(!sel)return false;
              sel.page=sourceFile;sel.routePath=location.pathname+location.hash;sel.scrollX=scrollX;sel.scrollY=scrollY;sel.viewport={width:innerWidth,height:innerHeight};sel.click={x:d2Round(e.clientX),y:d2Round(e.clientY),xPercent:d2Round(e.clientX/Math.max(1,innerWidth)*100),yPercent:d2Round(e.clientY/Math.max(1,innerHeight)*100)};
              const targetEl=(exact&&exact.isConnected)?exact:(()=>{try{return sel.selector?document.querySelector(sel.selector):null;}catch(_){return null;}})();
              if(!targetEl||targetEl===document.body||targetEl===document.documentElement){
                d2Locked=null;d2LockedEl=null;d2MultiTargets=[];d2PaintMultiHighlights([]);d2Paint(null);
                post({type:'DEBOOGER_IFRAME_CLICK_OUTSIDE'});
                return false;
              }
              // Ctrl/Cmd/Shift multi-selection support
              if((e.ctrlKey||e.metaKey||e.shiftKey)&&sel.selector){
                const list=d2MultiTargets.slice();
                if(d2Locked?.selector&&!list.includes(d2Locked.selector))list.push(d2Locked.selector);
                const idx=list.indexOf(sel.selector);
                if(idx>=0&&list.length>1)list.splice(idx,1);
                else if(idx<0)list.push(sel.selector);
                if(list.length>1){
                  d2Locked=sel;d2LockedEl=targetEl;
                  if(d2HoverBox)d2HoverBox.style.display='none';
                  d2Paint(sel);
                  d2PaintMultiHighlights(list);
                  post({type:'DEBOOGER_MULTI_SELECT_RESULT',selectors:list,labels:list.slice(0,6)});
                  return false;
                }
              }
              d2Locked=sel;
              d2LockedEl=targetEl;
              if(d2HoverBox)d2HoverBox.style.display='none';
              if(d2LockedEl){
                const context=d2ElementSelection(d2LockedEl);
                if(!sel.parent)sel.parent=context.parent;
                if(!sel.sectionId)sel.sectionId=context.sectionId;
                sel.computed=d2Computed(d2LockedEl,true);
                sel.group=d2GroupContext(d2LockedEl);
                if(d2LockedEl.parentElement&&sel.parent)sel.parent.computed=d2Computed(d2LockedEl.parentElement,true);
                sel.children=d2VisibleChildren(d2LockedEl).slice(0,20).map(function(child){return {selector:d2Selector(child),tag:String(child.tagName||'').toLowerCase(),rect:d2Rect(child.getBoundingClientRect()),computed:d2Computed(child)};});
              }
              d2MultiTargets=[];d2PaintMultiHighlights([]);
              d2Paint(sel);
              post({type:'DEBOOGER_INSPECT_RESULT',selection:sel});
              return false;
            }`,
  'Support text highlighting in Select mode + Ctrl/Shift multi-select in d2InspectClick'
);

// Update pointerdown + snap guide color + selectionchange so Select mode preserves native mouse text highlighting while Move mode & #d2-drag-handle drag elements/groups/sections
mustReplace(
  `                line.style.cssText=guide.axis==='v'
                  ? 'position:fixed;top:0;bottom:0;width:1px;background:rgba(37,99,235,.55);left:'+Math.round(guide.pos)+'px;'
                  : 'position:fixed;left:0;right:0;height:1px;background:rgba(37,99,235,.55);top:'+Math.round(guide.pos)+'px;';`,
  `                line.style.cssText=guide.axis==='v'
                  ? 'position:fixed;top:0;bottom:0;width:1px;background:rgba(8,127,110,.65);left:'+Math.round(guide.pos)+'px;'
                  : 'position:fixed;left:0;right:0;height:1px;background:rgba(8,127,110,.65);top:'+Math.round(guide.pos)+'px;';`,
  'Snap guide Emerald Teal color'
);

mustReplace(
  `                d2MarqueeBox.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;border:1.5px dashed #2563eb;background:rgba(37,99,235,0.12);border-radius:2px;box-sizing:border-box;display:none;';`,
  `                d2MarqueeBox.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;border:1.5px dashed #6558d3;background:rgba(101,88,211,0.11);border-radius:3px;box-sizing:border-box;display:none;';`,
  'Marquee box Royal Violet color'
);

mustReplace(
  `            document.addEventListener('pointerdown',function(e){
              if(!inspectEnabled||!inspectPicking||d2BrowseMode||e.button!==0||d2ResizeState||d2InlineEdit||!e.isPrimary)return;
              if(d2MouseMode==='text')return;
              if(e.pointerType==='touch' && d2MouseMode!=='box' && (!d2LockedEl || (e.target!==d2LockedEl&&!d2LockedEl.contains(e.target))))return;
              if(e.target?.closest?.('#d2-handles-host,input,textarea,select,[contenteditable],[draggable="true"]'))return;
              const target=e.target;
              const onBlank=(!(target instanceof Element)||target===document.documentElement||target===document.body);
              const wantBox=(d2MouseMode==='box'||onBlank);
              const multiHits=d2MultiTargets.map(s=>{try{return document.querySelector(s);}catch(_){return null;}}).filter(Boolean);
              const inMulti=multiHits.find(el=>el===target||el.contains(target));
              if(inMulti && multiHits.length>1 && d2MouseMode!=='box'){
                const items=multiHits.map(el=>{
                  const tr=d2TranslatePair(getComputedStyle(el).translate);
                  return {el,selector:d2Selector(el),baseX:tr[0],baseY:tr[1],x:tr[0],y:tr[1],oldInline:el.style.translate,oldTransition:el.style.transition};
                });
                d2GroupDrag={items,startX:e.clientX,startY:e.clientY,active:false,pointerId:e.pointerId};
                return;
              }
              if(wantBox){
                d2Marquee={startX:e.clientX,startY:e.clientY,curX:e.clientX,curY:e.clientY,active:false,pointerId:e.pointerId};
                return;
              }
              const el=d2LockedEl&&(d2LockedEl===target||d2LockedEl.contains(target))?d2LockedEl:target;
              if(!el?.parentElement||el.closest('#d2-inspect-overlay,#d2-handles-host'))return;
              if(el!==d2LockedEl && d2MouseMode==='move'){
                d2Marquee={startX:e.clientX,startY:e.clientY,curX:e.clientX,curY:e.clientY,active:false,pointerId:e.pointerId,fallbackEl:el};
                return;
              }
              const translate=d2TranslatePair(getComputedStyle(el).translate);
              d2Drag={el,startX:e.clientX,startY:e.clientY,baseX:translate[0],baseY:translate[1],x:translate[0],y:translate[1],active:false,pointerId:e.pointerId,rect:el.getBoundingClientRect(),oldInline:el.style.translate,oldTransition:el.style.transition};
            },true);`,
  `            function d2BeginElementOrGroupDrag(e,el){
              const multiHits=d2MultiTargets.map(s=>{try{return document.querySelector(s);}catch(_){return null;}}).filter(Boolean);
              if(multiHits.length>1&&(multiHits.includes(el)||multiHits.some(m=>m.contains(el)))){
                const items=multiHits.map(node=>{
                  const tr=d2TranslatePair(getComputedStyle(node).translate);
                  return {el:node,selector:d2Selector(node),baseX:tr[0],baseY:tr[1],x:tr[0],y:tr[1],oldInline:node.style.translate,oldTransition:node.style.transition};
                });
                d2GroupDrag={items,startX:e.clientX,startY:e.clientY,active:false,pointerId:e.pointerId};
                return;
              }
              if(!el||!el.parentElement)return;
              const translate=d2TranslatePair(getComputedStyle(el).translate);
              d2Drag={el,startX:e.clientX,startY:e.clientY,baseX:translate[0],baseY:translate[1],x:translate[0],y:translate[1],active:false,pointerId:e.pointerId,rect:el.getBoundingClientRect(),oldInline:el.style.translate,oldTransition:el.style.transition};
            }
            document.addEventListener('pointerdown',function(e){
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
  'Separate Select (text highlight) vs Move / Drag Handle in iframe pointerdown'
);

mustReplace(
  `            document.addEventListener('selectionchange',function(){
              if(!inspectEnabled||d2MouseMode!=='text')return;
              const s=window.getSelection();
              const txt=String(s?.toString()||'').trim();
              if(txt&&s.rangeCount){
                const node=s.getRangeAt(0).commonAncestorContainer;
                const el=node.nodeType===1?node:node.parentElement;
                if(el&&el!==document.body&&!String(el.id||'').startsWith('d2-'))post({type:'DEBOOGER_TEXT_HIGHLIGHTED',selector:d2Selector(el),text:txt});
              }else post({type:'DEBOOGER_TEXT_HIGHLIGHTED',selector:'',text:''});
            });`,
  `            let d2TextSelTimer=0;
            document.addEventListener('selectionchange',function(){
              if(!inspectEnabled||d2BrowseMode||(d2MouseMode!=='select'&&d2MouseMode!=='text'))return;
              clearTimeout(d2TextSelTimer);
              d2TextSelTimer=setTimeout(function(){
                const s=window.getSelection();
                const txt=String(s?.toString()||'').trim();
                if(txt&&s&&s.rangeCount){
                  const rng=s.getRangeAt(0);
                  d2SavedTextRange=rng.cloneRange();
                  const node=rng.commonAncestorContainer;
                  const el=node.nodeType===1?node:node.parentElement;
                  if(el&&el!==document.body&&!String(el.id||'').startsWith('d2-')){
                    post({type:'DEBOOGER_TEXT_HIGHLIGHTED',selector:d2Selector(el),text:txt});
                  }
                }else{
                  d2SavedTextRange=null;
                  post({type:'DEBOOGER_TEXT_HIGHLIGHTED',selector:'',text:''});
                }
              },70);
            });`,
  'Emit DEBOOGER_TEXT_HIGHLIGHTED seamlessly in Select and Text modes'
);

// Update DEBOOGER_MOUSE_MODE + Add DEBOOGER_FORMAT_TEXT_RANGE + DEBOOGER_GET_SECTION_DETAILS + DEBOOGER_ENSURE_VISIBLE inside iframe message listener
mustReplace(
  `              if(e.data.type==='DEBOOGER_MOUSE_MODE'){
                d2MouseMode=String(e.data.mode||'move');
                d2BrowseMode=(d2MouseMode==='browse');
                if(d2BrowseMode){d2Locked=null;d2LockedEl=null;d2Paint(null);if(d2HoverBox)d2HoverBox.style.display='none';}
                document.documentElement.style.cursor=d2BrowseMode?'':d2MouseMode==='text'?'text':'crosshair';
              }`,
  `              if(e.data.type==='DEBOOGER_MOUSE_MODE'){
                d2MouseMode=String(e.data.mode||'select');
                d2BrowseMode=(d2MouseMode==='browse');
                if(d2BrowseMode){d2Locked=null;d2LockedEl=null;d2Paint(null);if(d2HoverBox)d2HoverBox.style.display='none';}
                document.documentElement.style.cursor=d2BrowseMode?'':d2MouseMode==='move'?'move':d2MouseMode==='box'?'crosshair':'';
                if(d2Locked&&d2LockedEl)d2Paint(d2Locked);
              }
              if(e.data.type==='DEBOOGER_FORMAT_TEXT_RANGE'){
                let ok=false,sel='',before='',after='',innerHtml='',action=String(e.data.action||'');
                try{
                  const ws=window.getSelection();
                  const rng=(ws&&ws.rangeCount&&!ws.getRangeAt(0).collapsed)?ws.getRangeAt(0):d2SavedTextRange;
                  if(rng&&!rng.collapsed){
                    const anc=rng.commonAncestorContainer;
                    const hostEl=anc.nodeType===1?anc:anc.parentElement;
                    if(hostEl&&hostEl!==document.body&&!String(hostEl.id||'').startsWith('d2-')){
                      sel=d2Selector(hostEl);
                      before=String(hostEl.innerHTML||'');
                      if(action==='delete'){
                        rng.deleteContents();
                      }else if(action==='replace'){
                        const repText=String(e.data.text??'');
                        rng.deleteContents();
                        rng.insertNode(document.createTextNode(repText));
                      }else{
                        const wrapTag=action==='bold'?'strong':action==='italic'?'em':action==='underline'?'u':'span';
                        const wrapEl=document.createElement(wrapTag);
                        if(action==='color'&&e.data.color)wrapEl.style.color=String(e.data.color);
                        const frag=rng.extractContents();
                        wrapEl.appendChild(frag);
                        rng.insertNode(wrapEl);
                      }
                      innerHtml=String(hostEl.innerHTML||'');
                      after=String(hostEl.innerText||hostEl.textContent||'');
                      if(ws)ws.removeAllRanges();
                      d2SavedTextRange=null;
                      ok=true;
                      d2ScheduleRectSync();
                    }
                  }
                }catch(_){}
                post({type:'DEBOOGER_TEXT_RANGE_MUTATED',ok,action,selector:sel,beforeHtml:before,innerHtml,after});
              }
              if(e.data.type==='DEBOOGER_GET_SECTION_DETAILS'&&e.data.selector){
                try{
                  const sec=document.querySelector(e.data.selector);
                  if(sec){
                    const cs=getComputedStyle(sec);
                    const kids=Array.from(sec.querySelectorAll('h1,h2,h3,h4,p,a,button,img,input,select,textarea,li')).filter(k=>{
                      const r=k.getBoundingClientRect(),kcs=getComputedStyle(k);
                      return r.width>=4&&r.height>=4&&kcs.display!=='none'&&kcs.visibility!=='hidden';
                    }).slice(0,24).map(k=>{
                      const txt=String(k.textContent||k.getAttribute('alt')||k.getAttribute('placeholder')||k.tagName).replace(/\\\\s+/g,' ').trim().slice(0,44);
                      return {selector:d2Selector(k),tag:k.tagName.toLowerCase(),label:txt||k.tagName.toLowerCase()};
                    });
                    post({type:'DEBOOGER_SECTION_DETAILS',selector:e.data.selector,styles:{
                      fontFamily:cs.fontFamily,fontWeight:cs.fontWeight,fontSize:cs.fontSize,textAlign:cs.textAlign,
                      color:cs.color,backgroundColor:cs.backgroundColor,opacity:cs.opacity,
                      paddingTop:cs.paddingTop,marginTop:cs.marginTop,gap:cs.gap,width:Math.round(sec.getBoundingClientRect().width)+'px',
                      minHeight:Math.round(sec.getBoundingClientRect().height)+'px',borderRadius:cs.borderRadius,
                      borderWidth:cs.borderTopWidth,borderColor:cs.borderTopColor,display:cs.display,
                      flexDirection:cs.flexDirection,justifyContent:cs.justifyContent,alignItems:cs.alignItems
                    },elements:kids});
                  }
                }catch(_){}
              }
              if(e.data.type==='DEBOOGER_ENSURE_VISIBLE'&&d2LockedEl&&d2LockedEl.isConnected){
                const r=d2LockedEl.getBoundingClientRect();
                if(r.top<8||r.bottom>innerHeight-8){
                  d2LockedEl.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
                  setTimeout(d2ScheduleRectSync,160);
                }
              }`,
  'Add iframe handlers for Select mode cursor, text-range formatting/replace, section details, and keep-visible scrolling'
);

// Ensure DEBOOGER_DELETE_TEXT_RANGE also uses d2SavedTextRange fallback
mustReplace(
  `                  const ws=window.getSelection();
                  if(ws&&ws.rangeCount){
                    const rng=ws.getRangeAt(0);`,
  `                  const ws=window.getSelection();
                  const rng=(ws&&ws.rangeCount&&!ws.getRangeAt(0).collapsed)?ws.getRangeAt(0):d2SavedTextRange;
                  if(rng&&!rng.collapsed){`,
  'Use saved text range fallback for delete text range'
);

// Also refine DEBOOGER_INSPECT_MODE cursor cleanly for 'select' mode (avoid forced crosshair cursor obscuring text selection!)
mustReplace(
  `if(e.data.type==='DEBOOGER_INSPECT_MODE'){d2CommitInPlaceText(false);inspectEnabled=Boolean(e.data.enabled);inspectPicking=inspectEnabled;d2Locked=null;d2LockedEl=null;d2Paint(null);d2HideDropLine();document.documentElement.style.cursor=inspectPicking?'crosshair':'';}
              if(e.data.type==='DEBOOGER_INSPECT_ARM'){
                inspectPicking=inspectEnabled && Boolean(e.data.enabled);
                document.documentElement.style.cursor=inspectPicking?'crosshair':'';
                if(!inspectPicking)d2Paint(null);
              }`,
  `if(e.data.type==='DEBOOGER_INSPECT_MODE'){d2CommitInPlaceText(false);inspectEnabled=Boolean(e.data.enabled);inspectPicking=inspectEnabled;d2Locked=null;d2LockedEl=null;d2Paint(null);d2HideDropLine();document.documentElement.style.cursor=(inspectPicking&&d2MouseMode==='move')?'move':(inspectPicking&&d2MouseMode==='box')?'crosshair':'';}
              if(e.data.type==='DEBOOGER_INSPECT_ARM'){
                inspectPicking=inspectEnabled && Boolean(e.data.enabled);
                document.documentElement.style.cursor=(inspectPicking&&d2MouseMode==='move')?'move':(inspectPicking&&d2MouseMode==='box')?'crosshair':'';
                if(!inspectPicking)d2Paint(null);
              }`,
  'Keep natural cursor in Select mode instead of blocking crosshair'
);

// 8. Improve d2CleanPageLabel so technical paths & extensions never leak
mustReplace(
  `    function d2CleanPageLabel(value){
      let label=String(value||'').replace(/\\s+/g,' ').trim();
      label=label.replace(/^(?:src\\/)?(?:pages?\\/)?/i,'').replace(/\\.(?:html?|jsx?|tsx?)$/i,'');
      label=label.replace(/^[0-9]+[\\s.)-]*/,'').replace(/\\s*\\d{1,5}\\+?$/,'').replace(/([A-Za-z])\\d{1,4}$/,'$1').trim();
      if(/^(?:index|main|app)$/i.test(label))return 'Home';
      if(/^me\\s*age$/i.test(label))return 'Messages';
      return label ? label.charAt(0).toUpperCase()+label.slice(1) : 'Page';
    }`,
  `    function d2CleanPageLabel(value){
      let raw=String(value||'').replace(/\\\\/g,'/').trim();
      if(raw.includes('/') && !/^https?:/i.test(raw)) raw=raw.split('/').filter(Boolean).pop()||raw;
      let label=raw.replace(/\\.(?:html?|jsx?|tsx?|php|md)$/i,'').replace(/[-_]+/g,' ').replace(/\\s+/g,' ').trim();
      label=label.replace(/^[0-9]+[\\s.)-]*/,'').replace(/\\s*\\d{1,5}\\+?$/,'').replace(/([A-Za-z])\\d{1,4}$/,'$1').trim();
      if(/^(?:index|main|app)$/i.test(label))return 'Home';
      if(/^me\\s*age$/i.test(label))return 'Messages';
      return label ? label.split(' ').map(w=>w?w.charAt(0).toUpperCase()+w.slice(1):'').join(' ') : 'Page';
    }`,
  'Clean page names without folder paths or file extensions'
);

// 9. Update Tools modal Design button + db98OpenFunctions / db98CloseFunctions so Functions lives natively in the drawer (and returns to drawer when modal closes)
mustReplace(
  `<button type="button" onclick="openMoreDestination('view-styles')">Design</button>`,
  `<button type="button" onclick="closeWorkspacePopovers();window.db99SwitchInspectorTab?.('pages');toggleWorkspaceDrawer('diagnostics',true);">Design</button>`,
  'Route Tools modal Design item to drawer Design tab'
);

mustReplace(
  `function db98OpenFunctions(){
  closeWorkspacePopovers();
  const dialog=document.getElementById('db133-functions-dialog');
  const panel=document.getElementById('db99-panel-functions');
  if(!dialog||!panel)return;
  if(panel.parentElement!==dialog)dialog.append(panel);
  panel.hidden=false;
  db98RenderFunctions();
  if(typeof renderFeatureInventory==='function')renderFeatureInventory();
  if(!dialog.open){try{dialog.showModal();}catch(error){showToast('Could not open Functions: '+String(error.message||error));}}
}
function db98CloseFunctions(){
  const dialog=document.getElementById('db133-functions-dialog');
  if(dialog?.open)dialog.close();
  const panel=document.getElementById('db99-panel-functions');
  if(panel)panel.hidden=true;
}`,
  `function db98RestoreFunctionsToDrawer(){
  const drawer=document.querySelector('#view-workspace .workspace-pane-right');
  const panel=document.getElementById('db99-panel-functions');
  const cap=document.getElementById('db99-panel-captures');
  if(drawer&&panel&&panel.parentElement!==drawer){
    if(cap&&cap.parentElement===drawer)drawer.insertBefore(panel,cap);
    else drawer.append(panel);
  }
}
function db98OpenFunctions(opts){
  closeWorkspacePopovers();
  if(!opts||!opts.asModal){
    db98RestoreFunctionsToDrawer();
    window.db99SwitchInspectorTab?.('functions');
    const mobile=window.matchMedia('(max-width:900px)').matches;
    if(mobile)setMobileWorkspaceScreen('results',{skipSave:true,allowAudit:true});
    else toggleWorkspaceDrawer('diagnostics',true);
    return;
  }
  const dialog=document.getElementById('db133-functions-dialog');
  const panel=document.getElementById('db99-panel-functions');
  if(!dialog||!panel)return;
  if(panel.parentElement!==dialog)dialog.append(panel);
  panel.hidden=false;
  db98RenderFunctions();
  if(typeof renderFeatureInventory==='function')renderFeatureInventory();
  if(!dialog.open){try{dialog.showModal();}catch(error){showToast('Could not open Functions: '+String(error.message||error));}}
}
function db98CloseFunctions(){
  const dialog=document.getElementById('db133-functions-dialog');
  if(dialog?.open)dialog.close();
  db98RestoreFunctionsToDrawer();
  const panel=document.getElementById('db99-panel-functions');
  if(panel)panel.hidden=(window.DB110Studio?.activeTab?.()!=='functions');
}`,
  'Host Functions panel cleanly inside Right Drawer'
);

// 10. Update parent DB128_STATE default mouseMode + Text Range Actions + Expandable Pages & Sections Editor + 5-Tab Switcher + Drawer Resize + Mobile Peek
mustReplace(
  `  const DB128_STATE = {
    mouseMode: 'move',
    multiSelectors: [],
    lastTextRange: null,
    designSubtab: 'overview',
    selectedAreaLabel: 'Whole page'
  };`,
  `  const DB128_STATE = {
    mouseMode: 'select',
    multiSelectors: [],
    lastTextRange: null,
    designSubtab: 'overview',
    selectedAreaLabel: 'Whole page',
    expandedPageId: '',
    expandedSectionSelector: '',
    sectionDetails: null,
    sectionScope: 'section'
  };`,
  'Update DB128_STATE defaults for Select mode and Pages/Sections expansion'
);

mustReplace(
  `    DB128_STATE.mouseMode=mode||'move';`,
  `    DB128_STATE.mouseMode=mode||'select';`,
  'Default mouse mode fallback to select'
);

// Add Text Highlight Formatting card inside renderDrawerEditMirror (shown BOTH when no element or when element IS selected so highlighted words can always be edited, formatted, copied, or deleted!)
mustReplace(
  `      if(DB128_STATE.lastTextRange&&DB128_STATE.lastTextRange.text){
        const tb=document.createElement('div');tb.className='db128-multi-banner';
        tb.innerHTML=\`<span>Text highlighted: <strong>"\${escapeHtml(DB128_STATE.lastTextRange.text.slice(0,34))}"</strong></span>\`;
        const delT=document.createElement('button');delT.type='button';delT.className='db128-trash-btn';delT.textContent='Delete Highlighted Text';
        delT.onclick=()=>window.db128DeleteHighlighted();
        tb.append(delT);host.append(tb);
        return;
      }
      host.innerHTML=\`<div class="db99-section-card"><div style="font-size:13px;color:#475569;line-height:1.55;">Click any element to inspect and edit it, drag across items with <strong>Box Select</strong> to move or delete multiple items together, or use <strong>Text Select</strong> to highlight words and click the Trash Can.</div><div style="margin-top:10px;"><button type="button" class="d2-pop-btn primary" onclick="if(!STATE.inspectMode)toggleVisualInspectMode(true,{keepDrawer:true});">Start Editing</button></div></div>\`;
      return;`,
  `      if(DB128_STATE.lastTextRange&&DB128_STATE.lastTextRange.text){
        host.append(db136BuildTextSelectionCard(DB128_STATE.lastTextRange));
        return;
      }
      host.innerHTML=\`<div class="db99-section-card"><div style="font-size:13px;color:#4b5568;line-height:1.55;">Click any item on the page to edit it, drag across words in <strong>Select</strong> mode to format, copy, or delete text, or switch to <strong>Move</strong> / drag the <strong>⋮⋮</strong> handle to reposition elements or sections.</div><div style="margin-top:10px;"><button type="button" class="d2-pop-btn primary" onclick="if(!STATE.inspectMode)toggleVisualInspectMode(true,{keepDrawer:true});">Start Editing</button></div></div>\`;
      return;`,
  'Show rich Text Selection Card when text is highlighted without element lock'
);

// Inject db136BuildTextSelectionCard & format helper right before renderDrawerEditMirror
mustReplace(
  `  // --- Drawer Edit Tab & Unified Pages & Design (DB.128) ---
  function renderDrawerEditMirror(){`,
  `  window.db136FormatHighlightedText = function(action, payload){
    const frame=document.getElementById('live-sandbox-frame');
    if(!frame?.contentWindow)return;
    frame.contentWindow.postMessage(Object.assign({type:'DEBOOGER_FORMAT_TEXT_RANGE',action},payload||{}),'*');
  };
  function db136BuildTextSelectionCard(rangeInfo){
    const card=document.createElement('div');card.className='db136-text-sel-card';
    const head=document.createElement('div');head.style.cssText='display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:650;color:#252936;';
    head.innerHTML='<span>Highlighted Text</span>';
    const quote=document.createElement('div');quote.className='db136-text-sel-quote';
    quote.textContent='"'+String(rangeInfo?.text||'').slice(0,120)+'"';
    const editRow=document.createElement('div');editRow.style.cssText='display:flex;gap:5px;align-items:center;';
    const repInp=document.createElement('input');repInp.type='text';repInp.value=String(rangeInfo?.text||'');repInp.placeholder='Edit highlighted words...';repInp.style.cssText='flex:1;min-width:0;padding:4px 7px !important;font-size:12px !important;';
    const repBtn=document.createElement('button');repBtn.type='button';repBtn.className='d2-pop-btn primary';repBtn.textContent='Update';
    repBtn.onclick=()=>window.db136FormatHighlightedText('replace',{text:repInp.value});
    editRow.append(repInp,repBtn);
    const acts=document.createElement('div');acts.className='db136-text-sel-actions';
    const mk=(lbl,fn,cls='')=>{const b=document.createElement('button');b.type='button';b.className='d2-pop-btn '+cls;b.innerHTML=lbl;b.onclick=fn;acts.append(b);};
    mk('<strong>B</strong>',()=>window.db136FormatHighlightedText('bold'));
    mk('<em>I</em>',()=>window.db136FormatHighlightedText('italic'));
    mk('<u>U</u>',()=>window.db136FormatHighlightedText('underline'));
    const cp=document.createElement('input');cp.type='color';cp.value='#087f6e';cp.title='Color highlighted words';cp.ariaLabel='Text selection color';
    cp.onchange=()=>window.db136FormatHighlightedText('color',{color:cp.value});
    acts.append(cp);
    mk('Copy',()=>copyTextForAi(rangeInfo.text,'Copied highlighted words.'));
    mk('Delete words',()=>window.db128DeleteHighlighted(),'danger');
    card.append(head,quote,editRow,acts);
    return card;
  }

  // --- Drawer Edit Tab & Unified Pages & Design (DB.128 / DB.136) ---
  function renderDrawerEditMirror(){`,
  'Add highlighted text format/edit/copy/delete card builder'
);

// Prepend Text Selection card even if element IS also selected, and add Select Section button cleanly in Chosen Item header
mustReplace(
  `    const outNodes=[secSel.det,secLayout.det];
    if(!isMediaEl)outNodes.push(secType.det);
    outNodes.push(secLook.det);`,
  `    const outNodes=[];
    if(DB128_STATE.lastTextRange&&DB128_STATE.lastTextRange.text)outNodes.push(db136BuildTextSelectionCard(DB128_STATE.lastTextRange));
    outNodes.push(secSel.det,secLayout.det);
    if(!isMediaEl)outNodes.push(secType.det);
    outNodes.push(secLook.det);`,
  'Show highlighted text actions alongside selected item in Edit drawer'
);

// Replace renderPagesList + section editor with expandable Page -> Real Sections -> Locate -> Spacious Section Editor
mustReplace(
  `  // --- Pages & Sections Panel + Add New Page ---
  function renderPagesList(){
    const list=document.getElementById('db110-pages-list');if(!list)return;
    const pages=typeof d2ProjectPageEntries==='function'?d2ProjectPageEntries():[];
    list.replaceChildren();
    if(!pages.length){list.innerHTML='<span class="db99-empty-hint">Open a project to see pages.</span>';return;}
    pages.forEach(pg=>{
      const btn=document.createElement('button');btn.type='button';btn.className='db110-page-row';btn.dataset.page=pg.id;
      const active=document.getElementById('d2-project-page-select')?.value===pg.id;
      if(active){btn.classList.add('active');btn.setAttribute('aria-current','page');}
      const left=document.createElement('span');left.textContent=pg.label||pg.html;
      const right=document.createElement('small');right.style.color='#64748b';right.textContent=pg.kind==='html'?'HTML':'Page';
      btn.append(left,right);
      btn.onclick=()=>{
        if(btn.disabled)return;
        d2OpenProjectPage(pg);
        renderPagesList();
        const active=list.querySelector('.db110-page-row.active');
        active?.setAttribute('aria-current','page');
      };
      list.append(btn);
    });
  }`,
  `  // --- Pages & Expandable Sections Editor (DB.136 Phase 1) ---
  function db136BuildSectionEditor(sec){
    const box=document.createElement('div');box.className='db136-sec-editor';
    const frame=document.getElementById('live-sandbox-frame');
    const targetSec=sec.selector;
    const st=(DB128_STATE.sectionDetails&&DB128_STATE.sectionDetails.selector===targetSec)?(DB128_STATE.sectionDetails.styles||{}):{};
    const kids=(DB128_STATE.sectionDetails&&DB128_STATE.sectionDetails.selector===targetSec)?(DB128_STATE.sectionDetails.elements||[]):[];
    const scope=DB128_STATE.sectionScope||'section';

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
    gType.append(mkField('Font family',fSel),mkNum('Text size',st.fontSize||15,'px','font-size',1,10,96),mkField('Weight',wSel));
    const alRow=document.createElement('div');alRow.className='db128-align-group';alRow.style.marginTop='2px';
    ['left','center','right'].forEach(al=>{
      const b=document.createElement('button');b.type='button';b.className='db128-align-btn'+(st.textAlign===al?' active':'');
      b.textContent=al[0].toUpperCase();b.title='Align '+al;
      b.onclick=()=>{alRow.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');applySectionStyle({'text-align':al},'Align '+al,false);};
      alRow.append(b);
    });
    gType.append(mkField('Align',alRow));
    bType.append(gType);

    // 2. Colors & Backgrounds
    const bCol=document.createElement('div');bCol.className='db136-sec-block';
    bCol.innerHTML='<div class="db136-sec-block-title">Colors &amp; Background</div>';
    const gCol=document.createElement('div');gCol.className='db117-grid-2';
    gCol.append(mkColor('Text color',st.color,'color'),mkColor('Background',st.backgroundColor,'background-color'));
    bCol.append(gCol);

    // 3. Spacing & Sizes
    const bSpace=document.createElement('div');bSpace.className='db136-sec-block';
    bSpace.innerHTML='<div class="db136-sec-block-title">Spacing &amp; Sizes</div>';
    const gSpace=document.createElement('div');gSpace.className='db117-grid-2';
    gSpace.append(
      mkNum('Padding',st.paddingTop||16,'px','padding',2,0,200),
      mkNum('Margin',st.marginTop||0,'px','margin',2,0,200),
      mkNum('Gap',st.gap||12,'px','gap',2,0,120),
      mkNum('Min height',st.minHeight||80,'px','min-height',4,20,1600)
    );
    bSpace.append(gSpace);

    // 4. Borders & Layout
    const bLay=document.createElement('div');bLay.className='db136-sec-block';
    bLay.innerHTML='<div class="db136-sec-block-title">Borders &amp; Layout</div>';
    const gLay=document.createElement('div');gLay.className='db117-grid-2';
    gLay.append(
      mkNum('Corners',st.borderRadius||8,'px','border-radius',1,0,99),
      mkNum('Border width',st.borderWidth||0,'px','border-width',1,0,20)
    );
    const dirRow=document.createElement('div');dirRow.className='db116-seg-row';
    [['Row','row'],['Stack','column']].forEach(([lbl,dir])=>{
      const b=document.createElement('button');b.type='button';b.className='db116-seg-btn'+(st.flexDirection===dir?' active':'');
      b.textContent=lbl;
      b.onclick=()=>applySectionStyle({'display':'flex','flex-direction':dir,'flex-wrap':'wrap'},'Layout '+lbl,false);
      dirRow.append(b);
    });
    const justRow=document.createElement('div');justRow.className='db116-seg-row';
    [['Start','flex-start'],['Center','center'],['Spread','space-between']].forEach(([lbl,jv])=>{
      const b=document.createElement('button');b.type='button';b.className='db116-seg-btn'+(st.justifyContent===jv?' active':'');
      b.textContent=lbl;
      b.onclick=()=>applySectionStyle({'display':'flex','justify-content':jv},'Spread '+lbl,false);
      justRow.append(b);
    });
    bLay.append(gLay,dirRow,justRow);

    // 5. Real Elements inside Section
    const bKids=document.createElement('div');bKids.className='db136-sec-block';
    bKids.innerHTML='<div class="db136-sec-block-title">Elements inside section ('+kids.length+')</div>';
    const kList=document.createElement('div');kList.className='db136-sec-el-list';
    if(!kids.length){
      const hint=document.createElement('span');hint.className='db99-empty-hint';hint.textContent='Loading section elements…';kList.append(hint);
    }else{
      kids.forEach(k=>{
        const rb=document.createElement('button');rb.type='button';rb.className='db129-el-row';
        rb.innerHTML=\`<span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\${escapeHtml(k.label)}</span><span class="db129-el-kind">\${escapeHtml(k.tag)}</span>\`;
        rb.onclick=()=>{
          if(!STATE.inspectMode)toggleVisualInspectMode(true,{keepDrawer:true});
          frame?.contentWindow?.postMessage({type:'DEBOOGER_FOCUS_ELEMENT',selector:k.selector},'*');
        };
        kList.append(rb);
      });
    }
    bKids.append(kList);

    box.append(bType,bCol,bSpace,bLay,bKids);
    return box;
  }

  function renderPagesList(){
    const list=document.getElementById('db110-pages-list');if(!list)return;
    const pages=typeof d2ProjectPageEntries==='function'?d2ProjectPageEntries():[];
    list.replaceChildren();
    if(!pages.length){list.innerHTML='<span class="db99-empty-hint">Open a project to see its pages.</span>';return;}
    const activePageId=document.getElementById('d2-project-page-select')?.value||(pages[0]?.id||'');
    if(!DB128_STATE.expandedPageId)DB128_STATE.expandedPageId=activePageId;

    pages.forEach(pg=>{
      const isCurrent=pg.id===activePageId;
      const isExpanded=DB128_STATE.expandedPageId===pg.id;
      const card=document.createElement('div');card.className='db136-page-acc'+(isCurrent?' active':'')+(isExpanded?' expanded':'');

      const head=document.createElement('button');head.type='button';head.className='db136-page-head';head.dataset.page=pg.id;
      if(isCurrent)head.setAttribute('aria-current','page');
      head.innerHTML=\`<span class="db136-page-title-wrap"><span class="db136-page-chev">▶</span><span>\${escapeHtml(d2CleanPageLabel(pg.label||pg.html))}</span></span><span class="db136-page-meta">\${isCurrent?'Active':'Open'}</span>\`;
      head.onclick=()=>{
        const wasCurrent=isCurrent;
        DB128_STATE.expandedPageId=(isExpanded && wasCurrent)?'':pg.id;
        if(!wasCurrent){
          DB128_STATE.expandedSectionSelector='';
          d2OpenProjectPage(pg);
        }else if(DB128_STATE.expandedPageId===pg.id){
          window.db110RefreshSections?.();
        }
        renderPagesList();
      };
      card.append(head);

      if(isExpanded){
        const secWrap=document.createElement('div');secWrap.className='db136-page-sections';
        const secs=Array.isArray(window.DB112_LAST_SECTIONS)?window.DB112_LAST_SECTIONS:[];
        if(!secs.length){
          const empty=document.createElement('div');empty.className='db99-empty-hint';empty.style.padding='4px 6px';
          empty.textContent=isCurrent?'Scanning sections on this page…':'Click to open this page and list its sections.';
          secWrap.append(empty);
        }else{
          secs.forEach((sec,idx)=>{
            const secOpen=DB128_STATE.expandedSectionSelector===sec.selector;
            const sc=document.createElement('div');sc.className='db136-sec-card'+(secOpen?' expanded':'');
            const bar=document.createElement('div');bar.className='db136-sec-bar';
            const tog=document.createElement('button');tog.type='button';tog.className='db136-sec-toggle';
            tog.innerHTML=\`<span style="font-size:11px;color:#6b768a;width:14px;">\${secOpen?'▾':'▸'}</span><span class="db136-sec-name">\${escapeHtml(sec.label||('Section '+(idx+1)))}</span><span class="db136-sec-tag">\${escapeHtml(sec.tag||'section')}</span>\`;
            tog.onclick=()=>{
              DB128_STATE.expandedSectionSelector=secOpen?'':sec.selector;
              if(!secOpen){
                const frame=document.getElementById('live-sandbox-frame');
                frame?.contentWindow?.postMessage({type:'DEBOOGER_GET_SECTION_DETAILS',selector:sec.selector},'*');
                frame?.contentWindow?.postMessage({type:'DEBOOGER_SCROLL_TO_SECTION',selector:sec.selector},'*');
              }
              renderPagesList();
            };
            const loc=document.createElement('button');loc.type='button';loc.className='db136-locate-btn';loc.textContent='Locate';
            loc.title='Scroll to and highlight this section in preview';
            loc.onclick=(ev)=>{
              ev.stopPropagation();
              if(!STATE.inspectMode)toggleVisualInspectMode(true,{keepDrawer:true});
              const frame=document.getElementById('live-sandbox-frame');
              frame?.contentWindow?.postMessage({type:'DEBOOGER_SCROLL_TO_SECTION',selector:sec.selector},'*');
              frame?.contentWindow?.postMessage({type:'DEBOOGER_HIGHLIGHT_SELECTORS',selectors:[sec.selector],scrollFirst:true},'*');
              showToast('Located: '+(sec.label||sec.tag));
            };
            bar.append(tog,loc);sc.append(bar);
            if(secOpen)sc.append(db136BuildSectionEditor(sec));
            secWrap.append(sc);
          });
        }
        card.append(secWrap);
      }
      list.append(card);
    });
  }`,
  'Redesign renderPagesList into expandable Page -> Sections -> Locate + Spacious Section Editor'
);

// Ensure renderSectionsList triggers renderPagesList refresh cleanly
mustReplace(
  `  function renderSectionsList(sections){
    window.DB112_LAST_SECTIONS = Array.isArray(sections) ? sections : [];`,
  `  function renderSectionsList(sections){
    window.DB112_LAST_SECTIONS = Array.isArray(sections) ? sections : [];
    renderPagesList();`,
  'Sync renderPagesList when sections update'
);

// 11. Update db99SwitchInspectorTab to host ALL 5 tabs ('edit', 'pages', 'audit', 'functions', 'captures') cleanly inside the drawer
mustReplace(
  `  window.db99SwitchInspectorTab=function(tab){
    if(tab==='design')tab='pages';
    if(tab==='functions'){db98OpenFunctions();return;}
    if(tab==='captures'){window.d2CaptureApi?.openGallery?.();return;}
    const valid=['pages','edit','audit'];
    if(!valid.includes(tab))tab='pages';
    const prevPanel=document.getElementById('db99-panel-'+ACTIVE_TAB);
    if(prevPanel)TAB_SCROLL.set(ACTIVE_TAB,prevPanel.scrollTop||0);
    ACTIVE_TAB=tab;
    valid.forEach(t=>{
      const btn=document.getElementById('db99-tab-'+t),panel=document.getElementById('db99-panel-'+t);
      btn?.classList.toggle('active',t===tab);
      btn?.setAttribute('aria-selected',String(t===tab));
      if(panel)panel.hidden=(t!==tab);
    });
    const cur=document.getElementById('db99-panel-'+tab);
    if(cur&&TAB_SCROLL.has(tab))cur.scrollTop=TAB_SCROLL.get(tab);
    const rightOpen = document.querySelector('.workspace-pane-right')?.classList.contains('drawer-open') || document.body.classList.contains('mobile-workspace-results');
    if (typeof syncAuditNavButtons === 'function') syncAuditNavButtons(Boolean(rightOpen) && tab === 'audit');
    const clickOut = document.getElementById('d2-drawer-click-outside');
    if (clickOut) {
      const leftOpen = Boolean(document.querySelector('.workspace-pane-left.drawer-open'));
      clickOut.hidden = !(leftOpen || (Boolean(rightOpen) && !(STATE.inspectMode && (tab === 'edit' || tab === 'pages'))));
    }
    requestAnimationFrame(()=>{
      if(ACTIVE_TAB!==tab)return;
      if(tab==='pages'){renderPagesList();db110RefreshSections();window.DB117Studio?.scanLiveApp?.();window.DB117Studio?.scanLiveDesign?.();window.db112LoadPageSettings?.();window.db112SyncPageSettingsUi?.();}
      else if(tab==='edit'){renderDrawerEditMirror();renderChangesTimeline();}
      
    });
  };`,
  `  window.db99SwitchInspectorTab=function(tab){
    if(tab==='design')tab='pages';
    const valid=['edit','pages','audit','functions','captures'];
    if(!valid.includes(tab))tab='edit';
    if(tab==='functions')db98RestoreFunctionsToDrawer?.();
    const prevPanel=document.getElementById('db99-panel-'+ACTIVE_TAB);
    if(prevPanel)TAB_SCROLL.set(ACTIVE_TAB,prevPanel.scrollTop||0);
    ACTIVE_TAB=tab;
    valid.forEach(t=>{
      const btn=document.getElementById('db99-tab-'+t),panel=document.getElementById('db99-panel-'+t);
      btn?.classList.toggle('active',t===tab);
      btn?.setAttribute('aria-selected',String(t===tab));
      if(panel)panel.hidden=(t!==tab);
    });
    const cur=document.getElementById('db99-panel-'+tab);
    if(cur&&TAB_SCROLL.has(tab))cur.scrollTop=TAB_SCROLL.get(tab);
    const rightOpen = document.querySelector('.workspace-pane-right')?.classList.contains('drawer-open') || document.body.classList.contains('mobile-workspace-results');
    if (typeof syncAuditNavButtons === 'function') syncAuditNavButtons(Boolean(rightOpen) && tab === 'audit');
    const clickOut = document.getElementById('d2-drawer-click-outside');
    if (clickOut) {
      const leftOpen = Boolean(document.querySelector('.workspace-pane-left.drawer-open'));
      clickOut.hidden = !(leftOpen || (Boolean(rightOpen) && !(STATE.inspectMode && (tab === 'edit' || tab === 'pages'))));
    }
    requestAnimationFrame(()=>{
      if(ACTIVE_TAB!==tab)return;
      if(tab==='pages'){renderPagesList();db110RefreshSections();window.DB117Studio?.scanLiveApp?.();window.DB117Studio?.scanLiveDesign?.();window.db112LoadPageSettings?.();window.db112SyncPageSettingsUi?.();}
      else if(tab==='edit'){renderDrawerEditMirror();renderChangesTimeline();}
      else if(tab==='functions'){db98RenderFunctions?.();if(typeof renderFeatureInventory==='function')renderFeatureInventory();}
      else if(tab==='captures'){renderCapturesDrawer?.();}
    });
  };`,
  'Unify 5-tab drawer switcher inside Right Drawer'
);

// 12. Parent Message Handlers for Text Formatting/Mutation + Section Details + Keep Selected Visible beside Drawer + Delete key for multi-select & text range
mustReplace(
  `    }else if(t==='DEBOOGER_PAGE_SECTIONS'){
      renderSectionsList(e.data.sections||[]);`,
  `    }else if(t==='DEBOOGER_SECTION_DETAILS'&&e.data.selector){
      DB128_STATE.sectionDetails=e.data;
      if(DB128_STATE.expandedSectionSelector===e.data.selector)renderPagesList();
    }else if(t==='DEBOOGER_TEXT_RANGE_MUTATED'){
      if(e.data.ok&&e.data.selector){
        const htmlPath=STATE.entryFile;
        if(htmlPath&&STATE.files[htmlPath]&&!STATE.files[htmlPath].binary&&/\\.html?$/i.test(htmlPath)){
          recordAtomicEdit('Edit highlighted words',()=>{
            const orig=getVirtualFileText(STATE.files[htmlPath]);
            const doc=new DOMParser().parseFromString(orig,'text/html');
            let n=null;try{n=doc.querySelector(e.data.selector);}catch(_){}
            if(!n)return false;
            if(typeof e.data.innerHtml==='string')n.innerHTML=e.data.innerHtml;
            const upd=(/^\\s*<!doctype\\s+html>/i.test(orig)?'<!doctype html>\\n':'')+doc.documentElement.outerHTML;
            if(upd===orig)return false;
            STATE.files[htmlPath].content=upd;STATE.files[htmlPath].size=new Blob([upd]).size;STATE.files[htmlPath].modified=true;
            return true;
          });
        }
        if(STATE.activeVisualSelection&&STATE.activeVisualSelection.selector===e.data.selector&&typeof e.data.after==='string'){
          STATE.activeVisualSelection.text=e.data.after;
        }
        DB128_STATE.lastTextRange=null;
        window.db128SyncTrashButtons();
        renderDrawerEditMirror();
        showToast(e.data.action==='delete'?'Deleted highlighted text.':'Updated highlighted text.');
      }else{
        showToast('Select words inside a single block first.');
      }
    }else if(t==='DEBOOGER_PAGE_SECTIONS'){
      renderSectionsList(e.data.sections||[]);`,
  'Handle DEBOOGER_SECTION_DETAILS and DEBOOGER_TEXT_RANGE_MUTATED in parent'
);

mustReplace(
  `    if(!isTyping&&(e.key==='Delete'||e.key==='Backspace')&&STATE.inspectMode&&STATE.activeVisualSelection){e.preventDefault();db122Shortcut('delete');}`,
  `    if(!isTyping&&(e.key==='Delete'||e.key==='Backspace')&&STATE.inspectMode&&(STATE.activeVisualSelection||DB128_STATE.multiSelectors.length||DB128_STATE.lastTextRange?.text)){e.preventDefault();window.db128DeleteHighlighted();}`,
  'Allow Delete key on text selection, multi-select, and single selection'
);

// Keep selected element visible beside drawer on desktop + setup drawer resize + mobile Peek Preview toggle
mustReplace(
  `      if(window.innerWidth>900){
        const pane=document.querySelector('.workspace-pane-right');
        const wasOpen=Boolean(pane&&pane.classList.contains('drawer-open'));
        if(wasOpen||sel?.openCategory){
          window.db99SwitchInspectorTab?.('edit');
          toggleWorkspaceDrawer('diagnostics',true);
        }
      }`,
  `      if(window.innerWidth>900){
        const pane=document.querySelector('.workspace-pane-right');
        const wasOpen=Boolean(pane&&pane.classList.contains('drawer-open'));
        if(wasOpen||sel?.openCategory){
          window.db99SwitchInspectorTab?.('edit');
          toggleWorkspaceDrawer('diagnostics',true);
          requestAnimationFrame(()=>{
            const frame=document.getElementById('live-sandbox-frame');
            const stg=document.getElementById('stage-box');
            const pr=pane?.getBoundingClientRect();
            const sr=sel?.rect;
            if(frame&&pr&&sr&&stg){
              const fr=frame.getBoundingClientRect();
              const sx=fr.width/Math.max(1,Number(STATE.previewVirtW)||frame.clientWidth||fr.width);
              const elR=fr.left+sr.right*sx;
              if(elR>pr.left-12){
                stg.scrollLeft=Math.max(0,stg.scrollLeft+(elR-(pr.left-20)));
              }
              frame.contentWindow?.postMessage({type:'DEBOOGER_ENSURE_VISIBLE'},'*');
            }
          });
        }
      }`,
  'Keep selected element visible beside right drawer'
);

// Add Drawer Resize drag logic + Mobile Peek Preview toggle right after toggleWorkspaceDrawer or inside the studio module
mustReplace(
  `  window.DB110Studio = {`,
  `  // Desktop Drawer Width Resize + Mobile Peek Toggle (DB.136)
  (function initDb136DrawerControls(){
    const STORAGE_KEY='db136_drawer_width';
    try{
      const saved=Number(localStorage.getItem(STORAGE_KEY)||0);
      if(saved>=330&&saved<=740)document.documentElement.style.setProperty('--db136-drawer-w',saved+'px');
    }catch(_){}
    const resizer=document.getElementById('db136-drawer-resizer');
    if(resizer){
      let dragging=false,startX=0,startW=440;
      const getW=()=>{
        const pane=document.querySelector('.workspace-pane-right');
        return pane?pane.getBoundingClientRect().width:440;
      };
      resizer.addEventListener('pointerdown',e=>{
        if(window.innerWidth<=900||e.button!==0)return;
        e.preventDefault();
        dragging=true;startX=e.clientX;startW=getW();
        document.body.classList.add('db136-resizing');
        try{resizer.setPointerCapture(e.pointerId);}catch(_){}
      });
      window.addEventListener('pointermove',e=>{
        if(!dragging)return;
        const maxW=Math.min(740,Math.round(window.innerWidth*0.78));
        const nextW=Math.max(330,Math.min(maxW,Math.round(startW+(startX-e.clientX))));
        document.documentElement.style.setProperty('--db136-drawer-w',nextW+'px');
        positionFloatingToolbar();
      });
      const finish=()=>{
        if(!dragging)return;
        dragging=false;
        document.body.classList.remove('db136-resizing');
        const cur=Math.round(getW());
        try{localStorage.setItem(STORAGE_KEY,String(cur));}catch(_){}
        applyPreviewLayout?.();
        positionFloatingToolbar();
      };
      window.addEventListener('pointerup',finish);
      window.addEventListener('pointercancel',finish);
    }
    window.db136ToggleMobilePeek=function(force){
      const next=typeof force==='boolean'?force:!document.body.classList.contains('db136-mobile-peek');
      document.body.classList.toggle('db136-mobile-peek',next);
      const btn=document.getElementById('db136-mobile-peek-btn');
      if(btn){btn.classList.toggle('active',next);btn.setAttribute('aria-pressed',String(next));}
      requestAnimationFrame(()=>applyPreviewLayout?.());
    };
  })();

  window.DB110Studio = {`,
  'Initialize desktop drawer resizer and mobile peek preview toggle'
);

// Update DeboogerEngine version tag subtly in API metadata object
mustReplace(
  `version: 'DB.129',`,
  `version: 'DB.136',`,
  'Update engine version label to DB.136'
);

// Clean script syntax verification across ALL <script> tags before writing file
const scriptRe = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, count = 0;
while ((m = scriptRe.exec(html))) {
  count++;
  const code = m[1];
  try {
    new vm.Script(code, { filename: `db136-script-${count}.js` });
  } catch (err) {
    console.error(`Syntax error in script #${count}:`, err);
    process.exit(1);
  }
}
console.log(`✓ Verified JS syntax across all ${count} inline <script> blocks cleanly.`);

fs.writeFileSync(outPath, html, 'utf8');
console.log(`✓ Wrote ${outPath} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
