import { makeRequest } from './makeRequest';
import { getWithExpiry } from '@/utils/customlocalStorage';

export function getMyRecommend(page: number = 1, limit: number = 6) {
  return makeRequest(`/recommend/get?page=${page}&limit=${limit}`);
}
