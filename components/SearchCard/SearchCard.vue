<template>
  <NuxtLink
    :to="{
      path: `/info/${type}/${item?.id}/${
        item?.name
          ? item?.name?.replace(/\s/g, '+').toLowerCase()
          : item?.title?.replace(/\s/g, '+').toLowerCase()
      }`,
    }"
    class="movie-search-item"
  >
    <div class="img-box">
      <el-image
        class="ant-image"
        :src="getPoster(item?.poster_path)"
        :preview="false"
        :lazy="true"
        loading="lazy"
      />
    </div>

    <div class="info">
      <h3 class="title">
        {{ item?.name ? item?.name : item?.title }}
        <span v-if="isEpisodes">
          {{ ' - Phần ' + item?.last_episode_to_air?.season_number }}
        </span>
      </h3>
      <p class="genres">
        {{ Array?.from(item?.genres, (x: any) => x.name).join(' • ') }}
      </p>

      <p class="release-date">
        Năm:
        {{ item?.release_date ? item?.release_date : item?.first_air_date }}
      </p>
      <p v-if="item?.last_episode_to_air" class="duration-episode">
        Tập mới nhất:
        {{
          item?.last_episode_to_air?.episode_number
            ? 'Tập ' + item?.last_episode_to_air?.episode_number
            : ''
        }}
      </p>
      <p v-else-if="item?.runtime" class="duration-episode">
        Thời lượng:
        {{ item?.runtime ? item?.runtime + ' phút' : '' }}
      </p>

      <p class="views">
        <!-- Lượt xem: -->
        {{ item?.views ? ViewFormatter(item?.views) + ' lượt xem' : '' }}
      </p>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
// import axios from 'axios';
import {
  getAllGenresById,
  getPoster,
  // getTvById,
  // getMovieById,
} from '@/services/MovieService';
import { ViewFormatter } from '@/utils/convertViews';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);

onBeforeMount(() => {
  loading.value = true;
});
</script>
<style lang="scss" src="./SearchCard.scss"></style>
