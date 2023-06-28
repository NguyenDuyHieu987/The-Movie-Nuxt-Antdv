import axios from 'axios';

export function makeRequestVideo(url: string, options: any = {}) {
  // const nuxtConfig = useRuntimeConfig();
  // console.log(nuxtConfig);

  const api = axios.create({
    baseURL: 'http://127.0.0.1:5002',
    // baseURL: 'https://media.phimhay247.site',
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
  return makeRequestVideo(`/video/${path}`);
}

export function getVideoFeature(path: string) {
  return makeRequestVideo(`/video/feature/${path}`);
}

export function getVideoTelevisons(path: string) {
  return makeRequestVideo(`/video/televisons/${path}`);
}
