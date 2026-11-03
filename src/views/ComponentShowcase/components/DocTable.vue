<template>
  <v-table density="compact" class="showcase-table">
    <thead>
      <tr><th>Name</th><th>{{ payload ? 'Payload' : 'Type' }}</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <td><code>{{ row.name }}</code></td>
        <td><code>{{ row.type ?? '—' }}</code></td>
        <td class="showcase-table__wrap"><RichText :text="row.description" /></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { DocRow } from '../types'
import { RichText } from './RichText'

defineProps<{ rows: DocRow[]; payload?: boolean }>()
</script>
