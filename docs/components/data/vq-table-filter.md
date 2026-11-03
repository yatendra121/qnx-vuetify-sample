# VqTableFilter

A filter form connected to a `VqDataTable` or `VqList` by a shared `id`. When a field changes, the table or list refetches from page 1 with the form's values in its query.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | The `id` of the table or list to filter. |

Any other attribute goes to vee-validate's [`Form`](https://vee-validate.logaretm.com/v4/api/form/), including `initial-values`.

## Events and slots

| Slot | Description |
|------|-------------|
| `default` | The filter fields, such as `VqTextField` or `VqAutocomplete`. |

## Example

```vue
<script setup>
import { VqAutocomplete, VqDataTable, VqTableFilter, VqTextField } from "@qnx/vuetify";

const headers = [
  { title: "Name", key: "name" },
  { title: "Role", key: "role" },
];

const ignoreSubmit = () => {};
</script>

<template>
  <VqTableFilter id="users" @submit="ignoreSubmit">
    <v-row>
      <v-col cols="12" md="6">
        <VqTextField name="search" label="Search" />
      </v-col>
      <v-col cols="12" md="6">
        <VqAutocomplete name="role" label="Role" :items="['Admin', 'Editor']" />
      </v-col>
    </v-row>
  </VqTableFilter>

  <VqDataTable id="users" action="users" :headers="headers" />
</template>
```

## Pressing Enter

Without an `onSubmit`, vee-validate submits the form natively, so pressing Enter in a field **reloads the page**. Always pass a handler, even an empty one, as the example does.

## Requests per keystroke

Each keystroke in a text field triggers a request, and the previous one is cancelled. There's no debounce option in this version.

## Initial values

```vue
<script setup>
import { VqList, VqTableFilter, VqTextField } from "@qnx/vuetify";

const ignoreSubmit = () => {};
</script>

<template>
  <VqTableFilter id="posts" :initial-values="{ search: 'vue' }" @submit="ignoreSubmit">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqList id="posts" action="posts">
    <template #default="{ items }">
      <v-list-item v-for="post in items" :key="post.id" :title="post.title" />
    </template>
  </VqList>
</template>
```

Render the filter before the list, or its initial values aren't in the first request. `VqDataTable` doesn't send them in its first request either way.
