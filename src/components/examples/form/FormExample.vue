<template>
  <v-container max-width="1000" class="py-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="text-h6 font-weight-bold">Form Components</div>
      <div class="text-body-2 text-medium-emphasis mt-1">
        All <code class="text-primary">@qnx/vuetify</code> input components with
        vee-validate + yup schema validation.
      </div>
    </div>

    <!-- All input cards are wrapped in a single VqForm -->
    <vq-form
      id="showcase-form"
      action="https://nx-next-ecommerce-production.up.railway.app/api/user"
      :validation-schema="userSchema"
      :error-response-handler="errorHandler"
      @submited-success="handleResponse"
      @submited-client-error="handleResponse"
      @submited-error="handleResponse"
    >
      <TextInputsCard />
      <AutocompleteCard />
      <DateTimeColorCard />
      <FileInputsCard />
      <ToggleInputsCard />

      <!-- Submit -->
      <v-card variant="outlined" rounded="lg" border>
        <v-card-text>
          <VqSubmitBtn block color="primary">
            <v-icon start icon="mdi-send" />
            Submit Form
          </VqSubmitBtn>
        </v-card-text>
      </v-card>
    </vq-form>
  </v-container>
</template>

<script setup lang="ts">
import { object, string, number, array, boolean, mixed } from 'yup'
import { VqSubmitBtn } from '@qnx/vuetify'
import type { ApiResponseValue } from '@qnx/composables'
import type { AxiosError } from 'axios'

import TextInputsCard from './TextInputsCard.vue'
import AutocompleteCard from './AutocompleteCard.vue'
import DateTimeColorCard from './DateTimeColorCard.vue'
import FileInputsCard from './FileInputsCard.vue'
import ToggleInputsCard from './ToggleInputsCard.vue'

// ── Validation schema ──────────────────────────────────────────────────────
const userSchema = object({
  // Text inputs
  name:     string().required().min(2).max(50).label('Full Name'),
  email:    string().email().required().label('E-mail'),
  mobileNo: number().typeError('Mobile Number must be a number').required().label('Mobile Number'),
  address:  string().required().min(5).label('Address'),
  otp:      string().required().length(6, 'OTP must be exactly 6 digits').label('OTP'),

  // Autocomplete
  gender: string().required().oneOf(['male', 'female', 'other']).label('Gender'),
  roles:  array().of(string()).min(1, 'Select at least one role').required().label('Roles'),
  userId: string().required().label('User'),

  // Date / Time / Color
  date:  string().required().label('Date'),
  time:  string().required().label('Time'),
  color: string().required().label('Color'),

  // File
  file: mixed().required().label('Attachment'),

  // Toggles
  isAdmin: boolean().label('Is Admin'),
})

// ── Response handlers ──────────────────────────────────────────────────────
const handleResponse = (res: any) => {
  alert(JSON.stringify(res))
}

const errorHandler = (res: AxiosError<ApiResponseValue>) => {
  alert(JSON.stringify(res.response?.data))
}
</script>
