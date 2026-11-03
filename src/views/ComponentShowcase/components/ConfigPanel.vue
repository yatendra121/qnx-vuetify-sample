<template>
  <v-card>
    <v-card-item>
      <v-card-title class="text-title-medium">Configuration</v-card-title>
      <template #append>
        <v-btn size="small" variant="text" prepend-icon="mdi-restore" data-testid="reset-config" @click="$emit('reset')">
          Reset
        </v-btn>
      </template>
    </v-card-item>
    <v-divider />
    <v-card-text class="showcase-config">
      <p v-if="!controls.length" class="text-body-medium text-medium-emphasis">
        This export has nothing to configure.
      </p>
      <template v-for="group in groups" :key="group.title">
        <div class="text-label-medium text-medium-emphasis mb-2">{{ group.title }}</div>
        <template v-for="control in group.controls" :key="control.key">
          <v-switch
            v-if="control.type === 'boolean'"
            :model-value="!!config[control.key]"
            :label="control.label"
            :data-testid="`control-${control.key}`"
            color="primary"
            density="compact"
            :hint="control.hint"
            :persistent-hint="!!control.hint"
            :hide-details="!control.hint"
            class="mb-1"
            @update:model-value="update(control.key, !!$event)"
          />
          <v-select
            v-else-if="control.type === 'select'"
            :model-value="config[control.key]"
            :items="optionsOf(control)"
            :label="control.label"
            :data-testid="`control-${control.key}`"
            density="compact"
            hide-details
            class="mb-3"
            @update:model-value="update(control.key, $event)"
          />
          <v-text-field
            v-else
            :model-value="config[control.key]"
            :type="control.type === 'number' ? 'number' : 'text'"
            :label="control.label"
            :hint="control.hint"
            :persistent-hint="!!control.hint"
            :hide-details="!control.hint"
            :clearable="false"
            :data-testid="`control-${control.key}`"
            density="compact"
            class="mb-3"
            @update:model-value="update(control.key, control.type === 'number' ? Number($event) : String($event))"
          />
        </template>
      </template>

      <template v-if="slotExamples.length">
        <div class="text-label-medium text-medium-emphasis mb-2">Slot examples</div>
        <v-checkbox
          v-for="slot in slotExamples"
          :key="slot.name"
          :model-value="activeSlots.includes(slot.name)"
          :label="`#${slot.name}`"
          :data-testid="`slot-${slot.name}`"
          color="primary"
          density="compact"
          hide-details
          @update:model-value="$emit('toggle-slot', slot.name)"
        />
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ConfigValue, ControlDef, ShowcaseConfig, SlotExample } from '../types'

const props = defineProps<{
  controls: ControlDef[]
  config: ShowcaseConfig
  slotExamples: SlotExample[]
  activeSlots: string[]
}>()

const emit = defineEmits<{
  update: [key: string, value: ConfigValue]
  reset: []
  'toggle-slot': [name: string]
}>()

const groups = computed(() =>
  [
    {
      title: 'Props',
      controls: props.controls.filter((item) => (item.scope ?? 'prop') === 'prop')
    },
    {
      title: 'Scenario',
      controls: props.controls.filter((item) => item.scope === 'scenario')
    }
  ].filter((group) => group.controls.length)
)

const optionsOf = (control: ControlDef) =>
  (control.options ?? []).map((value) => ({
    value,
    title: value === '' ? '(default)' : value
  }))

const update = (key: string, value: ConfigValue) => emit('update', key, value)
</script>
