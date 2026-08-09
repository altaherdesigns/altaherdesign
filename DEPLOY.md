# Deploying altaherdesign.ae

Repo: `altaherdesigns/altaherdesign` → Cloudflare Pages (auto-builds on push)

## Every release

1. **Unzip** `altaherdesign-COMPLETE.zip` over your local clone, replacing files.
   Check `index.html` lands at the repo root, not inside a nested folder.
2. **Delete anything retired.** Unzipping adds and overwrites but never removes.
   Currently: delete `all-services/` from the clone if present.
3. **GitHub Desktop** → review the changed-file list on the left.
   A normal release touches many files. If it shows only one or two, the copy failed — stop.
4. **Commit to main** → **Push origin**.
5. **Verify by hash, not by eye.** History tab → note the commit.
   Cloudflare → Pages → Deployments → newest deployment hash must match.
   "The page looks right" can be cache. A matching hash is proof.

## Dashboard settings (not in code)

| Setting | Where | Status |
|---|---|---|
| www → apex redirect | Cloudflare → Rules → Redirect Rules | hostname `www.altaherdesign.ae` → 301 → `concat("https://altaherdesign.ae", http.request.uri.path)` |
| HSTS | Cloudflare → SSL/TLS → Edge Certificates | enable |
| Always Use HTTPS | Cloudflare → SSL/TLS → Edge Certificates | enable |

## DNS records to add

**DMARC** — TXT record, name `_dmarc`:
```
v=DMARC1; p=none; rua=mailto:marketing@altaherdesign.ae; fo=1
```
Start with `p=none` (monitor only). After a few weeks of clean reports, move to
`p=quarantine`, then `p=reject`. SPF is already in place via Zoho.

## Notes

- `_redirects` sources must be root-relative paths. Cloudflare Pages silently
  ignores rules whose source is a full URL — host redirects must live in the
  dashboard.
- Static files are served before `_redirects` is consulted. A retired page will
  keep serving until the file is deleted from the repo.
