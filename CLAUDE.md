# Al Taher Group — Website Operating Brief (for Claude Code)

> **Read this top to bottom before editing.** This is the authoritative brief for the
> Al Taher Group website. Match existing patterns exactly — do **not** introduce new
> frameworks, fonts, colours, or build steps. When adding anything, copy an existing
> equivalent page/section as your template so nav, footer, schema, and styling stay identical.
>
> **Repo:** `altaherdesigns/altaherdesign` · **Live:** https://altaherdesign.ae
> **Hosting:** Cloudflare Pages, auto-deploys from `main` (no build step) · **§2 to §8 updated for the Sep 2026 redesign on 28 Sep 2026; other sections last reconciled 14 Jun 2026.**

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
| Sales & Operations | Ahmad Butt | +971 50 649 9697 | **default / quotes**; gates, fabrication, powder coating |
| Marketing & Operations | Muaaz Butt | +971 50 649 9697 | railings, pergola, general |

> Since Sep 2026 every call and WhatsApp link on the website uses **+971 50 649 9697**; the table records who handles what.

**Email:** sales@altaherdesign.ae · **Hours:** Sat–Thu, 6 AM – 9 PM (site, schema and llms.txt agree; the Google listing may say 06:00 to 20:00, owner to confirm)
**Website priorities (in order):** (1) generate quote enquiries, (2) trust/credibility, (3) showcase portfolio, (4) serve B2B + B2C.

## 2. Tech / repo
- Canonical host: **https://altaherdesign.ae** (non-www, https, trailing-slash).
- `_redirects`: forces www → non-www (301) and `/index.html` → `/` (301).
- Portfolio/blog images served from Google Drive: `https://lh3.googleusercontent.com/d/FILE_ID`.
  ⚠️ Source Drive folders MUST stay shared "Anyone with the link" or images break live.
  Also some portfolio photos hosted locally under `/assets/images/portfolio/`.

**Layout**
```
/ (index.html)  /about/  /services/  /portfolio/  /blog/  /contact/      ← EN
/ar/ + /ar/about/ /ar/services/ /ar/portfolio/ /ar/contact/              ← AR (RTL mirror)
/blog/<slug>/index.html                ← 38 articles; 17 mirrored at /ar/blog/<slug>/ (see EN-AR-ARTICLE-MAP.md)
/assets/css/main.src.css  (readable source, numbered sections) → minified to main.css
/assets/css/main.css      (ALL styling, minified) + rtl.css (Arabic only)
/assets/js/main.js        (menu, language toggle, villa hotspots and draw in, WhatsApp form, portfolio filter + lightbox, FAQ toggles)
/assets/images/logo.png   /assets/images/blog/*.webp   /assets/images/og/*.jpg
/sitemap.xml  /robots.txt  /_redirects  /_headers  /404.html  /site.webmanifest
```

## 3. Design system: "From the gate inward" (Sep 2026 redesign, match exactly)
Homeowner first, phone first. The homepage walks through one villa from the gate inward; the teal villa band is the only bold element.
- **Tokens** (`:root` in `assets/css/main.src.css`): `--teal:#2B5C62` (sampled from logo.png; primary buttons, villa band, footer) · `--teal-deep:#1F454A` (hover, pressed) · `--gold:#C9A84C` (thin rules, hotspots, focus ring on teal; never text on cream, 2.1:1) · `--cream:#F8F5F0` (page) · `--stone:#EDE6D8` (alternate sections) · `--ink:#1A1A1A` · `--ink-soft:#5C5650` · `--on-teal-soft:#CFD6D4` · `--wa:#25D366` (WhatsApp float only). `theme-color` = `#2B5C62`. The old green teal `#0d6e5e` must not come back anywhere.
- **Fonts:** Fraunces 400 (headings: upright, sentence case, one weight, SOFT axis via `font-variation-settings`), Outfit 400/500/600 (body and UI), Cairo 400/500/600 (all Arabic text). EN pages load Fraunces + Outfit; AR pages load Cairo + Outfit.
- **Type:** body 17px on phones, 18px from 1024px, line height 1.6, measure 68ch, scale about 1.25 (`--fs-*` tokens). The homepage hero H1 is the only very large type.
- **Never:** numbered eyebrows ("01 — Our Services"), numbered or bordered card grids, card shadows, italic accent words in headings, tracked ALL CAPS labels, stat bars, arrows appended to links, " · " strings, em dashes in copy, sliders, pattern backgrounds (the mashrabiya motif is retired).
- **Components:** radius 0 on photos, 2px on buttons and inputs (`--r-btn`). Primary button: teal fill, cream text. Secondary: underlined text link. Separate sections with space and the stone background.
- **Motion:** only the homepage villa drawing (draws in once, about 1.2s). Everything honours `prefers-reduced-motion`.
- **Photos:** our own work only, Drive lh3 URLs with a `=w600/=w900/=w1200/=w1600` srcset, `width` + `height` always, `loading="lazy"` except the hero (`fetchpriority="high"`), consistent aspect ratios.
- **Accessibility:** text contrast at least 4.5:1, visible focus everywhere (gold on teal), real `<button>`s for controls. axe run 28 Sep 2026: 0 violations on home, service, blog, about, services, portfolio, contact and 404 pages, EN and AR, at 390px and 1440px.
- Logo: `/assets/images/logo.png` (teal oval, gold border).

