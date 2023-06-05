import { initFacebookSdk } from '@/utils/init-facebook-sdk';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    nuxtApp.vueApp.use(initFacebookSdk());
  });
});
