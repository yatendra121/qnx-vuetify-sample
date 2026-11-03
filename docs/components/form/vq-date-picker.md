# VqDatePicker

A validated date input: a read-only text field that opens Vuetify's `VDatePicker` in a menu or dialog.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |
| `label` | `string` | `""` | Label of the text field. |
| `type` | `boolean` | `false` | `false` opens a menu, `true` opens a dialog. Read once. |
| `multiple` | `boolean` | `false` | Has no effect in this version. |

Any other attribute goes to [`VDatePicker`](https://vuetifyjs.com/api/v-date-picker), **not** the text field. For example `min`, `max`, and `color` work, but `variant` and `prepend-inner-icon` don't.

## Events and slots

There are no events of its own. Listeners and slots go to `VDatePicker`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

## Value

- A picked date is stored as a `Date` at local midnight, and shown as `YYYY-MM-DD`.
- `initial-values` can be a `Date` or a string.
- The menu stays open after picking. Click outside to close it.

::: warning Time zones
- A date-only string such as `2024-03-05` is read as UTC, so it shows as `2024-03-04` west of Greenwich.
- A `Date` goes into a JSON body as UTC, so a date picked in India, for example, reaches the server as the previous day.
:::

## Example

Use Yup's `date()`, since the value is a `Date`.

```vue
<script setup>
import { VqForm, VqDatePicker, VqSubmitBtn } from "@qnx/vuetify";
import { date, object } from "yup";

const schema = object({
  birthDate: date().required("Date of birth is required"),
});
</script>

<template>
  <VqForm id="profile" action="profile" :validation-schema="schema">
    <VqDatePicker name="birthDate" label="Date of birth" />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

## Dialog with a limit

```vue
<template>
  <VqDatePicker name="eventDate" label="Event date" type min="2026-01-01" />
</template>
```
