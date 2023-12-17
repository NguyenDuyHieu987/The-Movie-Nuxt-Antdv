import { makeRequest } from './makeRequest';
import type { rankFilter } from '~/types';

export function getRanking(page: number = 1, limit: number = 10) {
  return makeRequest(
    `/discover/all?sort_by=views_desc&page=${page}&limit=${limit}`
  );
}

export function getRankSearch(
  type: rankFilter = 'day',
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/ranks/hot-search/${type}?page=${page}&limit=${limit}`);
}

export function getRankPlay(
  type: rankFilter = 'day',
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/ranks/hot-play/${type}?page=${page}&limit=${limit}`);
}

export function getRankHighRate(
  type: rankFilter = 'day',
  page: number = 1,
  limit: number = 10
) {
  return makeRequest(`/ranks/high-rate/${type}?page=${page}&limit=${limit}`);
}

export function addRankPlay(params: { movie_id: string; media_type: string }) {
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

export function addRankRate(params: {
  movie_id: string;
  media_type: string;
  rate_value: number;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id!);
  bodyFormData.append('media_type', params.media_type!);
  bodyFormData.append('rate_value', params.rate_value.toString());

  return makeRequest(`/ranks/add-rate`, {
    method: 'POST',
    data: bodyFormData,
  });
}
