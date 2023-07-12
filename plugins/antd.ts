import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.min.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    nuxtApp.vueApp.use(Antd);
  });
});
