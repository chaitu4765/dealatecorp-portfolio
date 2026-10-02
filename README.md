# Dealatecorp — React website

The existing website is now a React 19 + Vite application. The established design,
page content, client logos, campaigns, videos, responsive CSS and interactions are
preserved. The GitHub repository is connected to Vercel; pushes to `main` trigger
production deployments. No separate GitHub Actions workflow is required.

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:4173. Vite updates the browser when source files change.
Stop the server with Ctrl+C.

```sh
npm test
npm run preview
```

`preview` serves the production build on the same port; stop the development
server before using it.

`npm test` builds the site and runs API, content-preservation and simulated component
interaction checks. The migration tests compare against commit
`aec7abd1c6a04b21c29437fa196b18fa18bc244e`, so run them from the repository with its
Git history available. These tests do not replace visual browser testing.

## Source layout

- `src/main.jsx`: React entry point, route metadata and scoped stylesheets.
- `src/App.jsx`: route-to-component mapping and shared page layout.
- `src/pages/`: Home, Services, Clients, Studio, About, Portfolio and client stories.
- `src/components/`: shared navigation and state-driven SVG service network.
- `src/hooks/`: scoped animation effects with listener, observer and timer cleanup.
- `src/data/`: shared client assets and route metadata.
- `public/assets/`: original CSS, images, fonts, logos and studio videos.
- `public/clients/videos/`: client story video.
- `scripts/build-routes.mjs`: creates all 18 static route entry points after build.

Navigation uses ordinary links and each URL mounts its own React page. This keeps
existing deep links, reloads and static hosting compatible without a server router.
The two Adhithya spelling variants remain supported.

Edit `src/` or `public/`, not the generated `dist/` directory. `npm run build`
recreates `dist/`. `.openai/hosting.json` retains the separate OpenAI Site configuration.
Vercel uses `vercel.json` and the Git integration.

## Lyzr assistant on Vercel

The chat widget calls `POST /api/dealate-assistant`. Vercel deploys
`api/dealate-assistant.js` as a Node.js function alongside the static Vite build.
It shares the same handler with local development and preview servers in
`server/dealate-assistant.mjs`.

In the existing Vercel project's **Settings > Environment Variables**, add the
following variables to **Production** using the values from the deployed Lyzr
agent's **Deploy > Agent API** panel:

- `LYZR_API_KEY`: the API key; mark this variable **Sensitive**.
- `LYZR_USER_ID`: the `user_id` in the Lyzr cURL request.
- `LYZR_AGENT_ID`: the deployed `agent_id` in that request.

Add Preview variables separately only if preview deployments should use the agent.
Never use a `VITE_` prefix for credentials: those variables are embedded in browser
JavaScript. Keep keys out of Git, build commands, URLs and logs. `.env.example`
contains names only; local `.env` files and `.vercel/` are ignored.

After adding or changing variables, redeploy the latest `main` commit because
existing deployments do not receive environment changes. A static-only host cannot
serve this function. The Vercel build command is `npm run build`, with `dist` as
the output directory and a 60-second function limit.

Verify the deployed widget using **Ask us**. A POST to the endpoint should return
JSON with a nonempty `text` field. HTTP 503 means the server configuration is
missing, 502 indicates a provider failure, and 504 indicates a timeout. The key
and upstream error details are never sent to the browser. API tests use mocked
Lyzr responses; they do not establish live provider connectivity.

The repository includes all website source and browser-ready assets. Original
client media folders, backup ZIPs, dependencies, caches and generated `dist/`
output are excluded. The optional `scripts/prepare-client-media.py` utility needs
the original client media uploads to regenerate their prepared copies; normal
builds use the committed assets in `public/`. The `poc--master/` source is retained
for `scripts/import-products.mjs`.

Original design and third-party attribution remain in `ASSET-CREDITS.md` and
`public/assets/third-party-notices.txt`.

## Shared design and department flow

Services has two departments: **IT Department** and **Digital Marketing**.
The six IT capabilities and all 14 original marketing services use the same
scope → implementation → comparison → enquiry flow. Finance is not included.

- `src/data/departments.js`: department summaries, IT scopes and illustrative
  before/after workflows. Marketing capabilities reuse the existing catalog.
- `DepartmentExplorer.jsx`: accessible department tabs (Left/Right/Home/End),
  capability selection, implementation steps and controlled comparison sliders.
  The slider supports pointer dragging, a native keyboard range, endpoint buttons
  and a plain-text transcript. It resets when the capability changes.
- `DepartmentLinks.jsx`: shared department entry points on Home and About.
- `public/assets/uniform.css`: shared paper/ink/blue tokens, typography, shell,
  controls and responsive layouts, loaded after existing route-specific sheets.

Department links use `/services/#department-it` and
`/services/#department-digital`. Existing service and capability anchors remain
available. Mobile uses a compact native capability selector; diagrams size to
their content. All before/after examples are illustrative process comparisons,
not claimed client outcomes. Original media and stylesheet files are unchanged.

The preservation tests allow the new department sections and updated Services
introduction while retaining checks for established copy, every original link,
section anchor and media asset. Component tests are simulated, not visual QA.
