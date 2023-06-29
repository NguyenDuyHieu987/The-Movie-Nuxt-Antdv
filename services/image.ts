import { makeRequest } from './makeRequest';

const URL_API_IMAGE = 'http://127.0.0.1:5001';
const URL_API_IMAGE1 = 'https://ik.imagekit.io/8toa5f2rp';
// const URL_API_IMAGE = 'https://img.phimhay247.site';

export function getImage(path: string, type: string) {
  return path ? `${URL_API_IMAGE1}/images/${type}/${path}` : '';
}

export function getPoster(path: string, size = 'full') {
  return path ? `${URL_API_IMAGE}/image/poster/${path}?size=${size}` : '';
}

export function getBackdrop(path: string, size = 'full') {
  return path ? `${URL_API_IMAGE}/image/backdrop/${path}?size=${size}` : '';
}

export function getColorImage(path: string) {
  return makeRequest(
    path === null || path === undefined
      ? ''
      : `${URL_API_IMAGE}/imagecolor/backdrop/${path}`
  );
}
