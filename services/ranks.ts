import { makeRequest } from './makeRequest';

export function getRanking(page: number = 1, limit: number = 10) {
  return makeRequest(
    `/discover/all?sort_by=views_desc&page=${page}&limit=${limit}`
  );
}

export function getRankSearch(page: number = 1, limit: number = 10) {
  return makeRequest(`/ranks/hot-search?page=${page}&limit=${limit}`);
}

export function getRankPlay(page: number = 1, limit: number = 10) {
  return makeRequest(`/ranks/hot-play?page=${page}&limit=${limit}`);
}

export function addRankplay(params: { movie_id: string; media_type: string }) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest(`/ranks/add-play`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function addRankSearch(params: {
  movie_id?: string;
  media_type?: string;
  query: string;
}) {
  const bodyFormData = new FormData();
  params?.movie_id && bodyFormData.append('movie_id', params.movie_id!);
  params?.media_type && bodyFormData.append('media_type', params.media_type!);
  bodyFormData.append('query', params.query);

  return makeRequest(`/ranks/add-search`, {
    method: 'POST',
    data: bodyFormData,
  });
}
