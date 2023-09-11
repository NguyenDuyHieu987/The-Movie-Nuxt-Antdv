<template>
  <div class="ranking padding-content">
    <div class="ranking-container">
      <div class="ranking-body">
        <h2 class="gradient-title-default underline">
          <span>Trending</span>
        </h2>

        <section class="movie-group vertical ranking">
          <MovieCardVertical
            v-for="(item, index) in rankings"
            :index="index"
            :key="item.id"
            :item="item"
            :type="item?.media_type"
          />
        </section>

        <ControlPage
          v-show="rankings?.length"
          :page="pageTrending"
          :total="totalPage"
          :pageSize="pageSize"
          :onChangePage="onChangePage"
        />
      </div>
      <RankSide />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getTrending } from '~/services/trending';
import MovieCardVertical from '~/components/MovieCardVertical/MovieCardVertical.vue';
import RankSide from '~/components/RankSide/RankSide.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';

const router = useRouter();
const route: any = useRoute();
// const rankings = ref<any[]>([]);
const pageTrending = ref<number>(route?.query?.page ? route?.query?.page : 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Bảng xếp hạng - Trending - Top phim ngày, tháng, năm',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Bảng xếp hạng - Trending - Top phim ngày, tháng, năm',

  description: 'Phim hay, Trending, bảng xếp hạng xem phim trên Phimhay247',
  ogTitle: 'Bảng xếp hạng - Trending - Top phim ngày, tháng, năm',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Phim hay, Trending, bảng xếp hạng xem phim trên Phimhay247',
  ogLocale: 'vi',
});

const getData = async () => {
  await nextTick();

  internalInstance.appContext.config.globalProperties.$Progress.start();

  // const { data: trendingsCache } = useNuxtData(
  //   `trending/all/${pageTrending.value}`
  // );

  await useAsyncData(
    `trending/all/${pageTrending.value}`,
    () => getTrending(pageTrending.value),
    {
      // lazy: true,
      // immediate: false,
      // default: () => {
      //   return trendingsCache.value;
      // },
    }
  )
    .then((movieRespone: any) => {
      rankings.value = movieRespone.data.value?.results;
      totalPage.value = movieRespone.data.value?.total;
      pageSize.value = movieRespone.data.value?.page_size;
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
});

// getData();

const { data: rankings } = await useAsyncData(
  `trending/all/${pageTrending.value}`,
  () => getTrending(pageTrending.value),
  {
    transform: (data: any) => {
      totalPage.value = data?.total;
      pageSize.value = data?.page_size;
      return data.results;
    },
  }
);

internalInstance.appContext.config.globalProperties.$Progress.finish();

watch(pageTrending, async () => {
  await useAsyncData(`trending/all/${pageTrending.value}`, () =>
    getTrending(pageTrending.value)
  )
    .then((movieRespone: any) => {
      rankings.value = movieRespone.data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});

const onChangePage = (pageSelected: number) => {
  pageTrending.value = pageSelected;
  router.push({ query: { page: pageSelected } });
};
</script>

<style lang="scss" src="./RankingPage.scss"></style>
