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
    localStorage: { setWithExpiry, getWithExpiry, getWithExpiry_ExpRemain },
    dateFormater: { format, fromNow },
    conrfirmMessageModal,
    removeVietnameseTones,
    textUppercase,
  };
};
