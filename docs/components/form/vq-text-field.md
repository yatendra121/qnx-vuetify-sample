# VqTextField

A validated single-line text input. Wraps Vuetify's `VTextField` and binds to the parent form by `name`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |

Any other attribute goes to [`VTextField`](https://vuetifyjs.com/api/v-text-field), including `label`, `type`, `variant`, and `clearable`.

## Events and slots

There are no events of its own. Listeners and slots, such as `prepend-inner` or `append`, go to `VTextField`.

Don't use `v-model`. See [Values and v-model](/guide/usage/#values-and-v-model).

## Validation

Errors show below the input after a submit. They don't update as you type: see [When validation runs](/guide/usage/#when-validation-runs).

## Login form

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  email: string().required("Email is required").email("Invalid email"),
  password: string().required("Password is required").min(8, "Min 8 characters"),
});
</script>

<template>
  <VqForm id="login" action="auth/login" :validation-schema="schema">
    <VqTextField name="email" label="Email" type="email" />
    <VqTextField name="password" label="Password" type="password" />
    <VqSubmitBtn block>Sign in</VqSubmitBtn>
  </VqForm>
</template>
```

## Vuetify props and slots

```vue
<template>
  <VqTextField
    name="search"
    label="Search"
    variant="outlined"
    density="compact"
    prepend-inner-icon="mdi-magnify"
    clearable
  >
    <template #append>
      <v-btn icon="mdi-filter" variant="text" />
    </template>
  </VqTextField>
</template>
```
