import { makeRequest } from './makeRequest';
import type { country } from '~/types';
import ALLCOUNTRIES from '@/constants/data/Country.json';

export function getAllCountry() {
  return makeRequest(`/country/all`);
}

export function getCountryVietSub(
  original_language: string,
  allCountries: country[]
): country {
  if (allCountries?.length != 0) {
    return allCountries.find((country) => country.name === original_language)!;
  } else {
    return ALLCOUNTRIES.find((country) => country.name === original_language)!;
  }
}

export function getCountryByShortName(
  country_short_name: string,
  allCountries: country[]
): country {
  if (allCountries?.length != 0) {
    return allCountries.find(
      (country) => country.short_name === country_short_name
    )!;
  } else {
    return ALLCOUNTRIES.find(
      (country) => country.short_name === country_short_name
    )!;
  }
}

export function getCountryByOriginalLanguage(
  original_language: string,
  allCountries: country[]
): country {
  if (allCountries?.length != 0) {
    return allCountries.find(
      (language) => language.iso_639_1 === original_language
    )!;
  } else {
    return ALLCOUNTRIES.find(
      (language) => language.iso_639_1 === original_language
    )!;
  }
}
