import { makeRequest, makeRequestWithHeaders } from './makeRequest';

export function LogIn(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);

  return makeRequestWithHeaders(`/auth/login`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function loginFacebook(params: any) {
  const headers = { Authorization: `Bearer ${params.accessToken}` };

  return makeRequestWithHeaders(`/auth/loginfacebook`, {
    method: 'POST',
    headers: headers,
  });
}

export function loginGoogle(params: any) {
  const headers = { Authorization: `Bearer ${params.accessToken}` };

  return makeRequestWithHeaders(`/auth/logingoogle`, {
    method: 'POST',
    headers: headers,
  });
}

export function getUserToken(params: any) {
  const headers = { Authorization: `Bearer ${params.user_token}` };

  return makeRequest(`/auth/getusertoken`, {
    // method: 'POST',
    headers: headers,
  });
}

export function forgotPassword(params: any, type: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('email', params.email);

  return makeRequest(`auth/forgot-password/${type}`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function verifySignUp(params: any, type: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', params.id);
  bodyFormData.append('username', params.username);
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);
  bodyFormData.append('full_name', params.full_name);
  bodyFormData.append('avatar', params.avatar);

  return makeRequestWithHeaders(`auth/verify-signup/${type}`, {
    method: 'POST',
    data: bodyFormData,
  });
}

// const signUp = async (params) {
//   const bodyFormData = new FormData();
//   bodyFormData.append('id', params.id);
//   bodyFormData.append('username', params.username);
//   bodyFormData.append('email', params.email);
//   bodyFormData.append('password', params.password);
//   bodyFormData.append('full_name', params.full_name);
//   bodyFormData.append('avatar', params.avatar);

//   return  axios.post(`/auth/signup`, bodyFormData);
// };

export function signUp(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  const headers = { Authorization: `Bearer ${params.user_token}` };

  return makeRequest(`/auth/signup`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}

export function LogOut(params: any) {
  const headers = { Authorization: `Bearer ${params.user_token}` };

  return makeRequest(`/auth/logout`, {
    method: 'POST',
    headers: headers,
  });
}
