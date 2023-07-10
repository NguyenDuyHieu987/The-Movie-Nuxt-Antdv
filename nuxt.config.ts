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
    apiGateway: process.env.NUXT_API_GATEWAY || 'https://api.phimhay247.site',
    serverImageUrl:
      process.env.NUXT_SERVER_IMAGE_URL || 'https://img.phimhay247.site',
    serverVideoUrl:
      process.env.NUXT_SERVER_VIDEO_URL || 'https://media.phimhay247.site',
    adminWebsiteUrl:
      process.env.NUXT_ADMIN_WEBSITE_URL || 'https://www.dash.phimhay247.site',
    app: {
      apiGateway: process.env.NUXT_API_GATEWAY || 'https://api.phimhay247.site',
      serverImageUrl:
        process.env.NUXT_SERVER_IMAGE_URL ||
        'https://res.cloudinary.com/dvbhjlrdf/image/upload/v1688106333',
      serverVideoUrl:
        process.env.NUXT_SERVER_VIDEO_URL ||
        'https://res.cloudinary.com/dvbhjlrdf/video/upload/v1688106333',
      adminWebsiteUrl:
        process.env.NUXT_ADMIN_WEBSITE_URL ||
        'https://www.dash.phimhay247.site',
    },
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
    'element-plus/dist/index.css',
    '@/assets/style/globalStyle.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    // 'material-icons/iconfont/material-icons.css',
  ],
  modules: [
    // '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-swiper',
    'nuxt-icon',
    // 'vue-social-sharing/nuxt',
    '@nuxt/image',
    'nuxt-lazy-load',
    '@nuxtjs/fontaine',
  ],
  image: {
    // provider: 'cloudinary',
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
  // elementPlus: {
  //   /** Options */
  // },
  plugins: [
    '@/plugins/elementPlus',
    '@/plugins/antd',
    '@/plugins/fontawesome',
    '@/plugins/iconify',
    '@/plugins/vueprogressbar',
    '@/plugins/sharenetwork',
    '@/plugins/googlelogin',
    '@/plugins/vuelazyload',
    { src: '@/plugins/loadFacebookSdk', mode: 'client' },
  ],
  nitro: {
    preset: 'node-server',
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
        // '/discover',
        // '/info-movie',
        // '/info-tv',
        // '/play-movie',
        // '/play-tv',
      ],
      crawlLinks: true,
    },
    storage: {
      cache: {
        driver: 'redis',
        url: 'redis://default:iMtb5g4jlRhXANp0oP0LNm5iZeX3QeNT@redis-11171.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:11171',
        /* redis connector options */
      },
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
  vite: {
    build: {
      sourcemap: true,
    },
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
    client: true,
  },
  routeRules: {
    '/': { static: true, swr: true },
    '/search/**': { prerender: true, swr: true },
    '/discover/**': { swr: true },
    '/list/**': { prerender: true, swr: true },
    '/history/**': { prerender: true, swr: true },
    '/ranking/**': { prerender: true, swr: true },
    '/info-movie/**': { swr: true },
    '/info-tv/**': { swr: true },
    '/play-movie/**': { swr: true },
    '/play-tv/**': { swr: true },
  },
});
