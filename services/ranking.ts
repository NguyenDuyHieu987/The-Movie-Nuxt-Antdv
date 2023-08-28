import { makeRequest } from './makeRequest';

export function getRanking(page: number = 1, limit: number = 10) {
  return makeRequest(
    `/discover/all?sort_by=views_desc&page=${page}&limit=${limit}`
  );
}
