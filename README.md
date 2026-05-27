# altaherdesign
Al Taher Group — Official website for altaherdesign.com. Bilingual EN/AR static site covering aluminium works, carpentry, metal fabrication, powder coating, custom gates, stair railings, kitchen design &amp; pergolas. Fujairah, UAE. Est. 1984.
Al Taher Group — Official Website
![Deployed on Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)
![Website Status](https://img.shields.io/website?url=https%3A%2F%2Faltaherdesign.com)
![Language](https://img.shields.io/badge/Language-EN%20%2F%20AR-1B5E6B)
Live website: https://altaherdesign.com
Arabic version: https://altaherdesign.com/ar/
Official source code for altaherdesign.com — the website of Al Taher Group, a Fujairah-based industrial group established in 1984 specialising in aluminium works, carpentry, metal fabrication, powder coating, custom gates, stair railings, kitchen design and pergolas across the UAE.
---
About Al Taher Group
Al Taher Group operates two divisions from Al Hail Industrial Area, Fujairah, UAE:
Al Taher Carpentry, Aluminium & Metal Forming LLC — Est. 1984. Carpentry, kitchen design, aluminium works, glass works, shed & pergola construction.
DAT Metal Fabrication & Powder Coating — Metal fabrication, welding, custom metal gates, powder coating (all RAL colours), metal facade fabrication.
With over 40 years of experience, Al Taher Group serves homeowners, contractors and developers across all seven UAE emirates — Fujairah, Dubai, Sharjah, Abu Dhabi, Ajman, Ras Al Khaimah and Umm Al Quwain.
---
Services
Service	Arabic
Carpentry & Joinery	النجارة والتأثيث
Kitchen Design	تصميم المطابخ
Shed & Pergola	السقيفة والعريشة
Aluminium & Glass Work	الألومنيوم والزجاج
Metal Fabrication & Welding	اللحام وتصنيع المعادن
Metal Gates & Doors	الأبواب والبوابات المعدنية
Metal Façade Design & Fabrication	تصميم وتصنيع واجهات معدنية
Powder Coating	طلاء بودرة
---
About This Website
This repository contains the complete source code for altaherdesign.com, built as a fast, bilingual (English/Arabic) static website optimised for search engines and mobile users in the UAE.
Key Features
Bilingual — Full English and Arabic (RTL) versions with hreflang SEO tags
Mobile-first — Fully responsive across all screen sizes
SEO-optimised — Schema.org LocalBusiness structured data, semantic HTML, keyword-rich content targeting UAE search terms
WhatsApp integration — Quote form and floating contact button connecting directly to the team
Portfolio gallery — 68 project photos across 8 service categories with filter and lightbox
Zero backend — Pure static site, no server required, instant global delivery via Cloudflare CDN
Auto-deploy — Every push to `main` deploys to altaherdesign.com automatically
---
Tech Stack
Category	Technology
Hosting	Cloudflare Pages (global CDN, free tier)
Repository	GitHub
Frontend	HTML5, CSS3, Vanilla JavaScript
Fonts	Cormorant Garamond + DM Sans + Cairo (Arabic)
Deployment	Automatic from GitHub — main branch push
Domain	altaherdesign.com (Cloudflare DNS)
Languages	English (LTR) + Arabic (RTL)
---
Project Structure
```
altaher-group/
├── index.html                  # English homepage
├── ar/
│   └── index.html              # Arabic homepage (RTL)
├── assets/
│   ├── css/
│   │   └── style.css           # Gulf Heritage Luxury theme
│   ├── js/
│   │   └── main.js             # Gallery, lightbox, WhatsApp, nav
│   └── images/
│       └── portfolio/
│           ├── gates/          # Metal gates & fencing (13 photos)
│           ├── railings/       # Stair railings (21 photos)
│           ├── doors/          # Doors (9 photos)
│           ├── kitchens/       # Kitchen design (3 photos)
│           ├── glass/          # Glass works (4 photos)
│           ├── pergolas/       # Pergolas & sheds (7 photos)
│           ├── windows/        # Aluminium windows (3 photos)
│           └── projects/       # Complete villa projects (8 photos)
├── sitemap.xml                 # EN + AR sitemap with hreflang
├── robots.txt
└── _redirects                  # Cloudflare Pages rules
```
---
Local Development
Open `index.html` directly in any browser, or run a local server:
```bash
npx serve .
```
Then visit `http://localhost:3000`
---
Deployment
This site deploys automatically via Cloudflare Pages on every push to the `main` branch.
Manual deployment steps:
Push changes to `main`
Cloudflare Pages builds and deploys within ~60 seconds
Live at https://altaherdesign.com
---
Contact
Al Taher Group
Al Hail Industrial Area, Fujairah, UAE
Role	Phone
General Manager	+971 50 670 5015
Sales & Operations	+971 54 446 3447
Marketing & Operations	+971 50 649 9697
Email: altaher.info@gmail.com
Instagram: @altaher_design
Website: altaherdesign.com
---
Al Taher Group · Fujairah, UAE · Est. 1984 · Aluminium · Carpentry · Metal Fabrication · Powder Coating
