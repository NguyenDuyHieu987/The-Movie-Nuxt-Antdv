import { makeRequest } from './makeRequest';

export function getList(
  type: string = 'all',
  skip: number = 1,
  limit: number = 20
) {
  return makeRequest(`/list/get/${type}?skip=${skip}&limit=${limit}`);
}

export function searchList(query: string, type: string = 'all') {
  return makeRequest(`/list/search/${type}?query=${query}`);
}

export function getItemList(movieId: string, media_type: string) {
  return makeRequest(`/list/getitem/${media_type}/${movieId}?api=hieu987`);
}

export function addItemList(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('movie_id', params.movie_id);
  bodyFormData.append('media_type', params.media_type);

  return makeRequest(`/list/additem`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function removeItemList(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', params?.id || null);
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('movie_id', params.movie_id);

  return makeRequest(`/list/removeitem`, {
    method: 'DELETE',
    data: bodyFormData,
  });
}

export function removeAllItemList() {
  return makeRequest(`/list/removeallitem`, {
    method: 'DELETE',
  });
}
