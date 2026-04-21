# Integration Components

Integration components extend `@qnx/vuetify` with third-party library support. They are exported from a separate entry point to keep the core bundle lean.

```typescript
import { VqTextEditor, setConfig } from "@qnx/vuetify/integrations";
```

---

## Available Components

| Component | Description | Link |
|-----------|-------------|------|
| `VqTextEditor` | TinyMCE rich text editor with full `vee-validate` form integration | [→ Docs](/components/integration/vq-text-editor) |

---

## How It Works

Integration components require you to install the relevant third-party package separately, then import from `/integrations` instead of the main entry point.

### VqTextEditor Setup

1. Install the TinyMCE Vue wrapper:

```bash
npm install @tinymce/tinymce-vue
```

2. Configure the base URL (once, in `main.ts` or before first use):

```typescript
import { setConfig } from "@qnx/vuetify/integrations";

setConfig({ baseUrl: "https://yourapp.com/" });
```

3. Use inside a `VqForm`:

```vue
<script setup>
import { VqForm, VqSubmitBtn } from "@qnx/vuetify";
import { VqTextEditor, setConfig } from "@qnx/vuetify/integrations";
import { object, string } from "yup";

setConfig({ baseUrl: import.meta.env.VITE_APP_URL });

const schema = object({
  content: string().required("Content is required"),
});
</script>

<template>
  <VqForm id="post" action="posts/create" method="POST" :validation-schema="schema">
    <VqTextEditor name="content" label="Content" :height="400" />
    <VqSubmitBtn>Publish</VqSubmitBtn>
  </VqForm>
</template>
```
