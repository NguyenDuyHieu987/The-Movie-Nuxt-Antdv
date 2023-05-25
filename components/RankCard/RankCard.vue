<template>
  <NuxtLink
    :to="{
      path:
        item?.type || item?.media_type == 'tv'
          ? `/info/tv/${item?.id}/${item?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}`
          : `/info/movie/${item?.id}/${item?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}`,
    }"
    class="movie-rank-item"
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
      <div class="top">
        <p class="title">
          {{ item?.name }}
          <span v-if="isEpisodes">
            {{ ' - Phần ' + item?.last_episode_to_air?.season_number }}
          </span>
        </p>
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
      </div>
      <div class="bottom">
        <span class="views"
          >{{ utils.viewFormatter(item?.views) }} lượt xem</span
        >
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
// import axios from 'axios';
import { getPoster } from '~/services/movieService';

const utils = useUtils();
const props = defineProps<{
  item: any;
}>();

const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);

onBeforeMount(() => {
  loading.value = true;
});
</script>
<style lang="scss" src="./RankCard.scss"></style>
