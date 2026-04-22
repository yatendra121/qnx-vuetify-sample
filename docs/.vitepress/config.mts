import { defineConfig } from "vitepress";
import { version } from "../../package.json";

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['vuetify', '@qnx/vuetify'],
    },
  },
  title: "@qnx/vuetify",
  description:
    "Simplify Vuetify forms with easy handling of validation, data management, and submission",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Components", link: "/components/" },
      { text: "Composables", link: "/composables/" },
      {
        text: "Vuetify 4",
        link: "https://vuetifyjs.com",
        target: "_blank",
      },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Installation", link: "/guide/installation" },
          { text: "Usage", link: "/guide/usage" },
        ],
      },
      {
        text: "Form Components",
        collapsed: false,
        items: [
          { text: "Overview", link: "/components/form" },
          { text: "VqForm", link: "/components/form/vq-form" },
          { text: "useVqForm", link: "/components/form/use-vq-form" },
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
          { text: "Overview", link: "/components/other" },
          { text: "VqDataTable", link: "/components/data/vq-data-table" },
          { text: "useVqDataTable", link: "/components/data/use-vq-data-table" },
          { text: "collectVqHeaders", link: "/components/data/collect-vq-headers" },
          { text: "VqSerialNo", link: "/components/data/vq-serial-no" },
          { text: "VqDatatableItemAction", link: "/components/data/vq-datatable-item-action" },
          { text: "VqList", link: "/components/data/vq-list" },
          { text: "useVqList", link: "/components/data/use-vq-list" },
          { text: "VqTableFilter", link: "/components/data/vq-table-filter" },
          { text: "VqListLoadMoreBtn", link: "/components/data/vq-list-load-more-btn" },
          { text: "MessageQueue", link: "/components/data/message-queue" },
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
        text: "Composables",
        collapsed: false,
        items: [
          { text: "Overview", link: "/composables/" },
          { text: "useVqForm", link: "/composables/use-vq-form" },
          { text: "useVqDataTable", link: "/composables/use-vq-data-table" },
          { text: "useVqList", link: "/composables/use-vq-list" },
          { text: "collectVqHeaders", link: "/composables/collect-vq-headers" },
          { text: "useMessageInstance", link: "/composables/use-message-instance" },
          { text: "useFormFilterRepository", link: "/composables/use-form-filter-repository" },
          { text: "useListRepository", link: "/composables/use-list-repository" },
        ],
      },
      {
        text: "Vuetify 4 API Docs",
        collapsed: true,
        items: [
          {
            text: "VTextField",
            link: "https://vuetifyjs.com/api/v-text-field",
          },
          {
            text: "VTextarea",
            link: "https://vuetifyjs.com/api/v-textarea",
          },
          {
            text: "VAutocomplete",
            link: "https://vuetifyjs.com/api/v-autocomplete",
          },
          {
            text: "VCheckbox",
            link: "https://vuetifyjs.com/api/v-checkbox",
          },
          {
            text: "VFileInput",
            link: "https://vuetifyjs.com/api/v-file-input",
          },
          {
            text: "VDatePicker",
            link: "https://vuetifyjs.com/api/v-date-picker",
          },
          {
            text: "VTimePicker",
            link: "https://vuetifyjs.com/api/v-time-picker",
          },
          {
            text: "VColorPicker",
            link: "https://vuetifyjs.com/api/v-color-picker",
          },
          {
            text: "VOtpInput",
            link: "https://vuetifyjs.com/api/v-otp-input",
          },
          {
            text: "VDataTableServer",
            link: "https://vuetifyjs.com/api/v-data-table-server",
          },
          {
            text: "VList",
            link: "https://vuetifyjs.com/api/v-list",
          },
        ],
      },
    ],
  },
});

// export default defineConfig({
//   base: "/",
//   description: "Blog included. Built on top of VitePress and UnoCSS.",
//   markdown: {
//     headers: {
//       level: [0, 0],
//     },
//   },
//   themeConfig: {
//     footer: {
//       message: "VitePress Blog Starter",
//       copyright: "Copyright © 2023 SFXCode",
//     },
//     search: {
//       provider: "local",
//     },
//     socialLinks: [{ icon: "github", link: "https://github.com/sfxcode/vitepress-blog-starter" }],
//     editLink: {
//       pattern: "https://github.com/sfxcode/vitepress-blog-starter/edit/main/docs/:path",
//       text: "Edit this page on GitHub",
//     },
//     nav: nav(),
//     sidebar: {
//       "/guide/": sidebarGuide(),
//       "/config/": sidebarConfig(),
//     },
//     blog: {
//       title: "My Blog",
//       description: "Some articles for sample Blog",
//     },
//   },
//   title: "VitePress Blog Starter",
//   vite: {
//     plugins: [
//       Unocss({
//         configFile: "../../unocss.config.ts",
//       }),
//     ],
//   },
// });

// function nav() {
//   return [
//     { text: "Guide", link: "/guide/", activeMatch: "/guide/" },
//     { text: "Configs", link: "/config/", activeMatch: "/config/" },
//     { text: "Blog", link: "/blog/", activeMatch: "/blog/" },
//     {
//       text: "External Docs",
//       items: [
//         {
//           text: "Vitepress",
//           link: "https://vitepress.vuejs.org",
//         },
//         {
//           text: "UnoCSS",
//           link: "https://uno.antfu.me",
//         },
//       ],
//     },
//     {
//       text: version,
//       items: [
//         {
//           text: "Changelog",
//           link: "https://github.com/sfxcode/vitepress-blog-starter/blob/main/CHANGELOG.md",
//         },
//       ],
//     },
//   ];
// }

// function sidebarGuide() {
//   return [
//     {
//       text: "Introduction",
//       collapsible: true,
//       items: [{ text: "What is this?", link: "/guide/" }],
//     },
//     {
//       text: "Features",
//       collapsible: true,
//       items: [{ text: "UnoCSS", link: "/guide/features/unocss" }],
//     },
//   ];
// }

// function sidebarConfig() {
//   return [
//     {
//       text: "Config",
//       items: [
//         { text: "Introduction", link: "/config/" },
//         { text: "UnoCSS", link: "/config/unocss" },
//       ],
//     },
//   ];
// }

function test() {
  return [
    {
      text: "Guild",
      items: [
        { text: "Introduction", link: "/guide/" },
        { text: "Installation", link: "/guide/installation" },
        { text: "Usage", link: "/guide/usage" },
      ],
    },
    {
      text: "Components",
      items: [
        { text: "Form Components", link: "/components/form-components" },
        { text: "Other Components", link: "/components/other-components" },
        { text: "Integration Components", link: "/components/integration-components" },
      ],
    },
    {
      text: "Composables",
      items: [{ text: "Form Composables", link: "/composables/form-composables" }],
    },
  ];
}
