<template>
  <v-btn size="small" variant="tonal" :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'" :data-testid="testId" @click="copy(text)">
    {{ copied ? 'Copied' : 'Copy' }}
  </v-btn>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineProps<{ text: string; testId?: string }>()

const { copy, copied } = useClipboard({ legacy: true })
</script>
