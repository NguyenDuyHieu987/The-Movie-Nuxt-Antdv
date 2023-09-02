import { makeRequest } from './makeRequest';

export function getSeason(movieId: string, seasonId: string) {
  return makeRequest(`/season/get/${movieId}/${seasonId}`);
}
