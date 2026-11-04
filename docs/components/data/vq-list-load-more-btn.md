# VqListLoadMoreBtn

A "Load More" button for `VqList`. It must be inside a `VqList`, which it finds by injection.

## Props

None. Any attribute goes to [`VBtn`](https://vuetifyjs.com/api/v-btn). `color` defaults to `primary`.

## Events and slots

There are no events of its own. Slots go to `VBtn`, so its `prepend` and `append` slots work, and the `default` slot replaces the label. Otherwise the label comes from the [locale](/composables/set-vq-locale) `loadMore` text.

## Behaviour

- It shows a spinner and is disabled during a request.
- It disappears once every item has loaded.

## Example

```vue
<script setup>
import { VqList, VqListLoadMoreBtn } from "@qnx/vuetify";
</script>

<template>
  <VqList id="posts" action="posts">
    <template #default="{ items }">
      <v-list-item v-for="post in items" :key="post.id" :title="post.title" />
      <VqListLoadMoreBtn block variant="tonal" />
    </template>
  </VqList>
</template>
```
