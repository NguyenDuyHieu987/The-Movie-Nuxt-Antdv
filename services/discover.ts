import { makeRequest } from './makeRequest';
import ALLGENRES from '../constants/Genres';
import { getGenresNameByShortName, getIdGenresByName } from './genres';
import type { country, genre } from '@/types';
import { getCountryByShortName } from './country';

export function FilterDataMovie(formSelect: any) {
  const yearLte = formSelect.year + '-12-30';
  const yearGte =
    formSelect.year != ''
      ? /^\d+$/.test(formSelect.year)
        ? formSelect.year + '-01-01'
        : formSelect.year.slice(-4) + '-01-01'
      : '';

  const genreStr =
    formSelect.genre !== ''
      ? /^\d+$/.test(formSelect.genre)
        ? formSelect.genre
        : getIdGenresByName(formSelect.genre)?.id
      : '';

  return /^\d+$/.test(formSelect.year)
    ? makeRequest(
        `/discover/${formSelect.type}?sort_by=${formSelect.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${genreStr}&with_original_language=${formSelect.country}&page=${formSelect.pageFilter}`
      )
    : makeRequest(
        `/discover/${formSelect.type}?sort_by=${formSelect.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${genreStr}&with_original_language=${formSelect.country}&page=${formSelect.pageFilter}`
      );
}

export function getMoviesByGenres(
  genre_short_name: string,
  sort_by: string = '',
  page: number = 1
) {
  const genre: genre | undefined = getGenresNameByShortName(
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
