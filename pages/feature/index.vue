<template>
  <div class="home-container feature">
    <HeaderHome title="Phim lẻ" viewAllLink="/discover/movie?type=all" />

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <!-- v-if="nowPlayings?.length" -->
      <section class="home-section outstanding">
        <h2 class="gradient-title-default">
          <span>Now Playing</span>
          <NuxtLink
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'nowplaying',
              },
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingNowPlaying">
          <template #content>
            <CarouselGroup
              :data="nowPlayings"
              :responsive="responsiveHorizoltal"
            >
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
          </template>
        </LoadingSectionHorizontal>
      </section>

      <section class="home-section popular">
        <h2 class="gradient-title-default">
          <span>Popular</span>
          <NuxtLink
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'popular',
              },
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingPopular">
          <template #content>
            <CarouselGroup :data="populars" :responsive="responsiveHorizoltal">
              <template #content>
                <SwiperSlide v-for="(item, index) in populars">
                  <MovieCardHorizontal
                    :item="item"
                    :index="index"
                    :key="item.id"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </CarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>

      <section class="home-section upcoming">
        <h2 class="gradient-title-default">
          <span>Upcomimg</span>
          <NuxtLink
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'upcoming',
              },
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingUpComing">
          <template #content>
            <CarouselGroup :data="upComings" :responsive="responsiveHorizoltal">
              <template #content>
                <SwiperSlide v-for="(item, index) in upComings">
                  <MovieCardHorizontal
                    :item="item"
                    :index="index"
                    :key="item.id"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </CarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>

      <section class="home-section toprated">
        <h2 class="gradient-title-default">
          <span>Top Rated</span>
          <NuxtLink
            :to="{
              path: `/discover/movie`,
              query: {
                type: 'toprated',
              },
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTopRated">
          <template #content>
            <CarouselGroup :data="topRateds" :responsive="responsiveHorizoltal">
              <template #content>
                <SwiperSlide v-for="(item, index) in topRateds">
                  <MovieCardHorizontal
                    :item="item"
                    :index="index"
                    :key="item.id"
                    :type="item.media_type"
                  />
                </SwiperSlide>
              </template>
            </CarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import BillboardAnimation from '~/components/BillboardAnimation/BillboardAnimation.vue';
import CarouselGroup from '~/components/CarouselGroup/CarouselGroup.vue';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import HeaderHome from '~/components/layouts/HeaderHome/HeaderHome.server.vue';
import LoadingSectionHorizontal from '~/components/LoadingSection/LoadingSectionHorizontal/LoadingSectionHorizontal.vue';
import {
  getMovies,
  getNowPlaying,
  getUpComing,
  getPopular,
  getTopRated,
} from '~/services/movieSlug';

useHead({
  title: 'Phim lẻ - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Phim lẻ - Phimhay247',
  description: 'Phim lẻ, Phim chiếu rạp',
  ogTitle: 'Phim lẻ - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Phim lẻ, Phim chiếu rạp',
  ogLocale: 'vi',
});

const store = useStore();
const nowPlayings = ref<any>([]);
const populars = ref<any>([]);
const upComings = ref<any>([]);
const topRateds = ref<any>([]);
const loadingNowPlaying = ref<boolean>(true);
const loadingPopular = ref<boolean>(true);
const loadingTopRated = ref<boolean>(true);
const loadingUpComing = ref<boolean>(true);

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
    spaceBetween: 5,
  },
  1000: {
    slidesPerView: 4,
    slidesPerGroup: 4,
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
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  2000: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
}));

const getData = async () => {
  loadingNowPlaying.value = true;
  loadingTopRated.value = true;
  loadingUpComing.value = true;
  loadingPopular.value = true;

  await nextTick();

  await useAsyncData('movie/nowplaying/1', () => getNowPlaying(1))
    .then((response) => {
      nowPlayings.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingNowPlaying.value = false;
    });

  await useAsyncData(`movie/popular/1`, () => getPopular(2))
    .then((response) => {
      populars.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingPopular.value = false;
    });

  await useAsyncData('movie/upcoming/1', () => getUpComing(3))
    .then((response) => {
      upComings.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingUpComing.value = false;
    });

  await useAsyncData('movie/toprated/1', () => getTopRated(4))
    .then((response) => {
      topRateds.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingTopRated.value = false;
    });
};

const { data: dataBilboard, pending } = await useAsyncData(
  'movie/all/1',
  () => getMovies(1),
  {
    // default: () => {
    //   return { results: trendingsCache.value || [] };
    // },
    transform: (data: any) => {
      return data.results;
    },
  }
);

onBeforeMount(getData);
</script>

<style src="./FeaturePage.scss" lang="scss"></style>
