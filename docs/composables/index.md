# Composables

`@qnx/vuetify` provides a set of composables that make it easier to manage forms, lists, and tables within Vuetify applications. These composables are designed to handle common tasks like validation, data management, and state handling, helping you write cleaner and more maintainable Vue code.

## Available Composables

### 1. **useVqForm**

`useVqForm` is a powerful composable that simplifies form management by handling data binding, validation, and submission in one place. It integrates seamlessly with Vuetify form components, providing a smooth experience for developers working with forms.

#### Key Features:

- **Data Binding**: Automatically binds form data for easy retrieval and submission.
- **Validation**: Supports validation schemas using `@vee-validate` and `yup`.
- **Submission Handling**: Easily manage form submissions, including success and error handling.

#### Usage Example

```javascript
<script setup>
import { useVqForm } from '@qnx/vuetify';
import { object, string } from 'yup';

// Define a validation schema
const validationSchema = object({
  name: string().required(),
  email: string().required().email(),
});

// Initialize useVqForm composable
const { form, handleSubmit, errors } = useVqForm({
  validationSchema,
  initialValues: { name: '', email: '' },
  onSubmit: (values) => console.log('Form submitted:', values),
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <VqTextField v-model="form.name" label="Name" placeholder="Enter your name" />
    <span v-if="errors.name">{{ errors.name }}</span>

    <VqTextField v-model="form.email" label="Email" placeholder="Enter your email" />
    <span v-if="errors.email">{{ errors.email }}</span>

    <button type="submit">Submit</button>
  </form>
</template>
```

---

### 2. **collectVqHeaders**

`collectVqHeaders` helps in generating table headers dynamically, making it particularly useful for applications where table columns are frequently changing or are generated based on dynamic data.

#### Key Features:

- **Dynamic Header Generation**: Easily define headers as objects and update them based on requirements.
- **Vuetify Compatibility**: Headers created with `collectVqHeaders` work seamlessly with Vuetify’s `<v-data-table>` component.

#### Usage Example

```javascript
<script setup>
import { collectVqHeaders } from '@qnx/vuetify';

const headers = collectVqHeaders([
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Role', value: 'role' },
]);
</script>

<template>
  <v-data-table :headers="headers" :items="users" />
</template>
```

In this example, `headers` defines the column names and values to be used in the `<v-data-table>`, making it easy to update or add columns as needed.

---

### 3. **useVqList**

`useVqList` is designed for managing list data, including loading states, pagination, and filtering. This composable is particularly useful for applications with data-intensive lists, allowing developers to handle data fetching, loading indicators, and pagination controls in a clean and organized way.

#### Key Features:

- **Data Management**: Handles loading, filtering, and pagination for lists.
- **API Integration**: Easily integrates with backend APIs to fetch paginated data.
- **State Handling**: Manages list state, including loading and empty states.

#### Usage Example

```javascript
<script setup>
import { useVqList } from '@qnx/vuetify';

const { list, isLoading, loadMore } = useVqList({
  fetchItems: async (page) => {
    // Simulate an API call to fetch paginated data
    const response = await fetch(`/api/items?page=${page}`);
    const data = await response.json();
    return data.items;
  },
});
</script>

<template>
  <div>
    <v-list v-if="list.length">
      <v-list-item v-for="item in list" :key="item.id">
        {{ item.name }}
      </v-list-item>
    </v-list>

    <v-btn v-if="isLoading" disabled>Loading...</v-btn>
    <v-btn v-else @click="loadMore">Load More</v-btn>
  </div>
</template>
```

In this example, `useVqList` fetches list data from an API and manages pagination with the `loadMore` function, allowing for infinite scrolling or "Load More" functionality.

---

## Summary

Each composable in `@qnx/vuetify` is designed to integrate seamlessly with Vuetify components, making it easier to manage forms, tables, and lists within your application. By abstracting common tasks like validation, header generation, and list handling, these composables enable you to write cleaner, more efficient Vue code.

For further details, examples, and advanced usage, check out the documentation for each composable.
