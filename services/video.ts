import { makeRequest } from './makeRequest';

// const URL_API_MEDIA = 'http://127.0.0.1:5002';
const URL_API_MEDIA = 'https://media.phimhay247.site';

export function getVideos(id: string) {
  return makeRequest(`/videos/${id}`);
}

export function getVideoFeature(path: string) {
  return `${URL_API_MEDIA}/video/feature/${path}`;
}

export function getVideoTelevisons(path: string) {
  return `${URL_API_MEDIA}/video/televisons/${path}`;
}
