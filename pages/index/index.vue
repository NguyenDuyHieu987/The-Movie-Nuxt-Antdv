<template>
  <div class="home-container">
    <SlideTopicHome :trendings="trendings" />

    <div class="home-section outstanding">
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

      <!-- <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide
          v-for="(item, index) in nowPlayings"
          :index="index"
          :key="item.id"
        >
          <MovieCardHorizontal :item="item" type="movie" />
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel> -->

      <!-- :navText="[btnPrev, btnNext]" -->
      <carousel
        v-if="nowPlayings?.length"
        class="carousel-group"
        :items="5"
        :autoplay="true"
        :dots="false"
        :autoplayHoverPause="true"
        :autoplayTimeout="10000"
        :margin="7"
        :autoplaySpeed="500"
        :nav="false"
        :responsive="responsiveHorizoltal"
      >
        <MovieCardHorizontal
          v-for="(item, index) in nowPlayings"
          :item="item"
          :index="index"
          :key="item.id"
          type="movie"
        />

        <template #prev>
          <div class="owl-prev">
            <Icon name="fa6-solid:chevron-left"></Icon>
          </div>
        </template>
        <template #next>
          <div class="owl-next">
            <Icon name="fa6-solid:chevron-right"></Icon>
          </div>
        </template>
      </carousel>
    </div>

    <div
      class="home-section recommend"
      v-if="store.$state?.isLogin"
      v-show="recommends?.length"
    >
      <h2 class="gradient-title-default">
        <strong>Gợi ý cho bạn</strong>
      </h2>

      <section
        class="movie-group vertical"
        :class="{ viewmore: viewMoreRecommend }"
      >
        <MovieCardVertical
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
            <!-- <i class="fa-light fa-plus"></i> -->
            <PlusOutlined />
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
            <!-- <i v-if="!viewMoreRecommend" class="fa-light fa-chevron-down"></i>
            <i v-else class="fa-light fa-chevron-up"></i> -->
            <Icon v-if="!viewMoreRecommend" name="ci:chevron-down" />
            <Icon v-else name="ci:chevron-big-up" />
          </el-tooltip>
        </ClientOnly>
      </div>
    </div>

    <div class="home-section cartoon">
      <h2 class="gradient-title-default" v-show="cartoons?.length">
        <strong>Hoạt hình - Anime đặc sắc</strong>
        <NuxtLink
          :to="{
            path: `/discover/genres/hoat-hinh`,
          }"
          style="font-size: 1.8rem"
        >
          <strong class="view-all">Xem tất cả</strong>
        </NuxtLink>
      </h2>

      <carousel
        v-if="cartoons?.length"
        class="carousel-group"
        :items="5"
        :autoplay="true"
        :dots="false"
        :autoplayHoverPause="true"
        :autoplayTimeout="10000"
        :margin="7"
        :autoplaySpeed="500"
        :nav="false"
        :responsive="responsiveHorizoltal"
      >
        <MovieCardHorizontal
          v-for="(item, index) in cartoons"
          :item="item"
          :index="index"
          :key="item.id"
          type="movie"
        />

        <template #prev>
          <div class="owl-prev">
            <Icon name="fa6-solid:chevron-left"></Icon>
          </div>
        </template>
        <template #next>
          <div class="owl-next">
            <Icon name="fa6-solid:chevron-right"></Icon>
          </div>
        </template>
      </carousel>
    </div>

    <div class="home-section tv-new" v-show="tvAiringTodays?.length">
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

      <!-- <section class="movie-group vertical">
        <MovieCardVertical
          v-for="(item, index) in tvAiringTodays"
          :index="index"
          :key="item.id"
          :item="item"
          type="tv"
        />
      </section> -->
      <carousel
        v-if="tvAiringTodays?.length"
        class="carousel-group"
        :items="5"
        :autoplay="true"
        :dots="false"
        :autoplayHoverPause="true"
        :autoplayTimeout="10000"
        :margin="7"
        :autoplaySpeed="500"
        :nav="false"
        :responsive="responsiveVertical"
      >
        <MovieCardVertical
          v-for="(item, index) in tvAiringTodays"
          :index="index"
          :key="item.id"
          :item="item"
          type="tv"
        />

        <template #prev>
          <div class="owl-prev">
            <Icon name="fa6-solid:chevron-left"></Icon>
          </div>
        </template>
        <template #next>
          <div class="owl-next">
            <Icon name="fa6-solid:chevron-right"></Icon>
          </div>
        </template>
      </carousel>
    </div>

    <div class="home-section trailer" v-show="upComings?.length">
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

    <div class="home-section theater">
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
        class="carousel-group"
        :items="4"
        :autoplay="true"
        :dots="false"
        :autoplayHoverPause="true"
        :autoplayTimeout="10000"
        :margin="7"
        :autoplaySpeed="500"
        :nav="false"
        :responsive="responsiveVertical"
      >
        <MovieCardVertical
          v-for="(item, index) in topRateds"
          :item="item"
          :index="index"
          :key="item.id"
          type="movie"
        />

        <template #prev>
          <div class="owl-prev">
            <Icon name="fa6-solid:chevron-left"></Icon>
          </div>
        </template>
        <template #next>
          <div class="owl-next">
            <Icon name="fa6-solid:chevron-right"></Icon>
          </div>
        </template>
      </carousel>
    </div>

    <div class="home-section on-the-air">
      <h2 class="gradient-title-default" v-show="tvOnTheAirs?.length">
        <strong>TV On the air</strong>
        <NuxtLink
          :to="{
            path: `/discover/tv/ontheair`,
          }"
          style="font-size: 1.8rem"
        >
          <strong class="view-all">Xem tất cả</strong>
        </NuxtLink>
      </h2>

      <carousel
        v-if="tvOnTheAirs?.length"
        class="carousel-group"
        :items="5"
        :autoplay="true"
        :dots="false"
        :autoplayHoverPause="true"
        :autoplayTimeout="10000"
        :margin="7"
        :autoplaySpeed="500"
        :nav="false"
        :responsive="responsiveHorizoltal"
      >
        <MovieCardHorizontal
          v-for="(item, index) in tvOnTheAirs"
          :item="item"
          :index="index"
          :key="item.id"
          type="tv"
        />

        <template #prev>
          <div class="owl-prev">
            <Icon name="fa6-solid:chevron-left"></Icon>
          </div>
        </template>
        <template #next>
          <div class="owl-next">
            <Icon name="fa6-solid:chevron-right"></Icon>
          </div>
        </template>
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
  getTvOntheAir,
  getMoviesByGenres,
} from '@/services/MovieService';
import { PlusOutlined } from '@ant-design/icons-vue';

