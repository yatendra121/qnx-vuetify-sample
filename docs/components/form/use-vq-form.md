# useVqForm

Composable version of `VqForm`. Returns a wrapper component and direct access to `resetForm` for programmatic form control.

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
| `wrapper` | `Component` | Render this as your `<form>` element in the template |
| `resetForm` | `function` | Clears all field values and validation errors |

## When to Use

Use `useVqForm` instead of `VqForm` when you need to:
- Call `resetForm()` after a successful submission
- Control the form programmatically from the `<script setup>` block
- Reuse or compose forms dynamically

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
  <UserForm
    action="users/create"
    method="POST"
    @submited-success="resetForm"
  >
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Create</VqSubmitBtn>
  </UserForm>
</template>
```

## Edit Form with Reset

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
  message.success("User updated successfully!");
};
</script>

<template>
  <EditForm
    :action="`users/${props.user.id}`"
    method="PUT"
    @submited-success="onSuccess"
  >
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />

    <div style="display: flex; gap: 8px;">
      <VqSubmitBtn>Save Changes</VqSubmitBtn>
      <v-btn variant="outlined" @click="resetForm">Reset</v-btn>
    </div>
  </EditForm>
</template>
```
