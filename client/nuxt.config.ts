// https://nuxt.com/docs/api/configuration/nuxt-config
// <reference types="node" />
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],

  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css", "animate.css/animate.min.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  runtimeConfig: {
    apiBase: process.env.API_BASE || "http://localhost:3001",
  },
});
