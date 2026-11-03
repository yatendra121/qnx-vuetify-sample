import { mixed, object, string } from 'yup'

const rules: Record<string, () => any> = {
    required: () => mixed().required('This field is required'),
    email: () => string().required().email('Enter a valid email'),
    min: () => string().required().min(8, 'Use at least 8 characters')
}

// Mirrors the schema `yupSchema` prints in the code sample.
export const buildSchema = (fieldName: string, rule: unknown) => {
    const build = rules[String(rule)]
    return build ? object({ [fieldName]: build() }) : undefined
}
