<template>
  <VqTableFilter :id="String(config.id)" class="playground-filter">
    <FormBridge v-slot="{ form }">
      <div class="d-flex flex-wrap ga-3">
        <VqTextField class="flex-1-1-0" style="min-width: 180px" name="search" label="Search by name" />
        <VqAutocomplete class="flex-1-1-0" style="min-width: 180px" name="plan" label="Plan" :items="['Basic', 'Standard', 'Premium']" />
        <v-btn variant="text" class="mt-1" data-testid="reset-form" @click="form.resetForm()">Reset</v-btn>
      </div>
      <ValuePanel class="mb-3" title="Filter values" :value="form.values" />
    </FormBridge>
  </VqTableFilter>

  <VqDataTable
    v-if="config.target === 'table'"
    :id="targetId"
    :action="action"
    :headers="HEADERS"
    :items-per-page="5"
    @update:options="log('update:options', $event)"
  />
  <VqList v-else :id="targetId" :action="action" :page-size="5">
    <template #default="{ items, loading }">
      <EmptyState v-if="!items.length && !loading" title="No members" description="Nothing matches these filters." />
      <v-list-item v-for="item in items as any[]" :key="item.id" :title="item.name" :subtitle="item.plan" />
      <VqListLoadMoreBtn class="ma-2" />
    </template>
  </VqList>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  VqAutocomplete,
  VqDataTable,
  VqList,
  VqListLoadMoreBtn,
  VqTableFilter,
  VqTextField
} from '@qnx/vuetify'
import { demoProps } from './demoProps'
import { mockAction } from '../utils/mockApi'
import FormBridge from './FormBridge.vue'
import ValuePanel from './ValuePanel.vue'
import EmptyState from '../components/EmptyState.vue'

const props = defineProps(demoProps)

const HEADERS = [
  { title: 'Name', key: 'name' },
  { title: 'Plan', key: 'plan' },
  { title: 'Status', key: 'status' }
]

const targetId = computed(() =>
  props.config.mismatch ? `${props.config.id}-other` : String(props.config.id)
)
const action = computed(() =>
  mockAction('members', props.config.mockMode, props.config.mockLatency)
)
</script>
