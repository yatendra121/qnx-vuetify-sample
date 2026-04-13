# useVqDataTable\<TValue\>

Returns a type-safe `VqDataTable` component. The `item` in the `#item` slot is typed as `TValue` instead of `unknown`.

## Type Parameter

| Param | Description |
|-------|-------------|
| `TValue` | TypeScript interface for each row item |

## Example

```vue
<script setup>
import { useVqDataTable, collectVqHeaders, VqSerialNo, VqDatatableItemAction } from "@qnx/vuetify";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
}

const ProductTable = useVqDataTable<Product>();

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Price", key: "price" },
  { title: "Stock", key: "stock" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <ProductTable id="products" action="products/list" :headers="headers">
    <template #item="{ item, index }">
      <!-- item is typed as Product -->
      <tr>
        <VqSerialNo :index="index" />
        <td>{{ item.name }}</td>
        <td>${{ item.price.toFixed(2) }}</td>
        <td>{{ item.stock }}</td>
        <td>
          <v-chip :color="item.status === 'active' ? 'success' : 'error'" size="small">
            {{ item.status }}
          </v-chip>
        </td>
        <td>
          <VqDatatableItemAction
            id="products"
            :item-id="String(item.id)"
            action="products/delete"
            method="DELETE"
          />
        </td>
      </tr>
    </template>
  </ProductTable>
</template>
```
