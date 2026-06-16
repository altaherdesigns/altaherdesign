# Al Taher Group — Website Operating Brief (for Claude Code)

> **Read this top to bottom before editing.** This is the authoritative brief for the
> Al Taher Group website. Match existing patterns exactly — do **not** introduce new
> frameworks, fonts, colours, or build steps. When adding anything, copy an existing
> equivalent page/section as your template so nav, footer, schema, and styling stay identical.
>
> **Repo:** `altaherdesigns/altaherdesign` · **Live:** https://altaherdesign.com
> **Hosting:** Cloudflare Pages, auto-deploys from `main` (no build step) · **This file last reconciled against the live repo: 14 Jun 2026.**

---

## 0. What this site is
Hand-built **static** site — plain HTML + one CSS file + one JS file. No framework, no
bundler, no backend. Edit HTML directly; push to `main`; Cloudflare rebuilds in ~30s.
Lead capture is **WhatsApp deep links** (`wa.me/...`), not forms-to-server.

## 1. Business context
**Al Taher Group** — fabrication & fit-out, est. **1984**, Al Hail Industrial Area, Fujairah, UAE.
Family-run. Serves all **7 emirates**. B2B (contractors, developers, fit-out, F&B/hospitality)
and B2C (villa homeowners).

**Two licensed divisions:**
- **Al Taher Carpentry, Aluminium & Metal Forming LLC** — carpentry, joinery, kitchens, aluminium windows/doors, glass, pergolas, facade/cladding.
- **DAT Metal Fabrication** — gates, railings, structural welding, custom fabrication, in-house powder coating.

> ⚠️ Trade-licence name is **"DAT Metal Fabrication"** — NOT "DAT Metal Fabrication & Powder
> Coating" — in headings/legal/entity references. "Powder coating" may appear in body copy as a
> *service*, never as part of the entity name. (This was corrected site-wide in Jun 2026.)

**Services:** metal fabrication, aluminium works, **aluminium AND uPVC** windows & doors,
carpentry/joinery, interior fit-out, kitchen design, stair railings, custom gates, glass works,
pergola/shed, powder coating, mall kiosks/retail counters.

> ⚠️ The business sells **both aluminium and uPVC**. Any comparison content must stay
> **balanced** — never disparage uPVC. (The `aluminium-vs-upvc-windows-uae` article is already balanced; keep it that way.)

**Contacts / departments (LOCKED — never alter numbers):**
| Role | Name | Phone | WhatsApp routing |
|---|---|---|---|
| Owner / GM | Abdulrehman Butt | +971 50 670 5015 | contractors; kitchen, aluminium, pergola, facade |
| Sales & Operations | Ahmad Butt | +971 54 446 3447 | **default / quotes**; gates, fabrication, powder coating |
| Marketing & Operations | Muaaz Butt | +971 50 649 9697 | railings, pergola, general |

**Email:** info@altaherdesign.com · **Hours:** Sat–Thu, 6 AM – 8 PM
**Website priorities (in order):** (1) generate quote enquiries, (2) trust/credibility, (3) showcase portfolio, (4) serve B2B + B2C.

## 2. Tech / repo
- Canonical host: **https://altaherdesign.com** (non-www, https, trailing-slash).
- `_redirects`: forces www → non-www (301) and `/index.html` → `/` (301).
- Portfolio/blog images served from Google Drive: `https://lh3.googleusercontent.com/d/FILE_ID`.
  ⚠️ Source Drive folders MUST stay shared "Anyone with the link" or images break live.
  Also some portfolio photos hosted locally under `/assets/images/portfolio/`.

**Layout**
```
/ (index.html)  /about/  /services/  /portfolio/  /blog/  /contact/      ← EN
/ar/ + /ar/about/ /ar/services/ /ar/portfolio/ /ar/contact/              ← AR (RTL mirror)
/blog/<slug>/index.html                                                  ← 5 articles
/assets/css/main.css   (~2400 lines, ALL styling)
/assets/js/main.js     (nav toggle, lang toggle, WhatsApp popup, reveal, quote-form router)
/assets/images/logo.svg
/sitemap.xml  /robots.txt  /_redirects  /_headers  /404.html  /site.webmanifest
```

