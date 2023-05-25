import ALLGENRES from '../constants/Genres';
// import LANGUAGES from '../constants/Languages';
import COUNTRIES from '../constants/Country';
import axios from 'axios';
import { getWithExpiry } from '@/utils/localStorage.ts';

// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
// const TMDB_IMAGE_BASE_URL = TMDB_IMAGE_BASE_URL;
// const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch';

// const URL_API = API_CONTENT_SERVICE_URL;
const URL_API = 'http://127.0.0.1:5000';
// const URL_API = 'https://api.phimhay247.site';

// const URL_API_IMAGE = API_IMAGE_SERVICE_URL;
const URL_API_IMAGE = 'http://127.0.0.1:5001';
// const URL_API_IMAGE = 'https://img.api.phimhay247.site';

function emailValidation(email) {
  return axios.get(
    `https://emailvalidation.abstractapi.com/v1/?api_key=e23c5b9c07dc432796eea058c9d99e82&email=${email}`
  );
}

const signIn = async (params) => {
  const bodyFormData = new FormData();
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);
  // bodyFormData.append('user_token', params.user_token);

  return await axios.post(`${URL_API}/auth/login?api=hieu987`, bodyFormData);
};

const loginFacebook = async (params) => {
  const bodyFormData = new FormData();

  const headers = { Authorization: `Bearer ${params.accessToken}` };

  return await axios.post(
    `${URL_API}/auth/loginfacebook?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const loginGoogle = async (params) => {
  const bodyFormData = new FormData();
  const headers = { Authorization: `Bearer ${params.accessToken}` };

  return await axios.post(
    `${URL_API}/auth/logingoogle?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const getUserToken = async (params) => {
  const bodyFormData = new FormData();
  // bodyFormData.append('user_token', params.user_token);
  const headers = { Authorization: `Bearer ${params.user_token}` };

  return await axios.post(
    `${URL_API}/auth/getusertoken?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const verifyEmail = async (params) => {
  const bodyFormData = new FormData();
  bodyFormData.append('id', params.id);
  bodyFormData.append('username', params.username);
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);
  bodyFormData.append('full_name', params.full_name);
  bodyFormData.append('avatar', params.avatar);
  // bodyFormData.append('user_token', params.user_token);

  return await axios.post(
    `${URL_API}/auth/verify/email?api=hieu987`,
    bodyFormData
  );
};

// const signUp = async (params) => {
//   const bodyFormData = new FormData();
//   bodyFormData.append('id', params.id);
//   bodyFormData.append('username', params.username);
//   bodyFormData.append('email', params.email);
//   bodyFormData.append('password', params.password);
//   bodyFormData.append('full_name', params.full_name);
//   bodyFormData.append('avatar', params.avatar);
//   // bodyFormData.append('user_token', params.user_token);

//   return await axios.post(`${URL_API}/auth/signup?api=hieu987`, bodyFormData);
// };

const signUp = async (params) => {
  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  // bodyFormData.append('user_token', params.user_token);
  const headers = { Authorization: `Bearer ${params.user_token}` };

  return await axios.post(`${URL_API}/auth/signup?api=hieu987`, bodyFormData, {
    headers: headers,
  });
};

const getTrending = async (page) =>
  await axios.get(`${URL_API}/trending/all?page=${page}&api=hieu987`);

const getNowPlaying = async (page) =>
  await axios.get(`${URL_API}/movie/nowplaying?page=${page}&api=hieu987`);

const getUpComing = async (page) =>
  await axios.get(`${URL_API}/movie/upcoming?page=${page}&api=hieu987`);

const getPopular = async (page) =>
  await axios.get(`${URL_API}/movie/popular?page=${page}&api=hieu987`);

const getTopRated = async (page) =>
  await axios.get(`${URL_API}/movie/toprated?page=${page}&api=hieu987`);

const getTvAiringToday = async (page) =>
  await axios.get(`${URL_API}/tv/airingtoday?page=${page}&api=hieu987`);

const getTvOntheAir = async (page) =>
  await axios.get(`${URL_API}/tv/ontheair?page=${page}&api=hieu987`);

const getTvPopular = async (page) =>
  await axios.get(`${URL_API}/tv/popular?page=${page}&api=hieu987`);

const getTvTopRated = async (page) =>
  await axios.get(`${URL_API}/tv/toprated?page=${page}&api=hieu987`);

const getDaTaSearch = async (text, page) =>
  await axios.get(
    `${URL_API}/search/multi?query=${text}&page=${page}&api=hieu987`
  );

const getMoviesByGenres = async (genre_id, page, sort_by = '') => {
  const genre = getGenresNameByShortName(genre_id, ALLGENRES);

  // const genreStr = !genres_name.includes('&')
  //   ? `${genresName.id},${genresName.name}`
  //   : `${genresName.id},${genresName.name.replace('&', '%26')}`;

  // const genreStr = genre != '' ? genre.id : '';

  return await axios.get(
    `${URL_API}/discover/all?api=hieu987${
      sort_by.length != 0 ? '&sort_by=' + sort_by : ''
    }&with_genres=${genre.id}&page=${page}`
  );
};

const getRanking = async (page) => {
  return await axios.get(
    `${URL_API}/discover/all?api=hieu987&sort_by=views_desc&page=${page}`
  );
};

const getMoviesByYear = async (year, page) => {
  const str = /^\d+$/.test(year)
    ? `${URL_API}/discover/all?api=hieu987&primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}`
    : `${URL_API}/discover/all?api=hieu987&primary_release_date_lte=${year.slice(
        -4
      )}-01-01&page=${page}`;
  return await axios.get(str);
};

const getMovieByCountry = async (country_name, page) => {
  const country = getCountry(country_name);

  return await axios.get(
    `${URL_API}/discover/all?api=hieu987&with_original_language=${country.iso_639_1}&page=${page}`
  );
};

const getMoviesByYearBeFore2000 = async (year, page) =>
  await axios.get(
    `${URL_API}/discover/all?api=hieu987&primary_release_date_lte=${year}-01-01&page=${page}`
  );

const getMovieByCredit = async (movieId) =>
  await axios.get(
    `${URL_API}/movie/detail/${movieId}?api=hieu987&append_to_response=credits`
  );

const getTvByCredit = async (movieId) =>
  await axios.get(
    `${URL_API}/tv/detail/${movieId}?api=hieu987&append_to_response=credits`
  );

const getMovieByRecommend = async (type, movieId, page) =>
  await axios.get(
    `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=recommendations&page=${page}`
  );

const getSimilar = async (type, movieId) =>
  await axios.get(`${URL_API}/similar/${type}/${movieId}?api=hieu987`);

const getMyRecommend = async (skip = 1) => {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.get(
    `${URL_API}/recommend/getrecommend?skip=${skip}&api=hieu987`,
    {
      headers: headers,
    }
  );
};

const getList = async (skip = 0) => {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.get(`${URL_API}/list/getlist?skip=${skip}&api=hieu987`, {
    headers: headers,
  });
};

const searchList = async (query) => {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.get(
    `${URL_API}/list/searchlist?query=${query}&api=hieu987`,
    { headers: headers }
  );
};

const getItemList = async (movieId) => {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.get(`${URL_API}/list/getitem/${movieId}?api=hieu987`, {
    headers: headers,
  });
};

const getHistory = async (skip = 0) => {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.get(
    `${URL_API}/history/gethistory?skip=${skip}&api=hieu987`,
    { headers: headers }
  );
};
const searchHistory = async (query) => {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.get(
    `${URL_API}/history/searchhistory?query=${query}&api=hieu987`,
    { headers: headers }
  );
};

const getItemHistory = async (movieId) => {
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.get(`${URL_API}/history/getitem/${movieId}?api=hieu987`, {
    headers: headers,
  });
};

const getTheMostVoteCount = async (page) =>
  await axios.get(
    `${URL_API}/discover/all?api=hieu987&sort_by=popularity_desc&page=${page}`
  );

const FilterDataMovie = async (formSelect) => {
  const yearLte = formSelect.year + '-12-30';
  const yearGte =
    formSelect.year != ''
      ? /^\d+$/.test(formSelect.year)
        ? formSelect.year + '-01-01'
        : formSelect.year.slice(-4) + '-01-01'
      : '';

  // const genresName = await getIdGenresByName(formSelect.genre);

  // const genreStr =
  //   formSelect.genre !== ''
  //     ? !formSelect.genre.includes('&')
  //       ? `${genresName.id},${genresName.name}`
  //       : `${genresName.id},${genresName.name.replace('&', '%26')}`
  //     : '';

  const genreStr =
    formSelect.genre !== ''
      ? /^\d+$/.test(formSelect.genre)
        ? formSelect.genre
        : await getIdGenresByName(formSelect.genre)?.id
      : '';

  return /^\d+$/.test(formSelect.year)
    ? await axios.get(
        `${URL_API}/discover/${formSelect.type}?sort_by=${formSelect.sortBy}&primary_release_date_gte=${yearGte}&primary_release_date_lte=${yearLte}&with_genres=${genreStr}&with_original_language=${formSelect.country}&page=${formSelect.pageFilter}&api=hieu987`
      )
    : await axios.get(
        `${URL_API}/discover/${formSelect.type}?sort_by=${formSelect.sortBy}&primary_release_date_lte=${yearGte}&with_genres=${genreStr}&with_original_language=${formSelect.country}&page=${formSelect.pageFilter}&api=hieu987`
      );
};

const getMovies = async (page) =>
  await axios.get(`${URL_API}/movie/phimle?api=hieu987&page=${page}`);

const getTv = async (page) =>
  await axios.get(`${URL_API}/tv/phimbo?api=hieu987&page=${page}`);

const getMovieById = async (movieId, append_to_response = '') => {
  if (getWithExpiry('userAccount')?.user_token) {
    const headers = {
      Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
    };

    return await axios.get(
      `${URL_API}/movie/detail/${movieId}?append_to_response=${append_to_response}&api=hieu987`,
      {
        headers: headers,
      }
    );
  } else {
    return await axios.get(
      `${URL_API}/movie/detail/${movieId}?append_to_response=${append_to_response}&api=hieu987`
    );
  }
};

const UpdateViewMovie = async (movieId) =>
  await axios.post(`${URL_API}/movie/updateview/${movieId}?api=hieu987`);

const getTvById = async (movieId, append_to_response = '') => {
  if (getWithExpiry('userAccount')?.user_token) {
    const headers = {
      Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
    };

    return await axios.get(
      `${URL_API}/tv/detail/${movieId}?append_to_response=${append_to_response}&api=hieu987`,
      {
        headers: headers,
      }
    );
  } else {
    return await axios.get(
      `${URL_API}/tv/detail/${movieId}?append_to_response=${append_to_response}&api=hieu987`
    );
  }
};

const UpdateViewTV = async (movieId) =>
  await axios.post(`${URL_API}/tv/updateview/${movieId}?api=hieu987`);

const getSeasonTV = async (movieid, season) =>
  await axios.get(`${URL_API}/tv/${movieid}/season/${season}?api=hieu987`);

const addItemList = async (params) => {
  const bodyFormData = new FormData();
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('media_id', params.media_id);
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.post(
    `${URL_API}/list/add_item?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const removeItemList = async (params) => {
  const bodyFormData = new FormData();
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('media_id', params.media_id);
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.post(
    `${URL_API}/list/remove_item?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const removeAllItemList = async () => {
  const bodyFormData = new FormData();
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.post(
    `${URL_API}/list/removeall_item?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const add_update_History = async (params) => {
  const bodyFormData = new FormData();
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('media_id', params.media_id);
  bodyFormData.append('duration', params.duration);
  bodyFormData.append('percent', params.percent);
  bodyFormData.append('seconds', params.seconds);
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.post(
    `${URL_API}/history/add_item?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const removeItemHistory = async (params) => {
  const bodyFormData = new FormData();
  bodyFormData.append('media_type', params.media_type);
  bodyFormData.append('media_id', params.media_id);
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.post(
    `${URL_API}/history/remove_item?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const removeAllItemHistory = async () => {
  const bodyFormData = new FormData();
  const headers = {
    Authorization: `Bearer ${getWithExpiry('userAccount')?.user_token}`,
  };

  return await axios.post(
    `${URL_API}/history/removeall_item?api=hieu987`,
    bodyFormData,
    {
      headers: headers,
    }
  );
};

const ratingMovie = async (moveid, { value }) => {
  const bodyFormData = new FormData();
  bodyFormData.append('value', value);

  return await axios.post(
    `${URL_API}/rating/movie/${moveid}?api=hieu987`,
    bodyFormData
  );
};

const ratingTV = async (moveid, { value }) => {
  const bodyFormData = new FormData();
  bodyFormData.append('value', value);

  return await axios.post(
    `${URL_API}/rating/tv/${moveid}?api=hieu987`,
    bodyFormData
  );
};

const getAllSortBy = async () =>
  await axios.get(`${URL_API}/sortby/all?api=hieu987`);

const getAllGenre = async () =>
  await axios.get(`${URL_API}/genre/all?api=hieu987`);

const getAllYear = async () =>
  await axios.get(`${URL_API}/year/all?api=hieu987`);

const getAllNational = async () =>
  await axios.get(`${URL_API}/country/all?api=hieu987`);

const getAllCountry = () => {
  var countryList = [];

  COUNTRIES?.map((item) => {
    countryList.push(item);
  });
  return countryList;
};

const getIdGenresByName = async (genres_name) =>
  ALLGENRES.find((gen) => (gen.name === genres_name ? gen : null));

// {
//   const genres = await getAllGenre().then((res) => {
//     return res.data;
//   });
//   return genres.find((gen) => (gen.name === genres_name ? gen : null));
// };

// const getGenresNameById = (genreId:number) =>
//   ALLGENRES.find((gen) => (gen.id === genreId ? gen : null));

const getAllGenresById = (genres, allGenres) => {
  var genresArray = [];
  // const allGenres = await getAllGenre().then((res) => {
  //   return res.data;
  // });

  genres?.map((item) => {
    allGenres.find((gen) => {
      if (gen.id === (item?.id ? item.id : item)) {
        genresArray.push(gen?.name_vietsub);
      }
    });
  });

  return genresArray;
};
const getGenresNameById = (genresName, allGenres) =>
  allGenres.find((gen) => {
    if (gen.short_name === genresName) {
      return gen;
    }
  });

const getGenresNameByShortName = (genresName, allGenres) => {
  if (allGenres.length != 0) {
    return allGenres.find((gen) => {
      if (gen.short_name === genresName) {
        return gen;
      }
    });
  } else {
    return ALLGENRES.find((gen) => {
      if (gen.short_name === genresName) {
        return gen;
      }
    });
  }
};

const getCountry = (original_language) =>
  COUNTRIES.find((country) => country.short_name === original_language);

// const getCountry = async (country_name) => {
//   const county = await axios
//     .get(`${URL_API}/country/${country_name}?api=hieu987`)
//     .then((res) => {
//       return res.data;
//     });
//   return county;
// };

const getCountryVietSub = (original_language, allCountries) =>
  allCountries.find((country) => country.name === original_language);

const getLanguage = (original_language, allCountries) =>
  allCountries.find((language) => language.iso_639_1 === original_language);

// const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;
const getPosterCast = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getPoster = (path, size = 'full') => {
  return path === null || path === undefined
    ? ''
    : `${URL_API_IMAGE}/image/poster/${path}?size=${size}`;
};

const getBackdrop = (path, size = 'full') => {
  return path === null || path === undefined
    ? ''
    : `${URL_API_IMAGE}/image/backdrop/${path}?size=${size}`;
};

const getColorImage = async (path) =>
  await axios.get(
    path === null || path === undefined
      ? ''
      : `${URL_API_IMAGE}/imagecolor/backdrop/${path}?api=hieu987`
  );

const getAvatar = (path) => {
  return path === null || path === undefined
    ? ''
    : `${URL_API_IMAGE}/image/account/${path}?api=hieu987`;
};

export {
  emailValidation,
  getPoster,
  getBackdrop,
  getColorImage,
  getIdGenresByName,
  getAllGenresById,
  getGenresNameById,
  getGenresNameByShortName,
  getTrending,
  getNowPlaying,
  getUpComing,
  getPopular,
  getTopRated,
  getTvAiringToday,
  getTvOntheAir,
  getTvPopular,
  getTvTopRated,
  getLanguage,
  getDaTaSearch,
  getMovieById,
  UpdateViewMovie,
  getMoviesByGenres,
  getMoviesByYear,
  getMoviesByYearBeFore2000,
  getMovieByCredit,
  getTvByCredit,
  getSimilar,
  getMovieByRecommend,
  getAllCountry,
  getMovieByCountry,
  getCountry,
  getCountryVietSub,
  getTheMostVoteCount,
  getList,
  getHistory,
  searchList,
  searchHistory,
  getItemList,
  getItemHistory,
  FilterDataMovie,
  getTv,
  getTvById,
  UpdateViewTV,
  getSeasonTV,
  getAllSortBy,
  getAllGenre,
  getAllNational,
  getAllYear,
  addItemList,
  removeItemList,
  removeAllItemList,
  add_update_History,
  removeItemHistory,
  removeAllItemHistory,
  getPosterCast,
  getMovies,
  ratingMovie,
  ratingTV,
  signUp,
  verifyEmail,
  signIn,
  loginFacebook,
  loginGoogle,
  getUserToken,
  getAvatar,
  getRanking,
  getMyRecommend,
};
