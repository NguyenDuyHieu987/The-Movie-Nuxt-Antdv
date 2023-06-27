import { makeRequest } from './makeRequest';
import { getWithExpiry } from '@/utils/customlocalStorage';

export function getMyRecommend(page: number = 1, limit: number = 6) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/recommend/getrecommend?page=${page}&limit=${limit}`, {
    headers: headers,
  });
}
