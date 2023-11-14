<template>
  <div class="home-container feature">
    <HeaderHomeBreadcrumb>
      <template #label>
        <NuxtLink
          :to="{
            path: '/feature',
          }"
        >
          Phim lẻ
        </NuxtLink>
      </template>
    </HeaderHomeBreadcrumb>

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
import HeaderHomeBreadcrumb from '~/components/layouts/HeaderHomeBreadcrumb/HeaderHomeBreadcrumb.server.vue';
import LoadingSectionHorizontal from '~/components/LoadingSection/LoadingSectionHorizontal/LoadingSectionHorizontal.vue';
import { getGenreById } from '~/services/genres';
import { FilterMovieSlug } from '~/services/movieSlug';
import type { genre, formfilter } from '~/types';

const store = useStore();
const route = useRoute();
const nowPlayings = ref<any>([]);
const populars = ref<any>([]);
const upComings = ref<any>([]);
const topRateds = ref<any>([]);
const loadingNowPlaying = ref<boolean>(true);
const loadingPopular = ref<boolean>(true);
const loadingTopRated = ref<boolean>(true);
const loadingUpComing = ref<boolean>(true);
const formFilter = ref<formfilter>({
  type: 'all',
  sortBy: '',
  genre: route.params.genre,
  year: '',
  country: '',
  page: 1,
  limit: 20,
});
const genreRoute = computed<genre>(() =>
  getGenreById(route.params.genre, store.allGenres)
);

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

useHead({
  title: () =>
    'Phim lẻ | Thể loại: ' + genreRoute.value.name_vietsub + ' - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: () =>
    'Phim lẻ | Thể loại: ' + genreRoute.value.name_vietsub + ' - Phimhay247',
  description: () =>
    'Phim lẻ, Phim chiếu rạp | Thể loại: ' + genreRoute.value.name_vietsub,
  ogTitle: () =>
    'Phim lẻ | Thể loại: ' + genreRoute.value.name_vietsub + ' - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: () =>
    'Phim lẻ, Phim chiếu rạp | Thể loại: ' + genreRoute.value.name_vietsub,
  ogLocale: 'vi',
});

const getData = async () => {
  loadingNowPlaying.value = true;
  loadingTopRated.value = true;
  loadingUpComing.value = true;
  loadingPopular.value = true;

  await nextTick();

  // if (route.params?.slug == 'genre') {
  // const genreId: number = getGenreByShortName(
  //   route.params.genre,
  //   store.allGenres
  // )!.id;

  // formFilter.value.genre = genreId.toString();

  formFilter.value.genre = route.params.genre;

  // await useAsyncData(
  //   `discover/movie/nowplaying/${{
  //     ...formFilter.value,
  //     type: 'nowplaying',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'nowplaying',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'nowplaying',
  })
    .then((response) => {
      nowPlayings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingNowPlaying.value = false;
    });

  // await useAsyncData(
  //   `discover/movie/popular/${{
  //     ...formFilter.value,
  //     type: 'popular',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'popular',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'popular',
  })
    .then((response) => {
      populars.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingPopular.value = false;
    });

  // await useAsyncData(
  //   `discover/movie/upcoming/${{
  //     ...formFilter.value,
  //     type: 'upcoming',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'upcoming',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'upcoming',
  })
    .then((response) => {
      upComings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingUpComing.value = false;
    });

  // await useAsyncData(
  //   `discover/movie/toprated/${{
  //     ...formFilter.value,
  //     type: 'toprated',
  //   }}`,
  //   () =>
  //     FilterMovieSlug({
  //       ...formFilter.value,
  //       type: 'toprated',
  //     })
  // )
  FilterMovieSlug({
    ...formFilter.value,
    type: 'toprated',
  })
    .then((response) => {
      topRateds.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingTopRated.value = false;
    });
  // } else {
  //   navigateTo('/404');
  // }
};

const { data: dataBilboard, pending } = await useAsyncData(
  `discover/movie/all/${formFilter.value}`,
  () => FilterMovieSlug(formFilter.value),
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
  () => route.params,
  async () => {},
  { deep: true, immediate: true }
);
</script>

<style src="../FeaturePage.scss" lang="scss"></style>
