export const useUtils = () => {
  return {
    auth: { onLogOut },
    handelAddItemToList,
    viewFormatter,
    encryptPassword,
    handelRemoveItemFromList,
    handleRemoveAllitemFromList,
    handleRemoveItemFromHistory,
    handleRemoveAllitemFromHistory,
    initFacebookSdk,
    initGoogleSdk,
    cookie: { getCookie, setCookie },
    localStorage: {
      setWithExpiry,
      getWithExpiry,
      getWithExpiry_ExpRemain,
      useLocalStorage,
    },
    dateFormater: { format, fromNow },
    conrfirmMessageModal,
    removeVietnameseTones,
    textUppercase,
  };
};
