import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export default defineStore('store', () => {
  const utils = useUtils();

  const collapsed = ref<boolean>(false);
  const openDrawer = ref<boolean>(false);
  const modalVisible = ref<boolean>(false);
  const openRequireAuthDialog = ref<boolean>(false);
  const isLogin = ref<boolean>(
    utils.localStorage.getWithExpiry('user_account') ? true : false
  );
  const breadCrumbValue = ref<string>('');
  const role = ref<string>('normal');
  const loadingApp = ref<boolean>(false);
  const userAccount = ref<any>(
    utils.localStorage.getWithExpiry('user_account') || {}
  );
  const allGenres = ref<any[]>([]);
  const allCountries = ref<any[]>([]);
  const allYears = ref<any[]>([]);

  const setCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  const setOpendrawer = () => {
    openDrawer.value = !openDrawer.value;
    collapsed.value = false;
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
    collapsed,
    openDrawer,
    modalVisible,
    openRequireAuthDialog,
    isLogin,
    breadCrumbValue,
    role,
    loadingApp,
    userAccount,
    allGenres,
    allCountries,
    allYears,
    setCollapsed,
    setOpendrawer,
    setCloseRequireAuthDialog,
    loadingAppInstance,
  };
});
