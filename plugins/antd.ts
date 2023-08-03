// import Antd from 'ant-design-vue';
import { Button } from 'ant-design-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    nuxtApp.vueApp.use(Button);
  });
});
