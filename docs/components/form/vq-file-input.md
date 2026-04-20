# VqFileInput

A validated single-file selection input. Wraps Vuetify's `VFileInput` with automatic `vee-validate` integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| *(all VFileInput props)* | | | All Vuetify `VFileInput` props are forwarded |

## Features

- Single file only (`multiple` is always `false`)
- Stores the file under the key `${name}[file]` in the form state
- Must be used with `:form-data="true"` on `VqForm` to send as `multipart/form-data`

## Basic Example

```vue
<script setup>
import { VqForm, VqFileInput, VqSubmitBtn } from "@qnx/vuetify";
import { object, mixed } from "yup";

const schema = object({
  avatar: mixed().required("Please select a file"),
});
</script>

<template>
  <VqForm
    id="upload-avatar"
    action="users/avatar"
    method="POST"
    :form-data="true"
    :validation-schema="schema"
  >
    <VqFileInput name="avatar" label="Profile Picture" accept="image/*" />
    <VqSubmitBtn>Upload</VqSubmitBtn>
  </VqForm>
</template>
```

## Document Upload

```vue
<VqForm id="upload-doc" action="documents/upload" method="POST" :form-data="true">
  <VqFileInput
    name="document"
    label="Upload Document"
    accept=".pdf,.doc,.docx"
    prepend-icon="mdi-file-document"
  />
  <VqSubmitBtn>Upload Document</VqSubmitBtn>
</VqForm>
```

## Full Profile Form with Avatar

```vue
<script setup>
import { VqForm, VqTextField, VqFileInput, VqSubmitBtn } from "@qnx/vuetify";
import { object, string, mixed } from "yup";

const schema = object({
  name: string().required("Name is required"),
  email: string().required().email(),
  avatar: mixed().required("Please upload a profile picture"),
});
</script>

<template>
  <VqForm
    id="profile"
    action="profile/update"
    method="POST"
    :form-data="true"
    :validation-schema="schema"
  >
    <VqFileInput
      name="avatar"
      label="Profile Picture"
      accept="image/png, image/jpeg"
      show-size
    />
    <VqTextField name="name" label="Full Name" />
    <VqTextField name="email" label="Email" type="email" />
    <VqSubmitBtn>Save Profile</VqSubmitBtn>
  </VqForm>
</template>
```
