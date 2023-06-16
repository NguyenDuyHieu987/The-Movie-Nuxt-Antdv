import VueLazyload from 'vue-lazyload';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLazyload, {
    // error: '/images/svgs/error-image.svg',
    preLoad: 1,
  });
});
