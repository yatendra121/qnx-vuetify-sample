import { h } from 'vue'
import type { FunctionalComponent } from 'vue'
import type { SlotExample } from '../types'

// Renders a dynamic slot of a preview: a visible marker naming its outlet, or
// the example's own render function when the slot has a contract to keep.
export const SlotContent: FunctionalComponent<{
    example: SlotExample
    scope: unknown
}> = ({ example, scope }) =>
    example.render
        ? (example.render(scope) as ReturnType<typeof h>)
        : h(
              'span',
              { class: 'playground-slot', title: `#${example.name}` },
              example.content
          )

SlotContent.props = ['example', 'scope']
