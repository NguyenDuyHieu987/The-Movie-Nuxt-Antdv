<template>
  <div class="discover-container">
    <FilterBar
      @dataFiltered="(data: any[], formSelect: formFilter) => setDataFiltered(data, formSelect)"
      :cancelFilter="cancelFilter"
    />

    <div class="discover-head">
      <h2 class="gradient-title-default underline">
        <strong>{{ metaHead }}</strong>
      </h2>
    </div>
    <section
      class="discover-section"
      :class="{ collapsed: store.$state.collapsed }"
    >
      <div class="movie-group horizontal">
        <MovieCardHorizontal
          v-for="(item, index) in dataDiscover"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>
    </section>

    <ControlPage
      v-show="dataDiscover?.length"
      :page="page"
      :total="totalPage"
      :pageSize="pageSize"
      :onChangePage="onChangePage"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
  getMovies,
  getTv,
  FilterDataMovie,
  getMoviesByGenres,
  getMoviesByYear,
  getMovieByCountry,
  getCountry,
  getNowPlaying,
  getUpComing,
  getPopular,
  getTopRated,
  getTvAiringToday,
  getTvOntheAir,
  getTvPopular,
  getTvTopRated,
  getGenresNameByShortName,
} from '~/services/appMovieService';
import MovieCardHorizontal from '@/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import FilterBar from '@/components/FilterBar/FilterBar.vue';
import ControlPage from '@/components/ControlPage/ControlPage.vue';
import type { formFilter } from '@/types';

const route: any = useRoute();
const router = useRouter();
const store: any = useStore();
const dataDiscover = ref<any[]>();
const page = ref<number>(route.query?.page ? +route.query?.page : 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const isFilter = ref<boolean>(false);
const loading = ref<boolean>(false);
const formFilterSelect = ref<formFilter | any>({});
const metaHead = ref<string>('');
const internalInstance: any = getCurrentInstance();

const getData = async () => {
  if (isFilter.value) {
    await useAsyncData(`discover/all/${formFilterSelect.value}}`, () =>
      FilterDataMovie(formFilterSelect.value)
    )
      .then((movieResponse: any) => {
        dataDiscover.value = movieResponse.data.value.data?.results;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  } else {
    switch (route.params?.slug) {
      case 'movie':
        if (route.params?.slug2) {
          switch (route.params?.slug2) {
            case 'all':
              metaHead.value = 'Phim lẻ: Tất cả';

              await useAsyncData(`movie/all/${page.value}`, () =>
                getMovies(page.value)
              )
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
                .then((movieResponse: any) => {
                  dataDiscover.value = movieResponse.data.value.data?.results;
                  totalPage.value = movieResponse.data.value.data?.total;
                  pageSize.value = movieResponse.data.value.data?.page_size;
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
          .then((movieResponse: any) => {
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
          .then((movieResponse: any) => {
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
          .then((movieResponse: any) => {
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
  // loading.value = true;
  // internalInstance.appContext.config.globalProperties.$Progress.start();
  // getData();
  // useHead({
  //   title: '`Phimhay247 - ' + metaHead.value,
  //   htmlAttrs: { lang: 'vi'},
  // });
  // loading.value = false;
  // internalInstance.appContext.config.globalProperties.$Progress.finish();
});

onBeforeMount(() => {
  isFilter.value = false;
  loading.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  getData();

  loading.value = false;
  internalInstance.appContext.config.globalProperties.$Progress.finish();

  useHead({
    title: 'Khám phá - ' + metaHead.value + ' | Phimhay247',
    htmlAttrs: { lang: 'vi' },
  });

  useSeoMeta({
    title: 'Khám phá - ' + metaHead.value + ' | Phimhay247',
    description: 'Khám phá phim mới cùng Phimhay247',
    ogTitle: 'Khám phá - ' + metaHead.value + ' | Phimhay247',
    ogType: 'video.movie',
    ogUrl: window.location.href,
    ogDescription: 'Khám phá phim mới cùng Phimhay247',
    ogLocale: 'vi',
  });
});

const onChangePage = (
  pageSelected: number
  // pageSize
) => {
  if (isFilter.value) {
    formFilterSelect.value['pageFilter'] = pageSelected;
    getData();
  } else {
    page.value = pageSelected;
    router.push({ query: { page: pageSelected } });
    getData();
  }
};

const setDataFiltered = (data: any[], formSelect: formFilter) => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  dataDiscover.value = data;
  formFilterSelect.value = formSelect;
  isFilter.value = true;
  page.value = formSelect.pageFilter;
  metaHead.value = 'Danh sách phim đã lọc';

  loading.value = false;
  internalInstance.appContext.config.globalProperties.$Progress.finish();
};

const cancelFilter = () => {
  isFilter.value = false;
  getData();
};
</script>

<style scoped lang="scss" src="../DiscoverMovieView.scss"></style>
