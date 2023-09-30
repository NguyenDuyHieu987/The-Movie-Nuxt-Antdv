<template>
  <div class="home-container televison">
    <HeaderHome title="Phim bộ" />

    <BillboardAnimation v-model:data="dataBilboard" />

    <div class="home-content">
      <section class="home-section outstanding" v-if="airingTodays?.length">
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

        <CarouselGroup :data="airingTodays" :responsive="responsiveHorizoltal">
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
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import BillboardAnimation from '~/components/BillboardAnimation/BillboardAnimation.vue';
import CarouselGroup from '~/components/CarouselGroup/CarouselGroup.vue';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import HeaderHome from '~/components/layouts/HeaderHome/HeaderHome.vue';
import {
  getTvs,
  getTvAiringToday,
  getTvOntheAir,
  getTvPopular,
  getTvTopRated,
  FilterTvSlug,
} from '~/services/TvSlug';
import { getGenreByShortName } from '~/services/genres';
import type { formfilter } from '~/types';

useHead({
  title: 'Phim bộ',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Phim bộ',
  description: 'Phim bộ, Phim dài tập',
  ogTitle: 'Phim bộ',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Phim bộ, Phim dài tập',
  ogLocale: 'vi',
});

const store = useStore();
const route = useRoute();
const airingTodays = ref<any>([]);
const onTheAirs = ref<any>([]);
const populars = ref<any>([]);
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

  await useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1))
    .then((response) => {
      airingTodays.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData(`tv/ontheair/1`, () => getTvOntheAir(2))
    .then((response) => {
      onTheAirs.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('tv/popular/1', () => getTvPopular(3))
    .then((response) => {
      populars.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  await useAsyncData('tv/toprated/1', () => getTvTopRated(4))
    .then((response) => {
      topRateds.value = response.data.value?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  internalInstance.appContext.config.globalProperties.$Progress.finish();
};

const { data: dataBilboard, pending } = await useAsyncData(
  'tv/all/1',
  () => getTvs(1),
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
      //   route.query.genre,
      //   store.allGenres
      // )!.id;

      // formFilter.value.genre = genreId.toString();

      formFilter.value.genre = route.query.genre;

      await useAsyncData(`discover/tv/all/${formFilter.value}`, () =>
        FilterTvSlug(formFilter.value)
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
        .finally(() => {});

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
        .finally(() => {});

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
        .finally(() => {});

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
        .finally(() => {});
    }
  },
  { deep: true, immediate: true }
);
</script>

<style src="./television.scss" lang="scss"></style>
