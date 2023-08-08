import { makeRequest } from './makeRequest';

export function getHistory(
  type: string = 'all',
  skip: number = 1,
  limit: number = 20
) {
  return makeRequest(`/history/gethistory/${type}?skip=${skip}&limit=${limit}`);
}

export function searchHistory(query: string, type: string = 'all') {
  return makeRequest(`/history/searchhistory/${type}?query=${query}`);
}

export function getItemHistory(movieId: string, media_type: string) {
  return makeRequest(`/history/getitem/${media_type}/${movieId}`);
}

export function add_update_History(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('duration', params.duration);
  bodyFormData.append('percent', params.percent.toFixed(3));
  bodyFormData.append('seconds', params.seconds);

  return makeRequest(`/history/add_item`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function removeItemHistory(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest(`/history/remove_item`, {
    method: 'DELETE',
    data: bodyFormData,
  });
}

export function removeAllItemHistory() {
  return makeRequest(`/history/removeall_item`, {
    method: 'DELETE',
  });
}
