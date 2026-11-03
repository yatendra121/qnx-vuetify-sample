<template>
  <v-container max-width="1000" class="py-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="text-h6 font-weight-bold">List</div>
      <div class="text-body-2 text-medium-emphasis mt-1">
        Paginated list with load-more support using
        <code class="text-primary">VqList</code> +
        <code class="text-primary">VqTableFilter</code>.
      </div>
    </div>

    <!-- Filter bar -->
    <v-card variant="outlined" rounded="lg" class="mb-4" border>
      <v-card-title class="d-flex align-center gap-2 pa-4">
        <v-avatar size="32" color="orange" variant="tonal" rounded="md">
          <v-icon icon="mdi-filter-outline" size="18" />
        </v-avatar>
        <span class="text-subtitle-1 font-weight-semibold">VqTableFilter</span>
        <v-spacer />
        <vq-table-filter :id="listId">
          <vq-text-field
            name="search"
            variant="underlined"
            clearable
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
            style="min-width: 220px"
          />
        </vq-table-filter>
      </v-card-title>
    </v-card>

    <!-- List -->
    <v-card variant="outlined" rounded="lg" border>
      <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
        <v-avatar size="32" color="primary" variant="tonal" rounded="md">
          <v-icon icon="mdi-format-list-bulleted" size="18" />
        </v-avatar>
        <span class="text-subtitle-1 font-weight-semibold">VqList</span>
        <v-spacer />
        <v-chip size="x-small" color="success" variant="tonal">GET users</v-chip>
      </v-card-title>
      <v-divider />

      <v-card-text class="pa-0">
        <VqList
          :id="listId"
          :page-size="10"
          action="users"
        >
          <template #default="{ items }">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Created At</th>
                </tr>
              </thead>
              <tbody v-if="items.length">
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.createdAt }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center text-medium-emphasis pa-4">
                    <v-icon icon="mdi-inbox-outline" class="mr-2" />
                    No records found.
                  </td>
                </tr>
              </tbody>
            </v-table>

            <v-sheet class="d-flex align-center justify-center pa-3">
              <vq-list-load-more-btn />
            </v-sheet>
          </template>
        </VqList>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useVqList } from '@qnx/vuetify'

const listId = 'user_list'

const VqList = useVqList<{
  id: number
  name: string
  email: string
  createdAt: string
}>()
</script>
