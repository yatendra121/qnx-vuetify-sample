<template>
  <v-card variant="outlined" rounded="lg" border class="mb-4">
    <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
      <v-avatar size="32" color="green" variant="tonal" rounded="md">
        <v-icon icon="mdi-toggle-switch-outline" size="18" />
      </v-avatar>
      <span class="text-subtitle-1 font-weight-semibold">Toggle Inputs</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="pt-4">
      <v-row>
        <v-col cols="12" md="3">
          <div class="text-caption text-medium-emphasis mb-1">vq-checkbox</div>
          <vq-checkbox label="Is Admin" name="isAdmin" />
        </v-col>
        <v-col cols="12" md="3">
          <div class="text-caption text-medium-emphasis mb-1">
            vq-checkbox (disabled)
          </div>
          <vq-checkbox label="Is Verified" name="isVerified" disabled />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// All fields bind to the parent VqForm via vee-validate.
// No local state needed — field names must match the parent form's validationSchema.
</script>
