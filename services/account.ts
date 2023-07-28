import { makeRequest } from './makeRequest';

export function ChangePassword(params: {
  otp: string;
  jwtVerifyEmail: string;
}) {
  const headers = {
    Authorization: `Bearer ${params.jwtVerifyEmail}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  return makeRequest(`/account/change-password`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function ChangeEmail(params: { otp: string; jwtVerifyEmail: string }) {
  const headers = {
    Authorization: `Bearer ${params.jwtVerifyEmail}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('new_email', params.otp);

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

export function verifyEmail(params: any, type: string) {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };
  const bodyFormData = new FormData();

  switch (type) {
    case 'change-password':
      bodyFormData.append('old_password', params.oldPassword);
      bodyFormData.append('new_password', params.newPassword);
      break;
    case 'change-email':
      break;
  }

  return makeRequest(`/account/verify/email/${type}`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}
