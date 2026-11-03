import { h } from 'vue'
import {
    VqAutocomplete,
    VqCheckbox,
    VqColorPicker,
    VqDatePicker,
    VqFileInput,
    VqFileUpload,
    VqOtpInput,
    VqTextField,
    VqTextarea,
    VqTimePicker
} from '@qnx/vuetify'
import { VqTextEditor } from '@qnx/vuetify/integrations'
import {
    VAutocomplete,
    VCheckbox,
    VColorPicker,
    VDatePicker,
    VFileInput,
    VFileUpload,
    VListItem,
    VOtpInput,
    VTextField,
    VTextarea,
    VTimePicker
} from 'vuetify/components'
import type { Component } from 'vue'
import type { CodeContext, ControlDef, Preset, PlaygroundEntry, SlotDoc, SlotExample } from '../types'
import { attrsFromConfig, slotTemplates, tag, yupSchema } from '../utils/codegen'
import {
    COLORS,
    DENSITIES,
    FIELD_EXAMPLES,
    FIELD_SLOTS,
    INPUT_SLOTS,
    QNX,
    QNX_INTEGRATIONS,
    VARIANTS,
    bool,
    insideForm,
    marker,
    num,
    scenario,
    select,
    text
} from './shared'

const CATEGORY = 'Form fields'

const NAME_DOC = { name: 'Form state key. The field registers itself with vee-validate under this path.' }

const fieldCode =
    (tagName: string, importPath: string, fieldPath = (name: string) => name, extraScript?: (c: CodeContext) => string, extraAttrs?: (c: CodeContext) => string[]) =>
    (context: CodeContext) => {
        const { config, controls, slots } = context
        const schema = yupSchema(fieldPath(String(config.name)), config.rule)
        const imports: Record<string, string[]> = {
            [QNX]: ['VqForm', 'VqSubmitBtn']
        }
        if (importPath === QNX) imports[QNX].splice(1, 0, tagName)
        else imports[importPath] = [tagName]
        if (schema) imports.yup = schema.includes('string()') ? ['object', 'string'] : ['mixed', 'object']
        const field = tag(
            tagName,
            [...attrsFromConfig(config, controls), ...(extraAttrs?.(context) ?? [])],
            slotTemplates(slots)
        )
        return {
            imports,
            script: [extraScript?.(context), schema, `const onSaved = (response) => console.log(response)`]
                .filter(Boolean)
                .join('\n\n'),
            template: tag(
                'VqForm',
                [
                    'id="member-form"',
                    'action="members"',
                    ...(schema ? [':validation-schema="validationSchema"'] : []),
                    '@submited-success="onSaved"'
                ],
                [field, '<VqSubmitBtn />']
            )
        }
    }

const inputControls = (name: string, label: string): ControlDef[] => [
    text('name', 'name', name),
    text('label', 'label', label),
    text('placeholder', 'placeholder'),
    text('hint', 'hint'),
    bool('persistentHint', 'persistent-hint'),
    bool('disabled', 'disabled'),
    bool('readonly', 'readonly'),
    bool('loading', 'loading'),
    bool('clearable', 'clearable', true),
    select('variant', 'variant', VARIANTS),
    select('density', 'density', DENSITIES),
    select('color', 'color', COLORS)
]

const ruleControl = (rules: string[]) => scenario(select('rule', 'Validation rule', ['none', ...rules], 'none'))

const statePresets = (extra: Preset[] = []): Preset[] => [
    { label: 'Default' },
    { label: 'Disabled', config: { disabled: true } },
    { label: 'Read-only', config: { readonly: true } },
    { label: 'Loading', config: { loading: true } },
    { label: 'Error', fieldError: 'This value is not valid.' },
    { label: 'With hint', config: { hint: 'Shown under the field', persistentHint: true } },
    ...extra
]

const textSlots: SlotDoc[] = [
    ...INPUT_SLOTS,
    ...FIELD_SLOTS,
    { name: 'counter', scope: 'VCounterSlot', description: 'Replaces the character counter.' },
    { name: 'default', scope: '{ id }', description: 'Rendered inside the field, next to the native input.' }
]

