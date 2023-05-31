import { makeRequest } from './makeRequest';

export function getSimilar(type: string, movieId: number | string) {
  return makeRequest(`/similar/${type}/${movieId}`);
}
