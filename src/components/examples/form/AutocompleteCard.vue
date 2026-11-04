<template>
  <v-card variant="outlined" rounded="lg" border class="mb-4">
    <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
      <v-avatar size="32" color="indigo" variant="tonal" rounded="md">
        <v-icon icon="mdi-form-select" size="18" />
      </v-avatar>
      <span class="text-subtitle-1 font-weight-semibold">Autocomplete</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="pt-4">
      <v-row>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">
            vq-autocomplete (local items)
          </div>
          <vq-autocomplete
            variant="outlined"
            :items="genderItems"
            label="Gender"
            name="gender"
            prepend-inner-icon="mdi-gender-male-female"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">
            vq-autocomplete (multiple + chips)
          </div>
          <vq-autocomplete
            variant="outlined"
            :items="roleItems"
            label="Roles"
            name="roles"
            multiple
            chips
            closable-chips
            clear-on-select
            prepend-inner-icon="mdi-shield-account-outline"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-caption text-medium-emphasis mb-1">
            vq-autocomplete (remote action)
          </div>
          <vq-autocomplete
            variant="outlined"
            action="users"
            item-title="name"
            item-value="id"
            label="User (remote)"
            name="userId"
            prepend-inner-icon="mdi-account-search-outline"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const genderItems = ['male', 'female', 'other']
const roleItems = ['admin', 'editor', 'viewer', 'moderator']
</script>
