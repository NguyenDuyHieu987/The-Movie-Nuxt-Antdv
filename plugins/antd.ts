// import Antd from 'ant-design-vue';

// export default defineNuxtPlugin((nuxtApp) => {
//   // nuxtApp.hook('app:created', () => {
//   //   nuxtApp.vueApp.use(Antd);
//   // });
// });

export default defineNuxtPlugin({
  name: 'antd',
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {},
  parallel: true,
  env: { islands: true },
});
