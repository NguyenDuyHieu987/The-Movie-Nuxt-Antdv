import { LogOut } from '~/services/authentication';
import { ElNotification } from 'element-plus';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import axios from 'axios';

export function onLogOut() {
  const store = useStore();

  if (store.isLogin) {
    store.loadingAppInstance.start();

    LogOut({
      user_token: getWithExpiry('user_account')?.user_token,
    })
      .then((response: any) => {
        if (response?.isLogout == true) {
          new Promise((resolve, reject) => {
            resolve(navigateTo('/login'));
          }).then(() => {
            setTimeout(() => {
              window.localStorage.removeItem('user_account');
              window.localStorage.removeItem('remember');
              window.localStorage.removeItem('is_login');
              store.userAccount = {};
              store.isLogin = false;
              store.role = 'normal';
            }, 200);
          });
        } else {
          ElNotification.error({
            title: 'Lỗi!',
            message: 'Đăng xuất thất bại.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red',
              }),
          });
        }
      })
      .catch((e) => {
        ElNotification.error({
          title: 'Lỗi!',
          message: 'Đăng xuất thất bại.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        setTimeout(() => {
          store.loadingAppInstance.finish();
        }, 200);
      });
  }
}
