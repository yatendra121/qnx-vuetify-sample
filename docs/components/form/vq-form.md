# VqForm

Creates a vee-validate form, submits its values with axios, tracks the busy state, and puts server validation errors on the matching fields.

## Live demo

<VDemo>
  <FormExample />
</VDemo>

The demo uses an in-browser mock API. Submit the name `taken` to see a server error land on its field.

::: details View source code
<<< ../../../src/components/examples/form/FormExample.vue
:::

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Identifies the form, and is set as the `<form>` id. `VqSubmitBtn` uses it to find the busy state. |
| `action` | `string` | required | URL to submit to. Relative URLs resolve against your axios instance's `baseURL`. |
| `method` | `Method` | `"POST"` | HTTP method. |
| `initialValues` | `object` | `undefined` | Starting values. When this changes, the form resets to the new values. |
| `valuesSchema` | `object` | `undefined` | [Maps nested values](#mapping-nested-values) onto field names. |
| `validationSchema` | `object` | `undefined` | Schema for vee-validate, such as a Yup object. |
| `formData` | `boolean` | `false` | Submits as `multipart/form-data`. Required for files. |
| `successResponseHandler` | `(response, actions) => void` | `undefined` | Runs on success, **instead of** `submited-success`. Gets the response body and [submission actions](https://vee-validate.logaretm.com/v4/api/use-form/#handlesubmit). |
| `errorResponseHandler` | `(error, actions) => void` | `undefined` | Runs on any failure, **instead of** the built-in handling. Gets the axios error and submission actions. |

Other attributes go to the `<form>` element.

## Events

The names are spelled with one `t`.

| Event | Payload | Fires when |
|-------|---------|------------|
| `submited-success` | `ApiResponse` | The request succeeded, and there's no `successResponseHandler`. |
| `submited-error` | `ApiResponse` | The server returned `400` or `422`, and there's no `errorResponseHandler`. |
| `submited-client-error` | | Never in this version. See [Limitations](/guide/limitations#forms). |

See the [Server Contract](/guide/server-contract#vqform) for `ApiResponse`.

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | None | The form's fields. To read values, see [Values and v-model](/guide/usage/#values-and-v-model). |

## Editing a record

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const user = { id: 7, name: "Asha", email: "asha@example.com" };

const schema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

const onSuccess = (res) => {
  console.log(res.getMessage());
};
</script>

<template>
  <VqForm
    id="edit-user"
    :action="`users/${user.id}`"
    method="PUT"
    :validation-schema="schema"
    :initial-values="user"
    @submited-success="onSuccess"
  >
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Update</VqSubmitBtn>
  </VqForm>
</template>
```

## Handling errors

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";

// Field errors are already set by the time this runs.
const onServerError = (res) => {
  console.log(res.getMessage(), res.getErrors());
};
</script>

<template>
  <VqForm id="signup" action="users" @submited-error="onServerError">
    <VqTextField name="email" label="Email" />
    <VqSubmitBtn>Sign up</VqSubmitBtn>
  </VqForm>
</template>
```

Only `400` and `422` reach `submited-error`. To handle `5xx` and network failures, see [After submitting](/guide/usage/#after-submitting).

## Mapping nested values

`valuesSchema` adds top-level values read from nested paths in `initialValues`. Use `*` to read from each element of an array.

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";

const user = {
  name: "Asha",
  address: { city: "Pune" },
};

const valuesSchema = { city: "address.city" };
</script>

<template>
  <VqForm id="profile" action="profile" :initial-values="user" :values-schema="valuesSchema">
    <VqTextField name="city" label="City" />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

The original values stay in the form, so this example submits `address` as well as `city`.

::: warning Rough edges in this version
- A path that doesn't exist sets the field to the whole schema object, so make sure every path exists.
- `*` arrays come back reversed: `tags.*.id` gives `[2, 1]` for ids `1, 2`.
- A `*` on a missing array throws an error when the form is created.
:::

<script setup>
import FormExample from '../../../src/components/examples/form/FormExample.vue'
</script>
