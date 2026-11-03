<template>
  <v-card variant="outlined" rounded="lg" border class="mb-4">
    <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
      <v-avatar size="32" color="primary" variant="tonal" rounded="md">
        <v-icon icon="mdi-text-box-outline" size="18" />
      </v-avatar>
      <span class="text-subtitle-1 font-weight-semibold">Text Inputs</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="pt-4">
      <v-row>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">vq-text-field</div>
          <vq-text-field
            variant="outlined"
            :counter="50"
            label="Full Name"
            required
            name="name"
            prepend-inner-icon="mdi-account-outline"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">vq-text-field (email)</div>
          <vq-text-field
            variant="outlined"
            label="E-mail"
            name="email"
            prepend-inner-icon="mdi-email-outline"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">vq-text-field (number)</div>
          <vq-text-field
            variant="outlined"
            label="Mobile Number"
            required
            name="mobileNo"
            prepend-inner-icon="mdi-phone-outline"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-caption text-medium-emphasis mb-1">vq-textarea</div>
          <vq-textarea
            variant="outlined"
            :rows="3"
            label="Address"
            name="address"
            prepend-inner-icon="mdi-map-marker-outline"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-caption text-medium-emphasis mb-1">vq-otp-input</div>
          <vq-otp-input label="OTP" name="otp" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// All fields bind to the parent VqForm via vee-validate.
// No local state needed — field names must match the parent form's validationSchema.
</script>
