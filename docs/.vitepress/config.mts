import Unocss from "unocss/vite";
import { defineConfig } from "vitepress";
import { version } from "../../package.json";

export default defineConfig({
  title: "@qnx/vuetify",
  description:
    "Simplify Vuetify forms with easy handling of validation, data management, and submission",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Components", link: "/components/" },
      { text: "Composables", link: "/composables/" },
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
        text: "Components",
        items: [
          { text: "Form Components", link: "/components/form" },
          { text: "Other Components", link: "/components/other" },
          { text: "Integration Components", link: "/components/integration" },
        ],
      },
      {
        text: "Composables",
        items: [{ text: "Form Composables", link: "/composables" }],
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
