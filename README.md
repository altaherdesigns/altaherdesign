# Al Taher Group — Official Website

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://altaherdesign.com)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Faltaherdesign.com)](https://altaherdesign.com)
[![Language](https://img.shields.io/badge/Language-EN%20%2F%20AR-1B5E6B)](https://altaherdesign.com)

**Live:** https://altaherdesign.com  
**Arabic:** https://altaherdesign.com/ar/  

Official source code for altaherdesign.com — the website of Al Taher Group, a Fujairah-based industrial group established in 1984 specialising in aluminium works, carpentry, metal fabrication, powder coating, custom gates, stair railings, kitchen design and pergolas across all seven UAE emirates.

---

## About Al Taher Group

Al Taher Group operates two divisions from Al Hail Industrial Area, Fujairah, UAE:

| Division | Established | Specialisation |
|---|---|---|
| Al Taher Carpentry, Aluminium & Metal Forming LLC | 1984 | Carpentry, kitchen design, aluminium works, glass works, shed & pergola |
| DAT Metal Fabrication & Powder Coating | — | Metal fabrication, welding, custom metal gates, powder coating (all RAL colours) |

**Coverage:** All 7 UAE Emirates — Fujairah, Dubai, Sharjah, Abu Dhabi, Ajman, Ras Al Khaimah, Umm Al Quwain.

---

## Site Structure

```
altaherdesign.com/
├── index.html                  ← Home (EN)
├── services/index.html         ← Services — 8 disciplines with full descriptions
├── portfolio/index.html        ← Portfolio — 49+ projects, filterable gallery, lightbox
├── about/index.html            ← About — Company history, two divisions, who we serve
├── contact/index.html          ← Contact — Quote form, map, 3 WhatsApp lines, FAQ
│
├── ar/                         ← Arabic mirror (RTL, dir="rtl")
│   ├── index.html
│   ├── services/index.html
│   ├── portfolio/index.html
│   ├── about/index.html
│   └── contact/index.html
│
├── assets/
│   ├── css/main.css            ← Gulf Heritage Luxury design system (~1900 lines)
│   ├── js/main.js              ← Vanilla JS: nav, lightbox, filters, WA, forms, counters
│   └── images/logo.svg         ← Teal oval logo
│
├── _headers                    ← Cloudflare Pages: cache rules + security headers
├── _redirects                  ← Cloudflare Pages: www→non-www canonical redirect
├── 404.html                    ← Custom 404 page
├── sitemap.xml                 ← 10 URLs with hreflang + image entries
├── robots.txt
└── site.webmanifest            ← PWA manifest, theme-color #0d6e5e
```

---

## Services

| # | Service | Division | WhatsApp |
|---|---|---|---|
| 01 | Metal Gates & Doors | DAT Metal | Sales |
| 02 | Stair Railings | Both | Marketing |
| 03 | Kitchen Design | Al Taher Carpentry | GM |
| 04 | Aluminium & Glass Works | Al Taher Carpentry | GM |
| 05 | Shed & Pergola | Al Taher Carpentry | Marketing |
| 06 | Metal Fabrication & Welding | DAT Metal | Sales |
| 07 | Powder Coating | DAT Metal | Sales |
| 08 | Facade Design & Carpentry | Al Taher Carpentry | GM |

---

## Key Features

- **Bilingual** — Full English + Arabic (RTL) with hreflang SEO tags
- **Multipage** — 5 dedicated pages (was single-page), better SEO + mobile performance
- **49 real portfolio photos** — All served from Google Drive (lh3.googleusercontent.com), lazy-loaded
- **Zero frameworks** — Pure HTML5, CSS3, Vanilla JS. No React, no jQuery, no Bootstrap
- **Schema.org** — LocalBusiness + GeneralContractor + BreadcrumbList + FAQPage + ImageGallery
- **WhatsApp-first** — Form submissions open WhatsApp pre-filled. Floating WA popup with 3 direct lines
- **Core Web Vitals** — Asset caching, lazy images, no render-blocking resources
- **Auto-deploy** — Every push to `main` deploys via Cloudflare Pages in ~60s

---

## Tech Stack

| Category | Technology |
|---|---|
| Hosting | Cloudflare Pages (static, global CDN) |
| Repository | GitHub (altaherdesigns/altaherdesign) |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Fraunces (display) + Outfit (body) via Google Fonts |
| Portfolio images | Google Drive (lh3.googleusercontent.com) |
| Deployment | Auto-deploy from `main` branch push |
| Domain | altaherdesign.com (Cloudflare DNS) |
| Languages | English (LTR) + Arabic (RTL) |

---

## Contact Details

| Role | Number |
|---|---|
| General Manager | +971 50 670 5015 |
| Sales & Operations | +971 54 446 3447 |
| Marketing & Operations | +971 50 649 9697 |

**Email:** info@altaherdesign.com  
**Instagram:** [@altaher_design](https://www.instagram.com/altaher_design/)  
**Address:** Al Hail Industrial Area, Fujairah, UAE  
**Hours:** Sat–Thu 6:00 AM – 8:00 PM · Friday closed

---

## Local Development

Open any page in a browser with a local server — do **not** open `index.html` directly as a `file://` URL (absolute paths won't resolve):

```bash
# Python (built-in, no install needed)
cd altaherdesign
python3 -m http.server 8000
# Then open http://localhost:8000

# OR with Node
npx serve .
```

---

## Deployment

Auto-deploys to altaherdesign.com on every push to `main` via Cloudflare Pages.

No build step required — pure static files. Cloudflare serves directly from the repo root.

---

*Al Taher Group · Al Hail Industrial, Fujairah, UAE · Est. 1984*