## 4. Conventions every page must follow (copy verbatim from an existing page)
- `<head>`: charset, viewport, unique `<title>` (≤~60 chars), meta description (~150–160 chars), canonical (https non-www trailing-slash), hreflang pair, OG + Twitter tags, fonts preconnect + stylesheet, favicon, `theme-color`, then `/assets/css/main.css?v=YYYYMMDD` (plus `/assets/css/rtl.css?v=…` on /ar/ pages).
- **Cache busting:** `_headers` caches `/assets/*` as immutable for a year, so every CSS or JS change must bump the `?v=` date on every page (current: `v=2026092802`). Edit `main.src.css`, re-minify to `main.css` (for example `npx clean-css-cli -O1 -o main.css main.src.css`), keep braces balanced.
- **Header** (`.site-header`): logo, nav Services / Our work / About / Blog / Contact (current page gets `aria-current="page"`), language toggle, primary button "Book a free site visit". Below 1080px the nav sits behind the "Menu" button (`.menu-toggle` opens `#site-menu`); no numbering.
- **Footer** (`.site-footer`, teal): brand blurb; phone, email, hours and address once each; Services, Areas we serve, Company (incl. Instagram, TikTok, YouTube); trade line "Contractors and fit out firms: trade enquiries" linking to `/steel-fabrication-fujairah/`; bottom line naming both licensed divisions. The WhatsApp float (`.wa-float`, WhatsApp green) sits inside `<footer>`.
- **CTA wording everywhere:** "Book a free site visit", opening WhatsApp prefilled "I would like to book a free site visit" (AR: "أرغب في حجز زيارة موقع مجانية").
- **Service pages:** full width photo (`figure.page-photo`, `fetchpriority="high"`), then `.article-header` with a kicker placing the service in the villa ("Part of the entrance"), then the existing content and the same CTA.
- `<script src="/assets/js/main.js?v=…" defer></script>` before `</body>`. Content never depends on JS (all six villa panels are in the HTML, toggled with `hidden`).
- WhatsApp links: `https://wa.me/971506499697?text=…` (URL encoded) + `target="_blank" rel="noopener nofollow"`.
- Images: always `width`, `height`, `alt`, `loading="lazy"` (except the hero).

**Schema (JSON-LD):** site-wide `LocalBusiness`+`GeneralContractor` node `@id https://altaherdesign.ae/#business` with `sameAs` (Instagram + TikTok + YouTube). Blog posts use a `@graph`: `BreadcrumbList` + `Article` + `FAQPage`; `Article.publisher` → `{"@id":"https://altaherdesign.ae/#business"}`.

## 5. Blog — the primary SEO engine
No Fujairah competitor has a functioning website, so well-targeted articles rank fast.
**38 English articles** (28 Sep 2026); 17 have Arabic mirrors at `/ar/blog/<same slug>/`.
Track mirrors in `EN-AR-ARTICLE-MAP.md` (repo root). English is the source of truth.

