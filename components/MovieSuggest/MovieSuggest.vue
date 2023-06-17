<template>
  <div class="suggest">
    <div class="similar-section">
      <h2 class="gradient-title-default" v-show="dataSimilar?.length">
        <span>Phim tương tự</span>
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

    <div class="recommend-section">
      <h2 class="gradient-title-default" v-show="dataRecommend?.length">
        <span>Có thể bạn quan tâm</span>
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
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getSimilar } from '~/services/similar';
import { getTrending } from '~/services/trending';
import MovieCardVertical from '../MovieCardVertical/MovieCardVertical.vue';
import CarouselGroup from '@/components/CarouselGroup/CarouselGroup.vue';

const props = defineProps<{
  movieId: number;
  type: string;
}>();
const dataSimilar = ref<any[]>([]);
const dataRecommend = ref<any[]>([]);
const randomRecommend = ref<number>(Math.floor(Math.random() * 50) + 1);

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

const getData = async () => {
  Promise.all([
    useAsyncData(`similar/${props?.type}/${props?.movieId}`, () =>
      getSimilar(props?.type, props?.movieId)
    ),
    useAsyncData(`trending/all/${randomRecommend.value}`, () =>
      getTrending(randomRecommend.value)
    ),
  ])
    .then((response: any) => {
      dataSimilar.value = response[0].data.value?.results;
      dataRecommend.value = response[1].data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};

getData();
</script>

<style lang="scss" src="./MovieSuggest.scss"></style>
