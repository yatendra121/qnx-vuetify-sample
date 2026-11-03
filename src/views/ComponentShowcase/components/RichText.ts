import { Fragment, h } from 'vue'
import type { FunctionalComponent } from 'vue'

// Catalog text marks code with backticks; render those parts as <code>.
export const RichText: FunctionalComponent<{ text?: string }> = ({ text }) =>
    h(
        Fragment,
        (text ?? '')
            .split('`')
            .map((part, index) =>
                index % 2 ? h('code', { class: 'showcase-inline-code' }, part) : part
            )
    )

RichText.props = ['text']
