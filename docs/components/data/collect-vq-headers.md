# collectVqHeaders

A utility function that prepends a serial number (`#`) column to a Vuetify data table headers array. Use it together with `VqSerialNo` to add row numbers to `VqDataTable`.

## Signature

```typescript
function collectVqHeaders(headers: DataTableHeader[]): DataTableHeader[]
```

## Parameters

| Param | Type | Description |
|-------|------|-------------|
| `headers` | `DataTableHeader[]` | Array of Vuetify column header objects |

## Returns

A new headers array with `{ title: '#', sortable: false }` inserted at index `0`.

## Basic Example

```typescript
import { collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
]);

// Result:
// [
//   { title: "#", sortable: false },
//   { title: "Name", key: "name" },
//   { title: "Email", key: "email" },
//   { title: "Role", key: "role" },
// ]
```

## Full Usage with VqDataTable

```vue
<script setup>
import { VqDataTable, VqSerialNo, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Joined", key: "created_at" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <VqDataTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index" />
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.created_at }}</td>
        <td><!-- action buttons --></td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

## Without collectVqHeaders (Manual)

If you don't need a serial column, define headers directly:

```typescript
const headers = [
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
];
```
