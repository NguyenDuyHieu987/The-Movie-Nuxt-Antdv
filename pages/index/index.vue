<template>
  <div class="home-container">
    <BillboardAnimation v-model:data="trendings" />

    <div class="home-content">
      <section class="home-section outstanding">
        <h2 class="gradient-title-default">
          <span>Phim nổi bật</span>
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
          </template>
        </LoadingSectionHorizontal>
      </section>

      <section v-show="store.isLogin" class="home-section recommend">
        <h2 class="gradient-title-default">
          <span>Gợi ý cho bạn</span>
        </h2>

        <LoadingSectionVertical v-model:loading="loadingRecommend">
          <template #content>
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
              @onClick="viewMoreRecommend = !viewMoreRecommend"
            />

            <a-button
              v-show="recommends.length"
              class="loadmore-btn"
              type="text"
              :loading="loadMoreRecommend"
              @click="handleLoadMoreRecommend"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                  />
                </svg>
              </template>
              {{ loadMoreRecommend ? 'Đang tải...' : 'Tải thêm' }}
            </a-button>
          </template>
        </LoadingSectionVertical>
      </section>

      <section class="home-section cartoon">
        <h2 class="gradient-title-default">
          <span>Hoạt hình - Anime đặc sắc</span>
          <NuxtLink :to="{ path: `/discover/genre/hoat-hinh` }">
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingCartoon">
          <template #content>
            <SwiperCarouselGroup
              :data="cartoons"
              :responsive="responsiveHorizoltal"
            >
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
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>

      <section class="home-section tv-new hidden-bottom">
        <h2 class="gradient-title-default">
          <span>Phim bộ mới</span>
          <NuxtLink
            :to="{
              path: `/discover/tv`,
              query: {
                type: 'airingtoday',
              },
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionVertical v-model:loading="loadingTvAiringToday">
          <template #content>
            <SwiperCarouselGroup
              :data="tvAiringTodays"
              :responsive="responsiveVertical"
              cardMode="vertical"
              :gap="15"
            >
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
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionVertical>
      </section>

      <section class="home-section trailer">
        <!-- <h2 class="gradient-title-default">
          <span>Latest Trailers</span>

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
        </h2> -->

        <!-- <LoadingSectionHorizontal v-model:loading="loadingUpComing">
          <template #content>
            <section class="movie-group horizontal trailer">
              <MovieCardHorizontalTrailer
                v-for="(item, index) in upComings"
                :index="index"
                :key="item.id"
                :item="item"
                :type="item.me_type"
              />
            </section>
          </template>
        </LoadingSectionHorizontal> -->

        <SliderGroupBackground :data="upComings">
          <template #title>
            <h2 class="gradient-title-default">
              <span>Latest Trailers</span>

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
          </template>

          <template #content>
            <LoadingSectionHorizontal v-model:loading="loadingUpComing">
              <template #content>
                <div class="slider-item" v-for="(item, index) in upComings">
                  <MovieCardHorizontalTrailer
                    :index="index"
                    :key="item.id"
                    :item="item"
                    :type="item.me_type"
                  />
                </div>
              </template>
            </LoadingSectionHorizontal>
          </template>
        </SliderGroupBackground>
      </section>

      <section class="home-section theater hidden-bottom">
        <h2 class="gradient-title-default">
          <span>Phim chiếu rạp mới</span>
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

        <LoadingSectionVertical v-model:loading="loadingTopRated">
          <template #content>
            <SwiperCarouselGroup
              :data="topRateds"
              :responsive="responsiveVertical"
              cardMode="vertical"
              :gap="15"
            >
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
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionVertical>
      </section>

      <section class="home-section on-the-air">
        <h2 class="gradient-title-default">
          <span>TV On the air</span>
          <NuxtLink
            :to="{
              path: `/discover/tv`,
              query: {
                type: 'ontheair',
              },
            }"
          >
            <span class="view-all">Xem tất cả</span>
          </NuxtLink>
        </h2>

        <LoadingSectionHorizontal v-model:loading="loadingTvOnTheAir">
          <template #content>
            <SwiperCarouselGroup
              :data="tvOnTheAirs"
              :responsive="responsiveHorizoltal"
            >
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
            </SwiperCarouselGroup>
          </template>
        </LoadingSectionHorizontal>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
// import carousel from 'vue-owl-carousel/src/Carousel';
import BillboardAnimation from '~/components/BillboardAnimation/BillboardAnimation.server.vue';
import SwiperCarouselGroup from '~/components/CarouselGroup/SwiperCarouselGroup/SwiperCarouselGroup.vue';
import MovieCardHorizontal from '~/components/MovieCardHorizontal/MovieCardHorizontal.vue';
import MovieCardVertical from '~/components/MovieCardVertical/MovieCardVertical.vue';
import SliderGroupBackground from '~/components/SliderGroup/SliderGroupBackground/SliderGroupBackground.vue';
import MovieCardHorizontalTrailer from '~/components/MovieCardHorizontalTrailer/MovieCardHorizontalTrailer.vue';
import LoadingSectionHorizontal from '~/components/LoadingSection/LoadingSectionHorizontal/LoadingSectionHorizontal.vue';
import LoadingSectionVertical from '~/components/LoadingSection/LoadingSectionVertical/LoadingSectionVertical.vue';
import ViewMoreBar from '~/components/ViewMoreBar/ViewMoreBar.vue';
import { getTrending } from '~/services/trending';
import { getNowPlaying, getTopRated, getUpComing } from '~/services/movieSlug';
import { getMoviesByGenres } from '~/services/discover';
import { getMyRecommend } from '~/services/recommend';
import { getTvAiringToday, getTvOntheAir } from '~/services/TvSlug';

