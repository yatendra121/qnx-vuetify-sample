# VqTextEditor

A TinyMCE rich text editor bound to the parent form by `name`. It's exported from `@qnx/vuetify/integrations`.

## Setup

TinyMCE isn't bundled. The component loads its script at runtime from `baseUrl` + `filesPath`.

```bash
pnpm add @tinymce/tinymce-vue
```

```typescript
import { setConfig } from "@qnx/vuetify/integrations";

// The trailing slash is required: the two parts are joined as they are.
setConfig({ baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.9.1/" });
```

Without this, `baseUrl` is `http://localhost:3000/`, which only works in local development if you serve TinyMCE yourself. To self-host, serve it from `<baseUrl>static/tinymce/tinymce.min.js`, the default `filesPath`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |
| `height` | `number` | `250` | Editor height in pixels. |
| `isDark` | `boolean` | `false` | Uses the dark skin and content style. |
| `baseUrl` | `string` | The `setConfig` value | Where TinyMCE is hosted, with a trailing slash. |
| `filesPath` | `string` | `"static/tinymce/tinymce.min.js"` | Path of the script, relative to `baseUrl`. |
| `label` | `string` | `""` | Has no effect in this version. |
| `placeholder` | `string` | `""` | Has no effect in this version. |

Other attributes aren't passed to the editor.

## Events and slots

None. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

The editor's HTML as a string.

## Example

```vue
<script setup>
import { VqForm, VqSubmitBtn } from "@qnx/vuetify";
import { VqTextEditor } from "@qnx/vuetify/integrations";
import { object, string } from "yup";

const schema = object({
  content: string().required("Content is required"),
});
</script>

<template>
  <VqForm id="post" action="posts" :validation-schema="schema">
    <p class="text-subtitle-2 mb-2">Content</p>
    <VqTextEditor
      name="content"
      :height="400"
      base-url="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.9.1/"
      files-path="tinymce.min.js"
    />
    <VqSubmitBtn>Publish</VqSubmitBtn>
  </VqForm>
</template>
```

## Limitations

The built-in plugin list includes `template`, which TinyMCE 7 removed. With TinyMCE 7, the browser logs a failed request for that plugin, but the editor still works.
