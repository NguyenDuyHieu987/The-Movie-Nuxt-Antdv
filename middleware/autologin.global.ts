import { useStore } from '@/store/useStore';
import axios from 'axios';
import { getUserToken } from '@/services/MovieService';
import { getWithExpiry } from '@/utils/LocalStorage';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();

  // if (getWithExpiry('userAccount')?.user_token) {
  //   if (!store.$state.isLogin) {
  //     getUserToken({ user_token: getWithExpiry('userAccount')?.user_token })
  //       .then((accountResponse) => {
  //         // console.log(accountResponse.data?.result);
  //         if (accountResponse.data?.isLogin == true) {
  //           store.$state.isLogin = true;
  //           store.$state.userAccount = accountResponse.data?.result;
  //           store.$state.role = accountResponse.data?.result?.role;
  //         } else {
  //           window.localStorage.removeItem('userAccount');
  //           window.localStorage.removeItem('userToken');
  //           window.localStorage.removeItem('remember');
  //           window.localStorage.removeItem('isLogin');
  //           store.$state.userAccount = {};
  //           store.$state.role = 'normal';
  //           store.$state.isLogin = false;
  //         }
  //       })
  //       .catch((e) => {
  //         notification.open({
  //           message: 'Failed!',
  //           description: 'Some thing went wrong.',
  //           icon: () =>
  //             h(CloseCircleFilled, {
  //               style: 'color: red',
  //             }),
  //         });
  //         if (axios.isCancel(e)) return;
  //       });
  //   }
  // } else {
  // }

  
});
