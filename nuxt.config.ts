// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import { isProduction } from 'std-env';
import svgLoader from 'vite-svg-loader';
import resolveAntDVComponents from './utils/autoImportsAntdv';

export default defineNuxtConfig({
  app: {
    rootId: '__nuxt',
    buildAssetsDir: '/_nuxt/',
    head: {
      title: 'Phimhay247',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          charset: 'utf-8',
        },
        { name: 'color-scheme', content: 'only dark' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '/css/antdv4.css',
        },
      ],
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
          type: 'text/javascript',
          async: true,
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in', appear: true },
  },
  runtimeConfig: {
    app: {
      production_mode: isProduction,
      apiGateway: process.env.API_GATEWAY,
      serverImageUrl: process.env.SERVER_IMAGE_URL,
      serverVideoUrl: process.env.SERVER_VIDEO_URL,
      adminWebsiteUrl: process.env.ADMIN_WEBSITE_URL,
      googleAnalyticsID: process.env.GOOGLE_ANALYTICS_ID,
      googleTagManagerID: process.env.GOOGLE_TAG_MANAGER_ID,
      facebookAppID: process.env.FACEBOOK_APP_ID,
      googleOauth2ClientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      googleOauth2ClientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    },
    public: {
      TMDBurl: process.env.TMDB_IMAGE_BASE_URL,
    },
  },
  alias: {
    '@': resolve(__dirname, './'),
  },
  imports: {
    // dirs: ['/services'],
  },
  experimental: {
    payloadExtraction: true,
    viewTransition: true,
    componentIslands: true,
    restoreState: true,
    headNext: true,
    asyncContext: true,
    inlineSSRStyles: false,
    defaults: {
      useAsyncData: {
        deep: false,
      },
    },
  },
  typescript: {
    strict: true,
  },
  site: {
    url: 'https://phimhay247z.org',
  },
  css: [
    // 'ant-design-vue/dist/antd.dark.min.css',
    'ant-design-vue/dist/reset.css',
    '~/assets/style/fonts/GoogleFonts.css',
    '~/assets/style/globalStyle/overwrite/antdv/antdv.scss',
    '~/assets/style/globalStyle/overwrite/element/element.scss',
    '~/assets/style/globalStyle.scss',
  ],
  modules: [
    // '@ant-design-vue/nuxt',
    resolveAntDVComponents,
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxt/image',
    'nuxt-lazy-load',
    '@nuxtjs/fontaine',
    'nuxt-simple-sitemap',
    'nuxt-gtag',
    'nuxt-delay-hydration',
  ],
  // antd: {
  //   icons: false,
  // },
  elementPlus: {
    icon: false,
  },
  swiper: {
    modules: ['navigation', 'virtual', 'free-mode', 'scrollbar'],
  },
  sitemap: {},
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  image: {
    // provider: 'cloudinary',
    provider: 'imagekit',
    imagekit: {
      // baseURL: 'https://ik.imagekit.io/8toa5f2rp/images',
      baseURL: '',
    },
    format: ['avif', 'webp'],
    domains: ['https://ik.imagekit.io'],
    alias: {},
  },
  lazyLoad: {
    images: false,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,

    // Default image must be in the public folder
    // defaultImage: '/images/default-image.jpg',

    // To remove class set value to false
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',

    observerConfig: {},
  },
  fontMetrics: {},
  delayHydration: {
    debug: !isProduction,
    mode: 'mount',
  },
  plugins: [],
  nitro: {
    preset: 'static',
    prerender: {
      routes: [],
      crawlLinks: true,
    },
    storage: {},
    output: {
      dir: 'D:\\MyWebsite\\Phimhay247\\.output',
    },
  },
  hooks: {},
  generate: {
    routes: [
      '/',
      '/feature',
      '/television',
      '/search',
      '/discover',
      '/follow',
      '/history',
      '/ranking',
      '/upgrade/plans',
      '/YourAccount',
      '/oauth/google',
      '/login',
      '/signup',
      '/ForgotPassword',
    ],
  },
  build: {
    // analyze: true,
  },
  components: {
    dirs: [
      {
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },
  vite: {
    resolve: {
      alias: {},
    },
    plugins: [svgLoader({})],
    ssr: {
      external: ['ant-design-vue', 'moment'],
      noExternal: [],
    },
    optimizeDeps: {
      include: ['./components/**/*.vue'],
    },
    css: {
      preprocessorOptions: {},
      lightningcss: {},
    },
    build: {
      sourcemap: 'hidden',
      ssrManifest: true,
      assetsDir: '_nuxt/',
      cssMinify: 'lightningcss',
      reportCompressedSize: false,
      minify: 'terser',
      terserOptions: {
        ecma: 2020,
        sourceMap: true,
        parse: {
          html5_comments: false,
        },
        compress: false,
        toplevel: true,
        mangle: {},
        format: {
          ecma: 2020,
          comments: false,
        },
      },
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    server: {
      hmr: {
        overlay: true,
      },
    },
  },
  devtools: { enabled: false },
  vue: { defineModel: true, propsDestructure: true },
  ssr: true,
  sourcemap: {
    server: true,
    client: false,
  },
  router: {
    options: {
      // strict: true,
    },
  },
  optimization: {},
  routeRules: {
    '/': { prerender: true },
    '/feature/**': { prerender: true },
    '/television/**': { prerender: true },
    '/discover/**': { prerender: true },
    '/search/**': { prerender: true },
    '/follow/**': { prerender: true },
    '/history/**': { prerender: true },
    '/ranking/**': { prerender: true },
    '/info-movie/**': { prerender: true },
    '/info-tv/**': { prerender: true },
    '/play-movie/**': { prerender: true },
    '/play-tv/**': { prerender: true },
    '/oauth/**': { prerender: true },
    '/login': {
      prerender: true,
    },
    '/signup': {
      prerender: true,
    },
    '/ForgotPassword': { prerender: true },
    '/upgrade': { redirect: '/upgrade/plans' },
    '/upgrade/plans': { prerender: true },
    '/upgrade/PaymentPicker': {
      ssr: false,
    },
    '/YourAccount/**': { ssr: false },
  },
});
