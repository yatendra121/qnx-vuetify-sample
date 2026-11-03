<template>
  <v-alert
    v-if="coverageReport.missing.length"
    type="error"
    variant="tonal"
    density="compact"
    class="mb-4"
    data-testid="coverage-missing"
  >
    Not covered yet: {{ coverageReport.missing.join(', ') }}
  </v-alert>

  <v-alert
    v-if="documentedButNotExported.length"
    type="warning"
    variant="tonal"
    density="compact"
    class="mb-4"
    closable
    data-testid="not-exported"
  >
    <span class="text-body-small">
      The library README documents {{ documentedButNotExported.join(', ') }}, but version
      {{ libraryVersion }} does not export it, so there is nothing to preview.
    </span>
  </v-alert>

  <div class="showcase">
    <aside v-if="!mobile" class="showcase__nav">
      <ComponentNav :selected="entry.name" @select="select" />
    </aside>

    <main class="showcase__main">
      <v-btn
        v-if="mobile"
        block
        variant="tonal"
        class="mb-3"
        prepend-icon="mdi-view-list"
        data-testid="open-nav"
        @click="navOpen = true"
      >
        {{ entry.name }}: change component
      </v-btn>

      <header class="mb-4">
        <div class="d-flex flex-wrap align-center ga-2 mb-1">
          <h2 class="text-title-large font-weight-bold" data-testid="entry-name">{{ entry.name }}</h2>
          <v-chip size="x-small" variant="tonal" color="primary">{{ entry.kind }}</v-chip>
          <v-chip v-if="entry.wraps" size="x-small" variant="tonal">wraps {{ entry.wraps.name }}</v-chip>
        </div>
        <p class="text-body-medium text-medium-emphasis mb-2"><RichText :text="entry.description" /></p>
        <code class="showcase-inline-code">{{ importLine }}</code>
      </header>

      <v-alert
        v-if="entry.notes?.length"
        type="info"
        variant="tonal"
        density="compact"
        class="mb-4"
      >
        <div class="text-title-small mb-1">Behaviour in the installed version</div>
        <ul class="ps-4">
          <li v-for="note in entry.notes" :key="note" class="text-body-small">
            <RichText :text="note" />
          </li>
        </ul>
      </v-alert>

      <div class="showcase__grid">
          <v-card class="showcase__preview-card">
            <v-card-item>
              <v-card-title class="text-title-medium">Preview</v-card-title>
              <template #append>
                <v-btn size="small" variant="text" prepend-icon="mdi-refresh" data-testid="remount" @click="nonce++">
                  Remount
                </v-btn>
              </template>
            </v-card-item>
            <div v-if="entry.presets.length" class="d-flex flex-wrap ga-2 px-4 pb-3" data-testid="presets">
              <v-chip
                v-for="preset in entry.presets"
                :key="preset.label"
                size="small"
                :color="activePreset === preset.label ? 'primary' : undefined"
                :variant="activePreset === preset.label ? 'flat' : 'outlined'"
                :data-testid="`preset-${preset.label}`"
                @click="applyPreset(preset)"
              >
                {{ preset.label }}
              </v-chip>
            </div>
            <v-divider />
            <v-card-text class="showcase__preview" data-testid="preview">
              <component
                :is="demos[entry.demo]"
                :key="previewKey"
                :entry="entry"
                :config="config"
                :slot-examples="enabledSlots"
                :field-error="fieldError"
                :log="logEvent"
              />
            </v-card-text>
          </v-card>

          <v-card class="showcase__tabs-card">
            <v-tabs v-model="tab" density="compact" color="primary" show-arrows>
              <v-tab value="code" data-testid="tab-code">Code</v-tab>
              <v-tab value="api" data-testid="tab-api">API</v-tab>
              <v-tab v-if="entry.gallery" value="states" data-testid="tab-states">States</v-tab>
              <v-tab value="examples" data-testid="tab-examples">Examples</v-tab>
            </v-tabs>
            <v-divider />
            <v-card-text>
              <CodePanel v-if="tab === 'code'" :sample="codeSample" />
              <ApiReference v-else-if="tab === 'api'" :entry="entry" />
              <div v-else-if="tab === 'states'" class="showcase__gallery" data-testid="states-gallery">
                <div v-for="preset in entry.presets" :key="preset.label">
                  <div class="text-label-medium text-medium-emphasis mb-2">{{ preset.label }}</div>
                  <component
                    :is="demos[entry.demo]"
                    :entry="entry"
                    :config="presetConfig(preset)"
                    :slot-examples="[]"
                    :field-error="preset.fieldError"
                    :log="logEvent"
                    compact
                  />
                </div>
              </div>
              <div v-else class="d-flex flex-column ga-5" data-testid="examples">
                <section v-for="example in entry.examples" :key="example.title">
                  <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-2">
                    <div>
                      <h3 class="text-title-small">{{ example.title }}</h3>
                      <p class="text-body-small text-medium-emphasis"><RichText :text="example.description" /></p>
                    </div>
                    <CopyButton :text="example.code" />
                  </div>
                  <pre class="showcase-code"><code>{{ example.code }}</code></pre>
                </section>
              </div>
            </v-card-text>
          </v-card>

        <div class="showcase__secondary">
          <ConfigPanel
            :controls="entry.controls"
            :config="config"
            :slot-examples="entry.slotExamples ?? []"
            :active-slots="activeSlots"
            @update="updateConfig"
            @reset="resetConfig"
            @toggle-slot="toggleSlot"
          />
          <EventInspector :events="events" @clear="events = []" />
        </div>
      </div>
    </main>
  </div>

  <v-dialog v-model="navOpen" fullscreen>
    <v-card>
      <v-card-item>
        <v-card-title>Components</v-card-title>
        <template #append>
          <v-btn icon="mdi-close" variant="text" aria-label="Close" data-testid="close-nav" @click="navOpen = false" />
        </template>
      </v-card-item>
      <v-card-text class="showcase__nav-dialog">
        <ComponentNav :selected="entry.name" @select="select" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { version as libraryVersion } from '@qnx/vuetify/package.json'
