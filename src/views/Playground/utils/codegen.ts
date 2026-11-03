import type { CodeSample, ControlDef, PlaygroundConfig, SlotExample } from '../types'

export const kebab = (value: string) =>
    value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)

const escapeAttr = (value: string) => value.replace(/"/g, '&quot;')

// One entry per attribute that differs from "leave it to the default".
export const attrsFromConfig = (
    config: PlaygroundConfig,
    controls: ControlDef[]
): string[] => {
    const attrs: string[] = []
    for (const control of controls) {
        if ((control.scope ?? 'prop') !== 'prop') continue
        const value = config[control.key]
        const name = kebab(control.key)
        if (control.type === 'boolean') {
            if (value === control.default) continue
            attrs.push(value ? name : `:${name}="false"`)
        } else if (value === '' || value === undefined) {
            continue
        } else if (typeof value === 'number') {
            attrs.push(`:${name}="${value}"`)
        } else {
            attrs.push(`${name}="${escapeAttr(String(value))}"`)
        }
    }
    return attrs
}

// The props a preview binds, using the same "omit defaults" rule as the code.
export const propsFromConfig = (
    config: PlaygroundConfig,
    controls: ControlDef[]
) => {
    const props: Record<string, unknown> = {}
    for (const control of controls) {
        if ((control.scope ?? 'prop') !== 'prop') continue
        const value = config[control.key]
        if (value === '' || value === undefined) continue
        if (control.type === 'boolean' && value === control.default) continue
        props[control.key] = value
    }
    return props
}

const indentBlock = (text: string, spaces: number) =>
    text
        .split('\n')
        .map((line) => (line ? ' '.repeat(spaces) + line : line))
        .join('\n')

export const slotTemplates = (slots: SlotExample[]) =>
    slots.map((slot) => {
        const body = slot.template ?? slot.content
        return `<template #${slot.name}${slot.template?.includes('props') ? '="{ props, item }"' : ''}>\n${indentBlock(body, 2)}\n</template>`
    })

export const tag = (name: string, attrs: string[], children: string[] = []) => {
    const inline = `<${name}${attrs.length ? ` ${attrs.join(' ')}` : ''}`
    const open =
        inline.length <= 72
            ? inline
            : `<${name}\n${attrs.map((attr) => `  ${attr}`).join('\n')}\n`
    const close = open.endsWith('\n') ? '' : children.length ? '' : ' '
    if (!children.length) return `${open}${close}/>`
    const body = children.map((child) => indentBlock(child, 2)).join('\n')
    return `${open}>\n${body}\n</${name}>`
}

export const scriptOf = (sample: CodeSample) => {
    const imports = Object.entries(sample.imports)
        .map(([path, names]) => {
            const defaults = names.filter((name) => name.startsWith('default:'))
            const named = names.filter((name) => !name.startsWith('default:'))
            const clause = [
                ...defaults.map((name) => name.slice('default:'.length)),
                ...(named.length ? [`{ ${named.join(', ')} }`] : [])
            ].join(', ')
            return `import ${clause} from '${path}'`
        })
        .join('\n')
    return [imports, sample.script].filter(Boolean).join('\n\n')
}

export const sfcOf = (sample: CodeSample) =>
    `<script setup lang="ts">\n${scriptOf(sample)}\n</script>\n\n<template>\n${indentBlock(sample.template, 2)}\n</template>\n`

export const yupSchema = (fieldName: string, rule: unknown) => {
    const builders: Record<string, string> = {
        required: `mixed().required('This field is required')`,
        email: `string().required().email('Enter a valid email')`,
        min: `string().required().min(8, 'Use at least 8 characters')`
    }
    const builder = builders[String(rule)]
    if (!builder) return ''
    const key = /^\w+$/.test(fieldName) ? fieldName : `'${fieldName}'`
    return `const validationSchema = object({\n    ${key}: ${builder}\n})`
}
