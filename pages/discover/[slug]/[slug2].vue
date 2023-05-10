<template>
  <div class="discover-container">
    <FilterBar
      @dataFiltered="(data, formSelect) => setDataFiltered(data, formSelect)"
      @cancelFilter="cancelFilter"
    />

    <h2 class="gradient-title-default">
      <strong>{{ metaHead }}</strong>

      <!-- <el-radio-group
        class="tabs-search"
        v-model="activeTabSearch"
        @change="handleChangeType"
        v-if="$route.params?.slug == 'search'"
      >
        <el-radio-button size="large" label="all" border
          >Tất cả</el-radio-button
        >
        <el-radio-button size="large" label="movie" border
          >Phim lẻ</el-radio-button
        >
        <el-radio-button size="large" label="tv" border
          >Phim bộ</el-radio-button
        >
      </el-radio-group> -->

      <a-radio-group
        class="tabs-search"
        v-model:value="activeTabSearch"
        @change="handleChangeType"
        v-if="$route.params?.slug == 'search'"
        button-style="solid"
      >
        <a-radio-button value="all"> Tất cả</a-radio-button>
        <a-radio-button value="movie">Phim lẻ </a-radio-button>
        <a-radio-button value="tv">Phim bộ</a-radio-button>
      </a-radio-group>
    </h2>
    <section
      class="movie-discovered"
      :class="{ collapse: store.$state.collapsed }"
    >
      <MovieCardHorizontal
        v-for="(item, index) in dataDiscover"
        :index="index"
        :key="item.id"
        :item="item"
        :type="
          isFilter
            ? undefined
            : $route.params.slug == 'movie' && $route.params.slug2 != 'all'
            ? 'movie'
            : $route.params.slug == 'tv' && $route.params.slug2 != 'all'
            ? 'tv'
            : undefined
        "
      />
    </section>

    <div class="control-page">
      <!-- <a-pagination
        v-model:current="page"
        :total="totalPage"
        :show-total="(total) => `Tổng ${total}`"
        :showSizeChanger="false"
        @change="onChangePage"
      /> -->

      <el-pagination
        v-model:current-page="page"
        background
        layout="prev, pager, next, total"
        :total="totalPage"
        :pager-count="5"
        @current-change="onChangePage"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {
  getMovies,
  getTv,
  FilterDataMovie,
  getMoviesByGenres,
  getMoviesByYear,
  getMovieByCountry,
  getCountry,
  getDaTaSearch,
  getNowPlaying,
  getUpComing,
  getPopular,
  getTopRated,
  getTvAiringToday,
  getTvOntheAir,
  getTvPopular,
  getTvTopRated,
  getGenresNameByShortName,
} from '@/services/MovieService';
import MovieCardHorizontal from '@/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import FilterBar from '@/components/FilterBar/FilterBar.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const dataDiscover = ref([]);
const dataMovie = ref([]);
const dataTv = ref([]);
const page = ref(route.query?.page ? +route.query?.page : 1);
const totalPage = ref(100);
const isFilter = ref(false);
const loading = ref(false);
const formFilterSelect = ref({});
const activeTabSearch = ref('all');
const metaHead = ref('');
const internalInstance = getCurrentInstance();

// const getMetahead = () => {
//   switch (route.params?.slug) {
//     case 'search':
//       metaHead.value = 'Kết quả tìm kiếm cho: ' + route.params?.slug2;
//       break;
//     case 'movie':
//       if (route.params?.slug2) {
//         switch (route.params?.slug2) {
//           case 'all':
//             metaHead.value = 'Phim lẻ: Tất cả';
//             break;

//           case 'nowplaying':
//             metaHead.value = 'Phim lẻ: Now playing';
//             break;

