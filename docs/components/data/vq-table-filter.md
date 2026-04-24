# VqTableFilter

A filter form that connects to `VqDataTable` or `VqList` by a shared `id`. Any change to filter fields automatically triggers the paired table/list to reload with updated filter values.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Must match the `id` of the paired `VqDataTable` or `VqList` |

## Features

- Wraps `vee-validate`'s `Form` component
- Stores current field values in `useFormFilterStore`
- Automatically triggers reload of the paired component when values change
- Works with any form field component in its default slot

## Basic Example

```vue
<script setup>
import { VqDataTable, VqTableFilter, VqTextField, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
]);
</script>

<template>
  <!-- The id must match -->
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqDataTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <td>{{ index }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

## Multiple Filter Fields

```vue
<VqTableFilter id="users">
  <v-row>
    <v-col cols="12" md="4">
      <VqTextField name="search" label="Search by name" />
    </v-col>
    <v-col cols="12" md="4">
      <VqAutocomplete
        name="role"
        label="Filter by role"
        :items="['Admin', 'Editor', 'Viewer']"
      />
    </v-col>
    <v-col cols="12" md="4">
      <VqAutocomplete
        name="status"
        label="Filter by status"
        :items="['active', 'inactive', 'pending']"
      />
    </v-col>
  </v-row>
</VqTableFilter>
```

## Paired with VqList

`VqTableFilter` works the same way with `VqList`:

```vue
<VqTableFilter id="posts">
  <VqTextField name="search" label="Search posts" />
</VqTableFilter>

<VqList id="posts" action="posts/list" v-slot="{ items }">
  <v-list-item v-for="post in items" :key="post.id">{{ post.title }}</v-list-item>
  <VqListLoadMoreBtn />
</VqList>
```

## Programmatic Reset

Use `useFormFilterRepository` to reset filters from outside the filter form:

```vue
<script setup>
import { useFormFilterRepository } from "@qnx/vuetify";

const { reload, reset } = useFormFilterRepository("users_filter");
</script>

<template>
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <v-btn @click="reset" variant="outlined">Clear Filters</v-btn>
  <v-btn @click="reload">Refresh</v-btn>

  <VqDataTable id="users" action="users/list" :headers="headers" />
</template>
```
