export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'frontend-mentor-4',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    }
    ],

    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  generate: {
    dir: 'dist'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{
    src: '~plugins/leaflet.js',
    mode: 'client'
  }],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',

  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    "@nuxtjs/proxy",
  ],
  axios: {
    proxy: true
  },
  proxy: ["https://geo.ipify.org/api/v1"],
  fontawesome: {
    icons: {
      solid: [
        'faChevronRight'
      ],
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
