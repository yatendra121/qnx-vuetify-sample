# VqTimePicker

A validated time selection input displayed inside a dialog or menu. Wraps Vuetify's `VTimePicker` inside a `VTextField` trigger.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| `label` | `string` | `""` | Label for the trigger text field |
| `type` | `boolean` | `false` | `false` = VMenu, `true` = VDialog |
| *(all VTimePicker props)* | | | All Vuetify `VTimePicker` props are forwarded |

## Features

- Stores time as a 24-hour format string (e.g., `"14:30"`)
- Click the text field to open the time picker
- Supports both menu (dropdown) and dialog (modal) modes

## Basic Example

```vue
<script setup>
import { VqForm, VqTimePicker, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  meetingTime: string().required("Meeting time is required"),
});
</script>

<template>
  <VqForm id="schedule" action="meetings/create" :validation-schema="schema">
    <VqTimePicker name="meetingTime" label="Meeting Time" />
    <VqSubmitBtn>Schedule</VqSubmitBtn>
  </VqForm>
</template>
```

## Dialog Mode

```vue
<VqTimePicker name="alarmTime" label="Alarm Time" :type="true" />
```

## Date + Time Combined Form

```vue
<script setup>
import { VqForm, VqDatePicker, VqTimePicker, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  title: string().required("Title is required"),
  eventDate: string().required("Date is required"),
  eventTime: string().required("Time is required"),
});
</script>

<template>
  <VqForm id="event" action="events/create" :validation-schema="schema">
    <VqTextField name="title" label="Event Title" />
    <v-row>
      <v-col cols="6">
        <VqDatePicker name="eventDate" label="Date" />
      </v-col>
      <v-col cols="6">
        <VqTimePicker name="eventTime" label="Time" />
      </v-col>
    </v-row>
    <VqSubmitBtn>Create Event</VqSubmitBtn>
  </VqForm>
</template>
```
