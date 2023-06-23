import { makeRequest } from './makeRequest';

export function getCommentByMovidId(movieId: string) {
  return makeRequest(`/comment/${movieId}`);
}

export function getCommentByMovidId_ParentId(
  movieId: string,
  parentId: string
) {
  return makeRequest(`/comment/${movieId}/${parentId}`);
}

export function CommentMovie(params: any) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('content', params.content);
  params?.parentId && bodyFormData.append('parent_id', params.parentId);
  bodyFormData.append('type', params.commentType);

  return makeRequest(`/comment/${params.movieType}/${params.movieId}`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}
