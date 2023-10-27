import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { genre, country, year, user } from '@/types';
import { getUserToken } from '~/services/authentication';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { ElNotification } from 'element-plus';
import axios from 'axios';

export default defineStore('store', () => {
  const userAccount = ref<user>(null);
  const role = computed<string>(() => userAccount.value!?.role || 'normal');
  const isLogin = computed<boolean>(() => !!userAccount.value);
  const collapsed = ref<boolean>(true);
  const openSiderBarFixed = ref<boolean>(false);
  const headerScrolled = ref<boolean>(false);
  const openDrawer = ref<boolean>(false);
  const modalVisible = ref<boolean>(false);
  const openRequireAuthDialog = ref<boolean>(false);
  const breadCrumbValue = ref<string>('');
  const loadingApp = ref<boolean>(false);
  const loadingUser = ref<boolean>(true);
  const allGenres = ref<genre[]>([]);
  const allCountries = ref<country[]>([]);
  const allYears = ref<year[]>([]);

  const setCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  const setOpendrawer = () => {
    openDrawer.value = !openDrawer.value;
  };

  const setCloseRequireAuthDialog = () => {
    openRequireAuthDialog.value = false;
  };

  const loadingAppInstance = {
    start: () => {
      loadingApp.value = true;
      document.body.classList.toggle('loading-mask');
    },
    finish: () => {
      loadingApp.value = false;
      document.body.classList.toggle('loading-mask');
    },
  };

  const utils = useUtils();

  const loadUser = async () => {
    loadingUser.value = true;

    if (
      utils.localStorage.getWithExpiry('user_token') != null ||
      utils.cookie.getCookie('user_token') != null
    ) {
      await getUserToken({
        user_token: utils.localStorage.getWithExpiry('user_token'),
      })
        .then((accountResponse: any) => {
          if (accountResponse?.isLogin == true) {
            userAccount.value = accountResponse?.result;

            if (utils.localStorage.getWithExpiry('user_token') == null) {
              utils.localStorage.setWithExpiry(
                'user_token',
                utils.cookie.getCookie('user_token'),
                24
              );
            }
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
        })
        .finally(() => {
          loadingUser.value = false;
        });
    } else {
      setTimeout(() => {
        loadingUser.value = false;
      }, 500);
    }
  };

  return {
    userAccount,
    isLogin,
    role,
    breadCrumbValue,
    collapsed,
    openSiderBarFixed,
    headerScrolled,
    openDrawer,
    modalVisible,
    openRequireAuthDialog,
    loadingApp,
    loadingUser,
    loadingAppInstance,
    allGenres,
    allCountries,
    allYears,
    setCollapsed,
    setOpendrawer,
    setCloseRequireAuthDialog,
    loadUser,
  };
});
