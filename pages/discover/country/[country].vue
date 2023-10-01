<template>
  <div class="discover genre padding-content">
    <!-- <FilterBar
      @dataFiltered="(data: any[], formSelect: formfilter) => setDataFiltered(data, formSelect)"
      v-model:loading="loading"
      :cancelFilter="cancelFilter"
    /> -->

    <Swiper
      class="filter-swiper countries"
      :modules="[SwiperFreeMode, SwiperNavigation]"
      :slidesPerGroup="5"
      :speed="500"
      :slides-per-view="'auto'"
      :space-between="10"
      :free-mode="true"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }"
      :initialSlide="
        countries.findIndex(
          (item1) => item1.short_name == route.params?.country
        )
      "
    >
      <SwiperSlide
        v-for="(item, index) in countries"
        :index="index"
        :key="item?.iso_639_1"
        :class="{
          active: item.short_name == route.params?.country,
        }"
      >
        <NuxtLink :to="`/discover/country/${item.short_name}`">
          {{ item?.name }}
        </NuxtLink>
      </SwiperSlide>
      <div class="swiper-button-prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5rem"
          height="3.5rem"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <div class="swiper-button-next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5rem"
          height="3.5rem"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </Swiper>

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
import { getCountryByShortName } from '~/services/country';
import { getMovieByCountry } from '~/services/discover';

import { FilterMovie } from '~/services/discover';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import FilterBar from '~/components/FilterBar/FilterBar.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingCircle from '~/components/LoadingCircle/LoadingCircle.vue';
import type { formfilter, country } from '@/types';

const route: any = useRoute();
const router = useRouter();
const store = useStore();
// const dataDiscover = ref<any[]>();
const countries = ref<country[]>(store.allCountries);
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
const countryRoute = computed<country>(() =>
  getCountryByShortName(route.params.country, store.allCountries)
);
const metaHead = ref<string>('Quốc gia: ' + countryRoute.value.name);
const internalInstance: any = getCurrentInstance();

useHead({
  title: () => 'Khám phá - Quốc gia: ' + countryRoute.value.name,
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: () => 'Khám phá - Quốc gia: ' + countryRoute.value.name,
  description: () => 'Khám phá phim mới cùng Phimhay247',
  ogTitle: () => 'Khám phá - Quốc gia: ' + countryRoute.value.name,
  ogType: 'video.movie',
  // ogUrl: () => window.location.href,
  ogDescription: () => 'Khám phá phim mới cùng Phimhay247',
  ogLocale: 'vi',
});

const getData = async () => {
  loading.value = true;

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
    await useAsyncData(
      `discover/country/all/${route.params.country}/${page.value}`,
      () => getMovieByCountry(route.params.country, '', page.value)
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
  `discover/country/all/${route.params.country}/${page.value}`,
  () => getMovieByCountry(route.params.country, '', page.value),
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
  refreshNuxtData(`discover/country/all/${route.params.country}/${page.value}`);
  metaHead.value = 'Quốc gia: ' + countryRoute.value.name;
};
</script>

<style lang="scss" src="../DiscoverPage.scss"></style>
