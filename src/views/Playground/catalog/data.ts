import { VqDataTable, VqList, VqListLoadMoreBtn, VqSerialNo, VqTableFilter } from '@qnx/vuetify'
import { VBtn, VDataTableServer, VList } from 'vuetify/components'
import type { CodeContext, Preset, PlaygroundEntry, SlotDoc } from '../types'
import { attrsFromConfig, slotTemplates, tag } from '../utils/codegen'
import { BTN_VARIANTS, COLORS, DENSITIES, QNX, bool, marker, mockLatency, mockMode, num, scenario, select, text } from './shared'

const TABLES = 'Data tables'
const LISTS = 'Lists & filters'

const HEADERS_SCRIPT = `const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email', sortable: false },
    { title: 'Plan', key: 'plan' },
    { title: 'Status', key: 'status' }
]`

const tableControls = () => [
    text('id', 'id', 'members'),
    { ...num('page', 'page', 1, true) },
    { ...num('itemsPerPage', 'items-per-page', 5, true) },
    scenario(select('sortKey', 'sort-by key', ['name', 'plan', 'status'], 'name')),
    scenario(select('sortOrder', 'sort-by order', ['asc', 'desc'], 'asc')),
    select('density', 'density', DENSITIES),
    bool('hover', 'hover', true),
    bool('hideDefaultFooter', 'hide-default-footer'),
    text('noDataText', 'no-data-text'),
    mockMode(['success', 'empty', 'server']),
    mockLatency()
]

const tablePresets: Preset[] = [
    { label: 'Default' },
    { label: 'Loading', config: { mockLatency: 4000 } },
    { label: 'Empty', config: { mockMode: 'empty', noDataText: 'No members found' } },
    { label: 'Server error', config: { mockMode: 'server' } },
    { label: 'Compact', config: { density: 'compact', itemsPerPage: 10 } },
    { label: 'Page 3, plan desc', config: { page: 3, sortKey: 'plan', sortOrder: 'desc' } }
]

const tableEvents = [
    { name: 'update:options', type: '{ page, itemsPerPage, sortBy, groupBy, search }', description: 'Any paging or sorting change. The library fetches on this too.' },
    { name: 'update:page', type: 'number', description: 'Page changed.' },
    { name: 'update:itemsPerPage', type: 'number', description: 'Page size changed.' },
    { name: 'update:sortBy', type: 'SortItem[]', description: 'Sort changed.' },
    { name: 'click:row', type: '(event, { item })', description: 'Row pressed.' }
]

const tableSlots: SlotDoc[] = [
    { name: 'top', scope: 'VDataTable props', description: 'Above the table.' },
    { name: 'bottom', scope: 'VDataTable props', description: 'Replaces the footer.' },
    { name: 'item', scope: '{ item, index, columns, props }', description: 'Renders a whole row. Used with VqSerialNo.' },
    { name: 'item.<key>', scope: '{ item, value, index, column }', description: 'Renders one cell.' },
    { name: 'header.<key>', scope: '{ column, toggleSort, isSorted }', description: 'Renders one header cell.' },
    { name: 'no-data', description: 'Shown when the server returns no rows.' },
    { name: 'loading', description: 'Shown while the first page loads with no rows.' }
]

const tableSlotExamples = [
    { name: 'top', content: 'Members toolbar' },
    { name: 'no-data', content: 'Nothing to show yet' },
    { name: 'loading', content: 'Fetching members…' },
    { name: 'item.status', content: '{{ value }}' }
]

const tableNote = 'A failed or aborted request rejects with no catch inside the library, so it shows as an unhandled rejection in the console. The table only stops loading and keeps its old rows.'

const tableAttrs = ({ config, controls }: CodeContext) => [
    'action="members"',
    ':headers="headers"',
    ...attrsFromConfig(config, controls),
    ...(config.sortKey !== 'name' || config.sortOrder !== 'asc' ? [`:sort-by="[{ key: '${config.sortKey}', order: '${config.sortOrder}' }]"`] : [])
]

const tableCode = (tagName: string, script?: string, extraImports: string[] = []) => (context: CodeContext) => ({
    imports: { [QNX]: [tagName === 'MemberTable' ? 'useVqDataTable' : tagName, ...extraImports] },
    script: [HEADERS_SCRIPT, script].filter(Boolean).join('\n\n'),
    template: tag(tagName, tableAttrs(context), slotTemplates(context.slots))
})

