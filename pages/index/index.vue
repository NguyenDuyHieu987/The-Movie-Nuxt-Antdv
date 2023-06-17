<template>
  <div class="home-container">
    <BillboardAnimation :data1="trendings" v-model:data="trendings" />

    <div class="home-content">
      <section class="home-section outstanding">
        <h2 class="gradient-title-default">
          <span>Phim nổi bật</span>
          <NuxtLink
            :to="{
              path: `/discover/movie/nowplaying`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
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

      <div class="home-section recommend" v-if="store.$state?.isLogin">
        <h2 class="gradient-title-default">
          <span>Gợi ý cho bạn</span>
        </h2>

        <section
          class="movie-group vertical"
          :class="{ expand: viewMoreRecommend }"
        >
          <MovieCardVertical
            v-for="(item, index) in recommends"
            :index="index"
            :key="item.id"
            :item="item"
            :type="item.media_type"
          />
        </section>

        <ViewMoreBar
          v-show="recommends.length"
          :isOpen="viewMoreRecommend"
          @clickBtn="viewMoreRecommend = !viewMoreRecommend"
        />

        <a-button
          v-show="recommends.length"
          class="loadmore-btn"
          type="text"
          :loading="loadMoreRecommend"
          @click="handleLoadMoreRecommend"
        >
          <template #icon>
            <Icon name="ic:baseline-add" />
          </template>
          {{ loadMoreRecommend ? 'Đang tải...' : 'Tải thêm' }}
        </a-button>
      </div>

      <section class="home-section cartoon">
        <h2 class="gradient-title-default">
          <span>Hoạt hình - Anime đặc sắc</span>
          <NuxtLink
            :to="{
              path: `/discover/genres/hoat-hinh`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

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

      <section class="home-section tv-new">
        <h2 class="gradient-title-default">
          <span>Phim bộ mới</span>
          <NuxtLink
            :to="{
              path: `/discover/tv/airingtoday`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
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

      <section class="home-section trailer">
        <h2 class="gradient-title-default">
          <span>Trailer</span>

          <NuxtLink
            :to="{
              path: `/discover/movie/upcoming`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
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
        <h2 class="gradient-title-default">
          <span>Phim chiếu rạp mới</span>
          <NuxtLink
            :to="{
              path: `/discover/movie/toprated`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
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
        <h2 class="gradient-title-default">
          <span>TV On the air</span>
          <NuxtLink
            :to="{
              path: `/discover/tv/ontheair`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
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
import axios from 'axios';
// import carousel from 'vue-owl-carousel/src/Carousel';
import BillboardAnimation from '@/components/BillboardAnimation/BillboardAnimation.vue';
import MovieCardHorizontal from '@/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import MovieCardVertical from '@/components/MovieCardVertical/MovieCardVertical.vue';
import CarouselGroup from '@/components/CarouselGroup/CarouselGroup.vue';
import MovieCardHorizontalTrailer from '@/components/MovieCardHorizontalTrailer/MovieCardHorizontalTrailer.vue';
import ViewMoreBar from '~/components/ViewMoreBar/ViewMoreBar.vue';
import { getTrending } from '~/services/trending';
import { getNowPlaying, getTopRated, getUpComing } from '~/services/movieSlug';
import { getMoviesByGenres } from '~/services/discover';
import { getMyRecommend } from '~/services/recommend';
import { getTvAiringToday, getTvOntheAir } from '~/services/TvSlug';

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
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi',
});

const store = useStore();
const trendings = ref<any[]>([]);
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
  600: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  800: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  900: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1100: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  1300: {
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

const getData = async () => {
  await useAsyncData(`trending/all/1`, () => getTrending(1))
    .then((response: any) => {
      trendings.value = response.data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('movie/nowplaying/1', () => getNowPlaying(1))
    .then((response) => {
      nowPlayings.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData(`genres/hoat-hinh/views_desc/1`, () =>
    getMoviesByGenres('hoat-hinh', 'views_desc', 1)
  )
    .then((response) => {
      cartoons.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1))
    .then((response) => {
      tvAiringTodays.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('movie/upcoming/1', () => getUpComing(1))
    .then((response) => {
      upComings.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('movie/toprated/1', () => getTopRated(1))
    .then((response) => {
      topRateds.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('tv/ontheair/1', () => getTvOntheAir(1))
    .then((response) => {
      tvOnTheAirs.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  if (store.$state.isLogin) {
    await useAsyncData('recommend/get/1', () => getMyRecommend(1))
      .then((response) => {
        recommends.value = response.data.value?.results;
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }
};

onBeforeMount(() => {
  // const request = useRequest();
  // const data = await request.makeRequest('/trending/all?page=2', {});
  getData();
});

const handleLoadMoreRecommend = async () => {
  loadMoreRecommend.value = true;
  await useAsyncData(`recommend/get/${skipRecommend.value}`, () =>
    getMyRecommend(skipRecommend.value)
  )
    .then((movieResponse: any) => {
      if (movieResponse.data.value?.results.length > 0) {
        recommends.value = recommends.value.concat(
          movieResponse.data.value?.results
        );
        skipRecommend.value += 1;
      }
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadMoreRecommend.value = false;
    });
};
</script>

<style lang="scss" src="./HomePage.scss"></style>
