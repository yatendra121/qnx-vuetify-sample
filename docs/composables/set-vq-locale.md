# setVqLocale

Overrides the text the library renders itself. `resetVqLocale` restores the English defaults.

## Parameters

`setVqLocale` takes an object with any of these keys, and leaves the others as they are:

| Key | Default | Used by |
|-----|---------|---------|
| `submit` | `Submit` | `VqSubmitBtn` |
| `loadMore` | `Load More` | `VqListLoadMoreBtn` |
| `confirmTitle` | `Confirmation` | No exported component in this version |
| `confirmDeleteDescription` | `Are you sure to want delete this record?` | No exported component in this version |
| `confirm` | `Confirm` | No exported component in this version |
| `cancel` | `Cancel` | No exported component in this version |
| `changeStatusTooltip` | `Change Status` | No exported component in this version |
| `submitErrorMessage` | `Please check input values.` | No exported component in this version |

## Example

The change is reactive, so mounted components update.

```ts
import { setVqLocale, resetVqLocale } from "@qnx/vuetify";

setVqLocale({ submit: "Enviar", loadMore: "Cargar más" });

resetVqLocale();
```

The TypeScript type of the argument's full shape is exported as `VqLocale`.
