import { makeRequest } from './makeRequest';

export function getSimilar(
  type: string,
  movieId: string,
  page: number = 1,
  limit: number = 12
) {
  return makeRequest(`/similar/${type}/${movieId}?page=${page}&limit=${limit}`);
}