//           case 'popular':
//             metaHead.value = 'Phim lẻ: Phổ biến';
//             break;
//           case 'toprated':
//             metaHead.value = 'Phim lẻ: Top đánh giá';
//             break;
//           case 'upcoming':
//             metaHead.value = 'Phim lẻ: Sắp công chiéu';
//         }
//       }
//       break;
//     case 'tv':
//       if (route.params?.slug2) {
//         switch (route.params?.slug2) {
//           case 'all':
//             metaHead.value = 'Phim bộ: Tất cả';
//             break;
//           case 'airingtoday':
//             metaHead.value = 'Phim bộ: Airing today';
//             break;
//           case 'ontheair':
//             metaHead.value = 'Phim bộ: On the air';
//             break;
//           case 'tvpopular':
//             metaHead.value = 'Phim bộ: Phổ biến';
//             break;
//           case 'tvtoprated':
//             metaHead.value = 'Phim bộ: Top đánh giá';
//         }
//       }
//       break;
//     case 'genres':
//       metaHead.value =
//         'Thể loại: ' +
//         getGenresNameByShortName(
//           route.params?.slug2,
//           store.state?.allGenres
//         )?.name_vietsub;

//       break;
//     case 'years':
//       metaHead.value = /^\d+$/.test(route.params?.slug2)
//         ? 'Năm ' + route.params?.slug2
//         : 'Trước năm ' + route.params?.slug2?.slice(-4);

//       break;
//     case 'countries':
//       metaHead.value =
//         'Quốc gia: ' +
//         store.state.allCountries.find(
//           (country) => country.short_name === route.params?.slug2
//         )?.name;

//       break;
//     default:
//       break;
//   }
// };

