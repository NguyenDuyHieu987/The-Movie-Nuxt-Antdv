import { getWithExpiry } from '@/utils/LocalStorage';

export const useUtils = () => {
  return {
    collapsed: true,
    openDrawer: false,
    modalVisible: false,
    isLogin: getWithExpiry('userAccount') != null ? true : false,
    breadCrumbValue: '',
    role: 'normal',
    loadingSearch: false,
    loadingDashBoard: false,
    userAccount: getWithExpiry('userAccount'),
    allGenres: [],
    allCountries: [],
  };
};
