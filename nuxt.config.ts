// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import { isProduction } from 'std-env';

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
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Lobster&family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700&family=Roboto:wght@100;300;400;500;700&display=swap',
        },
      ],
      script: [
        // {
        //   src: '/js/jquery/jquery-3.6.4.min.js',
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
        // {
        //   src: 'https://apis.google.com/js/client:platform.js',
        //   type: 'text/javascript',
        //   async: true,
        //   defer: true,
        // },
        {
          src: 'https://accounts.google.com/gsi/client',
          type: 'text/javascript',
          async: true,
        },
        // {
        //   hid: 'gtmHead',
        //   innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        //   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        //   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        //   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        //   })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_ID}');`,
        // },
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
      TMDBurl: process.env.TMDB_IMAGE_BASE_URL,
      adminWebsiteUrl: process.env.ADMIN_WEBSITE_URL,
      googleAnalyticsID: process.env.GOOGLE_ANALYTICS_ID,
      googleTagManagerID: process.env.GOOGLE_TAG_MANAGER_ID,
      facebookAppID: process.env.FACEBOOK_APP_ID,
      googleOauth2ClientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      googleOauth2ClientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    },
    public: {
      serverImageUrl: process.env.SERVER_IMAGE_URL,
    },
  },
  alias: {
    '@': resolve(__dirname, './'),
  },
  experimental: {
    payloadExtraction: false,
    viewTransition: true,
  },
  typescript: {
    strict: true,
  },
  css: [
    'ant-design-vue/dist/antd.dark.min.css',
    'element-plus/dist/index.css',
    '~/assets/style/globalStyle.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    // 'material-icons/iconfont/material-icons.css',
  ],
  modules: [
    // '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-swiper',
    'nuxt-icon',
    '@nuxt/image',
    'nuxt-lazy-load',
    '@nuxtjs/fontaine',
    // '@nuxtjs/google-fonts',
    'nuxt-simple-sitemap',
    'nuxt-og-image',
    'nuxt-seo-experiments',
    'nuxt-gtag',
    // 'vue-social-sharing/nuxt',
    // '@nuxtjs/supabase',
    'nuxt-delay-hydration',
  ],
  site: {
    url: 'https://phimhay247.tech',
  },
  ogImage: {
    runtimeCacheStorage: {
      driver: 'redis',
      host: 'redis-11171.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
      port: 11171,
      password: 'iMtb5g4jlRhXANp0oP0LNm5iZeX3QeNT',
    },
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
    domains: ['https://ik.imagekit.io'],
    alias: {},
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
  // googleFonts: {
  //   prefetch: true,
  //   preconnect: true,
  //   preload: true,
  //   useStylesheet: true,
  //   display: 'swap',
  //   families: {
  //     // Roboto: true,
  //     // 'Josefin+Sans': true,
  //     // Lato: [100, 300],
  //     // Raleway: {
  //     //   wght: [100, 400],
  //     //   ital: [100],
  //     // },
  //   },
  // },
  plugins: [
    '@/plugins/elementPlus',
    '@/plugins/antd',
    '@/plugins/fontawesome',
    '@/plugins/iconify',
    '@/plugins/vueprogressbar',
    '@/plugins/sharenetwork',
    '@/plugins/vuelazyload',
    '@/plugins/googleTagManager',
    // '@/plugins/googlelogin',
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
        '/bills',
        '/upgrade/plans',
        '/youraccount',
        '/oauth/google',
        '/login',
        '/signup',
        '/discover',
        '/info-movie',
        '/info-tv',
        '/play-movie',
        '/play-tv',
      ],
      crawlLinks: true,
    },
    storage: {
      cache: {
        driver: 'redis',
        url: 'redis://default:iMtb5g4jlRhXANp0oP0LNm5iZeX3QeNT@redis-11171.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:11171',
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
      '/bills',
      '/upgrade/plans',
      '/youraccount',
      '/oauth/google',
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
      minify: 'terser',
      ssrManifest: true,
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
    client: false,
  },
  optimization: {},
  routeRules: {
    '/': { swr: true, prerender: true, static: true },
    '/search/**': { swr: true, prerender: true },
    '/discover/**': { ssr: false, swr: true, prerender: true },
    '/follow/**': { swr: true, prerender: true },
    '/history/**': { swr: true, prerender: true },
    '/ranking/**': { swr: true, prerender: true },
    '/info-movie/**': { ssr: false, swr: true, prerender: true },
    '/info-tv/**': { ssr: false, swr: true, prerender: true },
    '/play-movie/**': { ssr: false, swr: true, prerender: true },
    '/play-tv/**': { ssr: false, swr: true, prerender: true },
    '/oauth/**': { prerender: true, static: true },
    '/login': {
      swr: true,
      prerender: true,
      static: true,
    },
    '/signup': {
      swr: true,
      prerender: true,
      static: true,
    },
    '/upgrade/plans': { swr: true, prerender: true, static: true },
    '/upgrade/payment': {
      ssr: false,
      swr: true,
      prerender: true,
      static: true,
    },
    '/youraccount': { ssr: false, swr: true, prerender: true },
    '/youraccount/**': { swr: true, prerender: true },
    '/bills': { ssr: false, swr: true, prerender: true },
  },
});
