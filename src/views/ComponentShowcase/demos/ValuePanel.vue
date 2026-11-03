<template>
  <div class="showcase-values">
    <div class="d-flex align-center justify-space-between mb-1">
      <span class="text-label-medium text-medium-emphasis">{{ title }}</span>
    </div>
    <pre data-testid="showcase-values" class="showcase-code showcase-code--small">{{ printJson(value) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { printJson } from '../utils/reflect'

defineProps<{ title: string; value: unknown }>()
</script>
