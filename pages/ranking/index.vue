<template>
  <div class="ranking padding-content">
    <div class="ranking-container">
      <div class="ranking-body">
        <h2 class="gradient-title-default underline">
          <span>Trending</span>
        </h2>

        <section class="rank-list">
          <div v-if="!loading" class="movie-group vertical ranking">
            <MovieCardVertical
              v-for="(item, index) in rankings"
              :index="index"
              :key="item.id"
              :item="item"
              :type="item?.media_type"
            />
          </div>

          <LoadingCircle v-else class="loading-page" />
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
import RankSide from '~/components/RankSide/RankSide.server.vue';
import ControlPage from '~/components/ControlPage/ControlPage.vue';
import LoadingCircle from '~/components/LoadingCircle/LoadingCircle.vue';

const router = useRouter();
const route: any = useRoute();
// const rankings = ref<any[]>([]);
const pageTrending = ref<number>(route?.query?.page ? route?.query?.page : 1);
const totalPage = ref<number>(100);
const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Bảng xếp hạng - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Bảng xếp hạng - Phimhay247',
  description: 'Trending, bảng xếp hạng',
  ogTitle: 'Bảng xếp hạng - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Trending, bảng xếp hạng',
  ogLocale: 'vi',
});

const getData = async () => {
  loading.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  await useAsyncData(`trending/all/${pageTrending.value}`, () =>
    getTrending(pageTrending.value)
  )
    .then((response: any) => {
      rankings.value = response.data.value?.results;
      totalPage.value = response.data.value?.total;
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

// getData();

loading.value = true;

const { data: rankings, pending } = await useAsyncData(
  `cache/trending/all/${pageTrending.value}`,
  () => getTrending(pageTrending.value),
  {
    transform: (data: any) => {
      totalPage.value = data?.total;
      pageSize.value = data?.page_size;
      loading.value = false;

      return data.results;
    },
    server: false,
  }
);

const onChangePage = async (pageSelected: number) => {
  pageTrending.value = pageSelected;
  router.push({ query: { page: pageSelected } });

  await useAsyncData(`trending/all/${pageTrending.value}`, () =>
    getTrending(pageTrending.value)
  )
    .then((response: any) => {
      rankings.value = response.data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};
</script>

<style lang="scss" src="./RankingPage.scss"></style>
