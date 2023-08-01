import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const nuxtConfig = useRuntimeConfig();
    // if (nuxtConfig.app.production_mode) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: nuxtConfig.app.googleAnalyticsID,
        params: {},
      },
      appName: 'Phimhay247',
      isEnabled: nuxtConfig.app.production_mode,
    });
    // }
  });
});
