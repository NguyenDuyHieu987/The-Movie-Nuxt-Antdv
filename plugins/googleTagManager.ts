import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  const nuxtConfig = useRuntimeConfig();
  nuxtApp.hook('app:created', () => {
    if (nuxtConfig.app.production_mode) {
      nuxtApp.vueApp.use(VueGtag, {
        property: {
          id: nuxtConfig.app.googleTagManagerID,
        },
      });
    }
  });
});
