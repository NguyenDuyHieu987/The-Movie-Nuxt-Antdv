import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { API_CONTENT_SERVICE_URL } = useRuntimeConfig();
  const { page } = getQuery(event);

  const response = await axios.get(
    `${API_CONTENT_SERVICE_URL}/movie/popular?page=${page}&api=hieu987`
  );
  return response.data;
});