const table = (entry: Partial<PlaygroundEntry> & Pick<PlaygroundEntry, 'name' | 'description' | 'kind'>): PlaygroundEntry => ({
    exportName: entry.name,
    importPath: QNX,
    category: TABLES,
    demo: 'table',
    wraps: { name: 'VDataTableServer', component: VDataTableServer },
    events: tableEvents,
    slots: tableSlots,
    controls: tableControls(),
    presets: tablePresets,
    slotExamples: tableSlotExamples,
    examples: [],
    code: tableCode('VqDataTable'),
    ...entry
})

const dataTable = table({
    name: 'VqDataTable',
    kind: 'component',
    description: 'Server-side table built on VDataTableServer. Handles paging, sorting, loading and reloads when a paired VqTableFilter changes.',
    component: VqDataTable,
    propDocs: {
        id: 'Links the table to a VqTableFilter with the same id, and to the row update helpers.',
        action: 'Endpoint that returns `{ data: { data: rows, total } }`.',
        method: 'HTTP method used to fetch rows.',
        page: 'Starting page. Read once in setup.',
        itemsPerPage: 'Starting page size. Read once in setup.',
        sortBy: 'Starting sort. Read once in setup.'
    },
    notes: [tableNote],
    examples: [
        {
            title: 'Custom cells',
            description: 'Any VDataTableServer slot passes through.',
            code: `<VqDataTable id="members" action="members" :headers="headers">
  <template #item.status="{ value }">
    <v-chip size="small">{{ value }}</v-chip>
  </template>
</VqDataTable>`
        }
    ]
})

const useDataTable = table({
    name: 'useVqDataTable',
    kind: 'composable',
    description: 'Returns VqDataTable typed for your row type, so slot props are inferred.',
    signature: 'useVqDataTable<TValue>(): typeof VqDataTable',
    params: [{ name: 'TValue', type: 'type parameter', description: 'Row type used for slot props.' }],
    returns: [{ name: '(component)', type: 'Component', description: 'Behaves exactly like VqDataTable.' }],
    code: tableCode('MemberTable', `interface Member {\n    id: string\n    name: string\n}\n\nconst MemberTable = useVqDataTable<Member>()`),
    examples: [
        {
            title: 'Typed rows',
            description: 'Types are compile-time only. Runtime behaviour matches VqDataTable.',
            code: `const MemberTable = useVqDataTable<Member>()`
        }
    ]
})

const serialNo = table({
    name: 'VqSerialNo',
    kind: 'component',
    description: 'A `<td>` with a row number. Use it inside the `item` slot of VqDataTable, paired with `collectVqHeaders`.',
    component: VqSerialNo,
    wraps: undefined,
    propDocs: { index: 'Number to display. The component does not add the page offset for you.' },
    events: [],
    slots: [],
    slotExamples: [],
    notes: ['It only prints `index`. Pass `(page - 1) * itemsPerPage + index + 1` to keep numbering across pages, as this demo does.'],
    code: (context) => ({
        imports: { [QNX]: ['VqDataTable', 'VqSerialNo', 'collectVqHeaders'] },
        script: `${HEADERS_SCRIPT}\n\nconst columns = collectVqHeaders(headers)`,
        template: tag('VqDataTable', tableAttrs(context).map((attr) => attr.replace(':headers="headers"', ':headers="columns"')), [
            `<template #item="{ item, index }">
  <tr>
    <VqSerialNo :index="index + 1" />
    <td>{{ item.name }}</td>
    <td>{{ item.email }}</td>
    <td>{{ item.plan }}</td>
    <td>{{ item.status }}</td>
  </tr>
</template>`
        ])
    }),
    examples: [
        {
            title: 'Numbering across pages',
            description: 'Add the offset yourself.',
            code: `<VqSerialNo :index="(page - 1) * itemsPerPage + index + 1" />`
        }
    ]
})

const headersEntry = table({
    name: 'collectVqHeaders',
    kind: 'utility',
    description: 'Prepends a `#` column to a headers array, for tables that render VqSerialNo.',
    signature: 'collectVqHeaders(headers: T[]): (T | { title: string; sortable: boolean })[]',
    params: [{ name: 'headers', type: 'T[]', description: 'Table headers.' }],
    returns: [{ name: '(array)', type: 'array', description: 'A new array that starts with `{ title: "#", sortable: false }`.' }],
    events: [],
    slots: [],
    slotExamples: [],
    code: serialNo.code,
    examples: [
        {
            title: 'Input and output',
            description: 'The added column has no `key`.',
            code: `collectVqHeaders([{ title: 'Name', key: 'name' }])
// [{ title: '#', sortable: false }, { title: 'Name', key: 'name' }]`
        }
    ]
})

