import { defineStore } from 'pinia';

const utils = useUtils();

export default defineStore('store', {
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
    isLogin: (state) => state.isLogin,
  },
  actions: {
    setCollapsed() {
      this.collapsed = !this.collapsed;
    },
    setOpendrawer() {
      this.openDrawer = !this.openDrawer;
    },
    setCloseRequireAuthDialog() {
      this.openRequireAuthDialog = false;
    },
  },
});
