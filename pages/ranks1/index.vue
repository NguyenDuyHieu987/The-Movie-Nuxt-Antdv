<template>
  <div class="ranks padding-content">
    <div class="ranks-container">
      <h2 class="ranks-title">
        <span>Bảng xếp hạng</span>
      </h2>

      <div class="rank-type">
        <div
          v-for="(item, index) in typeRankList"
          :key="index"
          :index="index"
          class="rank-type-item"
        >
          <span>{{ item.label }}</span>
        </div>
      </div>

      <section class="rank-list">{{ ranksPlay }}</section>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getRankPlay } from '~/services/ranks';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';

const router = useRouter();
const route = useRoute();
const ranksPlay = ref<any[]>([]);
const ranksSearch = ref<any[]>([]);
const pageTrending = ref<number>(+route?.query?.page || 1);
const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const typeRankList = ref<
  {
    value: string;
    label: string;
  }[]
>([
  { label: 'Xem nhiều nhât', value: 'hot-play' },
  { label: 'Tìm kiếm nhiều nhất', value: 'hot-search' },
  { label: 'Đánh giá cao nhất', value: 'high-rate' },
]);
const typeRank = computed<string | 'hot-play' | 'hot-search' | 'high-rate'>(
  () => route.query?.type
);
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Bảng xếp hạng',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Bảng xếp hạng',
  description: 'Trending, bảng xếp hạng',
  ogTitle: 'Bảng xếp hạng',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Trending, bảng xếp hạng',
  ogLocale: 'vi',
});

const getData = async () => {
  loading.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  await useAsyncData(`trending/all/${pageTrending.value}`, () =>
    getRankPlay('day', pageTrending.value)
  )
    .then((response) => {
      ranksPlay.value = response.data.value?.results;
      pageSize.value = response.data.value?.page_size;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });
};

loading.value = true;

const { data: rankingsCache, pending } = await useAsyncData(
  `cache/ranks/hot-play/${pageTrending.value}/10`,
  () => getRankPlay('day', pageTrending.value),
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

ranksPlay.value = rankingsCache.value.results;

pageSize.value = rankingsCache.value?.page_size;
loading.value = false;
</script>

<style lang="scss" src="./RankPage.scss"></style>
