import type { ShowcaseEntry } from '../types'
import { QNX, QNX_INTEGRATIONS, text } from './shared'

const CATEGORY = 'Setup & localization'

const localeControls = [
    text('submit', 'submit', 'Save'),
    text('loadMore', 'loadMore', 'Show more'),
    text('confirmTitle', 'confirmTitle'),
    text('confirmDeleteDescription', 'confirmDeleteDescription'),
    text('confirm', 'confirm'),
    text('cancel', 'cancel'),
    text('changeStatusTooltip', 'changeStatusTooltip'),
    text('submitErrorMessage', 'submitErrorMessage')
].map((control) => ({ ...control, scope: 'scenario' as const }))

const localeLines = (config: Record<string, unknown>) =>
    localeControls
        .filter(({ key }) => config[key])
        .map(({ key }) => `    ${key}: '${config[key]}'`)
        .join(',\n')

const LOCALE_NOTE = 'This page restores the English defaults when you leave, so the demo can\'t change labels elsewhere in the app.'

const setLocale: ShowcaseEntry = {
    name: 'setVqLocale',
    exportName: 'setVqLocale',
    importPath: QNX,
    kind: 'utility',
    category: CATEGORY,
    description: 'Overrides the strings the library renders. Omitted keys keep their current value, and mounted components update at once.',
    demo: 'locale',
    signature: 'setVqLocale(overrides: Partial<VqLocale>): void',
    params: [{ name: 'overrides', type: 'Partial<VqLocale>', description: 'Strings to replace. `VqLocale` is exported as a type.' }],
    returns: [{ name: 'void', description: 'Changes a shared reactive store.' }],
    events: [],
    slots: [],
    controls: localeControls,
    presets: [
        { label: 'Friendly', config: { submit: 'Save', loadMore: 'Show more' } },
        { label: 'Spanish', config: { submit: 'Enviar', loadMore: 'Cargar más' } },
        { label: 'Hindi', config: { submit: 'जमा करें', loadMore: 'और दिखाएं' } }
    ],
    notes: [
        LOCALE_NOTE,
        'Keys such as `confirmTitle` describe `VqDatatableItemAction`, which the installed version does not export, so nothing visible uses them here.'
    ],
    code: ({ config }) => ({
        imports: { [QNX]: ['setVqLocale'] },
        script: `setVqLocale({\n${localeLines(config)}\n})`,
        template: '<VqSubmitBtn />'
    }),
    examples: [{ title: 'At app startup', description: 'Call it once before mounting.', code: `import { setVqLocale } from '@qnx/vuetify'\n\nsetVqLocale({ submit: 'Enviar' })` }]
}

const resetLocale: ShowcaseEntry = {
    ...setLocale,
    name: 'resetVqLocale',
    exportName: 'resetVqLocale',
    description: 'Restores the bundled English strings.',
    signature: 'resetVqLocale(): void',
    params: [],
    notes: [LOCALE_NOTE],
    code: () => ({
        imports: { [QNX]: ['resetVqLocale'] },
        script: 'resetVqLocale()',
        template: '<VqSubmitBtn />'
    }),
    examples: [{ title: 'When switching language', description: 'Start from English, then apply the next language.', code: `resetVqLocale()\nsetVqLocale(locales[language])` }]
}

const plugin = (name: string, importPath: ShowcaseEntry['importPath'], local: string, description: string): ShowcaseEntry => ({
    name,
    exportName: 'default',
    importPath,
    kind: 'plugin',
    category: CATEGORY,
    description,
    demo: 'plugin',
    signature: `app.use(${local})`,
    returns: [{ name: 'void', description: 'Registers each `Vq*` component globally.' }],
    params: [{ name: 'app', type: 'App', description: 'The Vue app, passed by `app.use`.' }],
    events: [],
    slots: [],
    controls: [],
    presets: [],
    code: () => ({
        imports: { vue: ['createApp'], [importPath]: [`default:${local}`] },
        script: `createApp(App).use(${local})`,
        template: '<VqTextField name="email" label="No import needed" />'
    }),
    examples: [{ title: 'Registered by this app', description: 'See `src/plugins/index.ts`.', code: `app.use(${local})` }]
})

const setConfig: ShowcaseEntry = {
    ...plugin('setConfig', QNX_INTEGRATIONS, 'unused', 'Sets the default `baseUrl` that VqTextEditor uses to load the TinyMCE script.'),
    exportName: 'setConfig',
    kind: 'utility',
    signature: 'setConfig({ baseUrl: string }): void',
    params: [{ name: 'baseUrl', type: 'string', description: 'URL prefix ending in `/`. An empty string is ignored.' }],
    returns: [{ name: 'void', description: 'Changes the default for editors mounted afterwards.' }],
    controls: [{ ...text('baseUrl', 'baseUrl', 'https://cdn.example.com/'), scope: 'scenario' }],
    notes: ['This page puts the app\'s own value back when you leave.'],
    code: ({ config }) => ({
        imports: { [QNX_INTEGRATIONS]: ['setConfig'] },
        script: `setConfig({ baseUrl: '${config.baseUrl}' })`,
        template: '<VqTextEditor name="description" />'
    }),
    examples: [{ title: 'Registered by this app', description: 'See `src/plugins/tinymce.ts`.', code: `setConfig({ baseUrl: TINYMCE_BASE_URL })` }]
}

export const utilityEntries = [
    plugin('vqVuetify (default)', QNX, 'vqVuetify', 'Vue plugin that registers the components of the main entry globally. Composables and helpers still need an import.'),
    plugin('VqVuetifyIntegrations (default)', QNX_INTEGRATIONS, 'VqVuetifyIntegrations', 'Vue plugin that registers VqTextEditor globally.'),
    setConfig,
    setLocale,
    resetLocale
]
