import { makeRequest } from './makeRequest';

export function getTvAiringToday(page: number = 1) {
  return makeRequest(`/tv/airingtoday?page=${page}&api=hieu987`);
}

export function getTvOntheAir(page: number = 1) {
  return makeRequest(`/tv/ontheair?page=${page}&api=hieu987`);
}

export function getTvPopular(page: number = 1) {
  return makeRequest(`/tv/popular?page=${page}&api=hieu987`);
}

export function getTvTopRated(page: number = 1) {
  return makeRequest(`/tv/toprated?page=${page}&api=hieu987`);
}
