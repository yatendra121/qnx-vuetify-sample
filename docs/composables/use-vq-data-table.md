# useVqDataTable

Returns `VqDataTable` with a typed `item` slot prop. It accepts the same [props, attributes, and slots](/components/data/vq-data-table) at runtime.

## Type Parameter

| Param | Description |
|-------|-------------|
| `TValue` | The type of each row. |

## Returns

A component. The `item` slot's props are typed as `{ item: TValue; index: number }`.

## Example

```vue
<script setup lang="ts">
import { useVqDataTable, collectVqHeaders, VqSerialNo } from "@qnx/vuetify";

interface User {
  id: number;
  name: string;
  status: "active" | "inactive";
}

const UserTable = useVqDataTable<User>();

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Status", key: "status" },
]);
</script>

<template>
  <UserTable id="users" action="users" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index + 1" />
        <td>{{ item.name }}</td>
        <td>{{ item.status }}</td>
      </tr>
    </template>
  </UserTable>
</template>
```

Call it in `<script setup>`, so the same component is reused across renders.
