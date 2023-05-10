<template>
  <div class="home-container">
    <SlideTopicHome :trendings="trendings" />
    <div class="outstanding-stage">
      <h2 class="gradient-title-default" v-show="nowPlayings?.length">
        <strong>Phim nổi bật</strong>
        <NuxtLink
          :to="{
            path: `/discover/movie/nowplaying`,
          }"
          style="font-size: 1.8rem"
        >
          <strong class="view-all">Xem tất cả</strong>
        </NuxtLink>
      </h2>
      <carousel
        v-if="nowPlayings?.length"
        class="carousel-group"
        :items="4"
        :autoplay="true"
        :dots="false"
        :autoplayHoverPause="true"
        :autoplayTimeout="5000"
        :margin="7"
        :autoplaySpeed="500"
        :navText="[btnPrev, btnNext]"
        :responsive="{
          0: {
            items: 2,
          },
          590: {
            items: 2,
          },
          750: {
            items: 2,
          },
          830: {
            items: 3,
          },
          1150: {
            items: 4,
          },
          1500: {
            items: 5,
          },
          1800: {
            items: 6,
          },
          2050: {
            items: 7,
          },
          2200: {
            items: 8,
          },
        }"
      >
        <MovieCardHorizontal
          v-for="(item, index) in nowPlayings"
          :item="item"
          :index="index"
          :key="item.id"
          type="movie"
        />
      </carousel>
    </div>

    <div
      class="recommend-stage"
      v-if="store.$state?.isLogin"
      v-show="recommends?.length"
    >
      <h2 class="gradient-title-default">
        <strong>Gợi ý cho bạn</strong>
      </h2>

      <section
        class="movie-group horizontal"
        :class="{ viewmore: viewMoreRecommend }"
      >
        <MovieCardHorizontal
          v-for="(item, index) in recommends"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
        <el-button
          class="loadmore-btn"
          type="primary"
          :loading="loadMoreRecommend"
          @click="handleLoadMoreRecommend"
        >
          <template #icon>
            <i class="fa-light fa-plus"></i>
          </template>
          {{ loadMoreRecommend ? 'Đang tải...' : 'Tải thêm' }}
        </el-button>
      </section>

      <div
        class="viewmore-group"
        @click="viewMoreRecommend = !viewMoreRecommend"
      >
        <ClientOnly>
          <el-tooltip
            :teleported="false"
            :content="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
            placement="bottom"
          >
            <i v-if="!viewMoreRecommend" class="fa-light fa-chevron-down"></i>
            <i v-else class="fa-light fa-chevron-up"></i>
          </el-tooltip>
        </ClientOnly>
      </div>
    </div>

    <div class="tv-stage" v-show="tvAiringTodays?.length">
      <h2 class="gradient-title-default">
        <strong>Phim bộ mới</strong>
        <NuxtLink
          :to="{
            path: `/discover/tv/airingtoday`,
          }"
          style="font-size: 1.8rem"
        >
          <strong class="view-all">Xem tất cả</strong>
        </NuxtLink>
      </h2>

      <section class="movie-group vertical">
        <MovieCardVertical
          v-for="(item, index) in tvAiringTodays"
          :index="index"
          :key="item.id"
          :item="item"
          type="tv"
        />
      </section>
    </div>

    <div class="trailer-stage" v-show="upComings?.length">
      <h2 class="gradient-title-default">
        <strong>Trailer</strong>

        <NuxtLink
          :to="{
            path: `/discover/movie/upcoming`,
          }"
          style="font-size: 1.8rem"
        >
          <strong class="view-all">Xem tất cả</strong>
        </NuxtLink>
      </h2>

      <section class="movie-group horizontal trailer">
        <MovieCardHorizontalTrailer
          v-for="(item, index) in upComings"
          :index="index"
          :key="item.id"
          :item="item"
          type="movie"
        />
      </section>
    </div>

    <div class="theater-stage">
      <h2 class="gradient-title-default" v-show="topRateds?.length">
        <strong>Phim chiếu rạp mới</strong>
        <NuxtLink
          :to="{
            path: `/discover/movie/toprated`,
          }"
          style="font-size: 1.8rem"
        >
          <strong class="view-all">Xem tất cả</strong>
        </NuxtLink>
      </h2>
      <carousel
        v-if="topRateds?.length"
        :items="4"
        :autoplay="true"
        :dots="false"
        :autoplayHoverPause="true"
        :autoplayTimeout="5000"
        :margin="7"
        :autoplaySpeed="500"
        :navText="[btnPrev, btnNext]"
        :responsive="{
          0: {
            items: 2,
          },
          500: {
            items: 2,
          },
          520: {
            items: 3,
          },
          700: {
            items: 4,
          },
          800: {
            items: 3,
          },
          900: {
            items: 4,
          },
          1000: {
            items: 4,
          },
          1150: {
            items: 5,
          },
          1300: {
            items: 6,
          },
          1400: {
            items: 6,
          },
          1550: {
            items: 7,
          },
          1700: {
            items: 8,
          },
          1900: {
            items: 9,
          },
          2000: {
            items: 10,
          },
          2200: {
            items: 11,
          },
        }"
      >
        <MovieCardVertical
          v-for="(item, index) in topRateds"
          :item="item"
          :index="index"
          :key="item.id"
          type="movie"
        />
      </carousel>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import axios from 'axios';
