# VqCheckbox

A validated checkbox. Wraps Vuetify's `VCheckbox` and binds to the parent form by `name`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |

Any other attribute goes to [`VCheckbox`](https://vuetifyjs.com/api/v-checkbox), including `label` and `color`.

## Events and slots

There are no events of its own. Listeners and slots go to `VCheckbox`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

The value is `undefined` until the box is first toggled, then `true` or `false`.

## Required checkbox

Use both `required` and `oneOf`. Yup's `oneOf` alone accepts `undefined`, so a box nobody touched would pass.

```vue
<script setup>
import { VqForm, VqCheckbox, VqSubmitBtn } from "@qnx/vuetify";
import { boolean, object } from "yup";

const schema = object({
  agree: boolean()
    .required("You must accept the terms")
    .oneOf([true], "You must accept the terms"),
});
</script>

<template>
  <VqForm id="terms" action="terms" :validation-schema="schema">
    <VqCheckbox name="agree" label="I agree to the terms" />
    <VqSubmitBtn>Continue</VqSubmitBtn>
  </VqForm>
</template>
```

::: warning multipart forms
With `form-data`, `false` isn't sent to the server. See [multipart/form-data values](/guide/server-contract#multipart-form-data-values).
:::
