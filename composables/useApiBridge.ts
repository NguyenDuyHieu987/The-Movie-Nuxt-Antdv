import axios from 'axios';

export default function useApiBridge() {
  return {
    getTrending: async (page: number = 1, limit: number = 20) =>
      await axios.get(
        `http://127.0.0.1:5000/trending/all?page=${page}&limit=${limit}`
      ),
  };
}