import { catalog, coverage, documentedButNotExported } from './catalog'
import type { ConfigValue, Preset, ShowcaseConfig, ShowcaseEntry } from './types'
import { installMockApi } from './utils/mockApi'
import { printJson } from './utils/reflect'
import ApiReference from './components/ApiReference.vue'
import CodePanel from './components/CodePanel.vue'
import ComponentNav from './components/ComponentNav.vue'
import ConfigPanel from './components/ConfigPanel.vue'
import CopyButton from './components/CopyButton.vue'
import { RichText } from './components/RichText'
import EventInspector from './components/EventInspector.vue'
import type { LoggedEvent } from './components/EventInspector.vue'
import FieldDemo from './demos/FieldDemo.vue'
import FilterDemo from './demos/FilterDemo.vue'
import FormDemo from './demos/FormDemo.vue'
import ListDemo from './demos/ListDemo.vue'
import LocaleDemo from './demos/LocaleDemo.vue'
import PluginDemo from './demos/PluginDemo.vue'
import TableDemo from './demos/TableDemo.vue'
import UseFormDemo from './demos/UseFormDemo.vue'

const demos = {
  field: FieldDemo,
  form: FormDemo,
  useForm: UseFormDemo,
  table: TableDemo,
  list: ListDemo,
  filter: FilterDemo,
  locale: LocaleDemo,
  plugin: PluginDemo
}

const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()
const coverageReport = coverage()
const navOpen = ref(false)

// In the query, so a selected component can be linked to directly.
const entry = computed<ShowcaseEntry>(
  () =>
    catalog.find((item) => item.name === route.query.component) ?? catalog[0]
)

const select = (name: string) => {
  navOpen.value = false
  router.replace({ query: { component: name } })
}

const importLine = computed(() => {
  const { exportName, importPath, name } = entry.value
  const clause =
    exportName === 'default' ? name.split(' ')[0] : `{ ${exportName} }`
  return `import ${clause} from '${importPath}'`
})

const defaultsOf = (item: ShowcaseEntry): ShowcaseConfig =>
  Object.fromEntries(item.controls.map((control) => [control.key, control.default]))

const config = ref<ShowcaseConfig>(defaultsOf(entry.value))
const activeSlots = ref<string[]>([])
const fieldError = ref<string>()
const activePreset = ref<string>()
const nonce = ref(0)
const tab = ref('code')
const events = ref<LoggedEvent[]>([])

let eventId = 0
const logEvent = (name: string, payload?: unknown) => {
  events.value = [
    {
      id: ++eventId,
      name,
      time: new Date().toLocaleTimeString(),
      payload: printJson(payload)
    },
    ...events.value
  ].slice(0, 100)
}

onBeforeUnmount(installMockApi((summary) => logEvent('request', summary)))

