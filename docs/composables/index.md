# Composables

`@qnx/vuetify` provides composables for programmatic control of forms, tables, lists, and notifications.

---

## Available Composables

| Composable | Description | Link |
|------------|-------------|------|
| `useVqForm` | Returns a form wrapper component and `resetForm` for programmatic control | [→ Docs](/composables/use-vq-form) |
| `useVqDataTable<T>` | Type-safe wrapper for `VqDataTable` with typed item slot props | [→ Docs](/composables/use-vq-data-table) |
| `useVqList<T>` | Type-safe wrapper for `VqList` with typed items slot prop | [→ Docs](/composables/use-vq-list) |
| `collectVqHeaders` | Prepends a `#` serial column to a table headers array | [→ Docs](/composables/collect-vq-headers) |
| `useMessageInstance` | Singleton for showing success/warning/error snackbars | [→ Docs](/composables/use-message-instance) |
| `useFormFilterRepository` | Programmatically reload or reset a table/list from outside the filter form | [→ Docs](/composables/use-form-filter-repository) |
| `useListRepository` | Directly mutate list/table item data without a full reload | [→ Docs](/composables/use-list-repository) |

---

## Import

All composables are available from the main package:

```typescript
import {
  useVqForm,
  useVqDataTable,
  useVqList,
  collectVqHeaders,
  useMessageInstance,
  useFormFilterRepository,
  useListRepository,
  updateItemKeyValue,
  updateItemValue,
  deleteItemValue,
} from "@qnx/vuetify";
```

---

## Quick Examples

### useVqForm — Reset after submit

```vue
<script setup>
import { useVqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const { wrapper: UserForm, resetForm } = useVqForm({
  formId: "create-user",
  validationSchema: object({ name: string().required() }),
});
</script>

<template>
  <UserForm action="users/create" @submited-success="resetForm">
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn>Create</VqSubmitBtn>
  </UserForm>
</template>
```

### useMessageInstance — Toast notifications

```typescript
import { useMessageInstance } from "@qnx/vuetify";

const message = useMessageInstance();

message.success("Saved!");
message.warning("Check your input.");
message.error("Something went wrong.");
```

### useFormFilterRepository — Reload table externally

```typescript
import { useFormFilterRepository } from "@qnx/vuetify";

const { reload, reset } = useFormFilterRepository("users_filter");

reload(); // reload with current filters
reset();  // clear filters and reload from page 1
```

### updateItemKeyValue — Update a row without reloading

```typescript
import { updateItemKeyValue } from "@qnx/vuetify";

// After toggling a user's status:
updateItemKeyValue("users", String(userId), "status", "inactive");
```