const ROW_NOTE = 'Row ids are compared with `===`, so the id must match the row\'s type. With an unknown id the lookup returns -1 and the library does not guard it: update helpers throw a TypeError and `deleteItemValue` removes the last row. Try it with the target id control.'

const rowHelper = (name: string, signature: string, description: string, params: PlaygroundEntry['params'], call: string): PlaygroundEntry =>
    table({
        name,
        kind: 'utility',
        description,
        signature,
        params,
        returns: [{ name: 'void', description: 'Changes the mounted table or list in place. No request is sent.' }],
        events: [],
        slots: [],
        slotExamples: [],
        controls: [
            scenario(text('targetId', 'Target id', 'm-01'), false),
            ...tableControls()
        ],
        presets: [
            { label: 'Existing row' },
            { label: 'Unknown id', config: { targetId: 'missing' } }
        ],
        notes: [ROW_NOTE],
        code: (context) => ({
            imports: { [QNX]: ['VqDataTable', name] },
            script: `${HEADERS_SCRIPT}\n\nconst applyChange = () => {\n    ${call.replace('ID', String(context.config.targetId))}\n}`,
            template: `${tag('VqDataTable', tableAttrs(context))}\n<v-btn @click="applyChange">Apply</v-btn>`
        }),
        examples: [
            {
                title: 'After a row action succeeds',
                description: 'Update the row without refetching the page.',
                code: `const onSaved = (member) => {\n    ${call.replace('ID', '${member.id}').replace(/'(.*\$\{.*?)'/, '`$1`')}\n}`
            }
        ]
    })

const ROW_PARAMS = [
    { name: 'filterListId', type: 'string', description: 'The `id` of the table or list.' },
    { name: 'itemId', type: 'string', description: 'Row `id`, compared with `===`.' }
]

const updateKey = rowHelper(
    'updateItemKeyValue',
    'updateItemKeyValue(filterListId, itemId, key, value): void',
    'Changes one field of one row in a mounted table or list, without a request.',
    [...ROW_PARAMS, { name: 'key', type: 'string', description: 'Field to change.' }, { name: 'value', type: 'any', description: 'New value.' }],
    `updateItemKeyValue('members', 'ID', 'status', 'inactive')`
)

const updateValue = rowHelper(
    'updateItemValue',
    'updateItemValue(filterListId, itemId, value): void',
    'Replaces one row in a mounted table or list, without a request.',
    [...ROW_PARAMS, { name: 'value', type: 'object', description: 'The new row.' }],
    `updateItemValue('members', 'ID', { id: 'ID', name: 'Renamed', email: 'new@example.com', plan: 'Premium', status: 'active' })`
)

const deleteValue = rowHelper(
    'deleteItemValue',
    'deleteItemValue(filterListId, itemId): void',
    'Removes one row from a mounted table or list and lowers its total, without a request.',
    ROW_PARAMS,
    `deleteItemValue('members', 'ID')`
)

const listControls = () => [
    text('id', 'id', 'member-list'),
    num('pageSize', 'page-size', 5, true),
    select('density', 'density', DENSITIES),
    select('lines', 'lines', ['', 'one', 'two', 'three']),
    bool('nav', 'nav'),
    mockMode(['success', 'empty', 'server']),
    mockLatency()
]

const LIST_SCRIPT_SLOT = `<template #default="{ items, finished, loading }">
  <v-list-item
    v-for="item in items"
    :key="item.id"
    :title="item.name"
    :subtitle="item.email"
  />
  <VqListLoadMoreBtn />
</template>`

const listPresets: Preset[] = [
    { label: 'Default' },
    { label: 'Loading', config: { mockLatency: 4000 } },
    { label: 'Empty', config: { mockMode: 'empty' } },
    { label: 'Server error', config: { mockMode: 'server' } },
    { label: 'Large pages', config: { pageSize: 15 } },
    { label: 'Two lines', config: { lines: 'two', density: 'compact' } }
]

