# VqFileInput

A validated single-file input. Wraps Vuetify's `VFileInput` and binds to the parent form.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Base name. The value is stored under **`name[file]`**. |

Any other attribute goes to [`VFileInput`](https://vuetifyjs.com/api/v-file-input), including `accept` and `show-size`. It's single-file by default, and for several files you can use [`VqFileUpload`](/components/form/vq-file-upload).

## Events and slots

There are no events of its own. Listeners and slots go to `VFileInput`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

A `File`, under the literal key `name[file]`. With `form-data`, the server receives a field called `avatar[file]` for `name="avatar"`.

## Validation

Key the schema on `name[file]`, in quotes:

```vue
<script setup>
import { VqForm, VqFileInput, VqSubmitBtn } from "@qnx/vuetify";
import { mixed, object } from "yup";

const schema = object({
  "avatar[file]": mixed().required("Please select a file"),
});
</script>

<template>
  <VqForm id="upload-avatar" action="users/avatar" form-data :validation-schema="schema">
    <VqFileInput name="avatar" label="Profile picture" accept="image/*" />
    <VqSubmitBtn>Upload</VqSubmitBtn>
  </VqForm>
</template>
```

::: danger A schema keyed on the plain name blocks the form
With `avatar: mixed().required()`, no field ever fills `avatar`, so validation always fails. The error also doesn't show, because no field displays `avatar`. The user sees a form that does nothing.
:::

Set `form-data` on the form, because a JSON body can't carry a file.
