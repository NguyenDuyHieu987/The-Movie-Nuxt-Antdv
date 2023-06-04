<template>
  <div class="search-container">
    <h2 class="gradient-title-default underline">
      <strong
        >Kết quả tìm kiếm cho: {{ route.query.q?.replaceAll('+', ' ') }}</strong
      >

      <a-select
        ref="select"
        v-model:value="activeTabSearch"
        style="width: 170px"
        @change="handleChangeType"
        placeholder=""
        v-show="
          searchData?.length || searchDataMovie?.length || searchDataTv?.length
        "
      >
        <a-select-option value="all" label="Tất cả">Tất cả</a-select-option>
        <a-select-option value="movie" label="Phim lẻ">Phim lẻ</a-select-option>
        <a-select-option value="tv" label="Phim bộ">Phim bộ</a-select-option>
      </a-select>
    </h2>
    <section
      class="search-section"
      :class="{ collapsed: store.$state.collapsed }"
    >
      <div class="movie-group horizontal">
        <MovieCardHorizontal
          v-for="(item, index) in searchData"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>

      <!-- <ControlPage
        v-show="searchData?.length"
        :page="page"
        :total="totalPage"
        :pageSize="pageSize"
        :onChangePage="onChangePage"
      /> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import MovieCardHorizontal from '@/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import ControlPage from '@/components/ControlPage/ControlPage.vue';
import { getDaTaSearch } from '~/services/search';
import axios from 'axios';

const store: any = useStore();
const route: any = useRoute();
const searchData = ref<any>([]);
const searchDataMovie = ref<any[]>([]);
const searchDataTv = ref<any[]>([]);
const activeTabSearch = ref<string>('all');
const page = ref<number>(1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const internalInstance: any = getCurrentInstance();

const getData = async () => {
  useHead({
    title: 'Tìm kiếm: ' + route.query?.q.replaceAll('+', ' ') + ' | Phimhay247',
    htmlAttrs: { lang: 'vi' },
  });

  useSeoMeta({
    title: 'Tìm kiếm: ' + route.query?.q.replaceAll('+', ' ') + ' | Phimhay247',
    description: 'Tìm kiếm phim hay vói Phimhay247',
    ogTitle:
      'Tìm kiếm: ' + route.query?.q.replaceAll('+', ' ') + ' | Phimhay247',
    ogType: 'video.movie',
    // ogUrl: window.location.href,
    ogDescription: 'Tìm kiếm phim hay vói Phimhay247',
    ogLocale: 'vi',
  });

  await useAsyncData(
    `search/all/${route.query?.q.replaceAll('+', ' ')}/${page.value}`,
    () => getDaTaSearch(route.query?.q.replaceAll('+', ' '), page.value)
  )
    .then((searchMovieResponse: any) => {
      searchData.value = searchMovieResponse.data.value?.results;
      totalPage.value = searchMovieResponse.data.value?.total;
      pageSize.value = searchMovieResponse.data.value?.page_size;
      searchDataMovie.value = searchMovieResponse.data.value?.movie;
      searchDataTv.value = searchMovieResponse.data.value?.tv;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });
};

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  getData();
});

watch(route, () => {
  getData();
});

const handleChangeType = (activeKey: any) => {
  switch (activeKey?.target?.value ? activeKey?.target?.value : activeKey) {
    case 'all':
      searchData.value = searchDataMovie.value.concat(searchDataTv.value);
      break;
    case 'movie':
      searchData.value = searchDataMovie.value;
      break;
    case 'tv':
      searchData.value = searchDataTv.value;
      break;
  }
};

const onChangePage = async (pageSelected: number) => {
  page.value = pageSelected;
  await useAsyncData(
    `search/all/${route.query?.q.replaceAll('+', ' ')}/${pageSelected}`,
    () => getDaTaSearch(route.query?.q.replaceAll('+', ' '), pageSelected)
  )
    .then((searchMovieResponse: any) => {
      searchData.value = searchMovieResponse.data.value?.results;
      searchDataMovie.value = searchMovieResponse.data.value?.movie;
      searchDataTv.value = searchMovieResponse.data.value?.tv;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};
</script>

<style lang="scss" src="./SearchPage.scss"></style>
