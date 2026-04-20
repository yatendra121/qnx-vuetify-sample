# VqOtpInput

A validated OTP (one-time password) input field. Wraps Vuetify's `VOtpInput` with automatic `vee-validate` integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| *(all VOtpInput props)* | | | All Vuetify `VOtpInput` props are forwarded |

## Features

- Automatically resets the field value to `""` on mount (for fresh OTP entry)
- Uses primary color scheme by default
- Displays validation errors below the input

## Basic Example

```vue
<script setup>
import { VqForm, VqOtpInput, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  otp: string().required("OTP is required").length(6, "OTP must be 6 digits"),
});

const onSuccess = () => {
  console.log("OTP verified!");
};
</script>

<template>
  <VqForm
    id="verify-otp"
    action="auth/verify-otp"
    method="POST"
    :validation-schema="schema"
    @submited-success="onSuccess"
  >
    <p class="text-body-1 mb-4">Enter the 6-digit code sent to your email.</p>
    <VqOtpInput name="otp" length="6" />
    <VqSubmitBtn block class="mt-4">Verify</VqSubmitBtn>
  </VqForm>
</template>
```

## Two-Factor Authentication Flow

```vue
<script setup>
import { VqForm, VqOtpInput, VqSubmitBtn, useMessageInstance } from "@qnx/vuetify";
import { object, string } from "yup";

const message = useMessageInstance();

const schema = object({
  code: string().required("Code is required").length(6, "Must be 6 digits"),
});

const onSuccess = (res) => {
  message.success("Logged in successfully!");
  router.push("/dashboard");
};
</script>

<template>
  <v-card max-width="400" class="mx-auto pa-6">
    <v-card-title>Two-Factor Authentication</v-card-title>
    <v-card-text>
      <p class="mb-4">Enter the code from your authenticator app.</p>
      <VqForm
        id="2fa"
        action="auth/2fa"
        method="POST"
        :validation-schema="schema"
        @submited-success="onSuccess"
      >
        <VqOtpInput name="code" length="6" />
        <VqSubmitBtn block class="mt-6">Confirm</VqSubmitBtn>
      </VqForm>
    </v-card-text>
  </v-card>
</template>
```
