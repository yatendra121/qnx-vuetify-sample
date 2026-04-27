# VqDataTable

A server-side paginated data table with automatic sorting, filtering, and loading state. Wraps Vuetify's `VDataTableServer`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique table ID — must match the paired `VqTableFilter` `id` |
| `action` | `string` | required | API endpoint for fetching data |
| `method` | `string` | `"GET"` | HTTP method |
| `page` | `number` | `1` | Initial page number |
| `itemsPerPage` | `number` | `10` | Rows per page |
| `sortBy` | `SortByValue[]` | `[{ key: "name", order: "asc" }]` | Initial sort configuration |

```typescript
interface SortByValue {
  key: string;
  order: "asc" | "desc";
}
```

## Features

- Renders Vuetify's `VDataTableServer`
- Builds query string automatically: `?page=1&itemsPerPage=10&sortBy[key]=order&{filterValues}`
- Watches the paired `VqTableFilter` and reloads on filter changes
- Shows loading indicator during API requests
- Provides `tableListId` injection for child components like `VqDatatableItemAction`

## Basic Example

```vue
<script setup>
import { VqDataTable, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
]);
</script>

<template>
  <VqDataTable
    id="users"
    action="users/list"
    :headers="headers"
  >
    <template #item="{ item, index }">
      <tr>
        <td>{{ index }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.role }}</td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

## With Filters and Actions

```vue
<script setup>
import {
  VqDataTable, VqTableFilter, VqTextField,
  VqDatatableItemAction, VqSerialNo, collectVqHeaders
} from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <!-- Filter bar -->
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search by name or email" />
  </VqTableFilter>

  <!-- Table -->
  <VqDataTable
    id="users"
    action="users/list"
    :headers="headers"
    :items-per-page="20"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index" />
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
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
            description="Are you sure you want to delete this user?"
          />
        </td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

## Type-safe with useVqDataTable

```vue
<script setup>
import { useVqDataTable, collectVqHeaders } from "@qnx/vuetify";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = useVqDataTable<User>();

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
]);
</script>

<template>
  <UserTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <!-- item is typed as User -->
      <tr>
        <td>{{ index }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </template>
  </UserTable>
</template>
```
