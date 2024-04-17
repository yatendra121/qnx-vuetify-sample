```vue
<template>
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
          <vq-text-field :counter="10" label="Name" required name="name"></vq-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <vq-text-field label="E-mail" name="email"></vq-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <vq-text-field label="Mobile Number" required name="mobileNo"></vq-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <vq-autocomplete :items="genderItems" label="Gender" name="gender"></vq-autocomplete>
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
</template>
<script lang="ts" setup>
import { VqSubmitBtn } from "@qnx/vuetify";
import { AxiosError } from "axios";
import { ref } from "vue";
import { object, string, number, date } from "yup";

let userSchema = object({
  name: string().required().label("Name"),
  mobileNo: number().required().label("MobileNo"),
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
</script>
```
