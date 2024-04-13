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
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItPrism from "markdown-it-prism";
import MarkdownItHighlightJS from "markdown-it-highlightjs";

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
      // markdownItOptions: {
      //   html: true,
      //   linkify: true,
      //   typographer: true,
      // },
      markdownItSetup(md) {
        // for example
        md.use(MarkdownItAnchor);
        md.use(MarkdownItPrism);
        md.use(MarkdownItHighlightJS);
      },
      // headEnabled: true,
      // markdownItUses: [prism],
    }),
    // Pages({
    //   pagesDir: "pages",
    //   extensions: ["vue", "md"],
    // }),
    // Inspect(),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue", ".md"],
  },
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
});
