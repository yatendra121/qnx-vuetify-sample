import type { Component } from 'vue'

export interface ReflectedProp {
    name: string
    type: string
    required: boolean
    defaultValue: string
}

const typeName = (type: unknown): string => {
    if (Array.isArray(type)) return type.map(typeName).join(' | ')
    if (typeof type === 'function') return type.name.toLowerCase() || 'any'
    return type === null || type === undefined ? 'any' : String(type)
}

const formatDefault = (definition: any): string => {
    let value = definition?.default
    if (typeof value === 'function' && definition?.type !== Function) {
        try {
            value = value()
        } catch {
            return 'computed'
        }
    }
    if (value === undefined) return '—'
    if (typeof value === 'function') return 'function'
    try {
        return JSON.stringify(value)
    } catch {
        return String(value)
    }
}

// Reads the runtime `props` definition, so the tables can't drift from the
// installed version of the library or Vuetify.
export const reflectProps = (component?: Component): ReflectedProp[] => {
    const props = (component as any)?.props
    if (!props || Array.isArray(props)) return []
    return Object.entries(props)
        .map(([name, definition]: [string, any]) => ({
            name,
            type: typeName(definition?.type ?? definition),
            required: !!definition?.required,
            defaultValue: formatDefault(definition)
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
}

export const reflectEmits = (component?: Component): string[] => {
    const emits = (component as any)?.emits
    if (!emits) return []
    return Array.isArray(emits) ? [...emits] : Object.keys(emits)
}

export const toHandlerName = (event: string) =>
    `on${event.charAt(0).toUpperCase()}${event.slice(1)}`

// Values shown in the inspector can be Files, Dates, DOM events or cycles.
export const printable = (value: unknown, depth = 0): unknown => {
    if (value === undefined) return 'undefined'
    if (value === null || typeof value !== 'object') {
        return typeof value === 'function' ? 'ƒ()' : value
    }
    if (value instanceof Date) return value.toISOString()
    if (typeof File !== 'undefined' && value instanceof File) {
        return { file: value.name, size: value.size, type: value.type }
    }
    if (typeof Event !== 'undefined' && value instanceof Event) {
        return { event: value.type }
    }
    if (typeof Node !== 'undefined' && value instanceof Node) {
        return `<${value.nodeName.toLowerCase()}>`
    }
    if (depth > 4) return '…'
    if (Array.isArray(value)) {
        return value.slice(0, 50).map((item) => printable(item, depth + 1))
    }
    return Object.fromEntries(
        Object.entries(value)
            .filter(([key]) => !key.startsWith('_') && !key.startsWith('$'))
            .slice(0, 40)
            .map(([key, item]) => [key, printable(item, depth + 1)])
    )
}

export const printJson = (value: unknown) => {
    try {
        return JSON.stringify(printable(value), null, 2) ?? 'undefined'
    } catch {
        return String(value)
    }
}
