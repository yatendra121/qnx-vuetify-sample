# VqSubmitBtn

A submit button that shows a spinner while its form's request runs. Wraps Vuetify's `VBtn`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `undefined` | Button text, when there's no default slot. Falls back to the [locale](/composables/set-vq-locale) `submit` text. |
| `form` | `string` | `undefined` | The `id` of the form to submit, for a button placed outside it. |

Any other attribute goes to [`VBtn`](https://vuetifyjs.com/api/v-btn), including `block`, `size`, and `variant`. `color` defaults to `primary`.

## Events and slots

There are no events of its own. Listeners go to `VBtn`.

| Slot | Description |
|------|-------------|
| `default` | Button content. Replaces `text`. |

`VBtn` ignores clicks while its spinner shows, but pressing Enter in a field can still submit the form again.

## Inside a form

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
</script>

<template>
  <VqForm id="create-user" action="users">
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn text="Create user" />
  </VqForm>
</template>
```

## Outside a form

The `form` prop connects the button to the form, but it doesn't show the spinner in this version.

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
</script>

<template>
  <VqForm id="my-form" action="users">
    <VqTextField name="name" label="Name" />
  </VqForm>

  <VqSubmitBtn form="my-form">Submit</VqSubmitBtn>
</template>
```

## With VBtn props

```vue
<template>
  <VqSubmitBtn block color="success" size="large" prepend-icon="mdi-check">Save</VqSubmitBtn>
</template>
```
