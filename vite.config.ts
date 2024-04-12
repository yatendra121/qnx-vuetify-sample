// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import Markdown from "unplugin-vue-markdown/vite";
import Pages from "vite-plugin-pages";
import prism from "markdown-it-prism";
import Inspect from "vite-plugin-inspect";

//import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    Markdown({
      headEnabled: true,
      markdownItUses: [prism],
    }),
    Pages({
      pagesDir: "pages",
      extensions: ["vue", "md"],
    }),
    Inspect(),
  ],
  // define: { "process.env": {} },
  // resolve: {
  //   alias: {
  //     "@": fileURLToPath(new URL("./src", import.meta.url)),
  //   },
  //   extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  // },
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
});