definePageMeta({
  layout: 'home',
  middleware: [function (to, from) {}, 'home-page-loading'],
});

const store = useStore();
const trendings = ref([]);
const nowPlayings = ref([]);
const upComings = ref([]);
const tvAiringTodays = ref([]);
const tvOnTheAirs = ref([]);
const cartoons = ref([]);
const topRateds = ref([]);
const recommends = ref([]);
const viewMoreRecommend = ref(false);
const loadMoreRecommend = ref(false);
const skipRecommend = ref(2);
const loadSection1 = ref(false);

const responsiveHorizoltal = ref({
  0: {
    items: 2,
    slideBy: 2,
  },
  590: {
    items: 2,
    slideBy: 2,
  },
  750: {
    items: 3,
    slideBy: 3,
  },
  800: {
    items: 2,
    slideBy: 2,
  },
  900: {
    items: 3,
    slideBy: 3,
  },
  1150: {
    items: 4,
    slideBy: 4,
  },
  1500: {
    items: 5,
    slideBy: 5,
  },
  1800: {
    items: 6,
    slideBy: 6,
  },
  2050: {
    items: 7,
    slideBy: 7,
  },
  2200: {
    items: 8,
    slideBy: 8,
  },
});

const responsiveVertical = ref({
  0: {
    items: 2,
    slideBy: 2,
  },
  500: {
    items: 2,
    slideBy: 2,
  },
  520: {
    items: 3,
    slideBy: 3,
  },
  700: {
    items: 4,
    slideBy: 4,
  },
  800: {
    items: 3,
    slideBy: 3,
  },
  900: {
    items: 4,
    slideBy: 4,
  },
  1000: {
    items: 4,
    slideBy: 4,
  },
  1150: {
    items: 5,
    slideBy: 5,
  },
  1300: {
    items: 6,
    slideBy: 6,
  },
  1400: {
    items: 6,
    slideBy: 6,
  },
  1550: {
    items: 7,
    slideBy: 7,
  },
  1700: {
    items: 8,
    slideBy: 8,
  },
  1900: {
    items: 9,
    slideBy: 9,
  },
  2000: {
    items: 10,
    slideBy: 10,
  },
  2200: {
    items: 11,
    slideBy: 11,
  },
});

useHead({
  title: 'Phimhay247',
  htmlAttrs: { lang: 'vi', amp: true },
});

onBeforeMount(async () => {
  Promise.all([
    await useAsyncData('trending/all/1', () => getTrending(1)),
    await useAsyncData('movie/nowplaying/1', () => getNowPlaying(1)),
    await useAsyncData(`genres/hoat-hinh/views_desc/1`, () =>
      getMoviesByGenres('hoat-hinh', 1, 'views_desc')
    ),
    await useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1)),
    await useAsyncData('movie/upcoming/1', () => getUpComing(1)),
    await useAsyncData('movie/toprated/1', () => getTopRated(1)),
    await useAsyncData('tv/ontheair/1', () => getTvOntheAir(1)),

    store.$state?.isLogin
      ? useAsyncData('recommend/get/1', () =>
          getMyRecommend(store.$state.userAccount?.id, 1)
        )
      : null,
  ])
    .then((response) => {
      trendings.value = response[0].data.value.data?.results.slice(0, 11);
      nowPlayings.value = response[1].data.value.data?.results.slice(0, 10);
      cartoons.value = response[2].data.value.data?.results.slice(0, 10);
      tvAiringTodays.value = response[3].data.value.data?.results.slice(0, 10);
      upComings.value = response[4].data.value.data?.results.slice(0, 10);
      topRateds.value = response[5].data.value.data?.results.slice(0, 10);
      tvOnTheAirs.value = response[6].data.value.data?.results.slice(0, 10);

      if (store.$state.isLogin) {
        recommends.value = response[7].data.value.data?.results;
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

onMounted(() => {
  // window.onscroll = async () => {
  //   console.log(window.scrollY);
  //   if (window.scrollY >= 1000) {
  //     if (loadSection1.value == false) {
  //       Promise.all([
  //         await useAsyncData('movie/upcoming/1', () => getUpComing(1)),
  //         await useAsyncData('movie/toprated/1', () => getTopRated(1)),
  //         await useAsyncData('tv/ontheair/1', () => getTvOntheAir(1)),
  //       ])
  //         .then((response) => {
  //           upComings.value = response[0].data.value.data?.results.slice(0, 10);
  //           topRateds.value = response[1].data.value.data?.results.slice(0, 10);
  //           tvOnTheAirs.value = response[2].data.value.data?.results.slice(
  //             0,
  //             10
  //           );
  //           loadSection1.value = true;
  //         })
  //         .catch((e) => {
  //           if (axios.isCancel(e)) return;
  //         });
  //     }
  //   }
  // };
});
</script>

<style lang="scss" src="./HomePage.scss"></style>
