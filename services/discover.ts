import { makeRequest } from './makeRequest';
import ALLGENRES from '../constants/data/Genres';
import { getGenreByShortName, getGenreByName } from './genres';
import type { country, genre } from '@/types';
import { getCountryByShortName } from './country';
import type { formfilter } from '@/types';

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
        `/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}`
      )
    : makeRequest(
        `/discover/${formFilter.type}?sort_by=${formFilter.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${formFilter.genre}&with_original_language=${formFilter.country}&page=${formFilter.page}`
      );
}

export function getMoviesByGenres(
  genre_short_name: string,
  sort_by: string = '',
  page: number = 1
) {
  const genre: genre | undefined = getGenreByShortName(
    genre_short_name,
    ALLGENRES
  );

  return makeRequest(
    `/discover/all?sort_by=${
      //   sort_by.length != 0 ? '&sort_by=' + sort_by : ''
      sort_by
    }&with_genres=${genre!.id}&page=${page}`
  );
}

export function getMoviesByYear(year: string, page: number = 1) {
  const url = /^\d+$/.test(year)
    ? `/discover/all?primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}`
    : `/discover/all?api=hieu987&primary_release_date_lte=${year.slice(
        -4
      )}-01-01&page=${page}`;
  return makeRequest(url);
}

export function getMovieByCountry(
  country_short_name: string,
  page: number = 1
) {
  const country: country | undefined =
    getCountryByShortName(country_short_name);

  return makeRequest(
    `/discover/all?with_original_language=${country!.iso_639_1}&page=${page}`
  );
}
