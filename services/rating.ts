import { makeRequest } from './makeRequest';

export function getRating(moveId: string, type: string) {
  return makeRequest(`/rating/get/${type}/${moveId}`);
}

export function rating(moveid: string, type: string, value: number) {
  const bodyFormData = new FormData();
  bodyFormData.append('value', value.toString());

  return makeRequest(`/rating/${type}/${moveid}`, {
    method: 'POST',
    data: bodyFormData,
  });
}