const modelEvents = [
    { name: 'update:modelValue', type: 'value', description: 'Value changed. The form state is updated too.' },
    { name: 'update:focused', type: 'boolean', description: 'Focus gained or lost.' }
]

const clearEvent = { name: 'click:clear', type: 'MouseEvent', description: 'Clear icon pressed.' }

const pickerNote = (tagName: string) =>
    `Extra attributes reach the picker inside the menu, not the read-only text field, so \`${tagName}\` can't take \`variant\`, \`hint\` or \`disabled\` for the field itself. Vue also logs an "Extraneous non-props attributes" warning in development until the picker is first opened.`

const define = (
    component: Component,
    name: string,
    wrapsName: string,
    wraps: Component,
    entry: Pick<PlaygroundEntry, 'description' | 'controls' | 'presets' | 'events' | 'slots' | 'examples'> & Partial<PlaygroundEntry>
): PlaygroundEntry => ({
    name,
    exportName: name,
    importPath: QNX,
    kind: 'component',
    category: CATEGORY,
    demo: 'field',
    component,
    wraps: { name: wrapsName, component: wraps },
    gallery: true,
    propDocs: { ...NAME_DOC, ...entry.propDocs },
    code: fieldCode(name, QNX, entry.fieldPath),
    ...entry
})

const autocompleteItemSlot: SlotExample = {
    name: 'item',
    content: 'Custom row',
    template: '<v-list-item v-bind="props" :subtitle="`Plan: ${item}`" />',
    render: ({ props, item }: any) =>
        h(VListItem, { ...props, subtitle: `Plan: ${item}` })
}

const textField = define(VqTextField, 'VqTextField', 'VTextField', VTextField, {
    description: 'Text input bound to form state by name. Shows validation errors from the surrounding form and forwards everything else to VTextField.',
    controls: [
        ...inputControls('email', 'Email'),
        select('type', 'type', ['', 'text', 'email', 'password', 'number', 'tel', 'url']),
        text('prefix', 'prefix'),
        text('suffix', 'suffix'),
        ruleControl(['required', 'email', 'min'])
    ],
    presets: statePresets([
        { label: 'Password', config: { name: 'password', label: 'Password', type: 'password', rule: 'min' } },
        { label: 'Amount', config: { name: 'amount', label: 'Amount', type: 'number', prefix: '₹', suffix: '.00' } }
    ]),
    events: [...modelEvents, clearEvent, { name: 'click:control', type: 'MouseEvent', description: 'Field pressed.' }],
    slots: textSlots,
    slotExamples: FIELD_EXAMPLES,
    sample: () => 'member@example.com',
    examples: [
        insideForm('VqTextField', 'name="email" label="Email"'),
        {
            title: 'As a table filter',
            description: 'Inside VqTableFilter every keystroke reloads the paired table.',
            code: `<VqTableFilter id="members">
  <VqTextField name="search" label="Search members" />
</VqTableFilter>
<VqDataTable id="members" action="members" :headers="headers" />`
        }
    ]
})

const textarea = define(VqTextarea, 'VqTextarea', 'VTextarea', VTextarea, {
    description: 'Multi-line input bound to form state by name, built on VTextarea.',
    controls: [
        ...inputControls('notes', 'Notes'),
        num('rows', 'rows', 3),
        bool('autoGrow', 'auto-grow'),
        bool('noResize', 'no-resize'),
        select('counter', 'counter', ['', '120', '500']),
        ruleControl(['required', 'min'])
    ],
    presets: statePresets([
        { label: 'Auto-grow', config: { autoGrow: true, rows: 2 } },
        { label: 'With counter', config: { counter: '120' } }
    ]),
    events: [...modelEvents, clearEvent],
    slots: textSlots,
    slotExamples: FIELD_EXAMPLES,
    sample: () => 'Prefers morning sessions.\nCheck the locker renewal.',
    examples: [insideForm('VqTextarea', 'name="notes" label="Notes" auto-grow')]
})

