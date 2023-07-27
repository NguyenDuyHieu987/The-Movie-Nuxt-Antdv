import { makeRequest } from './makeRequest';

export function ChangePassword(params: {
  oldPassword: string;
  newPassword: string;
}) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('old_password', params.oldPassword);
  bodyFormData.append('new_password', params.newPassword);

  return makeRequest(`/account/change-password`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function ChangeEmail(params: { newEmail: string }) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('new_email', params.newEmail);

  return makeRequest(`/account/change-email`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function ChangeFullname(params: { newFullname: string }) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('new_fullname', params.newFullname);

  return makeRequest(`/account/change-fullname`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}
