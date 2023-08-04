<template>
  <div class="search padding-content">
    <h2 class="gradient-title-default underline">
      <span
        >Kết quả tìm kiếm cho: {{ route.query.q?.replaceAll('+', ' ') }}
      </span>

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
    <section class="search-section" :class="{ collapsed: store.collapsed }">
      <div class="movie-group horizontal">
        <MovieCardHorizontal
          v-for="(item, index) in searchData"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>

      <a-result
        v-show="!searchData?.length && loading"
        status="404"
        title="Opps!"
        :sub-title="`Không có kêt quả nào khớp với từ
        khóa: ${searchQuery}.`"
      >
      </a-result>

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
import axios from 'axios';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
// import ControlPage from '~/components/ControlPage/ControlPage.vue';
import { getDaTaSearch } from '~/services/search';

const store: any = useStore();
const route: any = useRoute();
const searchData = ref<any>([]);
const searchDataMovie = ref<any[]>([]);
const searchDataTv = ref<any[]>([]);
const activeTabSearch = ref<string>('all');
const loading = ref<boolean>(false);
const page = ref<number>(1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const internalInstance: any = getCurrentInstance();
const searchQuery = computed<string>(() => route.query.q?.replaceAll('+', ' '));

useHead({
  title: 'Tìm kiếm: ' + searchQuery.value,
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Tìm kiếm: ' + searchQuery.value,
  description: 'Tìm kiếm phim hay vói Phimhay247',
  ogTitle: 'Tìm kiếm: ' + searchQuery.value,
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Tìm kiếm phim hay vói Phimhay247',
  ogLocale: 'vi',
});

const getData = async () => {
  await useAsyncData(`search/all/${searchQuery.value}/${page.value}`, () =>
    getDaTaSearch(searchQuery.value, page.value)
  )
    .then((response) => {
      searchData.value = response.data.value?.results;
      totalPage.value = response.data.value?.total;
      pageSize.value = response.data.value?.page_size;
      searchDataMovie.value = response.data.value?.movie;
      searchDataTv.value = response.data.value?.tv;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = true;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });
};

onBeforeMount(async () => {
  await nextTick();

  internalInstance.appContext.config.globalProperties.$Progress.start();
  getData();
});

watch(
  () => route.query?.q,
  () => {
    getData();
  }
);

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
  await useAsyncData(`search/all/${searchQuery.value}/${pageSelected}`, () =>
    getDaTaSearch(searchQuery.value, pageSelected)
  )
    .then((response: any) => {
      searchData.value = response.data.value?.results;
      searchDataMovie.value = response.data.value?.movie;
      searchDataTv.value = response.data.value?.tv;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};
</script>

<style lang="scss" src="./SearchPage.scss"></style>