const autocomplete = define(VqAutocomplete, 'VqAutocomplete', 'VAutocomplete', VAutocomplete, {
    description: 'Searchable select bound to form state. Takes static `items`, or fetches them once from `action`.',
    propDocs: {
        action: 'Endpoint that returns `{ data: { data: items } }`. Fetched once in setup and shows the loading state meanwhile.',
        items: 'Initial options. Read once in setup, so later changes to the array are ignored.'
    },
    controls: [
        ...inputControls('plan', 'Plan'),
        bool('multiple', 'multiple'),
        bool('chips', 'chips'),
        bool('closableChips', 'closable-chips'),
        text('noDataText', 'no-data-text'),
        scenario(select('source', 'Items source', ['static', 'action', 'action (slow)', 'empty'], 'static')),
        ruleControl(['required'])
    ],
    presets: statePresets([
        { label: 'Fetching', config: { source: 'action (slow)' } },
        { label: 'Empty', config: { source: 'empty', noDataText: 'No plans available' } },
        { label: 'Multiple', config: { multiple: true, chips: true, closableChips: true } }
    ]),
    events: [
        ...modelEvents,
        clearEvent,
        { name: 'update:search', type: 'string', description: 'Search text changed.' },
        { name: 'update:menu', type: 'boolean', description: 'Options menu opened or closed.' }
    ],
    slots: [
        ...INPUT_SLOTS,
        ...FIELD_SLOTS,
        { name: 'item', scope: '{ item, internalItem, index, props }', description: 'Renders one option. `item` is the raw value. Bind `props` so selecting still works.' },
        { name: 'chip', scope: '{ item, internalItem, index, props }', description: 'Renders a selected value when `chips` is on.' },
        { name: 'selection', scope: '{ item, internalItem, index }', description: 'Renders a selected value.' },
        { name: 'no-data', description: 'Shown when nothing matches.' },
        { name: 'prepend-item', description: 'Above the options.' },
        { name: 'append-item', description: 'Below the options.' }
    ],
    slotExamples: [
        autocompleteItemSlot,
        marker('prepend-item', 'Pick a membership plan'),
        marker('no-data', 'Nothing here'),
        marker('prepend-inner', '#'),
        marker('details', 'Custom details row')
    ],
    sample: () => 'Standard',
    code: fieldCode('VqAutocomplete', QNX, undefined, undefined, ({ config }) =>
        String(config.source).startsWith('action')
            ? ['action="plans"']
            : [`:items="${config.source === 'empty' ? '[]' : `['Basic', 'Standard', 'Premium']`}"`]
    ),
    examples: [
        insideForm('VqAutocomplete', 'name="plan" label="Plan" :items="plans"'),
        {
            title: 'Options from an API',
            description: 'The endpoint must answer `{ data: { data: [...] } }`.',
            code: `<VqAutocomplete
  name="category_id"
  label="Category"
  action="category/options"
  item-title="name"
  item-value="id"
/>`
        }
    ]
})

