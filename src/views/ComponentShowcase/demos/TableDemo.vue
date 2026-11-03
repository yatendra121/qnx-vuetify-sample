<template>
  <div v-if="rowHelper" class="d-flex flex-wrap align-center ga-2 mb-3">
    <v-btn color="primary" size="small" data-testid="apply-helper" @click="applyHelper">
      {{ entry.name }}('{{ tableId }}', '{{ config.targetId }}')
    </v-btn>
    <v-btn variant="text" size="small" data-testid="refetch" @click="remount++">Refetch rows</v-btn>
  </div>

  <ValuePanel v-if="entry.name === 'collectVqHeaders'" class="mb-3" title="collectVqHeaders(headers)" :value="columns" />

  <component
    :is="tableComponent"
    :id="tableId"
    :key="remount"
    :action="mockAction('members', config.mockMode, config.mockLatency)"
    :headers="columns"
    :sort-by="[{ key: String(config.sortKey), order: config.sortOrder }]"
    v-bind="tableProps"
    @update:options="onOptions"
    @update:page="log('update:page', $event)"
    @update:items-per-page="log('update:itemsPerPage', $event)"
    @update:sort-by="log('update:sortBy', $event)"
    @click:row="(event: unknown, row: any) => log('click:row', { item: row?.item })"
  >
    <template v-if="withSerial" #item="{ item, index }">
      <tr>
        <VqSerialNo :index="(options.page - 1) * options.itemsPerPage + index + 1" />
        <td>{{ (item as any).name }}</td>
        <td>{{ (item as any).email }}</td>
        <td>{{ (item as any).plan }}</td>
        <td>{{ (item as any).status }}</td>
      </tr>
    </template>
    <template v-for="slot in slotExamples" :key="slot.name" #[slot.name]="scope">
      <span class="showcase-slot">{{ slot.name === 'item.status' ? (scope as any).value : slot.content }}</span>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  VqDataTable,
  VqSerialNo,
  collectVqHeaders,
  deleteItemValue,
  updateItemKeyValue,
  updateItemValue,
  useVqDataTable
} from '@qnx/vuetify'
import { demoProps } from './demoProps'
import { propsFromConfig } from '../utils/codegen'
import { mockAction } from '../utils/mockApi'
import ValuePanel from './ValuePanel.vue'

const props = defineProps(demoProps)

const HEADERS = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email', sortable: false },
  { title: 'Plan', key: 'plan' },
  { title: 'Status', key: 'status' }
]

const typedTable = useVqDataTable<Record<string, string>>()
const tableComponent = computed(() =>
  props.entry.name === 'useVqDataTable' ? typedTable : VqDataTable
)
const withSerial = computed(() =>
  ['VqSerialNo', 'collectVqHeaders'].includes(props.entry.name)
)
const columns = computed(() =>
  withSerial.value ? collectVqHeaders(HEADERS) : HEADERS
)

const tableId = computed(() => String(props.config.id))
const remount = ref(0)
const options = reactive({
  page: Number(props.config.page),
  itemsPerPage: Number(props.config.itemsPerPage)
})

const tableProps = computed(() => {
  const { id: _id, ...rest } = propsFromConfig(props.config, props.entry.controls)
  return rest
})

const onOptions = (value: any) => {
  options.page = value.page
  options.itemsPerPage = value.itemsPerPage
  props.log('update:options', value)
}

const rowHelpers: Record<string, (id: string, rowId: string) => void> = {
  updateItemKeyValue: (id, rowId) => updateItemKeyValue(id, rowId, 'status', 'updated'),
  updateItemValue: (id, rowId) =>
    updateItemValue(id, rowId, {
      id: rowId,
      name: 'Replaced row',
      email: 'replaced@example.com',
      plan: 'Premium',
      status: 'active'
    }),
  deleteItemValue: (id, rowId) => deleteItemValue(id, rowId)
}
const rowHelper = computed(() => rowHelpers[props.entry.name])

const applyHelper = () => {
  const target = String(props.config.targetId)
  try {
    rowHelper.value(tableId.value, target)
    props.log(`${props.entry.name}()`, { itemId: target })
  } catch (error) {
    props.log(`${props.entry.name}() threw`, String(error))
  }
}
</script>
