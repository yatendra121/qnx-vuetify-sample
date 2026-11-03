# VqOtpInput

A one-time password input. Wraps Vuetify's `VOtpInput` and binds to the parent form by `name`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |

Any other attribute goes to [`VOtpInput`](https://vuetifyjs.com/api/v-otp-input), including `length`. `base-color` defaults to `primary`.

## Events and slots

There are no events of its own. Listeners and slots go to `VOtpInput`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

A string. It starts as `""`, and the component clears any value from `initial-values` when it's created.

::: warning Errors aren't displayed
`VOtpInput` has no place for messages, so a validation failure stops the submit with nothing on screen. Show the error yourself, as in the example below.
:::

## Example with a visible error

Show the message from a small component rendered inside the form:

```vue
<!-- OtpField.vue, rendered inside VqForm -->
<script setup>
import { VqOtpInput } from "@qnx/vuetify";
import { useFieldError } from "vee-validate";

const error = useFieldError("otp");
</script>

<template>
  <VqOtpInput name="otp" :length="6" />
  <p v-if="error" class="text-error text-caption">{{ error }}</p>
</template>
```

```vue
<script setup>
import { VqForm, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";
import OtpField from "./OtpField.vue";

const schema = object({
  otp: string().required("Enter the code").length(6, "The code has 6 digits"),
});
</script>

<template>
  <VqForm id="verify" action="auth/verify" :validation-schema="schema">
    <OtpField />
    <VqSubmitBtn block>Verify</VqSubmitBtn>
  </VqForm>
</template>
```
