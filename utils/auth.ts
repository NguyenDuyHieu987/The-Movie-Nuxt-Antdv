import { LogOut } from '~/services/authentication';
import { ElNotification } from 'element-plus';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import axios from 'axios';

export function onLogOut() {
  const store = useStore();

  if (store.isLogin) {
    store.loadingAppInstance.start();

    LogOut({
      user_token: getWithExpiry('userAccount')?.user_token,
    })
      .then((response: any) => {
        if (response?.isLogout == true) {
          navigateTo('/login');

          window.localStorage.removeItem('userAccount');
          window.localStorage.removeItem('userToken');
          window.localStorage.removeItem('remember');
          window.localStorage.removeItem('isLogin');
          store.userAccount = {};
          store.isLogin = false;
          store.role = 'normal';
        } else {
          ElNotification.error({
            title: 'Lỗi!',
            message: 'Đăng xuất thất bại.',
            showClose: false,
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
          showClose: false,
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
        }, 500);
      });
  }
}
