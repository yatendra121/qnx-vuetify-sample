# VqListLoadMoreBtn

A "Load More" button for `VqList`. Uses Vue's `inject` to read list state from the parent `VqList` — no props needed.

## Props

None. All state is injected from the parent `VqList`.

## Features

- Hidden automatically when all items have been loaded (`finished === true`)
- Disabled and shows a loading spinner while a request is in progress
- Calls `loadMore()` on click to fetch the next page

> **Important:** Must be placed **inside** a `VqList` default slot.

## Basic Usage

```vue
<script setup>
import { VqList, VqListLoadMoreBtn } from "@qnx/vuetify";
</script>

<template>
  <VqList id="posts" action="posts/list" v-slot="{ items }">
    <v-list>
      <v-list-item
        v-for="post in items"
        :key="post.id"
        :title="post.title"
      />
    </v-list>
    <VqListLoadMoreBtn />
  </VqList>
</template>
```

## With Loading Skeleton

```vue
<VqList id="users" action="users/list" :page-size="10" v-slot="{ items, loading }">
  <v-list>
    <v-list-item
      v-for="user in items"
      :key="user.id"
      :title="user.name"
      :subtitle="user.email"
    />
  </v-list>

  <!-- Show skeleton while loading next page -->
  <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line@3" />

  <!-- Hidden automatically when finished -->
  <VqListLoadMoreBtn />
</VqList>
```

## With "All Loaded" Message

```vue
<VqList id="products" action="products/list" v-slot="{ items, finished }">
  <div class="product-grid">
    <div v-for="p in items" :key="p.id">{{ p.name }}</div>
  </div>

  <VqListLoadMoreBtn />

  <p v-if="finished" class="text-center text-grey-500 mt-4">
    All products loaded.
  </p>
</VqList>
```
