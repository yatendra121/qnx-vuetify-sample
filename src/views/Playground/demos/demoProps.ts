import type { PropType } from 'vue'
import type { LogEvent, PlaygroundConfig, PlaygroundEntry, SlotExample } from '../types'

// Runtime props, because the SFC compiler can't resolve an imported type passed
// to defineProps<T>() while TypeScript 7 is the installed version.
export const demoProps = {
    entry: { type: Object as PropType<PlaygroundEntry>, required: true },
    config: { type: Object as PropType<PlaygroundConfig>, required: true },
    slotExamples: { type: Array as PropType<SlotExample[]>, required: true },
    fieldError: { type: String, default: undefined },
    compact: { type: Boolean, default: false },
    log: { type: Function as PropType<LogEvent>, required: true }
} as const
