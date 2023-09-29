<template>
  <div class="home-container televison">
    <HeaderHomeBreadcrumb>
      <template #label>
        <NuxtLink
          :to="{
            path: '/television',
          }"
        >
          Phim bộ
        </NuxtLink>
      </template>
    </HeaderHomeBreadcrumb>

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <!-- v-if="airingTodays?.length" -->
      <section class="home-section outstanding">
        <h2 class="gradient-title-default">
          <span>Airing Today</span>
          <NuxtLink
            :to="{
              path: `/discover/tv/airingtoday`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTvAiringToday">
          <template #content>
            <CarouselGroup
              :data="airingTodays"
              :responsive="responsiveHorizoltal"
            >
              <template #content>
                <SwiperSlide v-for="(item, index) in airingTodays">
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
          <span>On The Air</span>
          <NuxtLink
            :to="{
              path: `/discover/tv/ontheair`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTvOnTheAir">
          <template #content>
            <CarouselGroup :data="onTheAirs" :responsive="responsiveHorizoltal">
              <template #content>
                <SwiperSlide v-for="(item, index) in onTheAirs">
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
          <span>Popular</span>
          <NuxtLink
            :to="{
              path: `/discover/tv/popular`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTvPopular">
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

      <section class="home-section toprated">
        <h2 class="gradient-title-default">
          <span>Top Rated</span>
          <NuxtLink
            :to="{
              path: `/discover/tv/toprated`,
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTvTopRated">
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
import HeaderHomeBreadcrumb from '~/components/layouts/HeaderHomeBreadcrumb/HeaderHomeBreadcrumb.vue';
import LoadingSectionHorizontal from '~/components/LoadingSection/LoadingSectionHorizontal/LoadingSectionHorizontal.vue';
import { getGenreById } from '~/services/genres';
import { FilterTvSlug } from '~/services/TvSlug';
import type { genre, formfilter } from '~/types';

const store = useStore();
const route = useRoute();
const airingTodays = ref<any>([]);
const onTheAirs = ref<any>([]);
const populars = ref<any>([]);
const topRateds = ref<any>([]);
const loadingTvAiringToday = ref<boolean>(true);
const loadingTvOnTheAir = ref<boolean>(true);
const loadingTvPopular = ref<boolean>(true);
const loadingTvTopRated = ref<boolean>(true);
const formFilter = ref<formfilter>({
  type: 'all',
  genre: route.params.genre,
  year: '',
  country: '',
  page: 1,
  limit: 20,
});
const genreRoute = ref<genre>(
  getGenreById(route.params.genre, store.allGenres)
);
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
  title: () => 'Phim bộ - ' + genreRoute.value.name_vietsub,
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: () => 'Phim bộ - ' + genreRoute.value.name_vietsub,
  description: () =>
    'Phim bộ, Phim dài tập - Thể loại: ' + genreRoute.value.name_vietsub,
  ogTitle: () => 'Phim bộ - ' + genreRoute.value.name_vietsub,
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: () =>
    'Phim bộ, Phim dài tập - Thể loại: ' + genreRoute.value.name_vietsub,
  ogLocale: 'vi',
});

const getData = async () => {
  loadingTvAiringToday.value = true;
  loadingTvOnTheAir.value = true;
  loadingTvPopular.value = true;
  loadingTvTopRated.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  await nextTick();

  if (route.params?.slug == 'genre') {
    // const genreId: number = getGenreByShortName(
    //   route.query.genre,
    //   store.allGenres
    // )!.id;

    // formFilter.value.genre = genreId.toString();

    formFilter.value.genre = route.params.genre;

    await useAsyncData(
      `discover/tv/airingtoday/${{
        ...formFilter.value,
        type: 'airingtoday',
      }}`,
      () => FilterTvSlug({ ...formFilter.value, type: 'airingtoday' })
    )
      .then((response) => {
        airingTodays.value = response.data.value?.results.slice(0, 12);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loadingTvAiringToday.value = false;
      });

    await useAsyncData(
      `discover/tv/ontheair/${{
        ...formFilter.value,
        type: 'ontheair',
      }}`,
      () => FilterTvSlug({ ...formFilter.value, type: 'ontheair' })
    )
      .then((response) => {
        onTheAirs.value = response.data.value?.results.slice(0, 12);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loadingTvOnTheAir.value = false;
      });

    await useAsyncData(
      `discover/tv/popular/${{
        ...formFilter.value,
        type: 'popular',
      }}`,
      () => FilterTvSlug({ ...formFilter.value, type: 'popular' })
    )
      .then((response) => {
        populars.value = response.data.value?.results.slice(0, 12);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loadingTvPopular.value = false;
      });

    await useAsyncData(
      `discover/tv/toprated/${{
        ...formFilter.value,
        type: 'toprated',
      }}`,
      () => FilterTvSlug({ ...formFilter.value, type: 'toprated' })
    )
      .then((response) => {
        topRateds.value = response.data.value?.results.slice(0, 12);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      })
      .finally(() => {
        loadingTvTopRated.value = false;
      });
  } else {
    navigateTo('/404');
  }

  internalInstance.appContext.config.globalProperties.$Progress.finish();
};

const { data: dataBilboard, pending } = await useAsyncData(
  `discover/tv/all/${formFilter.value}`,
  () => FilterTvSlug(formFilter.value),
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

<style src="../television.scss" lang="scss"></style>
