# PetShield Insurance — DataLayer Flush vs Reset Test

A Single Page Application (SPA) test website for comparing two `window.dataLayer` management strategies side by side. Built for the Jira ticket **GRO-1654**.

## Overview

This project simulates a realistic pet insurance website (**PetShield Insurance**) with 10 SPA pages, full GTM/OneTrust integration, and comprehensive dataLayer tracking. It lets you toggle between two strategies and observe how each affects `window.dataLayer` growth over a browsing session.

### Version A: "Flush Mode" (Current Approach)
Before every dataLayer push, nullifies the relevant data object (`page_data: null` or `event_data: null`), then pushes the new event. This causes the dataLayer to grow linearly — every navigation adds 2 entries (null flush + event).

### Version B: "Reset Mode" (New Approach — GRO-1654)
Before each `page_viewed` push (except on first page load and checkout pages), calls `resetDataLayer()` which:
1. Resets GTM's internal data model for each container
2. Filters `window.dataLayer` to preserve only whitelisted events (`gtm.js`, `gtm.dom`, `gtm.load`, `OneTrustGroupsUpdated`, `user_data_loaded`)
3. Clears and rebuilds the array in place

Interaction events (`cta_click`, `footer_click`, `lead_submitted`) still use the null-flush approach in both modes.

---

## Quick Start

### Option 1: npx serve (Recommended)
```bash
npx serve .
```
Open `http://localhost:3000` in your browser.

### Option 2: Python HTTP Server
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
Install the "Live Server" extension and click "Go Live" from the status bar.

### SPA Routing Note
Since this is a Single Page Application using `history.pushState`, all routes need to resolve to `index.html`. Most simple dev servers handle this automatically. If you encounter 404s on direct URL access:

- **`npx serve`**: Add a `serve.json` file:
  ```json
  { "rewrites": [{ "source": "**", "destination": "/index.html" }] }
  ```
- **Nginx**: Use `try_files $uri /index.html;`
- **Apache**: Use `FallbackResource /index.html`

### URL Mode Selection
Pre-select a mode via query parameter:
```
http://localhost:3000/?mode=flush
http://localhost:3000/?mode=reset
http://localhost:3000/?mode=reset&utm_source=google&utm_medium=cpc
```

---

## Project Structure

```
/dataLayer-flush-vs-reset/
├── index.html          # SPA shell with GTM (GTM-KR8FCPJK) + OneTrust
├── css/
│   └── styles.css      # All styling (CSS variables, responsive)
├── js/
│   ├── pages.js        # HTML templates & metadata for all 10 pages
│   ├── datalayer.js    # DataLayer logic: flush, reset, all tracking functions
│   ├── app.js          # SPA router, page rendering, auth logic
│   └── debug-panel.js  # Debug control panel (viewer, simulation, comparison)
├── serve.json          # SPA rewrite rules for npx serve
└── README.md
```

---

## The 10 Pages

| # | Route | Page Name | Category | Funnel | Key Events |
|---|-------|-----------|----------|--------|------------|
| 1 | `/` | Homepage | Home | TOFU | `page_viewed`, `cta_click` |
| 2 | `/dog-insurance` | Dog Insurance | Products / Dog Insurance | MOFU | `page_viewed`, `cta_click` |
| 3 | `/cat-insurance` | Cat Insurance | Products / Cat Insurance | MOFU | `page_viewed`, `cta_click` |
| 4 | `/blog` | Blog Listing | Blog / Articles | TOFU | `page_viewed`, `footer_click` |
| 5 | `/blog/best-dog-names-2025` | Blog Article | Blog / Articles / Dog Names | TOFU | `page_viewed`, `cta_click` |
| 6 | `/get-quote` | Get a Quote | Lead Capture / Quote Form | BOFU | `page_viewed`, `cta_click`, `lead_submitted` |
| 7 | `/about` | About Us | Company / About | TOFU | `page_viewed`, `cta_click` |
| 8 | `/signup` | Sign Up | Account / Registration | BOFU | `page_viewed`, `signup`, `user_data_loaded` |
| 9 | `/signin` | Sign In | Account / Login | BOFU | `page_viewed`, `signin`, `user_data_loaded` |
| 10 | `/account` | My Account | Account / Dashboard | BOFU | `page_viewed`, `logout` |

---

## DataLayer Events Tracked

