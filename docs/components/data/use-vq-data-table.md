# useVqDataTable\<TValue\>

A composable that returns a type-safe `VqDataTable` component with proper TypeScript typing on item slot props.

## Type Parameter

| Param | Description |
|-------|-------------|
| `TValue` | The TypeScript interface representing each row item |

## Returns

A typed `VqDataTable` component wrapper where `item` in the `#item` slot is typed as `TValue`.

## When to Use

Use `useVqDataTable<T>()` when you want TypeScript to type-check the `item` object inside your slot template. Without it, `item` is typed as `unknown`.

## Example

```vue
<script setup>
import { useVqDataTable, collectVqHeaders } from "@qnx/vuetify";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
}

const UserTable = useVqDataTable<User>();

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <UserTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <!-- item is fully typed as User -->
      <tr>
        <td>{{ index }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.role }}</td>
        <td>
          <v-chip :color="item.status === 'active' ? 'success' : 'error'">
            {{ item.status }}
          </v-chip>
        </td>
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
  </UserTable>
</template>
```

## Slot Props Type

```typescript
interface GenericSlotsProps<TValue> {
  item: TValue;
  index: number;
}
```
