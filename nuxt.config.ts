// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Phimhay247',
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'title',
          content:
            'Phim Hay | Phim HD Vietsub + Thuyết minh| Xem Phim Online | Xem Phim Nhanh | Phim hay 247 - Phimhay247',
        },
        {
          name: 'title',
          content:
            'Phim lẻ | Phim bộ | Phim chiếu rạp | Trailer | Phim hay 247 - Phimhay247',
        },
        {
          name: 'title',
          content:
            'Hoạt hình Trung Quốc | Hoạt hình 3D | Hoạt hình 2D | Anime | Hoạt hình Nhật Bản',
        },
        {
          name: 'title',
          content:
            'Phim hành động | Phim hollywood | Phim bom tấn | Phim hài | Phim tình cảm Hàn Quốc | Phim tình cảm Trung Quốc',
        },
        {
          property: 'og:description',
          content:
            'Xem phim hay nhất 2023 cập nhật nhanh nhất, Xem Phim Online HD Vietsub - Thuyết Minh tốt trên nhiều thiết bị.',
        },
        {
          property: 'og:description',
          content:
            'Phimhay247 - Trang Web xem phim Free hàng đầu ở Việt Nam, xem phim hay, phim chiếu rạp không chứa quảng cáo và giật lag.',
        },
        {
          name: 'description',
          content:
            'Xem phim hay nhất 2023 cập nhật nhanh nhất, Xem Phim Online HD Vietsub - Thuyết Minh tốt trên nhiều thiết bị.',
        },
        {
          name: 'description',
          content:
            'Phimhay247 - Trang Web xem phim Free hàng đầu ở Việt Nam, xem phim hay, phim chiếu rạp không chứa quảng cáo và giật lag.',
        },
        {
          name: 'keywords',
          content:
            'Phim, xem phim, xem phim online, phim online, xem phim hd, phim vietsub, phim thuyet minh',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '/icons/fontawesome-pro-6.0.0-alpha3/fontawesome6/pro/css/all.min.css',
        },
        {
          rel: 'stylesheet',
          href: '/icons/google-material-icons/iconfont/material-icons.css',
        },
        {
          rel: 'stylesheet',
          href: '/icons/google-material-icons/css/material-icons.min.css',
        },
      ],
      script: [
        {
          src: 'https://apis.google.com/js/platform.js',
          type: 'text/javascript',
        },
        {
          src: '/js/jquery/jquery-3.6.4.min.js',
          type: 'text/javascript',
        },
        {
          src: 'https://api.ok.ru/js/fapi5.js',
          type: 'text/javascript',
        },
        {
          src: 'https://player.vimeo.com/api/player.js',
          type: 'text/javascript',
        },
      ],
    },
  },
  runtimeConfig: {
    // apiKey: process.env.NUXT_API_KEY || 'default_api_url',
    adminWebsiteUrl: 'https://www.dash.phimhay247.site',
    app: {},
    public: {},
  },
  alias: {
    '@': resolve(__dirname, './'),
  },
  experimental: {
    payloadExtraction: false,
  },
  typescript: {
    strict: true,
  },
  css: [
    'ant-design-vue/dist/antd.min.css',
    '@/assets/style/globalStyle.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'material-icons/iconfont/material-icons.css',
  ],
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    // 'vue-social-sharing/nuxt',
    'nuxt-swiper',
  ],
  elementPlus: {
    /** Options */
  },
  plugins: [
    '@/plugins/antd',
    '@/plugins/fontawesome',
    '@/plugins/vueprogressbar',
    '@/plugins/sharenetwork',
    '@/plugins/googlelogin',
    '@/plugins/vuelazyload',
    { src: '@/plugins/loadFacebookSdk', mode: 'client' },
  ],
  nitro: {
    // preset: 'static',
    prerender: {
      routes: [
        '/',
        '/search',
        '/follow',
        '/history',
        '/ranking',
        '/billing',
        '/profile',
        '/login',
        '/signup',
      ],
      crawlLinks: true,
    },
    // output: {
    //   dir: '.output',
    //   serverDir: '.output/server',
    //   publicDir: '.output/public',
    // },
  },
  hooks: {
    // ready: (ctx) => {
    //   console.log('ctx', ctx);
    // },
  },
  generate: {},
  build: {},
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
  ssr: true,
  routeRules: {
    '/': { swr: true },
    '/search/**': { swr: true },
    '/discover/**': { swr: true },
    '/list/**': { swr: true },
    '/history/**': { swr: true },
    '/ranking/**': { swr: true },
    '/info/**': { swr: true },
    '/play/**': { swr: true },
  },
});
