# Usage

Below is an example demonstrating the usage of `@qnx/vuetify` to create a form with validation and data submission:

```vue
<script setup>
import { VqForm, VqTextField } from "@qnx/vuetify";
import { object, string } from "yup";

let validationSchema = object({
  name: string().required(),
  email: string().required().email(),
});

const initialValues = { name: "Test User", email: "test@gmail.com" };
const onSuccess = (res) => {
  console.log(res);
};
</script>

<template>
  <VqForm
    action="user/create"
    method="POST"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    @submited-success="onSuccess"
  >
    <VqTextField name="name" label="Name" placeholder="Name" />
    <VqTextField name="email" label="Email" placeholder="Email" />
    <button type="submit">Submit</button>
  </VqForm>
</template>
```
