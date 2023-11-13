import axios from 'axios';
import type {
  AxiosRequestHeaders,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export async function makeRequest(
  url: string,
  options?: {
    noAuthHeaders?: boolean;
    noResponseHeaders?: boolean;
  } & AxiosRequestConfig
) {
  const nuxtConfig = useRuntimeConfig();
  let headers: AxiosRequestHeaders | any = {};

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? nuxtConfig.app.apiGateway
      : 'http://localhost:5000',
    // baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  if (getWithExpiry('user_token') && !options?.noAuthHeaders) {
    if (!options?.headers?.hasOwnProperty('Authorization')) {
      headers.Authorization = `Bearer ${getWithExpiry('user_token')}`;
    }
  }

  return await api(url, {
    ...options,
    headers: { ...headers, ...options?.headers },
  })
    .then((res: AxiosResponse) => {
      const { headers, data } = res;

      if (options?.noResponseHeaders) {
        return data;
      }

      return { headers, ...data };
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}
