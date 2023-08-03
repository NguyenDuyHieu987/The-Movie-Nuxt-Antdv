import Antd, { ConfigProvider, Button } from 'ant-design-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    nuxtApp.vueApp.use(Antd);
  });
});
