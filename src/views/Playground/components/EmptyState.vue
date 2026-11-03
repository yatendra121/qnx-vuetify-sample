<template>
  <div class="d-flex flex-column align-center text-center ga-2 pa-8">
    <v-avatar color="primary" variant="tonal" size="56">
      <v-icon icon="mdi-inbox-outline" size="28" />
    </v-avatar>
    <p class="text-title-medium font-weight-medium mb-0">{{ title }}</p>
    <p v-if="description" class="text-body-medium text-medium-emphasis mb-0">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; description?: string }>()
</script>
