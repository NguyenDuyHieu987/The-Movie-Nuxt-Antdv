import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.min.css';
import { Button } from 'ant-design-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    nuxtApp.vueApp.use(Button);
  });
});
