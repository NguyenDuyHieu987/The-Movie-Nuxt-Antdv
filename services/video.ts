import axios from 'axios';

export function makeRequestVideo(url: string, options: any = {}) {
  const nuxtConfig = useRuntimeConfig();
  // console.log(nuxtConfig);

  const api = axios.create({
    baseURL:
      // nuxtConfig.app.videoImageUrl ||
      'https://res.cloudinary.com/dvbhjlrdf/video/upload/v1688148335',
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
  return makeRequestVideo(`/videos/${path}`);
}

export function getVideoFeature(path: string) {
  return makeRequestVideo(`/video/feature/${path}`);
}

export function getVideoTelevisons(path: string) {
  return makeRequestVideo(`/video/televisons/${path}`);
}
