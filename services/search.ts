import { makeRequest } from './makeRequest';

export function getDaTaSearch(
  query: string,
  page: number = 1,
  limit: number = 20
) {
  return makeRequest(`/search/all?query=${query}&page=${page}&limit=${limit}`);
}

export function getDaTaTopSearch(page: number = 1, limit: number = 20) {
  return makeRequest(`/search/top-search?page=${page}&limit=${limit}`);
}

export function getDaTaSearchHistory(page: number = 1, limit: number = 10) {
  return makeRequest(`/search/search-history?page=${page}&limit=${limit}`);
}

export function addSearch(query: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('query', query);

  return makeRequest(`/search/add-search`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function addSearchHistory(query: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('query', query);

  return makeRequest(`/search/add-history`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function removeSearchHistory(id: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', id);

  return makeRequest(`/search/remove-history`, {
    method: 'DELETE',
    data: bodyFormData,
  });
}

export function clearSearchHistory() {
  return makeRequest(`/search/clear-history`, {
    method: 'DELETE',
  });
}
