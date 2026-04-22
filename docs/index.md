---
layout: home

hero:
  name: "@qnx/vuetify"
  text: "Vue 3 Components for Vuetify 4"
  tagline: "Drop-in form inputs, server-driven tables, infinite-scroll lists, and toast notifications — with built-in validation, API integration, and zero boilerplate."
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View Components
      link: /components/
    - theme: alt
      text: Installation
      link: /guide/installation

features:
  - icon: 📋
    title: Form Components
    details: "VqForm, VqTextField, VqAutocomplete, VqDatePicker, VqTimePicker, VqColorPicker, VqOtpInput, VqFileInput and more — each bound to vee-validate automatically. No manual v-model wiring."
    link: /components/form
    linkText: View Form Components

  - icon: ✅
    title: Built-in Validation
    details: "Integrates with vee-validate and Yup out of the box. Lazy validation on blur, aggressive on error. Server-side errors are mapped back to individual fields automatically."
    link: /guide/
    linkText: Learn More

  - icon: 🚀
    title: API Submission
    details: "VqForm sends requests via axios, handles loading state, and maps server validation errors to fields — so you never write that boilerplate again."
    link: /components/form/vq-form
    linkText: View VqForm Docs

  - icon: 📊
    title: Server-side Data Table
    details: "VqDataTable wraps Vuetify's VDataTableServer with automatic pagination, sorting, and filter integration. Pair it with VqTableFilter and the table reloads on every filter change."
    link: /components/data/vq-data-table
    linkText: View VqDataTable Docs

  - icon: 📜
    title: Infinite Scroll List
    details: "VqList fetches paginated data and appends items on load. Connect VqTableFilter by shared id and filters reset the list automatically. VqListLoadMoreBtn handles the rest."
    link: /components/data/vq-list
    linkText: View VqList Docs

  - icon: 🔔
    title: Toast Notifications
    details: "Place MessageQueue once in App.vue, then call useMessageInstance().success() / .warning() / .error() from anywhere in your app. Messages queue automatically."
    link: /composables/use-message-instance
    linkText: View useMessageInstance Docs
---

<div style="max-width: 900px; margin: 60px auto; padding: 0 24px;">

## What is @qnx/vuetify?

`@qnx/vuetify` is a Vue 3 component library built on top of **Vuetify 4**. It provides ready-to-use components that eliminate the repetitive work of building forms, data tables, and lists in Vuetify apps:

- **Form inputs** that bind to `vee-validate` automatically — no `v-model`, no `useField` in your component
- **VqForm** that submits to your API via axios, shows loading state, and maps server errors to fields
- **VqDataTable** that handles server-side pagination, sorting, and re-fetches on filter change
- **VqList** with infinite scroll and filter integration
- **Toast notifications** via a simple `useMessageInstance()` composable

---

## Installation

```bash
npm install @qnx/vuetify
```

Install peer dependencies:

```bash
npm install vuetify@latest @qnx/composables vee-validate yup axios
```

---

## Quick Example

### Form with Validation

```vue
<script setup>
import { VqForm, VqTextField, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
  email: string().required().email("Invalid email"),
  role: string().required("Please select a role"),
});
</script>

<template>
  <VqForm
    id="create-user"
    action="users/create"
    method="POST"
    :validation-schema="schema"
    @submited-success="(res) => console.log('Done:', res)"
  >
    <VqTextField name="name" label="Full Name" />
    <VqTextField name="email" label="Email" type="email" />
    <VqAutocomplete name="role" label="Role" :items="['Admin', 'Editor', 'Viewer']" />
    <VqSubmitBtn>Create User</VqSubmitBtn>
  </VqForm>
</template>
```

### Data Table with Filters

```vue
<script setup>
import {
  VqDataTable, VqTableFilter, VqTextField,
  VqSerialNo, VqDatatableItemAction, collectVqHeaders
} from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqDataTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index" />
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>
          <VqDatatableItemAction
            id="users"
            :item-id="String(item.id)"
            action="users/delete"
            method="DELETE"
          />
        </td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

### Infinite Scroll List

```vue
<template>
  <VqList id="posts" action="posts/list" :page-size="15" v-slot="{ items, loading }">
    <v-list>
      <v-list-item
        v-for="post in items"
        :key="post.id"
        :title="post.title"
        :subtitle="post.author"
      />
    </v-list>
    <v-skeleton-loader v-if="loading" type="list-item@3" />
    <VqListLoadMoreBtn />
  </VqList>
</template>
```

---

## Component Overview

| Category | Components |
|----------|-----------|
| **Form Inputs** | VqTextField, VqTextarea, VqCheckbox, VqAutocomplete, VqDatePicker, VqTimePicker, VqColorPicker, VqOtpInput, VqFileInput, VqFileUpload |
| **Form Wrappers** | VqForm, useVqForm, VqSubmitBtn |
| **Data Table** | VqDataTable, useVqDataTable, VqSerialNo, collectVqHeaders, VqDatatableItemAction |
| **List** | VqList, useVqList, VqTableFilter, VqListLoadMoreBtn |
| **Notifications** | MessageQueue, useMessageInstance |
| **Rich Text** | VqTextEditor *(via `/integrations`)* |

</div>
