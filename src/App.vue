<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar color="surface" elevation="0" border="b">
      <template #prepend>
        <v-icon icon="mdi-vuetify" size="26" color="primary" class="ml-3" />
      </template>
      <v-app-bar-title>
        <span class="font-weight-bold text-primary">@qnx/vuetify</span>
        <v-chip label size="x-small" color="primary" variant="tonal" class="ml-2">
          Component Showcase
        </v-chip>
      </v-app-bar-title>
    </v-app-bar>

    <!-- Left Navigation Drawer -->
    <v-navigation-drawer permanent width="240" color="surface-variant">

      <div class="pa-4 pb-2 pt-4">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Form Components
        </div>
      </div>
      <v-list nav density="compact" class="px-2">
        <v-list-item
          v-for="item in formItems"
          :key="item.value"
          :value="item.value"
          :prepend-icon="item.icon"
          :title="item.label"
          rounded="lg"
          class="mb-1"
          :active="tab === item.value"
          active-color="primary"
          @click="tab = item.value"
        />
      </v-list>

      <v-divider class="mx-4 my-1" />

      <div class="pa-4 pb-2">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Data Components
        </div>
      </div>
      <v-list nav density="compact" class="px-2">
        <v-list-item
          v-for="item in dataItems"
          :key="item.value"
          :value="item.value"
          :prepend-icon="item.icon"
          :title="item.label"
          rounded="lg"
          class="mb-1"
          :active="tab === item.value"
          active-color="primary"
          @click="tab = item.value"
        />
      </v-list>

      <v-divider class="mx-4 my-1" />

      <div class="pa-4 pb-2">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
          Composables
        </div>
      </div>
      <v-list nav density="compact" class="px-2">
        <v-list-item
          v-for="item in composableItems"
          :key="item.value"
          :value="item.value"
          :prepend-icon="item.icon"
          :title="item.label"
          rounded="lg"
          class="mb-1"
          :active="tab === item.value"
          active-color="primary"
          @click="tab = item.value"
        />
      </v-list>

    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-window v-model="tab">
        <v-window-item :value="1"><TextInputsPage /></v-window-item>
        <v-window-item :value="2"><AutocompletePage /></v-window-item>
        <v-window-item :value="3"><DateTimeColorPage /></v-window-item>
        <v-window-item :value="4"><FileInputsPage /></v-window-item>
        <v-window-item :value="5"><ToggleInputsPage /></v-window-item>
        <v-window-item :value="6"><DataTablePage /></v-window-item>
        <v-window-item :value="7"><ListPage /></v-window-item>
        <v-window-item :value="8"><UseVqFormExample /></v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import TextInputsPage    from '@/components/examples/pages/TextInputsPage.vue'
import AutocompletePage  from '@/components/examples/pages/AutocompletePage.vue'
import DateTimeColorPage from '@/components/examples/pages/DateTimeColorPage.vue'
import FileInputsPage    from '@/components/examples/pages/FileInputsPage.vue'
import ToggleInputsPage  from '@/components/examples/pages/ToggleInputsPage.vue'
import DataTablePage     from '@/components/examples/pages/DataTablePage.vue'
import ListPage          from '@/components/examples/pages/ListPage.vue'
import UseVqFormExample  from '@/components/examples/composable/UseVqFormExample.vue'

const tab = ref(1)

const formItems = [
  { value: 1, icon: 'mdi-text-box-outline',     label: 'Text Inputs' },
  { value: 2, icon: 'mdi-form-select',           label: 'Autocomplete' },
  { value: 3, icon: 'mdi-calendar-clock',        label: 'Date / Time / Color' },
  { value: 4, icon: 'mdi-upload-outline',        label: 'File Inputs' },
  { value: 5, icon: 'mdi-toggle-switch-outline', label: 'Toggle Inputs' },
]

const dataItems = [
  { value: 6, icon: 'mdi-table',                 label: 'VqDataTable' },
  { value: 7, icon: 'mdi-format-list-bulleted',  label: 'VqList' },
]

const composableItems = [
  { value: 8, icon: 'mdi-code-braces',           label: 'useVqForm' },
]
</script>
