import axios from "axios";
import { AxiosPlugin } from "@qnx/composables/axios";

export const _axios = axios.create({
  baseURL: "https://api.yatendra.online/api/",
});

AxiosPlugin.setInstance(_axios);
