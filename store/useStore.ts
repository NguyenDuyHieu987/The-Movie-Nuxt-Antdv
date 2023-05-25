import { defineStore } from 'pinia';
import axios from 'axios';
import {
  getNowPlaying,
  getTvAiringToday,
  getTopRated,
  getUpComing,
  getMyRecommend,
  getAllGenre,
  getAllNational,
  getAllYear,
} from '~/services/MovieService';

const utils = useUtils();

export const useStore = defineStore('store', {
  state() {
    return {
      collapsed: false,
      openDrawer: false,
      openRequireAuthDialog: false,
      isLogin:
        utils.localStorage.getWithExpiry('userAccount') != null ? true : false,
      breadCrumbValue: '',
      role: 'normal',
      loadingHomePage: false,
      loadingMisc: false,
      loadingDashBoard: false,
      userAccount: <any>{},
      allGenres: [],
      allCountries: [],
      allYears: [],
      nowPlayings: [],
      upComings: [],
      tvAiringTodays: [],
      topRateds: [],
      recommends: [],
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
    async getDataHomePage() {
      this.$state.loadingHomePage = true;

      await Promise.all([
        getNowPlaying(1),
        getUpComing(1),
        getTvAiringToday(1),
        getTopRated(1),
        this.$state?.isLogin ? getMyRecommend(1) : null,
      ])
        .then((response: any) => {
          this.$state.nowPlayings = response[0].data?.results;
          this.$state.upComings = response[1].data?.results;
          this.$state.tvAiringTodays = response[2].data?.results;
          this.$state.topRateds = response[3].data?.results;
          if (this.$state?.isLogin) {
            this.$state.recommends = response[4].data?.results;
          }
          this.$state.loadingHomePage = false;
        })
        .catch((e) => {
          // this.$state.loadingHomePage = false;
          if (axios.isCancel(e)) return;
        });
    },

    async getDataMisc() {
      this.$state.loadingMisc = true;

      Promise.all([getAllGenre(), getAllYear(), getAllNational()])
        .then((response) => {
          this.$state.allGenres = response[0].data;
          this.$state.allYears = response[1].data.sort(function (
            a: any,
            b: any
          ) {
            return +b.name.slice(-4) - +a.name.slice(-4);
          });
          this.$state.allCountries = response[2].data;

          this.$state.loadingMisc = true;
        })
        .catch((e) => {
          // this.$state.loadingMisc = false;
          if (axios.isCancel(e)) return;
        });
    },
  },
});
