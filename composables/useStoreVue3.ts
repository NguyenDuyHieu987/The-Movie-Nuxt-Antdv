import { getWithExpiry } from '@/utils/LocalStorage';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
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
} from '@/services/MovieService';

export default defineStore('store', () => {
  const collapsed = ref(false);
  const openDrawer = ref(false);
  const modalVisible = ref(false);
  const isLogin = computed(() =>
    getWithExpiry('userAccount') != null ? true : false
  );
  const breadCrumbValue = ref('');
  const role = ref('normal');
  const loadingHomePage = ref(false);
  const loadingMisc = ref(false);
  const loadingDashBoard = ref(false);
  const userAccount = ref<any>({});
  const allGenres = ref<object[]>([]);
  const allCountries = ref<object[]>([]);
  const allYears = ref<object[]>([]);
  const nowPlayings = ref<object[]>([]);
  const upComings = ref<object[]>([]);
  const tvAiringTodays = ref<object[]>([]);
  const topRateds = ref<object[]>([]);
  const recommends = ref<object[]>([]);

  const setCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  const setOpendrawer = () => {
    openDrawer.value = !openDrawer.value;
  };

  async function getDataHomePage() {
    await Promise.all([
      getNowPlaying(1),
      getUpComing(1),
      getTvAiringToday(1),
      getTopRated(1),
      isLogin.value ? getMyRecommend(userAccount.value?.id, 1) : null,
    ])
      .then((response: any) => {
        nowPlayings.value = response[0].data?.results;
        upComings.value = response[1].data?.results;
        tvAiringTodays.value = response[2].data?.results;
        topRateds.value = response[3].data?.results;
        if (isLogin.value) {
          recommends.value = response[4].data?.results;
        }

        loadingHomePage.value = true;
      })
      .catch((e) => {
        // loadingHomePage.value = false;
        if (axios.isCancel(e)) return;
      });
  }

  async function getDataMisc() {
    loadingMisc.value = true;

    Promise.all([getAllGenre(), getAllYear(), getAllNational()])
      .then((response) => {
        allGenres.value = response[0].data;
        allYears.value = response[1].data.sort(function (a: any, b: any) {
          return +b.name.slice(-4) - +a.name.slice(-4);
        });
        allCountries.value = response[2].data;

        loadingMisc.value = true;
      })
      .catch((e) => {
        // loadingMisc.value = false;
        if (axios.isCancel(e)) return;
      });
  }

  return {
    collapsed,
    openDrawer,
    modalVisible,
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
    nowPlayings,
    upComings,
    tvAiringTodays,
    topRateds,
    recommends,
    getDataHomePage,
    getDataMisc,
    setCollapsed,
    setOpendrawer,
  };
});
