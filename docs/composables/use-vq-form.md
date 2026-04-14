# useVqForm

Composable that returns a form wrapper component and direct access to `resetForm`. Use it when you need programmatic form control — such as resetting after submission or composing forms dynamically.

## Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `formId` | `string` | required | Unique form identifier |
| `validationSchema` | `object` | `undefined` | Yup validation schema |
| `initialValues` | `object` | `undefined` | Initial form field values |
| `valuesSchema` | `object` | `undefined` | Maps nested API response keys to form field names |

## Returns

| Key | Type | Description |
|-----|------|-------------|
| `wrapper` | `Component` | Render this as the `<form>` element in your template |
| `resetForm` | `function` | Clears all field values and validation errors |

## Basic Example

```vue
<script setup>
import { useVqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const { wrapper: UserForm, resetForm } = useVqForm({
  formId: "create-user",
  validationSchema: object({
    name: string().required("Name is required"),
    email: string().required().email("Invalid email"),
  }),
  initialValues: { name: "", email: "" },
});
</script>

<template>
  <UserForm action="users/create" method="POST" @submited-success="resetForm">
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Create</VqSubmitBtn>
  </UserForm>
</template>
```

## Edit Form with Manual Reset Button

```vue
<script setup>
import { useVqForm, VqTextField, VqSubmitBtn, useMessageInstance } from "@qnx/vuetify";
import { object, string } from "yup";

const props = defineProps({ user: Object });
const message = useMessageInstance();

const { wrapper: EditForm, resetForm } = useVqForm({
  formId: "edit-user",
  validationSchema: object({
    name: string().required(),
    email: string().required().email(),
  }),
  initialValues: props.user,
});

const onSuccess = () => {
  message.success("User updated!");
};
</script>

<template>
  <EditForm :action="`users/${props.user.id}`" method="PUT" @submited-success="onSuccess">
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <div class="d-flex gap-2">
      <VqSubmitBtn>Save</VqSubmitBtn>
      <v-btn variant="outlined" @click="resetForm">Reset</v-btn>
    </div>
  </EditForm>
</template>
```
