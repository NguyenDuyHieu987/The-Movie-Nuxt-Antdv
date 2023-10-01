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

    <div class="discover-head">
      <h2 class="gradient-title-default underline">
        <span>{{ metaHead }}</span>
      </h2>
    </div>

    <section class="discover-section">
      <div class="movie-group horizontal">
        <MovieCardHorizontal
          v-for="(item, index) in dataDiscover"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>

      <!-- <LoadingCircle v-else class="loading-page" /> -->
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
import { FilterTvSlug } from '~/services/TvSlug';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import FilterSection from '~/components/FilterSection/FilterSection.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingCircle from '~/components/LoadingCircle/LoadingCircle.vue';
import type { formfilter, typeTv } from '@/types';

const route: any = useRoute();
const router = useRouter();
const store = useStore();
// const dataDiscover = ref<any[]>();
const page = ref<number>(route.query?.page ? +route.query?.page : 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const isFilter = ref<boolean>(false);
const loading = ref<boolean>(false);
const formFilter = computed<formfilter>(() => {
  return {
    type: route.query.type || 'all',
    sortBy: route.query.sort_by || '',
    genre: route.query.genre || '',
    year: route.query.year || '',
    country: route.query.country || '',
    page: 1,
    limit: 20,
  };
});
const tvSlugRoute = computed<typeTv>(() => route.query.type);
const metaHead = ref<string>('Phim bộ: ' + tvSlugRoute.value);
const internalInstance: any = getCurrentInstance();

useHead({
  title: () => 'Khám phá - Phim bộ: ' + tvSlugRoute.value,
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: () => 'Khám phá - Phim bộ: ' + tvSlugRoute.value,
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá - Phim bộ: ' + tvSlugRoute.value,
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi',
});

const getData = async () => {
  loading.value = true;

  await useAsyncData(`tv/${tvSlugRoute.value}/${page.value}`, () =>
    FilterTvSlug(formFilter.value)
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
};

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  setTimeout(() => {
    internalInstance.appContext.config.globalProperties.$Progress.finish();
  }, 500);
});

const {
  data: dataDiscover,
  pending,
  refresh,
} = await useAsyncData(
  `tv/${tvSlugRoute.value}/${page.value}`,
  () => FilterTvSlug(formFilter.value),
  {
    transform: (data: any) => {
      totalPage.value = data?.total;
      pageSize.value = data?.page_size;
      loading.value = false;

      return data.results;
    },
  }
);

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
  if (isFilter.value) {
    formFilter.value['page'] = pageSelected;
    getData();
  } else {
    page.value = pageSelected;
    router.push({ query: { page: pageSelected } });
    getData();
  }
};

const cancelFilter = () => {
  refreshNuxtData(`tv/${tvSlugRoute.value}/${page.value}`);
  metaHead.value = 'Phim bộ: ' + tvSlugRoute.value;
};
</script>

<style lang="scss" src="../DiscoverMoviePage.scss"></style>
