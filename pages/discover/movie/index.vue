<template>
  <div class="discover padding-content">
    <FilterBar
      @dataFiltered="(data: any[], formSelect: formfilter) => setDataFiltered(data, formSelect)"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
    />

    <div class="discover-head">
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
import { DiscoverMovie } from '~/services/discover';
import { FilterMovie } from '~/services/discover';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import FilterBar from '~/components/FilterBar/FilterBar.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingCircle from '~/components/LoadingCircle/LoadingCircle.vue';
import type { formfilter, typeMovie } from '@/types';

const route: any = useRoute();
const router = useRouter();
const store = useStore();
// const dataDiscover = ref<any[]>();
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
const movieSlugRoute = computed<typeMovie>(() => route.query.type);
const metaHead = ref<string>('Phim lẻ: ' + movieSlugRoute.value);
const internalInstance: any = getCurrentInstance();

useHead({
  title: () => 'Khám phá - Phim lẻ: ' + movieSlugRoute.value,
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: () => 'Khám phá - Phim lẻ: ' + movieSlugRoute.value,
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá - Phim lẻ: ' + movieSlugRoute.value,
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi',
});

const getData = async () => {
  loading.value = true;

  await nextTick();

  if (isFilter.value) {
    await useAsyncData(`discover/${formFilter.value}}`, () =>
      FilterMovie(formFilter.value)
    )
      .then((movieResponse: any) => {
        dataDiscover.value = movieResponse.data.value?.results;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    await useAsyncData(`movie/${movieSlugRoute.value}/${page.value}`, () =>
      DiscoverMovie(movieSlugRoute.value, page.value)
    )
      .then((movieResponse: any) => {
        dataDiscover.value = movieResponse.data.value?.results;
        // totalPage.value = movieResponse.data.value?.total;
        // pageSize.value = movieResponse.data.value?.page_size;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  setTimeout(() => {
    internalInstance.appContext.config.globalProperties.$Progress.finish();
  }, 500);
});

// getData();

const { data: dataDiscover, pending } = await useAsyncData(
  `movie/${movieSlugRoute.value}/${page.value}`,
  () => DiscoverMovie(movieSlugRoute.value, page.value),
  {
    transform: (data: any) => {
      totalPage.value = data?.total;
      pageSize.value = data?.page_size;
      loading.value = false;
      return data.results;
    },
  }
);

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
  // getData();
  refreshNuxtData(`movie/${movieSlugRoute.value}/${page.value}`);
  metaHead.value = 'Phim lẻ: ' + movieSlugRoute.value;
};
</script>

<style lang="scss" src="../DiscoverMoviePage.scss"></style>
