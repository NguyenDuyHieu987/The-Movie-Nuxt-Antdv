import { makeRequest } from './makeRequest';

export function AccountConfirm(params: any, type: string) {
  const bodyFormData = new FormData();

  switch (type) {
    case 'change-password':
      bodyFormData.append('old_password', params.oldPassword);
      bodyFormData.append('new_password', params.newPassword);
      bodyFormData.append('logout_all_device', params.logOutAllDevice);
      break;
    case 'email':
      break;
    case 'change-email':
      break;
  }

  return makeRequest(`/account/confirm/${type}`, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true,
  });
}

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
    // headers: headers,
    data: bodyFormData,
    getResponseHeaders: true,
  });
}

export function VerifyEmail(params: { otp: string; jwtVerifyEmail: string }) {
  const headers = {
    Authorization: `Bearer ${params.jwtVerifyEmail}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  return makeRequest(`/account/verify-email`, {
    method: 'POST',
    // headers: headers,
    data: bodyFormData,
  });
}

export function ChangeEmail(params: any) {
  const headers = {
    Authorization: `Bearer ${params.jwtVerifyEmail}`,
  };

  const bodyFormData = new FormData();
  bodyFormData.append('new_email', params.newEmail);

  return makeRequest(`/account/change-email`, {
    method: 'POST',
    // headers: headers,
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
    // headers: headers,
    data: bodyFormData,
  });
}
