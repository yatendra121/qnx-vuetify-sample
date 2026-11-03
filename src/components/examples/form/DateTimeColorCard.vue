<template>
  <v-card variant="outlined" rounded="lg" border class="mb-4">
    <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
      <v-avatar size="32" color="teal" variant="tonal" rounded="md">
        <v-icon icon="mdi-calendar-clock" size="18" />
      </v-avatar>
      <span class="text-subtitle-1 font-weight-semibold">Date / Time / Color</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="pt-4">
      <v-row>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">vq-date-picker</div>
          <!-- variant="filled" is the Vuetify 4 default for text-field trigger -->
          <vq-date-picker
            variant="outlined"
            label="Date"
            name="date"
            prepend-inner-icon="mdi-calendar-outline"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">vq-time-picker</div>
          <vq-time-picker
            variant="outlined"
            label="Time"
            name="time"
            prepend-inner-icon="mdi-clock-outline"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">vq-color-picker</div>
          <vq-color-picker
            variant="outlined"
            label="Color"
            name="color"
            prepend-inner-icon="mdi-palette-outline"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// All fields bind to the parent VqForm via vee-validate.
// No local state needed — field names must match the parent form's validationSchema.
</script>
