import { makeRequest } from './makeRequest';

// const URL_API_IMAGE = 'http://127.0.0.1:5001';
const URL_API_IMAGE = 'https://img.api.phimhay247.site';

export function getPoster(path: string, size = 'full') {
  return path === null || path === undefined
    ? ''
    : `${URL_API_IMAGE}/image/poster/${path}?size=${size}`;
}

export function getBackdrop(path: string, size = 'full') {
  return path === null || path === undefined
    ? ''
    : `${URL_API_IMAGE}/image/backdrop/${path}?size=${size}`;
}

export function getColorImage(path: string) {
  return makeRequest(
    path === null || path === undefined
      ? ''
      : `${URL_API_IMAGE}/imagecolor/backdrop/${path}`
  );
}