const list: PlaygroundEntry = {
    name: 'VqList',
    exportName: 'VqList',
    importPath: QNX,
    kind: 'component',
    category: LISTS,
    description: 'Paged list built on VList. Fetches pages from an API, appends them and reloads when a paired VqTableFilter changes.',
    demo: 'list',
    component: VqList,
    wraps: { name: 'VList', component: VList },
    propDocs: {
        id: 'Links the list to a VqTableFilter with the same id, and to the row update helpers.',
        action: 'Endpoint that returns `{ data: { data: rows, total } }`. Receives `page` and `page_size`.',
        pageSize: 'Rows per page. Read once in setup.'
    },
    events: [],
    slots: [{ name: 'default', scope: '{ items, loadMore, finished, loading }', description: 'Renders the rows. It is the only slot forwarded to VList.' }],
    controls: listControls(),
    presets: listPresets,
    notes: ['The component has no built-in rows, empty or error UI. All of them come from your default slot, using the slot props.'],
    code: ({ config, controls }) => ({
        imports: { [QNX]: ['VqList', 'VqListLoadMoreBtn'] },
        template: tag('VqList', ['action="members"', ...attrsFromConfig(config, controls)], [LIST_SCRIPT_SLOT])
    }),
    examples: [
        {
            title: 'Empty state from slot props',
            description: 'Check `items`, `loading` and `finished` to pick what to show.',
            code: `<VqList id="members" action="members" v-slot="{ items, loading }">
  <EmptyState v-if="!items.length && !loading" title="No members" />
  <v-list-item v-for="item in items" :key="item.id" :title="item.name" />
</VqList>`
        }
    ]
}

const useList: PlaygroundEntry = {
    ...list,
    name: 'useVqList',
    exportName: 'useVqList',
    kind: 'composable',
    component: undefined,
    description: 'Returns VqList typed for your row type, so the default slot\'s `items` are inferred.',
    signature: 'useVqList<TValue>(): typeof VqList',
    params: [{ name: 'TValue', type: 'type parameter', description: 'Row type used for the default slot.' }],
    returns: [{ name: '(component)', type: 'Component', description: 'Behaves exactly like VqList.' }],
    notes: ['The types declare a `changed` event, but the installed version never emits it.'],
    code: ({ config, controls }) => ({
        imports: { [QNX]: ['VqListLoadMoreBtn', 'useVqList'] },
        script: `interface Member {\n    id: string\n    name: string\n    email: string\n}\n\nconst MemberList = useVqList<Member>()`,
        template: tag('MemberList', ['action="members"', ...attrsFromConfig(config, controls)], [LIST_SCRIPT_SLOT])
    }),
    examples: [{ title: 'Typed rows', description: 'Types are compile-time only.', code: `const MemberList = useVqList<Member>()` }]
}

const loadMore: PlaygroundEntry = {
    name: 'VqListLoadMoreBtn',
    exportName: 'VqListLoadMoreBtn',
    importPath: QNX,
    kind: 'component',
    category: LISTS,
    description: 'Loads the next page of the surrounding VqList. Disables itself while loading and disappears after the last page.',
    demo: 'list',
    component: VqListLoadMoreBtn,
    wraps: { name: 'VBtn', component: VBtn },
    events: [{ name: 'click', type: 'MouseEvent', description: 'Pressed. Your listener runs along with the library\'s `loadMore`.' }],
    slots: [
        { name: 'default', description: 'Replaces the label, which falls back to the `loadMore` locale string.' },
        { name: 'prepend', description: 'Before the label.' },
        { name: 'append', description: 'After the label.' },
        { name: 'loader', description: 'Replaces the loading indicator.' }
    ],
    slotExamples: [marker('default', 'Show more members'), marker('prepend', '↓')],
    controls: [
        select('variant', 'variant', BTN_VARIANTS),
        select('color', 'color', COLORS),
        select('size', 'size', ['', 'small', 'default', 'large']),
        bool('block', 'block'),
        scenario(num('pageSize', 'List page-size', 5)),
        mockMode(['success', 'server']),
        mockLatency()
    ],
    presets: [
        { label: 'Default' },
        { label: 'Slow load', config: { mockLatency: 3000 } },
        { label: 'Tonal block', config: { variant: 'tonal', block: true } },
        { label: 'Reaches the end', config: { pageSize: 20 } }
    ],
    notes: ['It reads its state from VqList through inject, so it has to render inside one.'],
    code: ({ config, controls, slots }) => ({
        imports: { [QNX]: ['VqList', 'VqListLoadMoreBtn'] },
        template: tag('VqList', ['id="member-list"', 'action="members"', `:page-size="${config.pageSize}"`], [
            `<template #default="{ items }">
  <v-list-item v-for="item in items" :key="item.id" :title="item.name" />
${tag('VqListLoadMoreBtn', attrsFromConfig(config, controls), slotTemplates(slots)).replace(/^/gm, '  ')}
</template>`
        ])
    }),
    examples: [{ title: 'Inside a list', description: 'No props are needed.', code: `<VqList id="members" action="members" v-slot="{ items }">\n  <v-list-item v-for="item in items" :key="item.id" :title="item.name" />\n  <VqListLoadMoreBtn />\n</VqList>` }]
}

