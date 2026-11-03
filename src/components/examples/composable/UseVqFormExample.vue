<template>
  <v-container max-width="900" class="py-8">

    <!-- ── Header ──────────────────────────────────────────────── -->
    <div class="mb-8">
      <div class="d-flex align-center gap-2 mb-3">
        <v-chip size="small" color="deep-purple" variant="tonal">Composable</v-chip>
        <v-chip size="small" color="success" variant="tonal">Vuetify 4</v-chip>
      </div>
      <h1 class="text-h4 font-weight-bold mb-2">useVqForm</h1>
      <p class="text-body-1 text-medium-emphasis mb-4">
        Programmatic form control composable. Returns a typed
        <code class="text-primary">wrapper</code> component and a
        <code class="text-primary">resetForm()</code> function so you can
        control the form from <strong>outside</strong> — from a toolbar button,
        a cancel handler, or after a side-effect — without touching the template.
      </p>
      <div class="d-flex flex-wrap gap-2">
        <v-chip size="small" label variant="tonal" color="deep-purple">useVqForm</v-chip>
        <v-chip size="small" label variant="tonal" color="deep-purple">VqSubmitBtn</v-chip>
      </div>
    </div>

    <!-- ── Live Demo ────────────────────────────────────────────── -->
    <section class="mb-8">
      <div class="d-flex align-center gap-2 mb-3">
        <v-icon icon="mdi-play-circle-outline" color="deep-purple" />
        <span class="text-subtitle-1 font-weight-semibold">Live Demo</span>
      </div>
      <v-card variant="outlined" rounded="lg" border>
        <v-card-text class="pa-6">
          <ComposableForm
            action="#"
            @submited-success="handleResponse"
            @submited-error="handleResponse"
          >
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-caption text-medium-emphasis mb-1">Full Name</div>
                <vq-text-field
                  variant="outlined"
                  label="Full Name"
                  name="composableName"
                  prepend-inner-icon="mdi-account-outline"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="text-caption text-medium-emphasis mb-1">Email</div>
                <vq-text-field
                  variant="outlined"
                  label="Email"
                  name="composableEmail"
                  prepend-inner-icon="mdi-email-outline"
                />
              </v-col>
            </v-row>
            <div class="d-flex gap-3 mt-4">
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
    </section>

    <!-- ── API ──────────────────────────────────────────────────── -->
    <section class="mb-8">
      <div class="d-flex align-center gap-2 mb-3">
        <v-icon icon="mdi-tune-variant" color="deep-purple" />
        <span class="text-subtitle-1 font-weight-semibold">Composable API</span>
      </div>

      <!-- Options -->
      <div class="text-body-2 font-weight-semibold mb-2 text-medium-emphasis">Options (input)</div>
      <v-card variant="outlined" rounded="lg" border class="mb-4">
        <v-table density="comfortable">
          <thead>
            <tr class="bg-surface-variant">
              <th class="text-left font-weight-bold">Option</th>
              <th class="text-left font-weight-bold">Type</th>
              <th class="text-left font-weight-bold">Required</th>
              <th class="text-left font-weight-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in options" :key="o.name">
              <td><code class="text-primary">{{ o.name }}</code></td>
              <td><code class="text-medium-emphasis">{{ o.type }}</code></td>
              <td>{{ o.required }}</td>
              <td class="text-body-2">{{ o.desc }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Returns -->
      <div class="text-body-2 font-weight-semibold mb-2 text-medium-emphasis">Returns (output)</div>
      <v-card variant="outlined" rounded="lg" border>
        <v-table density="comfortable">
          <thead>
            <tr class="bg-surface-variant">
              <th class="text-left font-weight-bold">Key</th>
              <th class="text-left font-weight-bold">Type</th>
              <th class="text-left font-weight-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in returns" :key="r.name">
              <td><code class="text-primary">{{ r.name }}</code></td>
              <td><code class="text-medium-emphasis">{{ r.type }}</code></td>
              <td class="text-body-2">{{ r.desc }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </section>

    <!-- ── Code ─────────────────────────────────────────────────── -->
    <section>
      <div class="d-flex align-center gap-2 mb-3">
        <v-icon icon="mdi-code-tags" color="deep-purple" />
        <span class="text-subtitle-1 font-weight-semibold">Code Example</span>
      </div>
      <v-card variant="outlined" rounded="lg" border>
        <div class="d-flex align-center px-4 py-2 bg-surface-variant">
          <span class="text-caption text-medium-emphasis">Vue SFC</span>
        </div>
        <v-divider />
        <v-card-text class="pa-0">
          <pre class="text-body-2 pa-5" style="overflow-x: auto">{{ snippet }}</pre>
        </v-card-text>
      </v-card>
    </section>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { object, string } from 'yup'
import { useVqForm, VqSubmitBtn } from '@qnx/vuetify'

const { wrapper: ComposableForm, resetForm: composableResetForm } = useVqForm({
  formId: 'composable-form',
  validationSchema: object({
    composableName:  string().required().min(2).label('Full Name'),
    composableEmail: string().email().required().label('Email'),
  }),
  initialValues: ref({ composableName: '', composableEmail: '' }),
})

const handleResponse = (res: any) => alert(JSON.stringify(res))

const options = [
  { name: 'formId',           type: 'string',     required: 'Yes', desc: 'Unique ID for the form instance.' },
  { name: 'validationSchema', type: 'ObjectSchema',required: 'Yes', desc: 'A yup object schema describing each field.' },
  { name: 'initialValues',    type: 'Ref<object>', required: 'No',  desc: 'Reactive initial values — useful for edit forms.' },
]

const returns = [
  { name: 'wrapper',    type: 'Component',  desc: 'Drop-in replacement for vq-form. Use it in your template to wrap field components.' },
  { name: 'resetForm',  type: '() => void', desc: 'Resets all field values and validation state back to initialValues.' },
  { name: 'formValues', type: 'Ref<object>',desc: 'Reactive object containing the current value of every field.' },
]

const snippet = `<template>
  <!-- wrapper acts exactly like vq-form -->
  <MyForm action="/api/submit" @submited-success="onSuccess">
    <vq-text-field variant="filled" name="name"  label="Full Name" />
    <vq-text-field variant="filled" name="email" label="Email" />

    <VqSubmitBtn color="primary">Submit</VqSubmitBtn>

    <!-- Reset from anywhere in the template -->
    <v-btn variant="outlined" @click="resetForm()">Reset</v-btn>
  </MyForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { object, string } from 'yup'
import { useVqForm, VqSubmitBtn } from '@qnx/vuetify'

const { wrapper: MyForm, resetForm } = useVqForm({
  formId: 'my-form',
  validationSchema: object({
    name:  string().required().min(2).label('Full Name'),
    email: string().email().required().label('Email'),
  }),
  initialValues: ref({ name: '', email: '' }),
})

// Call resetForm() from anywhere —
// a toolbar button, a cancel handler, or after a side-effect.
const onSuccess = () => {
  doSomething()
  resetForm()
}
<\/script>`
</script>
