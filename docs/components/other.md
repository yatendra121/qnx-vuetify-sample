# Data Components

Data components display and manage server-side data with automatic pagination, sorting, filtering, and infinite scroll.

---

## Available Components

| Component | Description | Link |
|-----------|-------------|------|
| `VqDataTable` | Server-side paginated data table with sorting and filter integration | [→ Docs](/components/data/vq-data-table) |
| `useVqDataTable<T>` | Type-safe wrapper for `VqDataTable` | [→ Docs](/components/data/use-vq-data-table) |
| `collectVqHeaders` | Utility to prepend a `#` serial column to table headers | [→ Docs](/components/data/collect-vq-headers) |
| `VqSerialNo` | Serial number `<td>` cell for use in table row slots | [→ Docs](/components/data/vq-serial-no) |
| `VqDatatableItemAction` | Row action button (delete/status) with confirmation dialog | [→ Docs](/components/data/vq-datatable-item-action) |
| `VqList` | Infinite-scroll list with filter integration | [→ Docs](/components/data/vq-list) |
| `useVqList<T>` | Type-safe wrapper for `VqList` | [→ Docs](/components/data/use-vq-list) |
| `VqTableFilter` | Filter form that connects to `VqDataTable` or `VqList` by shared `id` | [→ Docs](/components/data/vq-table-filter) |
| `VqListLoadMoreBtn` | "Load More" button for `VqList` — uses inject, no props needed | [→ Docs](/components/data/vq-list-load-more-btn) |
| `MessageQueue` | Root-level snackbar notification queue — place once in `App.vue` | [→ Docs](/components/data/message-queue) |

---

## How It Works

### Table + Filter Pattern

Connect `VqTableFilter` and `VqDataTable` with the same `id`. When filter fields change, the table reloads automatically.

```vue
<script setup>
import { VqDataTable, VqTableFilter, VqTextField, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqDataTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <td>{{ index }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
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
  </VqDataTable>
</template>
```

### Infinite Scroll List Pattern

```vue
<template>
  <VqTableFilter id="posts">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqList id="posts" action="posts/list" :page-size="15" v-slot="{ items, loading }">
    <v-list-item v-for="post in items" :key="post.id" :title="post.title" />
    <v-skeleton-loader v-if="loading" type="list-item@3" />
    <VqListLoadMoreBtn />
  </VqList>
</template>
```

---

## Import

```typescript
import {
  VqDataTable,
  useVqDataTable,
  collectVqHeaders,
  VqSerialNo,
  VqDatatableItemAction,
  VqList,
  useVqList,
  VqTableFilter,
  VqListLoadMoreBtn,
  MessageQueue,
} from "@qnx/vuetify";
```
