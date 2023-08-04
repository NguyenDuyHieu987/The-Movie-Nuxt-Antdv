import moment from 'moment';
import 'moment/locale/vi';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    console.log(nuxtApp.ssrContext);

    moment.locale('vi');
  });
});
