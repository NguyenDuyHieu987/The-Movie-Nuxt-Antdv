import { getUserToken } from '~/services/authentication';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { ElNotification } from 'element-plus';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const store = useStore();
  const utils = useUtils();

  nuxtApp.hook('app:created', () => {
    if (utils.localStorage.getWithExpiry('user_token') != null) {
      getUserToken({
        user_token: utils.localStorage.getWithExpiry('user_token'),
      })
        .then((accountResponse: any) => {
          // console.log(accountResponse);

          if (accountResponse?.isLogin == true) {
            store.userAccount = accountResponse?.result;
          } else {
            window.localStorage.removeItem('user_token');
          }
        })
        .catch((e) => {
          ElNotification.error({
            title: 'Lỗi!',
            message: 'Some thing went wrong.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red',
              }),
          });
          if (axios.isCancel(e)) return;
        });
    }
  });
});
