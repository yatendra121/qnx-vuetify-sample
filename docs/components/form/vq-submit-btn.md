# VqSubmitBtn

A submit button that automatically reflects the parent form's busy state — disabling itself and showing a loading spinner while the form is submitting.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `form` | `string` | `undefined` | Form ID — only needed when used **outside** a `VqForm` |
| *(all VBtn props)* | | | All Vuetify `VBtn` props are forwarded |

## Features

- Automatically injects `formId` from the parent `VqForm` (no prop needed when nested inside)
- Disables and shows a loading spinner during form submission
- Uses `type="submit"` for native HTML form behavior
- Accepts all standard Vuetify `VBtn` props (color, size, variant, block, etc.)

## Basic Usage — Inside VqForm

No `form` prop needed. `VqSubmitBtn` injects the form ID automatically:

```vue
<template>
  <VqForm id="create-user" action="users/create">
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn>Create User</VqSubmitBtn>
  </VqForm>
</template>
```

## Outside VqForm

Pass the `form` prop explicitly when the button is rendered outside the form:

```vue
<template>
  <VqForm id="my-form" action="users/create">
    <VqTextField name="name" label="Name" />
  </VqForm>

  <!-- Button rendered outside the form -->
  <VqSubmitBtn form="my-form">Submit</VqSubmitBtn>
</template>
```

## With Vuetify VBtn Props

```vue
<!-- Full width -->
<VqSubmitBtn block>Sign In</VqSubmitBtn>

<!-- Custom color and size -->
<VqSubmitBtn color="success" size="large">Save Changes</VqSubmitBtn>

<!-- Outlined variant -->
<VqSubmitBtn variant="outlined" color="primary">Save Draft</VqSubmitBtn>
```

## Full Login Form Example

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  email: string().required().email(),
  password: string().required().min(8),
});
</script>

<template>
  <v-card max-width="400" class="mx-auto pa-6">
    <v-card-title class="mb-4">Sign In</v-card-title>
    <VqForm
      id="login"
      action="auth/login"
      method="POST"
      :validation-schema="schema"
      @submited-success="(res) => router.push('/dashboard')"
    >
      <VqTextField name="email" label="Email" type="email" />
      <VqTextField name="password" label="Password" type="password" />
      <VqSubmitBtn block color="primary" class="mt-4">
        Sign In
      </VqSubmitBtn>
    </VqForm>
  </v-card>
</template>
```
