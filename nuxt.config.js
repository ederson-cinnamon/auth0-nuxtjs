require('dotenv').config()
export default {
  components: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "vue-nuxt-mongodb-graphql-apollo-tw",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // Add apollo module
  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/dotenv",
  ],
  apollo: {
    // Sets up the apollo client endpoints
    clientConfigs: {
      // recommended: use a file to declare the client configuration (see below for example)
      default: "~/plugins/my-alternative-apollo-config.js",
    },
  },
  auth: {
    redirect: {
      login: "/", // redirect user when not connected
      callback: "/auth/signed-in",
    },
    strategies: {
      local: false,
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID,
      },
    },
    plugins: ["~/plugins/auth.js"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
