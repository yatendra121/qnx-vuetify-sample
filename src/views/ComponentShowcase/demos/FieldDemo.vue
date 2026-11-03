<template>
  <VqForm
    :id="formId"
    :key="formId"
    :action="mockAction('members', 'success', 300)"
    :validation-schema="schema"
    @submited-success="log('submitedSuccess', $event)"
    @submited-error="log('submitedError', $event)"
  >
    <FormBridge v-slot="{ form }">
      <component :is="entry.component" v-bind="fieldProps">
        <template v-for="slot in slotExamples" :key="slot.name" #[slot.name]="scope">
          <SlotContent :example="slot" :scope="scope" />
        </template>
      </component>
      <FieldErrorSync :context="form" :path="fieldPath" :message="fieldError" />

      <template v-if="!compact">
        <div class="d-flex flex-wrap ga-2 mt-3">
          <v-btn size="small" variant="tonal" data-testid="set-sample" @click="form.setFieldValue(fieldPath, entry.sample?.())">
            Set value from code
          </v-btn>
          <v-btn size="small" variant="text" data-testid="clear-value" @click="form.setFieldValue(fieldPath, undefined)">
            Clear
          </v-btn>
          <v-btn size="small" variant="text" data-testid="validate" @click="validate(form)">Validate</v-btn>
          <v-btn size="small" variant="text" data-testid="reset-form" @click="form.resetForm()">Reset form</v-btn>
          <v-spacer />
          <VqSubmitBtn size="small" text="Submit" />
        </div>
        <ValuePanel class="mt-3" title="Form state (v-model equivalent)" :value="{ values: form.values, errors: form.errors.value }" />
      </template>
    </FormBridge>
  </VqForm>
</template>

<script setup lang="ts">
import { computed, defineComponent, useId, watch } from 'vue'
import type { PropType } from 'vue'
import { VqForm, VqSubmitBtn } from '@qnx/vuetify'
import { demoProps } from './demoProps'
import { propsFromConfig } from '../utils/codegen'
import { buildSchema } from '../utils/schema'
import { mockAction } from '../utils/mockApi'
import { reflectEmits, toHandlerName } from '../utils/reflect'
import { SlotContent } from './SlotContent'
import FormBridge from './FormBridge.vue'
import ValuePanel from './ValuePanel.vue'

const props = defineProps(demoProps)

// Applies a preset's error once the form is ready, and whenever it changes.
const FieldErrorSync = defineComponent({
  props: {
    context: { type: Object as PropType<any>, required: true },
    path: { type: String, required: true },
    message: { type: String, default: undefined }
  },
  setup(syncProps) {
    watch(
      () => [syncProps.message, syncProps.path],
      () => {
        if (syncProps.message)
          syncProps.context.setFieldError(syncProps.path, syncProps.message)
      },
      { immediate: true, flush: 'post' }
    )
    return () => null
  }
})

const uid = useId()
const formId = computed(() => `showcase-field-${uid}`)
const fieldPath = computed(() => {
  const name = String(props.config.name)
  return props.entry.fieldPath?.(name) ?? name
})
const schema = computed(() => buildSchema(fieldPath.value, props.config.rule))

// Everything Vuetify can emit is wired up, not only the documented events.
const QUIET = new Set(['mousedown:control'])
const listeners = computed(() => {
  const documented = props.entry.events.map((event) => event.name)
  const reflected = reflectEmits(props.entry.wraps?.component)
  return Object.fromEntries(
    [...new Set([...documented, ...reflected])]
      .filter((event) => !QUIET.has(event))
      .map((event) => [
        toHandlerName(event),
        (...args: unknown[]) =>
          props.log(event, args.length > 1 ? args : args[0])
      ])
  )
})

const autocompleteProps = computed(() => {
  const source = props.config.source
  if (source === undefined) return {}
  if (String(source).startsWith('action')) {
    return {
      action: mockAction('members', 'success', source === 'action' ? 400 : 3000),
      itemTitle: 'name',
      itemValue: 'id'
    }
  }
  return { items: source === 'empty' ? [] : ['Basic', 'Standard', 'Premium'] }
})

const fieldProps = computed(() => ({
  ...propsFromConfig(props.config, props.entry.controls),
  ...autocompleteProps.value,
  ...listeners.value
}))

const validate = async (context: any) => {
  props.log('validate()', await context.validate())
}
</script>
