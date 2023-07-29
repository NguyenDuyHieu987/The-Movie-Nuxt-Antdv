export const useUtils = () => {
  return {
    onLogOut,
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
