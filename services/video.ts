import axios, { type AxiosRequestConfig } from 'axios';
import { makeRequest } from './makeRequest';

export async function makeRequestVideo(
  url: string,
  options: AxiosRequestConfig = {}
) {
  const nuxtConfig = useRuntimeConfig();

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? nuxtConfig.app.serverVideoUrl
      : 'http://localhost:5002',
    // withCredentials: true,
    headers: {
      Accept: 'video/mp4;charset=UTF-8',
    },
    responseType: 'arraybuffer',
  });

  return await api(url, options)
    .then((res) => {
      return res;
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}

export function getVideo(
  path: string,
  startByte: number = 0,
  endByte: number = 1024 * 1024
) {
  return makeRequestVideo(`/videos/${path}`, {
    headers: {
      Range: `bytes=${startByte}-${endByte}`,
    },
  });
}

export function getVideoFeature(path: string) {
  return makeRequestVideo(`/videos/feature/${path}`);
}

export function getVideoTelevisons(path: string) {
  return makeRequestVideo(`/videos/televisons/${path}`);
}