const getData = async () => {
  if (isFilter.value) {
    await useAsyncData(`search/all/${formFilterSelect.value}}`, () =>
      FilterDataMovie(formFilterSelect.value)
    )
      .then((movieResponse) => {
        dataDiscover.value = movieResponse.data.value.data?.results;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  } else {
    switch (route.params?.slug) {
      case 'search':
        metaHead.value = 'Kết quả tìm kiếm cho: ' + route.params?.slug2;

        await useAsyncData(
          `search/all/${route.params?.slug2.replaceAll('+', ' ')}/${
            page.value
          }`,
          () =>
            getDaTaSearch(route.params?.slug2.replaceAll('+', ' '), page.value)
        )
          .then((searchMovieResponse) => {
            dataDiscover.value = searchMovieResponse.data.value.data?.results;
            dataMovie.value = searchMovieResponse.data.value.data?.movie;
            dataTv.value = searchMovieResponse.data.value.data?.tv;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        break;
      case 'movie':
        if (route.params?.slug2) {
          switch (route.params?.slug2) {
            case 'all':
              metaHead.value = 'Phim lẻ: Tất cả';

              await useAsyncData(`movie/all/${page.value}`, () =>
                getMovies(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
            case 'nowplaying':
              metaHead.value = 'Phim lẻ: Now playing';

              await useAsyncData(`movie/nowplaying/${page.value}`, () =>
                getNowPlaying(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
            case 'popular':
              metaHead.value = 'Phim lẻ: Phổ biến';

              await useAsyncData(`movie/popular/${page.value}`, () =>
                getPopular(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
            case 'toprated':
              metaHead.value = 'Phim lẻ: Top đánh giá';

              await useAsyncData(`movie/toprated${page.value}`, () =>
                getTopRated(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
            case 'upcoming':
              metaHead.value = 'Phim lẻ: Sắp công chiéu';

              await useAsyncData(`movie/upcoming/${page.value}`, () =>
                getUpComing(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
          }
        }
        break;
      case 'tv':
        if (route.params?.slug2) {
          switch (route.params?.slug2) {
            case 'all':
              metaHead.value = 'Phim bộ: Tất cả';

              await useAsyncData(`tv/all/${page.value}`, () =>
                getTv(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });

              break;

            case 'airingtoday':
              metaHead.value = 'Phim bộ: Airing today';

              await useAsyncData(`tv/airingtoday/${page.value}`, () =>
                getTvAiringToday(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
            case 'ontheair':
              metaHead.value = 'Phim bộ: On the air';

              await useAsyncData(`tv/ontheair/${page.value}`, () =>
                getTvOntheAir(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
            case 'tvpopular':
              metaHead.value = 'Phim bộ: Phổ biến';

              await useAsyncData(`tv/popular/${page.value}`, () =>
                getTvPopular(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
            case 'tvtoprated':
              metaHead.value = 'Phim bộ: Top đánh giá';

              await useAsyncData(`tv/toprated/${page.value}`, () =>
                getTvTopRated(page.value)
              )
                .then((movieResponse) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value =
                    movieResponse.data.value.data.total_pages * 10;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                });
              break;
          }
        }
        break;
      case 'genres':
        await useAsyncData(`genres/${route.params?.slug2}/${page.value}`, () =>
          getMoviesByGenres(route.params?.slug2, page.value)
        )
          .then((movieResponse) => {
            dataDiscover.value = movieResponse.data.value.data?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        metaHead.value =
          'Thể loại: ' +
          getGenresNameByShortName(route.params?.slug2, store.$state?.allGenres)
            ?.name_vietsub;

        break;
      case 'years':
        await useAsyncData(`years/${route.params?.slug2}/${page.value}`, () =>
          getMoviesByYear(route.params?.slug2, page.value)
        )
          .then((movieResponse) => {
            dataDiscover.value = movieResponse.data.value.data?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        metaHead.value = /^\d+$/.test(route.params?.slug2)
          ? 'Năm ' + route.params?.slug2
          : 'Trước năm ' + route.params?.slug2?.slice(-4);

        break;
      case 'countries':
        await useAsyncData(
          `countries/${route.params?.slug2}/${page.value}`,
          () => getMovieByCountry(route.params?.slug2, page.value)
        )
          .then((movieResponse) => {
            dataDiscover.value = movieResponse.data.value.data?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        metaHead.value = 'Quốc gia: ' + getCountry(route.params?.slug2)?.name;

        break;
      default:
        navigateTo('/404');
        break;
    }
  }
};

watch(route, () => {
  // isFilter.value = false;
  // getData();
  // document.title = `Phimhay247 - ${metaHead.value}`;
});

router.beforeEach((to, from) => {
  if (from.params.slug != to.params.slug) {
    // getMetahead();
  }
});

onMounted(() => {
  isFilter.value = false;
  loading.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  getData();

  setTimeout(() => {
    loading.value = false;
    internalInstance.appContext.config.globalProperties.$Progress.finish();
  }, 3000);

  // document.title = `Phimhay247 - ${metaHead.value}`;
  useHead({
    title: '`Phimhay247 - ' + metaHead.value,
    htmlAttrs: { lang: 'vi', amp: true },
  });
});

const onChangePage = (
  pageSelected
  // pageSize
) => {
  if (isFilter.value) {
    formFilterSelect.value['pageFilter'] = pageSelected;
    getData();
  } else {
    router.push({ query: { page: pageSelected } });
  }
};

const setDataFiltered = (data, formSelect) => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  dataDiscover.value = data;
  formFilterSelect.value = formSelect;
  isFilter.value = true;
  page.value = formSelect.pageFilter;
  metaHead.value = 'Danh sách phim đã lọc';

  setTimeout(() => {
    loading.value = false;
    internalInstance.appContext.config.globalProperties.$Progress.finish();
  }, 3000);
};

const cancelFilter = () => {
  isFilter.value = false;
  getData();
};

const handleChangeType = (activeKey) => {
  switch (activeKey?.target?.value ? activeKey?.target?.value : activeKey) {
    case 'all':
      dataDiscover.value = dataMovie.value.concat(dataTv.value);
      break;
    case 'movie':
      dataDiscover.value = dataMovie.value;
      break;
    case 'tv':
      dataDiscover.value = dataTv.value;
      break;
  }
};
</script>

<style scoped lang="scss" src="../DiscoverMovieView.scss"></style>
