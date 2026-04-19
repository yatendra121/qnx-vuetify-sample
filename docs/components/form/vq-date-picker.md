# VqDatePicker

A validated date selection input displayed inside a dialog or menu. Wraps Vuetify's `VDatePicker` inside a `VTextField` trigger.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| `label` | `string` | `""` | Label for the trigger text field |
| `type` | `boolean` | `false` | `false` = VMenu, `true` = VDialog |
| `multiple` | `boolean` | `false` | Allow multiple date selection |
| *(all VDatePicker props)* | | | All Vuetify `VDatePicker` props are forwarded |

## Features

- Stores date(s) in `YYYY-MM-DD` format
- Click the text field to open the date picker
- Supports both menu (inline dropdown) and dialog (modal) display modes
- Supports single and multiple date selection

## Single Date — Menu Mode

```vue
<script setup>
import { VqForm, VqDatePicker, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  birthDate: string().required("Date of birth is required"),
});
</script>

<template>
  <VqForm id="profile" action="profile/update" method="PUT" :validation-schema="schema">
    <VqDatePicker name="birthDate" label="Date of Birth" />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

## Single Date — Dialog Mode

```vue
<VqDatePicker name="eventDate" label="Event Date" :type="true" />
```

## Multiple Dates

```vue
<VqDatePicker
  name="holidays"
  label="Select Holidays"
  :multiple="true"
  :type="true"
/>
```

## Date Range Form Example

```vue
<script setup>
import { VqForm, VqDatePicker, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  startDate: string().required("Start date is required"),
  endDate: string().required("End date is required"),
});
</script>

<template>
  <VqForm id="booking" action="bookings/create" :validation-schema="schema">
    <v-row>
      <v-col cols="6">
        <VqDatePicker name="startDate" label="Check-in Date" />
      </v-col>
      <v-col cols="6">
        <VqDatePicker name="endDate" label="Check-out Date" />
      </v-col>
    </v-row>
    <VqSubmitBtn>Book Now</VqSubmitBtn>
  </VqForm>
</template>
```
