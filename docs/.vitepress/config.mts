import { readFileSync } from "node:fs";
import { defineConfig } from "vitepress";

// The docs describe the installed build, so the nav shows exactly that version.
const { version } = JSON.parse(
  readFileSync(new URL("../../node_modules/@qnx/vuetify/package.json", import.meta.url), "utf-8"),
);

const vuetifyApi = (text: string, slug: string) => ({
  text,
  link: `https://vuetifyjs.com/api/${slug}`,
});

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["vuetify", "@qnx/vuetify"],
    },
  },
  title: "@qnx/vuetify",
  description:
    "Vuetify 4 form inputs, server-driven tables, and lists with built-in validation and API submission",
  themeConfig: {
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/yatendra121/qnx-vuetify-sample" }],
    editLink: {
      pattern: "https://github.com/yatendra121/qnx-vuetify-sample/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Components", link: "/components/" },
      { text: "Composables", link: "/composables/" },
      { text: "Playground", link: "https://qnx-vuetify-sample.vercel.app/" },
      {
        text: `v${version}`,
        items: [
          { text: "Library repository", link: "https://github.com/yatendra121/vq-vuetify" },
          { text: "Changelog", link: "https://github.com/yatendra121/vq-vuetify/blob/main/CHANGELOG.md" },
          { text: "Vuetify 4", link: "https://vuetifyjs.com" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Installation", link: "/guide/installation/" },
          { text: "Usage", link: "/guide/usage/" },
          { text: "Server Contract", link: "/guide/server-contract" },
          { text: "Limitations", link: "/guide/limitations" },
        ],
      },
      {
        text: "Form Components",
        collapsed: false,
        items: [
          { text: "Overview", link: "/components/form" },
          { text: "VqForm", link: "/components/form/vq-form" },
          { text: "VqTextField", link: "/components/form/vq-text-field" },
          { text: "VqTextarea", link: "/components/form/vq-textarea" },
          { text: "VqCheckbox", link: "/components/form/vq-checkbox" },
          { text: "VqAutocomplete", link: "/components/form/vq-autocomplete" },
          { text: "VqDatePicker", link: "/components/form/vq-date-picker" },
          { text: "VqTimePicker", link: "/components/form/vq-time-picker" },
          { text: "VqColorPicker", link: "/components/form/vq-color-picker" },
          { text: "VqOtpInput", link: "/components/form/vq-otp-input" },
          { text: "VqFileInput", link: "/components/form/vq-file-input" },
          { text: "VqFileUpload", link: "/components/form/vq-file-upload" },
          { text: "VqSubmitBtn", link: "/components/form/vq-submit-btn" },
        ],
      },
      {
        text: "Data Components",
        collapsed: false,
        items: [
          { text: "Overview", link: "/components/data" },
          { text: "VqDataTable", link: "/components/data/vq-data-table" },
          { text: "VqSerialNo", link: "/components/data/vq-serial-no" },
          { text: "VqList", link: "/components/data/vq-list" },
          { text: "VqListLoadMoreBtn", link: "/components/data/vq-list-load-more-btn" },
          { text: "VqTableFilter", link: "/components/data/vq-table-filter" },
        ],
      },
      {
        text: "Integration Components",
        collapsed: false,
        items: [
          { text: "Overview", link: "/components/integration" },
          { text: "VqTextEditor", link: "/components/integration/vq-text-editor" },
        ],
      },
      {
        text: "Composables & Utilities",
        collapsed: false,
        items: [
          { text: "Overview", link: "/composables/" },
          { text: "useVqForm", link: "/composables/use-vq-form" },
          { text: "useVqDataTable", link: "/composables/use-vq-data-table" },
          { text: "useVqList", link: "/composables/use-vq-list" },
          { text: "useFormFilterRepository", link: "/composables/use-form-filter-repository" },
          { text: "collectVqHeaders", link: "/composables/collect-vq-headers" },
          { text: "List item helpers", link: "/composables/list-item-helpers" },
          { text: "setVqLocale", link: "/composables/set-vq-locale" },
        ],
      },
      {
        text: "Vuetify 4 API",
        collapsed: true,
        items: [
          vuetifyApi("VTextField", "v-text-field"),
          vuetifyApi("VTextarea", "v-textarea"),
          vuetifyApi("VAutocomplete", "v-autocomplete"),
          vuetifyApi("VCheckbox", "v-checkbox"),
          vuetifyApi("VFileInput", "v-file-input"),
          vuetifyApi("VFileUpload", "v-file-upload"),
          vuetifyApi("VDatePicker", "v-date-picker"),
          vuetifyApi("VTimePicker", "v-time-picker"),
          vuetifyApi("VColorPicker", "v-color-picker"),
          vuetifyApi("VOtpInput", "v-otp-input"),
          vuetifyApi("VBtn", "v-btn"),
          vuetifyApi("VDataTableServer", "v-data-table-server"),
          vuetifyApi("VList", "v-list"),
        ],
      },
    ],
  },
});
