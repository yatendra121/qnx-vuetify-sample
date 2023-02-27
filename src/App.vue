<template>
  <vq-form
    id="test"
    action="test"
    :validation-schema="userSchema"
    @submited-success="handleResponse"
    @submited-client-error="handleResponse"
    @submited-error="handleResponse"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <vq-text-field
            :counter="10"
            label="First name"
            required
            name="firstName"
          ></vq-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <vq-text-field
            :counter="10"
            label="Last name"
            name="lastName"
          ></vq-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <vq-text-field label="E-mail" name="email"></vq-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <vq-autocomplete
            :items="genderItems"
            label="Gender"
            name="gender"
          ></vq-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <vq-textarea label="Address" name="address"></vq-textarea>
        </v-col>
        <!-- <v-col cols="12" md="4">
          <vq-checkbox label="Is Admin" name="isAdmin"></vq-checkbox>
        </v-col> -->

        <VqSubmitBtn type="submit" block class="mt-2">Submit</VqSubmitBtn>
      </v-row>
    </v-container>
  </vq-form>
</template>

<script setup lang="ts">
import { VqSubmitBtn } from "@qnx/vuetify";
import { object, string, number, date } from "yup";

let userSchema = object({
  firstName: string().required().label("First Name"),
  lastName: string().required().label("Last Name"),
  //  age: number().required().positive().integer().label("Age"),
  email: string().email().required().label("Email"),
  gender: string().required().label("Gender"),
  address: string().required().label("Address"),
});

const genderItems = ["Male", "Female"];

const handleResponse = (res: any) => {
  console.log({ res });
};
</script>
