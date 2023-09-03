<template>
  <NuxtLink
    :to="{
      path:
        item?.type || item?.media_type == 'tv'
          ? `/info-tv/${item?.id}/${utils
              .removeVietnameseTones(item?.name)
              ?.replace(/\s/g, '+')
              .toLowerCase()}`
          : `/info-movie/${item?.id}/${utils
              .removeVietnameseTones(item?.name)
              ?.replace(/\s/g, '+')
              .toLowerCase()}`,
    }"
    class="movie-rank-item"
  >
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="skeleton-img" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item variant="text" style="width: 80%" />
          <el-skeleton-item variant="text" style="width: 60%" />
          <el-skeleton-item variant="text" style="width: 70%" />
          <el-skeleton-item variant="text" style="width: 50%" />
        </div>
      </template>

      <template #default>
        <div class="img-box">
          <div class="ant-image">
            <img
              v-lazy="getImage(item?.poster_path, 'poster', 'w-120')"
              loading="lazy"
            />
          </div>
        </div>

        <div class="info">
          <div class="top">
            <p class="title">
              {{ item?.name }}
              <span v-if="type == 'tv'">
                {{ ' - Phần ' + item?.last_episode_to_air?.season_number }}
              </span>
            </p>
            <p class="genres">
              {{ Array?.from(item?.genres, (x: any) => x.name).join(' • ') }}
            </p>

            <p class="release-date">
              Năm:
              {{
                item?.release_date ? item?.release_date : item?.first_air_date
              }}
            </p>

            <p v-if="type == 'movie'" class="duration-episode">
              Thời lượng:
              {{ item?.runtime + ' phút' || '' }}
            </p>

            <p v-if="type == 'tv'" class="duration-episode">
              Tập mới nhất:
              {{ 'Tập ' + item?.last_episode_to_air?.episode_number || '' }}
            </p>
          </div>
          <div class="bottom">
            <span class="views"
              >{{ utils.viewFormatter(item?.views) }} lượt xem</span
            >
          </div>
        </div>
      </template>
    </el-skeleton>
  </NuxtLink>
</template>

<script setup lang="ts">
// import axios from 'axios';
// import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import { getImage } from '~/services/image';

const utils = useUtils();
const props = defineProps<{
  item: any;
  type: string;
}>();

const loading = ref<boolean>(false);

onBeforeMount(() => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
<style lang="scss" src="./RankCard.scss"></style>
