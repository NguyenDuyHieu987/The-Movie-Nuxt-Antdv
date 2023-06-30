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
        // {
        //   rel: 'stylesheet',
        //   href: '/icons/fontawesome-pro-6.0.0-alpha3/fontawesome6/pro/css/all.min.css',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: '/icons/google-material-icons/iconfont/material-icons.css',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: '/icons/google-material-icons/css/material-icons.min.css',
        // },
      ],
      script: [
        // {
        //   src: '/js/jquery/jquery-3.6.4.min.js',
        //   type: 'text/javascript',
        // },
        // {
        //   src: 'https://apis.google.com/js/platform.js',
        //   type: 'text/javascript',
        // },
        // {
        //   src: 'https://api.ok.ru/js/fapi5.js',
        //   type: 'text/javascript',
        // },
        // {
        //   src: 'https://player.vimeo.com/api/player.js',
        //   type: 'text/javascript',
        // },
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
    // 'material-icons/iconfont/material-icons.css',
  ],
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-swiper',
    'nuxt-icon',
    // 'vue-social-sharing/nuxt',
    '@nuxt/image',
    'nuxt-lazy-load',
    '@nuxtjs/fontaine',
  ],
  image: {
    provider: 'imagekit',
    imagekit: {
      // baseURL: 'https://ik.imagekit.io/8toa5f2rp/images',
      baseURL: '',
    },
    domains: ['http://127.0.0.1:5001'],
  },
  lazyLoad: {
    // These are the default values
    images: false,
    videos: true,
    audios: true,
    iframes: false,
    native: false,
    directiveOnly: true,

    // Default image must be in the public folder
    // defaultImage: '/images/default-image.jpg',

    // To remove class set value to false
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',

    observerConfig: {
      // See IntersectionObserver documentation
    },
  },
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
    preset: 'static',
    prerender: {
      routes: [
        '/',
        '/search',
        '/discover',
        '/follow',
        '/history',
        '/ranking',
        '/billing',
        '/profile',
        '/login',
        '/signup',
        '/info-movie',
        '/info-tv',
        '/play-movie',
        '/play-tv',
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
  generate: {
    routes: [
      '/',
      '/search',
      '/discover',
      '/follow',
      '/history',
      '/ranking',
      '/billing',
      '/profile',
      '/login',
      '/signup',
      '/info-movie',
      '/info-tv',
      '/play-movie',
      '/play-tv',
    ],
  },
  build: {},
  vite: {
    build: { sourcemap: true, ssr: true },
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
  sourcemap: {
    server: true,
    // client: true,
  },
  routeRules: {
    '/': { swr: true, prerender: true },
    '/search/**': { swr: true, prerender: true },
    '/discover/**': { swr: true, prerender: true },
    '/list/**': { swr: true, prerender: true },
    '/history/**': { swr: true, prerender: true },
    '/ranking/**': { swr: true, prerender: true },
    '/info-movie/**': { swr: true, prerender: true },
    '/info-tv/**': { swr: true, prerender: true },
    '/play-movie/**': { swr: true, prerender: true },
    '/play-tv/**': { swr: true, prerender: true },
  },
});
