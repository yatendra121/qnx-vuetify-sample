import { VqForm, VqSubmitBtn } from '@qnx/vuetify'
import { VBtn } from 'vuetify/components'
import type { ShowcaseEntry } from '../types'
import { attrsFromConfig, tag } from '../utils/codegen'
import { BTN_VARIANTS, COLORS, QNX, bool, marker, mockLatency, mockMode, scenario, select, text } from './shared'

const CATEGORY = 'Forms'
const MODES = ['success', 'validation', 'server']
const SUBMIT_EVENTS = [
    { name: 'submitedSuccess', type: 'ApiResponse', description: 'The server accepted the form. Listen with `@submited-success`.' },
    { name: 'submitedError', type: 'ApiResponse', description: 'The server answered 400 or 422. Field errors are applied first.' }
]
const BUSY_NOTE = 'Only 400 and 422 responses emit `submitedError`. Other failures, such as a 500, reject inside the library, emit nothing and log an uncaught error. Use `errorResponseHandler` if you need to catch them.'

const form: ShowcaseEntry = {
    name: 'VqForm',
    exportName: 'VqForm',
    importPath: QNX,
    kind: 'component',
    category: CATEGORY,
    description: 'Form wrapper that validates with vee-validate, submits through axios, applies server field errors and tracks the busy state for its submit button.',
    demo: 'form',
    component: VqForm,
    propDocs: {
        id: 'Unique form id. Links the form to its submit button through the busy store.',
        action: 'Endpoint the form submits to.',
        method: 'HTTP method.',
        initialValues: 'Starting values. Replacing the object resets the form.',
        valuesSchema: 'Maps nested paths of `initialValues` to flat field names, such as `{ city: "address.city" }`.',
        formData: 'Sends multipart/form-data instead of JSON.',
        successResponseHandler: '`(response, actions)`. Replaces the `submitedSuccess` event.',
        errorResponseHandler: '`(error, actions)`. Replaces the default error handling and event.',
        validationSchema: 'Yup or other vee-validate schema. Read once in setup.'
    },
    controls: [
        text('id', 'id', 'member-form'),
        { ...text('action', 'action', 'members'), scope: 'scenario' },
        { ...select('method', 'method', ['POST', 'PUT', 'PATCH', 'DELETE'], 'POST'), scope: 'scenario' },
        { ...bool('formData', 'form-data'), scope: 'scenario' },
        scenario(bool('withInitial', 'Use initial-values')),
        scenario(bool('withSchema', 'Use validation-schema', true)),
        scenario(bool('withHandlers', 'Use response handlers')),
        mockMode(MODES),
        mockLatency()
    ],
    presets: [
        { label: 'Success' },
        { label: 'Client validation', config: { withSchema: true } },
        { label: 'Server validation', config: { mockMode: 'validation', withInitial: true } },
        { label: 'Server failure', config: { mockMode: 'server', withInitial: true, withHandlers: true } },
        { label: 'Slow request', config: { mockLatency: 3000, withInitial: true } },
        { label: 'Multipart', config: { formData: true, withInitial: true } }
    ],
    events: [
        ...SUBMIT_EVENTS,
        { name: 'submitedClientError', description: 'Declared by the component, but the installed version never emits it.' }
    ],
    slots: [{ name: 'default', description: 'The fields and submit button. No slot props: use `useFormContext()` in a child to reach form state.' }],
    notes: [BUSY_NOTE],
    code: ({ config }) => {
        const schema = config.withSchema
        const imports: Record<string, string[]> = { [QNX]: ['VqForm', 'VqSubmitBtn', 'VqTextField'] }
        if (schema) imports.yup = ['object', 'string']
        const script = [
            schema ? `const validationSchema = object({\n    name: string().required(),\n    email: string().required().email()\n})` : '',
            config.withInitial ? `const initialValues = { name: 'Asha Rao', email: 'asha@example.com' }` : '',
            config.withHandlers
                ? `const onSuccess = (response, actions) => actions.resetForm()\nconst onError = (error, actions) => console.error(error)`
                : `const onSaved = (response) => console.log(response.getMessage())\nconst onRejected = (response) => console.log(response.getErrors())`
        ]
        return {
            imports,
            script: script.filter(Boolean).join('\n\n'),
            template: tag(
                'VqForm',
                [
                    `id="${config.id}"`,
                    `action="${config.action}"`,
                    ...(config.method !== 'POST' ? [`method="${config.method}"`] : []),
                    ...(config.formData ? ['form-data'] : []),
                    ...(schema ? [':validation-schema="validationSchema"'] : []),
                    ...(config.withInitial ? [':initial-values="initialValues"'] : []),
                    ...(config.withHandlers
                        ? [':success-response-handler="onSuccess"', ':error-response-handler="onError"']
                        : ['@submited-success="onSaved"', '@submited-error="onRejected"'])
                ],
                ['<VqTextField name="name" label="Name" />', '<VqTextField name="email" label="Email" />', '<VqSubmitBtn text="Save" />']
            )
        }
    },
    examples: [
        {
            title: 'Edit form with nested data',
            description: '`values-schema` flattens an API response into field names.',
            code: `<VqForm
  id="member-edit"
  :action="\`members/\${id}\`"
  method="PUT"
  :initial-values="member"
  :values-schema="{ city: 'address.city' }"
>
  <VqTextField name="city" label="City" />
  <VqSubmitBtn text="Update" />
</VqForm>`
        }
    ]
}

