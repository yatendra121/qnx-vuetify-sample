<template>
  <v-card>
    <v-card-item>
      <v-card-title class="text-title-medium">
        Events
        <v-chip size="x-small" class="ms-1" data-testid="event-count">{{ events.length }}</v-chip>
      </v-card-title>
      <template #append>
        <v-btn size="small" variant="text" :disabled="!events.length" data-testid="clear-events" @click="$emit('clear')">Clear</v-btn>
      </template>
    </v-card-item>
    <v-divider />
    <div class="showcase-events" data-testid="event-log" aria-live="polite">
      <p v-if="!events.length" class="text-body-medium text-medium-emphasis pa-4">
        Interact with the preview. Emitted events and mock requests are listed here with their payloads.
      </p>
      <details v-for="event in events" :key="event.id" class="showcase-event" :open="event.id === events[0].id">
        <summary>
          <code :class="event.name === 'request' ? 'text-medium-emphasis' : 'text-primary'">{{ event.name }}</code>
          <span class="text-label-small text-medium-emphasis ms-auto">{{ event.time }}</span>
        </summary>
        <pre class="showcase-code showcase-code--small">{{ event.payload }}</pre>
      </details>
    </div>
  </v-card>
</template>

<script setup lang="ts">
export interface LoggedEvent {
  id: number
  name: string
  time: string
  payload: string
}

defineProps<{ events: LoggedEvent[] }>()
defineEmits<{ clear: [] }>()
</script>
