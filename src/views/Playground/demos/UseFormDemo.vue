<template>
  <MemberForm
    :action="mockAction('members', config.mockMode, config.mockLatency)"
    :method="String(config.method)"
    @submited-success="log('submitedSuccess', $event)"
    @submited-error="log('submitedError', $event)"
  >
    <VqTextField name="name" label="Name" />
    <VqTextField name="email" label="Email" />
    <div class="d-flex flex-wrap ga-2 mb-3">
      <VqSubmitBtn text="Save" />
      <v-btn variant="tonal" data-testid="reset-values" @click="resetToSample">resetForm({ values })</v-btn>
      <v-btn variant="text" data-testid="change-initial" @click="changeInitial">Change initialValues ref</v-btn>
      <v-btn variant="text" data-testid="reset-form" @click="clear">resetForm()</v-btn>
    </div>
    <FormBridge v-slot="{ form }">
      <ValuePanel title="Form state" :value="{ values: form.values, errors: form.errors.value }" />
    </FormBridge>
  </MemberForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VqSubmitBtn, VqTextField, useVqForm } from '@qnx/vuetify'
import { object, string } from 'yup'
import { demoProps } from './demoProps'
import { mockAction } from '../utils/mockApi'
import FormBridge from './FormBridge.vue'
import ValuePanel from './ValuePanel.vue'

const props = defineProps(demoProps)

const initialValues = ref({ name: '', email: '' })
const { wrapper: MemberForm, resetForm } = useVqForm({
  formId: String(props.config.formId),
  validationSchema: object({ name: string().required(), email: string().email() }),
  initialValues
})

const SAMPLE = { name: 'Asha Rao', email: 'asha@example.com' }
resetForm({ values: SAMPLE })

const resetToSample = () => {
  resetForm({ values: SAMPLE })
  props.log('resetForm', SAMPLE)
}
const changeInitial = () => {
  initialValues.value = { name: 'Ben Silva', email: 'ben@example.com' }
  props.log('initialValues changed', initialValues.value)
}
const clear = () => {
  resetForm()
  props.log('resetForm')
}
</script>
