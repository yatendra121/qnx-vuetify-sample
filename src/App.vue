<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar color="surface" elevation="0" border="b">
      <template #prepend>
        <v-icon icon="mdi-vuetify" size="26" color="primary" class="ml-3" />
      </template>
      <v-app-bar-title>
        <span class="font-weight-bold text-primary">@qnx/vuetify</span>
        <v-chip label size="x-small" color="primary" variant="tonal" class="ml-2">
          Component Showcase
        </v-chip>
      </v-app-bar-title>
    </v-app-bar>

    <!-- Left Navigation Drawer -->
    <v-navigation-drawer permanent width="220" color="surface-variant">
      <div class="pa-4 pb-2">
        <div class="text-caption font-weight-medium text-uppercase text-on-surface-variant">
          Components
        </div>
      </div>

      <v-list nav density="compact" class="px-2">
        <v-list-item
          v-for="item in navItems"
          :key="item.value"
          :value="item.value"
          :prepend-icon="item.icon"
          :title="item.label"
          rounded="lg"
          class="mb-1"
          :active="tab === item.value"
          active-color="primary"
          @click="tab = item.value"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-window v-model="tab">

        <!-- ─── Tab 1: Form Inputs ─── -->
        <v-window-item :value="1">
          <v-container max-width="1000" class="py-6">
            <div class="mb-6">
              <div class="text-h6 font-weight-bold">Form Components</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                All <code class="text-primary">@qnx/vuetify</code> input components with vee-validate + yup schema validation.
              </div>
            </div>

            <vq-form
              id="showcase-form"
              action="https://nx-next-ecommerce-production.up.railway.app/api/user"
              :validation-schema="userSchema"
              @submited-success="handleResponse"
              @submited-client-error="handleResponse"
              @submited-error="handleResponse"
              :errorResponseHandler="errorHandler"
            >
              <!-- Text Inputs -->
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
                      <vq-text-field :counter="50" label="Full Name" required name="name" prepend-inner-icon="mdi-account-outline" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <div class="text-caption text-medium-emphasis mb-1">vq-text-field (email)</div>
                      <vq-text-field label="E-mail" name="email" prepend-inner-icon="mdi-email-outline" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <div class="text-caption text-medium-emphasis mb-1">vq-text-field (number)</div>
                      <vq-text-field label="Mobile Number" required name="mobileNo" prepend-inner-icon="mdi-phone-outline" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis mb-1">vq-textarea</div>
                      <vq-textarea :rows="3" label="Address" name="address" prepend-inner-icon="mdi-map-marker-outline" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis mb-1">vq-otp-input</div>
                      <vq-otp-input label="OTP" name="otp" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Select & Autocomplete -->
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
                      <div class="text-caption text-medium-emphasis mb-1">vq-autocomplete (local items)</div>
                      <vq-autocomplete :items="genderItems" label="Gender" name="gender" prepend-inner-icon="mdi-gender-male-female" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <div class="text-caption text-medium-emphasis mb-1">vq-autocomplete (multiple)</div>
                      <vq-autocomplete :items="roleItems" label="Roles" name="roles" multiple prepend-inner-icon="mdi-shield-account-outline" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <div class="text-caption text-medium-emphasis mb-1">vq-autocomplete (remote action)</div>
                      <vq-autocomplete
                        action="https://nx-next-ecommerce-production.up.railway.app/api/user"
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

              <!-- Date / Time / Color -->
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
                    <v-col cols="12" md="3">
                      <div class="text-caption text-medium-emphasis mb-1">vq-date-picker</div>
                      <vq-date-picker label="Date" name="date" prepend-inner-icon="mdi-calendar-outline" />
                    </v-col>
