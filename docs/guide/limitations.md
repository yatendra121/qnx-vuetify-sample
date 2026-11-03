# Limitations

Known behaviour of the installed version, each confirmed by testing it. Where there's a workaround, it's listed. Fixes for many of these are being prepared in the library but aren't published yet.

## Forms

| Limitation | Workaround |
|------------|------------|
| `submited-client-error` is declared but never fires. | Check the fields' error messages. |
| `5xx`, `403`, `404`, and network failures fire no event and cause an unhandled rejection. | Pass [`error-response-handler`](/guide/usage/#after-submitting). |
| Validation runs only on submit, and errors stay until the next submit. | None. |
| With `form-data`, `""`, `0`, and `false` aren't sent. | Use a JSON body for those fields. |
| `values-schema` sets a missing path to the schema object, reverses `*` arrays, and throws if a `*` array is missing. | See [Mapping nested values](/components/form/vq-form#mapping-nested-values). |

## useVqForm

| Limitation | Workaround |
|------------|------------|
| `initialValues` isn't applied on creation, only when it later changes. | Set it from `onMounted`, as in [the example](/composables/use-vq-form#pre-filling-values). |
| A plain object, or leaving out `initialValues`, logs a Vue warning. | Always pass a `ref`. |

## Fields

| Limitation | Workaround |
|------------|------------|
| `VqFileInput` stores its value under `name[file]`, so a schema keyed on `name` always fails with no visible message. | Key the schema on [`name[file]`](/components/form/vq-file-input#validation). |
| `VqOtpInput` wipes its initial value and doesn't show validation errors. | Show the error yourself using `useField`. |
| `VqDatePicker` ignores `multiple`, shows date-only strings a day early west of Greenwich, and stores a `Date`, which JSON can shift to the previous day. | Handle dates in UTC on the server. |
| Attrs on `VqDatePicker`, `VqTimePicker`, and `VqColorPicker` reach the picker, not the text field, so `variant` or `prepend-inner-icon` have no effect there. | Set them through Vuetify's [`defaults`](https://vuetifyjs.com/en/features/global-configuration/) for `VTextField`. |
| `VqAutocomplete` reads `items` and `action` only once. | Re-render it with a new `key`. |
| `VqTextEditor` ignores `label` and `placeholder`, and needs a trailing slash on `baseUrl`. | Render your own label. |
| The default TinyMCE plugin list includes `template`, which TinyMCE 7 removed, so the browser logs a failed request for it. The editor still works. | None. |

## Tables and lists

| Limitation | Workaround |
|------------|------------|
| `reload()` and `reset()` do nothing for `VqDataTable`. | Change the `key` to force a refetch, as in [this example](/composables/use-form-filter-repository#refreshing-a-vqdatatable). |
| On `VqList`, `reload()` and `reset()` only work while a `VqTableFilter` with the same `id` is mounted, and `reset()` doesn't clear the filter's fields. | Mount a filter, and clear its fields yourself. |
| A failed `VqDataTable` request causes an unhandled rejection, and a failed `VqList` request fails silently. Neither fires an event. | Log failures in an axios response interceptor. |
| Pressing Enter in a `VqTableFilter` field reloads the page. | Pass [`@submit`](/components/data/vq-table-filter#pressing-enter). |
| A filter's initial values aren't in `VqDataTable`'s first request, or in `VqList`'s if the filter renders after the list. | Render the filter first for lists. For tables, start with empty filters. |
| `deleteItemValue` deletes the **last** row when the id isn't found, and `updateItemKeyValue` throws. | Pass the id with its [exact type](/composables/list-item-helpers#ids-must-match-exactly). |
| `VqSubmitBtn` with a `form` prop doesn't show loading when it's outside the form. | Place the button inside the form. |

## Not exported

`MessageQueue`, `useMessageInstance`, `VqDatatableItemAction`, and `useListRepository` exist in the library's source, but aren't public exports of this version. Importing them from `@qnx/vuetify` fails.
