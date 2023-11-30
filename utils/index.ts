export const useUtils = () => {
  return {
    handelAddItemToList,
    viewFormatter,
    encryptPassword,
    handelRemoveItemFromList,
    handleRemoveAllitemFromList,
    handleRemoveItemFromHistory,
    handleRemoveAllitemFromHistory,
    initFacebookSdk,
    initGoogleGSIClient,
    cookie: customCookie(),
    localStorage: customLocalStorage(),
    dateTimeFormater: dateTimeFormater(),
    conrfirmMessageModal,
    removeVietnameseTones,
  };
};

export * from './convertViews';
export * from './customCookie';
export * from './customLocalStorage';
export * from './dateTimeFormater';
export * from './encryptPassword';
export * from './facebookService';
export * from './handelAddRemoveItemList_History';
export * from './initFacebookSDK';
export * from './initGoogleGSIClient';
export * from './messageModal';
export * from './removeVietnameseTones';
