# VqCheckbox

A validated checkbox input that stores a boolean value. Wraps Vuetify's `VCheckbox` with automatic `vee-validate` integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| *(all VCheckbox props)* | | | All Vuetify `VCheckbox` props are forwarded |

## Basic Example

```vue
<script setup>
import { VqForm, VqTextField, VqCheckbox, VqSubmitBtn } from "@qnx/vuetify";
import { object, string, boolean } from "yup";

const schema = object({
  email: string().required().email(),
  agree: boolean().oneOf([true], "You must accept the terms"),
});
</script>

<template>
  <VqForm id="register" action="auth/register" :validation-schema="schema">
    <VqTextField name="email" label="Email" />
    <VqCheckbox name="agree" label="I agree to the Terms of Service" />
    <VqSubmitBtn>Register</VqSubmitBtn>
  </VqForm>
</template>
```

## Multiple Checkboxes

```vue
<script setup>
import { VqForm, VqCheckbox, VqSubmitBtn } from "@qnx/vuetify";
import { object, boolean } from "yup";

const schema = object({
  emailNotifications: boolean(),
  smsNotifications: boolean(),
  marketingEmails: boolean(),
});
</script>

<template>
  <VqForm id="notifications" action="users/notifications" method="PUT" :validation-schema="schema">
    <p class="text-subtitle-1 mb-2">Notification Preferences</p>
    <VqCheckbox name="emailNotifications" label="Email notifications" />
    <VqCheckbox name="smsNotifications" label="SMS notifications" />
    <VqCheckbox name="marketingEmails" label="Marketing emails" />
    <VqSubmitBtn>Save Preferences</VqSubmitBtn>
  </VqForm>
</template>
```

## With Color

```vue
<VqCheckbox name="agree" label="I agree" color="primary" />
<VqCheckbox name="subscribe" label="Subscribe to newsletter" color="success" />
```
