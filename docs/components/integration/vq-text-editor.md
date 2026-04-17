# VqTextEditor

A rich text editor powered by TinyMCE with full `vee-validate` form integration. Exported from the integrations entry point.

## Installation

Install the TinyMCE Vue wrapper:

```bash
npm install @tinymce/tinymce-vue
```

Import from the integrations entry point:

```typescript
import { VqTextEditor, setConfig } from "@qnx/vuetify/integrations";
```

## Configuration

Set the base URL before using the component (typically in `main.ts`):

```typescript
import { setConfig } from "@qnx/vuetify/integrations";

setConfig({ baseUrl: "https://yourapp.com/" });
```

| Config Key | Default | Description |
|------------|---------|-------------|
| `baseUrl` | `"http://localhost:3000/"` | Base URL where TinyMCE assets are served |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| `label` | `string` | `""` | Label displayed above the editor |
| `placeholder` | `string` | `""` | Placeholder text inside the editor |
| `height` | `number` | `250` | Editor height in pixels |
| `isDark` | `boolean` | `false` | Enables dark skin (`oxide-dark`) |
| `baseUrl` | `string` | config value | Overrides global `setConfig` base URL for this instance |
| `filesPath` | `string` | `"static/tinymce/tinymce.min.js"` | Path to `tinymce.min.js` relative to `baseUrl` |

## Basic Example

```vue
<script setup>
import { VqForm, VqSubmitBtn } from "@qnx/vuetify";
import { VqTextEditor, setConfig } from "@qnx/vuetify/integrations";
import { object, string } from "yup";

setConfig({ baseUrl: "https://yourapp.com/" });

const schema = object({
  content: string().required("Content is required"),
});
</script>

<template>
  <VqForm
    id="create-post"
    action="posts/create"
    method="POST"
    :validation-schema="schema"
  >
    <VqTextEditor
      name="content"
      label="Post Content"
      placeholder="Start writing..."
      :height="400"
    />
    <VqSubmitBtn>Publish</VqSubmitBtn>
  </VqForm>
</template>
```

## Dark Mode

```vue
<VqTextEditor
  name="content"
  label="Content"
  :height="350"
  :is-dark="true"
/>
```

## Full Blog Post Form

```vue
<script setup>
import { VqForm, VqTextField, VqTextarea, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { VqTextEditor, setConfig } from "@qnx/vuetify/integrations";
import { object, string } from "yup";

setConfig({ baseUrl: import.meta.env.VITE_APP_URL });

const schema = object({
  title: string().required("Title is required"),
  excerpt: string().required("Excerpt is required").max(160),
  category_id: string().required("Category is required"),
  content: string().required("Content is required"),
});
</script>

<template>
  <VqForm
    id="blog-post"
    action="posts/create"
    method="POST"
    :validation-schema="schema"
  >
    <VqTextField name="title" label="Title" />
    <VqAutocomplete
      name="category_id"
      label="Category"
      action="categories/list"
      item-title="name"
      item-value="id"
    />
    <VqTextarea name="excerpt" label="Short Excerpt" rows="2" counter maxlength="160" />
    <VqTextEditor
      name="content"
      label="Full Content"
      :height="500"
    />
    <VqSubmitBtn>Publish Post</VqSubmitBtn>
  </VqForm>
</template>
```

## Custom TinyMCE Script Path

If your TinyMCE assets are in a non-default location:

```vue
<VqTextEditor
  name="content"
  base-url="https://cdn.example.com/"
  files-path="vendor/tinymce/tinymce.min.js"
/>
```

## Included Plugins

`preview`, `importcss`, `searchreplace`, `autolink`, `autosave`, `save`, `directionality`, `visualblocks`, `visualchars`, `fullscreen`, `image`, `link`, `media`, `template`, `codesample`, `table`, `charmap`, `pagebreak`, `nonbreaking`, `anchor`, `insertdatetime`, `advlist`, `lists`, `wordcount`, `help`, `quickbars`, `emoticons`
