# Usage

How fields, values, and requests fit together. Each component has its own page with its full API.

## Fields bind by name

Input components register with the nearest form using their `name`. Any other attribute, and any slot, goes straight to the Vuetify component they wrap.

```vue
<script setup>
import { VqForm, VqTextField, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
  role: string().required("Please select a role"),
});
</script>

<template>
  <VqForm id="invite" action="users/invite" :validation-schema="schema">
    <VqTextField name="name" label="Name" prepend-inner-icon="mdi-account" />
    <VqAutocomplete name="role" label="Role" :items="['Admin', 'Editor', 'Viewer']" />
    <VqSubmitBtn>Invite</VqSubmitBtn>
  </VqForm>
</template>
```

## When validation runs

Fields validate **only when the form is submitted**. Blurring or typing doesn't validate, and an error stays on screen until the next submit, even after the value is corrected.

## Values and v-model

Don't use `v-model` on a field. The form owns the value, so `v-model` only changes what the input displays: in testing, a field showed `hello` from `v-model` while the form submitted an empty value.

Set starting values with `initial-values` on [`VqForm`](/components/form/vq-form). To read or change values while the form is open, use vee-validate's composables in a component **inside** the form:

```vue
<!-- FormSummary.vue, rendered inside VqForm -->
<script setup>
import { useFormContext, useFormValues } from "vee-validate";

const values = useFormValues();
const { setFieldValue } = useFormContext();
</script>

<template>
  <p>Name: {{ values.name }}</p>
  <v-btn @click="setFieldValue('name', 'Asha')">Use default name</v-btn>
</template>
```

## After submitting

`VqForm` reports each outcome differently:

| Outcome | What happens |
|---------|--------------|
| Client validation fails | Errors appear on the fields, and no request is sent. No event fires. |
| Success (2xx) | `submited-success` fires with an `ApiResponse`. |
| `400` or `422` | The response's `errors` are set on the fields, and `submited-error` fires. |
| `401` | The [`setHandleUnauthenticated`](/guide/installation/#handle-expired-sessions) handler runs. No event fires. |
| Anything else, or no response | Unhandled promise rejection. No event fires. See the workaround below. |

To handle every failure, pass `error-response-handler`. It replaces the built-in error handling, so you also take over setting field errors:

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";

const onFailure = (error, { setErrors }) => {
  if (error.response?.status === 422) {
    setErrors(error.response.data.errors);
    return;
  }
  console.error("Request failed", error);
};
</script>

<template>
  <VqForm id="safe-form" action="users" :error-response-handler="onFailure">
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn />
  </VqForm>
</template>
```

## Resetting after success

`success-response-handler` receives vee-validate's submission actions, which include `resetForm`. It replaces the `submited-success` event.

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn } from "@qnx/vuetify";

const onSaved = (response, { resetForm }) => {
  console.log(response.message);
  resetForm();
};
</script>

<template>
  <VqForm id="note" action="notes" :success-response-handler="onSaved">
    <VqTextField name="body" label="Note" />
    <VqSubmitBtn>Add</VqSubmitBtn>
  </VqForm>
</template>
```

## Tables, lists, and filters

Give a filter and a table or list the same `id` to connect them. Changing a filter field refetches from page 1.

```vue
<script setup>
import { VqDataTable, VqSerialNo, VqTableFilter, VqTextField, collectVqHeaders } from "@qnx/vuetify";

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
]);

// Without an onSubmit, pressing Enter in a filter field reloads the page.
const ignoreSubmit = () => {};
</script>

<template>
  <VqTableFilter id="users" @submit="ignoreSubmit">
    <VqTextField name="search" label="Search" />
  </VqTableFilter>

  <VqDataTable id="users" action="users" :headers="headers">
    <template #item="{ item, index }">
      <tr>
        <VqSerialNo :index="index + 1" />
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </template>
  </VqDataTable>
</template>
```

Your API has to return the [expected response shape](/guide/server-contract).
