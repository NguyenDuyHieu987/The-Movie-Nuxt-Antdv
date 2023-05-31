import { makeRequest } from './makeRequest';

export function getNowPlaying(page: number = 1) {
  return makeRequest(`/movie/nowplaying?page=${page}`);
}

export function getUpComing(page: number = 1) {
  return makeRequest(`/movie/upcoming?page=${page}`);
}

export function getPopular(page: number = 1) {
  return makeRequest(`/movie/popular?page=${page}`);
}

export function getTopRated(page: number = 1) {
  return makeRequest(`/movie/toprated?page=${page}`);
}
