<template>
  <NuxtLink
    :to="{
      path:
        item?.media_type == 'movie'
          ? `/info/movie/${item?.id}/${
              item?.name
                ? item?.name?.replace(/\s/g, '+').toLowerCase()
                : item?.title?.replace(/\s/g, '+').toLowerCase()
            }`
          : `/info/tv/${item?.id}/${
              item?.name
                ? item?.name?.replace(/\s/g, '+').toLowerCase()
                : item?.title?.replace(/\s/g, '+').toLowerCase()
            }`,
    }"
    class="topic-item"
  >
    <el-image
      :src="getBackdrop(item?.backdrop_path)"
      :preview="false"
      loading="lazy"
      lazy
    ></el-image>

    <!-- <img
      class="ant-image"
      v-lazy="getBackdrop(item?.backdrop_path)"
      :preview="false"
      loading="lazy"
      lazy
    /> -->

    <div class="topic-item-info">
      <div class="topic-item-info-head">
        <img class="pngegg" src="/images/pngegg.png" />
        <p>
          <span class="release-date">
            {{
              item?.release_date
                ? item?.release_date
                : item?.last_air_date
                ? item?.last_air_date
                : item?.first_air_date
            }}
          </span>

          <span class="genres">
            {{
              getAllGenresById(item?.genre_ids, store.$state?.allGenres).join(
                ' • '
              )
            }}
          </span>

          <!-- {{ getAllGenresById(item?.genres).join(' • ') }} -->
          <!-- <span class="genres" v--else-if="data?.genres">
              {{ Array.from(item?.genres, (x) => x.name).join(' • ') }}
            </span> -->
        </p>
      </div>

      <h1 class="title">
        {{ item?.name ? item?.name : item?.title }}
      </h1>

      <p class="overview">{{ item?.overview }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
// import axios from 'axios';
import { getAllGenresById, getBackdrop } from '@/services/MovieService';

const props = defineProps({
  item: {
    type: Object,
  },
});
const store = useStore();
</script>

<style lang="scss" src="./SlideTopicItem.scss"></style>
