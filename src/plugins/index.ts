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
import { setAxiosInstance, AxiosPlugin } from "@qnx/composables/axios";
import axios from "axios";

// Types
import type { App } from "vue";

const config = {
  baseURL: "https://api.yatendra.online/api/",
};

const _axios = axios.create(config);

AxiosPlugin.setInstance(_axios);

export function registerPlugins(app: App) {
  loadFonts();

  app.use(vuetify).use(router).use(pinia).use(vqVuetify);
}
