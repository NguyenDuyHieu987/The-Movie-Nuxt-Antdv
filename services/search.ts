import { makeRequest } from './makeRequest';

export function getDaTaSearch(query: string, page: number = 1) {
  return makeRequest(`/search/multi?query=${query}&page=${page}`);
}
