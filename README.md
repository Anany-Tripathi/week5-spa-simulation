# Week 5 — Developing a Single Page Application (SPA) Simulation

## Overview
Orbit is a responsive front-end SPA simulation demonstrating hash-based client-side routing, dynamically rendered views, and interactive sample data. It uses plain HTML, CSS, and vanilla JavaScript and requires no build tools or third-party dependencies.

## Files
- `index.html` — semantic app shell and navigation
- `css/styles.css` — responsive layout and interaction styling
- `js/app.js` — routing, view templates, task checklist, and project filter
- `REPORT.md` — project report
- `docs/Week5_SPA_Simulation_Report.docx` — downloadable report document

## Run locally
Open `index.html` in a modern browser. Navigate with the top menu or sidebar. Try the task checkboxes, Add task button, project filter, and browser Back/Forward controls.

## Features
- Hash-based routing for Home, Dashboard, Projects, and About
- Dynamic rendering without full-page navigation
- Browser history support
- Responsive mobile navigation and layout
- Interactive task checklist and project filtering
- Semantic landmarks, skip link, visible focus states, and live region

## Limitations
This is a front-end simulation using in-memory sample data. Changes are not saved after a page refresh and there is no backend or authentication.

## Validation checklist
- Test all routes, refresh, and browser Back/Forward.
- Test the responsive layout at mobile and desktop widths.
- Navigate using keyboard only.
- Run browser console checks and an accessibility checker.
