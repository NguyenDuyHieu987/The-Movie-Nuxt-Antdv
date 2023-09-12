import { makeRequest } from './makeRequest';
import type { genre } from '@/types';
import ALLGENRES from '../constants/data/Genres';

export function getAllGenre() {
  return makeRequest(`/genre/all`);
}

export function getGenreByShortName(
  genre_short_name: string,
  allGenres?: genre[]
) {
  if (allGenres?.length != 0) {
    return allGenres!.find((gen) => gen.short_name == genre_short_name);
  } else {
    return ALLGENRES.find((gen) => gen.short_name == genre_short_name);
  }
}

export function getGenreById(genre_id: number, allGenres?: genre[]) {
  if (allGenres?.length != 0) {
    return allGenres!.find((gen) => gen.id == genre_id);
  } else {
    return ALLGENRES.find((gen) => gen.id == genre_id);
  }
}

export function getGenreByName(genre_name: string, allGenres?: genre[]) {
  if (allGenres?.length != 0) {
    return allGenres!.find((gen) => gen.name == genre_name);
  } else {
    return ALLGENRES.find((gen) => gen.name == genre_name);
  }
}
