import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import vqVuetify from '@qnx/vuetify'
import { AxiosPlugin } from '@qnx/composables/axios'
import axios from 'axios'
import VDemo from './VDemo.vue'
import { mockAdapter } from './mockApi'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VTextField: { variant: 'outlined' },
    VTextarea: { variant: 'outlined' },
    VAutocomplete: { variant: 'outlined' },
    VSelect: { variant: 'outlined' },
    VFileInput: { variant: 'outlined' },
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

const pinia = createPinia()

// Live demos talk to an in-browser mock, never a real API.
AxiosPlugin.setInstance(axios.create({ adapter: mockAdapter }))

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(vuetify)
    app.use(pinia)
    app.use(vqVuetify)
    app.component('VDemo', VDemo)
  },
} satisfies Theme
