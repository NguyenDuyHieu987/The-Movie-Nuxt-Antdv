import { makeRequest } from './makeRequest';
import ALLGENRES from '../constants/data/Genres.json';
import ALLCOUNTRIES from '@/constants/data/Country.json';
import { getGenreByShortName, getGenreByName } from './genres';
import { getCountryByShortName } from './country';
import type { country, genre, formfilter, typeMovie, typeTv } from '@/types';

export function FilterMovie(formFilter: formfilter) {
  const yearLte = formFilter.year != '' ? formFilter.year + '-12-30' : '';
  const yearGte =
    formFilter.year != ''
      ? /^\d+$/.test(formFilter.year)
        ? formFilter.year + '-01-01'
        : formFilter.year.slice(-4) + '-01-01'
      : '';

  // const genreStr =
  //   formFilter.genre !== ''
  //     ? /^\d+$/.test(formFilter.genre)
  //       ? formFilter.genre
  //       : getGenreByName(formFilter.genre)?.id
  //     : '';

  return /^\d+$/.test(formFilter.year) || formFilter.year == ''
    ? makeRequest(
        `/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      )
    : makeRequest(
        `/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}&limit=${formFilter.limit}`
      );
}

export function DiscoverMovie(type: typeMovie, page: number = 1) {
  switch (type) {
    case 'all':
      return makeRequest(`/movie/all?page=${page}`);
      break;
    case 'nowplaying':
      return makeRequest(`/movie/nowplaying?page=${page}`);
      break;
    case 'popular':
      return makeRequest(`/movie/popular?page=${page}`);
      break;
    case 'toprated':
      return makeRequest(`/movie/toprated?page=${page}`);
      break;
    case 'upcoming':
      return makeRequest(`/movie/upcoming?page=${page}`);
      break;
  }
}

export function DiscoverTv(type: typeTv, page: number = 1) {
  switch (type) {
    case 'all':
      return makeRequest(`/tv/all?page=${page}`);
      break;
    case 'airingtoday':
      return makeRequest(`/tv/airingtoday?page=${page}`);
      break;
    case 'ontheair':
      return makeRequest(`/movie/ontheair?page=${page}`);
      break;
    case 'popular':
      return makeRequest(`/tv/popular?page=${page}`);
      break;
    case 'toprated':
      return makeRequest(`/tv/toprated?page=${page}`);
      break;
  }
}

export function getMoviesByGenres(
  genre_short_name: string,
  sort_by: string = '',
  page: number = 1,
  limit: number = 20
) {
  const genre: genre | undefined = getGenreByShortName(
    genre_short_name,
    ALLGENRES
  );

  return makeRequest(
    `/discover/all?sort_by=${sort_by}&with_genres=${
      genre!.id
    }&page=${page}&limit=${limit}`
  );
}

export function getMoviesByYear(
  year: string,
  sort_by: string = '',
  page: number = 1,
  limit: number = 20
) {
  const url = /^\d+$/.test(year)
    ? `/discover/all?sort_by=${sort_by}&primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}&limit=${limit}`
    : `/discover/all?sort_by=${sort_by}&primary_release_date_lte=${year.slice(
        -4
      )}-01-01&page=${page}&limit=${limit}`;

  return makeRequest(url);
}

export function getMovieByCountry(
  country_short_name: string,
  sort_by: string = '',
  page: number = 1,
  limit: number = 20
) {
  const country: country | undefined = getCountryByShortName(
    country_short_name,
    ALLCOUNTRIES
  );

  return makeRequest(
    `/discover/all?sort_by=${sort_by}&with_original_language=${
      country!.iso_639_1
    }&page=${page}&limit=${limit}`
  );
}
