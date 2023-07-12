const utils = useUtils();

export const useStates = () => {
  // console.log(utils.localStorage.getWithExpiry('userAccount'));

  return {
    isLogin: useState<boolean>('isLogin', () =>
      utils.localStorage.getWithExpiry('userAccount') ? true : false
    ).value,
  };
};
