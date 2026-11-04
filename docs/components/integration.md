# Integration Components

Components that depend on a third-party package have their own entry point, so the main bundle doesn't need that package.

```typescript
import { VqTextEditor, setConfig } from "@qnx/vuetify/integrations";
```

| Export | Description |
|--------|-------------|
| [`VqTextEditor`](/components/integration/vq-text-editor) | TinyMCE rich text editor bound to the form |
| `setConfig` | Sets the default `baseUrl` for `VqTextEditor` |

The entry point's default export is a plugin that registers `VqTextEditor` globally:

```typescript
import { createApp } from "vue";
import vqVuetifyIntegrations from "@qnx/vuetify/integrations";
import App from "./App.vue";

createApp(App).use(vqVuetifyIntegrations).mount("#app");
```
