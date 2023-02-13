

export default {
  dev: process.env.NODE_ENV !== "production",
  env:{
  },
  publicRuntimeConfig: {
    VUE_APP_BASE_API:process.env.VUE_APP_BASE_API,
    VUE_APP_STORE_LOGIN_SITE:process.env.VUE_APP_STORE_LOGIN_SITE,
    VUE_APP_STORE_REGISTER_SITE:process.env.VUE_APP_STORE_REGISTER_SITE,
    VUE_APP_MATCHMARKER_LOGIN_SITE:process.env.VUE_APP_MATCHMARKER_LOGIN_SITE,
    VUE_APP_MATCHMARKER_REGISTER_SITE:process.env.VUE_APP_MATCHMARKER_REGISTER_SITE
  },
  privateRuntimeConfig: {
  },
  server: {
    port: 3001,
    host: "127.0.0.1",
  },
  build: {
    vendor: ['element-ui'],
    extend(config, { isClient }) {
      // 为 客户端打包 进行扩展配置
      if (isClient) {
      }
    },
  },
  head: {
    title: "官网",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Meta description" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://at.alicdn.com/t/font_2558045_8glacqskg1u.css",
      },
    ],
    script: [
    ],
  },
  loading: { color: "#5575ce" },
  router: {
    middleware: ["userAuth"],
  },
  plugins: ["~/plugins/axios.js","~/plugins/vue-inject.js", "~/plugins/lazy-load.js",{src:'~plugins/element-ui', ssr: true} ],
  css: ["@/assets/css/base.less",{src:'@/assets/css/theme/index.css'}],
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    retry: { retries: 3 },
    withCredentials: true,
  },
  proxy: {
    "/api/": { target: "http://dev.95175.com/api", pathRewrite: { "^/api/": "" } }, //开发环境的代理
  },
  serverMiddleware: ["~/server/index.js"],
};
