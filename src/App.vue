<template>
  <v-app :theme="theme">
    <v-app-bar color="surface" elevation="0" border="b">
      <template #prepend>
        <v-icon icon="mdi-vuetify" size="26" color="primary" class="ml-3" />
      </template>
      <v-app-bar-title class="font-weight-bold">Component Showcase</v-app-bar-title>
      <template #append>
        <div class="d-none d-sm-flex align-center ga-2 me-2">
          <v-chip
            size="small"
            variant="tonal"
            :color="coverageReport.missing.length ? 'error' : 'success'"
            data-testid="coverage"
          >
            {{ coverageReport.total - coverageReport.missing.length }}/{{ coverageReport.total }} exports covered
          </v-chip>
          <v-chip size="small" variant="tonal">@qnx/vuetify {{ libraryVersion }}</v-chip>
        </div>
        <v-btn
          icon="mdi-book-open-outline"
          href="https://qnx-vuetify-docs.vercel.app/"
          target="_blank"
          rel="noopener"
          aria-label="Documentation"
        />
        <v-btn
          icon="mdi-github"
          href="https://github.com/yatendra121/vq-vuetify"
          target="_blank"
          rel="noopener"
          aria-label="GitHub repository"
        />
        <v-btn
          :icon="theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
          :aria-label="theme === 'dark' ? 'Use light theme' : 'Use dark theme'"
          @click="toggleTheme"
        />
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-4 pa-md-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { version as libraryVersion } from '@qnx/vuetify/package.json'
import { coverage } from '@/views/ComponentShowcase/catalog'

const coverageReport = coverage()
const theme = ref('light')
const vuetifyTheme = useTheme()

// Overlays read the global theme, not the one on <v-app>.
watch(theme, (value) => vuetifyTheme.change(value))

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<style>
/* Keeps the full title on phones, next to the three header buttons. */
@media (max-width: 599.98px) {
  .v-app-bar .v-app-bar-title {
    font-size: 1rem;
  }
}
</style>
