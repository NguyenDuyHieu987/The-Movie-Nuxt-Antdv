import { makeRequest } from './makeRequest';

export function getTrending(page: number, limit: number = 20) {
  return makeRequest(`/trending/all?page=${page}&limit=${limit}`);
}
