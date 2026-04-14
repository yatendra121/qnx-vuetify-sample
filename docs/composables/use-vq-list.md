# useVqList\<TValue\>

Returns a type-safe `VqList` component. The `items` in the default slot is typed as `TValue[]` instead of `unknown[]`.

## Type Parameter

| Param | Description |
|-------|-------------|
| `TValue` | TypeScript interface for each list item |

## Example

```vue
<script setup>
import { useVqList, VqListLoadMoreBtn } from "@qnx/vuetify";

interface Notification {
  id: number;
  message: string;
  type: "info" | "warning" | "error";
  createdAt: string;
  read: boolean;
}

const NotificationList = useVqList<Notification>();
</script>

<template>
  <NotificationList
    id="notifications"
    action="notifications/list"
    :page-size="20"
    v-slot="{ items, loading, finished }"
  >
    <!-- items is typed as Notification[] -->
    <v-list lines="two">
      <v-list-item
        v-for="notif in items"
        :key="notif.id"
        :subtitle="notif.createdAt"
        :class="{ 'opacity-50': notif.read }"
      >
        <template #prepend>
          <v-icon
            :color="notif.type === 'error' ? 'red' : notif.type === 'warning' ? 'orange' : 'blue'"
          >
            mdi-bell
          </v-icon>
        </template>
        <template #title>{{ notif.message }}</template>
      </v-list-item>
    </v-list>

    <v-skeleton-loader v-if="loading" type="list-item-two-line@3" />
    <VqListLoadMoreBtn />
    <p v-if="finished" class="text-center text-grey py-4">All caught up!</p>
  </NotificationList>
</template>
```
