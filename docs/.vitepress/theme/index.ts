import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { createPinia } from 'pinia'
import vqVuetify from '@qnx/vuetify'
import { AxiosPlugin } from '@qnx/composables/axios'
import axios from 'axios'
import VDemo from './VDemo.vue'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  components: {
    ...components,
    VFileUpload,
  },
  directives,
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

AxiosPlugin.setInstance(axios.create({
  baseURL: 'https://api.yatendra.online/api/',
}))

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(vuetify)
    app.use(pinia)
    app.use(vqVuetify)
    app.component('VDemo', VDemo)
  },
} satisfies Theme