| Event | Data Object | When |
|-------|-------------|------|
| `page_viewed` | `page_data` | Every SPA route change |
| `cta_click` | `event_data` | Any CTA button click |
| `lead_submitted` | `event_data` | Quote form submission |
| `footer_click` | `event_data` | Any footer link click |
| `signup` | `user_data` | Successful registration |
| `signin` | `user_data` | Successful login |
| `user_data_loaded` | `user_data` | After signup or signin |
| `logout` | `user_data` | User logs out |

---

## Debug Control Panel

The floating panel (bottom-right, draggable) provides:

1. **Mode Toggle** — Switch between Flush and Reset (reloads the app)
2. **Live Counters** — DataLayer entry count + pages visited
3. **DataLayer Viewer** — Syntax-highlighted JSON of every entry, collapsible payloads, auto-scroll, copy button
4. **Simulation** — "Simulate 10-Page Session" auto-navigates all pages with realistic interactions
5. **Comparison Table** — Run simulation in both modes to see a side-by-side entry count comparison
6. **Reset Button** — Clears everything and starts fresh

---

## Testing Scenarios

### 1. Basic Navigation Test
Navigate through 5+ pages manually and compare `window.dataLayer.length` between modes.

**Steps:**
1. Load the site with `?mode=flush`
2. Navigate: Home → Dog Insurance → Cat Insurance → Blog → About
3. Note the dataLayer entry count
4. Switch to Reset mode via toggle
5. Repeat the same navigation
6. Compare entry counts

**Expected:** Reset mode should have significantly fewer entries.

### 2. Login Flow Test
Verify `user_data_loaded` persists across navigations in both modes.

**Steps:**
1. Navigate to Sign Up, create an account
2. Navigate to 3 different pages
3. Open the dataLayer viewer
4. Verify `user_data_loaded` is still present

**Expected:** In both modes, `user_data_loaded` should persist. In Reset mode, it survives because it's whitelisted.

### 3. Interaction Accumulation Test
Test that interaction events (`cta_click`, `footer_click`) accumulate but get cleared on navigation in Reset mode.

**Steps:**
1. On the homepage, click 3-4 CTA buttons
2. Click 2 footer links
3. Check dataLayer entry count
4. Navigate to another page
5. Check dataLayer again

**Expected:** In Reset mode, the interaction entries from the previous page are cleared. In Flush mode, they accumulate.

### 4. Checkout Protection Test
Verify that `/get-quote` does NOT trigger `resetDataLayer()` in Reset mode.

**Steps:**
1. Use Reset mode
2. Navigate: Home → Dog Insurance → Get a Quote
3. Check the console logs

**Expected:** Console should show "Checkout page (/get-quote) — skipping resetDataLayer()".

### 5. Full Session Simulation
Use the auto-browse button to run through all 10 pages with interactions.

**Steps:**
1. Click "Simulate 10-Page Session" in Flush mode
2. Reset and switch to Reset mode
3. Click "Simulate 10-Page Session" again
4. View the comparison table

**Expected:** Reset mode should show 40-60% fewer total entries.

### 6. UTM Parameter Test
Verify UTM parameters appear in `page_full_url`.

**Steps:**
1. Load: `http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=test&mode=reset`
2. Check the first `page_viewed` event in the dataLayer viewer
3. Verify `page_data.page_full_url` includes the UTM parameters

### 7. GTM Preview Mode Test
Validate events fire correctly in GTM Preview.

**Steps:**
1. Open [GTM Preview](https://tagmanager.google.com) with container `GTM-KR8FCPJK`
2. Connect to the local site
3. Navigate through pages in both modes
4. Verify all events appear in GTM Preview's event timeline

---

## Key Implementation Details

- **Previous page tracking**: Maintained across navigations via `previousPagePath`, `previousPageType`, and `previousPageFullUrl` variables.
- **First page detection**: `isFirstPage` boolean prevents `resetDataLayer()` on the initial page load.
- **Checkout protection**: `/get-quote` never triggers `resetDataLayer()` — clearly commented in `datalayer.js`.
- **User data persistence**: `user_data_loaded` is whitelisted in Reset mode and never nullified in Flush mode.
- **Hash function**: Uses djb2 algorithm for `user_email_hashed`.
- **Console logging**: Every push logs with `[DataLayer][Flush]` or `[DataLayer][Reset]` prefix.
- **OneTrust simulation**: If OneTrust doesn't load within 2 seconds, a simulated `OneTrustGroupsUpdated` event is pushed.

---

## GTM Container

**Container ID:** `GTM-KR8FCPJK`

The GTM container is loaded in the `<head>` of `index.html`. The site is designed to work with or without a configured GTM container.

---

## License

This project is for internal testing and demonstration purposes only.
