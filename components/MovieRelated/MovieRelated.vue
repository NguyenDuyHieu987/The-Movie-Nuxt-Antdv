<template>
  <div class="movie-related">
    <div class="similar-section">
      <h2 class="gradient-title-default">
        <span>Phim tương tự</span>
      </h2>

      <el-skeleton
        class="movie-group-suggest-skeleton"
        :loading="loadingSimilar"
        animated
      >
        <template #template>
          <div
            class="movie-card-item-suggest"
            v-for="(item, index) in 10"
            :index="index"
            :key="index"
            :item="item"
          >
            <div class="img-box">
              <el-skeleton-item class="skeleton-img" />
            </div>
            <div class="content-skeleton">
              <div class="top">
                <div class="left">
                  <el-skeleton-item variant="text" style="width: 70%" />
                  <el-skeleton-item variant="text" style="width: 100%" />
                </div>
                <el-skeleton-item class="circle" />
              </div>

              <div class="bottom">
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
              </div>
            </div>
          </div>
        </template>

        <template #default>
          <div class="movie-group suggest" :class="{ expand: viewMore }">
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
        </template>
      </el-skeleton>
    </div>

    <div class="recommend-section">
      <h2 class="gradient-title-default">
        <span>Có thể bạn quan tâm</span>
      </h2>

      <el-skeleton
        class="movie-group-suggest-skeleton"
        :loading="loadingRecommend"
        animated
      >
        <template #template>
          <div
            class="movie-card-item-suggest"
            v-for="(item, index) in 10"
            :index="index"
            :key="index"
            :item="item"
          >
            <div class="img-box">
              <el-skeleton-item class="skeleton-img" />
            </div>
            <div class="content-skeleton">
              <div class="top">
                <div class="left">
                  <el-skeleton-item variant="text" style="width: 70%" />
                  <el-skeleton-item variant="text" style="width: 100%" />
                </div>
                <el-skeleton-item class="circle" />
              </div>

              <div class="bottom">
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" />
              </div>
            </div>
          </div>
        </template>

        <template #default>
          <div class="movie-group suggest" :class="{ expand: viewMore }">
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
        </template>
      </el-skeleton>
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
const loadingSimilar = ref<boolean>(false);
const loadingRecommend = ref<boolean>(false);

const getData = async () => {
  loadingSimilar.value = true;
  loadingRecommend.value = true;

  // useAsyncData(`similar/${props?.type}/${props?.movieId}/1`, () =>
  //   getSimilar(props?.type, props?.movieId, 1, 12)
  // )
  getSimilar(props?.type, props?.movieId, 1, 12)
    .then((response) => {
      dataSimilar.value = response?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingSimilar.value = false;
    });

  // useAsyncData(`trending/all/${randomRecommend.value}`, () =>
  //   getTrending(randomRecommend.value, 12)
  // )
  getTrending(randomRecommend.value, 12)
    .then((response) => {
      dataRecommend.value = response?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingRecommend.value = false;
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
