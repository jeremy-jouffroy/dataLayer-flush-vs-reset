/* ============================================
   PetShield Insurance — DataLayer Management
   Implements both "Flush" and "Reset" strategies
   ============================================ */

const DataLayerManager = (() => {
  // ─── State ───
  let mode = 'flush'; // 'flush' or 'reset'
  let isFirstPage = true;
  let previousPagePath = undefined;
  let previousPageType = undefined;
  let previousPageFullUrl = undefined;
  let pagesVisitedCount = 0;

  // ─── Callbacks (set by debug panel) ───
  let onPushCallback = null;

  // ─── Simple djb2 hash ───
  function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit int
    }
    return Math.abs(hash).toString(16);
  }

  // ─── UUID generator ───
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // ─── Console logger ───
  function log(message, data) {
    const modeLabel = mode === 'flush' ? 'Flush' : 'Reset';
    const style = mode === 'flush'
      ? 'color: #fab387; font-weight: bold;'
      : 'color: #a6e3a1; font-weight: bold;';
    if (data) {
      console.log(`%c[DataLayer][${modeLabel}] ${message}`, style, data);
    } else {
      console.log(`%c[DataLayer][${modeLabel}] ${message}`, style);
    }
  }

  // ─── Core push wrapper ───
  function pushToDataLayer(data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
    log(`Pushed: ${data.event || '(null flush)'}`, data);
    if (onPushCallback) onPushCallback();
  }

  // ─── GTM Container Key Check ───
  function isGTMContainerKey(key) {
    return /^GTM-/.test(key);
  }

  // ─────────────────────────────────────────────
  // RESET MODE: resetDataLayer() function
  // From Jira ticket GRO-1654
  // ─────────────────────────────────────────────
  function resetDataLayer() {
    // 1. Reset GTM internal data model for each container
    if (window.dataLayer && window.google_tag_manager) {
      for (const key of Object.keys(window.google_tag_manager)) {
        if (isGTMContainerKey(key) && window.google_tag_manager[key].dataLayer && window.google_tag_manager[key].dataLayer.reset) {
          window.google_tag_manager[key].dataLayer.reset();
        }
      }
    }

    // 2. Whitelist of events to preserve
    const eventsToKeep = [
      'gtm.js',
      'gtm.dom',
      'gtm.load',
      'OneTrustGroupsUpdated',  // Preserve consent state (GDPR compliance)
      'user_data_loaded',       // Preserve user identity and contract context
    ];

    const beforeCount = window.dataLayer.length;
    const preserved = window.dataLayer.filter(
      ({ event }) => event && eventsToKeep.includes(event)
    );

    // 3. Clear and rebuild in place
    window.dataLayer.length = 0;
    window.dataLayer.push(...preserved);

    const afterCount = window.dataLayer.length;
    log(`resetDataLayer() called — preserved ${afterCount} events, cleared ${beforeCount - afterCount}`);

    if (onPushCallback) onPushCallback();
  }

  // ─────────────────────────────────────────────
  // TRACKING FUNCTIONS
  // ─────────────────────────────────────────────

  /**
   * Track page_viewed event
   * Called on every SPA navigation (route change)
   */
  function trackPageView(pageMeta, path) {
    const fullUrl = window.location.href;

    // Build page_data
    const pageData = {
      page_name: pageMeta.name,
      page_category: pageMeta.category,
      page_tags: pageMeta.tags,
      page_funnel_position: pageMeta.funnelPosition,
      page_path: path,
      page_full_url: fullUrl,
      page_type: 'Website',
      page_brand: 'PetShield Insurance',
      language_used: 'en',
      country: 'US',
      previous_page_path: previousPagePath,
      previous_page_type: previousPageType,
      previous_page_full_url: isFirstPage ? (document.referrer || undefined) : previousPageFullUrl,
      site_environment: 'Production',
      site_type: 'Website Desktop'
    };

    if (mode === 'flush') {
      // ── FLUSH MODE ──
      // Nullify page_data before pushing new event
      pushToDataLayer({ "page_data": null });
      pushToDataLayer({ event: "page_viewed", page_data: pageData });

    } else {
      // ── RESET MODE ──
      // Call resetDataLayer() ONLY if:
      //   - NOT the first page load
      //   - NOT the get-quote page (checkout protection)
      const isCheckoutPage = path === '/get-quote';

      if (!isFirstPage && !isCheckoutPage) {
        resetDataLayer();
      } else if (isFirstPage) {
        log('First page load — skipping resetDataLayer()');
      } else if (isCheckoutPage) {
        // CHECKOUT PROTECTION: Do NOT reset on /get-quote
        // This simulates a checkout page where we want to preserve
        // tracking continuity (e.g., attribution data, funnel context)
        log('Checkout page (/get-quote) — skipping resetDataLayer()');
      }

      pushToDataLayer({ event: "page_viewed", page_data: pageData });
    }

    // Update tracking state
    previousPagePath = path;
    previousPageType = 'Website';
    previousPageFullUrl = fullUrl;
    isFirstPage = false;
    pagesVisitedCount++;
  }

  /**
   * Track cta_click event
   */
  function trackCTAClick(ctaText, ctaLocation, ctaDestination, ctaType) {
    // Both modes: null-flush event_data before pushing
    pushToDataLayer({ "event_data": null });
    pushToDataLayer({
      event: "cta_click",
      event_data: {
        cta_text: ctaText,
        cta_location: ctaLocation,
        cta_destination: ctaDestination,
        cta_type: ctaType || 'primary'
      }
    });
  }

  /**
   * Track lead_submitted event
   */
  function trackLeadSubmitted(petType) {
    pushToDataLayer({ "event_data": null });
    pushToDataLayer({
      event: "lead",
      event_data: {
        form_name: "get_a_quote",
        pet_type: petType,
        lead_source: "website"
      }
    });
  }

  /**
   * Track footer_click event
   */
  function trackFooterClick(linkText, linkUrl) {
    pushToDataLayer({ "event_data": null });
    pushToDataLayer({
      event: "footer_click",
      event_data: {
        link_text: linkText,
        link_url: linkUrl,
        link_section: "footer"
      }
    });
  }

  /**
   * Track signup event + user_data_loaded
   */
  function trackSignup(email) {
    const userId = generateUUID();
    const emailHash = hashString(email);

    // Store user data for session
    const userData = {
      userId: userId,
      email: email,
      emailHash: emailHash
    };
    sessionStorage.setItem('petshield_user', JSON.stringify(userData));

    // Push signup event
    pushToDataLayer({
      event: "signup",
      user_data: {
        user_id: userId,
        user_email_hashed: emailHash,
        user_type: "new",
        login_method: "email"
      }
    });

    // Immediately push user_data_loaded
    pushToDataLayer({
      event: "user_data_loaded",
      user_data: {
        user_id: userId,
        user_email_hashed: emailHash,
        user_type: "registered",
        account_status: "active",
        has_active_policy: false,
        claims_count: 0
      }
    });

    return userData;
  }

  /**
   * Track signin event + user_data_loaded
   */
  function trackSignin(userData) {
    // Push signin event
    pushToDataLayer({
      event: "signin",
      user_data: {
        user_id: userData.userId,
        user_email_hashed: userData.emailHash,
        user_type: "returning",
        login_method: "email"
      }
    });

    // Immediately push user_data_loaded
    pushToDataLayer({
      event: "user_data_loaded",
      user_data: {
        user_id: userData.userId,
        user_email_hashed: userData.emailHash,
        user_type: "registered",
        account_status: "active",
        has_active_policy: true,
        claims_count: 3
      }
    });
  }

  /**
   * Track logout event
   */
  function trackLogout() {
    const user = JSON.parse(sessionStorage.getItem('petshield_user') || 'null');
    if (user) {
      pushToDataLayer({
        event: "logout",
        user_data: {
          user_id: user.userId,
          logout_method: "manual"
        }
      });
    }
  }

  // ─── OneTrust simulation ───
  function simulateOneTrust() {
    setTimeout(() => {
      if (!window.dataLayer.some(e => e.event === 'OneTrustGroupsUpdated')) {
        pushToDataLayer({
          event: 'OneTrustGroupsUpdated',
          OnetrustActiveGroups: ',C0001,C0002,C0003,C0004,'
        });
        log('OneTrust simulated (no real OneTrust detected after 2s)');
      }
    }, 2000);
  }

  // ─── Mode Management ───
  function setMode(newMode) {
    mode = newMode;
    log(`Mode changed to: ${mode}`);
  }

  function getMode() {
    return mode;
  }

  function resetState() {
    isFirstPage = true;
    previousPagePath = undefined;
    previousPageType = undefined;
    previousPageFullUrl = undefined;
    pagesVisitedCount = 0;
  }

  function getPagesVisited() {
    return pagesVisitedCount;
  }

  function setOnPushCallback(cb) {
    onPushCallback = cb;
  }

  // ─── Public API ───
  return {
    setMode,
    getMode,
    resetState,
    trackPageView,
    trackCTAClick,
    trackLeadSubmitted,
    trackFooterClick,
    trackSignup,
    trackSignin,
    trackLogout,
    simulateOneTrust,
    getPagesVisited,
    setOnPushCallback,
    hashString,
    generateUUID
  };
})();
