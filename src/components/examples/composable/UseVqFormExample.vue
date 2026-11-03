<template>
  <v-card variant="outlined" rounded="lg" border>
    <v-card-text class="pa-6">
      <ComposableForm action="users" @submited-success="onSuccess" @submited-error="onError">
        <v-row>
          <v-col cols="12" md="6">
            <vq-text-field
              variant="outlined"
              label="Full Name"
              name="composableName"
              prepend-inner-icon="mdi-account-outline"
            />
          </v-col>
          <v-col cols="12" md="6">
            <vq-text-field
              variant="outlined"
              label="Email"
              name="composableEmail"
              prepend-inner-icon="mdi-email-outline"
            />
          </v-col>
        </v-row>
        <v-alert v-if="message" variant="tonal" class="mb-4">{{ message }}</v-alert>
        <div class="d-flex ga-3">
          <VqSubmitBtn color="deep-purple">
            <v-icon start icon="mdi-send" />Submit
          </VqSubmitBtn>
          <v-btn variant="outlined" @click="composableResetForm()">
            <v-icon start icon="mdi-refresh" />Reset (programmatic)
          </v-btn>
        </div>
      </ComposableForm>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { object, string } from 'yup'
import { useVqForm, VqSubmitBtn } from '@qnx/vuetify'
import type { ApiResponse } from '@qnx/composables'

const { wrapper: ComposableForm, resetForm: composableResetForm } = useVqForm({
  formId: 'composable-form',
  validationSchema: object({
    composableName: string().required().min(2).label('Full Name'),
    composableEmail: string().email().required().label('Email'),
  }),
  // Must be a ref in 0.8.5: a plain object or no value logs a Vue warning.
  initialValues: ref({ composableName: '', composableEmail: '' }),
})

const message = ref<string>()

const onSuccess = (res: ApiResponse) => {
  message.value = res.getMessage()
  composableResetForm()
}

const onError = (res: ApiResponse) => {
  message.value = res.getMessage()
}
</script>
