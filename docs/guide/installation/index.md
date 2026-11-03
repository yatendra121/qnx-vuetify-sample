# Installation

## Requirements

- Vue 3.5 and Vuetify 4.1 or later.
- An app that already has Vuetify set up. See the [Vuetify installation guide](https://vuetifyjs.com/en/getting-started/installation/).

## Install the packages

```bash
pnpm add @qnx/vuetify @qnx/composables vuetify vee-validate axios pinia
```

These are also required or optional peer dependencies, depending on what you use:

| Package | Needed for |
|---------|------------|
| `yup` | The validation schemas in these docs. Any schema vee-validate accepts also works. |
| `@tinymce/tinymce-vue` | [`VqTextEditor`](/components/integration/vq-text-editor) only. |
| `@qnx/client` (dev) | TypeScript only. The types of `@qnx/composables` 0.8.1 re-export it without declaring it, so `ApiResponse` types don't resolve without it. |

```bash
pnpm add yup
pnpm add -D @qnx/client
```

::: warning Pinia version
The installed `@qnx/vuetify` declares `pinia` 3 as a peer, so your package manager may warn if you use Pinia 4. This sample runs on Pinia 4 without problems.
:::

## Set up the app

Three things must be in place before a `Vq*` component renders: Vuetify, Pinia, and an axios instance.

```typescript
// main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import axios from "axios";
import vqVuetify from "@qnx/vuetify";
import { AxiosPlugin } from "@qnx/composables/axios";
import "vuetify/styles";
import App from "./App.vue";

// Every Vq* request goes through this instance. Relative `action` values
// resolve against its baseURL, and this is where to add auth interceptors.
AxiosPlugin.setInstance(axios.create({ baseURL: "https://api.example.com/" }));

createApp(App)
  .use(createVuetify())
  .use(createPinia())
  .use(vqVuetify) // Optional: registers every Vq* component globally
  .mount("#app");
```

Without the `vqVuetify` plugin, import each component where you use it. The plugin doesn't register `VqTextEditor`, which comes from a [separate entry point](/components/integration).

::: tip Vuetify components in your templates
The `v-*` components in these examples need the usual Vuetify setup: `vite-plugin-vuetify` with `autoImport: true`, or `components` passed to `createVuetify`.
:::

## Handle expired sessions

A `401` response calls one global handler, which you can set once at startup:

```typescript
import { setHandleUnauthenticated } from "@qnx/composables/axios";
import router from "./router";

setHandleUnauthenticated(() => {
  router.push("/login");
});
```

## Server-side rendering

When you build for SSR, Vuetify and this library have to be bundled rather than treated as externals:

```typescript
// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  ssr: {
    noExternal: ["vuetify", "@qnx/vuetify"],
  },
});
```
