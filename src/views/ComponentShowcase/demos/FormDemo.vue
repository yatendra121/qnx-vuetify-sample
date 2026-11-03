<template>
  <VqForm
    :id="formId"
    :action="mockAction(String(config.action ?? 'members'), config.mockMode, config.mockLatency)"
    :method="(String(config.method ?? 'POST') as any)"
    :form-data="!!config.formData"
    :initial-values="initialValues"
    :validation-schema="schema"
    :success-response-handler="handlers.success"
    :error-response-handler="handlers.error"
    @submited-success="log('submitedSuccess', describe($event))"
    @submited-error="log('submitedError', describe($event))"
    @submited-client-error="log('submitedClientError')"
  >
    <FormBridge v-slot="{ form }">
      <VqTextField name="name" label="Name" />
      <VqTextField name="email" label="Email" />
      <template v-if="!isButtonDemo || !config.outside">
        <div class="d-flex flex-wrap ga-2 mb-3">
          <VqSubmitBtn v-bind="buttonProps" @click="log('click')">
            <template v-if="slotExamples.length" #default>
              <span class="showcase-slot">{{ slotExamples[0].content }}</span>
            </template>
          </VqSubmitBtn>
          <v-btn v-if="!compact" variant="text" data-testid="reset-form" @click="form.resetForm()">Reset form</v-btn>
        </div>
      </template>
      <ValuePanel v-if="!compact" title="Form state" :value="{ values: form.values, errors: form.errors.value, isSubmitting: form.isSubmitting.value }" />
    </FormBridge>
  </VqForm>
  <VqSubmitBtn v-if="isButtonDemo && config.outside" class="mt-3" :form="formId" v-bind="buttonProps" @click="log('click')" />
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { VqForm, VqSubmitBtn, VqTextField } from '@qnx/vuetify'
import { object, string } from 'yup'
import { demoProps } from './demoProps'
import { propsFromConfig } from '../utils/codegen'
import { mockAction } from '../utils/mockApi'
import FormBridge from './FormBridge.vue'
import ValuePanel from './ValuePanel.vue'

const props = defineProps(demoProps)

const uid = useId()
const isButtonDemo = computed(() => props.entry.name === 'VqSubmitBtn')
const formId = computed(() => (isButtonDemo.value ? `showcase-form-${uid}` : String(props.config.id)))

const schema = computed(() =>
  props.config.withSchema
    ? object({ name: string().required(), email: string().required().email() })
    : undefined
)

const initialValues = computed(() =>
  props.config.withInitial || isButtonDemo.value
    ? { name: 'Asha Rao', email: 'asha@example.com' }
    : undefined
)

const handlers = computed(() =>
  props.config.withHandlers
    ? {
        success: (response: unknown) => props.log('successResponseHandler', response),
        error: (error: any) => props.log('errorResponseHandler', { status: error?.response?.status, message: error?.message })
      }
    : { success: undefined, error: undefined }
)

const buttonProps = computed(() =>
  isButtonDemo.value
    ? propsFromConfig(props.config, props.entry.controls)
    : { text: 'Save' }
)

const describe = (response: any) => ({
  message: response?.getMessage?.(),
  errors: response?.getErrors?.(),
  data: response?.getData?.() ?? response?.data
})
</script>
