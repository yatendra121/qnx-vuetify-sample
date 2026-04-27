# useVqList\<TValue\>

A composable that returns a type-safe `VqList` component with proper TypeScript typing on slot props.

## Type Parameter

| Param | Description |
|-------|-------------|
| `TValue` | The TypeScript interface representing each list item |

## Returns

A typed `VqList` component wrapper where `items` in the default slot is typed as `TValue[]`.

## When to Use

Use `useVqList<T>()` when you want TypeScript to type-check the `items` array inside your slot template. Without it, `items` is typed as `unknown[]`.

## Example

```vue
<script setup>
import { useVqList, VqListLoadMoreBtn } from "@qnx/vuetify";

interface Post {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  category: string;
}

const PostList = useVqList<Post>();
</script>

<template>
  <PostList id="posts" action="posts/list" :page-size="15" v-slot="{ items, loading, finished }">
    <!-- items is typed as Post[] -->
    <v-list>
      <v-list-item
        v-for="post in items"
        :key="post.id"
        :title="post.title"
        :subtitle="`${post.author} · ${post.category}`"
      >
        <template #append>
          <span class="text-caption text-grey">{{ post.publishedAt }}</span>
        </template>
      </v-list-item>
    </v-list>

    <v-skeleton-loader v-if="loading" type="list-item-two-line@3" />

    <VqListLoadMoreBtn />

    <p v-if="finished && !items.length" class="text-center text-grey mt-4">
      No posts found.
    </p>
  </PostList>
</template>
```

## Slot Props Type

```typescript
interface GenericSlotsProps<TValue> {
  items: TValue[];
  loadMore: () => void;
  finished: boolean;
  loading: boolean;
}
```
