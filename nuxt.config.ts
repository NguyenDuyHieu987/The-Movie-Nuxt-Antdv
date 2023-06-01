// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
// import vue from '@vitejs/plugin-vue';

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
          href: '/plugins/fontawesome-pro-6.0.0-alpha3/fontawesome6/pro/css/all.min.css',
        },
        {
          rel: 'stylesheet',
          href: '/plugins/google-material-icons/iconfont/material-icons.css',
        },
      ],
      script: [
        {
          src: 'https://apis.google.com/js/platform.js',
          type: 'text/javascript',
        },
        {
          src: '/plugins/jquery/jquery-3.6.4.min.js',
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
    apiKey: process.env.NUXT_API_KEY,
    adminWebsiteUrl: 'https://dashboard.phimhay247.site/',
    app: {},
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
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
    'ant-design-vue/dist/antd.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/style/globalStyle.scss',
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
    { src: '@/plugins/owlcarousel', mode: 'client' },
    '@/plugins/vueprogressbar',
    '@/plugins/sharenetwork',
    '@/plugins/googlelogin',
    '@/plugins/vuelazyload',
    { src: '@/plugins/loadFacebookSdk', mode: 'client' },
    // vue({ script: { defineModel: true, propsDestructure: true } }),
  ],
  nitro: {
    preset: 'node-server',
    prerender: {
      routes: [
        '/',
        '/search',
        '/discover',
        '/list',
        '/history',
        '/ranking',
        '/info',
        '/play',
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
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }
      nitroConfig!.prerender!.routes!.push('/discover');
      nitroConfig!.prerender!.routes!.push('/info');
      nitroConfig!.prerender!.routes!.push('/play');
    },
  },
  generate: {},
  build: {},
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
  ssr: true,
  routeRules: {
    '/': { prerender: true, ssr: true },
    '/search/**': { prerender: true, ssr: true },
    '/discover/**': { prerender: true, ssr: true },
    '/list/**': { prerender: true, ssr: true },
    '/history/**': { prerender: true, ssr: true },
    '/ranking/**': { prerender: true, ssr: true },
    '/info/**': { prerender: true, ssr: true },
    '/play/**': { prerender: true, ssr: true },
  },
});
