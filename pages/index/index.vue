<template>
  <div class="home-container">
    <SlideTopicHome :trendings="trendings" />
    <div class="home-content">
      <div class="temp"></div>
      <section class="home-section outstanding">
        <h2
          class="gradient-title-default underline"
          v-show="nowPlayings?.length"
        >
          <strong>Phim nổi bật</strong>
          <NuxtLink
            :to="{
              path: `/discover/movie/nowplaying`,
            }"
          >
            <strong class="view-all">Xem tất cả</strong>
          </NuxtLink>
        </h2>

        <CarouselGroup :data="nowPlayings" :responsive="responsiveHorizoltal">
          <template #content>
            <SwiperSlide v-for="(item, index) in nowPlayings">
              <MovieCardHorizontal
                :item="item"
                :index="index"
                :key="item.id"
                :type="item.media_type"
              />
            </SwiperSlide>
          </template>
        </CarouselGroup>
      </section>

      <div
        class="home-section recommend"
        v-if="store.$state?.isLogin"
        v-show="recommends?.length"
      >
        <h2 class="gradient-title-default underline">
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
          <a-tooltip
            :teleported="false"
            :title="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
            :content="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
            placement="bottom"
          >
            <!-- <i v-if="!viewMoreRecommend" class="fa-light fa-chevron-down"></i>
              <i v-else class="fa-light fa-chevron-up"></i> -->
            <Icon v-if="!viewMoreRecommend" name="ci:chevron-down" />
            <Icon v-else name="ci:chevron-big-up" />
          </a-tooltip>
        </div>
      </div>

      <section class="home-section cartoon">
        <h2 class="gradient-title-default underline" v-show="cartoons?.length">
          <strong>Hoạt hình - Anime đặc sắc</strong>
          <NuxtLink
            :to="{
              path: `/discover/genres/hoat-hinh`,
            }"
          >
            <strong class="view-all">Xem tất cả</strong>
          </NuxtLink>
        </h2>

        <!-- <div v-bind="containerProps">
          <div v-bind="wrapperProps">
         
          </div>
        </div> -->

        <CarouselGroup :data="cartoons" :responsive="responsiveHorizoltal">
          <template #content>
            <SwiperSlide v-for="(item, index) in cartoons">
              <MovieCardHorizontal
                :item="item"
                :index="index"
                :key="item.id"
                :type="item.media_type"
              />
            </SwiperSlide>
          </template>
        </CarouselGroup>
      </section>

      <section class="home-section tv-new" v-show="tvAiringTodays?.length">
        <h2 class="gradient-title-default underline">
          <strong>Phim bộ mới</strong>
          <NuxtLink
            :to="{
              path: `/discover/tv/airingtoday`,
            }"
          >
            <strong class="view-all">Xem tất cả</strong>
          </NuxtLink>
        </h2>

        <CarouselGroup :data="tvAiringTodays" :responsive="responsiveVertical">
          <template #content>
            <SwiperSlide v-for="(item, index) in tvAiringTodays">
              <MovieCardVertical
                :index="index"
                :key="item.id"
                :item="item"
                :type="item.media_type"
              />
            </SwiperSlide>
          </template>
        </CarouselGroup>
      </section>

      <section class="home-section trailer" v-show="upComings?.length">
        <h2 class="gradient-title-default underline">
          <strong>Trailer</strong>

          <NuxtLink
            :to="{
              path: `/discover/movie/upcoming`,
            }"
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
            :type="item.me_type"
          />
        </section>
      </section>

      <section class="home-section theater">
        <h2 class="gradient-title-default underline" v-show="topRateds?.length">
          <strong>Phim chiếu rạp mới</strong>
          <NuxtLink
            :to="{
              path: `/discover/movie/toprated`,
            }"
          >
            <strong class="view-all">Xem tất cả</strong>
          </NuxtLink>
        </h2>

        <CarouselGroup :data="topRateds" :responsive="responsiveVertical">
          <template #content>
            <SwiperSlide v-for="(item, index) in topRateds">
              <MovieCardVertical
                :item="item"
                :index="index"
                :key="item.id"
                :type="item.me_type"
              />
            </SwiperSlide>
          </template>
        </CarouselGroup>
      </section>

      <section class="home-section on-the-air">
        <h2
          class="gradient-title-default underline"
          v-show="tvOnTheAirs?.length"
        >
          <strong>TV On the air</strong>
          <NuxtLink
            :to="{
              path: `/discover/tv/ontheair`,
            }"
          >
            <strong class="view-all">Xem tất cả</strong>
          </NuxtLink>
        </h2>

        <CarouselGroup :data="tvOnTheAirs" :responsive="responsiveHorizoltal">
          <template #content>
            <SwiperSlide v-for="(item, index) in tvOnTheAirs">
              <MovieCardHorizontal
                :item="item"
                :index="index"
                :key="item.id"
                :type="item.media_type"
              />
            </SwiperSlide>
          </template>
        </CarouselGroup>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import axios from 'axios';
