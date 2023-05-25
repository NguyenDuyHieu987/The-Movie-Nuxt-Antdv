<template>
  <div class="similar-stage">
    <h2 class="gradient-title-default underline" v-show="dataSimilar?.length">
      <strong>Phim tương tự</strong>
    </h2>

    <CarouselGroup :data="dataSimilar" :responsive="responsive">
      <template #content>
        <SwiperSlide v-for="(item, index) in dataSimilar">
          <MovieCardVertical
            :index="index"
            :key="item.id"
            :item="item"
            :type="item.media_type"
          />
        </SwiperSlide>
      </template>
    </CarouselGroup>
  </div>

  <div class="recommend-stage">
    <h2 class="gradient-title-default underline" v-show="dataRecommend?.length">
      <strong>Có thể bạn quan tâm</strong>
    </h2>

    <CarouselGroup :data="dataRecommend" :responsive="responsive">
      <template #content>
        <SwiperSlide v-for="(item, index) in dataRecommend">
          <MovieCardVertical
            :index="index"
            :key="item.id"
            :item="item"
            :type="item.media_type"
          />
        </SwiperSlide>
      </template>
    </CarouselGroup>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
// import carousel from 'vue-owl-carousel/src/Carousel';
import { getSimilar, getTrending } from '~/services/appMovieService';
import MovieCardVertical from '../MovieCardVertical/MovieCardVertical.vue';
import CarouselGroup from '@/components/CarouselGroup/CarouselGroup.vue';

const props = defineProps<{
  movieId: number;
  type: string;
}>();
const dataSimilar = ref<any[]>([]);
const dataRecommend = ref<any[]>([]);
const randomRecommend = ref<number>(Math.floor(Math.random() * 50) + 1);
// const responsive = ref({
//   0: {
//     items: 2,
//     slideBy: 2,
//   },
//   500: {
//     items: 2,
//     slideBy: 2,
//   },
//   520: {
//     items: 3,
//     slideBy: 3,
//   },
//   700: {
//     items: 4,
//     slideBy: 4,
//   },
//   800: {
//     items: 3,
//     slideBy: 3,
//   },
//   900: {
//     items: 4,
//     slideBy: 4,
//   },
//   1175: {
//     items: 5,
//     slideBy: 5,
//   },
//   1300: {
//     items: 6,
//     slideBy: 6,
//   },
//   1400: {
//     items: 6,
//     slideBy: 6,
//   },
//   1550: {
//     items: 7,
//     slideBy: 7,
//   },
//   1700: {
//     items: 8,
//     slideBy: 8,
//   },
//   1900: {
//     items: 9,
//     slideBy: 9,
//   },
//   2000: {
//     items: 10,
//     slideBy: 10,
//   },
//   2200: {
//     items: 11,
//     slideBy: 11,
//   },
// });

const responsive = computed<any>((): any => ({
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
  Promise.all([
    useAsyncData(`similar/${props?.type}/${props?.movieId}`, () =>
      getSimilar(props?.type, props?.movieId)
    ),
    useAsyncData(`trending/all/${randomRecommend.value}`, () =>
      getTrending(randomRecommend.value)
    ),
  ])
    .then((response: any) => {
      dataSimilar.value = response[0].data.value.data?.results;
      dataRecommend.value = response[1].data.value.data?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});
</script>

<style lang="scss" src="./MovieSuggest.scss"></style>
