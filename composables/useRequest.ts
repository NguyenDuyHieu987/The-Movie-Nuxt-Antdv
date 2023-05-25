import axios from 'axios';

export const useRequest = () => {
  return {
    makeRequest: (url: string, options: any | {}) => {
      const nuxtConfig = useRuntimeConfig();
      console.log(nuxtConfig);
      const api = axios.create({
        baseURL: 'http://127.0.0.1:5000',
        // withCredentials: true,
      });

      return api(url, options)
        .then((res) => res.data)
        .catch((error) =>
          Promise.reject(error?.response?.data?.message ?? 'Error')
        );
    },
  };
};
