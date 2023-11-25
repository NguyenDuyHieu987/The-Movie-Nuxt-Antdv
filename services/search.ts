import { makeRequest } from './makeRequest';

export function getDaTaSearch(query: string, page: number = 1) {
  return makeRequest(`/search/all?query=${query}&page=${page}`);
}
