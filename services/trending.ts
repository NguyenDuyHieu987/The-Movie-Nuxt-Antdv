import { makeRequest } from './makeRequest';

export function getTrending(page: number = 1, limit: number = 20) {
  return makeRequest(`/trending/all?page=${page}&limit=${limit}`);
}
