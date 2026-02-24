/* ============================================
   PetShield Insurance — SPA Application Core
   Router, page rendering, auth, event binding
   ============================================ */

// ─── GitHub Pages Base Path ───
// Auto-detect base path from <base href="..."> tag, or default to '/'
const BASE_PATH = (() => {
  const base = document.querySelector('base');
  if (base) {
    const href = base.getAttribute('href') || '/';
    // Ensure it ends with /
    return href.endsWith('/') ? href : href + '/';
  }
  return '/';
})();

// Helper: prepend base path to a route (e.g. '/dog-insurance' -> '/repo/dog-insurance')
function toFullPath(route) {
  if (route === '/') return BASE_PATH;
  // Strip leading slash from route, combine with base
  return BASE_PATH + route.replace(/^\//, '');
}

// Helper: strip base path to get the route (e.g. '/repo/dog-insurance' -> '/dog-insurance')
function toRoute(fullPath) {
  let route = fullPath;
  if (BASE_PATH !== '/' && route.startsWith(BASE_PATH)) {
    route = route.slice(BASE_PATH.length - 1); // keep leading /
  }
  return route || '/';
}

const App = (() => {
  // ─── State ───
  let currentPath = '/';

  // ─── Auth helpers ───
  function isAuthenticated() {
    return sessionStorage.getItem('petshield_user') !== null;
  }

  function getUser() {
    return JSON.parse(sessionStorage.getItem('petshield_user') || 'null');
  }

  function logout() {
    DataLayerManager.trackLogout();
    sessionStorage.removeItem('petshield_user');
    updateNav();
    navigateTo('/');
  }

  // ─── Navigation ───
  function updateNav() {
    const navAuth = document.getElementById('nav-auth-item');
    if (!navAuth) return;
    if (isAuthenticated()) {
      navAuth.innerHTML = `
        <a href="/account" data-link>My Account</a>
        </li><li><a href="#" id="nav-logout-link" style="color:var(--danger);">Log Out</a>
      `;
      // Bind logout
      setTimeout(() => {
        const logoutLink = document.getElementById('nav-logout-link');
        if (logoutLink) {
          logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
          });
        }
      }, 0);
    } else {
      navAuth.innerHTML = '<a href="/signin" data-link>Sign In</a>';
    }
    // Re-bind data-link on new nav elements
    bindNavLinks();
    highlightActiveNav();
  }

  function highlightActiveNav() {
    document.querySelectorAll('.nav-links a[data-link]').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === currentPath);
    });
  }

  function navigateTo(path, options = {}) {
    const { replace = false, skipTracking = false } = options;

    // Normalize path
    if (!path) path = '/';

    // Guard: /account requires auth
    if (path === '/account' && !isAuthenticated()) {
      path = '/signin';
    }

    // Guard: /signin and /signup when already authenticated
    if ((path === '/signin' || path === '/signup') && isAuthenticated()) {
      path = '/account';
    }

    currentPath = path;

    // Update browser URL (use full path with base prefix for the URL bar)
    const fullUrl = toFullPath(path);
    if (replace) {
      history.replaceState({ path }, '', fullUrl);
    } else {
      history.pushState({ path }, '', fullUrl);
    }

    // Render the page
    renderPage(path);

    // Track page_viewed (unless explicitly skipped, e.g., on initial URL-mode setup)
    if (!skipTracking) {
      const pageMeta = getPageMeta(path);
      if (pageMeta) {
        DataLayerManager.trackPageView(pageMeta, path);
      }
    }

    // Update nav
    updateNav();

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function renderPage(path) {
    const app = document.getElementById('app');
    const page = PAGES[path];

    if (page) {
      app.innerHTML = page.render();
      app.className = 'main-content page-entering';

      // Update page title
      document.title = `${page.name} — PetShield Insurance`;

      // Bind page-specific events
      bindPageEvents(path);
    } else {
      // 404
      app.innerHTML = `
        <div class="form-page text-center">
          <div style="font-size:4rem;margin-bottom:16px;">🔍</div>
          <h1>Page Not Found</h1>
          <p class="form-subtitle">The page you're looking for doesn't exist.</p>
          <a href="/" data-link class="btn btn-primary">Go Home</a>
        </div>
      `;
      app.className = 'main-content page-entering';
      document.title = '404 — PetShield Insurance';
    }

    // Bind data-link navigation on newly rendered content
    bindNavLinks();
  }

  // ─── Event Binding ───
  function bindNavLinks() {
    document.querySelectorAll('[data-link]').forEach(link => {
      // Avoid double binding
      if (link._boundNav) return;
      link._boundNav = true;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          // Resolve the route: if href starts with base path, strip it; otherwise use as-is
          const route = href.startsWith(BASE_PATH) ? toRoute(href) : href;
          // Check if this is also a CTA
          if (link.dataset.cta === 'true') {
            DataLayerManager.trackCTAClick(
              link.dataset.ctaText || link.textContent.trim(),
              link.dataset.ctaLocation || 'navigation',
              link.dataset.ctaDestination || route,
              link.dataset.ctaType || 'primary'
            );
          }
          navigateTo(route);
        }
      });
    });
  }

  function bindFooterLinks() {
    document.querySelectorAll('[data-footer-link]').forEach(link => {
      if (link._boundFooter) return;
      link._boundFooter = true;

      link.addEventListener('click', (e) => {
        // Don't prevent default if it's also a data-link (navigation handled there)
        const linkText = link.textContent.trim();
        const linkUrl = link.getAttribute('href') || '#';
        DataLayerManager.trackFooterClick(linkText, linkUrl);
      });
    });
  }

  function bindPageEvents(path) {
    // ── Quote Form ──
    if (path === '/get-quote') {
      const form = document.getElementById('quote-form');
      const success = document.getElementById('quote-success');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const petType = document.getElementById('pet-type').value;

          // Track CTA click on submit button
          DataLayerManager.trackCTAClick(
            'Get My Free Quote',
            'quote_form',
            '/get-quote',
            'primary'
          );

          // Track lead submitted
          DataLayerManager.trackLeadSubmitted(petType);

          // Show success
          form.style.display = 'none';
          if (success) success.style.display = 'block';

          // Bind the "Return to Homepage" link
          bindNavLinks();
        });
      }
    }

    // ── Sign Up Form ──
    if (path === '/signup') {
      const form = document.getElementById('signup-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('signup-email').value;
          const password = document.getElementById('signup-password').value;
          const confirm = document.getElementById('signup-confirm').value;
          const errorEl = document.getElementById('signup-error');

          if (password !== confirm) {
            errorEl.textContent = 'Passwords do not match. Please try again.';
            errorEl.style.display = 'block';
            return;
          }

          if (password.length < 6) {
            errorEl.textContent = 'Password must be at least 6 characters.';
            errorEl.style.display = 'block';
            return;
          }

          // Store credentials
          const creds = JSON.parse(sessionStorage.getItem('petshield_credentials') || '{}');
          creds[email] = password;
          sessionStorage.setItem('petshield_credentials', JSON.stringify(creds));

          // Track signup + user_data_loaded
          DataLayerManager.trackSignup(email);

          // Navigate to account
          navigateTo('/account');
        });
      }
    }

    // ── Sign In Form ──
    if (path === '/signin') {
      const form = document.getElementById('signin-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('signin-email').value;
          const password = document.getElementById('signin-password').value;
          const errorEl = document.getElementById('signin-error');

          const creds = JSON.parse(sessionStorage.getItem('petshield_credentials') || '{}');
          if (creds[email] && creds[email] === password) {
            // Restore user data
            const userId = DataLayerManager.generateUUID();
            const emailHash = DataLayerManager.hashString(email);
            const userData = { userId, email, emailHash };
            sessionStorage.setItem('petshield_user', JSON.stringify(userData));

            // Track signin + user_data_loaded
            DataLayerManager.trackSignin(userData);

            // Navigate to account
            navigateTo('/account');
          } else {
            errorEl.textContent = 'Invalid email or password. Please try again.';
            errorEl.style.display = 'block';
          }
        });
      }
    }

    // ── Account Page: Logout ──
    if (path === '/account') {
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          logout();
        });
      }
    }

    // ── Bind CTA buttons (non-link buttons) ──
    document.querySelectorAll('button[data-cta="true"]').forEach(btn => {
      if (btn._boundCTA) return;
      btn._boundCTA = true;
      // CTA tracking for buttons is handled in form submit handlers above
    });

    // Re-bind footer links
    bindFooterLinks();
  }

  // ─── Mobile Menu ───
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
    }
  }

  // ─── Mode from URL ───
  function getModeFromURL() {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'flush' || urlMode === 'reset') {
      return urlMode;
    }
    return localStorage.getItem('petshield_mode') || 'flush';
  }

  // ─── Initialize ───
  function init() {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    // Set mode from URL or localStorage
    const initialMode = getModeFromURL();
    DataLayerManager.setMode(initialMode);
    localStorage.setItem('petshield_mode', initialMode);

    // Simulate OneTrust if needed
    DataLayerManager.simulateOneTrust();

    // Initialize debug panel
    DebugPanel.init();

    // Set initial path from URL (strip base path to get route)
    const initialPath = toRoute(window.location.pathname || '/');

    // Initialize mobile menu
    initMobileMenu();

    // Bind footer links on initial shell
    bindFooterLinks();

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      const path = (e.state && e.state.path) || toRoute(window.location.pathname || '/');
      navigateTo(path, { replace: true });
    });

    // Navigate to initial path
    navigateTo(initialPath, { replace: true });
  }

  // ─── Public API ───
  return {
    init,
    navigateTo,
    isAuthenticated,
    getUser,
    logout
  };
})();

// ─── Boot ───
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
