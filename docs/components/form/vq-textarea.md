# VqTextarea

A validated multi-line text input. Wraps Vuetify's `VTextarea` and binds to the parent form by `name`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |

Any other attribute goes to [`VTextarea`](https://vuetifyjs.com/api/v-textarea), including `rows`, `auto-grow`, and `counter`.

## Events and slots

There are no events of its own. Listeners and slots go to `VTextarea`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Example

```vue
<script setup>
import { VqForm, VqTextarea, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  message: string().required("Message is required").min(10, "Min 10 characters"),
});
</script>

<template>
  <VqForm id="contact" action="contact" :validation-schema="schema">
    <VqTextarea name="message" label="Message" :rows="4" counter />
    <VqSubmitBtn>Send</VqSubmitBtn>
  </VqForm>
</template>
```

## Auto-grow

```vue
<template>
  <VqTextarea name="notes" label="Notes" auto-grow :rows="2" :max-rows="10" />
</template>
```
