// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import { isProduction } from 'std-env';
import svgLoader from 'vite-svg-loader';
// import resolveAntDVComponents from './utils/autoImportsAntdv';
import { version } from 'ant-design-vue';

const antdVersion: number = +version.split('.')[0];

console.log('antdVersion:', antdVersion);

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
        antdVersion == 4
          ? {
              rel: 'stylesheet',
              href: isProduction ? '/css/antdv4.css' : '/css/antdv4.dev.css',
            }
          : {},
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
    antdVersion == 4
      ? 'ant-design-vue/dist/reset.css'
      : 'ant-design-vue/dist/antd.dark.min.css',
    '~/assets/style/fonts/GoogleFonts.css',
    '~/assets/style/globalStyle/overwrite/antdv/antdv.scss',
    '~/assets/style/globalStyle/overwrite/element/element.scss',
    '~/assets/style/globalStyle.scss',
  ],
  modules: [
    // antdVersion == 4 ? '@ant-design-vue/nuxt' : resolveAntDVComponents,
    '@ant-design-vue/nuxt',
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
  antd: {
    icons: false,
  },
  elementPlus: {
    icon: false,
    injectionID: {
      // prefix: 1024,
      prefix: Math.floor(Math.random() * 10000),
      current: 0,
    },
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
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50,
        },
      },
    },
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
  hooks: {},
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
  nitro: {
    // preset: 'static',
    prerender: {
      routes: [],
      // crawlLinks: true,
    },
    minify: true,
    compressPublicAssets: { gzip: true },
    storage: {
      redis: {
        driver: 'redis',
      },
    },
    output: {
      dir: 'D:\\MyWebsite\\Phimhay247\\.output',
    },
  },
  vite: {
    resolve: {
      alias: {
        'ant-design-vue/dist': 'ant-design-vue/dist',
        'ant-design-vue/es': 'ant-design-vue/es',
        'ant-design-vue/lib': 'ant-design-vue/es',
        'ant-design-vue': 'ant-design-vue/es',
      },
    },
    plugins: [svgLoader({})],
    ssr: {
      // external: ['ant-design-vue'],
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
  generate: {
    routes: [
      // '/',
      // '/feature',
      // '/television',
      // '/search',
      // '/discover',
      // '/follow',
      // '/history',
      // '/ranking',
      // '/upgrade/plans',
      // '/YourAccount',
      // '/oauth/google',
      // '/login',
      // '/signup',
      // '/ForgotPassword',
    ],
  },
  routeRules: {
    '/': { isr: true },
    '/feature/**': { isr: true },
    '/television/**': { isr: true },
    '/discover/**': { isr: true },
    '/search/**': { isr: true },
    '/ranking/**': { isr: true },
    '/login': {
      isr: true,
    },
    '/oauth/**': { isr: true },
    '/signup': {
      isr: true,
    },
    '/ForgotPassword': { isr: true },
    '/follow/**': { isr: true },
    '/history/**': { isr: true },
    '/info-movie/**': { isr: true },
    '/info-tv/**': { isr: true },
    '/play-movie/**': { isr: true },
    '/play-tv/**': { isr: true },
    '/upgrade': { redirect: '/upgrade/plans' },
    '/upgrade/plans': { isr: true },
    '/upgrade/PaymentPicker': {
      ssr: false,
    },
    '/YourAccount/**': { ssr: false },
  },
});
