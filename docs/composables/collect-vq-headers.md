# collectVqHeaders

Utility function that prepends a serial number (`#`) column to a data table headers array.

## Signature

```typescript
function collectVqHeaders(headers: DataTableHeader[]): DataTableHeader[]
```

## Parameters

| Param | Type | Description |
|-------|------|-------------|
| `headers` | `DataTableHeader[]` | Vuetify column header objects |

## Returns

A new headers array with `{ title: '#', sortable: false }` at index `0`.

## Example

```typescript
import { collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
  { title: "Actions", key: "actions", sortable: false },
]);

// Result:
// [
//   { title: "#", sortable: false },
//   { title: "Name", key: "name" },
//   { title: "Email", key: "email" },
//   { title: "Role", key: "role" },
//   { title: "Actions", key: "actions", sortable: false },
// ]
```

## Full Usage

```vue
<script setup>
import { VqDataTable, VqSerialNo, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
]);
</script>

<template>
  <VqDataTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index" />
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </template>
  </VqDataTable>
</template>
```
