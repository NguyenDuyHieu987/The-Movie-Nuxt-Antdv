// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import * as AntD from 'ant-design-vue';
import { addComponent } from '@nuxt/kit';

export default defineNuxtConfig({
  // nitro: {
  //   output: {
  //     dir: 'output',
  //     serverDir: 'output/server',
  //     publicDir: 'output/public',
  //   },
  // },
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
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
        // },
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
        // {
        //   src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js',
        //   type: 'text/javascript',
        // },
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
    // API_CONTENT_SERVICE_URL: process.env.API_CONTENT_SERVICE_URL,
    API_CONTENT_SERVICE_URL: 'http://127.0.0.1:5000',
    API_IMAGE_SERVICE_URL: process.env.API_IMAGE_SERVICE_URL,
    TMDB_IMAGE_BASE_URL: process.env.TMDB_IMAGE_BASE_URL,
    public: {
      apiBase: '/api',
    },
  },
  alias: {
    '@': resolve(__dirname, './'),
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
    // 'nuxt-lazy-load'
    // '@/modules/antd'
  ],
  elementPlus: {
    /** Options */
  },
  // lazyLoad: {
  //   // These are the default values
  //   images: true,
  //   videos: true,
  //   audios: true,
  //   iframes: true,
  //   native: false,
  //   directiveOnly: false,

  //   // Default image must be in the public folder
  //   // defaultImage: '/images/default-image.jpg',

  //   // To remove class set value to false
  //   loadingClass: 'isLoading',
  //   loadedClass: 'isLoaded',
  //   appendClass: 'lazyLoad',

  //   observerConfig: {
  //     // See IntersectionObserver documentation
  //   }
  // },
  plugins: [
    '@/plugins/antd',
    '@/plugins/fontawesome',
    { src: '@/plugins/owlcarousel', mode: 'client' },
    { src: '@/plugins/slickcarousel', mode: 'client' },
    '@/plugins/vueprogressbar',
    '@/plugins/sharenetwork',
    '@/plugins/googlelogin',
    '@/plugins/vuelazyload',
    // '@/plugins/vue3carousel',
    { src: '@/plugins/loadFacebookSdk', mode: 'client' },
  ],
  routeRules: {
    // '/**': { ssr: true },
  },
});
