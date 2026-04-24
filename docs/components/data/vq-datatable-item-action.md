# VqDatatableItemAction

An action button for table rows that shows a confirmation dialog before making an API call. Automatically reloads the table on success.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Table ID — used to trigger reload after action completes |
| `itemId` | `string` | `"0"` | The row item's ID, appended to the API endpoint |
| `action` | `string` | `"user/change-status"` | API endpoint — called as `{action}/{itemId}` |
| `method` | `string` | `"PUT"` | HTTP method |
| `title` | `string` | `"Confirmation"` | Confirmation dialog title |
| `description` | `string` | `"Are you sure to want delete this record?"` | Confirmation dialog body text |
| `icon` | `string` | `mdiDelete` | MDI icon for the button |

## Features

- Shows a confirmation dialog before making any API call
- Sends request to `{action}/{itemId}` on confirmation
- Triggers the paired `VqDataTable` to reload after success
- Displays success/error snackbar messages via `useMessageInstance`

## Delete Button (Default)

```vue
<template #item="{ item }">
  <tr>
    <td>{{ item.name }}</td>
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
```

## Change Status Button

```vue
<VqDatatableItemAction
  id="users"
  :item-id="String(item.id)"
  action="users/toggle-status"
  method="PUT"
  title="Toggle Status"
  description="Are you sure you want to change this user's status?"
  :icon="mdiSwapHorizontal"
/>
```

## Multiple Action Buttons

```vue
<script setup>
import { mdiDelete, mdiEye, mdiPencil } from "@mdi/js";
</script>

<template #item="{ item }">
  <tr>
    <td>{{ item.name }}</td>
    <td>{{ item.email }}</td>
    <td class="d-flex gap-1">
      <!-- Toggle active/inactive -->
      <VqDatatableItemAction
        id="users"
        :item-id="String(item.id)"
        action="users/toggle-status"
        method="PUT"
        title="Toggle Status"
        description="Change this user's active status?"
        :icon="mdiSwapHorizontal"
      />

      <!-- Delete -->
      <VqDatatableItemAction
        id="users"
        :item-id="String(item.id)"
        action="users/delete"
        method="DELETE"
        title="Delete User"
        description="This action cannot be undone. Delete this user?"
        :icon="mdiDelete"
      />
    </td>
  </tr>
</template>
```

## Full Table with Actions

```vue
<script setup>
import {
  VqDataTable, VqDatatableItemAction,
  VqSerialNo, collectVqHeaders
} from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Status", key: "status" },
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
        <td>{{ item.status }}</td>
        <td>
          <VqDatatableItemAction
            id="users"
            :item-id="String(item.id)"
            action="users/delete"
            method="DELETE"
            title="Delete User"
            description="Are you sure you want to permanently delete this user?"
          />
        </td>
      </tr>
    </template>
  </VqDataTable>
</template>
```