const resetConfig = () => {
  config.value = defaultsOf(entry.value)
  activeSlots.value = []
  fieldError.value = undefined
  activePreset.value = undefined
  nonce.value++
}

const updateConfig = (key: string, value: ConfigValue) => {
  config.value = { ...config.value, [key]: value }
  activePreset.value = undefined
}

const presetConfig = (preset: Preset) => ({
  ...defaultsOf(entry.value),
  ...preset.config
})

const applyPreset = (preset: Preset) => {
  config.value = presetConfig(preset)
  fieldError.value = preset.fieldError
  activePreset.value = preset.label
  nonce.value++
}

const toggleSlot = (name: string) => {
  activeSlots.value = activeSlots.value.includes(name)
    ? activeSlots.value.filter((item) => item !== name)
    : [...activeSlots.value, name]
}

watch(
  () => entry.value.name,
  () => {
    resetConfig()
    events.value = []
    if (tab.value === 'states' && !entry.value.gallery) tab.value = 'code'
  }
)

const enabledSlots = computed(() =>
  (entry.value.slotExamples ?? []).filter((slot) =>
    activeSlots.value.includes(slot.name)
  )
)

// Props the library reads once in setup() only take effect on a fresh instance.
const previewKey = computed(() => {
  const remountValues = entry.value.controls
    .filter((control) => control.remount)
    .map((control) => config.value[control.key])
  return `${entry.value.name}:${nonce.value}:${JSON.stringify(remountValues)}`
})

const codeSample = computed(() =>
  entry.value.code({
    config: config.value,
    controls: entry.value.controls,
    slots: enabledSlots.value
  })
)
</script>

<style>
.showcase {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

@media (min-width: 960px) {
  .showcase {
    grid-template-columns: 260px minmax(0, 1fr);
  }
}

.showcase__nav {
  align-self: start;
  height: calc(100vh - 112px);
  position: sticky;
  top: 88px;
}

.showcase__nav-dialog {
  height: calc(100vh - 72px);
}

.showcase__main {
  container-type: inline-size;
  min-width: 0;
}

.showcase__grid {
  display: grid;
  gap: 16px;
  /* Narrow: configuration stays next to the preview it controls. */
  grid-template-areas: 'preview' 'side' 'tabs';
  grid-template-columns: minmax(0, 1fr);
}

.showcase__secondary {
  display: flex;
  flex-direction: column;
  gap: 16px;
  grid-area: side;
  min-width: 0;
}

.showcase__preview-card {
  grid-area: preview;
  min-width: 0;
}

.showcase__tabs-card {
  grid-area: tabs;
  min-width: 0;
}

.showcase__preview {
  overflow-x: auto;
}

.showcase__gallery {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

@container (min-width: 800px) {
  .showcase__grid {
    align-items: start;
    grid-template-areas: 'preview side' 'tabs side';
    grid-template-columns: minmax(0, 1fr) 300px;
    grid-template-rows: auto 1fr;
  }
}

.showcase-config {
  max-height: 460px;
  overflow-y: auto;
}

.showcase-events {
  max-height: 360px;
  overflow-y: auto;
}

.showcase-event {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding: 8px 16px;
}

.showcase-event summary {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 0.8125rem;
  gap: 8px;
  overflow-wrap: anywhere;
}

.showcase-event pre {
  margin-top: 6px;
}

.showcase-code {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8125rem;
  line-height: 1.5;
  overflow-x: auto;
  padding: 12px;
  white-space: pre;
}

.showcase-code--small {
  font-size: 0.75rem;
  max-height: 220px;
  overflow-y: auto;
  padding: 8px;
}

.showcase-inline-code {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 6px;
  display: inline-block;
  font-size: 0.8125rem;
  max-width: 100%;
  overflow-wrap: anywhere;
  padding: 2px 8px;
}

/* Makes it obvious which outlet a slot example landed in. */
.showcase-slot {
  background: rgba(var(--v-theme-primary), 0.12);
  border: 1px dashed rgb(var(--v-theme-primary));
  border-radius: 4px;
  color: rgb(var(--v-theme-primary));
  font-size: 0.75rem;
  line-height: 1.4;
  padding: 1px 6px;
  white-space: nowrap;
}

.showcase-table code {
  font-size: 0.75rem;
  overflow-wrap: anywhere;
}

.showcase-table th,
.showcase-table td {
  padding-block: 6px !important;
  vertical-align: top;
}

.showcase-table .showcase-table__wrap {
  min-width: 200px;
}
</style>
