import { makeRequest } from './makeRequest';

export function getList(
  type: string = 'all',
  skip: number = 1,
  limit: number = 20
) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/getlist/${type}?skip=${skip}&limit=${limit}`, {
    headers: headers,
  });
}

export function searchList(query: string, type: string) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/searchlist/${type}?query=${query}`, {
    headers: headers,
  });
}

export function getItemList(movieId: string, media_type: string) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/getitem/${media_type}/${movieId}?api=hieu987`, {
    headers: headers,
  });
}

export function addItemList(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/add_item`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function removeItemList(params: any) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('movie_id', params.movie_id);

  return makeRequest(`/list/remove_item`, {
    method: 'DELETE',
    headers: headers,
    data: bodyFormData,
  });
}

export function removeAllItemList() {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/removeall_item`, {
    method: 'DELETE',
    headers: headers,
  });
}