const checkbox = define(VqCheckbox, 'VqCheckbox', 'VCheckbox', VCheckbox, {
    description: 'Checkbox bound to form state by name, built on VCheckbox.',
    controls: [
        text('name', 'name', 'terms'),
        text('label', 'label', 'Accept the membership terms'),
        text('hint', 'hint'),
        bool('persistentHint', 'persistent-hint'),
        bool('disabled', 'disabled'),
        bool('readonly', 'readonly'),
        bool('indeterminate', 'indeterminate'),
        select('color', 'color', COLORS),
        select('density', 'density', DENSITIES),
        ruleControl(['required'])
    ],
    presets: [
        { label: 'Default' },
        { label: 'Disabled', config: { disabled: true } },
        { label: 'Read-only', config: { readonly: true } },
        { label: 'Indeterminate', config: { indeterminate: true } },
        { label: 'Error', fieldError: 'You have to accept the terms.' },
        { label: 'Required', config: { rule: 'required' } }
    ],
    events: [
        { name: 'update:modelValue', type: 'boolean', description: 'Toggled.' },
        { name: 'update:focused', type: 'boolean', description: 'Focus gained or lost.' },
        { name: 'update:indeterminate', type: 'boolean', description: 'Indeterminate state cleared.' }
    ],
    slots: [
        ...INPUT_SLOTS,
        { name: 'label', scope: '{ label, props }', description: 'Replaces the label.' },
        { name: 'input', scope: 'SelectionControlSlot', description: 'Replaces the checkbox icon.' }
    ],
    slotExamples: [marker('label', 'I agree to the custom terms'), marker('prepend', 'Before'), marker('append', 'After'), marker('details', 'Custom details row')],
    sample: () => true,
    examples: [insideForm('VqCheckbox', 'name="terms" label="Accept the terms"')]
})

const pickerControls = (name: string, label: string): ControlDef[] => [
    text('name', 'name', name),
    text('label', 'label', label),
    { ...bool('type', 'type (use dialog)', false, true), hint: 'Boolean: on opens a dialog, off opens a menu.' }
]

const pickerPresets = (extra: Preset[] = []): Preset[] => [
    { label: 'Menu' },
    { label: 'Dialog', config: { type: true } },
    { label: 'Error', fieldError: 'Pick a valid value.' },
    { label: 'Required', config: { rule: 'required' } },
    ...extra
]

const PICKER_PROP_DOCS = {
    label: 'Label of the read-only text field that opens the picker.',
    type: 'Despite the name this is a boolean. `true` opens a dialog, `false` a menu. Read once in setup.'
}

const datePicker = define(VqDatePicker, 'VqDatePicker', 'VDatePicker', VDatePicker, {
    description: 'Read-only text field that opens a VDatePicker in a menu or dialog and stores the picked date in form state.',
    propDocs: {
        ...PICKER_PROP_DOCS,
        multiple: 'Declared, but the installed version does not pass it to the picker.'
    },
    controls: [
        ...pickerControls('joined_on', 'Joined on'),
        text('title', 'title', 'Select date'),
        select('color', 'color', COLORS, 'primary'),
        text('min', 'min', '', 'For example 2026-01-01'),
        text('max', 'max'),
        bool('hideHeader', 'hide-header'),
        bool('showAdjacentMonths', 'show-adjacent-months'),
        bool('disabled', 'disabled (picker)'),
        ruleControl(['required'])
    ],
    presets: pickerPresets([
        { label: 'Compact', config: { hideHeader: true, showAdjacentMonths: true } },
        { label: 'Disabled picker', config: { disabled: true } }
    ]),
    events: [
        { name: 'update:modelValue', type: 'Date', description: 'Date picked.' },
        { name: 'update:month', type: 'number', description: 'Month changed.' },
        { name: 'update:year', type: 'number', description: 'Year changed.' },
        { name: 'update:viewMode', type: `'month' | 'months' | 'year'`, description: 'View changed.' }
    ],
    slots: [
        { name: 'title', description: 'Replaces the picker title.' },
        { name: 'header', scope: '{ header, transition }', description: 'Replaces the selected date header.' },
        { name: 'actions', description: 'Action row under the calendar.' },
        { name: 'day', scope: '{ props, item, i }', description: 'Renders one day.' },
        { name: 'controls', scope: 'controls props', description: 'Replaces the month and year controls.' }
    ],
    slotExamples: [marker('title', 'Membership start'), marker('actions', 'Custom actions row')],
    notes: [pickerNote('VqDatePicker'), 'The stored value is whatever the picker emits (a Date). A string works as a starting value because the component parses it with `new Date()`.'],
    sample: () => '2026-11-03',
    examples: [insideForm('VqDatePicker', 'name="joined_on" label="Joined on" color="primary"')]
})

