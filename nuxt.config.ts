import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  plugins: ["~/plugins/socket.ts"],

  build: {
    transpile: ["vuetify"],
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "nuxt-twemoji",
    "@nuxtjs/tailwindcss",
    "nuxt-monaco-editor",
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
  monacoEditor: {
    // These are default values:
    locale: "en",
    componentName: {
      codeEditor: "MonacoEditor",
      diffEditor: "MonacoDiffEditor",
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  /*app: {
    baseURL: "/v1/",
    cdnURL: "/",
  },*/

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_VERSION: process.env.API_VERSION,
      SOCKET_URL: process.env.SOCKET_URL,
    },
  },

  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },

  compatibilityDate: "2024-07-24",
});
