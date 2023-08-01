import { makeRequest } from './makeRequest';

export function getMovieById(
  movieId: number | string,
  append_to_response: string = ''
) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('user_account')?.user_token}`,
  };

  return makeRequest(
    `/movie/detail/${movieId}?append_to_response=${append_to_response}`,
    getWithExpiry('user_account')?.user_token && {
      headers: headers,
    }
  );
}

export function UpdateViewMovie(movieId: number | string) {
  return makeRequest(`/movie/updateview/${movieId}`, {
    method: 'POST',
  });
}
