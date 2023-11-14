import axios from 'axios';
import type {
  AxiosRequestHeaders,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

type MakeRequestOptions = {
  noAuthHeaders?: boolean;
  getResponseHeaders?: boolean;
} & AxiosRequestConfig;

export async function makeRequest(
  url: string,
  options: MakeRequestOptions = {
    noAuthHeaders: false,
    getResponseHeaders: false,
  }
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

      if (options?.getResponseHeaders) {
        return { headers, ...data };
      }

      return data;
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}
