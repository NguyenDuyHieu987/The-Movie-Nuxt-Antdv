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

export function ChangeFullname(params: { jwtVerifyFullname: string }) {
  const headers = {
    Authorization: `Bearer ${params.jwtVerifyFullname}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('new_fullname', params.jwtVerifyFullname);

  return makeRequest(`/account/change-fullname`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function accountVerify(params: any, type: string) {
  const bodyFormData = new FormData();

  switch (type) {
    case 'change-password':
      bodyFormData.append('old_password', params.oldPassword);
      bodyFormData.append('new_password', params.newPassword);
      break;
    case 'email':
      break;
  }

  return makeRequest(`/account/verify/${type}`, {
    method: 'POST',
    data: bodyFormData,
  });
}
