# Usage

Here are practical examples covering the main use cases of `@qnx/vuetify`.

---

## Form with Validation and Submission

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const validationSchema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required").email("Must be a valid email"),
});

const initialValues = { name: "Test User", email: "test@gmail.com" };

const onSuccess = (res) => {
  console.log("Created:", res);
};
</script>

<template>
  <VqForm
    id="create-user"
    action="user/create"
    method="POST"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    @submited-success="onSuccess"
  >
    <VqTextField name="name" label="Name" placeholder="Name" />
    <VqTextField name="email" label="Email" placeholder="Email" />
    <VqSubmitBtn>Submit</VqSubmitBtn>
  </VqForm>
</template>
```

---

## Data Table with Filters

```vue
<script setup>
import {
  VqDataTable, VqTableFilter, VqTextField,
  VqDatatableItemAction, VqSerialNo, collectVqHeaders
} from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <VqTableFilter id="users">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqDataTable id="users" action="users/list" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index" />
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>
          <VqDatatableItemAction
            id="users"
            :item-id="String(item.id)"
            action="users/delete"
            method="DELETE"
          />
        </td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

---

## Infinite Scroll List

```vue
<script setup>
import { VqList, VqListLoadMoreBtn, VqTableFilter, VqTextField } from "@qnx/vuetify";
</script>

<template>
  <VqTableFilter id="posts">
    <VqTextField name="search" label="Search posts" />
  </VqTableFilter>

  <VqList id="posts" action="posts/list" :page-size="15" v-slot="{ items, loading }">
    <v-list>
      <v-list-item
        v-for="post in items"
        :key="post.id"
        :title="post.title"
      />
    </v-list>
    <v-skeleton-loader v-if="loading" type="list-item@3" />
    <VqListLoadMoreBtn />
  </VqList>
</template>
```

---

## Toast Notifications

Place `<MessageQueue />` once in your `App.vue`:

```vue
<!-- App.vue -->
<template>
  <v-app>
    <MessageQueue />
    <router-view />
  </v-app>
</template>
```

Then call from anywhere:

```typescript
import { useMessageInstance } from "@qnx/vuetify";

const message = useMessageInstance();
message.success("Saved successfully!");
message.warning("Check your input.");
message.error("Something went wrong.");
```

---

## Programmatic Form (useVqForm)

Use `useVqForm` when you need direct access to `resetForm` or want to compose the form programmatically:

```vue
<script setup>
import { useVqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const { wrapper: EditForm, resetForm } = useVqForm({
  formId: "edit-user",
  validationSchema: object({
    name: string().required(),
    email: string().required().email(),
  }),
  initialValues: { name: "John", email: "john@example.com" },
});
</script>

<template>
  <EditForm action="users/1" method="PUT" @submited-success="resetForm">
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Update</VqSubmitBtn>
  </EditForm>
</template>
```

---

## File Upload Form

```vue
<template>
  <VqForm id="upload" action="files/upload" method="POST" :form-data="true">
    <VqFileInput name="avatar" label="Profile Picture" accept="image/*" />
    <VqSubmitBtn>Upload</VqSubmitBtn>
  </VqForm>
</template>
```

---

## Rich Text Editor (TinyMCE)

```vue
<script setup>
import { VqForm, VqSubmitBtn } from "@qnx/vuetify";
import { VqTextEditor, setConfig } from "@qnx/vuetify/integrations";

setConfig({ baseUrl: "https://yourapp.com/" });
</script>

<template>
  <VqForm id="post" action="posts/create" method="POST">
    <VqTextEditor name="content" label="Content" :height="400" />
    <VqSubmitBtn>Publish</VqSubmitBtn>
  </VqForm>
</template>
```
