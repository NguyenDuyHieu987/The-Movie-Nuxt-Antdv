// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import { isProduction } from 'std-env';
import { addComponent } from '@nuxt/kit';
import * as AntDV from 'ant-design-vue';
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// import axios from 'axios';
import svgLoader from 'vite-svg-loader';
import type { genre, country, year } from './types';
import GENRES from './constants/data/Genres.json';
import COUNTRIES from './constants/data/Country.json';
import YEARS from './constants/data/Years.json';

const discoverGenres = async () => {
  // const response = await axios.get('http://localhost:5000/genre/all');
  return GENRES.map((genre: genre) => `/discover/genre/${genre?.short_name}`);
};

const discoverCountries = async () => {
  // const response = await axios.get('http://localhost:5000/country/all');
  return COUNTRIES.map(
    (country: country) => `/discover/country/${country?.short_name}`
  );
};

const discoverYears = async () => {
  // const response = await axios.get('http://localhost:5000/year/all');
  return YEARS.map((year: year) => `/discover/year/${year?.name}`);
};

export default defineNuxtConfig({
  app: {
    rootId: '__nuxt',
    // buildAssetsDir: '/home/',
    head: {
      title: 'Phimhay247',
      // titleTemplate: '%pageTitle %titleSeparator %siteName',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          charset: 'utf-8',
        },
        { name: 'color-scheme', content: 'only dark' },
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
        // {
        //   rel: 'preconnect',
        //   href: `https://fonts.googleapis.com`,
        // },
        // {
        //   rel: 'preconnect',
        //   href: `https://fonts.gstatic.com`,
        //   crossorigin: 'anonymous',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.googleapis.com/css2?family=Lobster&family=Roboto+Flex:wght@100;200;300;400;500;600&family=Roboto:wght@100;300;400;500;700&display=swap',
        // },
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
      // production_mode: process.env.NODE_ENV == 'production',
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
    'ant-design-vue/dist/antd.dark.min.css',
    // 'element-plus/dist/index.css',

    '~/assets/style/fonts/GoogleFonts.css',
    '~/assets/style/globalStyle/overwrite/antdv/antdv.scss',
    '~/assets/style/globalStyle/overwrite/element/element.scss',
    '~/assets/style/globalStyle.scss',
  ],
  modules: [
    '@element-plus/nuxt',
    async function (options: any, nuxt: any) {
      for (const key in AntDV) {
        if (['version', 'install'].includes(key)) continue;
        await addComponent({
          filePath: 'ant-design-vue',
          name: `A${key}`,
          export: key,
          prefetch: true,
          preload: true,
        });
      }
    },
    '@pinia/nuxt',
    'nuxt-swiper',
    // 'nuxt-icon',
    '@nuxt/image',
    'nuxt-lazy-load',
    '@nuxtjs/fontaine',
    // '@nuxtjs/google-fonts',
    'nuxt-simple-sitemap',
    'nuxt-gtag',
    'nuxt-delay-hydration',
  ],
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
    // These are the default values
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

    observerConfig: {
      // See IntersectionObserver documentation
    },
  },
  // googleFonts: {
  //   prefetch: true,
  //   preconnect: true,
  //   preload: true,
  //   display: 'swap',
  //   // useStylesheet: true,
  // },
  fontMetrics: {},
  delayHydration: {
    debug: !isProduction,
    mode: 'init',
  },
  plugins: [
    // '@/plugins/elementPlus',
    // '@/plugins/antd',
    // '@/plugins/iconify',
    // '@/plugins/loadUser',
    // { src: '@/plugins/vueProgressBar', mode: 'client' },
    // '@/plugins/shareNetwork',
    // '@/plugins/vueLazyLoad',
    // '@/plugins/googleTagManager',
    // { src: '@/plugins/loadFacebookSdk', mode: 'client' },
  ],
  nitro: {
    preset: 'static',
    prerender: {
      routes: [],
      crawlLinks: true,
    },
    storage: {},
    output: {
      // dir:'.output',
      dir: 'D:\\MyWebsite\\Phimhay247\\.output',
      // serverDir: '.output/server',
      // publicDir: '.output/public',
    },
  },
  hooks: {
    // ready: (ctx) => {
    //   console.log('ctx', ctx);
    // },

    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }

      const disGenres = await discoverGenres();
      const discountries = await discoverCountries();
      const disyears = await discoverYears();

      // nitroConfig.prerender?.routes?.push(...disGenres);
      // nitroConfig.prerender?.routes?.push(...discountries);
      // nitroConfig.prerender?.routes?.push(...disyears);
    },
  },
  generate: {
    routes: [
      '/',
      '/feature',
      '/television',
      '/search',
      '/discover',
      '/follow',
      '/history',
      '/ranks',
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
      alias: {
        // 'ant-design-vue/dist': 'ant-design-vue/dist',
        // 'ant-design-vue/es': 'ant-design-vue/es',
        // 'ant-design-vue/lib': 'ant-design-vue/es',
        // 'ant-design-vue': 'ant-design-vue/es',
      },
    },
    plugins: [
      // Components({
      //   resolvers: [
      //     AntDesignVueResolver({
      //       importStyle: 'less',
      //     }),
      //   ],
      // }),
      svgLoader({}),
    ],
    ssr: {
      external: ['ant-design-vue', 'moment'],
      noExternal: [],
    },
    optimizeDeps: {
      include: ['./components/**/*.vue'],
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
    build: {
      sourcemap: 'hidden',
      minify: 'terser',
      ssrManifest: true,
      // assetsDir: 'home/',
      cssMinify: true,
      reportCompressedSize: false,
      terserOptions: {
        ecma: 2016,
        sourceMap: true,
        parse: {
          html5_comments: false,
        },
        compress: false,
        mangle: {},
        format: {
          ecma: 2016,
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
    '/ranks/**': { prerender: true },
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
