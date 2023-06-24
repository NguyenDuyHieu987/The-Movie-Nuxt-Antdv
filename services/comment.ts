import { makeRequest } from './makeRequest';

export function getCommentByMovidId(movieId: string, movieType: string) {
  return makeRequest(`/comment/get-all/${movieType}/${movieId}`);
}

export function getCommentByMovidId_ParentId(
  movieId: string,
  parentId: string,
  movieType: string
) {
  return makeRequest(`/comment/get/${movieType}/${movieId}/${parentId}`);
}

export function CommentMovie(params: any) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('content', params.content);
  params?.parentId && bodyFormData.append('parent_id', params.parentId);
  bodyFormData.append('type', params.commentType);

  return makeRequest(`/comment/post/${params.movieType}/${params.movieId}`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function DeleteComment(params: any) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('id', params.id);
  params?.parentId && bodyFormData.append('parent_id', params.parentId);
  bodyFormData.append('type', params.commentType);

  return makeRequest(`/comment/delete/${params.movieType}/${params.movieId}`, {
    method: 'DELETE',
    headers: headers,
    data: bodyFormData,
  });
}