const timePicker = define(VqTimePicker, 'VqTimePicker', 'VTimePicker', VTimePicker, {
    description: 'Read-only text field that opens a VTimePicker in a menu or dialog. Defaults to 24-hour format.',
    propDocs: PICKER_PROP_DOCS,
    controls: [
        ...pickerControls('opens_at', 'Opens at'),
        text('title', 'title', 'Select Time'),
        select('format', 'format', ['ampm', '24hr'], '24hr'),
        select('color', 'color', COLORS, 'primary'),
        bool('useSeconds', 'use-seconds'),
        bool('scrollable', 'scrollable'),
        bool('disabled', 'disabled (picker)'),
        ruleControl(['required'])
    ],
    presets: pickerPresets([
        { label: '12-hour', config: { format: 'ampm' } },
        { label: 'With seconds', config: { useSeconds: true } }
    ]),
    events: [
        { name: 'update:modelValue', type: 'string', description: 'Time changed, as `HH:mm` or `HH:mm:ss`.' },
        { name: 'update:hour', type: 'number', description: 'Hour changed.' },
        { name: 'update:minute', type: 'number', description: 'Minute changed.' },
        { name: 'update:second', type: 'number', description: 'Second changed.' },
        { name: 'update:period', type: `'am' | 'pm'`, description: 'Period changed.' },
        { name: 'update:viewMode', type: `'hour' | 'minute' | 'second'`, description: 'Clock view changed.' }
    ],
    slots: [
        { name: 'title', description: 'Replaces the title.' },
        { name: 'actions', description: 'Action row under the clock.' }
    ],
    slotExamples: [marker('title', 'Opening hour'), marker('actions', 'Custom actions row')],
    notes: [pickerNote('VqTimePicker')],
    sample: () => '14:30',
    examples: [insideForm('VqTimePicker', 'name="opens_at" label="Opens at"')]
})

const colorPicker = define(VqColorPicker, 'VqColorPicker', 'VColorPicker', VColorPicker, {
    description: 'Read-only text field that opens a VColorPicker in a menu or dialog and stores the color in form state.',
    propDocs: PICKER_PROP_DOCS,
    controls: [
        ...pickerControls('brand_color', 'Brand color'),
        select('mode', 'mode', ['', 'rgb', 'rgba', 'hsl', 'hsla', 'hex', 'hexa']),
        bool('hideCanvas', 'hide-canvas'),
        bool('hideInputs', 'hide-inputs'),
        bool('hideSliders', 'hide-sliders'),
        bool('showSwatches', 'show-swatches'),
        bool('disabled', 'disabled (picker)'),
        ruleControl(['required'])
    ],
    presets: pickerPresets([
        { label: 'Swatches only', config: { showSwatches: true, hideCanvas: true, hideInputs: true, hideSliders: true } },
        { label: 'Disabled picker', config: { disabled: true } }
    ]),
    events: [
        { name: 'update:modelValue', type: 'string | object', description: 'Color changed.' },
        { name: 'update:mode', type: 'string', description: 'Input mode changed.' }
    ],
    slots: [],
    notes: [pickerNote('VqColorPicker')],
    sample: () => '#3F51B5',
    examples: [insideForm('VqColorPicker', 'name="brand_color" label="Brand color" show-swatches')]
})

