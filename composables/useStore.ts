import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const utils = useUtils();

export default defineStore('store', () => {
  const collapsed = ref<boolean>(false);
  const openDrawer = ref<boolean>(false);
  const modalVisible = ref<boolean>(false);
  const openRequireAuthDialog = ref<boolean>(false);
  const isLogin = ref<boolean>(
    utils.localStorage.getWithExpiry('userAccount') ? true : false
  );
  const breadCrumbValue = ref<string>('');
  const role = ref<string>('normal');
  const loadingHomePage = ref<boolean>(false);
  const loadingMisc = ref<boolean>(false);
  const loadingDashBoard = ref<boolean>(false);
  const userAccount = ref<any>(
    utils.localStorage.getWithExpiry('userAccount') || {}
  );
  const allGenres = ref<any[]>([]);
  const allCountries = ref<any[]>([]);
  const allYears = ref<any[]>([]);

  const setCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  const setOpendrawer = () => {
    openDrawer.value = !openDrawer.value;
  };

  const setCloseRequireAuthDialog = () => {
    openRequireAuthDialog.value = false;
  };

  return {
    collapsed,
    openDrawer,
    modalVisible,
    openRequireAuthDialog,
    isLogin,
    breadCrumbValue,
    role,
    loadingHomePage,
    loadingMisc,
    loadingDashBoard,
    userAccount,
    allGenres,
    allCountries,
    allYears,
    setCollapsed,
    setOpendrawer,
    setCloseRequireAuthDialog,
  };
});
