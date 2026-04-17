# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a sports-themed interactive CV/portfolio site for Con Harbis, a Senior PMM targeting roles in the sports technology sector. Each application gets its own subdomain (e.g. `catapult.conharbis.com`) with a tailored version of the site. The Catapult Sports Senior PMM — Tactics & Coaching role is the first target.

**No build step.** This is pure HTML/CSS/JS. Edit files directly and commit to GitHub — Vercel auto-deploys on push.

## File Structure

- `index.html` — single page, all content
- `style.css` — all screen styles (dark theme, Catapult aesthetic)
- `print.css` — print/PDF stylesheet, linked with `media="print"`
- `script.js` — Chart.js radar chart, attribute bar animations, counter animations, scroll fade-ins
- `Images/` — logos and headshots

## Architecture

### Screen vs Print
The site has two distinct rendering modes controlled by CSS classes:
- `.screen-only` — visible on screen, hidden in print
- `.print-only` — hidden on screen, visible in print (e.g. `print-header`, `section-print-heading`)

The print stylesheet (`print.css`) produces a clean, ATS-friendly traditional CV — white background, black text, no animations, no dark theme. Never apply dark theme colours to print output.

### Sections (in order)
1. Print-only header (name, contact, tagline)
2. Hero — FC26-style player card + bio panel + transfer target badge
3. Career Statistics — animated counters (`data-target` attribute drives JS animation)
4. Coaching Style — Chart.js radar chart + animated attribute bars (`data-value` attribute)
5. Scouting Report — summary paragraphs + Scout's Verdict sidebar
6. Club History — vertical timeline with company logos
7. Career Highlights — metric cards grid
8. On-Pitch Record — football/sports background cards
9. Transfer Enquiries footer (screen only)

### JS Animations
All animations in `script.js` use `IntersectionObserver` — they trigger when elements scroll into view, not on page load. Stat counters use `data-target`, attribute bars use `data-value`.

### CSS Variables (style.css)
Key design tokens in `:root`:
- `--green: #00ff88` / `--teal: #00d4d4` — primary accent colours
- `--bg: #0a0e1a` / `--bg-alt: #0d1221` / `--bg-card: #111827` — background layers
- `--f-head: 'Barlow Condensed'` / `--f-body: 'Inter'` — typography

## Deployment

- **Hosting:** Vercel, connected to GitHub. Push to main = auto-deploy.
- **Domain:** `conharbis.com` managed via CrazyDomains Zone Editor
- **Subdomains:** Each application site gets a CNAME record in CrazyDomains pointing to the Vercel-provided CNAME value (project-specific, found in Vercel → Settings → Domains)

## Analytics

Both are installed on every page, before `</head>`:

1. **Vercel Analytics:** `<script defer src="/_vercel/insights/script.js"></script>`
2. **Google Analytics 4:** Standard gtag snippet. Each subdomain gets its own GA4 property (separate `G-XXXXXXXXXX`) under the same Google account. Enhanced Measurement is ON — auto-tracks outbound clicks, file downloads, scroll depth.

GA4 internal traffic filter is configured to exclude Con's home IP so only real visitor data is recorded.

## Building New Application Sites

When creating a site for a new role/company:
1. Adapt the theme/aesthetic to match the target company (colours, fonts, sports metaphors, section names)
2. Keep the same content section structure
3. Update the Transfer Target badge in the hero to reflect the new role
4. Create a new subdomain in Vercel + new CNAME in CrazyDomains
5. Create a new GA4 property for the new subdomain (same Google account)
6. Update the CV PDF download link to the role-specific PDF

## Owner Context

Con Harbis — Senior PMM/PM, 15+ years across SaaS, travel, insurance, media and sports (Xero, Carsales, ahm, Jetstar). Semi-professional footballer, national champion, founder of youth football coaching business. Targeting Product Marketing roles in sports technology. Based in Melbourne, applying for London roles (no sponsorship required).
