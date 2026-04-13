# useFormFilterRepository

Programmatically control a `VqDataTable` or `VqList` — trigger a reload or full reset from outside the filter form.

## Parameters

| Param | Type | Description |
|-------|------|-------------|
| `formKey` | `string` | Filter form ID — always `${tableId}_filter` |

## Returns

| Method | Description |
|--------|-------------|
| `reload()` | Reloads the paired table/list with current filter values |
| `reset()` | Clears filter values and reloads from page 1 |

## When to Use

- Add a standalone "Refresh" button outside the filter form
- Add a "Clear Filters" button that resets and reloads
- Trigger a table reload after an external action (e.g., bulk import, export)

## Basic Example

```vue
<script setup>
import { useFormFilterRepository } from "@qnx/vuetify";

// "users" is the shared id of VqTableFilter + VqDataTable
const { reload, reset } = useFormFilterRepository("users_filter");
</script>

<template>
  <!-- Filter Form -->
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <!-- External controls -->
  <div class="d-flex gap-2 my-2">
    <v-btn variant="outlined" prepend-icon="mdi-refresh" @click="reload">Refresh</v-btn>
    <v-btn variant="outlined" prepend-icon="mdi-filter-remove" @click="reset">Clear Filters</v-btn>
  </div>

  <VqDataTable id="users" action="users/list" :headers="headers" />
</template>
```

## Reload After Bulk Import

```vue
<script setup>
import { useFormFilterRepository, useMessageInstance } from "@qnx/vuetify";
import axios from "axios";

const message = useMessageInstance();
const { reload } = useFormFilterRepository("users_filter");

const importCSV = async (file) => {
  const form = new FormData();
  form.append("file", file);
  try {
    await axios.post("users/import", form);
    message.success("Import successful!");
    reload(); // Refresh table to show new records
  } catch {
    message.error("Import failed.");
  }
};
</script>
```

## Reload After Row Delete (Without VqDatatableItemAction)

```vue
<script setup>
import { useFormFilterRepository, useMessageInstance } from "@qnx/vuetify";
import axios from "axios";

const message = useMessageInstance();
const { reload } = useFormFilterRepository("products_filter");

const deleteProduct = async (id) => {
  await axios.delete(`products/${id}`);
  message.success("Product deleted.");
  reload();
};
</script>
```
