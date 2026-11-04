# useVqList

Returns `VqList` with a typed `items` slot prop. It accepts the same [props, attributes, and slots](/components/data/vq-list) at runtime.

## Type Parameter

| Param | Description |
|-------|-------------|
| `TValue` | The type of each list item. |

## Returns

A component. The default slot's props are typed as `{ items: TValue[] }`.

`loadMore`, `loading`, and `finished` are still passed at runtime, but aren't in the type, so using them in a type-checked template is an error. [`VqListLoadMoreBtn`](/components/data/vq-list-load-more-btn) doesn't need them.

## Example

```vue
<script setup lang="ts">
import { useVqList, VqListLoadMoreBtn } from "@qnx/vuetify";

interface Post {
  id: number;
  title: string;
}

const PostList = useVqList<Post>();
</script>

<template>
  <PostList id="posts" action="posts" :page-size="15">
    <template #default="{ items }">
      <v-list-item v-for="post in items" :key="post.id" :title="post.title" />
      <VqListLoadMoreBtn />
    </template>
  </PostList>
</template>
```
