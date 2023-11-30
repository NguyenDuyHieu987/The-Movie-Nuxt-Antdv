<template>
  <div class="discover padding-content">
    <FilterSection
      :listFilter="[
        { name: 'Tất cả', value: 'all' },
        { name: 'Phim lẻ', value: 'movie' },
        { name: 'Phim bộ', value: 'tv' },
      ]"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
      @onFilter="handleFilter"
    />

    <div class="discover-title">
      <h2 class="gradient-title-default underline">
        <span>Khám phá</span>
      </h2>
    </div>

    <section class="discover-section">
      <div v-if="!loading" class="movie-group vertical">
        <MovieCardVertical
          v-for="(item, index) in dataDiscover"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>

      <LoadingSpinner v-else class="loading-page" />
    </section>

    <ControlPage
      :page="page"
      :total="totalPage"
      :pageSize="pageSize"
      :onChangePage="onChangePage"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { FilterMovie } from '~/services/discover';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import MovieCardVertical from '~/components/MovieCardVertical/MovieCardVertical.vue';
import FilterSection from '~/components/FilterSection/FilterSection.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';
import type { formfilter, typeMovie } from '@/types';

const route = useRoute();
const router = useRouter();
const store = useStore();
const dataDiscover = ref<any[]>();
const page = ref<number>(+route.query?.page || 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const formFilter = computed<formfilter>(() => {
  return {
    type: route.query?.type || 'all',
    sortBy: route.query?.sort_by || '',
    genre: route.query?.genre || '',
    year: route.query?.year || '',
    country: route.query?.country || '',
    page: route.query?.page || 1,
    limit: 20,
  };
});

useHead({
  title: () => 'Khám phá',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: () => 'Khám phá',
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi',
});

const getData = async () => {
  // loading.value = true;

  await useAsyncData(`discover/${formFilter.value}`, () =>
    FilterMovie(formFilter.value)
  )
    .then((movieResponse) => {
      dataDiscover.value = movieResponse.data.value?.results;
      totalPage.value = movieResponse.data.value?.total;
      pageSize.value = movieResponse.data.value?.page_size;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
};

loading.value = true;

const {
  data: dataDiscoverCache,
  pending,
  refresh,
} = await useAsyncData(
  `cache/discover/${formFilter.value}`,
  () => FilterMovie(formFilter.value),
  {
    // transform: (data: any) => {
    //   totalPage.value = data?.total;
    //   pageSize.value = data?.page_size;
    //   loading.value = false;
    //   return data.results;
    // },
    // server: false,
  }
);

loading.value = false;
dataDiscover.value = dataDiscoverCache.value.results;

totalPage.value = dataDiscoverCache.value?.total;
pageSize.value = dataDiscoverCache.value?.page_size;

watch(
  formFilter,
  () => {
    getData();
  },
  { deep: true }
);

const handleFilter = () => {
  getData();
};

const onChangePage = (
  pageSelected: number
  // pageSize
) => {
  page.value = pageSelected;
  formFilter.value.page = pageSelected;
  router.push({ query: { ...route.query, page: pageSelected } });
  // getData();
};

const cancelFilter = () => {
  refreshNuxtData(`discover/${formFilter.value}`);
};
</script>

<style lang="scss" src="./DiscoverPage.scss"></style>