<v-col cols="12" md="3">
                      <div class="text-caption text-medium-emphasis mb-1">vq-time-picker</div>
                      <vq-time-picker label="Time" name="time" prepend-inner-icon="mdi-clock-outline" />
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="text-caption text-medium-emphasis mb-1">vq-color-picker</div>
                      <vq-color-picker label="Color" name="color" prepend-inner-icon="mdi-palette-outline" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- File Inputs -->
              <v-card variant="outlined" rounded="lg" border class="mb-4">
                <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
                  <v-avatar size="32" color="orange" variant="tonal" rounded="md">
                    <v-icon icon="mdi-upload-outline" size="18" />
                  </v-avatar>
                  <span class="text-subtitle-1 font-weight-semibold">File Inputs</span>
                </v-card-title>
                <v-divider />
                <v-card-text class="pt-4">
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="text-caption text-medium-emphasis mb-1">vq-file-input</div>
                      <vq-file-input label="Attachment" name="file" accept="image/*,.pdf" prepend-inner-icon="mdi-paperclip" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Toggle Inputs -->
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
                      <div class="text-caption text-medium-emphasis mb-1">vq-checkbox (disabled)</div>
                      <vq-checkbox label="Is Verified" name="isVerified" disabled />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Submit -->
              <v-card variant="outlined" rounded="lg" border class="mb-4">
                <v-card-text class="pt-4">
                  <VqSubmitBtn type="submit" block color="primary">
                    <v-icon start icon="mdi-send" />
                    Submit Form
                  </VqSubmitBtn>
                </v-card-text>
              </v-card>

            </vq-form>
          </v-container>
        </v-window-item>

        <!-- ─── Tab 2: Datatable ─── -->
        <v-window-item :value="2">
          <v-container max-width="1000" class="py-6">
            <div class="mb-6">
              <div class="text-h6 font-weight-bold">Datatable</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                Server-side paginated table with filter support using
                <code class="text-primary">VqDataTable</code> + <code class="text-primary">vq-table-filter</code>.
              </div>
            </div>

            <v-card variant="outlined" rounded="lg" class="mb-4" border>
              <v-card-title class="d-flex align-center gap-2 pa-4">
                <v-avatar size="32" color="orange" variant="tonal" rounded="md">
                  <v-icon icon="mdi-filter-outline" size="18" />
                </v-avatar>
                <span class="text-subtitle-1 font-weight-semibold">vq-table-filter</span>
                <v-spacer />
                <vq-table-filter :id="datatableId">
                  <title-row>
                    <template #default>
                      <vq-text-field
                        name="search"
                        variant="underlined"
                        clearable
                        hide-details
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        style="min-width: 220px"
                      />
                    </template>
                  </title-row>
                </vq-table-filter>
              </v-card-title>
            </v-card>

            <v-card variant="outlined" rounded="lg" border>
              <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
                <v-avatar size="32" color="primary" variant="tonal" rounded="md">
                  <v-icon icon="mdi-table" size="18" />
                </v-avatar>
                <span class="text-subtitle-1 font-weight-semibold">VqDataTable</span>
                <v-spacer />
                <v-chip size="x-small" color="success" variant="tonal">GET /api/user</v-chip>
              </v-card-title>
              <v-divider />
              <VqDataTable
                :headers="headers"
                :id="datatableId"
                action="https://nx-next-ecommerce-production.up.railway.app/api/user"
              >
                <template #item="{ item, index }">
                  <tr>
                    <VqSerialNo :index="index + 1" />
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.createdAt }}</td>
                  </tr>
                </template>
              </VqDataTable>
            </v-card>
          </v-container>
        </v-window-item>

        <!-- ─── Tab 3: List ─── -->
        <v-window-item :value="3">
          <v-container max-width="1000" class="py-6">
            <div class="mb-6">
              <div class="text-h6 font-weight-bold">List</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                Paginated list with load-more support using
                <code class="text-primary">VqList</code> + <code class="text-primary">vq-table-filter</code>.
              </div>
            </div>

            <v-card variant="outlined" rounded="lg" class="mb-4" border>
              <v-card-title class="d-flex align-center gap-2 pa-4">
                <v-avatar size="32" color="orange" variant="tonal" rounded="md">
                  <v-icon icon="mdi-filter-outline" size="18" />
                </v-avatar>
                <span class="text-subtitle-1 font-weight-semibold">vq-table-filter</span>
                <v-spacer />
                <vq-table-filter :id="listId">
                  <title-row>
                    <template #default>
                      <vq-text-field
                        name="search"
                        variant="underlined"
                        clearable
                        hide-details
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        style="min-width: 220px"
                      />
                    </template>
                  </title-row>
                </vq-table-filter>
              </v-card-title>
            </v-card>

            <v-card variant="outlined" rounded="lg" border>
              <v-card-title class="d-flex align-center gap-2 pa-4 pb-3">
                <v-avatar size="32" color="primary" variant="tonal" rounded="md">
                  <v-icon icon="mdi-format-list-bulleted" size="18" />
                </v-avatar>
                <span class="text-subtitle-1 font-weight-semibold">VqList</span>
                <v-spacer />
                <v-chip size="x-small" color="success" variant="tonal">GET /api/user</v-chip>
              </v-card-title>
              <v-divider />
              <v-card-text class="pa-0">
                <VqList
                  density="compact"
                  action="https://nx-next-ecommerce-production.up.railway.app/api/user"
                  :id="listId"
                  :page-size="10"
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
        </v-window-item>

      </v-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ApiResponseValue } from "@qnx/composables";
import { VqSubmitBtn, VqColorPicker, VqFileInput } from "@qnx/vuetify";
import { AxiosError } from "axios";
import { ref } from "vue";
import { object, string, number, array, boolean, mixed, date } from "yup";
import { useVqList } from "@qnx/vuetify";
import { useVqDataTable, VqSerialNo, collectVqHeaders } from "@qnx/vuetify";

const tab = ref(1);

const navItems = [
  { value: 1, icon: "mdi-form-textbox", label: "Form Components" },
  { value: 2, icon: "mdi-table", label: "Datatable" },
  { value: 3, icon: "mdi-format-list-bulleted", label: "List" },
];

const userSchema = object({
  // Text Inputs
  name: string().required().min(2).max(50).label("Full Name"),
  email: string().email().required().label("E-mail"),
  mobileNo: number().typeError("Mobile Number must be a number").required().label("Mobile Number"),
  address: string().required().min(5).label("Address"),
  otp: string().required().length(6, "OTP must be exactly 6 digits").label("OTP"),

  // Autocomplete
  gender: string().required().oneOf(["male", "female", "other"]).label("Gender"),
  roles: array().of(string()).min(1, "Select at least one role").required().label("Roles"),
  userId: string().required().label("User"),

  // Date / Time / Color
  date: string().required().label("Date"),
time: string().required().label("Time"),
  color: string().required().label("Color"),

  // File
  file: mixed().required().label("Attachment"),

  // Toggles
  isAdmin: boolean().label("Is Admin"),
});

const genderItems = ["male", "female", "other"];
const roleItems = ["admin", "editor", "viewer", "moderator"];

const handleResponse = (res: any) => {
  alert(JSON.stringify(res));
};

const errorHandler = (res: AxiosError<ApiResponseValue>) => {
  alert(JSON.stringify(res.response?.data));
};

// List
const listId = "user_list";

const VqList = useVqList<{
  id: string;
  name: string;
  email: string;
  createdAt: string;
}>();

// Datatable
const datatableId = "user_data_table";
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
]);
</script>
