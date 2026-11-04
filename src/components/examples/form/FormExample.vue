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
      action="users"
      :validation-schema="userSchema"
      @submited-success="onSuccess"
      @submited-error="onError"
    >
      <TextInputsCard />
      <AutocompleteCard />
      <DateTimeColorCard />
      <FileInputsCard />
      <ToggleInputsCard />

      <v-alert v-if="result" :type="result.type" variant="tonal" class="mb-4">
        {{ result.message }}
      </v-alert>

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
import { ref } from 'vue'
import { object, string, number, array, boolean, date, mixed } from 'yup'
import { VqSubmitBtn } from '@qnx/vuetify'
import type { ApiResponse } from '@qnx/composables'

import TextInputsCard from './TextInputsCard.vue'
import AutocompleteCard from './AutocompleteCard.vue'
import DateTimeColorCard from './DateTimeColorCard.vue'
import FileInputsCard from './FileInputsCard.vue'
import ToggleInputsCard from './ToggleInputsCard.vue'

// ── Validation schema ──────────────────────────────────────────────────────
// Only name and email are required, so the demo is quick to submit.
const userSchema = object({
  // Text inputs
  name:     string().required().min(2).max(50).label('Full Name'),
  email:    string().email().required().label('E-mail'),
  mobileNo: number().typeError('Mobile Number must be a number').label('Mobile Number'),
  address:  string().label('Address'),

  // Autocomplete
  gender: string().oneOf(['male', 'female', 'other']).label('Gender'),
  roles:  array().of(string()).label('Roles'),
  userId: number().label('User'),

  // Date / Time / Color
  date:  date().label('Date'),
  time:  string().label('Time'),
  color: string().label('Color'),

  // File: VqFileInput stores its value under `name[file]`
  'file[file]': mixed().label('Attachment'),

  // Toggles
  isAdmin: boolean().label('Is Admin'),
})

// ── Response handlers ──────────────────────────────────────────────────────
const result = ref<{ type: 'success' | 'error'; message?: string }>()

const onSuccess = (res: ApiResponse) => {
  result.value = { type: 'success', message: res.getMessage() }
}

// Submit the name "taken" to see a server error land on its field.
const onError = (res: ApiResponse) => {
  result.value = { type: 'error', message: res.getMessage() }
}
</script>
