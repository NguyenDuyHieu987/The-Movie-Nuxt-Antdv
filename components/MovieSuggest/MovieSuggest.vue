<template>
  <div class="similar-stage">
    <h2 class="gradient-title-default" v-show="dataSimilar?.length">
      <strong>Phim tương tự</strong>
    </h2>
    <carousel
      v-if="dataSimilar?.length"
      class="carousel-group"
      :items="4"
      :autoplay="true"
      :dots="false"
      :autoplayHoverPause="true"
      :autoplayTimeout="5000"
      :margin="7"
      :autoplaySpeed="500"
      :nav="false"
      :responsive="responsive"
    >
      <MovieCardVertical
        v-for="(item, index) in dataSimilar"
        :index="index"
        :key="item.id"
        :item="item"
        :type="item.media_type"
      />

      <template #prev>
        <div class="owl-prev">
          <Icon name="fa6-solid:chevron-left"></Icon>
        </div>
      </template>
      <template #next>
        <div class="owl-next">
          <Icon name="fa6-solid:chevron-right"></Icon>
        </div>
      </template>
    </carousel>
  </div>

  <div class="recommend-stage">
    <h2 class="gradient-title-default" v-show="dataRecommend?.length">
      <strong>Có thể bạn quan tâm</strong>
    </h2>
    <carousel
      v-if="dataRecommend?.length"
      class="carousel-group"
      :items="4"
      :autoplay="true"
      :dots="false"
      :autoplayHoverPause="true"
      :autoplayTimeout="5000"
      :margin="7"
      :autoplaySpeed="500"
      :nav="false"
      :responsive="responsive"
    >
      <MovieCardVertical
        v-for="(item, index) in dataRecommend"
        :item="item"
        :index="index"
        :key="item.id"
        :type="item?.media_type"
      />

      <template #prev>
        <div class="owl-prev">
          <Icon name="fa6-solid:chevron-left"></Icon>
        </div>
      </template>
      <template #next>
        <div class="owl-next">
          <Icon name="fa6-solid:chevron-right"></Icon>
        </div>
      </template>
    </carousel>
  </div>
</template>

<script setup>
import axios from 'axios';
// import carousel from 'vue-owl-carousel/src/Carousel';
import { getSimilar, getTrending } from '@/services/MovieService';
import MovieCardVertical from '../MovieCardVertical/MovieCardVertical.vue';

const props = defineProps({
  movieId: {
    type: Number,
  },
  type: {
    type: String,
  },
});
const dataSimilar = ref([]);
const dataRecommend = ref([]);
const randomRecommend = ref(Math.floor(Math.random() * 50) + 1);
const responsive = ref({
  0: {
    items: 2,
    slideBy: 2,
  },
  500: {
    items: 2,
    slideBy: 2,
  },
  520: {
    items: 3,
    slideBy: 3,
  },
  700: {
    items: 4,
    slideBy: 4,
  },
  800: {
    items: 3,
    slideBy: 3,
  },
  900: {
    items: 4,
    slideBy: 4,
  },
  1175: {
    items: 5,
    slideBy: 5,
  },
  1300: {
    items: 6,
    slideBy: 6,
  },
  1400: {
    items: 6,
    slideBy: 6,
  },
  1550: {
    items: 7,
    slideBy: 7,
  },
  1700: {
    items: 8,
    slideBy: 8,
  },
  1900: {
    items: 9,
    slideBy: 9,
  },
  2000: {
    items: 10,
    slideBy: 10,
  },
  2200: {
    items: 11,
    slideBy: 11,
  },
});

const btnPrev = ref('<i class="fa-solid fa-chevron-left "></i>');
const btnNext = ref('<i class="fa-solid fa-chevron-right "></i>');

onBeforeMount(async () => {
  Promise.all([
    useAsyncData(`similar/${props?.type}/${props?.movieId}`, () =>
      getSimilar(props?.type, props?.movieId)
    ),
    useAsyncData(`trending/all/${randomRecommend.value}`, () =>
      getTrending(randomRecommend.value)
    ),
  ])
    .then((response) => {
      dataSimilar.value = response[0].data.value.data?.results;
      dataRecommend.value = response[1].data.value.data?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});
</script>

<style lang="scss" src="./MovieSuggest.scss"></style>
