<template>
  <div class="home-container">
    <SlideTopicHome />
    <h2 class="gradient-title-default" v-show="nowPlayings?.length">
      <strong>Phim nổi bật</strong>
      <router-link
        :to="{
          name: 'discover',
          params: {
            slug: 'movie',
            slug2: 'nowplaying',
          },
        }"
        style="font-size: 1.8rem"
      >
        <strong class="view-all">Xem tất cả</strong>
      </router-link>
    </h2>
    <carousel
      v-if="nowPlayings?.length"
      :items="4"
      :autoplay="true"
      :loop="true"
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
        1000: {
          items: 4,
        },
        1175: {
          items: 4,
        },
        1300: {
          items: 4,
        },
        1400: {
          items: 5,
        },
        1550: {
          items: 6,
        },
        1700: {
          items: 6,
        },
        1900: {
          items: 7,
        },
        2200: {
          items: 8,
        },
      }"
    >
      <MovieCarouselCardHorizontal
        v-for="(item, index) in nowPlayings"
        :item="item"
        :index="index"
        :key="item.id"
      />
    </carousel>

    <h2 class="gradient-title-default" v-show="tvAiringTodays?.length">
      <strong>Phim bộ mới</strong>
      <router-link
        :to="{
          name: 'discover',
          params: {
            slug: 'movie',
            slug2: 'upcoming',
          },
        }"
        style="font-size: 1.8rem"
      >
        <strong class="view-all">Xem tất cả</strong>
      </router-link>
    </h2>

    <section class="movie-group vertical">
      <MovieCarouselCardVertical
        v-for="(item, index) in tvAiringTodays"
        :index="index"
        :key="item.id"
        :item="item"
      />
    </section>

    <h2 class="gradient-title-default" v-show="upComings?.length">
      <strong>Trailer</strong>

      <router-link
        :to="{
          name: 'discover',
          params: {
            slug: 'movie',
            slug2: 'upcoming',
          },
        }"
        style="font-size: 1.8rem"
      >
        <strong class="view-all">Xem tất cả</strong>
      </router-link>
    </h2>

    <section class="movie-group horizontal">
      <MovieCardHorizontalTrailer
        v-for="(item, index) in upComings"
        :index="index"
        :key="item.id"
        :item="item"
      />
    </section>

    <h2 class="gradient-title-default" v-show="topRateds?.length">
      <strong>Phim chiếu rạp mới</strong>
      <router-link
        :to="{
          name: 'discover',
          params: {
            slug: 'movie',
            slug2: 'toprated',
          },
        }"
        style="font-size: 1.8rem"
      >
        <strong class="view-all">Xem tất cả</strong>
      </router-link>
    </h2>
    <carousel
      v-if="topRateds?.length"
      :items="4"
      :autoplay="true"
      :loop="true"
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
        550: {
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
          items: 5,
        },
        1175: {
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
      <MovieCarouselCardVertical
        v-for="(item, index) in topRateds"
        :item="item"
        :index="index"
        :key="item.id"
      />
    </carousel>
  </div>
</template>

<script>
// @ is an alias to /src
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import carousel from 'vue-owl-carousel/src/Carousel';
import SlideTopicHome from '@/components/Normal/SlideTopicHome/SlideTopicHome.vue';
import MovieCarouselCardHorizontal from '@/components/Normal/MovieCardHorizontal/MovieCardHorizontal.vue';
import MovieCarouselCardVertical from '@/components/Normal/MovieCardVertical/MovieCardVertical.vue';
import MovieCardHorizontalTrailer from '@/components/Normal/MovieCardHorizontalTrailer/MovieCardHorizontalTrailer.vue';
import {
  getNowPlaying,
  getTvAiringToday,
  getTopRated,
  getUpComing,
} from '@/services/MovieService';
import { useMeta } from 'vue-meta';

export default {
  name: 'home',
  components: {
    SlideTopicHome,
    carousel,
    MovieCarouselCardHorizontal,
    MovieCarouselCardVertical,
    MovieCardHorizontalTrailer,
  },
  setup() {
    const nowPlayings = ref([]);
    const upComings = ref([]);
    const tvAiringTodays = ref([]);
    const topRateds = ref([]);

    const btnPrev = ref('<i class="fa-solid fa-chevron-left "></i>');
    const btnNext = ref('<i class="fa-solid fa-chevron-right "></i>');

    useMeta({
      title: 'Phimhay247',
      htmlAttrs: { lang: 'vi', amp: true },
    });

    onBeforeMount(() => {
      Promise.all([
        getNowPlaying(1),
        getUpComing(1),
        getTvAiringToday(1),
        getTopRated(1),
      ])
        .then((response) => {
          nowPlayings.value = response[0].data?.results;
          upComings.value = response[1].data?.results;
          tvAiringTodays.value = response[2]?.data.results;
          topRateds.value = response[3].data?.results;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    });

    return {
      nowPlayings,
      upComings,
      tvAiringTodays,
      topRateds,
      btnPrev,
      btnNext,
    };
  },
};
</script>

<style lang="scss" src="./HomeView.scss"></style>
