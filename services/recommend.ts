import { makeRequest } from './makeRequest';

export function getMyRecommend(page: number = 1, limit: number = 6) {
  const store = useStore();

  if (!store.isLogin) return new Promise(() => {});

  return makeRequest(`/recommend/get?page=${page}&limit=${limit}`);
}
