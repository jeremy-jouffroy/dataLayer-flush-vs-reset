/* ============================================
   PetShield Insurance — Debug Control Panel
   Real-time dataLayer viewer & simulation tools
   ============================================ */

const DebugPanel = (() => {
  let isCollapsed = false;
  let simulationRunning = false;
  let comparisonData = null;

  // ─── JSON Syntax Highlighting ───
  function syntaxHighlight(json) {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, null, 2);
    }
    return json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g, (match) => {
        let cls = 'json-string';
        if (/:$/.test(match)) {
          cls = 'json-key';
          match = match.replace(/"/g, '').replace(/:$/, ':');
          return `<span class="${cls}">${match}</span>`;
        }
        return `<span class="${cls}">${match}</span>`;
      })
      .replace(/\b(true|false)\b/g, '<span class="json-bool">$&</span>')
      .replace(/\bnull\b/g, '<span class="json-null">null</span>')
      .replace(/\b(-?\d+\.?\d*([eE][+-]?\d+)?)\b/g, '<span class="json-number">$&</span>');
  }

  // ─── Classify entry ───
  function classifyEntry(entry) {
    if (entry.event) return 'entry-event';
    // Check for null flush
    for (const key of Object.keys(entry)) {
      if (entry[key] === null) return 'entry-null';
    }
    if (entry['gtm.start']) return 'entry-gtm';
    return '';
  }

  // ─── Render DataLayer Viewer ───
  function renderDataLayerEntries() {
    const container = document.getElementById('dl-entries');
    if (!container) return;

    const dl = window.dataLayer || [];
    container.innerHTML = dl.map((entry, i) => {
      const cls = classifyEntry(entry);
      const eventName = entry.event || (Object.keys(entry).find(k => entry[k] === null) ? `${Object.keys(entry).find(k => entry[k] === null)}: null` : 'data');
      const jsonStr = syntaxHighlight(JSON.stringify(entry, null, 2));
      return `
        <div class="dl-entry ${cls}">
          <span class="dl-entry-index">#${i}</span>
          <span class="dl-entry-event">${eventName}</span>
          <details>
            <summary style="cursor:pointer;font-size:10px;color:#6c7086;margin-top:2px;">show payload</summary>
            <div class="dl-entry-json">${jsonStr}</div>
          </details>
        </div>
      `;
    }).join('');

    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;

    // Update stats
    updateStats();
  }

  // ─── Update Stats ───
  function updateStats() {
    const countEl = document.getElementById('dl-count');
    const pagesEl = document.getElementById('dl-pages');
    if (countEl) countEl.textContent = (window.dataLayer || []).length;
    if (pagesEl) pagesEl.textContent = DataLayerManager.getPagesVisited();
  }

  // ─── Toggle collapse ───
  function toggleCollapse() {
    isCollapsed = !isCollapsed;
    const panel = document.getElementById('debug-panel-root');
    const toggleBtn = document.getElementById('panel-collapse-btn');
    if (panel) panel.classList.toggle('collapsed', isCollapsed);
    if (toggleBtn) toggleBtn.textContent = isCollapsed ? '▲' : '▼';
  }

  // ─── Toggle Mode ───
  function toggleMode() {
    const currentMode = DataLayerManager.getMode();
    const newMode = currentMode === 'flush' ? 'reset' : 'flush';
    localStorage.setItem('petshield_mode', newMode);

    // Reload fresh
    const url = new URL(window.location.href);
    url.searchParams.set('mode', newMode);
    // Go to homepage
    url.pathname = '/';
    window.location.href = url.toString();
  }

  // ─── Copy to clipboard ───
  function copyDataLayer() {
    const dl = window.dataLayer || [];
    const text = JSON.stringify(dl, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('dl-copy-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      }
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  }

  // ─── Simulate 10-page session ───
  async function runSimulation() {
    if (simulationRunning) return;
    simulationRunning = true;

    const simBtn = document.getElementById('sim-btn');
    if (simBtn) simBtn.disabled = true;

    const progressContainer = document.getElementById('sim-progress');
    const progressBar = document.getElementById('sim-progress-fill');
    const progressLabel = document.getElementById('sim-progress-label');

    if (progressContainer) progressContainer.style.display = 'block';

    const routes = [
      '/',                           // 1
      '/dog-insurance',              // 2
      '/cat-insurance',              // 3
      '/blog',                       // 4
      '/blog/best-dog-names-2025',   // 5
      '/get-quote',                  // 6
      '/about',                      // 7
      '/signup',                     // 8
      '/signin',                     // 9
      '/account'                     // 10
    ];

    // For a meaningful simulation, create test credentials first
    const testEmail = 'testuser@petshield.com';
    const testPassword = 'test123';
    const creds = {};
    creds[testEmail] = testPassword;
    sessionStorage.setItem('petshield_credentials', JSON.stringify(creds));

    const entryCountsAfterEachPage = [];

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const progress = ((i + 1) / routes.length) * 100;

      if (progressLabel) progressLabel.textContent = `Navigating to ${route} (${i + 1}/${routes.length})...`;
      if (progressBar) progressBar.style.width = progress + '%';

      // Special handling for signup page (simulate form submission)
      if (route === '/signup') {
        App.navigateTo(route);
        await sleep(300);
        // Simulate signup
        DataLayerManager.trackSignup(testEmail);
        // Set user in session for account page
        const userData = JSON.parse(sessionStorage.getItem('petshield_user'));
        if (userData) {
          const credStore = JSON.parse(sessionStorage.getItem('petshield_credentials') || '{}');
          credStore[testEmail] = testPassword;
          sessionStorage.setItem('petshield_credentials', JSON.stringify(credStore));
        }
      } else if (route === '/signin') {
        // Clear user first to test signin
        const savedUser = JSON.parse(sessionStorage.getItem('petshield_user') || 'null');
        sessionStorage.removeItem('petshield_user');
        App.navigateTo(route);
        await sleep(300);
        // Simulate signin
        const userId = DataLayerManager.generateUUID();
        const emailHash = DataLayerManager.hashString(testEmail);
        const userData = { userId, email: testEmail, emailHash };
        sessionStorage.setItem('petshield_user', JSON.stringify(userData));
        DataLayerManager.trackSignin(userData);
      } else if (route === '/account') {
        // Ensure user is authenticated
        if (!sessionStorage.getItem('petshield_user')) {
          const userId = DataLayerManager.generateUUID();
          const emailHash = DataLayerManager.hashString(testEmail);
          sessionStorage.setItem('petshield_user', JSON.stringify({
            userId, email: testEmail, emailHash
          }));
        }
        App.navigateTo(route);
      } else {
        App.navigateTo(route);
      }

      await sleep(200);

      // Simulate interactions on specific pages
      if (i === 0) {
        // Homepage: CTA click
        DataLayerManager.trackCTAClick('Get a Free Quote', 'hero_banner', '/get-quote', 'primary');
      } else if (i === 1) {
        // Dog Insurance: CTA click
        DataLayerManager.trackCTAClick('Choose Complete', 'pricing_section', '/get-quote', 'primary');
      } else if (i === 2) {
        // Cat Insurance: CTA click
        DataLayerManager.trackCTAClick('Get a Cat Insurance Quote', 'product_hero', '/get-quote', 'primary');
      } else if (i === 3) {
        // Blog: footer click
        DataLayerManager.trackFooterClick('Privacy Policy', '#');
      } else if (i === 5) {
        // Get a Quote: lead submitted
        DataLayerManager.trackLeadSubmitted('dog');
      }

      await sleep(300);
      entryCountsAfterEachPage.push((window.dataLayer || []).length);
    }

    if (progressLabel) progressLabel.textContent = 'Simulation complete!';
    if (progressBar) progressBar.style.width = '100%';

    simulationRunning = false;
    if (simBtn) simBtn.disabled = false;

    // Store results for comparison
    const currentMode = DataLayerManager.getMode();
    if (!comparisonData) comparisonData = {};
    comparisonData[currentMode] = {
      entryCounts: entryCountsAfterEachPage,
      totalEntries: (window.dataLayer || []).length
    };

    // Show results
    renderComparisonIfReady();
    renderDataLayerEntries();
  }

  // ─── Render comparison table ───
  function renderComparisonIfReady() {
    const container = document.getElementById('comparison-container');
    if (!container) return;

    const routes = ['/', '/dog-ins', '/cat-ins', '/blog', '/article', '/quote', '/about', '/signup', '/signin', '/account'];

    // If we have data for current mode, show it
    const currentMode = DataLayerManager.getMode();
    const currentData = comparisonData && comparisonData[currentMode];

    if (!currentData) {
      container.innerHTML = '';
      return;
    }

    const otherMode = currentMode === 'flush' ? 'reset' : 'flush';
    const otherData = comparisonData && comparisonData[otherMode];

    let tableHtml = `
      <div class="debug-comparison">
        <h4>Simulation Results</h4>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Flush</th>
              <th>Reset</th>
              <th>Diff</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (let i = 0; i < routes.length; i++) {
      const flushVal = comparisonData.flush ? comparisonData.flush.entryCounts[i] : '—';
      const resetVal = comparisonData.reset ? comparisonData.reset.entryCounts[i] : '—';
      const diff = (typeof flushVal === 'number' && typeof resetVal === 'number')
        ? `${flushVal - resetVal > 0 ? '+' : ''}${flushVal - resetVal}`
        : '—';

      tableHtml += `
        <tr>
          <td>${routes[i]}</td>
          <td class="flush-val">${flushVal}</td>
          <td class="reset-val">${resetVal}</td>
          <td class="diff-val">${diff}</td>
        </tr>
      `;
    }

    // Totals row
    const flushTotal = comparisonData.flush ? comparisonData.flush.totalEntries : '—';
    const resetTotal = comparisonData.reset ? comparisonData.reset.totalEntries : '—';
    const totalDiff = (typeof flushTotal === 'number' && typeof resetTotal === 'number')
      ? flushTotal - resetTotal
      : null;
    const pctDiff = totalDiff !== null && flushTotal > 0
      ? ((totalDiff / flushTotal) * 100).toFixed(1)
      : '—';

    tableHtml += `
          <tr style="font-weight:bold;border-top:2px solid #585b70;">
            <td>TOTAL</td>
            <td class="flush-val">${flushTotal}</td>
            <td class="reset-val">${resetTotal}</td>
            <td class="diff-val">${totalDiff !== null ? (totalDiff > 0 ? '+' : '') + totalDiff : '—'}</td>
          </tr>
        </tbody>
      </table>
    `;

    if (totalDiff !== null) {
      tableHtml += `
        <p style="text-align:center;margin-top:8px;font-size:11px;color:#cba6f7;">
          Reset mode uses <strong>${pctDiff}%</strong> fewer entries than Flush mode
        </p>
      `;
    } else {
      tableHtml += `
        <p style="text-align:center;margin-top:8px;font-size:11px;color:#6c7086;">
          Run simulation in both modes to see comparison
        </p>
      `;
    }

    tableHtml += '</div>';
    container.innerHTML = tableHtml;
  }

  // ─── Reset everything ───
  function resetAll() {
    // Clear comparison data
    comparisonData = null;

    // Clear session & user data
    sessionStorage.removeItem('petshield_user');
    sessionStorage.removeItem('petshield_credentials');

    // Reset dataLayer
    window.dataLayer = [];
    // Re-push GTM init
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Reset DataLayerManager state
    DataLayerManager.resetState();

    // Simulate OneTrust again
    DataLayerManager.simulateOneTrust();

    // Navigate to homepage
    App.navigateTo('/');

    // Update panel
    renderDataLayerEntries();
    const compContainer = document.getElementById('comparison-container');
    if (compContainer) compContainer.innerHTML = '';
    const progressContainer = document.getElementById('sim-progress');
    if (progressContainer) progressContainer.style.display = 'none';
  }

  // ─── Render Panel ───
  function render() {
    const container = document.getElementById('debug-panel');
    if (!container) return;

    const mode = DataLayerManager.getMode();
    const isReset = mode === 'reset';

    container.innerHTML = `
      <div class="debug-panel" id="debug-panel-root">
        <!-- Header -->
        <div class="debug-panel-header" id="panel-drag-handle">
          <div class="panel-title">
            🐾 DataLayer Inspector
          </div>
          <div class="panel-controls">
            <button class="panel-btn" id="panel-collapse-btn" title="Toggle panel">▼</button>
          </div>
        </div>

        <!-- Body -->
        <div class="debug-panel-body">
          <!-- Mode Toggle -->
          <div class="debug-mode-toggle">
            <span class="mode-label ${!isReset ? 'active-flush' : ''}" style="text-align:right;">Flush</span>
            <div class="toggle-switch ${isReset ? 'reset-active' : ''}" id="mode-toggle" title="Click to switch mode"></div>
            <span class="mode-label ${isReset ? 'active-reset' : ''}">Reset</span>
          </div>

          <!-- Stats -->
          <div class="debug-stats">
            <div class="debug-stat">
              <span class="stat-value" id="dl-count">${(window.dataLayer || []).length}</span>
              <span class="stat-label">DL Entries</span>
            </div>
            <div class="debug-stat">
              <span class="stat-value" id="dl-pages">${DataLayerManager.getPagesVisited()}</span>
              <span class="stat-label">Pages Visited</span>
            </div>
          </div>

          <!-- DataLayer Viewer -->
          <div class="debug-viewer">
            <div class="debug-viewer-header">
              <span>window.dataLayer</span>
              <button id="dl-copy-btn">Copy JSON</button>
            </div>
            <div class="debug-viewer-content" id="dl-entries">
              <!-- Entries rendered dynamically -->
            </div>
          </div>

          <!-- Simulation Progress (hidden by default) -->
          <div class="sim-progress" id="sim-progress" style="display:none;">
            <div class="sim-progress-label" id="sim-progress-label">Ready</div>
            <div class="sim-progress-bar">
              <div class="sim-progress-bar-fill" id="sim-progress-fill"></div>
            </div>
          </div>

          <!-- Comparison Container -->
          <div id="comparison-container"></div>

          <!-- Actions -->
          <div class="debug-actions">
            <button class="debug-btn-simulate" id="sim-btn">▶ Simulate 10-Page Session</button>
            <button class="debug-btn-reset" id="reset-btn">↺ Reset Simulation</button>
          </div>
        </div>
      </div>
    `;

    // ── Bind events ──
    document.getElementById('panel-collapse-btn').addEventListener('click', toggleCollapse);
    document.getElementById('mode-toggle').addEventListener('click', toggleMode);
    document.getElementById('dl-copy-btn').addEventListener('click', copyDataLayer);
    document.getElementById('sim-btn').addEventListener('click', runSimulation);
    document.getElementById('reset-btn').addEventListener('click', resetAll);

    // ── Make panel draggable ──
    makeDraggable();

    // ── Initial render of entries ──
    renderDataLayerEntries();
  }

  // ─── Draggable Panel ───
  function makeDraggable() {
    const handle = document.getElementById('panel-drag-handle');
    const panel = document.getElementById('debug-panel-root');
    if (!handle || !panel) return;

    let isDragging = false;
    let startX, startY, startLeft, startBottom;

    handle.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON') return; // Don't drag when clicking buttons
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = panel.getBoundingClientRect();
      startLeft = rect.left;
      startBottom = window.innerHeight - rect.bottom;
      handle.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      panel.style.right = 'auto';
      panel.style.left = (startLeft + dx) + 'px';
      panel.style.bottom = (startBottom - dy) + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        handle.style.cursor = 'move';
      }
    });
  }

  // ─── Sleep helper ───
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ─── Init ───
  function init() {
    render();
    // Hook into DataLayerManager push events
    DataLayerManager.setOnPushCallback(() => {
      renderDataLayerEntries();
    });
  }

  // ─── Public API ───
  return {
    init,
    renderDataLayerEntries,
    updateStats
  };
})();
