# VqAutocomplete

A validated autocomplete with static options, or options loaded from your API. Wraps Vuetify's `VAutocomplete`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | The field's key in the form values. |
| `items` | `array` | `[]` | Static options. Read once when the component is created. |
| `action` | `string` | `undefined` | URL to load options from, once when the component is created. See the [response shape](/guide/server-contract#vqautocomplete). |

Any other attribute goes to [`VAutocomplete`](https://vuetifyjs.com/api/v-autocomplete), including `item-title`, `item-value`, `multiple`, and `chips`.

## Events and slots

There are no events of its own. Listeners and slots go to `VAutocomplete`. Don't use `v-model`: see [Values and v-model](/guide/usage/#values-and-v-model).

A failed `action` request logs to the console and leaves the options empty.

## Static options

```vue
<script setup>
import { VqForm, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { object, string } from "yup";

const schema = object({
  role: string().required("Please select a role"),
});
</script>

<template>
  <VqForm id="assign-role" action="users/role" method="PUT" :validation-schema="schema">
    <VqAutocomplete name="role" label="Role" :items="['Admin', 'Editor', 'Viewer']" />
    <VqSubmitBtn>Assign</VqSubmitBtn>
  </VqForm>
</template>
```

## Options from your API

```vue
<script setup>
import { VqForm, VqAutocomplete, VqSubmitBtn } from "@qnx/vuetify";
import { number, object } from "yup";

const schema = object({
  country_id: number().required("Please select a country"),
});
</script>

<template>
  <VqForm id="address" action="address" :validation-schema="schema">
    <VqAutocomplete
      name="country_id"
      label="Country"
      action="countries"
      item-title="name"
      item-value="id"
    />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

## Multiple selection

```vue
<template>
  <VqAutocomplete
    name="tags"
    label="Tags"
    :items="['Vue', 'Vuetify', 'TypeScript']"
    multiple
    chips
    closable-chips
  />
</template>
```

## Options that change

`items` and `action` are only read once. To load different options, for example cities for a selected country, give the component a new `key`:

```vue
<script setup>
import { computed, ref } from "vue";
import { VqAutocomplete } from "@qnx/vuetify";

const countryId = ref(1);
const citiesUrl = computed(() => `countries/${countryId.value}/cities`);
</script>

<template>
  <VqAutocomplete :key="citiesUrl" name="city_id" label="City" :action="citiesUrl" />
</template>
```