// import carousel from 'vue-owl-carousel/src/Carousel';
import SlideTopicHome from '@/components/SlideTopicHome/SlideTopicHome.vue';
import MovieCardHorizontal from '@/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import MovieCardVertical from '@/components/MovieCardVertical/MovieCardVertical.vue';
import MovieCardHorizontalTrailer from '@/components/MovieCardHorizontalTrailer/MovieCardHorizontalTrailer.vue';
import {
  getNowPlaying,
  getTvAiringToday,
  getTopRated,
  getUpComing,
  getMyRecommend,
  getTrending,
} from '@/services/MovieService';

definePageMeta({
  middleware: [function (to, from) {}, 'home-page-loading'],
});

const store = useStore();
const trendings = ref([]);
const nowPlayings = ref([]);
const upComings = ref([]);
const tvAiringTodays = ref([]);
const topRateds = ref([]);
const recommends = ref([]);
const viewMoreRecommend = ref(false);
const loadMoreRecommend = ref(false);
const skipRecommend = ref(2);

const btnPrev = ref('<i class="fa-solid fa-chevron-left "></i>');
const btnNext = ref('<i class="fa-solid fa-chevron-right "></i>');

useHead({
  title: 'Phimhay247',
  htmlAttrs: { lang: 'vi', amp: true },
});

onBeforeMount(async () => {
  Promise.all([
    await useAsyncData('trending/all/1', () => getTrending(1)),
    await useAsyncData('movie/nowplaying/1', () => getNowPlaying(1)),
    await useAsyncData('movie/upcoming/1', () => getUpComing(1)),
    await useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1)),
    await useAsyncData('movie/toprated/1', () => getTopRated(1)),
    store.$state?.isLogin
      ? useAsyncData('recommend/get/1', () =>
          getMyRecommend(store.$state.userAccount?.id, 1)
        )
      : null,
  ])
    .then((response) => {
      trendings.value = response[0].data.value.data?.results;
      nowPlayings.value = response[1].data.value.data?.results;
      upComings.value = response[2].data.value.data?.results;
      tvAiringTodays.value = response[3].data.value.data?.results;
      topRateds.value = response[4].data.value.data?.results;
      if (store.$state.isLogin) {
        recommends.value = response[5].data.value.data?.results;
      }
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});

const handleLoadMoreRecommend = async () => {
  loadMoreRecommend.value = true;
  await useAsyncData(`recommend/get/${skipRecommend.value}`, () =>
    getMyRecommend(store.$state.userAccount?.id, skipRecommend.value)
  )
    .then((movieResponse) => {
      if (movieResponse.data.value.data?.results.length > 0) {
        setTimeout(() => {
          recommends.value = recommends.value.concat(
            movieResponse.data.value.data?.results
          );
          loadMoreRecommend.value = false;
        }, 1000);
        skipRecommend.value += 1;
      } else {
        setTimeout(() => {
          loadMoreRecommend.value = false;
        }, 700);
      }
    })
    .catch((e) => {
      loadMoreRecommend.value = false;
      if (axios.isCancel(e)) return;
    });
};
</script>

<style lang="scss" src="./HomePage.scss"></style>
