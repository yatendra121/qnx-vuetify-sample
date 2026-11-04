# qnx-vuetify-sample

The reference project for [`@qnx/vuetify`](https://github.com/yatendra121/vq-vuetify). It has two parts:

- **[Playground](https://qnx-vuetify-sample.vercel.app/)** (`src/`): a page for every public export, with live props, events, and code, running against a mock API.
- **Documentation** (`docs/`): a [VitePress](https://vitepress.dev/) site with guides, API tables, and live demos.

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm

## Getting started

```bash
pnpm install
```

| Command | Description |
|---------|-------------|
| `pnpm dev` | Runs the Playground at http://localhost:3000 |
| `pnpm build` | Type-checks and builds the Playground |
| `pnpm preview` | Serves the built Playground |
| `pnpm docs:dev` | Runs the docs site |
| `pnpm docs:build` | Builds the docs site |
| `pnpm docs:serve` | Serves the built docs site |
| `pnpm docs:check` | Checks the docs' code examples and links |

## Project layout

| Path | Contents |
|------|----------|
| `src/views/Playground/` | The Playground page, its catalog of exports, and demos |
| `src/plugins/` | Vuetify, Pinia, axios, and TinyMCE setup |
| `src/components/examples/` | The live demos embedded in the docs |
| `docs/` | The documentation site |
| `docs/.vitepress/theme/mockApi.ts` | The in-browser API behind the docs' live demos |
| `scripts/check-docs.mjs` | The checker behind `pnpm docs:check` |
| `mcp/` | An MCP server that serves these docs to AI tools |

## Library version

The docs describe the installed `@qnx/vuetify` version. When you upgrade it, re-check [Limitations](docs/guide/limitations.md), since fixes will make some entries out of date.

## Contributing

See [Contributing](docs/contributing.md).
