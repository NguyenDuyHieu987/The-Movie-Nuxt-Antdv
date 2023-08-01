import { defineStore } from 'pinia';

const utils = useUtils();

export const useStore = defineStore('store', {
  state() {
    return {
      collapsed: false,
      openDrawer: false,
      openRequireAuthDialog: false,
      isLogin: utils.localStorage.getWithExpiry('user_account') ? true : false,
      breadCrumbValue: '',
      role: 'normal',
      loadingHomePage: false,
      loadingMisc: false,
      loadingDashBoard: false,
      userAccount: utils.localStorage.getWithExpiry('user_account') || {},
      allGenres: [],
      allCountries: [],
      allYears: [],
    };
  },
  getters: {
    doubleCount: (state: any) => state.breadCrumbValue * 2,
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
