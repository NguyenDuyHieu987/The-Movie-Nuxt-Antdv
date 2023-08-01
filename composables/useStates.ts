const utils = useUtils();

export const useStates = () => {
  // console.log(utils.localStorage.getWithExpiry('user_account'));

  return {
    isLogin: useState<boolean>('isLogin', () =>
      utils.localStorage.getWithExpiry('user_account') ? true : false
    ).value,
  };
};