const otpInput = define(VqOtpInput, 'VqOtpInput', 'VOtpInput', VOtpInput, {
    description: 'One-time password boxes bound to form state by name. Starts empty and uses the primary base color.',
    controls: [
        text('name', 'name', 'otp'),
        num('length', 'length', 6),
        select('type', 'type', ['', 'number', 'text', 'password']),
        text('divider', 'divider'),
        select('variant', 'variant', VARIANTS),
        select('color', 'color', COLORS),
        bool('disabled', 'disabled'),
        bool('loading', 'loading'),
        bool('autofocus', 'autofocus'),
        ruleControl(['required'])
    ],
    presets: [
        { label: 'Default' },
        { label: 'Disabled', config: { disabled: true } },
        { label: 'Loading', config: { loading: true } },
        { label: 'Error', fieldError: 'That code is not valid.' },
        { label: '4 digits', config: { length: 4 } },
        { label: 'Masked', config: { type: 'password' } },
        { label: 'Divider', config: { divider: '-', length: 4 } }
    ],
    events: [
        { name: 'update:modelValue', type: 'string', description: 'Digits changed.' },
        { name: 'update:focused', type: 'boolean', description: 'Focus gained or lost.' },
        { name: 'finish', type: 'string', description: 'Every box is filled.' }
    ],
    slots: [
        { name: 'default', description: 'Rendered after the boxes.' },
        { name: 'divider', scope: '{ index }', description: 'Rendered between boxes.' },
        { name: 'loader', description: 'Replaces the loading indicator.' }
    ],
    slotExamples: [marker('default', 'Code sent to your phone'), marker('divider', '·')],
    notes: ['VOtpInput renders no message row, so the library sets its error color but the error text is not displayed. Show the message yourself if the user needs it.'],
    sample: () => '123456',
    examples: [insideForm('VqOtpInput', 'name="otp" :length="6"')]
})

const fileInput = define(VqFileInput, 'VqFileInput', 'VFileInput', VFileInput, {
    description: 'File picker bound to form state. Single file by default, and the value is stored under the literal key `name[file]`.',
    propDocs: { name: 'Base key. The value is stored under the literal key `name[file]`, not under `name`, so a validation schema has to use that key.' },
    fieldPath: (name) => `${name}[file]`,
    controls: [
        ...inputControls('photo', 'Member photo').filter((control) => control.key !== 'readonly'),
        { ...text('accept', 'accept', '', 'For example image/*'), nativeAttr: true },
        bool('multiple', 'multiple'),
        bool('chips', 'chips'),
        bool('showSize', 'show-size'),
        select('counter', 'counter', ['', '3']),
        ruleControl(['required'])
    ],
    presets: [
        { label: 'Default' },
        { label: 'Disabled', config: { disabled: true } },
        { label: 'Loading', config: { loading: true } },
        { label: 'Error', fieldError: 'File type is not allowed.' },
        { label: 'Images only', config: { accept: 'image/*', showSize: true } },
        { label: 'Multiple', config: { multiple: true, chips: true } }
    ],
    events: [
        { name: 'update:modelValue', type: 'File | File[]', description: 'Selection changed.' },
        { name: 'update:focused', type: 'boolean', description: 'Focus gained or lost.' },
        clearEvent
    ],
    slots: [
        ...INPUT_SLOTS,
        ...FIELD_SLOTS,
        { name: 'selection', scope: '{ fileNames, totalBytes, totalBytesReadable }', description: 'Renders the chosen files.' },
        { name: 'counter', description: 'Replaces the file counter.' }
    ],
    slotExamples: [
        { name: 'selection', content: 'Selected files', template: '{{ fileNames.join(", ") }}' },
        marker('prepend', 'Before'),
        marker('details', 'Custom details row')
    ],
    notes: ['Combine it with `form-data` on VqForm when the endpoint expects multipart uploads.'],
    sample: () => new File(['sample'], 'sample.txt', { type: 'text/plain' }),
    code: fieldCode('VqFileInput', QNX, (name) => `${name}[file]`),
    examples: [
        {
            title: 'Multipart upload',
            description: '`form-data` sends the form as multipart/form-data.',
            code: `<VqForm id="photo" action="members/photo" form-data>
  <VqFileInput name="photo" label="Photo" accept="image/*" />
  <VqSubmitBtn />
</VqForm>`
        }
    ]
})

