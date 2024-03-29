<template>
  <div class="home-page feature">
    <HeaderPageMovieType title="Phim lẻ" />

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <section class="home-section outstanding" v-if="nowPlayings?.length">
        <h2 class="gradient-title-default">
          <span>Now Playing</span>
          <NuxtLink
            :to="{
              path: `/discover/movie/nowplaying`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <SwiperCarouselGroup
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
        </SwiperCarouselGroup>
      </section>

      <section class="home-section popular">
        <h2 class="gradient-title-default">
          <span>Popular</span>
          <NuxtLink
            :to="{
              path: `/discover/movie/popular`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <SwiperCarouselGroup
          :data="populars"
          :responsive="responsiveHorizoltal"
        >
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
        </SwiperCarouselGroup>
      </section>

      <section class="home-section upcoming">
        <h2 class="gradient-title-default">
          <span>Upcomimg</span>
          <NuxtLink
            :to="{
              path: `/discover/movie/upcoming`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <SwiperCarouselGroup
          :data="upComings"
          :responsive="responsiveHorizoltal"
        >
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
        </SwiperCarouselGroup>
      </section>

      <section class="home-section toprated">
        <h2 class="gradient-title-default">
          <span>Top Rated</span>
          <NuxtLink
            :to="{
              path: `/discover/movie/toprated`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <SwiperCarouselGroup
          :data="topRateds"
          :responsive="responsiveHorizoltal"
        >
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
        </SwiperCarouselGroup>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import BillboardAnimation from '~/components/BillboardAnimation/BillboardAnimation.server.vue';
import SwiperCarouselGroup from '~/components/CarouselGroup/SwiperCarouselGroup/SwiperCarouselGroup.vue';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import HeaderPageMovieType from '~/components/layouts/HeaderPageMovieType/HeaderPageMovieType.server.vue';
import { getGenreByShortName } from '~/services/genres';
import {
  getMovies,
  getNowPlaying,
  getUpComing,
  getPopular,
  getTopRated,
  FilterMovieSlug,
} from '~/services/movieSlug';
import type { genre, formfilter } from '~/types';

useHead({
  title: 'Phim lẻ',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Phim lẻ',
  description: 'Phim lẻ, Phim chiếu rạp',
  ogTitle: 'Phim lẻ',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Phim lẻ, Phim chiếu rạp',
  ogLocale: 'vi',
});

const store = useStore();
const route = useRoute();
const nowPlayings = ref<any>([]);
const populars = ref<any>([]);
const upComings = ref<any>([]);
const topRateds = ref<any>([]);
const loading = ref<boolean>(false);
const formFilter = ref<formfilter>({
  type: 'all',
  genre: '',
  year: '',
  country: '',
  page: 1,
  limit: 20,
});
const internalInstance: any = getCurrentInstance();

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
    spaceBetween: 3,
  },
  1200: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1500: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 5,
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
  internalInstance.appContext.config.globalProperties.$Progress.start();

  await nextTick();

  await useAsyncData('movie/nowplaying/1', () => getNowPlaying(1))
    .then((response) => {
      nowPlayings.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData(`movie/popular/1`, () => getPopular(2))
    .then((response) => {
      populars.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('movie/upcoming/1', () => getUpComing(3))
    .then((response) => {
      upComings.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('movie/toprated/1', () => getTopRated(4))
    .then((response) => {
      topRateds.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  internalInstance.appContext.config.globalProperties.$Progress.finish();
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

watch(
  () => route.query,
  async () => {
    if (route.query?.genre) {
      loading.value = true;
      // const genreId: number = getGenreByShortName(
      //   route.query?.genre,
      //   store.allGenres
      // )!.id;

      // formFilter.value.genre = genreId.toString();

      formFilter.value.genre = route.query?.genre;

      await useAsyncData(`discover/movie/all/${formFilter.value}`, () =>
        FilterMovieSlug(formFilter.value)
      )
        .then((response) => {
          dataBilboard.value = response.data.value?.results;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          loading.value = false;
        });

      await useAsyncData(
        `discover/movie/nowplaying/${{
          ...formFilter.value,
          type: 'nowplaying',
        }}`,
        () =>
          FilterMovieSlug({
            ...formFilter.value,
            type: 'nowplaying',
          })
      )
        .then((response) => {
          nowPlayings.value = response.data.value?.results.slice(0, 12);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {});

      await useAsyncData(
        `discover/movie/popular/${{
          ...formFilter.value,
          type: 'popular',
        }}`,
        () =>
          FilterMovieSlug({
            ...formFilter.value,
            type: 'popular',
          })
      )
        .then((response) => {
          populars.value = response.data.value?.results.slice(0, 12);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {});

      await useAsyncData(
        `discover/movie/upcoming/${{
          ...formFilter.value,
          type: 'upcoming',
        }}`,
        () =>
          FilterMovieSlug({
            ...formFilter.value,
            type: 'upcoming',
          })
      )
        .then((response) => {
          upComings.value = response.data.value?.results.slice(0, 12);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {});

      await useAsyncData(
        `discover/movie/toprated/${{
          ...formFilter.value,
          type: 'toprated',
        }}`,
        () =>
          FilterMovieSlug({
            ...formFilter.value,
            type: 'toprated',
          })
      )
        .then((response) => {
          topRateds.value = response.data.value?.results.slice(0, 12);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {});
    }
  },
  { deep: true, immediate: true }
);
</script>

<style src="./FeaturePage.scss" lang="scss"></style>
