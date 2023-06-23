import { makeRequest } from './makeRequest';

export function getTvById(
  movieId: number | string,
  append_to_response: string = ''
) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return makeRequest(
    `/tv/detail/${movieId}?append_to_response=${append_to_response}`,
    getWithExpiry('userAccount')?.user_token && {
      headers: headers,
    }
  );
}

export function UpdateViewTv(movieId: number | string) {
  return makeRequest(`/tv/updateview/${movieId}`, {
    method: 'POST',
  });
}

export function getSeasonTV(movieid: number | string, season: number | string) {
  return makeRequest(`/tv/${movieid}/season/${season}`);
}
