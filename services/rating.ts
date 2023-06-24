import { makeRequest } from './makeRequest';

export function rating(moveid: string, type: string, value: number) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('value', value.toString());

  return makeRequest(`/rating/${type}/${moveid}`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}
