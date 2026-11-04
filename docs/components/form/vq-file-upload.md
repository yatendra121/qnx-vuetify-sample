# VqFileUpload

A drag-and-drop file upload. Wraps Vuetify's `VFileUpload` and binds to the parent form by `name`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |

Any other attribute goes to [`VFileUpload`](https://vuetifyjs.com/api/v-file-upload), including `multiple` and `accept`.

`VFileUpload` is a regular Vuetify component from version 4.1, so no Labs import is needed.

## Events and slots

There are no events of its own. Listeners and slots go to `VFileUpload`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

A `File`, or a `File[]` with `multiple`. Unlike `VqFileInput`, it's stored under `name` itself.

## Example

Set `form-data` on the form, because a JSON body can't carry a file.

```vue
<script setup>
import { VqForm, VqFileUpload, VqSubmitBtn } from "@qnx/vuetify";
import { mixed, object } from "yup";

const schema = object({
  file: mixed().required("Please select a file"),
});
</script>

<template>
  <VqForm id="upload" action="files" form-data :validation-schema="schema">
    <VqFileUpload name="file" />
    <VqSubmitBtn>Upload</VqSubmitBtn>
  </VqForm>
</template>
```

## Multiple files

```vue
<template>
  <VqFileUpload name="attachments" multiple accept="application/pdf" />
</template>
```
