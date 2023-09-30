import axios from 'axios';
import { makeRequest } from './makeRequest';

export function makeRequestVideo(url: string, options: any = {}) {
  const nuxtConfig = useRuntimeConfig();

  const api = axios.create({
    baseURL: nuxtConfig.app.production_mode
      ? nuxtConfig.app.serverVideoUrl
      : 'http://localhost:5002',
    // withCredentials: true,
    headers: { Accept: 'video/mp4;charset=UTF-8' },
    responseType: 'blob',
  });

  return api(url, options)
    .then((res) => {
      return res;
    })
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}

export function getVideo(path: string) {
  return makeRequestVideo(`/videos/${path}`);
}

export function getVideos(id: string) {
  return makeRequest(`/videos/${id}`);
}

export function getVideoFeature(path: string) {
  return makeRequestVideo(`/videos/feature/${path}`);
}

export function getVideoTelevisons(path: string) {
  return makeRequestVideo(`/videos/televisons/${path}`);
}
