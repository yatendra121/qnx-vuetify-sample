<template>
  <div class="d-flex flex-column ga-5" data-testid="api-reference">
    <section v-if="entry.signature">
      <h3 class="text-title-small mb-2">Signature</h3>
      <pre class="playground-code playground-code--small">{{ entry.signature }}</pre>
    </section>

    <section v-if="entry.params?.length">
      <h3 class="text-title-small mb-2">Parameters</h3>
      <DocTable :rows="entry.params" />
    </section>

    <section v-if="entry.returns?.length">
      <h3 class="text-title-small mb-2">Returns</h3>
      <DocTable :rows="entry.returns" />
    </section>

    <section v-if="ownProps.length || entry.component">
      <h3 class="text-title-small mb-2">Props</h3>
      <p v-if="!ownProps.length" class="text-body-medium text-medium-emphasis">Declares no props of its own.</p>
      <v-table v-else density="compact" class="playground-table">
        <thead>
          <tr><th>Name</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr v-for="prop in ownProps" :key="prop.name" :data-testid="`prop-${prop.name}`">
            <td><code>{{ prop.name }}</code><span v-if="prop.required" class="text-error" title="Required"> *</span></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.defaultValue }}</code></td>
            <td class="playground-table__wrap"><RichText :text="entry.propDocs?.[prop.name]" /></td>
          </tr>
        </tbody>
      </v-table>
    </section>

    <section>
      <h3 class="text-title-small mb-2">Events</h3>
      <DocTable v-if="entry.events.length" :rows="entry.events" payload />
      <p v-else class="text-body-medium text-medium-emphasis">Emits no events.</p>
      <p v-if="otherEmits.length" class="text-body-small text-medium-emphasis mt-2">
        Also forwarded from {{ entry.wraps?.name }}: <code>{{ otherEmits.join(', ') }}</code>
      </p>
    </section>

    <section>
      <h3 class="text-title-small mb-2">Slots</h3>
      <v-table v-if="entry.slots.length" density="compact" class="playground-table">
        <thead><tr><th>Name</th><th>Slot props</th><th>Usage</th></tr></thead>
        <tbody>
          <tr v-for="slot in entry.slots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td><code>{{ slot.scope ?? '—' }}</code></td>
            <td class="playground-table__wrap"><RichText :text="slot.description" /></td>
          </tr>
        </tbody>
      </v-table>
      <p v-else class="text-body-medium text-medium-emphasis">Renders no slots.</p>
    </section>

    <section v-if="inherited.length">
      <v-expansion-panels variant="accordion" flat>
        <v-expansion-panel>
          <v-expansion-panel-title data-testid="inherited-toggle">
            Inherited from {{ entry.wraps?.name }} ({{ inherited.length }} props, passed through as attributes)
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field v-model="filter" label="Filter props" density="compact" hide-details class="mb-2" />
            <v-table density="compact" class="playground-table">
              <thead><tr><th>Name</th><th>Type</th><th>Default</th></tr></thead>
              <tbody>
                <tr v-for="prop in filteredInherited" :key="prop.name">
                  <td><code>{{ prop.name }}</code></td>
                  <td><code>{{ prop.type }}</code></td>
                  <td><code>{{ prop.defaultValue }}</code></td>
                </tr>
              </tbody>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PlaygroundEntry } from '../types'
import { reflectEmits, reflectProps } from '../utils/reflect'
import DocTable from './DocTable.vue'
import { RichText } from './RichText'

const props = defineProps<{ entry: PlaygroundEntry }>()

const filter = ref<string | null>('')

const ownProps = computed(() => reflectProps(props.entry.component))
const inherited = computed(() => {
  const own = new Set(ownProps.value.map((prop) => prop.name))
  return reflectProps(props.entry.wraps?.component).filter((prop) => !own.has(prop.name))
})
const filteredInherited = computed(() => {
  const term = (filter.value ?? '').toLowerCase()
  return inherited.value.filter((prop) => prop.name.toLowerCase().includes(term))
})
const otherEmits = computed(() => {
  const documented = new Set(props.entry.events.map((event) => event.name))
  return reflectEmits(props.entry.wraps?.component).filter((name) => !documented.has(name))
})
</script>
