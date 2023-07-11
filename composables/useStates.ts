const utils = useUtils();

export const useStates = () => {
  // console.log(utils.localStorage.getWithExpiry('userAccount'));

  const isLogin = useState<boolean>('isLogin', () =>
    utils.localStorage?.getWithExpiry('userAccount') ? true : false
  );

  return {
    isLogin: isLogin.value,
  };
};