const filter: PlaygroundEntry = {
    name: 'VqTableFilter',
    exportName: 'VqTableFilter',
    importPath: QNX,
    kind: 'component',
    category: LISTS,
    description: 'Filter form linked by id to a VqDataTable or VqList. The target refetches from page 1 whenever a value changes.',
    demo: 'filter',
    component: VqTableFilter,
    propDocs: { id: 'Must equal the `id` of the table or list it filters.' },
    events: [],
    slots: [{ name: 'default', description: 'The filter fields. Each field name becomes a query parameter.' }],
    controls: [
        text('id', 'id', 'filtered-members'),
        scenario(select('target', 'Target', ['table', 'list'], 'table')),
        scenario(bool('mismatch', 'Mismatch target id')),
        mockMode(['success', 'empty', 'server']),
        mockLatency()
    ],
    presets: [
        { label: 'With table' },
        { label: 'With list', config: { target: 'list' } },
        { label: 'No matches', config: { mockMode: 'empty' } },
        { label: 'Unlinked ids', config: { mismatch: true } }
    ],
    notes: ['A change fetches at once with no debounce, so a search field sends one request per keystroke. In-flight requests are aborted.'],
    code: ({ config }) => {
        const target = config.target === 'list'
            ? tag('VqList', [`id="${config.id}"`, 'action="members"'], [`<template #default="{ items }">\n  <v-list-item v-for="item in items" :key="item.id" :title="item.name" />\n</template>`])
            : tag('VqDataTable', [`id="${config.id}"`, 'action="members"', ':headers="headers"'])
        return {
            imports: { [QNX]: ['VqAutocomplete', config.target === 'list' ? 'VqList' : 'VqDataTable', 'VqTableFilter', 'VqTextField'] },
            script: config.target === 'list' ? undefined : HEADERS_SCRIPT,
            template: `${tag('VqTableFilter', [`id="${config.id}"`], ['<VqTextField name="search" label="Search" />', `<VqAutocomplete name="plan" label="Plan" :items="['Basic', 'Standard', 'Premium']" />`])}\n${target}`
        }
    },
    examples: [{ title: 'Shared id', description: 'The id is the only link between the two.', code: `<VqTableFilter id="members">\n  <VqTextField name="search" label="Search" />\n</VqTableFilter>\n<VqDataTable id="members" action="members" :headers="headers" />` }]
}

const filterRepo: PlaygroundEntry = {
    name: 'useFormFilterRepository',
    exportName: 'useFormFilterRepository',
    importPath: QNX,
    kind: 'composable',
    category: LISTS,
    description: 'Asks a filtered VqList to refetch from page 1 without changing any filter value.',
    demo: 'list',
    signature: 'useFormFilterRepository(formKey: string): { reload, reset }',
    params: [{ name: 'formKey', type: 'string', description: 'Filter form key: the shared id plus `_filter`.' }],
    returns: [
        { name: 'reload', type: '() => void', description: 'Refetches page 1.' },
        { name: 'reset', type: '() => void', description: 'Also refetches page 1. It does not clear the filter values.' }
    ],
    events: [],
    slots: [],
    controls: listControls(),
    presets: [{ label: 'Default' }, { label: 'Slow reload', config: { mockLatency: 2000 } }],
    notes: [
        'The key is `<id>_filter`, not the id. A wrong key does nothing and reports nothing.',
        'A VqTableFilter with that id must be mounted, because the flags live on its entry in the store.',
        'Only VqList reacts. VqDataTable does not watch these flags in the installed version, so a table stays as it is.'
    ],
    code: ({ config }) => ({
        imports: { [QNX]: ['VqList', 'VqTableFilter', 'VqTextField', 'useFormFilterRepository'] },
        script: `const { reload, reset } = useFormFilterRepository('${config.id}_filter')`,
        template: `${tag('VqTableFilter', [`id="${config.id}"`], ['<VqTextField name="search" label="Search" />'])}
${tag('VqList', [`id="${config.id}"`, 'action="members"'], [`<template #default="{ items }">\n  <v-list-item v-for="item in items" :key="item.id" :title="item.name" />\n</template>`])}
<v-btn @click="reload">Reload</v-btn>`
    }),
    examples: [{ title: 'Refresh after an external change', description: 'For example when a socket event arrives.', code: `const { reload } = useFormFilterRepository('members_filter')\nsocket.on('member:created', reload)` }]
}

export const dataEntries = [dataTable, useDataTable, serialNo, headersEntry, updateKey, updateValue, deleteValue, list, useList, loadMore, filter, filterRepo]
