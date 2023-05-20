<template>
  <div class="search-container">
    <h2 class="gradient-title-default underline">
      <strong
        >Kết quả tìm kiếm cho: {{ route.query.q?.replaceAll('+', ' ') }}</strong
      >

      <a-select
        ref="select"
        v-model="activeTabSearch"
        style="width: 170px"
        @change="handleChangeType"
        placeholder="Sắp xếp theo"
        v-show="searchData?.length"
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
      <div class="movie-group horizoltal">
        <MovieCardHorizontal
          v-for="(item, index) in searchData"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>

      <ControlPage
        v-show="searchData?.length"
        :page="page"
        :total="100"
        :onChangePage="onChangePage"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import MovieCardHorizontal from '@/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import ControlPage from '@/components/ControlPage/ControlPage.vue';
import { getDaTaSearch } from '@/services/MovieService';
import axios from 'axios';

const store: any = useStore();
const route: any = useRoute();
const searchData = ref<any>([]);
const searchDataMovie = ref<any[]>([]);
const searchDataTv = ref<any[]>([]);
const activeTabSearch = ref<string>('all');
const page = ref<number>(1);
const internalInstance: any = getCurrentInstance();

onBeforeMount(async () => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  await useAsyncData(
    `search/all/${route.query?.q.replaceAll('+', ' ')}/${page.value}`,
    () => getDaTaSearch(route.query?.q.replaceAll('+', ' '), page.value)
  )
    .then((searchMovieResponse: any) => {
      searchData.value = searchMovieResponse.data.value.data?.results;
      searchDataMovie.value = searchMovieResponse.data.value.data?.movie;
      searchDataTv.value = searchMovieResponse.data.value.data?.tv;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    })
    .catch((e) => {
      internalInstance.appContext.config.globalProperties.$Progress.finish();
      if (axios.isCancel(e)) return;
    });
});

watch(route, async () => {
  await useAsyncData(
    `search/all/${route.query?.q.replaceAll('+', ' ')}/${page.value}`,
    () => getDaTaSearch(route.query?.q.replaceAll('+', ' '), page.value)
  )
    .then((searchMovieResponse: any) => {
      searchData.value = searchMovieResponse.data.value.data?.results;
      searchDataMovie.value = searchMovieResponse.data.value.data?.movie;
      searchDataTv.value = searchMovieResponse.data.value.data?.tv;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
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
      searchData.value = searchMovieResponse.data.value.data?.results;
      searchDataMovie.value = searchMovieResponse.data.value.data?.movie;
      searchDataTv.value = searchMovieResponse.data.value.data?.tv;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};
</script>

<style lang="scss" src="./SearchPage.scss"></style>