import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  // withCredentials: true,
});

export function makeRequest(url: string, options: any) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? 'Error')
    );
}
