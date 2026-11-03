<template>
  <slot :form="form" />
</template>

<script setup lang="ts">
import { useFormContext } from 'vee-validate'

// VqForm exposes no instance API. Rendered inside it, this hands the demo the
// same vee-validate context the fields register with.
const form = useFormContext()
</script>
