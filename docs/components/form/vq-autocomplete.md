# VqAutocomplete

A validated autocomplete/select field. Supports static item lists and dynamic item loading from an API endpoint. Wraps Vuetify's `VAutocomplete`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Field name for form binding |
| `action` | `string` | `undefined` | API endpoint to fetch items from on mount |
| `items` | `array` | `[]` | Static list of items to display |
| *(all VAutocomplete props)* | | | All Vuetify `VAutocomplete` props are forwarded |

## Features

- If `action` is provided, fetches items via axios when the component mounts
- Shows a loading spinner while fetching
- Works with both static `items` and dynamically loaded items
- Supports `item-title` and `item-value` for object arrays

## Static Items Example

```vue
<script setup>
import { VqForm, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const roles = ["Admin", "Editor", "Viewer", "Guest"];

const schema = object({
  role: string().required("Please select a role"),
});
</script>

<template>
  <VqForm id="assign-role" action="users/role" method="PUT" :validation-schema="schema">
    <VqAutocomplete
      name="role"
      label="Select Role"
      :items="roles"
    />
    <VqSubmitBtn>Assign Role</VqSubmitBtn>
  </VqForm>
</template>
```

## Dynamic Items from API

Items are fetched from the `action` endpoint automatically on mount:

```vue
<script setup>
import { VqForm, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { object, number } from "yup";

const schema = object({
  country_id: number().required("Please select a country"),
});
</script>

<template>
  <VqForm id="user-profile" action="profile/update" method="PUT" :validation-schema="schema">
    <VqAutocomplete
      name="country_id"
      label="Country"
      action="countries/list"
      item-title="name"
      item-value="id"
    />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

## Object Items with Custom Keys

```vue
<script setup>
const categories = [
  { id: 1, label: "Technology" },
  { id: 2, label: "Health" },
  { id: 3, label: "Finance" },
];
</script>

<template>
  <VqAutocomplete
    name="category_id"
    label="Category"
    :items="categories"
    item-title="label"
    item-value="id"
  />
</template>
```

## Multiple Selection

```vue
<VqAutocomplete
  name="tags"
  label="Tags"
  :items="['Vue', 'Vuetify', 'TypeScript', 'Pinia']"
  multiple
  chips
  closable-chips
/>
```

## Full Registration Form

```vue
<script setup>
import { VqForm, VqTextField, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { object, string, number } from "yup";

const schema = object({
  name: string().required(),
  email: string().required().email(),
  department_id: number().required("Department is required"),
});
</script>

<template>
  <VqForm id="add-employee" action="employees/create" :validation-schema="schema">
    <VqTextField name="name" label="Full Name" />
    <VqTextField name="email" label="Email" type="email" />
    <VqAutocomplete
      name="department_id"
      label="Department"
      action="departments/list"
      item-title="name"
      item-value="id"
    />
    <VqSubmitBtn>Add Employee</VqSubmitBtn>
  </VqForm>
</template>
```
