<template>
  <v-tabs v-model="tab" align-tabs="center" color="primary">
    <v-tab :value="1">Form Components</v-tab>
    <v-tab :value="2">Datatable</v-tab>
    <v-tab :value="3">List</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item :value="1">
      <v-container fluid>
        <v-card>
          <FormComponent />
        </v-card>
        <vq-form
          id="test"
          action="https://api.yatendra.tech/api/user"
          :validation-schema="userSchema"
          @submited-success="handleResponse"
          @submited-client-error="handleResponse"
          @submited-error="handleResponse"
          :errorResponseHandler="errorHandler"
        >
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <vq-text-field
                  :counter="10"
                  label="Name"
                  required
                  name="name"
                ></vq-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <vq-text-field label="E-mail" name="email"></vq-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <vq-text-field
                  label="Mobile Number"
                  required
                  name="mobileNo"
                ></vq-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <vq-autocomplete
                  :items="genderItems"
                  label="Gender"
                  name="gender"
                ></vq-autocomplete>
              </v-col>

              <v-col cols="12" md="4">
                <vq-date-picker label="Date" name="date"></vq-date-picker>
              </v-col>
              <v-col cols="12" md="4">
                <vq-time-picker label="Time" name="time"></vq-time-picker>
              </v-col>
              <v-col cols="12" md="4">
                <vq-otp-input label="OTP" name="otp"></vq-otp-input>
              </v-col>
              <v-col cols="12" md="4">
                <vq-textarea label="Address" name="address"></vq-textarea>
              </v-col>
              <v-col cols="12" md="4">
                <vq-checkbox label="Is Admin" name="isAdmin"></vq-checkbox>
              </v-col>

              <VqSubmitBtn type="submit" block class="mt-2">Submit</VqSubmitBtn>
            </v-row>
          </v-container>
        </vq-form>
      </v-container>
    </v-window-item>

    <v-window-item :value="2">
      <v-container>
        <v-card>
          <v-responsive>
            <vq-table-filter :id="datatableId">
              <title-row>
                <template #default>
                  <v-row justify="center">
                    <v-col lg="3" md="3" sm="3" xs="12">
                      <vq-text-field
                        name="search"
                        class="pa-2"
                        variant="underlined"
                        clearable
                        hide-details
                        label="Search"
                      >
                      </vq-text-field>
                    </v-col>
                  </v-row>
                </template>
              </title-row>
            </vq-table-filter> </v-responsive></v-card
      ></v-container>
      <v-container>
        <v-card>
          <v-responsive>
            <VqDataTable :headers="headers" :id="datatableId" action="user">
              <template #item="{ item, index }">
                <tr>
                  <VqSerialNo :index="index + 1" />
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.createdAt }}</td>
                </tr>
              </template>
            </VqDataTable>
          </v-responsive>
        </v-card>
      </v-container>
    </v-window-item>
    <v-window-item :value="3">
      <v-container>
        <v-card>
          <v-responsive>
            <vq-table-filter :id="id">
              <title-row>
                <template #default>
                  <v-row justify="center">
                    <v-col lg="3" md="3" sm="3" xs="12">
                      <vq-text-field
                        name="search"
                        class="pa-2"
                        variant="underlined"
                        clearable
                        hide-details
                        label="Search"
                      >
                      </vq-text-field>
                    </v-col>
                  </v-row>
                </template>
              </title-row>
            </vq-table-filter> </v-responsive></v-card
      ></v-container>

      <v-container>
        <v-card>
          <v-responsive>
            <VqList density="compact" action="user" :id="id" :page-size="10">
              <template #default="{ items }">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Id</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody v-if="items.length">
                    <tr v-for="item in items" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td>No record founds.</td>
                    </tr>
                  </tbody>
                </v-table>
                <v-sheet
                  class="mt-auto align-center justify-center d-flex px-2 pa-2 ma-2"
                  color="grey lighten-6"
                >
                  <vq-list-load-more-btn> </vq-list-load-more-btn>
                </v-sheet>
              </template>
            </VqList>
          </v-responsive>
        </v-card>
      </v-container>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import { ApiResponseValue } from "@qnx/composables";
import { VqSubmitBtn } from "@qnx/vuetify";
import { AxiosError } from "axios";
import { ref } from "vue";
import { object, string, number, date } from "yup";
import { useVqList } from "@qnx/vuetify";
import { useVqDataTable, VqSerialNo, collectVqHeaders } from "@qnx/vuetify";
import FormComponent from "./components/FormComponent.md";

const tab = ref(1);

let userSchema = object({
  name: string().required().label("Name"),
  mobileNo: number().required().label("MobileNo"),
  //  age: number().required().positive().integer().label("Age"),
  email: string().email().required().label("Email"),
  gender: string().required().label("Gender"),
  address: string().required().label("Address"),
});

const genderItems = ["male", "female"];

const handleResponse = (res: any) => {
  alert(JSON.stringify(res));
};

const errorHandler = (res: AxiosError<ApiResponseValue>) => {
  alert(JSON.stringify(res.response?.data));
};

//List
const id = "user_list";

const VqList = useVqList<{
  id: string;
  name: string;
  email: string;
  createdAt: string;
}>();

//datatable
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
