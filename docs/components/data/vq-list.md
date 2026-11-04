# VqList

A list that fetches pages from your API and appends each new page to the items it has. Wraps Vuetify's `VList`.

It loads the next page when asked, usually by [`VqListLoadMoreBtn`](/components/data/vq-list-load-more-btn), and doesn't watch scrolling by itself.

## Live demo

<VDemo>
  <ListExample />
</VDemo>

The demo uses an in-browser mock API.

::: details View source code
<<< ../../../src/components/examples/data/ListExample.vue
:::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Identifies the list. A `VqTableFilter` with the same `id` filters it. |
| `action` | `string` | required | URL to fetch from, always with `GET`. See the [Server Contract](/guide/server-contract#vqlist). |
| `pageSize` | `number` | `10` | Sent as `page_size`. Read once. |

Any other attribute goes to [`VList`](https://vuetifyjs.com/api/v-list).

## Events

There are no events of its own. A failed request fails silently: see [Limitations](/guide/limitations#tables-and-lists).

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | See below | The list's content. |

| Slot prop | Type | Description |
|-----------|------|-------------|
| `items` | `array` | Every item loaded so far. |
| `loadMore` | `() => void` | Fetches the next page. |
| `finished` | `boolean` | `true` once every item has loaded. |
| `loading` | `boolean` | `true` during a request. |

## Basic example

```vue
<script setup>
import { VqList, VqListLoadMoreBtn } from "@qnx/vuetify";
</script>

<template>
  <VqList id="posts" action="posts" :page-size="15">
    <template #default="{ items }">
      <v-list-item v-for="post in items" :key="post.id" :title="post.title" />
      <VqListLoadMoreBtn />
    </template>
  </VqList>
</template>
```

## Your own controls

```vue
<script setup>
import { VqList } from "@qnx/vuetify";
</script>

<template>
  <VqList id="articles" action="articles">
    <template #default="{ items, loadMore, loading, finished }">
      <v-list-item v-for="article in items" :key="article.id" :title="article.title" />
      <v-progress-linear v-if="loading" indeterminate />
      <v-btn v-if="!finished" :disabled="loading" @click="loadMore">More</v-btn>
      <p v-else>All articles loaded.</p>
    </template>
  </VqList>
</template>
```

For typed items, see [`useVqList`](/composables/use-vq-list).

<script setup>
import ListExample from '../../../src/components/examples/data/ListExample.vue'
</script>