const submitBtn: ShowcaseEntry = {
    name: 'VqSubmitBtn',
    exportName: 'VqSubmitBtn',
    importPath: QNX,
    kind: 'component',
    category: CATEGORY,
    description: 'Submit button that shows a loading state while its surrounding form is busy.',
    demo: 'form',
    component: VqSubmitBtn,
    wraps: { name: 'VBtn', component: VBtn },
    gallery: true,
    propDocs: {
        form: 'Id of the form to submit when the button sits outside it.',
        text: 'Label. Falls back to the `submit` locale string.'
    },
    controls: [
        text('text', 'text', 'Save member'),
        select('variant', 'variant', BTN_VARIANTS),
        select('color', 'color', COLORS),
        select('size', 'size', ['', 'x-small', 'small', 'default', 'large', 'x-large']),
        bool('block', 'block'),
        bool('disabled', 'disabled'),
        scenario(bool('outside', 'Place outside the form')),
        mockMode(MODES),
        mockLatency()
    ],
    presets: [
        { label: 'Default' },
        { label: 'Locale label', config: { text: '' } },
        { label: 'Disabled', config: { disabled: true } },
        { label: 'Busy for 3s', config: { mockLatency: 3000 } },
        { label: 'Tonal block', config: { variant: 'tonal', block: true } },
        { label: 'Outside form', config: { outside: true } }
    ],
    events: [{ name: 'click', type: 'MouseEvent', description: 'Native click, forwarded by VBtn.' }],
    slots: [{ name: 'default', description: 'Replaces the label. Other VBtn slots are not forwarded.' }],
    slotExamples: [marker('default', 'Custom label')],
    notes: ['The loading state comes from the injected form id, so a button placed outside the form submits it through `form` but never shows as busy, and Vue logs an injection warning for `formId` in development.'],
    code: ({ config, controls, slots }) => {
        const attrs = attrsFromConfig(config, controls)
        const children = slots.length ? [slots[0].content] : []
        const button = tag('VqSubmitBtn', config.outside ? ['form="member-form"', ...attrs] : attrs, children)
        const field = '<VqTextField name="name" label="Name" />'
        const formTag = tag('VqForm', ['id="member-form"', 'action="members"'], config.outside ? [field] : [field, button])
        return {
            imports: { [QNX]: ['VqForm', 'VqSubmitBtn', 'VqTextField'] },
            template: config.outside ? `${formTag}\n${button}` : formTag
        }
    },
    examples: [
        {
            title: 'Submit from a dialog footer',
            description: 'Point `form` at the form id when the button is outside it.',
            code: `<VqForm id="member-form" action="members">...</VqForm>
<v-card-actions>
  <VqSubmitBtn form="member-form" text="Save" />
</v-card-actions>`
        }
    ]
}

const useVqForm: ShowcaseEntry = {
    name: 'useVqForm',
    exportName: 'useVqForm',
    importPath: QNX,
    kind: 'composable',
    category: CATEGORY,
    description: 'Creates a form wrapper component from setup(), which gives the parent programmatic access to `resetForm`.',
    demo: 'useForm',
    signature: 'useVqForm(options: VqFormOption): { wrapper, resetForm }',
    params: [
        { name: 'formId', type: 'string', description: 'Form id used by the busy store.' },
        { name: 'validationSchema', type: 'object', description: 'Validation schema.' },
        { name: 'initialValues', type: 'Ref<object> | () => object', description: 'Watched for changes. Must be a ref or getter, see the note.' },
        { name: 'valuesSchema', type: 'object', description: 'Maps nested paths to flat field names.' }
    ],
    returns: [
        { name: 'wrapper', type: 'Component', description: 'Form component. Takes `action`, `method`, `formData` and the response handlers.' },
        { name: 'resetForm', type: '(state?, opts?) => void', description: 'vee-validate reset for this form.' }
    ],
    events: [
        { name: 'submitedSuccess', type: 'ApiResponse', description: 'Emitted by `wrapper` on success.' },
        { name: 'submitedError', type: 'ApiResponse', description: 'Emitted by `wrapper` on 400 or 422.' }
    ],
    slots: [{ name: 'default', description: 'Slot of `wrapper`: the fields and submit button.' }],
    controls: [
        text('formId', 'formId', 'member-profile'),
        { ...select('method', 'method', ['POST', 'PUT', 'PATCH'], 'POST'), scope: 'scenario' },
        mockMode(MODES),
        mockLatency()
    ],
    presets: [
        { label: 'Success' },
        { label: 'Server validation', config: { mockMode: 'validation' } },
        { label: 'Slow request', config: { mockLatency: 3000 } }
    ],
    notes: [
        'The README passes `initialValues` as a plain object, but the library calls `watch()` on it. A plain object is not a valid watch source and is not applied, so pass a ref or a getter.',
        'Values only apply when that ref changes. To start with values, call `resetForm({ values })` as this demo does.'
    ],
    code: ({ config }) => ({
        imports: { vue: ['ref'], [QNX]: ['VqSubmitBtn', 'VqTextField', 'useVqForm'] },
        script: `const initialValues = ref({ name: '' })

const { wrapper: MemberForm, resetForm } = useVqForm({
    formId: '${config.formId}',
    initialValues
})

resetForm({ values: { name: 'Asha Rao' } })`,
        template: tag('MemberForm', ['action="members"', ...(config.method !== 'POST' ? [`method="${config.method}"`] : [])], [
            '<VqTextField name="name" label="Name" />',
            '<VqSubmitBtn text="Save" />'
        ])
    }),
    examples: [
        {
            title: 'Reset after saving',
            description: 'The parent owns `resetForm`, so it can clear the form from the success event.',
            code: `const { wrapper: MemberForm, resetForm } = useVqForm({ formId: 'member' })
const onSaved = () => resetForm()`
        }
    ]
}

export const formEntries = [form, useVqForm, submitBtn]
