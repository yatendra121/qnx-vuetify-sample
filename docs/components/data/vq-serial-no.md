# VqSerialNo

A table cell that shows a row number. It renders a `<td>` for use in an `item` slot of `VqDataTable`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | required | The number to show, exactly as given. |

## Example

The slot's `index` starts at `0` and restarts on each page, so add `1` to start counting from one. Pair it with [`collectVqHeaders`](/composables/collect-vq-headers) for the `#` header.

```vue
<script setup>
import { VqDataTable, VqSerialNo, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([{ title: "Name", key: "name" }]);
</script>

<template>
  <VqDataTable id="users" action="users" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index + 1" />
        <td>{{ item.name }}</td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

## Numbering across pages

To keep counting across pages, track the options the table reports:

```vue
<script setup>
import { ref } from "vue";
import { VqDataTable, VqSerialNo, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([{ title: "Name", key: "name" }]);
const offset = ref(0);

const onOptions = ({ page, itemsPerPage }) => {
  offset.value = (page - 1) * itemsPerPage;
};
</script>

<template>
  <VqDataTable id="users" action="users" :headers="headers" @update:options="onOptions">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="offset + index + 1" />
        <td>{{ item.name }}</td>
      </tr>
    </template>
  </VqDataTable>
</template>
```
