import { makeRequest } from './makeRequest';

export function getList(skip: number = 0) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/getlist?skip=${skip}`, {
    headers: headers,
  });
}

export function searchList(query: string) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/searchlist?query=${query}`, {
    headers: headers,
  });
}

export function getItemList(movieId: number | string) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(`/list/getitem/${movieId}?api=hieu987`, {
    headers: headers,
  });
}

export function addItemList(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('media_id', params.media_id);
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
  bodyFormData.append('media_id', params.media_id);

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
