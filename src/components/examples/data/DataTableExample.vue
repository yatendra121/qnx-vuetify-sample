<template>
  <v-container max-width="1000" class="py-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="text-h6 font-weight-bold">Datatable</div>
      <div class="text-body-2 text-medium-emphasis mt-1">
        Server-side paginated table with filter support using
        <code class="text-primary">VqDataTable</code> +
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
        <vq-table-filter :id="tableId">
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

    <!-- Table -->
    <v-card variant="outlined" rounded="lg" border>
      <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
        <v-avatar size="32" color="primary" variant="tonal" rounded="md">
          <v-icon icon="mdi-table" size="18" />
        </v-avatar>
        <span class="text-subtitle-1 font-weight-semibold">VqDataTable</span>
        <v-spacer />
        <v-chip size="x-small" color="success" variant="tonal"
          >GET /api/user</v-chip
        >
      </v-card-title>
      <v-divider />

      <VqDataTable
        :id="tableId"
        :headers="headers"
        action="https://nx-next-ecommerce-production.up.railway.app/api/user"
      >
        <template #item="{ item, index }">
          <tr>
            <VqSerialNo :index="index + 1" />
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.createdAt }}</td>
            <td>
              <!-- <VqDatatableItemAction
                :id="tableId"
                :item-id="String(item.id)"
                action="https://nx-next-ecommerce-production.up.railway.app/api/user/change-status"
                method="PUT"
                title="Change Status"
                description="Are you sure you want to change the status of this user?"
              /> -->
            </td>
          </tr>
        </template>
      </VqDataTable>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {
  VqSerialNo,
  //VqDatatableItemAction,
  collectVqHeaders,
  useVqDataTable,
} from "@qnx/vuetify";

const tableId = "user_data_table";

const VqDataTable = useVqDataTable<{
  id: string;
  name: string;
  email: string;
  createdAt: string;
}>();

const headers = collectVqHeaders([
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Created At", key: "createdAt" },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>
