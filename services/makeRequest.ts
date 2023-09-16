import axios from 'axios';

export function makeRequest(url: string, options: any = {}) {
  const nuxtConfig = useRuntimeConfig();
  let headers: any = {};

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? nuxtConfig.app.apiGateway
      : 'http://127.0.0.1:5000',
    withCredentials: true,
  });

  if (getWithExpiry('user_account')?.user_token && !options?.noAuthHeader) {
    if (!options?.headers?.hasOwnProperty('Authorization')) {
      headers.Authorization = `Bearer ${
        getWithExpiry('user_account')?.user_token
      }`;
    }
  }

  return api(url, { headers: { ...headers, ...options?.headers }, ...options })
    .then((res) => {
      const { headers, data } = res;

      return { headers, ...data };
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}
