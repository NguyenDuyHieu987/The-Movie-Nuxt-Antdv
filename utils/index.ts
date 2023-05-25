export const useUtils = () => {
  return {
    accountService,
    handelAddItemToList,
    viewFormatter,
    encryptPassword,
    handelRemoveItemFromList,
    handleRemoveAllitemFromList,
    handleRemoveItemFromHistory,
    handleRemoveAllitemFromHistory,
    initFacebookSdk,
    initGoogleSdk,
    localStorage: { setWithExpiry, getWithExpiry },
    conrfirmMessageModal,
    removeVietnameseTones,
    textUppercase,
  };
};
