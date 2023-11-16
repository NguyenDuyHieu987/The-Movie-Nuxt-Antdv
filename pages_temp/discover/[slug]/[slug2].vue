<template>
  <div class="discover padding-content">
    <FilterBar
      @dataFiltered="(data: any[], formSelect: formfilter) => setDataFiltered(data, formSelect)"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
    />

    <div class="discover-title">
      <h2 class="gradient-title-default underline">
        <span>{{ metaHead }}</span>
      </h2>
    </div>

    <section class="discover-section">
      <div v-if="!loading" class="movie-group horizontal">
        <MovieCardHorizontal
          v-for="(item, index) in dataDiscover"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>

      <LoadingCircle v-else class="loading-page" />
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
import { getCountryByShortName } from '~/services/country';
import { getGenreByShortName } from '~/services/genres';
import {
  getMoviesByGenres,
  getMoviesByYear,
  getMovieByCountry,
} from '~/services/discover';
import {
  getMovies,
  getNowPlaying,
  getUpComing,
  getPopular,
  getTopRated,
} from '~/services/movieSlug';
import {
  getTvs,
  getTvAiringToday,
  getTvOntheAir,
  getTvPopular,
  getTvTopRated,
} from '~/services/TvSlug';
import { FilterMovie } from '~/services/discover';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import FilterBar from '~/components/FilterBar/FilterBar.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingCircle from '~/components/LoadingCircle/LoadingCircle.vue';
import type { formfilter } from '@/types';

const route: any = useRoute();
const router = useRouter();
const store = useStore();
const dataDiscover = ref<any[]>();
const page = ref<number>(route.query?.page ? +route.query?.page : 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const isFilter = ref<boolean>(false);
const loading = ref<boolean>(false);
const formFilter = ref<formfilter>({
  type: 'all',
  sortBy: '',
  genre: '',
  year: '',
  country: '',
  page: 1,
});
const metaHead = ref<string>('');
const internalInstance: any = getCurrentInstance();

const getData = async () => {
  loading.value = true;

  await nextTick();

  if (isFilter.value) {
    await useAsyncData(`discover/${formFilter.value}}`, () =>
      FilterMovie(formFilter.value)
    )
      .then((response) => {
        dataDiscover.value = response.data.value?.results;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loading.value = false;
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
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
            case 'nowplaying':
              metaHead.value = 'Phim lẻ: Now playing';

              await useAsyncData(`movie/nowplaying/${page.value}`, () =>
                getNowPlaying(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
            case 'popular':
              metaHead.value = 'Phim lẻ: Phổ biến';

              await useAsyncData(`movie/popular/${page.value}`, () =>
                getPopular(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
            case 'toprated':
              metaHead.value = 'Phim lẻ: Top đánh giá';

              await useAsyncData(`movie/toprated${page.value}`, () =>
                getTopRated(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
            case 'upcoming':
              metaHead.value = 'Phim lẻ: Sắp công chiéu';

              await useAsyncData(`movie/upcoming/${page.value}`, () =>
                getUpComing(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
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
                getTvs(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;

            case 'airingtoday':
              metaHead.value = 'Phim bộ: Airing today';

              await useAsyncData(`tv/airingtoday/${page.value}`, () =>
                getTvAiringToday(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
            case 'ontheair':
              metaHead.value = 'Phim bộ: On the air';

              await useAsyncData(`tv/ontheair/${page.value}`, () =>
                getTvOntheAir(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
            case 'popular':
              metaHead.value = 'Phim bộ: Phổ biến';

              await useAsyncData(`tv/popular/${page.value}`, () =>
                getTvPopular(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
            case 'toprated':
              metaHead.value = 'Phim bộ: Top đánh giá';

              await useAsyncData(`tv/toprated/${page.value}`, () =>
                getTvTopRated(page.value)
              )
                .then((response) => {
                  dataDiscover.value = response.data.value?.results;
                  totalPage.value = response.data.value?.total;
                  pageSize.value = response.data.value?.page_size;
                })
                .catch((e) => {
                  if (axios.isCancel(e)) return;
                })
                .finally(() => {
                  loading.value = false;
                });
              break;
          }
        }
        break;
      case 'genre':
        await useAsyncData(`genre/${route.params?.slug2}/${page.value}`, () =>
          getMoviesByGenres(route.params?.slug2, '', page.value)
        )
          .then((response) => {
            dataDiscover.value = response.data.value?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            loading.value = false;
          });

        metaHead.value =
          'Thể loại: ' +
          getGenreByShortName(route.params?.slug2, store?.allGenres)
            ?.name_vietsub;

        break;
      case 'year':
        await useAsyncData(`year/${route.params?.slug2}/${page.value}`, () =>
          getMoviesByYear(route.params?.slug2, '', page.value)
        )
          .then((response) => {
            dataDiscover.value = response.data.value?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            loading.value = false;
          });

        metaHead.value = /^\d+$/.test(route.params?.slug2)
          ? 'Năm ' + route.params?.slug2
          : 'Trước năm ' + route.params?.slug2?.slice(-4);

        break;
      case 'country':
        await useAsyncData(`country/${route.params?.slug2}/${page.value}`, () =>
          getMovieByCountry(route.params?.slug2, '', page.value)
        )
          .then((response) => {
            dataDiscover.value = response.data.value?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            loading.value = false;
          });

        metaHead.value =
          'Quốc gia: ' +
          getCountryByShortName(route.params?.slug2, store.allCountries)?.name;

        break;
      default:
        navigateTo('/404');
        break;
    }
  }
};

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  setTimeout(() => {
    internalInstance.appContext.config.globalProperties.$Progress.finish();
  }, 500);
});

isFilter.value = false;

getData();

useHead({
  title: () => 'Khám phá - ' + metaHead.value,
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: () => 'Khám phá - ' + metaHead.value,
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá - ' + metaHead.value,
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi',
});

const onChangePage = (
  pageSelected: number
  // pageSize
) => {
  if (isFilter.value) {
    formFilter.value['page'] = pageSelected;
    getData();
  } else {
    page.value = pageSelected;
    router.push({ query: { page: pageSelected } });
    getData();
  }
};

const setDataFiltered = (data: any[], formSelect: formfilter) => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  dataDiscover.value = data;
  formFilter.value = formSelect;
  isFilter.value = true;
  page.value = formSelect.page!;
  metaHead.value = 'Danh sách phim đã lọc';

  internalInstance.appContext.config.globalProperties.$Progress.finish();
};

const cancelFilter = () => {
  isFilter.value = false;
  getData();
};
</script>

<style lang="scss" src="../DiscoverPage.scss"></style>
