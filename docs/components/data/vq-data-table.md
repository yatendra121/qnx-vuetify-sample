# VqDataTable

A table that fetches its rows from your API, with server-side pagination and sorting. Wraps Vuetify's `VDataTableServer`.

## Live demo

<VDemo>
  <DataTableExample />
</VDemo>

The demo uses an in-browser mock API.

::: details View source code
<<< ../../../src/components/examples/data/DataTableExample.vue
:::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Identifies the table. A `VqTableFilter` with the same `id` filters it. |
| `action` | `string` | required | URL to fetch from. See the [Server Contract](/guide/server-contract#vqdatatable). |
| `method` | `string` | `"GET"` | HTTP method. |
| `page` | `number` | `1` | Starting page. |
| `itemsPerPage` | `number` | `10` | Starting page size. |
| `sortBy` | `{ key, order }[]` | `[{ key: "name", order: "asc" }]` | Starting sort. Set this if your data has no `name` column. |

`page`, `itemsPerPage`, `sortBy`, and `id` are only read once. Any other attribute goes to [`VDataTableServer`](https://vuetifyjs.com/api/v-data-table-server), including `headers`.

## Events

There are no events of its own. Listeners go to `VDataTableServer`, such as `@update:options`. A failed request fires no event: see [Limitations](/guide/limitations#tables-and-lists).

## Slots

All slots go to `VDataTableServer`. The one you'll use most is `item`, which renders a row:

| Slot prop | Description |
|-----------|-------------|
| `item` | The row object from your API. |
| `index` | The row's position on the current page, starting at `0`. |

## Basic example

```vue
<script setup>
import { VqDataTable } from "@qnx/vuetify";

const headers = [
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
];
</script>

<template>
  <VqDataTable id="users" action="users" :headers="headers" />
</template>
```

Without an `item` slot, cells come from each header's `key`.

## Custom rows and filters

```vue
<script setup>
import { VqDataTable, VqSerialNo, VqTableFilter, VqTextField, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Status", key: "status" },
]);

const ignoreSubmit = () => {};
</script>

<template>
  <VqTableFilter id="members" @submit="ignoreSubmit">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqDataTable
    id="members"
    action="members"
    :headers="headers"
    :items-per-page="20"
    :sort-by="[{ key: 'status', order: 'desc' }]"
  >
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index + 1" />
        <td>{{ item.name }}</td>
        <td>
          <v-chip :color="item.status === 'active' ? 'success' : 'error'">{{ item.status }}</v-chip>
        </td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

For a typed `item`, see [`useVqDataTable`](/composables/use-vq-data-table).

<script setup>
import DataTableExample from '../../../src/components/examples/data/DataTableExample.vue'
</script>
