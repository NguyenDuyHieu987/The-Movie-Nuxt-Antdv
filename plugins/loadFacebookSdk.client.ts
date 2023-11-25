import { initFacebookSdk } from '@/utils/init-facebook-sdk';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.hook('app:created', () => {
//     // nuxtApp.vueApp.use(initFacebookSdk());
//     initFacebookSdk();
//   });
// });

export default defineNuxtPlugin({
  name: 'loadFacebookSdk',
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    'app:created': async () => {
      initFacebookSdk();
    },
  },
  parallel: true,
  env: { islands: true },
});
