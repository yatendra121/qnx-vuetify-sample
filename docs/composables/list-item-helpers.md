# List item helpers

`updateItemKeyValue`, `updateItemValue`, and `deleteItemValue` change rows a `VqDataTable` or `VqList` has already loaded, so you can update the screen without refetching.

## Parameters

| Function | Parameters | Description |
|----------|------------|-------------|
| `updateItemKeyValue` | `(listId, itemId, key, value)` | Changes one field of a row. |
| `updateItemValue` | `(listId, itemId, value)` | Replaces a whole row. |
| `deleteItemValue` | `(listId, itemId)` | Removes a row. |

`listId` is the table or list's `id`, with no `_filter` suffix. Rows are found by their `id` property.

## Ids must match exactly

::: danger The wrong id type can delete the wrong row
Ids are compared with `===`, and when none matches, `deleteItemValue` removes the **last** row and `updateItemKeyValue` throws. So `"1"` won't find a row whose id is the number `1`.

The types declare `itemId` as `string`, so in TypeScript, cast a numeric id rather than converting it with `String()`.
:::

## Example

```vue
<script setup>
import { VqDataTable, deleteItemValue, updateItemKeyValue } from "@qnx/vuetify";
import { useAsyncAxios } from "@qnx/composables/axios";

const headers = [
  { title: "Name", key: "name" },
  { title: "Status", key: "status" },
  { title: "", key: "actions", sortable: false },
];

const deactivate = async (user) => {
  await useAsyncAxios(`users/${user.id}/status`, { method: "PUT", data: { status: "inactive" } });
  updateItemKeyValue("users", user.id, "status", "inactive");
};

const remove = async (user) => {
  await useAsyncAxios(`users/${user.id}`, { method: "DELETE" });
  deleteItemValue("users", user.id);
};
</script>

<template>
  <VqDataTable id="users" action="users" :headers="headers">
    <template #item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.status }}</td>
        <td>
          <v-btn variant="text" @click="deactivate(item)">Deactivate</v-btn>
          <v-btn variant="text" color="error" @click="remove(item)">Delete</v-btn>
        </td>
      </tr>
    </template>
  </VqDataTable>
</template>
```
