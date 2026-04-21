# Components

`@qnx/vuetify` provides a collection of Vue 3 components built on Vuetify 4. They cover form handling, server-driven data tables, infinite-scroll lists, and notifications — all with built-in validation, API integration, and state management.

---

## Form Components

All input components integrate with `vee-validate` and must be nested inside `VqForm` or `useVqForm`.

| Component | Description | Link |
|-----------|-------------|------|
| `VqForm` | Core form wrapper — validation, API submission, error mapping | [→ Docs](/components/form/vq-form) |
| `useVqForm` | Composable version of VqForm with `resetForm` access | [→ Docs](/components/form/use-vq-form) |
| `VqTextField` | Validated single-line text input | [→ Docs](/components/form/vq-text-field) |
| `VqTextarea` | Validated multi-line text area | [→ Docs](/components/form/vq-textarea) |
| `VqCheckbox` | Validated checkbox (boolean value) | [→ Docs](/components/form/vq-checkbox) |
| `VqAutocomplete` | Validated autocomplete with optional API item loading | [→ Docs](/components/form/vq-autocomplete) |
| `VqDatePicker` | Validated date picker (dialog or menu) | [→ Docs](/components/form/vq-date-picker) |
| `VqTimePicker` | Validated time picker (dialog or menu) | [→ Docs](/components/form/vq-time-picker) |
| `VqColorPicker` | Validated color picker (dialog or menu) | [→ Docs](/components/form/vq-color-picker) |
| `VqOtpInput` | Validated OTP input | [→ Docs](/components/form/vq-otp-input) |
| `VqFileInput` | Validated single-file input | [→ Docs](/components/form/vq-file-input) |
| `VqFileUpload` | Validated file upload (Vuetify Labs) | [→ Docs](/components/form/vq-file-upload) |
| `VqSubmitBtn` | Submit button with auto loading/disabled state | [→ Docs](/components/form/vq-submit-btn) |

---

## Data Components

Server-driven components for tables, lists, and filters with automatic pagination, sorting, and reload on filter change.

| Component | Description | Link |
|-----------|-------------|------|
| `VqDataTable` | Server-side paginated data table | [→ Docs](/components/data/vq-data-table) |
| `useVqDataTable<T>` | Type-safe wrapper for `VqDataTable` | [→ Docs](/components/data/use-vq-data-table) |
| `collectVqHeaders` | Prepends a `#` serial column to table headers | [→ Docs](/components/data/collect-vq-headers) |
| `VqSerialNo` | Serial number `<td>` cell for table rows | [→ Docs](/components/data/vq-serial-no) |
| `VqDatatableItemAction` | Row action button with confirmation dialog | [→ Docs](/components/data/vq-datatable-item-action) |
| `VqList` | Infinite-scroll list with filter integration | [→ Docs](/components/data/vq-list) |
| `useVqList<T>` | Type-safe wrapper for `VqList` | [→ Docs](/components/data/use-vq-list) |
| `VqTableFilter` | Filter form paired to a table or list by `id` | [→ Docs](/components/data/vq-table-filter) |
| `VqListLoadMoreBtn` | "Load More" button for `VqList` | [→ Docs](/components/data/vq-list-load-more-btn) |
| `MessageQueue` | Root snackbar queue — place once in `App.vue` | [→ Docs](/components/data/message-queue) |

---

## Integration Components

Exported from `@qnx/vuetify/integrations` to keep the core bundle lean.

| Component | Description | Link |
|-----------|-------------|------|
| `VqTextEditor` | TinyMCE rich text editor with form validation | [→ Docs](/components/integration/vq-text-editor) |

---

## Quick Start

### Basic Form

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
  email: string().required().email("Invalid email"),
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
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Create User</VqSubmitBtn>
  </VqForm>
</template>
```

### Data Table with Filters

```vue
<script setup>
import { VqDataTable, VqTableFilter, VqTextField, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
]);
</script>

<template>
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqDataTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <td>{{ index }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

### Infinite Scroll List

```vue
<template>
  <VqList id="posts" action="posts/list" v-slot="{ items }">
    <v-list-item v-for="post in items" :key="post.id">{{ post.title }}</v-list-item>
    <VqListLoadMoreBtn />
  </VqList>
</template>
```
