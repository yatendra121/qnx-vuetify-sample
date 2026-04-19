# VqForm

The core form wrapper component. Manages field validation, API submission, busy state tracking, and server error mapping.

> All input components (`VqTextField`, `VqTextarea`, etc.) must be nested inside `VqForm`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique form identifier |
| `action` | `string` | required | API endpoint URL |
| `method` | `string` | `"POST"` | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| `initialValues` | `object` | `undefined` | Initial values pre-filled into form fields |
| `valuesSchema` | `object` | `undefined` | Maps nested API response keys to form field names |
| `validationSchema` | `object` | `undefined` | Yup validation schema |
| `formData` | `boolean` | `false` | Submit as `multipart/form-data` (required for file uploads) |
| `successResponseHandler` | `function` | `undefined` | Custom callback on successful API response |
| `errorResponseHandler` | `function` | `undefined` | Custom callback on API error response |

## Emits

| Event | Description |
|-------|-------------|
| `submited-success` | API returned a success response |
| `submited-error` | API returned validation/server errors |
| `submited-client-error` | Client-side vee-validate validation failed |

## Submission Flow

1. User clicks submit — vee-validate runs field-level validation
2. If invalid → emits `submited-client-error`, stops
3. If valid → sends axios request to `action`
4. On API success → emits `submited-success`
5. On API error → maps server errors to matching form fields, emits `submited-error`
6. Busy state is tracked in Pinia — `VqSubmitBtn` reflects this automatically

## Basic Example

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

const onSuccess = (res) => {
  console.log("User created:", res);
};
</script>

<template>
  <VqForm
    id="create-user"
    action="users/create"
    method="POST"
    :validation-schema="schema"
    @submited-success="onSuccess"
  >
    <VqTextField name="name" label="Full Name" />
    <VqTextField name="email" label="Email" type="email" />
    <VqSubmitBtn>Create User</VqSubmitBtn>
  </VqForm>
</template>
```

## With Initial Values

Pre-fill a form for editing an existing record:

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const props = defineProps({ user: Object });

const schema = object({
  name: string().required(),
  email: string().required().email(),
});

const onSuccess = () => {
  console.log("Updated!");
};
</script>

<template>
  <VqForm
    id="edit-user"
    :action="`users/${props.user.id}`"
    method="PUT"
    :validation-schema="schema"
    :initial-values="props.user"
    @submited-success="onSuccess"
  >
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Update</VqSubmitBtn>
  </VqForm>
</template>
```

## File Upload Form

Set `:form-data="true"` to submit as `multipart/form-data`:

```vue
<template>
  <VqForm
    id="upload-avatar"
    action="users/upload-avatar"
    method="POST"
    :form-data="true"
    @submited-success="onSuccess"
  >
    <VqFileInput name="avatar" label="Profile Picture" accept="image/*" />
    <VqSubmitBtn>Upload</VqSubmitBtn>
  </VqForm>
</template>
```

## Handling Errors

```vue
<template>
  <VqForm
    id="create-user"
    action="users/create"
    @submited-success="onSuccess"
    @submited-error="onServerError"
    @submited-client-error="onValidationError"
  >
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn>Submit</VqSubmitBtn>
  </VqForm>
</template>

<script setup>
const onSuccess = (res) => console.log("Success:", res);
const onServerError = (err) => console.log("Server error:", err);
const onValidationError = (err) => console.log("Validation failed:", err);
</script>
```
