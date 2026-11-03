<template>
  <div>
    <div class="d-flex flex-wrap align-center ga-2 mb-2">
      <v-btn-toggle v-model="view" mandatory density="compact" variant="outlined" color="primary" divided>
        <v-btn value="sfc" size="small">SFC</v-btn>
        <v-btn value="template" size="small">Template</v-btn>
        <v-btn value="script" size="small">Script</v-btn>
      </v-btn-toggle>
      <v-spacer />
      <CopyButton :text="current" test-id="copy-code" />
    </div>
    <pre class="playground-code" data-testid="code-sample"><code>{{ current }}</code></pre>
    <p class="text-body-small text-medium-emphasis mt-2">
      Generated from the current configuration. The sample shows a real-looking <code>action</code>, while the preview answers from the built-in mock.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CodeSample } from '../types'
import { scriptOf, sfcOf } from '../utils/codegen'
import CopyButton from './CopyButton.vue'

const props = defineProps<{ sample: CodeSample }>()

const view = ref<'sfc' | 'template' | 'script'>('sfc')
const current = computed(() => {
  if (view.value === 'template') return props.sample.template
  if (view.value === 'script') return scriptOf(props.sample)
  return sfcOf(props.sample)
})
</script>
