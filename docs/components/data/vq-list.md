# VqList

An infinite-scroll list component that fetches paginated data from an API and appends items as the user loads more. Integrates with `VqTableFilter` for filtering.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique list ID — must match the paired `VqTableFilter` `id` |
| `action` | `string` | required | API endpoint for fetching items |
| `pageSize` | `number` | `10` | Number of items to fetch per request |

## Default Slot Props

| Key | Type | Description |
|-----|------|-------------|
| `items` | `TValue[]` | Array of all loaded items |
| `loadMore` | `() => void` | Manually trigger loading the next page |
| `finished` | `boolean` | `true` when all items have been loaded |
| `loading` | `boolean` | `true` while an API request is in progress |

## Features

- Appends new items to the list on each load (true infinite scroll)
- Resets to page 1 and reloads when filter values change
- Provides `vqList` injection for `VqListLoadMoreBtn`

## Basic Example

```vue
<script setup>
import { VqList, VqListLoadMoreBtn } from "@qnx/vuetify";
</script>

<template>
  <VqList id="posts" action="posts/list" v-slot="{ items, loading }">
    <v-list>
      <v-list-item
        v-for="post in items"
        :key="post.id"
        :title="post.title"
        :subtitle="post.category"
      />
    </v-list>
    <v-skeleton-loader v-if="loading" type="list-item@3" />
    <VqListLoadMoreBtn />
  </VqList>
</template>
```

## With Filters

```vue
<script setup>
import { VqList, VqListLoadMoreBtn, VqTableFilter, VqTextField } from "@qnx/vuetify";
</script>

<template>
  <VqTableFilter id="products">
    <v-row>
      <v-col cols="6">
        <VqTextField name="search" label="Search" />
      </v-col>
      <v-col cols="6">
        <VqAutocomplete name="category" label="Category" :items="categories" />
      </v-col>
    </v-row>
  </VqTableFilter>

  <VqList id="products" action="products/list" :page-size="12" v-slot="{ items, loading, finished }">
    <v-row>
      <v-col v-for="product in items" :key="product.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>{{ product.price }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-skeleton-loader v-if="loading" type="card@3" />
    <p v-if="finished && !items.length" class="text-center">No products found.</p>
    <VqListLoadMoreBtn />
  </VqList>
</template>
```

## Type-safe with useVqList

```vue
<script setup>
import { useVqList, VqListLoadMoreBtn } from "@qnx/vuetify";

interface Post {
  id: number;
  title: string;
  author: string;
}

const PostList = useVqList<Post>();
</script>

<template>
  <PostList id="posts" action="posts/list" v-slot="{ items }">
    <!-- items is typed as Post[] -->
    <v-list-item
      v-for="post in items"
      :key="post.id"
      :title="post.title"
      :subtitle="post.author"
    />
    <VqListLoadMoreBtn />
  </PostList>
</template>
```

## Manual Load More (No Button)

Use the `loadMore` slot prop to trigger loading programmatically:

```vue
<VqList id="posts" action="posts/list" v-slot="{ items, loadMore, finished, loading }">
  <v-list-item v-for="post in items" :key="post.id">{{ post.title }}</v-list-item>

  <v-btn
    v-if="!finished"
    :loading="loading"
    @click="loadMore"
    block
    class="mt-4"
  >
    Load More Posts
  </v-btn>

  <p v-if="finished" class="text-center text-grey mt-4">All posts loaded.</p>
</VqList>
```
