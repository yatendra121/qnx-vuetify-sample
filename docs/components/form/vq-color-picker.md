# VqColorPicker

A validated color input: a read-only text field that opens Vuetify's `VColorPicker` in a menu or dialog.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |
| `label` | `string` | `""` | Label of the text field. |
| `type` | `boolean` | `false` | `false` opens a menu, `true` opens a dialog. Read once. |

Any other attribute goes to [`VColorPicker`](https://vuetifyjs.com/api/v-color-picker), **not** the text field.

## Events and slots

There are no events of its own. Listeners and slots go to `VColorPicker`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

A hex string such as `#FF0000`. `VColorPicker` returns values in the format it's given, so an object initial value such as `{ r, g, b }` stays an object, and the text field shows `[object Object]`. Use strings.

## Example

```vue
<script setup>
import { VqForm, VqColorPicker, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  brandColor: string().required("Brand color is required"),
});
</script>

<template>
  <VqForm id="branding" action="branding" method="PUT" :validation-schema="schema">
    <VqColorPicker name="brandColor" label="Brand color" />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

## Dialog without the canvas

```vue
<template>
  <VqColorPicker name="themeColor" label="Theme color" type hide-canvas />
</template>
```
