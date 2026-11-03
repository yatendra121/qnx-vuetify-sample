<template>
  <template v-if="repository">
    <VqTableFilter :id="listId">
      <VqTextField name="search" label="Search" />
    </VqTableFilter>
    <div class="d-flex flex-wrap ga-2 mb-3">
      <v-btn size="small" color="primary" data-testid="repo-reload" @click="reloadList">reload()</v-btn>
      <v-btn size="small" variant="tonal" data-testid="repo-reset" @click="resetList">reset()</v-btn>
    </div>
  </template>

  <component :is="listComponent" :id="listId" :action="action" v-bind="listProps">
    <template #default="scope">
      <div v-if="scope.loading && !scope.items.length" class="pa-4">
        <v-progress-linear indeterminate color="primary" />
      </div>
      <EmptyState
        v-else-if="!scope.items.length"
        title="No members"
        description="The default slot decides what an empty or failed list looks like."
      />
      <v-list-item
        v-for="item in scope.items as any[]"
        :key="item.id"
        :title="item.name"
        :subtitle="item.email"
      />
      <div class="pa-2">
        <VqListLoadMoreBtn v-bind="buttonProps" @click="log('click')">
          <template v-for="slot in slotExamples" :key="slot.name" #[slot.name]>
            <span class="playground-slot">{{ slot.content }}</span>
          </template>
        </VqListLoadMoreBtn>
      </div>
      <ScopeReporter :slot-props="scope" />
    </template>
  </component>

  <ValuePanel class="mt-3" title="Default slot props" :value="scopeView" />
</template>

<script setup lang="ts">
import { computed, defineComponent, shallowRef, watchEffect } from 'vue'
import {
  VqList,
  VqListLoadMoreBtn,
  VqTableFilter,
  VqTextField,
  useFormFilterRepository,
  useVqList
} from '@qnx/vuetify'
import { demoProps } from './demoProps'
import { propsFromConfig } from '../utils/codegen'
import { mockAction } from '../utils/mockApi'
import ValuePanel from './ValuePanel.vue'
import EmptyState from '../components/EmptyState.vue'

const props = defineProps(demoProps)

const typedList = useVqList<Record<string, string>>()
const listComponent = computed(() =>
  props.entry.name === 'useVqList' ? typedList : VqList
)
const isButtonDemo = computed(() => props.entry.name === 'VqListLoadMoreBtn')
const repository = computed(() => props.entry.name === 'useFormFilterRepository')

const listId = computed(() => String(props.config.id ?? 'load-more-list'))
const action = computed(() =>
  mockAction('members', props.config.mockMode, props.config.mockLatency)
)

const listProps = computed(() => {
  if (isButtonDemo.value) return { pageSize: Number(props.config.pageSize) }
  const { id: _id, ...rest } = propsFromConfig(props.config, props.entry.controls)
  return rest
})
const buttonProps = computed(() =>
  isButtonDemo.value ? propsFromConfig(props.config, props.entry.controls) : {}
)

const scopeView = shallowRef<unknown>({})
const ScopeReporter = defineComponent({
  props: { slotProps: { type: Object, required: true } },
  setup(reporterProps) {
    watchEffect(() => {
      const { items, finished, loading } = reporterProps.slotProps
      scopeView.value = { rows: items.length, finished, loading, loadMore: 'ƒ()' }
    })
    return () => null
  }
})

const reloadList = () => {
  useFormFilterRepository(`${listId.value}_filter`).reload()
  props.log('reload()')
}
const resetList = () => {
  useFormFilterRepository(`${listId.value}_filter`).reset()
  props.log('reset()')
}
</script>
