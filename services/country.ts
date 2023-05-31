import { makeRequest } from './makeRequest';
import type { country } from '~/types';
import COUNTRIES from '../constants/Country';

export function getAllCountry() {
  return makeRequest(`/country/all`);
}

export function getCountryVietSub(
  original_language: string,
  allCountries: country[]
) {
  return allCountries.find((country) => country.name === original_language);
}

export function getCountryByShortName(country_short_name: string) {
  return COUNTRIES.find((country) => country.short_name === country_short_name);
}

export function getCountryByOriginalLanguage(
  original_language: string,
  allCountries: country[]
) {
  return allCountries.find(
    (language) => language.iso_639_1 === original_language
  );
}
