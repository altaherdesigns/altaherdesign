# Al Taher Group — Website Operating Brief (for Claude Code)

> **Read this top to bottom before editing.** This is the authoritative brief for the
> Al Taher Group website. Match existing patterns exactly — do **not** introduce new
> frameworks, fonts, colours, or build steps. When adding anything, copy an existing
> equivalent page/section as your template so nav, footer, schema, and styling stay identical.
>
> **Repo:** `altaherdesigns/altaherdesign` · **Live:** https://altaherdesign.ae
> **Hosting:** Cloudflare Pages, auto-deploys from `main` (no build step) · **§2 to §8 updated for the Sep 2026 redesign on 28 Sep 2026; §2 to §4, §7 and §8c updated 6 Oct 2026 for the technical SEO and speed pass; §2 to §7 and §8d updated 9 Oct 2026 (self-hosted photos, villa strips, prices, FAQs); other sections last reconciled 14 Jun 2026.**

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

**Email:** sales@altaherdesign.ae · **Hours:** Sat–Thu, 6 AM – 8 PM, Friday closed (owner confirmed 8 PM on 9 Oct 2026; site, schema, llms.txt and the Google listing agree)
**Website priorities (in order):** (1) generate quote enquiries, (2) trust/credibility, (3) showcase portfolio, (4) serve B2B + B2C.

