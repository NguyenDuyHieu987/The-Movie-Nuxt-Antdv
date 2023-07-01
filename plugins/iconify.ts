import { disableCache } from '@iconify/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    disableCache('all');
  });
});
