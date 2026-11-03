# Introduction

`@qnx/vuetify` is a set of Vue 3 components built on Vuetify 4. It removes the wiring you would otherwise repeat for forms and server-driven data:

- **Form inputs** bind to a [vee-validate](https://vee-validate.logaretm.com/v4/) form by `name`, so you don't write `v-model` or `useField`.
- **`VqForm`** validates, sends the request with axios, tracks the busy state, and puts server validation errors on the matching fields.
- **`VqDataTable` and `VqList`** fetch pages from your API, and reload when a paired `VqTableFilter` changes.

::: info Version
These docs describe the installed build, shown in the top navigation. Every behaviour here was tested against that build, and the [Limitations](/guide/limitations) page lists where it falls short.
:::

## A first form

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

const initialValues = { name: "Asha", email: "asha@example.com" };

const onSuccess = (res) => {
  console.log(res.getMessage());
};
</script>

<template>
  <VqForm
    id="create-user"
    action="users"
    :validation-schema="schema"
    :initial-values="initialValues"
    @submited-success="onSuccess"
  >
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Create</VqSubmitBtn>
  </VqForm>
</template>
```

The event name `submited-success` is spelled with one `t`. That is the library's public API.

## What's in the package

| Area | Exports |
|------|---------|
| Form | [`VqForm`](/components/form/vq-form), [`VqSubmitBtn`](/components/form/vq-submit-btn), [`useVqForm`](/composables/use-vq-form) |
| Inputs | [`VqTextField`](/components/form/vq-text-field), [`VqTextarea`](/components/form/vq-textarea), [`VqCheckbox`](/components/form/vq-checkbox), [`VqAutocomplete`](/components/form/vq-autocomplete), [`VqDatePicker`](/components/form/vq-date-picker), [`VqTimePicker`](/components/form/vq-time-picker), [`VqColorPicker`](/components/form/vq-color-picker), [`VqOtpInput`](/components/form/vq-otp-input), [`VqFileInput`](/components/form/vq-file-input), [`VqFileUpload`](/components/form/vq-file-upload) |
| Data | [`VqDataTable`](/components/data/vq-data-table), [`VqSerialNo`](/components/data/vq-serial-no), [`VqList`](/components/data/vq-list), [`VqListLoadMoreBtn`](/components/data/vq-list-load-more-btn), [`VqTableFilter`](/components/data/vq-table-filter) |
| Helpers | [`useVqDataTable`](/composables/use-vq-data-table), [`useVqList`](/composables/use-vq-list), [`collectVqHeaders`](/composables/collect-vq-headers), [`useFormFilterRepository`](/composables/use-form-filter-repository), [`updateItemKeyValue`, `updateItemValue`, `deleteItemValue`](/composables/list-item-helpers) |
| Locale | [`setVqLocale`, `resetVqLocale`](/composables/set-vq-locale) |
| `@qnx/vuetify/integrations` | [`VqTextEditor`, `setConfig`](/components/integration/vq-text-editor) |

## Try it

The [Playground](https://qnx-vuetify-sample.vercel.app/) lets you change the props of every export and watch its events, against a mock API.

## Next steps

1. [Install and set up](/guide/installation/) the library.
2. Read how [fields, values, and submission](/guide/usage/) fit together.
3. Check the [response shapes your API must return](/guide/server-contract).
