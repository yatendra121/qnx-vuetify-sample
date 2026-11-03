# Data Components

Components that fetch from your API. See the [Server Contract](/guide/server-contract) for the response shape they need.

| Component | Description |
|-----------|-------------|
| [`VqDataTable`](/components/data/vq-data-table) | Server-side paginated table |
| [`VqSerialNo`](/components/data/vq-serial-no) | Row number cell |
| [`VqList`](/components/data/vq-list) | List that appends each page it fetches |
| [`VqListLoadMoreBtn`](/components/data/vq-list-load-more-btn) | "Load More" button for `VqList` |
| [`VqTableFilter`](/components/data/vq-table-filter) | Filter form paired to a table or list by `id` |

Related helpers: [`useVqDataTable`](/composables/use-vq-data-table), [`useVqList`](/composables/use-vq-list), [`collectVqHeaders`](/composables/collect-vq-headers), [`useFormFilterRepository`](/composables/use-form-filter-repository), and the [list item helpers](/composables/list-item-helpers).

## How the id works

A table or list keeps its rows under its `id`. `VqTableFilter` stores its values under the same `id`, so the two find each other wherever they are on the page.

```vue
<script setup>
import { VqList, VqListLoadMoreBtn, VqTableFilter, VqTextField } from "@qnx/vuetify";

const ignoreSubmit = () => {};
</script>

<template>
  <VqTableFilter id="posts" @submit="ignoreSubmit">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqList id="posts" action="posts" :page-size="15">
    <template #default="{ items }">
      <v-list-item v-for="post in items" :key="post.id" :title="post.title" />
      <VqListLoadMoreBtn />
    </template>
  </VqList>
</template>
```
