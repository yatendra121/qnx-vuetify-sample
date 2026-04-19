# VqColorPicker

A validated color selection input displayed inside a dialog or menu. Wraps Vuetify's `VColorPicker` inside a `VTextField` trigger.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| `label` | `string` | `""` | Label for the trigger text field |
| `type` | `boolean` | `false` | `false` = VMenu, `true` = VDialog |
| *(all VColorPicker props)* | | | All Vuetify `VColorPicker` props are forwarded |

## Features

- Stores selected color as a string or object
- Click the text field to open the color picker
- Supports both menu (dropdown) and dialog (modal) modes

## Basic Example

```vue
<script setup>
import { VqForm, VqColorPicker, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  brandColor: string().required("Brand color is required"),
});
</script>

<template>
  <VqForm id="branding" action="settings/branding" method="PUT" :validation-schema="schema">
    <VqColorPicker name="brandColor" label="Brand Color" />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

## Dialog Mode

```vue
<VqColorPicker name="themeColor" label="Theme Color" :type="true" />
```

## Theme Settings Form

```vue
<script setup>
import { VqForm, VqColorPicker, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  siteName: string().required(),
  primaryColor: string().required("Primary color is required"),
  secondaryColor: string().required("Secondary color is required"),
});
</script>

<template>
  <VqForm id="theme" action="settings/theme" method="PUT" :validation-schema="schema">
    <VqTextField name="siteName" label="Site Name" />
    <v-row>
      <v-col cols="6">
        <VqColorPicker name="primaryColor" label="Primary Color" />
      </v-col>
      <v-col cols="6">
        <VqColorPicker name="secondaryColor" label="Secondary Color" />
      </v-col>
    </v-row>
    <VqSubmitBtn>Save Theme</VqSubmitBtn>
  </VqForm>
</template>
```
