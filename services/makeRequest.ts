import axios from 'axios';

export function makeRequest(url: string, options: any = {}) {
  // const nuxtConfig = useRuntimeConfig();
  // console.log(nuxtConfig);

  const api = axios.create({
    baseURL: 'https://api.phimhay247.site',
    // baseURL: 'http://127.0.0.1:5000',
    // withCredentials: true,
  });

  return api(url, options)
    .then((res) => {
      const { headers, data } = res;

      return { headers, ...data };
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}
