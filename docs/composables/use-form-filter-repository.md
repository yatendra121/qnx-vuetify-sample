# useFormFilterRepository

Asks a `VqList` to refetch from outside it. Call it where Pinia is active, such as in `setup`.

## Parameters

| Param | Type | Description |
|-------|------|-------------|
| `formKey` | `string` | The list's `id` followed by `_filter`, such as `posts_filter`. |

## Returns

| Method | Description |
|--------|-------------|
| `reload()` | Refetches from page 1 with the current filter values. |
| `reset()` | Does the same. It **doesn't** clear the filter's fields. |

## What it works with

| Target | `reload()` and `reset()` |
|--------|--------------------------|
| `VqList` with a mounted `VqTableFilter` of the same `id` | Works |
| `VqList` with no filter | Does nothing |
| `VqDataTable` | Does nothing |

## Refreshing a VqList

```vue
<script setup>
import {
  VqList,
  VqTableFilter,
  VqTextField,
  useFormFilterRepository,
} from "@qnx/vuetify";

const { reload } = useFormFilterRepository("posts_filter");
const ignoreSubmit = () => {};
</script>

<template>
  <VqTableFilter id="posts" @submit="ignoreSubmit">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <v-btn prepend-icon="mdi-refresh" @click="reload">Refresh</v-btn>

  <VqList id="posts" action="posts">
    <template #default="{ items }">
      <v-list-item v-for="post in items" :key="post.id" :title="post.title" />
    </template>
  </VqList>
</template>
```

## Refreshing a VqDataTable

Since `reload()` doesn't reach a table, change its `key` to recreate it and fetch again:

```vue
<script setup>
import { ref } from "vue";
import { VqDataTable } from "@qnx/vuetify";

const headers = [{ title: "Name", key: "name" }];
const tableKey = ref(0);
</script>

<template>
  <v-btn prepend-icon="mdi-refresh" @click="tableKey++">Refresh</v-btn>
  <VqDataTable :key="tableKey" id="users" action="users" :headers="headers" />
</template>
```

This also returns the table to its starting page and sort.
