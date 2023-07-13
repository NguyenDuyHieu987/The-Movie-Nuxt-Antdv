import { makeRequest } from './makeRequest';

export function getHistory(
  type: string = 'all',
  skip: number = 1,
  limit: number = 20
) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(
    `/history/gethistory/${type}?skip=${skip}&limit=${limit}`,
    {
      headers: headers,
    }
  );
}

export function searchHistory(query: string) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/history/searchhistory?query=${query}`, {
    headers: headers,
  });
}

export function getItemHistory(movieId: string, media_type: string) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/history/getitem/${media_type}/${movieId}`, {
    headers: headers,
  });
}

export function add_update_History(params: any) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('duration', params.duration);
  bodyFormData.append('percent', params.percent.toFixed(3));
  bodyFormData.append('seconds', params.seconds);

  return makeRequest(`/history/add_item`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function removeItemHistory(params: any) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest(`/history/remove_item`, {
    method: 'DELETE',
    headers: headers,
    data: bodyFormData,
  });
}

export function removeAllItemHistory() {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/history/removeall_item`, {
    method: 'DELETE',
    headers: headers,
  });
}
