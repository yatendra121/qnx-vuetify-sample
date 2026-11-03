# VqTimePicker

A validated time input: a read-only text field that opens Vuetify's `VTimePicker` in a menu or dialog.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |
| `label` | `string` | `""` | Label of the text field. |
| `type` | `boolean` | `false` | `false` opens a menu, `true` opens a dialog. Read once. |

Any other attribute goes to [`VTimePicker`](https://vuetifyjs.com/api/v-time-picker), **not** the text field. The picker defaults to `format="24hr"` and `title="Select Time"`, and you can override both.

## Events and slots

There are no events of its own. Listeners and slots go to `VTimePicker`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

The string `VTimePicker` emits, such as `14:30`.

## Example

```vue
<script setup>
import { VqForm, VqTimePicker, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  meetingTime: string().required("Meeting time is required"),
});
</script>

<template>
  <VqForm id="schedule" action="meetings" :validation-schema="schema">
    <VqTimePicker name="meetingTime" label="Meeting time" />
    <VqSubmitBtn>Schedule</VqSubmitBtn>
  </VqForm>
</template>
```

## Dialog with a 12-hour clock

```vue
<template>
  <VqTimePicker name="alarm" label="Alarm" type format="ampm" />
</template>
```
