# Justice for Gina

Phase One static website prepared for free deployment on Cloudflare Pages and GitHub Pages.

## Free live deployment

The repository includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`. Pushes to `main` publish the static site automatically after GitHub Pages is configured to use GitHub Actions.

Expected free URL:

`https://grantgazvoda-alt.github.io/justiceforgina/`

## Deploy on Cloudflare Pages

1. Open Cloudflare and go to Workers & Pages.
2. Choose Create application, then Pages, then Connect to Git.
3. Select `Grantgazvoda-alt/justiceforgina`.
4. Set the production branch to `main`.
5. Use framework preset `None`.
6. Leave the build command blank.
7. Set the output directory to `/`.
8. Deploy.

Cloudflare will provide a free `pages.dev` address. A custom domain can be connected later through the Pages project's Custom domains panel.

## Project files

- `index.html` — public website
- `styles.css` — responsive design
- `script.js` — navigation and page effects
- `_headers` — security headers
- `.mcp.json` — AppDeploy MCP configuration

## Publishing standards

Keep public statements tied to source records, distinguish pending allegations from established findings, redact unnecessary private data, and do not encourage harassment or confrontation.

Deployment trigger: 2026-07-17T22:41:26Z
