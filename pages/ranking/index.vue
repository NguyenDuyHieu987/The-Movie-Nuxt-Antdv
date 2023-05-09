<template>
  <div class="ranking-container">
    <a-layout>
      <a-layout-content>
        <h2 class="gradient-title-default">
          <strong>Trending</strong>
        </h2>

        <section class="movie-group vertical">
          <MovieCardVertical
            v-for="(item, index) in trendings"
            :index="index"
            :key="item.id"
            :item="item"
            :type="item?.media_type"
          />
        </section>
        <div class="control-page">
          <!-- <a-pagination
            v-if="trendings?.length"
            v-model:current="pageTrending"
            :total="totalPage"
            :showSizeChanger="false"
            @change="onChangePage"
          /> -->

          <el-pagination
            v-model:current-page="pageTrending"
            background
            layout="prev, pager, next, total"
            :total="totalPage"
            :pager-count="5"
            @current-change="onChangePage"
          />
          <!-- @current-change="onChangePage" -->
        </div>
      </a-layout-content>
      <RankSide />
    </a-layout>
  </div>
</template>

<script setup>
import MovieCardVertical from '@/components/MovieCardVertical/MovieCardVertical.vue';
import RankSide from '@/components/RankSide/RankSide.vue';
import { getTrending } from '@/services/MovieService';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const trendings = ref([]);
const pageTrending = ref(route?.query?.page ? route?.query?.page : 1);
const totalPage = ref(100);
const internalInstance = getCurrentInstance();

useHead({
  title: 'Phimhay247 - Xếp hạng',
  htmlAttrs: { lang: 'vi', amp: true },
});

onBeforeMount(async () => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  await useAsyncData(`trending/all/${pageTrending.value}`, () =>
    getTrending(pageTrending.value)
  )
    .then((movieRespone) => {
      trendings.value = movieRespone.data.value.data?.results;
      totalPage.value = movieRespone.data.value.data?.total_pages * 10;

      setTimeout(() => {
        internalInstance.appContext.config.globalProperties.$Progress.finish();
      }, 500);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});

watch(pageTrending, async () => {
  await useAsyncData(`trending/all/${pageTrending.value}`, () =>
    getTrending(pageTrending.value)
  )
    .then((movieRespone) => {
      trendings.value = movieRespone.data.value.data?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});

const onChangePage = (
  pageSelected
  // pageSize
) => {
  router.push({ query: { page: pageSelected } });
};
</script>

<style lang="scss" src="./RankingView.scss"></style>
