import { makeRequest } from './makeRequest';

export function getSimilar(
  type: string,
  movieId: string,
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/similar/${type}/${movieId}?page=${page}&limit=${limit}`);
}
