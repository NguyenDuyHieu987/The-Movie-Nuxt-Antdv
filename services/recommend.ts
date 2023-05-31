import { makeRequest } from './makeRequest';
import { getWithExpiry } from '@/utils/customlocalStorage';

export function getMyRecommend(skip: number = 1) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/recommend/getrecommend?skip=${skip}&api=hieu987`, {
    headers: headers,
  });
}
