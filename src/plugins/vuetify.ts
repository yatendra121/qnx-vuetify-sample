/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  display: { mobileBreakpoint: 'md' },
  defaults: {
    VBtn: { class: 'text-none' },
    VTextField: { variant: 'filled', density: 'comfortable', clearable: true },
    VTextarea: { variant: 'filled', density: 'comfortable', clearable: true, rows: 3 },
    VAutocomplete: { variant: 'filled', density: 'comfortable', clearable: true },
    VFileInput: { variant: 'filled', density: 'comfortable' },
    VSelect: { variant: 'filled', density: 'comfortable' },
    VOtpInput: { variant: 'filled' },
    VCard: { flat: true, border: true, rounded: 'lg' },
    VDialog: { maxWidth: 480 },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