## 3. Design system — "Gulf Heritage Luxury" (match exactly)
- Colours (CSS vars in `main.css :root`): `--teal:#0d6e5e` · `--gold:#c9a84c` · `--off-white:#f8f5f0` · `--cream:#ede6d8` · `--paper:#fff` · `--dark:#1a1a1a` (full ramp already defined). `theme-color` = `#0d6e5e`.
- Fonts: **Fraunces** (display/headings), **Outfit** (body/UI), **Noto Naskh Arabic** (AR). Google Fonts.
- Logo: teal oval, gold border, wordmark "Al Taher Group", strapline **"Since 1984"**. `/assets/images/logo.svg`.
- Motif: **mashrabiya** geometric SVG (diamond + circle + cross) used in hero/section pattern backgrounds.

## 4. Conventions every page must follow (copy verbatim from an existing page)
- `<head>`: charset, viewport, unique `<title>` (≤~60 chars), meta description (~150–160 chars), `<link rel="canonical">` (https non-www trailing-slash), OG tags, fonts preconnect+stylesheet, favicon, `theme-color`, `/assets/css/main.css`.
- **Nav** (`.nav`): logo + Home / About / Services / Portfolio / Blog / Contact + EN/عربي toggle + "Free Quote" WhatsApp button + hamburger. Mark current page `class="active" aria-current="page"`.
- **Mobile nav** (`.mobile-nav`): same links, numbered 01–06.
- **Footer** (`.footer`): brand blurb, Services list, Company list (incl. **Instagram + TikTok** social links), Contact (Sales/GM/Email), © 2026.
- **WhatsApp float** (`.wa-float`): button + popup (Sales + GM cards).
- `<script src="/assets/js/main.js" defer></script>` before `</body>`.
- WhatsApp links: correct department number + URL-encoded prefilled text + `target="_blank" rel="noopener"`.
- Images: always `width`, `height`, `alt`, `loading="lazy"`.

**Schema (JSON-LD):** site-wide `LocalBusiness`+`GeneralContractor` node `@id https://altaherdesign.com/#business` with `sameAs` (now Instagram + TikTok). Blog posts use a `@graph`: `BreadcrumbList` + `Article` + `FAQPage`; `Article.publisher` → `{"@id":"https://altaherdesign.com/#business"}`.

## 5. Blog — the primary SEO engine
No Fujairah competitor has a functioning website, so well-targeted articles rank fast.
**Current 5 articles:** `metal-gate-designs-uae`, `powder-coating-vs-painting-uae`,
`pergola-guide-uae`, `fitted-kitchen-cost-uae`, `aluminium-vs-upvc-windows-uae`.

**House style:** honest, specific, Fujairah-grounded, from real workshop experience. Each post:
SVG-pattern hero (not a photo) → intro → H2 sections → ≥1 comparison `<table>` → 1 `<blockquote>`
→ `.article-cta` WhatsApp box → `## Frequently Asked Questions` (3× H3) → 3–4 "Related guides" cards → footer.

