import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { API_CONTENT_SERVICE_URL } = useRuntimeConfig();
  const { page } = getQuery(event);

  const response: any = await axios.get(
    `${API_CONTENT_SERVICE_URL}/movie/upcoming?page=${page}&api=hieu987`
  );
  return response.data;
});
