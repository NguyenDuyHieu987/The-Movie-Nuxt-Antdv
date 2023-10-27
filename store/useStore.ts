import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { genre, country, year, user } from '@/types';

export default defineStore('store', () => {
  const utils = useUtils();

  const userAccount = ref<user>(
    utils.localStorage.getWithExpiry('user_account') || null
  );
  const role = computed<string>(() => userAccount.value!?.role || 'normal');
  const isLogin = computed<boolean>(
    () =>
      // utils.localStorage.getWithExpiry('user_account') ? true : false
      !!userAccount.value
  );
  const collapsed = ref<boolean>(false);
  const openDrawer = ref<boolean>(false);
  const modalVisible = ref<boolean>(false);
  const openRequireAuthDialog = ref<boolean>(false);
  const breadCrumbValue = ref<string>('');
  const loadingApp = ref<boolean>(false);
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

  return {
    userAccount,
    isLogin,
    role,
    breadCrumbValue,
    collapsed,
    openDrawer,
    modalVisible,
    openRequireAuthDialog,
    loadingApp,
    loadingAppInstance,
    allGenres,
    allCountries,
    allYears,
    setCollapsed,
    setOpendrawer,
    setCloseRequireAuthDialog,
  };
});
