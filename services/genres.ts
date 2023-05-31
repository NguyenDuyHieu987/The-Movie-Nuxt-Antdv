import { makeRequest } from './makeRequest';
import type { genre } from '@/types';
import ALLGENRES from '../constants/Genres';

export function getAllGenre() {
  return makeRequest(`/genre/all`);
}

export function getGenresNameByShortName(
  genre_short_name: string,
  allGenres: genre[]
) {
  if (allGenres.length != 0) {
    return allGenres.find((gen) => {
      if (gen.short_name === genre_short_name) {
        return gen;
      }
    });
  } else {
    return ALLGENRES.find((gen) => {
      if (gen.short_name === genre_short_name) {
        return gen;
      }
    });
  }
}

export function getIdGenresByName(genres_name: string) {
  return ALLGENRES.find((gen) => (gen.name === genres_name ? gen : null));
}
