import { makeRequest } from './makeRequest';

export function emailValidation(email: string) {
  return makeRequest(
    `https://emailvalidation.abstractapi.com/v1/?api_key=e23c5b9c07dc432796eea058c9d99e82&email=${email}`
  );
}

export function signIn(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);
  // bodyFormData.append('user_token', params.user_token);

  return makeRequest(`/auth/login`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function loginFacebook(params: any) {
  const headers = { Authorization: `Bearer ${params.accessToken}` };

  return makeRequest(`/auth/loginfacebook`, {
    method: 'POST',
    headers: headers,
  });
}

export function loginGoogle(params: any) {
  const headers = { Authorization: `Bearer ${params.accessToken}` };

  return makeRequest(`/auth/logingoogle`, {
    method: 'POST',
    headers: headers,
  });
}

export function getUserToken(params: any) {
  // bodyFormData.append('user_token', params.user_token);
  const headers = { Authorization: `Bearer ${params.user_token}` };

  return makeRequest(`/auth/getusertoken`, {
    // method: 'POST',
    headers: headers,
  });
}

export function verifyEmail(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', params.id);
  bodyFormData.append('username', params.username);
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);
  bodyFormData.append('full_name', params.full_name);
  bodyFormData.append('avatar', params.avatar);
  // bodyFormData.append('user_token', params.user_token);

  return makeRequest(`/auth/verify/email`, {
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
//   // bodyFormData.append('user_token', params.user_token);

//   return  axios.post(`/auth/signup`, bodyFormData);
// };

export function signUp(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  // bodyFormData.append('user_token', params.user_token);
  const headers = { Authorization: `Bearer ${params.user_token}` };

  return makeRequest(`/auth/signup`, {
    method: 'POST',
    headers: headers,
    data: bodyFormData,
  });
}
