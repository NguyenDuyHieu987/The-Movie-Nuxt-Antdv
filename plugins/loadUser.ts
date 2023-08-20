import { getUserToken } from '~/services/authentication';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { ElNotification } from 'element-plus';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const store = useStore();
  const utils = useUtils();

  if (utils.localStorage.getWithExpiry('user_account')?.user_token) {
    getUserToken({
      user_token: utils.localStorage.getWithExpiry('user_account')?.user_token,
    })
      .then((accountResponse: any) => {
        // console.log(accountResponse);

        if (accountResponse?.isLogin == true) {
          store.userAccount = accountResponse?.result;
        } else {
          window.localStorage.removeItem('user_account');
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
