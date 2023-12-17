<template>
  <section class="suggested">
    <div class="suggested-list">
      <MovieCardSuggested
        v-for="(item, index) in dataSimilar"
        :index="index"
        :key="index"
        :item="item"
        :type="item.media_type"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getSimilar } from '~/services/similar';
import { getTrending } from '~/services/trending';
import MovieCardSuggested from '~/components/MovieCardSuggested/MovieCardSuggested.vue';

const props = defineProps<{
  dataMovie: any;
}>();

const dataSuggested = ref<any[]>([]);
const page = ref<number>(1);
const loading = ref<boolean>(false);

// getSimilar(
//   props?.dataMovie.media_type,
//   props?.dataMovie.id,
//   pageSimilar.value,
//   20
// )
//   .then((response) => {
//     dataSuggested.value = response?.results;
//   })
//   .catch((e) => {
//     if (axios.isCancel(e)) return;
//   })
//   .finally(() => {
//     loadingSimilar.value = false;
//   });

const { data: dataSimilar } = await useAsyncData(
  `similar/${props?.dataMovie.media_type}/${props?.dataMovie.id}/${page.value}`,
  () =>
    getSimilar(
      props?.dataMovie.media_type,
      props?.dataMovie.id,
      page.value,
      15
    ),
  {
    // lazy: true,
    // immediate: false,
    // server: false,
    transform: (data: any) => {
      return data.results;
    },
  }
);

loading.value = false;
</script>

<style lang="scss" src="./MovieSuggested.scss"></style>
