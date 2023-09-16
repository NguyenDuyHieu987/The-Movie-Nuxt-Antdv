<template>
  <div class="movie-related">
    <div class="similar-section">
      <h2 class="gradient-title-default">
        <span>Phim tương tự</span>
      </h2>

      <div
        class="movie-group suggest"
        v-show="dataSimilar?.length"
        :class="{ expand: viewMore }"
      >
        <MovieCardSuggest
          v-for="(item, index) in dataSimilar"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>
      <ViewMoreBar
        v-show="dataSimilar?.length"
        :isOpen="viewMore"
        @onClick="viewMore = !viewMore"
      />
    </div>

    <div class="recommend-section">
      <h2 class="gradient-title-default">
        <span>Có thể bạn quan tâm</span>
      </h2>

      <div
        class="movie-group suggest"
        v-show="dataRecommend?.length"
        :class="{ expand: viewMore }"
      >
        <MovieCardSuggest
          v-for="(item, index) in dataRecommend"
          :index="index"
          :key="item.id"
          :item="item"
          :type="item.media_type"
        />
      </div>
      <ViewMoreBar
        v-show="dataRecommend?.length"
        :isOpen="viewMore"
        @onClick="viewMore = !viewMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getSimilar } from '~/services/similar';
import { getTrending } from '~/services/trending';
import ViewMoreBar from '~/components/ViewMoreBar/ViewMoreBar.vue';
import MovieCardSuggest from '~/components/MovieCardSuggest/MovieCardSuggest.vue';

const props = defineProps<{
  movieId: string;
  type: string;
}>();
const dataSimilar = ref<any[]>([]);
const dataRecommend = ref<any[]>([]);
const randomRecommend = ref<number>(Math.floor(Math.random() * 50) + 1);
const viewMore = ref<boolean>(false);

const getData = async () => {
  useAsyncData(`similar/${props?.type}/${props?.movieId}/1`, () =>
    getSimilar(props?.type, props?.movieId, 1, 12)
  )
    .then((response: any) => {
      dataSimilar.value = response.data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  useAsyncData(`trending/all/${randomRecommend.value}`, () =>
    getTrending(randomRecommend.value, 12)
  )
    .then((response: any) => {
      dataRecommend.value = response.data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};

getData();

// const { data: dataSimilar } = await useAsyncData(
//   `similar/${props?.type}/${props?.movieId}/1`,
//   () => getSimilar(props?.type, props?.movieId, 1, 12),
//   {
//     // lazy: true,
//     // immediate: false,
//     // server: false,
//     transform: (data: any) => {
//       return data.results;
//     },
//   }
// );

// const { data: dataRecommend } = await useAsyncData(
//   `trending/all/${randomRecommend.value}`,
//   () => getTrending(randomRecommend.value, 12),
//   {
//     // lazy: true,
//     // immediate: false,
//     // server: false,
//     transform: (data: any) => {
//       return data.results;
//     },
//   }
// );
</script>

<style lang="scss" src="./MovieRelated.scss"></style>
