import { makeRequest } from './makeRequest';

export function LogIn(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);

  return makeRequest(`/auth/login`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function loginFacebook(params: any) {
  return makeRequest(`/auth/loginfacebook`, {
    method: 'POST',
  });
}

export function loginGoogle(params: any) {
  return makeRequest(`/auth/logingoogle`, {
    method: 'POST',
  });
}

export function getUserToken(params: any) {
  return makeRequest(`/auth/getusertoken`, {
    // method: 'POST',
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

  return makeRequest(`auth/verify-signup/${type}`, {
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

  return makeRequest(`/auth/signup`, {
    method: 'POST',
    data: bodyFormData,
  });
}

export function LogOut(params: any) {
  return makeRequest(`/auth/logout`, {
    method: 'POST',
  });
}
