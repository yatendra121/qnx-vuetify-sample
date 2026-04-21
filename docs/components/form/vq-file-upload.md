# VqFileUpload

A validated file upload input using Vuetify Labs' `VFileUpload`. Provides a drag-and-drop upload area with `vee-validate` integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| *(all VFileUpload props)* | | | All Vuetify Labs `VFileUpload` props are forwarded |

> **Note:** `VFileUpload` is part of Vuetify Labs and must be imported from `vuetify/labs/VFileUpload`.

## Basic Example

```vue
<script setup>
import { VqForm, VqFileUpload, VqSubmitBtn } from "@qnx/vuetify";
import { object, mixed } from "yup";

const schema = object({
  file: mixed().required("Please select a file"),
});
</script>

<template>
  <VqForm
    id="upload"
    action="files/upload"
    method="POST"
    :form-data="true"
    :validation-schema="schema"
  >
    <VqFileUpload name="file" />
    <VqSubmitBtn>Upload</VqSubmitBtn>
  </VqForm>
</template>
```

## With Accept Filter

```vue
<VqFileUpload name="image" accept="image/*" />
<VqFileUpload name="pdf" accept="application/pdf" />
```

## Multiple Files

```vue
<VqForm id="bulk-upload" action="files/bulk" :form-data="true">
  <VqFileUpload name="attachments" multiple />
  <VqSubmitBtn>Upload All</VqSubmitBtn>
</VqForm>
```
