# useVqForm

Creates a form and returns its component along with `resetForm`, for when you need to reset the form from script.

## Live demo

<VDemo>
  <UseVqFormExample />
</VDemo>

The demo uses an in-browser mock API.

::: details View source code
<<< ../../src/components/examples/composable/UseVqFormExample.vue
:::

## Parameters

| Option | Type | Description |
|--------|------|-------------|
| `formId` | `string` | Required. Identifies the form for `VqSubmitBtn`. |
| `validationSchema` | `object` | Schema for vee-validate, such as a Yup object. |
| `initialValues` | `Ref<object>` | **Must be a ref.** Applied when the ref changes, not on creation. See [Pre-filling values](#pre-filling-values). |
| `valuesSchema` | `object` | Maps nested values, as on [`VqForm`](/components/form/vq-form#mapping-nested-values). |

## Returns

| Key | Type | Description |
|-----|------|-------------|
| `wrapper` | `Component` | The form. Rename it when destructuring and use it in your template. |
| `resetForm` | `(state?) => void` | vee-validate's [`resetForm`](https://vee-validate.logaretm.com/v4/api/use-form/#composable-returns). Restores the last applied values, or empty fields if none were applied. |

## The wrapper component

`wrapper` takes the same `action`, `method`, `formData`, `successResponseHandler`, and `errorResponseHandler` props as `VqForm`, and fires the same [events](/components/form/vq-form#events).

It has no `id` prop, and doesn't set an `id` on the `<form>`, so a `VqSubmitBtn` must be inside it.

## Resetting after success

```vue
<script setup>
import { ref } from "vue";
import { useVqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const { wrapper: UserForm, resetForm } = useVqForm({
  formId: "create-user",
  validationSchema: object({
    name: string().required("Name is required"),
  }),
  initialValues: ref({ name: "" }),
});
</script>

<template>
  <UserForm action="users" @submited-success="resetForm()">
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn>Create</VqSubmitBtn>
    <v-btn variant="text" @click="resetForm()">Clear</v-btn>
  </UserForm>
</template>
```

## Pre-filling values

Since `initialValues` is only applied when the ref changes, set the ref after mounting. This also suits values you load from an API.

```vue
<script setup>
import { onMounted, ref } from "vue";
import { useVqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";

const user = ref({});

const { wrapper: EditForm } = useVqForm({
  formId: "edit-user",
  initialValues: user,
});

onMounted(() => {
  user.value = { name: "Asha" };
});
</script>

<template>
  <EditForm action="users/7" method="PUT">
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </EditForm>
</template>
```

::: warning Always pass a ref
A plain object isn't applied at all, and it logs `Invalid watch source`, as does leaving out `initialValues`.
:::

<script setup>
import UseVqFormExample from '../../src/components/examples/composable/UseVqFormExample.vue'
</script>