definePageMeta({
  keepalive: true,
  key: (route) => route.fullPath,
});

useHead({
  title: 'Xem phim Online 24/7 - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Xem phim Online 24/7 - Phimhay247',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Xem phim Online 24/7 - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi',
});

const store = useStore();
// const trendings = ref<any[]>([]);
const nowPlayings = ref<any>([]);
const upComings = ref<any>([]);
const tvAiringTodays = ref<any>([]);
const tvOnTheAirs = ref<any>([]);
const cartoons = ref<any>([]);
const topRateds = ref<any>([]);
const recommends = ref<any>([]);
const loadingNowPlaying = ref<boolean>(true);
const loadingUpComing = ref<boolean>(true);
const loadingTvAiringToday = ref<boolean>(true);
const loadingTvOnTheAir = ref<boolean>(true);
const loadingCartoon = ref<boolean>(true);
const loadingTopRated = ref<boolean>(true);
const loadingRecommend = ref<boolean>(true);
const skipRecommend = ref<number>(1);
const viewMoreRecommend = ref<boolean>(false);
const loadMoreRecommend = ref<boolean>(false);
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

// const responsiveVertical = computed<any>((): any => ({
//   0: {
//     slidesPerView: 2,
//     slidesPerGroup: 2,
//   },
//   500: {
//     slidesPerView: 3,
//     slidesPerGroup: 3,
//   },
//   600: {
//     slidesPerView: 4,
//     slidesPerGroup: 4,
//   },
//   800: {
//     slidesPerView: 5,
//     slidesPerGroup: 5,
//   },
//   900: {
//     slidesPerView: 4,
//     slidesPerGroup: 4,
//     spaceBetween: 3,
//   },
//   1100: {
//     slidesPerView: 5,
//     slidesPerGroup: 5,
//   },
//   1300: {
//     slidesPerView: 6,
//     slidesPerGroup: 6,
//   },
//   1550: {
//     slidesPerView: 7,
//     slidesPerGroup: 7,
//     spaceBetween: 5,
//   },
//   1700: {
//     slidesPerView: 8,
//     slidesPerGroup: 8,
//   },
//   2000: {
//     slidesPerView: 9,
//     slidesPerGroup: 9,
//   },
// }));

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
    spaceBetween: 13,
  },
  800: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  900: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 15,
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
  2000: {
    slidesPerView: 9,
    slidesPerGroup: 9,
  },
}));

const getData = async () => {
  loadingNowPlaying.value = true;
  loadingUpComing.value = true;
  loadingTvAiringToday.value = true;
  loadingTvOnTheAir.value = true;
  loadingCartoon.value = true;
  loadingTopRated.value = true;
  loadingRecommend.value = true;

  // await nextTick();

  // await useAsyncData(`trending/all/1`, () => getTrending(1))
  //   .then((response) => {
  //     trendings.value = response.data.value?.results;
  //   })
  //   .catch((e) => {
  //     if (axios.isCancel(e)) return;
  //   });

  // await useAsyncData('movie/nowplaying/1', () => getNowPlaying(1))
  getNowPlaying(1)
    .then((response) => {
      nowPlayings.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingNowPlaying.value = false;
    });

  // await useAsyncData(`genres/hoat-hinh/views_desc/1`, () =>
  //   getMoviesByGenres('hoat-hinh', 'views_desc', 1)
  // )
  getMoviesByGenres('hoat-hinh', 'views_desc', 1)
    .then((response) => {
      cartoons.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingCartoon.value = false;
    });

  // await useAsyncData('tv/airingtoday/1', () => getTvAiringToday(1))
  getTvAiringToday(1)
    .then((response) => {
      tvAiringTodays.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingTvAiringToday.value = false;
    });

  // await useAsyncData('movie/upcoming/1', () => getUpComing(1))
  getUpComing(1)
    .then((response) => {
      upComings.value = response?.results.slice(0, 15);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingUpComing.value = false;
    });

  // await useAsyncData('movie/toprated/1', () => getTopRated(1))
  getTopRated(1)
    .then((response) => {
      topRateds.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingTopRated.value = false;
    });

  // await useAsyncData('tv/ontheair/1', () => getTvOntheAir(1))
  getTvOntheAir(1)
    .then((response) => {
      tvOnTheAirs.value = response?.results.slice(0, 12);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingTvOnTheAir.value = false;
    });

  // await useAsyncData('recommend/get/1', () =>
  //   getMyRecommend(skipRecommend.value)
  // )
  getMyRecommend(skipRecommend.value)
    .then((response) => {
      recommends.value = response?.results;
      skipRecommend.value++;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingRecommend.value = false;
    });
};

// const { results: trendings, pending } = await getTrending(1);

// const { data: trendingsCache } = useNuxtData('trending/all/1');

const { data: trendings, pending } = await useAsyncData(
  'trending/all/1',
  () => getTrending(1),
  {
    // default: () => {
    //   return { results: trendingsCache.value || [] };
    // },
    transform: (data: any) => {
      return data.results;
    },
  }
);

getData();

const handleLoadMoreRecommend = async () => {
  loadMoreRecommend.value = true;
  // await useAsyncData(`recommend/get/${skipRecommend.value}`, () =>
  //   getMyRecommend(skipRecommend.value)
  // )
  await getMyRecommend(skipRecommend.value)
    .then((response) => {
      if (response?.results.length > 0) {
        recommends.value = recommends.value.concat(response?.results);
        skipRecommend.value++;

        if (viewMoreRecommend.value == false) {
          viewMoreRecommend.value = true;
        }
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
