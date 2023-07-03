import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { page } = getQuery(event);

  const response: any = await axios.get(
    `${config.apiGateway}/trending/all?page=${page}`
  );
  return response.data;
});