## 2. Tech / repo
- Canonical host: **https://altaherdesign.ae** (non-www, https, trailing-slash).
- `_redirects`: forces www → non-www (301) and `/index.html` → `/` (301).
- **Photos are self-hosted since 9 Oct 2026** under `/assets/images/work/` (no Google Drive or lh3 URLs anywhere on the site).
  The master library is the Drive folder **Images** (`1-TO60ENFsLsLZC2WyIVVJe8JDIH4hiYN`, mirrored on the owner's PC at `D:\Al Taher\Images`), with one subfolder per category.
  Each photo key has derivatives: `<key>-600.webp` (always), `<key>-1200.webp` (when the source is at least 900 px wide), `<key>-og.jpg` (share images, 1200 px JPEG) and `<key>-160.webp` (square thumbnails for the villa chooser). Only files the HTML references are kept in the repo.
  Workflow (Claude's tools, kept outside the repo): `photo_library.py` (key → crop, EN alt, AR alt), `make_derivs.py` (builds derivatives from the Images folder), `sync_images.py` (copies exactly the referenced files into `/assets/images/work/` and removes unreferenced ones). Badge crops: Instagram carousel badges are cropped off the top 10%.

**Layout**
```
/ (index.html)  /about/  /services/  /portfolio/  /blog/  /contact/      ← EN
/ar/ + /ar/about/ /ar/services/ /ar/portfolio/ /ar/contact/              ← AR (RTL mirror)
/blog/<slug>/index.html                ← 40 articles; 19 mirrored at /ar/blog/<slug>/ (see EN-AR-ARTICLE-MAP.md)
/assets/css/main.src.css  (readable source, numbered sections) → minified to main.css
/assets/css/main.css      (ALL styling, minified; the Arabic RTL rules are section 29, there is no rtl.css any more)
/assets/fonts/            (self-hosted woff2: Fraunces, Outfit, Cairo, plus their OFL licence files)
/assets/js/main.js        (menu, language toggle, villa hotspots + photo strips, service page strips, WhatsApp form, portfolio filters with #category deep links + lightbox, GA4 events)
/assets/images/logo.png (schema, OG, favicon)   logo-120.webp (header and footer)   /assets/images/work/* (all project photos)   /assets/images/blog/*.webp   /assets/images/og/*.jpg
/8ea92d98a82d090dba818c4da4faa33e.txt   (IndexNow key file: keep it; the key is its own file name)
/sitemap.xml  /robots.txt  /_redirects  /_headers  /404.html  /site.webmanifest
```

## 3. Design system: "From the gate inward" (Sep 2026 redesign, match exactly)
Homeowner first, phone first. The homepage walks through one villa from the gate inward; the teal villa band is the only bold element.
- **Tokens** (`:root` in `assets/css/main.src.css`): `--teal:#2B5C62` (sampled from logo.png; primary buttons, villa band, footer) · `--teal-deep:#1F454A` (hover, pressed) · `--gold:#C9A84C` (thin rules, hotspots, focus ring on teal; never text on cream, 2.1:1) · `--cream:#F8F5F0` (page) · `--stone:#EDE6D8` (alternate sections) · `--ink:#1A1A1A` · `--ink-soft:#5C5650` · `--on-teal-soft:#CFD6D4` · `--wa:#25D366` (WhatsApp float only). `theme-color` = `#2B5C62`. The old green teal `#0d6e5e` must not come back anywhere.
- **Fonts (self-hosted since 6 Oct 2026; never load Google Fonts again):** Fraunces 400 (headings: upright, sentence case, one weight), Outfit 400 to 600 (body and UI), Cairo (all Arabic text). Files are in `/assets/fonts/` and declared with `@font-face` (`font-display:swap`, `unicode-range`) in section 0 of `main.src.css`. Fraunces is a static instance with SOFT 50 and WONK 0 baked in (optical size axis kept), so the `"SOFT" 40/60` values in the CSS no longer change anything; to vary softness, rebuild the woff2 with fontTools `instancer`. EN pages preload `fraunces-latin-400.woff2` and `outfit-latin.woff2`; AR pages preload `cairo-arabic.woff2`. The language toggle word is styled so EN pages never download Cairo and AR pages never download Outfit.
- **Type:** body 17px on phones, 18px from 1024px, line height 1.6, measure 68ch, scale about 1.25 (`--fs-*` tokens). The homepage hero H1 is the only very large type.
- **Never:** numbered eyebrows ("01 — Our Services"), numbered or bordered card grids, card shadows, italic accent words in headings, tracked ALL CAPS labels, stat bars, arrows appended to links, " · " strings, em dashes in copy, sliders, pattern backgrounds (the mashrabiya motif is retired).
- **Components:** radius 0 on photos, 2px on buttons and inputs (`--r-btn`). Primary button: teal fill, cream text. Secondary: underlined text link. Separate sections with space and the stone background.
- **Motion:** only the homepage villa drawing (draws in once, about 1.2s). Everything honours `prefers-reduced-motion`.
- **Photos:** our own work only, self-hosted WebP from `/assets/images/work/` with a `600w/1200w` srcset (real widths), `width` + `height` always, `loading="lazy"` except the hero (`fetchpriority="high"`), consistent aspect ratios. Because `/assets/*` is cached for a year, a changed photo gets a new file name, never the old one overwritten.
- **Photo strips** (`.strip`, swipe on phones, buttons with a mouse, plain scroller without JS): each villa panel opens on one, and every service page has one before its FAQ (`.strip--light`). Every photo has an "Ask about this one" WhatsApp link that quotes the part and photo number.
- **Accessibility:** text contrast at least 4.5:1, visible focus everywhere (gold on teal), real `<button>`s for controls. axe run 28 Sep 2026: 0 violations on home, service, blog, about, services, portfolio, contact and 404 pages, EN and AR, at 390px and 1440px.
- Logo: `/assets/images/logo.png` (teal oval, gold border; used by schema, OG and the favicon). The header and footer show `/assets/images/logo-120.webp` (120px, about 11 KB).

## 4. Conventions every page must follow (copy verbatim from an existing page)
- `<head>`: charset, viewport, unique `<title>` (≤~60 chars), meta description (120 to 158 characters: Ahrefs flags short and long ones), robots, canonical (https non-www trailing-slash), hreflang, OG + Twitter tags, icons, `theme-color`, font preloads, `/assets/css/main.css?v=…`, the Ahrefs analytics tag (async) and the GA snippet, and all JSON-LD blocks last.
- **hreflang on every page:** `en-AE`, `ar-AE` and `x-default` (pointing at the English URL) on both pages of an EN/AR pair, each returning the other. An English page without an Arabic twin lists itself as `en-AE` and `x-default`. When an Arabic mirror is added, update the English page's hreflang in the same commit.
- **OG and Twitter set on every indexable page:** `og:type`, `og:site_name` ("Al Taher Group" / "مجموعة الطاهر"), `og:url`, `og:title`, `og:description`, `og:image`, `og:locale` (`en_AE` / `ar_AE`) and `og:locale:alternate` only when a twin exists; `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. OG images are our own photos (no stock).
- **Google Analytics** (`G-QJT5EGEXTJ`): the inline snippet defines `gtag()` and injects gtag.js only after the window `load` event, so analytics never competes with the first render. Keep that snippet; do not paste Google's default async tag back in.
- **Cache busting:** `_headers` caches `/assets/*` as immutable for a year, so every CSS or JS change must bump the `?v=` date on every page (current: `v=2026100902`). Never add `Cache-Control` to the `/*` block of `_headers`: Pages joins same-name headers from overlapping rules with a comma, assets then get `max-age=0, …, max-age=31536000` and browsers obey the first value (that bug made every view re-check every asset until 6 Oct 2026). Edit `main.src.css`, re-minify to `main.css` (for example `npx clean-css-cli -O1 -o main.css main.src.css`), keep braces balanced.
- **Header** (`.site-header`): logo, nav Services / Our work / About / Blog / Contact (current page gets `aria-current="page"`), language toggle, primary button "Book a free site visit". Below 1080px the nav sits behind the "Menu" button (`.menu-toggle` opens `#site-menu`); no numbering.
- **Footer** (`.site-footer`, teal): brand blurb; phone, email, hours and address once each; Services, Areas we serve, Company (incl. Instagram, TikTok, YouTube); trade line "Contractors and fit out firms: trade enquiries" linking to `/steel-fabrication-fujairah/`; bottom line naming both licensed divisions. The WhatsApp float (`.wa-float`, WhatsApp green) sits inside `<footer>`.
- **CTA wording everywhere:** "Book a free site visit", opening WhatsApp prefilled "I would like to book a free site visit" (AR: "أرغب في حجز زيارة موقع مجانية").
- **Service pages:** full width photo (`figure.page-photo`, `fetchpriority="high"`), then `.article-header` with a kicker placing the service in the villa ("Part of the entrance"), then the existing content and the same CTA.
- `<script src="/assets/js/main.js?v=…" defer></script>` before `</body>`. Content never depends on JS (all six villa panels are in the HTML, toggled with `hidden`).
- WhatsApp links: `https://wa.me/971506499697?text=…` (URL encoded) + `target="_blank" rel="noopener nofollow"`.
- Images: always `width`, `height`, `alt`, `loading="lazy"` (except the hero).

**Schema (JSON-LD):** every page carries the `Organization` node `@id https://altaherdesign.ae/#organization`; the homepage, about, contact, service and area pages also carry the `LocalBusiness`+`GeneralContractor` node `@id https://altaherdesign.ae/#business` (with `image` and `sameAs`: Instagram + TikTok + YouTube). Blog posts use a `@graph`: `BreadcrumbList` + `Article` (with `mainEntityOfPage`) + `FAQPage`. Google does not follow an `@id` to another page, so every `{"@id":…}` reference must point at a node defined on the same page; blog posts point `publisher` at `#organization`.

## 5. Blog — the primary SEO engine
No Fujairah competitor has a functioning website, so well-targeted articles rank fast.
**43 English articles** (9 Oct 2026); 22 have Arabic mirrors at `/ar/blog/<same slug>/`.
Track mirrors in `EN-AR-ARTICLE-MAP.md` (repo root). English is the source of truth.

**House style:** honest, specific, Fujairah-grounded, from real workshop experience. Each post:
article header (category, date, read time, byline, H1, excerpt) → intro → H2 sections → ≥1 comparison `<table>` → 1 `<blockquote>`
→ `.article-cta` WhatsApp box → `## Frequently Asked Questions` (3× H3) → 3–4 "Related guides" cards → footer.

**To add an article:** copy an existing post; fill `<head>` (unique title ≤~60, meta 120 to 158 characters, canonical, OG image = `/assets/images/work/<key>-og.jpg`); fill JSON-LD `@graph` (BreadcrumbList + Article + FAQPage matching on-page FAQ); write hero + body; add 3–4 related-guide cards (point to real posts + one `/services/#anchor`); **add a card to `/blog/index.html`** (`.blog-grid`); **add `<url>` to `sitemap.xml`** (today's lastmod, monthly, 0.6); **add an inbound related-card from 1–2 existing posts** (no orphans); validate XML + links.

Good untapped long-tail targets: `stair railing cost UAE`, `glass partition cost UAE`,
`villa fit-out cost UAE`, `louvre pergola cost UAE`, `mall kiosk design UAE`.

**Images for a new article:** use a photo key that already has derivatives in `/assets/images/work/` (see §2); the share image is `<key>-og.jpg`. Pick a photo whose subject matches the article (no kitchen photos on glass pages).

## 6. Sitemap rules
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` — **never** revert to `http://sitemaps.org`
(that bug got the sitemap rejected; it is fixed). All `<loc>` = https/non-www/trailing-slash.
Currently **123 URLs** (9 Oct 2026). Resubmit in GSC after any page-set change.

## 7. HARD RULES / guardrails (break these = break the site or SEO)
1. Sitemap namespace = `http://www.sitemaps.org/schemas/sitemap/0.9`. Never revert.
2. Photos are self-hosted (§2). Never put Drive or lh3 image URLs back on the site; the Drive Images folder is only the master library.
3. **Never** re-add `navigator.language` auto-redirect (it harms crawlers; was removed). The only redirect JS allowed is the lang-toggle that fires **only when a user has explicitly chosen** EN/AR (stored in `localStorage`).
4. **No orphan pages** — every page reachable from nav + footer + sitemap.
5. Canonical URLs https/non-www/trailing-slash everywhere (tags, sitemap, internal links).
6. Entity name "DAT Metal Fabrication" (not "…& Powder Coating") in headings/legal.
7. uPVC content stays balanced — both aluminium and uPVC are sold.
8. **NAP consistency** is critical — use the §9 block verbatim across site + every directory.
9. Offline/PDF docs must base64-embed images, not Drive-link.
10. No frameworks / build steps. Static, hand-built.
11. **Copy rules (owner's standing instructions):** no em dashes and no hyphens as connectors in copy; no external links in content (one exception, approved by the owner on 5 Oct 2026: followed links to the group brand hafr.ae, Hafr / حفر, exterior metal signage for villas, parent Al Taher Group); never name a competitor; never claim certified welders; Kalba and Khorfakkan belong to Sharjah, so write "the east coast towns of Kalba and Khorfakkan", never inside a seven emirates list and never as part of Fujairah; uPVC is complementary to aluminium; every photo is presented as our own work; laser cutting goes to partners (CNC cutting is in house); double glazing only; CAD designs on request.
12. Bump the `?v=` asset version on every CSS or JS change (see §4).
13. Speed: no Google Fonts or other third party CSS, fonts stay self-hosted and preloaded, GA stays deferred to `load`, `Cache-Control` only on `/assets/*` and the feeds in `_headers`, every image keeps `width` and `height`.
14. Every page keeps the full hreflang, OG and Twitter set from §4, and every JSON-LD `@id` reference resolves on the same page.

## 8. CURRENT STATE (28 Sep 2026): the "From the gate inward" redesign
- Visual and UX redesign for homeowners (brief: `claude/WEBSITE-REDESIGN-HOMEOWNER-BRIEF-2026-09.md` in the claude.ai project). Homepage: A photo hero, B teal villa band (inline SVG, six gold hotspot buttons, six panels), C one workshop, D finished villas, E four steps, F Google reviews + WhatsApp form, G teal footer. Mirrored on /ar/ (the drawing is never flipped).
- New shared header and footer on every page; service pages got photo heroes and villa kickers; about, services, portfolio, contact, blog index and 404 rebuilt on the new system.
- Visible copy cleaned sitewide: em dashes, en dashes, arrows and " · " strings removed. Head tags, meta and JSON-LD untouched.
- Hours standardised to Saturday to Thursday, 6:00 AM to 8:00 PM (site, one FAQ JSON-LD in `metal-gate-designs-uae`, llms.txt).
- Three new articles published 28 Sep 2026: `marble-countertops-fujairah`, `metal-fabrication-companies-uae`, `custom-welding-fujairah` (English only so far).
- Unchanged by design: JSON-LD (except that one hours answer), titles, meta descriptions, canonicals, hreflang, OG/Twitter, robots, `_redirects`, `_headers`. The sitemap only gained the three new URLs.
- Later on 28 Sep 2026: hero photo is now `complete-project-al-taher-fujairah-02` (Drive `1kgFMq_fHjS1UPZA4UhG8Lrmk9Z9dhsNq`, the owner's pick). It is portrait, so from 900px up it sits on the far side of the hero and fades into the dark text side (mirrored on /ar/). Finished villas now show photos 12, 10 and 05 from the Drive folder "Complete projects" (18 single photos, no place or scope recorded per villa). The powder coating pages (EN and AR) gained a 16 colour RAL chart drawn from standard RAL Classic values (no copied images). Asset version bumped to `v=2026092802`.
- Photo rule (from the redesign brief: "our own work only, from Drive"): pictures from supplier blogs, colour chart sites or Google Images are not used on the site.
- Open items: workshop and curing oven photos (owner shooting them) for homepage section C and the powder coating process section; Arabic mirrors for 21 articles; a few older pages still place Kalba inside Fujairah ("across the emirate") and need a copy pass that also touches JSON-LD.

## 8a. 5 Oct 2026 additions
- New articles, EN + AR together: `car-parking-shade-uae` (targets car parking shade, car shade, car shed, parking shed; AR مظلات سيارات, تركيب مظلات سيارات) and `hafr-house-name-plates` (launch post for the group brand Hafr, with followed links to hafr.ae). EN pages carry proper hreflang alternates. Inbound links added from `services/pergolas-shades` (EN, AR), `pergola-guide-uae` (EN, AR) and `metal-gate-designs-uae` (EN, AR). Price line "most villa car shades AED 5,000 to 25,000" reuses the carport range already published in `pergola-guide-uae`; owner to confirm.

## 8c. 6 Oct 2026: technical SEO and speed pass
- **hreflang:** added to the 23 English pages that had none (13 with an Arabic twin, 10 English only); every page now has a complete, return linked set (§4).
- **Metadata:** `og:site_name` on all 117 indexable pages, `og:locale` where missing, `og:locale:alternate` removed from 26 pages that have no twin, missing Twitter tags added on 10 pages, homepage Twitter title and description replaced (they still carried the old tagline), last Pexels OG image (`aluminium-windows-villa-uae`) replaced with our own Drive photo, Hafr post description cut to 158 characters, Arabic blog index title rewritten.
- **Schema:** dangling `#business` references pointed at `#organization` on the 7 pages without that node, `#website` inlined on /ar/, `mainEntityOfPage` added to 4 articles, `image` added to the LocalBusiness node on 47 pages, Hafr publisher logo added.
- **Speed:** fonts self-hosted (the render blocking Google Fonts stylesheet and the font downloads from a second domain are gone from every page), `rtl.css` merged into `main.css` (one request fewer on /ar/), GA loads after `load`, header and footer logo is an 11 KB webp instead of the 25 KB png, JSON-LD moved to the end of `<head>`, empty lightbox `src` removed (invalid markup that audit tools flag), lh3 preconnect fixed.
- **Caching and security:** `_headers` rewritten (assets are cached for a year now, see §4), HSTS added, `.md` working docs sent `noindex` and `no-store`; `robots.txt` also disallows `EN-AR-ARTICLE-MAP.md`.
- **Accessibility:** empty table header cell on `car-parking-shade-uae` named "Factor"; axe clean on the 10 page sample at 390px and 1440px.
- Asset version `v=2026100601`.
- Still open: 77 meta descriptions and 14 titles still contain em dashes (written before the copy rules; the Sep redesign deliberately left head tags alone). Clean them in one pass when the owner agrees.

## 8d. 9 Oct 2026: photos, villa strips, prices, FAQs, towns
- **Photos self-hosted** (§2): every page, share image and JSON-LD image now points at `/assets/images/work/`. Misplaced photos fixed (kitchen and marble photos had been used for glass, curtain wall and bollard pages). New categories from the Images folder: bathrooms, balconies, wooden doors, glass rooms; pergola photos also serve sheds and car shades.
- **Portfolio**: 142 photos in 12 categories (gates, aluminium doors, WPC doors, wooden doors, windows, railings, pergolas and car shades, balconies, kitchens, bathrooms, interiors, complete projects); `/portfolio/#kitchens` opens on a category; on phones the categories are one swipe row.
- **Villa band**: ten parts (entrance, car shade, doors, windows, balcony, stairs, kitchen, wardrobes and TV units, bathroom, garden and roof), each panel a photo strip with "Ask about this one" WhatsApp links. The drawing gained a car shade, a balcony canopy, an interior door and a wardrobe; on desktop it stays in view while the panel scrolls. Data and markup come from `build_villa.py` (Claude's tools).
- **Starting prices from the owner (9 Oct 2026)**: gates from AED 800 per square metre; railings from AED 700 per running metre; kitchens from AED 1,300 per running metre (unit confirmed by the owner, 9 Oct 2026); pergolas and sheds from AED 250 per square metre. Shown in the villa panels, service FAQs, the cost guides (beside the market ranges) and llms.txt.
- **FAQs**: six booking questions on the homepage and new ones on contact, kitchens and joinery, uPVC and WPC doors, glass works, marble, stair railings and pergolas (EN and AR), covering what competitors answer (photos for a first estimate, drawings, complete door sets, worktops, vein matching, fire rated doors). Answers are native `<details class="faq">` inside `.faqs`, so they open without JS (the older `.qa` class is the services page answer block, a different thing). Every FAQPage JSON-LD now matches its visible text word for word.
- **Towns**: every article has one FAQ naming Kalba, Khorfakkan, Dibba, Masafi, Mirbah, Qidfa and Hatta individually (copy rules kept). The Fujairah page answer no longer places Kalba and Khorfakkan inside the emirate.
- **New articles** (EN + AR): `custom-wardrobes-fujairah`, `aluminium-glass-khorfakkan-kalba`, `gate-name-plate-planning` (with followed links to hafr.ae). The kitchens service page now targets "custom kitchens and wardrobes in Fujairah".
- **Ahrefs fixes**: `inLanguage` removed from Service nodes (the 23 schema.org errors); blog publishers point at `#organization`; weak inlinks fixed (Arabic guides linked from their service pages); short and long meta descriptions rewritten; hreflang verified reciprocal on all 123 pages; IndexNow key file added (Cloudflare Crawler Hints or the Ahrefs IndexNow setting uses it).
- **Analytics**: GA4 events `whatsapp_click`, `phone_click`, `email_click`, `villa_part_open`, `villa_photos_scroll`, `villa_photo_whatsapp`, `villa_book_whatsapp`, `photos_scroll`, `photo_whatsapp`, `portfolio_filter`, `portfolio_photo_open`, `faq_open`. Mark `whatsapp_click` and `phone_click` as key events in GA4.
- Asset version `v=2026100901`.

## 8e. 9 Oct 2026 (later): villa list, WhatsApp messages that name the product, hours
- **Hours**: closing time is **8:00 PM** (owner confirmed). Saturday to Thursday, 6:00 AM to 8:00 PM, Friday closed, in the footers, contact blocks, FAQ answers, `openingHoursSpecification` (`closes` 20:00) and llms.txt.
- **Confirmed by the owner**: TikTok is `@altaherdesign` (already on every page and in `sameAs`); kitchens from AED 1,300 **per running metre**.
- **Every WhatsApp message names the product** the visitor was looking at, so leads arrive as "Hello Al Taher Group, I need a quote for metal gates." Round button: "I need a quote for {topic}."; "Book a free site visit" buttons: "I need a quote for {topic}. I would like to book a free site visit."; "Ask about this one" under a photo: "I need a quote for {topic}. I like this one on your website ({strip}, photo n): {photo description}." Arabic: "السلام عليكم، أحتاج إلى عرض سعر للبوابات المعدنية..." Pages without one product (home, about, contact, portfolio, services and blog indexes, 404) keep the plain greeting and booking message; on the homepage main.js puts in the villa part once one is opened, on the portfolio the chosen category. The topic for each page is in Claude's `tools/wa_topics.py` (idempotent, run it after any rebuild); the villa and portfolio topics are `VL_PARTS` and `PF_TOPIC` in main.js. Generic links carry `data-wa="chat|book"`.
- **Booking forms** (home and contact): the first line names the chosen part ("I need a quote for a kitchen. I would like to book a free site visit."); the part options now have ids as values; the villa list, if any, is added as a last line; a submit also counts as `whatsapp_click` (link_text "booking form").
- **My villa list** (homepage, built by main.js, nothing without JS): a tick on each part panel ("Add to my villa list") and under each photo ("Save"). Parts on the list turn gold in the drawing and their hotspot shows a check. The list sits under the drawing on desktop (it stays in view with it) and after the open panel on phones; "Send my list on WhatsApp" sends one message with the parts in villa order and the saved photos. Kept in localStorage `atg_villa_list` for 60 days, on that device only. Every other page shows a small "My villa list (n)" link back to `/#villa-list` while the list has something in it (on the homepage only once the villa band is out of view), in the corner opposite the WhatsApp button. GA4: `villa_list_add`, `villa_list_remove`, `villa_list_clear`, `villa_list_send`, `villa_list_chip`.
- Asset version `v=2026100902`.

## 8b. June 2026 state & changelog (historical; the background treatment below was removed by the Sep 2026 redesign)
**State:** Fully bilingual EN/AR, responsive, RTL. 16 HTML pages. Blog = 5 articles. WhatsApp quote
flow with service-type routing + fallback. LocalBusiness schema. No orphan pages. SEO hygiene done
(title lengths, single H1, meta, `aria-current`, image dims, visible `<time>`/bylines on articles).

**Changes made this session (⚠️ may NOT be deployed yet — see §10):**
- **DAT naming** corrected to "DAT Metal Fabrication" in `index.html` (hero division) and `about/index.html` (meta description, body paragraph, `<h3>`).
- **Socials** (superseded: the owner confirmed TikTok **`@altaherdesign`** on 9 Oct 2026, and every page and `sameAs` uses https://www.tiktok.com/@altaherdesign): added **TikTok `@datinteriors`** (https://www.tiktok.com/@datinteriors) and standardised **Instagram** (https://www.instagram.com/altaher_design/) in the footer of **every** EN + AR page (404 excluded). Added TikTok to the `sameAs` array on the 4 pages that carry the full business node (`index`, `contact`, `about`, `ar/index`). `sameAs` is now `["…instagram…","…tiktok…"]`.
- **Hero-background aesthetic upgrade** (CSS only, appended to `main.css` under "AESTHETIC BACKGROUND ENHANCEMENT", ~150 lines): site-wide fixed ambient backdrop (`body::before/::after` — faint mashrabiya weave + teal/gold corner glows); richer layered `.hero` gradient + gold/teal glows + pattern fade-mask + lower-edge gold pooled light; matching lighter `.page-hero` treatment; whisper-subtle tints on `.services` / `.about-blurb` / `.portfolio-home`; warm gold glow on the dark `.why` section; RTL-mirrored glows; reduced backdrop on small screens. All low-alpha — text stays fully readable. Braces balanced (592/592).

## 9. Canonical NAP block (use verbatim everywhere)
```
Al Taher Group
Al Hail Industrial Area, Fujairah, United Arab Emirates
Phone: +971 50 649 9697
Email: sales@altaherdesign.ae
Hours: Saturday–Thursday, 6 AM – 8 PM
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
