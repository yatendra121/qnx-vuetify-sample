# Components

`@qnx/vuetify` provides a collection of Vue components designed to simplify form handling, data management, and data presentation within Vuetify applications. These components are organized into categories based on their primary function: Form Components, Data Components, and Integration Components.

Explore each section below for detailed descriptions, usage examples, and customization options.

---

## Form Components

Form components simplify form creation and management by handling input fields, validation, and form submission. Each component is styled to fit seamlessly into Vuetify's design system.

- **VqForm** - The core form component, managing validation, data submission, and internal states.
- **VqTextField** - A basic text input field with integrated validation.
- **VqTextarea** - A multi-line text input for larger text entries.
- **VqAutocomplete** - An autocomplete input field to assist users in selecting from a list of options.
- **VqFileInput** - A file upload component, allowing users to attach files.
- **VqCheckbox** - A checkbox input for boolean values.
- **VqDatePicker** - A date picker component for selecting dates.
- **VqTimePicker** - A time picker component for time selection.
- **VqColorPicker** - A color picker component for color selection.
- **VqOtpInput** - An OTP (One-Time Password) input field.
- **VqSubmitBtn** - A submit button optimized for form submission.

[Learn more about Form Components](/components/form)

---

## Data Components

Data components are used to display and manipulate data within your application. These components integrate seamlessly with Vuetify’s data presentation styles, enabling efficient and dynamic data handling.

- **VqDataTable** - A versatile data table for displaying tabular data.
- **VqSerialNo** - Displays serial numbers in lists or tables.
- **VqList** - A dynamic list component for displaying items.
- **VqTableFilter** - A filtering component to easily refine table results.
- **VqListLoadMoreBtn** - A "Load More" button for incremental list loading.

[Learn more about Data Components](/components/data)

---

## Integration Components

Integration components provide additional functionality for specialized applications, allowing you to embed text editors or handle specific input types easily.

- **VqTextEditor** - A rich text editor component for creating or editing formatted text.

[Learn more about Integration Components](/components/integration)

---

## How to Use Components

To use any component, first import it from `@qnx/vuetify`. Here’s a quick example using `VqForm` and `VqTextField` to create a simple form:

```vue
<script setup>
import { VqForm, VqTextField } from "@qnx/vuetify";
import { object, string } from "yup";

let validationSchema = object({
  name: string().required(),
  email: string().required().email(),
});

const initialValues = { name: "User", email: "user@example.com" };
const onSuccess = (res) => {
  console.log("Form submitted:", res);
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
    <VqTextField name="name" label="Name" placeholder="Enter your name" />
    <VqTextField name="email" label="Email" placeholder="Enter your email" />
    <button type="submit">Submit</button>
  </VqForm>
</template>
```

This setup provides an intuitive navigation structure, allowing users to easily browse through components and access specific details for each.
