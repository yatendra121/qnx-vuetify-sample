<template>
  <ClientOnly>
    <v-app :theme="isDark ? 'dark' : 'light'" style="display: contents">
      <div class="vdemo-wrap">
        <slot />
      </div>
    </v-app>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
const { isDark } = useData()
</script>

<style>
/* Use .vp-doc prefix to match VitePress specificity and win the cascade */
.vp-doc .vdemo-wrap,
.vp-doc .vdemo-wrap * {
  box-sizing: border-box !important;
  text-align: left !important;
}

.vp-doc .vdemo-wrap p,
.vp-doc .vdemo-wrap h1,
.vp-doc .vdemo-wrap h2,
.vp-doc .vdemo-wrap h3,
.vp-doc .vdemo-wrap h4,
.vp-doc .vdemo-wrap h5,
.vp-doc .vdemo-wrap h6,
.vp-doc .vdemo-wrap ul,
.vp-doc .vdemo-wrap ol,
.vp-doc .vdemo-wrap li {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  color: inherit !important;
}

.vp-doc .vdemo-wrap a {
  color: inherit !important;
  text-decoration: none !important;
  font-weight: inherit !important;
}

.vp-doc .vdemo-wrap a:hover {
  text-decoration: none !important;
}

.vp-doc .vdemo-wrap th {
  border-top: none !important;
  text-align: left !important;
}

.vp-doc .vdemo-wrap td {
  border: none !important;
}

/* Vuetify label / input text alignment */
.vp-doc .vdemo-wrap .v-label,
.vp-doc .vdemo-wrap .v-field__input,
.vp-doc .vdemo-wrap .v-field__field,
.vp-doc .vdemo-wrap .v-messages__message,
.vp-doc .vdemo-wrap .v-card-title,
.vp-doc .vdemo-wrap .v-card-text,
.vp-doc .vdemo-wrap .v-list-item-title,
.vp-doc .vdemo-wrap .v-btn__content {
  text-align: left !important;
  letter-spacing: normal !important;
}
</style>
