# Justice for Gina DNS and Indexing Recovery

Status date: 2026-07-30

## Current verified state

- Canonical hostname: `justiceforgina.org`
- GitHub repository: `Grantgazvoda-alt/justiceforgina`
- GitHub Pages default host: `grantgazvoda-alt.github.io`
- Production branch: `main`
- Repository `CNAME`: `justiceforgina.org`
- SEO release: merged in PR #20
- Custom domain: not yet verified as serving the production site
- Google Search Console: no connected account/property in GSC Wizard
- IndexNow: repository integration exists, but ownership cannot be verified until the live key file returns HTTP 200

## First determine the authoritative DNS provider

1. Sign in to Porkbun and open `justiceforgina.org`.
2. Record the authoritative nameservers assigned to the domain.
3. If the nameservers are Cloudflare nameservers, manage DNS only in Cloudflare.
4. If the nameservers are Porkbun nameservers, manage DNS only in Porkbun.
5. Do not keep conflicting apex or `www` records in both systems.
6. Confirm the domain is active, paid, verified, and not expired, suspended, or under transfer lock that affects DNS.

## GitHub Pages apex records

Use either the provider-supported `ALIAS`/`ANAME` method or the full GitHub Pages address set below. Do not combine an apex `ALIAS`/`ANAME` with conflicting apex `A` records.

### IPv4 A records

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### Optional IPv6 AAAA records

Use IPv6 only alongside working IPv4 records.

| Type | Name | Value |
|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

### `www` record

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `grantgazvoda-alt.github.io` |

The `www` CNAME must point to the user-level GitHub Pages host without `/justiceforgina` or any URL path.

## Records to remove or avoid

- Remove parking-page, forwarding, or old-host apex records that conflict with GitHub Pages.
- Remove any `www` A record that conflicts with the CNAME.
- Do not use wildcard records such as `*.justiceforgina.org`.
- Do not point `www` to the apex domain when GitHub Pages HTTPS validation is failing.
- If Cloudflare proxying interferes with initial GitHub certificate or domain verification, use DNS-only mode until GitHub Pages reports the domain and HTTPS certificate as healthy, then reassess proxying separately.

## GitHub Pages configuration

1. Open repository **Settings > Pages**.
2. Confirm the deployment source is GitHub Actions and the deployment workflow uses `main`.
3. Set the custom domain to `justiceforgina.org`.
4. Save the domain and allow DNS propagation.
5. Enable **Enforce HTTPS** when GitHub makes the option available.
6. Confirm the latest Pages deployment is successful.

## Required verification

Run:

```bash
dig justiceforgina.org A +noall +answer
dig justiceforgina.org AAAA +noall +answer
dig www.justiceforgina.org CNAME +noall +answer
```

The apex should resolve to the GitHub Pages address set or a provider-supported flattened alias to `grantgazvoda-alt.github.io`. The `www` record should resolve through `grantgazvoda-alt.github.io`.

Every URL below must return HTTP 200:

```text
https://justiceforgina.org/
https://justiceforgina.org/gina-gazvoda.html
https://justiceforgina.org/sitemap.xml
https://justiceforgina.org/robots.txt
https://justiceforgina.org/8f6c2eaf70bd4d9fa3940aaab0d428c7.txt
```

Also verify:

- valid TLS certificate for `justiceforgina.org`;
- one intentional redirect from `www` to the apex domain;
- no redirect loop;
- homepage canonical is `https://justiceforgina.org/`;
- sitemap URLs all use `https://justiceforgina.org/`;
- the GitHub Pages fallback is not indexed as a duplicate canonical host.

## Search-engine activation

After the canonical site is healthy:

1. Connect the Google account that owns the domain to Google Search Console/GSC Wizard.
2. Add or verify `sc-domain:justiceforgina.org`.
3. Submit `https://justiceforgina.org/sitemap.xml`.
4. Inspect the homepage, Gina page, case-status page, evidence page, press page, support page, and funding page.
5. Add those URLs to the indexing tracker.
6. Connect Bing Webmaster Tools and import the verified Google property or verify independently.
7. Confirm IndexNow ownership by opening the key-file URL.
8. Confirm successful IndexNow submissions after the next deployment.
9. Record July 30, 2026 as the SEO release date in analytics/search annotations.

## Completion definition

DNS recovery is complete only when:

- authoritative nameservers are documented;
- apex and `www` DNS are correct;
- GitHub Pages deployment is successful;
- canonical HTTPS URLs return HTTP 200;
- Search Console property is connected and sitemap submitted;
- IndexNow ownership and submission are verified;
- Issue #21 is updated with evidence and closed.