const fileUpload = define(VqFileUpload, 'VqFileUpload', 'VFileUpload', VFileUpload, {
    description: 'Drag-and-drop upload area bound to form state by name, built on VFileUpload.',
    controls: [
        text('name', 'name', 'documents'),
        text('title', 'title', 'Drop documents here'),
        text('subtitle', 'subtitle'),
        text('browseText', 'browse-text'),
        text('dividerText', 'divider-text'),
        select('density', 'density', DENSITIES),
        select('color', 'color', COLORS),
        bool('multiple', 'multiple'),
        bool('clearable', 'clearable'),
        bool('showSize', 'show-size'),
        bool('disabled', 'disabled'),
        ruleControl(['required'])
    ],
    presets: [
        { label: 'Default' },
        { label: 'Disabled', config: { disabled: true } },
        { label: 'Compact', config: { density: 'compact' } },
        { label: 'Multiple', config: { multiple: true, clearable: true, showSize: true } },
        { label: 'Error', fieldError: 'At least one document is needed.' }
    ],
    events: [
        { name: 'update:modelValue', type: 'File[]', description: 'Files added or removed.' },
        { name: 'update:focused', type: 'boolean', description: 'Focus gained or lost.' },
        { name: 'rejected', type: 'File[]', description: 'Dropped files that were refused.' }
    ],
    slots: [
        ...INPUT_SLOTS,
        { name: 'browse', scope: '{ props }', description: 'Replaces the browse button.' },
        { name: 'icon', description: 'Replaces the upload icon.' },
        { name: 'title', description: 'Replaces the title.' },
        { name: 'divider', description: 'Replaces the "or" divider.' },
        { name: 'input', scope: '{ inputNode }', description: 'Replaces the native input.' },
        { name: 'item', scope: '{ file, props }', description: 'Renders one selected file.' },
        { name: 'single', scope: '{ file, props }', description: 'Renders the file when not `multiple`.' }
    ],
    slotExamples: [marker('title', 'Custom upload title'), marker('icon', '⬆'), marker('divider', 'then')],
    sample: () => [new File(['sample'], 'sample.pdf', { type: 'application/pdf' })],
    examples: [insideForm('VqFileUpload', 'name="documents" title="Drop documents here" multiple')]
})

const textEditor: PlaygroundEntry = {
    name: 'VqTextEditor',
    exportName: 'VqTextEditor',
    importPath: QNX_INTEGRATIONS,
    kind: 'component',
    category: 'Integrations',
    description: 'TinyMCE rich text editor bound to form state by name. It loads the TinyMCE script from the app at runtime.',
    demo: 'field',
    component: VqTextEditor,
    propDocs: {
        ...NAME_DOC,
        baseUrl: 'Prefix of the script URL. Defaults to the value given to `setConfig`.',
        filesPath: 'Script path appended to `baseUrl`.',
        height: 'Editor height in pixels.',
        isDark: 'Uses the dark TinyMCE skin and content styles. Read when the editor initialises.',
        label: 'Declared, but the installed version does not render it.',
        placeholder: 'Declared, but the installed version does not pass it to TinyMCE.'
    },
    controls: [
        text('name', 'name', 'description'),
        { ...num('height', 'height', 250), remount: true },
        bool('isDark', 'is-dark', false, true),
        { ...text('filesPath', 'files-path', 'tinymce.min.js'), remount: true },
        ruleControl(['required'])
    ],
    presets: [
        { label: 'Default' },
        { label: 'Tall', config: { height: 420 } },
        { label: 'Dark', config: { isDark: true } },
        { label: 'Error', fieldError: 'The description is required.' }
    ],
    events: [],
    slots: [],
    notes: [
        'It declares no events and renders no slots. Read the content from form state, as the panel under the preview does.',
        'TinyMCE is not bundled. The script loads from `baseUrl` + `filesPath`, and the editor stays blank if that URL fails. This sample loads it from the cdnjs CDN, so the preview needs network access.'
    ],
    sample: () => '<p>Welcome to the <strong>gym</strong>.</p>',
    code: fieldCode('VqTextEditor', QNX_INTEGRATIONS),
    examples: [insideForm('VqTextEditor', 'name="description" :height="320"')]
}

export const fieldEntries = [
    textField,
    textarea,
    autocomplete,
    checkbox,
    datePicker,
    timePicker,
    colorPicker,
    otpInput,
    fileInput,
    fileUpload,
    textEditor
]
