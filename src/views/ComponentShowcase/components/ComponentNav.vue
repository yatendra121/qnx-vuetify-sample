<template>
  <div class="d-flex flex-column ga-2 h-100">
    <v-text-field
      v-model="search"
      label="Search components"
      class="flex-grow-0"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      hide-details
      data-testid="component-search"
    />
    <v-list nav density="compact" class="pa-0 flex-1-1 overflow-y-auto" aria-label="Library components">
      <template v-for="group in groups" :key="group.title">
        <v-list-subheader class="text-uppercase font-weight-bold">{{ group.title }}</v-list-subheader>
        <v-list-item
          v-for="entry in group.entries"
          :key="entry.name"
          :active="entry.name === selected"
          color="primary"
          rounded="lg"
          :data-testid="`nav-${entry.name}`"
          @click="$emit('select', entry.name)"
        >
          <v-list-item-title class="text-body-medium">{{ entry.name }}</v-list-item-title>
          <template v-if="entry.kind !== 'component'" #append>
            <span class="text-label-small text-medium-emphasis">{{ entry.kind }}</span>
          </template>
        </v-list-item>
      </template>
      <EmptyState
        v-if="!groups.length"
        title="No matches"
        description="Try a shorter name, or search by what the component wraps."
      />
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { catalog, categoryOrder } from '../catalog'
import EmptyState from './EmptyState.vue'

defineProps<{ selected: string }>()
defineEmits<{ select: [name: string] }>()

const search = ref<string | null>('')

const groups = computed(() => {
  const term = (search.value ?? '').trim().toLowerCase()
  const matches = catalog.filter((entry) =>
    [entry.name, entry.category, entry.kind, entry.wraps?.name ?? '']
      .join(' ')
      .toLowerCase()
      .includes(term)
  )
  return categoryOrder
    .map((title) => ({
      title,
      entries: matches.filter((entry) => entry.category === title)
    }))
    .filter((group) => group.entries.length)
})
</script>
