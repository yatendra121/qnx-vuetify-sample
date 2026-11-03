<template>
  <template v-if="entry.name === 'setConfig'">
    <p class="text-body-medium mb-3">
      Default script URL for VqTextEditor:
      <code data-testid="editor-url" class="playground-inline-code">{{ scriptUrl }}</code>
    </p>
    <div class="d-flex flex-wrap ga-2">
      <v-btn color="primary" data-testid="apply-config" @click="applyConfig">setConfig({ baseUrl })</v-btn>
      <v-btn variant="text" data-testid="restore-config" @click="restore">Restore app value</v-btn>
    </div>
  </template>

  <template v-else>
    <p class="text-body-medium mb-3">Global registrations on this app, read from its component registry:</p>
    <div class="d-flex flex-wrap ga-2" data-testid="registered-components">
      <v-chip
        v-for="item in registered"
        :key="item.name"
        size="small"
        :color="item.installed ? 'success' : 'error'"
        variant="tonal"
      >
        {{ item.name }}
      </v-chip>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, ref } from 'vue'
import * as library from '@qnx/vuetify'
import * as integrations from '@qnx/vuetify/integrations'
import { TINYMCE_BASE_URL } from '@/plugins/tinymce'
import { demoProps } from './demoProps'

const props = defineProps(demoProps)

const source = computed(() =>
  props.entry.importPath === '@qnx/vuetify' ? library : integrations
)
const appComponents = getCurrentInstance()?.appContext.components ?? {}
const registered = computed(() =>
  Object.keys(source.value)
    .filter((name) => name.startsWith('Vq'))
    .map((name) => ({ name, installed: name in appComponents }))
)

const readUrl = () => {
  const { baseUrl, filesPath } = integrations.VqTextEditor.props
  return `${baseUrl.default()}${filesPath.default()}`
}
const scriptUrl = ref(readUrl())

const applyConfig = () => {
  integrations.setConfig({ baseUrl: String(props.config.baseUrl) })
  scriptUrl.value = readUrl()
  props.log('setConfig', { baseUrl: props.config.baseUrl })
}
const restore = () => {
  integrations.setConfig({ baseUrl: TINYMCE_BASE_URL })
  scriptUrl.value = readUrl()
}

onBeforeUnmount(() => {
  if (props.entry.name === 'setConfig') restore()
})
</script>
