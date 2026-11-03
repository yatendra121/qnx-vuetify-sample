import type { PropType } from 'vue'
import type { LogEvent, ShowcaseConfig, ShowcaseEntry, SlotExample } from '../types'

// Runtime props, because the SFC compiler can't resolve an imported type passed
// to defineProps<T>() while TypeScript 7 is the installed version.
export const demoProps = {
    entry: { type: Object as PropType<ShowcaseEntry>, required: true },
    config: { type: Object as PropType<ShowcaseConfig>, required: true },
    slotExamples: { type: Array as PropType<SlotExample[]>, required: true },
    fieldError: { type: String, default: undefined },
    compact: { type: Boolean, default: false },
    log: { type: Function as PropType<LogEvent>, required: true }
} as const
