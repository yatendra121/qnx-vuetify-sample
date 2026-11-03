import type { ControlDef, PracticalExample, SlotDoc, SlotExample } from '../types'

export const QNX = '@qnx/vuetify'
export const QNX_INTEGRATIONS = '@qnx/vuetify/integrations'

export const text = (key: string, label: string, value = '', hint?: string): ControlDef => ({
    key,
    label,
    type: 'text',
    default: value,
    hint
})

export const bool = (key: string, label: string, value = false, remount = false): ControlDef => ({
    key,
    label,
    type: 'boolean',
    default: value,
    remount
})

export const num = (key: string, label: string, value: number, remount = false): ControlDef => ({
    key,
    label,
    type: 'number',
    default: value,
    remount
})

export const select = (key: string, label: string, options: string[], value = ''): ControlDef => ({
    key,
    label,
    type: 'select',
    default: value,
    options
})

export const scenario = (control: ControlDef, remount = true): ControlDef => ({
    ...control,
    scope: 'scenario',
    remount
})

export const VARIANTS = ['', 'outlined', 'filled', 'solo', 'solo-filled', 'solo-inverted', 'underlined', 'plain']
export const BTN_VARIANTS = ['', 'flat', 'elevated', 'tonal', 'outlined', 'text', 'plain']
export const DENSITIES = ['', 'default', 'comfortable', 'compact']
export const COLORS = ['', 'primary', 'secondary', 'success', 'warning', 'error', 'info']

export const mockMode = (options = ['success', 'empty', 'validation', 'server']) =>
    scenario(select('mockMode', 'Mock response', options, 'success'))

export const mockLatency = () =>
    scenario(num('mockLatency', 'Mock latency (ms)', 400))

export const INPUT_SLOTS: SlotDoc[] = [
    { name: 'prepend', scope: 'VInputSlot', description: 'Before the input, outside the field.' },
    { name: 'append', scope: 'VInputSlot', description: 'After the input, outside the field.' },
    { name: 'details', scope: 'VInputSlot', description: 'Replaces the message row under the input.' },
    { name: 'message', scope: '{ message }', description: 'Renders each hint or error message.' }
]

export const FIELD_SLOTS: SlotDoc[] = [
    { name: 'prepend-inner', scope: 'DefaultInputSlot', description: 'Inside the field, before the value.' },
    { name: 'append-inner', scope: 'DefaultInputSlot', description: 'Inside the field, after the value.' },
    { name: 'label', scope: 'DefaultInputSlot & { label, props }', description: 'Replaces the floating label.' },
    { name: 'clear', scope: 'DefaultInputSlot & { props }', description: 'Replaces the clear icon.' },
    { name: 'loader', scope: 'LoaderSlotProps', description: 'Replaces the progress line shown while loading.' }
]

export const marker = (name: string, content: string): SlotExample => ({ name, content })

export const FIELD_EXAMPLES: SlotExample[] = [
    marker('prepend-inner', '#'),
    marker('append-inner', 'kg'),
    marker('prepend', 'Before'),
    marker('append', 'After'),
    marker('label', 'Custom label'),
    marker('details', 'Custom details row')
]

export const insideForm = (tagName: string, attrs: string): PracticalExample => ({
    title: 'Inside a server-backed form',
    description: 'The field reads and writes form state by `name`, so it needs no v-model.',
    code: `<VqForm id="member" action="members" @submited-success="onSaved">
  <${tagName} ${attrs} />
  <VqSubmitBtn />
</VqForm>`
})