**House style:** honest, specific, Fujairah-grounded, from real workshop experience. Each post:
article header (category, date, read time, byline, H1, excerpt) → intro → H2 sections → ≥1 comparison `<table>` → 1 `<blockquote>`
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
Currently **113 URLs** (28 Sep 2026). Resubmit in GSC after any page-set change.

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
11. **Copy rules (owner's standing instructions):** no em dashes and no hyphens as connectors in copy; no external links in content; never name a competitor; never claim certified welders; Kalba and Khorfakkan belong to Sharjah, so write "the east coast towns of Kalba and Khorfakkan", never inside a seven emirates list and never as part of Fujairah; uPVC is complementary to aluminium; every photo is presented as our own work; laser cutting goes to partners (CNC cutting is in house); double glazing only; CAD designs on request.
12. Bump the `?v=` asset version on every CSS or JS change (see §4).

## 8. CURRENT STATE (28 Sep 2026): the "From the gate inward" redesign
- Visual and UX redesign for homeowners (brief: `claude/WEBSITE-REDESIGN-HOMEOWNER-BRIEF-2026-09.md` in the claude.ai project). Homepage: A photo hero, B teal villa band (inline SVG, six gold hotspot buttons, six panels), C one workshop, D finished villas, E four steps, F Google reviews + WhatsApp form, G teal footer. Mirrored on /ar/ (the drawing is never flipped).
- New shared header and footer on every page; service pages got photo heroes and villa kickers; about, services, portfolio, contact, blog index and 404 rebuilt on the new system.
- Visible copy cleaned sitewide: em dashes, en dashes, arrows and " · " strings removed. Head tags, meta and JSON-LD untouched.
- Hours standardised to Saturday to Thursday, 6:00 AM to 9:00 PM (site, one FAQ JSON-LD in `metal-gate-designs-uae`, llms.txt).
- Three new articles published 28 Sep 2026: `marble-countertops-fujairah`, `metal-fabrication-companies-uae`, `custom-welding-fujairah` (English only so far).
- Unchanged by design: JSON-LD (except that one hours answer), titles, meta descriptions, canonicals, hreflang, OG/Twitter, robots, `_redirects`, `_headers`. The sitemap only gained the three new URLs.
- Later on 28 Sep 2026: hero photo is now `complete-project-al-taher-fujairah-02` (Drive `1kgFMq_fHjS1UPZA4UhG8Lrmk9Z9dhsNq`, the owner's pick). It is portrait, so from 900px up it sits on the far side of the hero and fades into the dark text side (mirrored on /ar/). Finished villas now show photos 12, 10 and 05 from the Drive folder "Complete projects" (18 single photos, no place or scope recorded per villa). The powder coating pages (EN and AR) gained a 16 colour RAL chart drawn from standard RAL Classic values (no copied images). Asset version bumped to `v=2026092802`.
- Photo rule (from the redesign brief: "our own work only, from Drive"): pictures from supplier blogs, colour chart sites or Google Images are not used on the site.
- Open items: workshop and curing oven photos (owner shooting them) for homepage section C and the powder coating process section; OG images still use Pexels; Arabic mirrors for 21 articles; a few older pages still place Kalba inside Fujairah ("across the emirate") and need a copy pass that also touches JSON-LD.

## 8b. June 2026 state & changelog (historical; the background treatment below was removed by the Sep 2026 redesign)
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
Phone: +971 50 649 9697
Email: sales@altaherdesign.ae
Hours: Saturday–Thursday, 6 AM – 9 PM
Web: https://altaherdesign.ae
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
- Call asset: Sales +971 50 649 9697. Location asset: Fujairah. Pin only Headline 1.

## 12. Deploy workflow
Edit files → validate (sitemap well-formed XML; no broken internal links; pages render) → commit & push to `main` → Cloudflare auto-deploys → verify on https://altaherdesign.ae → if page set changed, resubmit sitemap in GSC.

---
*When in doubt, copy an existing page/post as your template and keep every shared block
(nav, footer, schema, WhatsApp, fonts, colours) identical.*
