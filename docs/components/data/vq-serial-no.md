# VqSerialNo

A serial number cell for use inside `VqDataTable` item slots. Renders a `<td>` element with the row index.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | required | Row number to display |

## Usage

Always pair with `collectVqHeaders` to ensure the `#` column header is present:

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

## With Full Table

```vue
<script setup>
import {
  VqDataTable, VqSerialNo, VqDatatableItemAction, collectVqHeaders
} from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Department", key: "department" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <VqDataTable id="employees" action="employees/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index" />
        <td>{{ item.name }}</td>
        <td>{{ item.department }}</td>
        <td>
          <VqDatatableItemAction
            id="employees"
            :item-id="String(item.id)"
            action="employees/delete"
            method="DELETE"
          />
        </td>
      </tr>
    </template>
  </VqDataTable>
</template>
```
