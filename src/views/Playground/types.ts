import type { Component, VNodeChild } from 'vue'

export type ConfigValue = string | number | boolean
export type PlaygroundConfig = Record<string, ConfigValue>

export type DemoId =
    | 'field'
    | 'form'
    | 'useForm'
    | 'table'
    | 'list'
    | 'filter'
    | 'locale'
    | 'plugin'

export interface ControlDef {
    key: string
    label: string
    type: 'text' | 'number' | 'boolean' | 'select'
    default: ConfigValue
    options?: string[]
    hint?: string
    // `prop` values are bound to the component and appear in the code sample.
    // `scenario` values only drive the demo (mock response, validation rule...).
    scope?: 'prop' | 'scenario'
    // The library reads this once in setup(), so the preview has to remount.
    remount?: boolean
    // A native attribute that falls through to the input, not a declared prop.
    nativeAttr?: boolean
}

export interface Preset {
    label: string
    config?: PlaygroundConfig
    // Pushed into the form through vee-validate, as a failed validation would.
    fieldError?: string
}

export interface DocRow {
    name: string
    type?: string
    description: string
}

export interface SlotDoc {
    name: string
    scope?: string
    description: string
}

export interface SlotExample {
    name: string
    content: string
    // Slots with a contract (`item` must render a list item) need a real render.
    render?: (scope: any) => VNodeChild
    // Replaces the generated `<template #name>` body in the code sample.
    template?: string
}

export interface CodeSample {
    imports: Record<string, string[]>
    script?: string
    template: string
}

export interface CodeContext {
    config: PlaygroundConfig
    controls: ControlDef[]
    slots: SlotExample[]
}

export interface PracticalExample {
    title: string
    description: string
    code: string
}

export interface PlaygroundEntry {
    // Display name; equal to the export name except for default exports.
    name: string
    exportName: string
    importPath: '@qnx/vuetify' | '@qnx/vuetify/integrations'
    kind: 'component' | 'composable' | 'utility' | 'plugin'
    category: string
    description: string
    demo: DemoId
    component?: Component
    wraps?: { name: string; component: Component }
    signature?: string
    // Curated text for the props reflected from `component.props`.
    propDocs?: Record<string, string>
    params?: DocRow[]
    returns?: DocRow[]
    events: DocRow[]
    slots: SlotDoc[]
    controls: ControlDef[]
    presets: Preset[]
    slotExamples?: SlotExample[]
    // Behaviour of the installed version a developer would otherwise trip over.
    notes?: string[]
    examples: PracticalExample[]
    code: (context: CodeContext) => CodeSample
    // Field demos only.
    sample?: () => unknown
    fieldPath?: (name: string) => string
    rules?: string[]
    gallery?: boolean
}

export type LogEvent = (name: string, payload?: unknown) => void
