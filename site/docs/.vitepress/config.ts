import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sy Vue UI",
  base: process.env.NODE_ENV === "production" ? "/sy-vue-ui" : "/",
  description: "一个基于Vue3的组件库",
  themeConfig: {
    nav: [
      { text: "指南", link: "/guild/install" },
      { text: "组件", link: "/components/button" },
    ],

    sidebar: {
      "/guild/": [
        {
          text: "基础",
          items: [
            { text: "安装", link: "/guild/install" },
            { text: "快速开始", link: "/guild/quickstart" },
          ],
        },
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [{ text: "按钮 button", link: "/components/button" }],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/sssx-li/sy-vue-ui/tree/master",
      },
    ],
  },
});
