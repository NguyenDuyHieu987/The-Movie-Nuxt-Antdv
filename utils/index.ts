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
    localStorage: { setWithExpiry, getWithExpiry },
    conrfirmMessageModal,
    removeVietnameseTones,
    textUppercase,
  };
};
