import axios from 'axios';

export function makeRequest(url: string, options: any = {}) {
  const nuxtConfig = useRuntimeConfig();
  // console.log(nuxtConfig);

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? nuxtConfig.app.apiGateway
      : 'http://127.0.0.1:5000',
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
