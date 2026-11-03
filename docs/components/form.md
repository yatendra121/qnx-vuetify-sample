# Form Components

Inputs that bind to a form by `name`, plus the form and its submit button.

## Available components

| Component | Wraps | Stored value |
|-----------|-------|--------------|
| [`VqForm`](/components/form/vq-form) | `<form>` | |
| [`VqSubmitBtn`](/components/form/vq-submit-btn) | `VBtn` | |
| [`VqTextField`](/components/form/vq-text-field) | `VTextField` | `string` |
| [`VqTextarea`](/components/form/vq-textarea) | `VTextarea` | `string` |
| [`VqCheckbox`](/components/form/vq-checkbox) | `VCheckbox` | `boolean` |
| [`VqAutocomplete`](/components/form/vq-autocomplete) | `VAutocomplete` | The selected value or values |
| [`VqDatePicker`](/components/form/vq-date-picker) | `VDatePicker` in a menu or dialog | `Date` |
| [`VqTimePicker`](/components/form/vq-time-picker) | `VTimePicker` in a menu or dialog | `string`, such as `14:30` |
| [`VqColorPicker`](/components/form/vq-color-picker) | `VColorPicker` in a menu or dialog | `string`, such as `#FF0000` |
| [`VqOtpInput`](/components/form/vq-otp-input) | `VOtpInput` | `string` |
| [`VqFileInput`](/components/form/vq-file-input) | `VFileInput` | `File`, under `name[file]` |
| [`VqFileUpload`](/components/form/vq-file-upload) | `VFileUpload` | `File` or `File[]` |

For a form you control from script, see [`useVqForm`](/composables/use-vq-form).

## How they work together

1. `VqForm` creates a vee-validate form.
2. Each input registers with it using `name`. Inputs work inside any vee-validate form, including [`VqTableFilter`](/components/data/vq-table-filter).
3. On submit, the form validates every field, then sends the values to `action`.
4. `VqSubmitBtn` shows a spinner while the request runs.

Read [Usage](/guide/usage/) for validation timing, reading values, and handling each outcome.
