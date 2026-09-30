# Dealatecorp — React website

The existing website is now a React 19 + Vite application. The established design,
page content, client logos, campaigns, videos, responsive CSS and interactions are
preserved. No CI/CD or GitHub Actions workflows are configured.

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

`npm test` builds the site and runs 17 content-preservation and simulated component
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
- `scripts/build-routes.mjs`: creates all eight static route entry points after build.

Navigation uses ordinary links and each URL mounts its own React page. This keeps
existing deep links, reloads and static hosting compatible without a server router.
The two Adhithya spelling variants remain supported.

Edit `src/` or `public/`, not the generated `dist/` directory. `npm run build`
recreates `dist/`. `.openai/hosting.json` retains the existing Site configuration;
publishing is manual, not automatic.

Original design and third-party attribution remain in `ASSET-CREDITS.md` and
`public/assets/third-party-notices.txt`.
