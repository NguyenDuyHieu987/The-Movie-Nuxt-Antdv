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
    initGoogleSdk,
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
export * from './init-facebook-sdk';
export * from './init-google-sdk';
export * from './messageModal';
export * from './removeVietnameseTones';
