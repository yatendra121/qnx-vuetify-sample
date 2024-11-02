/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import vqVuetify from "@qnx/vuetify";
import { setAxiosInstance } from "@qnx/composables/axios";
import axios from "axios";

// Types
import type { App } from "vue";

const config = {
  baseURL: "https://api.yatendra.online/api/",
};

const _axios = axios.create(config);

export function registerPlugins(app: App) {
  loadFonts();
  setAxiosInstance(_axios);
  app.use(vuetify).use(router).use(pinia).use(vqVuetify);
}
