import { makeRequest } from './makeRequest';

const URL_API_IMAGE = 'https://img.phimhay247.site';
// const URL_API_IMAGE1 = 'https://ik.imagekit.io/z8fhvnk8u';
// const URL_API_IMAGE1 = 'https://res.cloudinary.com/dvbhjlrdf/image/upload';

// export function getImage(path: string, type: string, crop: string = '') {
//   return path
//     ? `${URL_API_IMAGE1}/${crop}/v1688106333/images/${type}/${path}`
//     : ' ';
// }

export function getImage(path: string, type: string, crop: string = '') {
  const nuxtConfig = useRuntimeConfig();

  const URL_API_IMAGE1 = nuxtConfig.app.serverImageUrl;

  if (crop?.length == 0)
    return path ? `${URL_API_IMAGE1}/images1/${type}/${path}` : ' ';

  return path ? `${URL_API_IMAGE1}/images1/${type}/${path}/tr:${crop}` : ' ';
}

export function getPoster(path: string, size = 'full') {
  return path ? `${URL_API_IMAGE}/image/poster/${path}?size=${size}` : ' ';
}

export function getBackdrop(path: string, size = 'full') {
  return path ? `${URL_API_IMAGE}/image/backdrop/${path}?size=${size}` : ' ';
}

export function getColorImage(path: string) {
  return makeRequest(`${URL_API_IMAGE}/imagecolor/backdrop/${path}`);
}

export function getPosterCast(path: string) {
  const nuxtConfig = useRuntimeConfig();
  const TMDB_IMAGE_BASE_URL = nuxtConfig.app.TMDBurl;

  return `${TMDB_IMAGE_BASE_URL}/original${path}`;
}