// import carousel from 'vue-owl-carousel/src/Carousel';
import SlideTopicHome from '@/components/SlideTopicHome/SlideTopicHome.vue';
import MovieCardHorizontal from '@/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import MovieCardVertical from '@/components/MovieCardVertical/MovieCardVertical.vue';
import CarouselGroup from '@/components/CarouselGroup/CarouselGroup.vue';
import MovieCardHorizontalTrailer from '@/components/MovieCardHorizontalTrailer/MovieCardHorizontalTrailer.vue';
import { getTrending } from '~/services/trending';
import { getNowPlaying, getTopRated, getUpComing } from '~/services/movieSlug';
import { getMoviesByGenres } from '~/services/discover';
import { getMyRecommend } from '~/services/recommend';
import { getTvAiringToday, getTvOntheAir } from '~/services/TvSlug';
import { PlusOutlined } from '@ant-design/icons-vue';

definePageMeta({
  // layout: 'home',
});

useHead({
  title: 'Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Phimhay247',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Phimhay247',
  ogType: 'video.movie',
  ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi',
});

const store: any = useStore();
const trendings = ref<any>([]);
const nowPlayings = ref<any>([]);
const upComings = ref<any>([]);
const tvAiringTodays = ref<any>([]);
const tvOnTheAirs = ref<any>([]);
const cartoons = ref<any>([]);
const topRateds = ref<any>([]);
const recommends = ref<any>([]);
const viewMoreRecommend = ref<boolean>(false);
const loadMoreRecommend = ref<boolean>(false);
const skipRecommend = ref<number>(2);

const responsiveHorizoltal = computed<any>((): any => ({
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  600: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  900: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  1200: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1500: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  1700: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
}));

const responsiveVertical = computed<any>((): any => ({
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  500: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  650: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1000: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1100: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  1400: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
  1550: {
    slidesPerView: 7,
    slidesPerGroup: 7,
  },
  1700: {
    slidesPerView: 8,
    slidesPerGroup: 8,
  },
}));

onBeforeMount(async () => {
  // const request = useRequest();
  // const data = await request.makeRequest('/trending/all?page=2', {});
});

await useAsyncData(`trending/all/1`, () => getTrending(1))
  .then((response: any) => {
    trendings.value = response.data.value?.results;
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

await useAsyncData('movie/nowplaying/1', () => getNowPlaying(1))
  .then((response: any) => {
    nowPlayings.value = response.data.value?.results.slice(0, 12);
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

await useAsyncData(`genres/hoat-hinh/views_desc/1`, () =>
  getMoviesByGenres('hoat-hinh', 'views_desc', 1)
)
  .then((response: any) => {
    cartoons.value = response.data.value?.results.slice(0, 12);
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

await useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1))
  .then((response: any) => {
    tvAiringTodays.value = response.data.value?.results.slice(0, 12);
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

await useAsyncData('movie/upcoming/1', () => getUpComing(1))
  .then((response: any) => {
    upComings.value = response.data.value?.results.slice(0, 12);
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

await useAsyncData('movie/toprated/1', () => getTopRated(1))
  .then((response: any) => {
    topRateds.value = response.data.value?.results.slice(0, 12);
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

await useAsyncData('tv/ontheair/1', () => getTvOntheAir(1))
  .then((response: any) => {
    tvOnTheAirs.value = response.data.value?.results.slice(0, 12);
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

if (store.$state.isLogin) {
  await useAsyncData('recommend/get/1', () => getMyRecommend(1))
    .then((response: any) => {
      recommends.value = response.data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
}

const handleLoadMoreRecommend = async () => {
  loadMoreRecommend.value = true;
  await useAsyncData(`recommend/get/${skipRecommend.value}`, () =>
    getMyRecommend(skipRecommend.value)
  )
    .then((movieResponse: any) => {
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
