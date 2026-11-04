# Components

All components wrap Vuetify 4 components, and forward any attribute and slot they don't use themselves.

| Group | Contents |
|-------|----------|
| [Form components](/components/form) | `VqForm`, `VqSubmitBtn`, and the validated inputs |
| [Data components](/components/data) | `VqDataTable`, `VqSerialNo`, `VqList`, `VqListLoadMoreBtn`, `VqTableFilter` |
| [Integration components](/components/integration) | `VqTextEditor`, from `@qnx/vuetify/integrations` |

For helper functions such as `useVqForm`, see [Composables & Utilities](/composables/).

Before you use a component, finish the [setup](/guide/installation/#set-up-the-app): Vuetify, Pinia, and an axios instance.
