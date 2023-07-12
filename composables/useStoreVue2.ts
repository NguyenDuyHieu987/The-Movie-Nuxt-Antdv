import { defineStore } from 'pinia';

const utils = useUtils();

export default defineStore('store', {
  state() {
    return {
      collapsed: false,
      openDrawer: false,
      openRequireAuthDialog: false,
      isLogin: utils.localStorage.getWithExpiry('userAccount') ? true : false,
      breadCrumbValue: '',
      role: 'normal',
      loadingHomePage: false,
      loadingMisc: false,
      loadingDashBoard: false,
      userAccount: utils.localStorage.getWithExpiry('userAccount') || {},
      allGenres: [],
      allCountries: [],
      allYears: [],
    };
  },
  getters: {
    isLogin: (state: any) => state.isLogin,
  },
  actions: {
    setCollapsed() {
      this.$state.collapsed = !this.$state.collapsed;
    },
    setOpendrawer() {
      this.$state.openDrawer = !this.$state.openDrawer;
    },
    setCloseRequireAuthDialog() {
      this.$state.openRequireAuthDialog = false;
    },
  },
});
