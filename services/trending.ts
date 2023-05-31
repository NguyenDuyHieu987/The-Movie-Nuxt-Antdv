import { makeRequest } from './makeRequest';

export function getTrending(page: number) {
  return makeRequest(`/trending/all?page=${page}`);
}
