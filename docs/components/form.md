# Form Components

Form components handle input fields, validation, and submission. All input components integrate with `vee-validate` and must be used inside `VqForm` or `useVqForm`.

---

## Available Components

| Component | Description | Link |
|-----------|-------------|------|
| `VqForm` | Core form wrapper — handles validation, API submission, busy state, and server error mapping | [→ Docs](/components/form/vq-form) |
| `useVqForm` | Composable version of `VqForm` with direct access to `resetForm` | [→ Docs](/components/form/use-vq-form) |
| `VqTextField` | Validated single-line text input | [→ Docs](/components/form/vq-text-field) |
| `VqTextarea` | Validated multi-line text area | [→ Docs](/components/form/vq-textarea) |
| `VqCheckbox` | Validated checkbox storing a boolean value | [→ Docs](/components/form/vq-checkbox) |
| `VqAutocomplete` | Validated autocomplete/select with optional API item loading | [→ Docs](/components/form/vq-autocomplete) |
| `VqDatePicker` | Validated date picker (dialog or menu mode) | [→ Docs](/components/form/vq-date-picker) |
| `VqTimePicker` | Validated time picker (dialog or menu mode) | [→ Docs](/components/form/vq-time-picker) |
| `VqColorPicker` | Validated color picker (dialog or menu mode) | [→ Docs](/components/form/vq-color-picker) |
| `VqOtpInput` | Validated OTP (one-time password) input | [→ Docs](/components/form/vq-otp-input) |
| `VqFileInput` | Validated single-file selection input | [→ Docs](/components/form/vq-file-input) |
| `VqFileUpload` | Validated file upload input (Vuetify Labs) | [→ Docs](/components/form/vq-file-upload) |
| `VqSubmitBtn` | Submit button with automatic loading/disabled state | [→ Docs](/components/form/vq-submit-btn) |

---

## How It Works

1. Wrap your form with `VqForm` (or `useVqForm`)
2. Place input components inside — they bind to the form automatically via `vee-validate`
3. Add `VqSubmitBtn` — it disables and shows a spinner during submission
4. On submit, `VqForm` validates all fields, sends the request, and maps server errors back to fields

```vue
<script setup>
import { VqForm, VqTextField, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
  email: string().required().email("Invalid email"),
  role: string().required("Please select a role"),
});
</script>

<template>
  <VqForm
    id="create-user"
    action="users/create"
    method="POST"
    :validation-schema="schema"
    @submited-success="(res) => console.log('Created:', res)"
  >
    <VqTextField name="name" label="Full Name" />
    <VqTextField name="email" label="Email" type="email" />
    <VqAutocomplete name="role" label="Role" :items="['Admin', 'Editor', 'Viewer']" />
    <VqSubmitBtn>Create User</VqSubmitBtn>
  </VqForm>
</template>
```

---

## Import

All form components are available from the main package:

```typescript
import {
  VqForm,
  useVqForm,
  VqTextField,
  VqTextarea,
  VqCheckbox,
  VqAutocomplete,
  VqDatePicker,
  VqTimePicker,
  VqColorPicker,
  VqOtpInput,
  VqFileInput,
  VqFileUpload,
  VqSubmitBtn,
} from "@qnx/vuetify";
```