**To add an article:** copy an existing post; fill `<head>` (unique title ≤~60, meta, canonical, OG image = real Drive ID); fill JSON-LD `@graph` (BreadcrumbList + Article + FAQPage matching on-page FAQ); write hero + body; add 3–4 related-guide cards (point to real posts + one `/services/#anchor`); **add a card to `/blog/index.html`** (`.blog-grid`); **add `<url>` to `sitemap.xml`** (today's lastmod, monthly, 0.6); **add an inbound related-card from 1–2 existing posts** (no orphans); validate XML + links.

Good untapped long-tail targets: `stair railing cost UAE`, `glass partition cost UAE`,
`villa fit-out cost UAE`, `louvre pergola cost UAE`, `mall kiosk design UAE`.

**Verified Drive image IDs** (confirm they still load):
| Subject | ID |
|---|---|
| Custom kitchen | `1naoiEal7UGa4KwDLo-LmDPI-mWoRU9DP` |
| Powder coating | `1gDyYksSqbTzGfIB8yV24HNv7GNgTgtOf` |
| Metal gate | `1xFF60cw4pBYd1BQXW8uOtB_LFvxPGXvR` |
| Pergola | `1tEjXry0JS8eKoy45xrmH2i5xnr1UHTLU` |
| Aluminium window (double-glazed) | `1iCAS7R8521i44IUmJe8OH-WVvY6Nmt0z` |
| Aluminium window install | `154PhYS3nUELc1gSuRjlZwKyffD3pm7ny` |

## 6. Sitemap rules
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` — **never** revert to `http://sitemaps.org`
(that bug got the sitemap rejected; it is fixed). All `<loc>` = https/non-www/trailing-slash.
Currently **16 URLs** (10 EN incl. blog index + 5 posts, + AR pages). Resubmit in GSC after any page-set change.

## 7. HARD RULES / guardrails (break these = break the site or SEO)
1. Sitemap namespace = `http://www.sitemaps.org/schemas/sitemap/0.9`. Never revert.
2. Drive image folders stay "Anyone with the link".
3. **Never** re-add `navigator.language` auto-redirect (it harms crawlers; was removed). The only redirect JS allowed is the lang-toggle that fires **only when a user has explicitly chosen** EN/AR (stored in `localStorage`).
4. **No orphan pages** — every page reachable from nav + footer + sitemap.
5. Canonical URLs https/non-www/trailing-slash everywhere (tags, sitemap, internal links).
6. Entity name "DAT Metal Fabrication" (not "…& Powder Coating") in headings/legal.
7. uPVC content stays balanced — both aluminium and uPVC are sold.
8. **NAP consistency** is critical — use the §9 block verbatim across site + every directory.
9. Offline/PDF docs must base64-embed images, not Drive-link.
10. No frameworks / build steps. Static, hand-built.

## 8. CURRENT STATE & this-session changelog (14 Jun 2026)
**State:** Fully bilingual EN/AR, responsive, RTL. 16 HTML pages. Blog = 5 articles. WhatsApp quote
flow with service-type routing + fallback. LocalBusiness schema. No orphan pages. SEO hygiene done
(title lengths, single H1, meta, `aria-current`, image dims, visible `<time>`/bylines on articles).

**Changes made this session (⚠️ may NOT be deployed yet — see §10):**
- **DAT naming** corrected to "DAT Metal Fabrication" in `index.html` (hero division) and `about/index.html` (meta description, body paragraph, `<h3>`).
- **Socials**: added **TikTok `@datinteriors`** (https://www.tiktok.com/@datinteriors) and standardised **Instagram** (https://www.instagram.com/altaher_design/) in the footer of **every** EN + AR page (404 excluded). Added TikTok to the `sameAs` array on the 4 pages that carry the full business node (`index`, `contact`, `about`, `ar/index`). `sameAs` is now `["…instagram…","…tiktok…"]`.
- **Hero-background aesthetic upgrade** (CSS only, appended to `main.css` under "AESTHETIC BACKGROUND ENHANCEMENT", ~150 lines): site-wide fixed ambient backdrop (`body::before/::after` — faint mashrabiya weave + teal/gold corner glows); richer layered `.hero` gradient + gold/teal glows + pattern fade-mask + lower-edge gold pooled light; matching lighter `.page-hero` treatment; whisper-subtle tints on `.services` / `.about-blurb` / `.portfolio-home`; warm gold glow on the dark `.why` section; RTL-mirrored glows; reduced backdrop on small screens. All low-alpha — text stays fully readable. Braces balanced (592/592).

## 9. Canonical NAP block (use verbatim everywhere)
```
Al Taher Group
Al Hail Industrial Area, Fujairah, United Arab Emirates
Phone: +971 54 446 3447
Email: info@altaherdesign.com
Hours: Saturday–Thursday, 6 AM – 8 PM
Web: https://altaherdesign.com
```

## 10. Pending / roadmap (next actions for Claude Code)
**Deploy gate (do first):** the §8 changes were made in a working copy and packaged as a zip
(`altaher-v11-bg-rectifications.zip`). Confirm whether they're in `main` yet. If Claude Code has
repo write access, the cleanest path is to **re-apply/verify these diffs directly in the repo and commit**, rather than relying on the zip. After any deploy that changes the page set, **resubmit `sitemap.xml` in Google Search Console**.

**Known discrepancies to resolve:**
- **Privacy + Terms pages**: an earlier brief listed these as existing, but they are **NOT in the
  live repo** and nothing links to them (so no broken links, but a genuine gap). Decide whether to
  create `/privacy/` and `/terms/` (then link in footer + add to sitemap). *(Recommended — most directories and trust signals expect them.)*
- **Homepage H1** is `"Crafted for your home & projects."` — it does **not** contain the brand name.
  Title is fine. Optional SEO tweak: work "Al Taher Group" into the H1 (e.g. as a kicker/line) if desired.

**Immediate / SEO:**
- Add remaining socials to footers + `sameAs` **only when real URLs are confirmed** (Facebook, YouTube, LinkedIn, Snapchat — none provided yet; do not invent URLs). IG + TikTok are done.
- Backlinks via UAE directories (YellowPages UAE, Dubizzle Business, Gulf Business Directory, UAE Free Classifieds, Fujairah Chamber of Commerce), supplier directories, trade associations. **5–10 quality, relevant links** suffice given weak local competition. Avoid paid link farms.
- 2GIS listing (one-liner: "Al Taher Group – UAE's trusted specialists in metal fabrication, aluminium works, carpentry, and interior fitout since 1984.").

**SEMrush competitor read (vs `emirfab.com`):** you rank for ~1 keyword, they ~276; **0 shared keywords**. Gap is **backlinks + domain age, not content**. Genuinely relevant opportunity keywords they rank for and you don't: **handrail (2,400)**, **welding shops near me (1,600)**, **aluminium near me (880)**. Weak-fit (skip): abu dhabi steel, steel wood furniture. Next data to pull: **Backlink Gap** (referring domains, theirs vs ours).

**GSC status (not errors — do not chase):** "Page with redirect" (http/www variants 301'ing correctly) and "Alternate page with proper canonical tag" (www → non-www canonical) are **working as intended**. "Discovered – currently not indexed" on new pages is normal queue lag for a ~3-week-old site — submit sitemap + Request Indexing on top pages, then wait.

**Profiles / accounts:** Google Business Profile (description drafted; GBP has no social-link field, so socials live in footer + `sameAs`). Zoho Books (not actioned). Client list review → then build the commercial fit-out profile (dark charcoal/gold B2B aesthetic).

**Features:** Google "Neighborhood Discovery" map widget (needs Maps API key; Fujairah coords 25.0830403, 56.2880535). Phase 2: Three.js 3D product viewer.

## 11. Google Ads (current campaign)
Goal: B2B quote enquiries. Targeting: Northern Emirates (Fujairah, Sharjah, RAK). Lead broad (all services).
Smart/Business-Profile ad caps at **5 headlines + 3 descriptions**; each asset must stand alone.
- Headlines (≤30): `Al Taher Group | Since 1984` (pin to Pos 1) · `Metal, Aluminium & Fitout` · `Get a Fast Free Quote` · `40+ Years of Experience` · `Serving All UAE Emirates`
- Descriptions (≤60): `Metal, aluminium, carpentry & fitout experts.` · `Free quotes. Trusted in the UAE since 1984.` · `Get your free quote today via WhatsApp.`
- Call asset: Sales +971 54 446 3447. Location asset: Fujairah. Pin only Headline 1.

## 12. Deploy workflow
Edit files → validate (sitemap well-formed XML; no broken internal links; pages render) → commit & push to `main` → Cloudflare auto-deploys → verify on https://altaherdesign.com → if page set changed, resubmit sitemap in GSC.

---
*When in doubt, copy an existing page/post as your template and keep every shared block
(nav, footer, schema, WhatsApp, fonts, colours) identical.*
