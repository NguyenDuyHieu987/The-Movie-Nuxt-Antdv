<template>
  <div class="discover padding-content">
    <FilterSection
      :listFilter="[
        { name: 'Tất cả', value: 'all' },
        { name: 'Airing Today', value: 'airingtoday' },
        { name: 'Ontheair', value: 'ontheair' },
        { name: 'Popular', value: 'popular' },
        { name: 'Toprated', value: 'toprated' },
      ]"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
      @onFilter="handleFilter"
    />

    <div class="discover-title">
      <h2 class="gradient-title-default underline">
        <span>Phim bộ: {{ formFilter.type }}</span>
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
import { FilterTvSlug } from '~/services/TvSlug';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import MovieCardVertical from '~/components/MovieCardVertical/MovieCardVertical.vue';
import FilterSection from '~/components/FilterSection/FilterSection.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';
import type { formfilter, typeTv } from '@/types';

const route: any = useRoute();
const router = useRouter();
const store = useStore();
const dataDiscover = ref<any[]>();
const page = ref<number>(+route.query?.page || 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const formFilter = computed<formfilter>(() => {
  return {
    type: route.query.type || 'all',
    sortBy: route.query.sort_by || '',
    genre: route.query.genre || '',
    year: route.query.year || '',
    country: route.query.country || '',
    page: route.query.page || 1,
    limit: 20,
  };
});
const internalInstance: any = getCurrentInstance();

useHead({
  title: () => 'Khám phá | Phim bộ: ' + formFilter.value.type + ' - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: () => 'Khám phá | Phim bộ: ' + formFilter.value.type + ' - Phimhay247',
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () =>
    'Khám phá | Phim bộ: ' + formFilter.value.type + ' - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi',
});

const getData = async () => {
  // loading.value = true;

  await useAsyncData(`tv/discover/${formFilter.value}`, () =>
    FilterTvSlug(formFilter.value)
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
};

loading.value = true;

const {
  data: dataDiscoverCache,
  pending,
  refresh,
} = await useAsyncData(
  `cache/tv/discover/${formFilter.value}`,
  () => FilterTvSlug(formFilter.value),
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
  refreshNuxtData(`tv/${formFilter.value.type}`);
};
</script>

<style lang="scss" src="../DiscoverPage.scss"></style>
