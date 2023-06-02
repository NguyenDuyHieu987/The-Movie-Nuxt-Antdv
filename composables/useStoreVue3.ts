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
} from '~/services/appMovieService';

const utils = useUtils();

export default defineStore('store', () => {
  const collapsed = ref(false);
  const openDrawer = ref(false);
  const modalVisible = ref(false);
  const isLogin = computed(() =>
    utils.localStorage.getWithExpiry('userAccount') != null ? true : false
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
    setCollapsed,
    setOpendrawer,
  };
});
