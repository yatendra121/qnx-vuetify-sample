# collectVqHeaders

Adds a `#` column to the start of a table's headers. Use it with [`VqSerialNo`](/components/data/vq-serial-no).

## Signature

```ts
function collectVqHeaders<T extends unknown[]>(headers: T): unknown[];
```

## Returns

A new array, starting with `{ title: "#", sortable: false }`.

## Example

```ts
import { collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
]);
// [
//   { title: "#", sortable: false },
//   { title: "Name", key: "name" },
//   { title: "Email", key: "email" },
// ]
```

The added header has no `key`, so render rows yourself with the `item` slot, as in the [`VqSerialNo` example](/components/data/vq-serial-no#example).
