# VqTextarea

A validated multi-line text input. Wraps Vuetify's `VTextarea` with automatic `vee-validate` integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| *(all VTextarea props)* | | | All Vuetify `VTextarea` props are forwarded |

## Basic Example

```vue
<script setup>
import { VqForm, VqTextarea, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  message: string().required("Message is required").min(10, "Min 10 characters"),
});
</script>

<template>
  <VqForm id="contact" action="contact/send" :validation-schema="schema">
    <VqTextarea
      name="message"
      label="Message"
      placeholder="Write your message here..."
      rows="4"
    />
    <VqSubmitBtn>Send Message</VqSubmitBtn>
  </VqForm>
</template>
```

## With Character Counter

```vue
<VqTextarea
  name="bio"
  label="Bio"
  counter
  maxlength="200"
  rows="3"
  hint="Max 200 characters"
  persistent-hint
/>
```

## Auto-grow Textarea

```vue
<VqTextarea
  name="notes"
  label="Notes"
  auto-grow
  :rows="2"
  :max-rows="10"
/>
```

## Full Example — Blog Post Form

```vue
<script setup>
import { VqForm, VqTextField, VqTextarea, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  title: string().required("Title is required"),
  excerpt: string().required("Excerpt is required").max(160, "Max 160 characters"),
  content: string().required("Content is required").min(50, "Min 50 characters"),
});
</script>

<template>
  <VqForm id="post" action="posts/create" method="POST" :validation-schema="schema">
    <VqTextField name="title" label="Post Title" />
    <VqTextarea
      name="excerpt"
      label="Short Excerpt"
      rows="2"
      counter
      maxlength="160"
    />
    <VqTextarea
      name="content"
      label="Full Content"
      auto-grow
      :rows="6"
    />
    <VqSubmitBtn>Publish Post</VqSubmitBtn>
  </VqForm>
</template>
```
