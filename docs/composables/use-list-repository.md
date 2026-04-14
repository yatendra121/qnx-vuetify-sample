# useListRepository

Internal composable for directly mutating list/table item data in the global reactive store — without triggering a full reload.

## Parameters

| Param | Type | Description |
|-------|------|-------------|
| `key` | `string` | List/table identifier (same as `id` prop) |

## Returns

| Method | Signature | Description |
|--------|-----------|-------------|
| `removeList` | `() => void` | Clears all data for this list |
| `collectListValues` | `<T>() => List<T>` | Returns current list state |
| `updateListItemValue` | `(itemId, value, itemKey?) => void` | Update a specific item |
| `deleteListItemValue` | `(itemId) => void` | Remove an item from the list |

## Exported Helpers

Import directly without instantiating the composable:

```typescript
import { updateItemKeyValue, updateItemValue, deleteItemValue } from "@qnx/vuetify";
```

| Helper | Signature | Description |
|--------|-----------|-------------|
| `updateItemKeyValue` | `(listId, itemId, key, value) => void` | Update one field of one item |
| `updateItemValue` | `(listId, itemId, value) => void` | Replace an entire item object |
| `deleteItemValue` | `(listId, itemId) => void` | Remove an item from the list |

## When to Use

Use these helpers when you want to update the UI immediately after an in-place action — without reloading the entire table from the server.

## Update a Single Field

Toggle a user's status in the table after a toggle action:

```typescript
import { updateItemKeyValue } from "@qnx/vuetify";

// After a successful PATCH request:
updateItemKeyValue("users", String(userId), "status", "inactive");
```

```vue
<script setup>
import { updateItemKeyValue, useMessageInstance } from "@qnx/vuetify";
import axios from "axios";

const message = useMessageInstance();

const toggleStatus = async (user) => {
  const newStatus = user.status === "active" ? "inactive" : "active";
  try {
    await axios.put(`users/${user.id}/status`, { status: newStatus });
    updateItemKeyValue("users", String(user.id), "status", newStatus);
    message.success("Status updated!");
  } catch {
    message.error("Failed to update status.");
  }
};
</script>

<template #item="{ item }">
  <tr>
    <td>{{ item.name }}</td>
    <td>
      <v-switch
        :model-value="item.status === 'active'"
        @update:model-value="toggleStatus(item)"
        hide-details
      />
    </td>
  </tr>
</template>
```

## Replace an Entire Item

```typescript
import { updateItemValue } from "@qnx/vuetify";

// After a successful PUT request that returns the updated item:
const updated = await axios.put(`users/${id}`, payload);
updateItemValue("users", String(id), updated.data);
```

## Delete an Item Without Reloading

```typescript
import { deleteItemValue } from "@qnx/vuetify";

// After a successful DELETE request:
await axios.delete(`users/${id}`);
deleteItemValue("users", String(id));
```
