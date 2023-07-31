import { initFacebookSdk } from '@/utils/init-facebook-sdk';

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.use(initFacebookSdk());
  initFacebookSdk();
});
