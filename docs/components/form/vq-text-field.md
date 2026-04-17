# VqTextField

A validated single-line text input. Wraps Vuetify's `VTextField` with automatic `vee-validate` integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| *(all VTextField props)* | | | All Vuetify `VTextField` props are forwarded |

## Validation Behavior

- **Lazy mode** (default): validates on `blur` and `change` only
- **Aggressive mode**: once an error appears, validates on every `input` event for instant feedback
- Error messages are displayed automatically below the input

## Basic Example

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  username: string().required("Username is required").min(3, "Min 3 characters"),
});
</script>

<template>
  <VqForm id="form" action="auth/register" :validation-schema="schema">
    <VqTextField name="username" label="Username" placeholder="Enter username" />
    <VqSubmitBtn>Register</VqSubmitBtn>
  </VqForm>
</template>
```

## Password Field

```vue
<VqTextField name="password" label="Password" type="password" />
```

## With Hint and Prefix

```vue
<VqTextField
  name="price"
  label="Price"
  prefix="$"
  hint="Enter price in USD"
  persistent-hint
/>
```

## With Custom Styling

```vue
<VqTextField
  name="search"
  label="Search"
  variant="outlined"
  density="compact"
  prepend-inner-icon="mdi-magnify"
  clearable
/>
```

## Full Login Form Example

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  email: string().required("Email is required").email("Invalid email format"),
  password: string().required("Password is required").min(8, "Min 8 characters"),
});

const onSuccess = (res) => {
  localStorage.setItem("token", res.data.token);
};
</script>

<template>
  <VqForm
    id="login"
    action="auth/login"
    method="POST"
    :validation-schema="schema"
    @submited-success="onSuccess"
  >
    <VqTextField
      name="email"
      label="Email"
      type="email"
      placeholder="you@example.com"
      variant="outlined"
    />
    <VqTextField
      name="password"
      label="Password"
      type="password"
      variant="outlined"
    />
    <VqSubmitBtn block>Sign In</VqSubmitBtn>
  </VqForm>
</template>
```
