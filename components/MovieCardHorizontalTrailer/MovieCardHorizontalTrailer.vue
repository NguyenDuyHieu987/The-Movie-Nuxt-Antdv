<template>
  <NuxtLink
    :to="{
      path: isEpisodes
        ? `/info-tv/${item?.id}/${item?.name
            ?.replace(/\s/g, '+')
            .toLowerCase()}`
        : `/info-movie/${item?.id}/${item?.name
            ?.replace(/\s/g, '+')
            .toLowerCase()}`,
    }"
    class="movie-card-item horizontal trailer"
  >
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item class="skeleton-img" />
        <!-- <div class="content-skeleton">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div> -->
      </template>

      <template #default>
        <div class="img-box">
          <img
            class="ant-image"
            v-lazy="getBackdrop(item?.backdrop_path, ',250')"
            loading="lazy"
          />

          <div v-show="isInHistory" class="viewed-overlay-bar">
            <div
              class="percent-viewed"
              :style="{ width: percent * 100 + '%' }"
            ></div>
          </div>

          <!-- <div v-if="!loading" class="duration-episode-box">
            <p v-if="!isEpisodes" class="duration-episode">
              {{ item?.runtime + ' min' }}
            </p>
            <p v-else class="duration-episode">
              {{
                // dataMovie?.last_episode_to_air?.episode_number
                //   ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                //   : ''

                item?.episode_run_time[0]
                  ? item?.episode_run_time[0] + ' min'
                  : '? min / Ep'
              }}
            </p>
          </div> -->

          <div
            class="youtub-icon"
            v-if="!loading"
            @click.prevent="isOpenModalTrailer = true"
          >
            <font-awesome-icon icon="fa-brands fa-youtube" />
          </div>

          <div
            v-if="
              item?.release_date || item?.last_air_date || item?.first_air_date
            "
            class="release-date-box"
          >
            <p class="release-date" v-if="!isEpisodes">
              {{ item?.release_date?.slice(0, 4) }}
            </p>
            <p v-else class="release-date">
              {{
                item?.last_air_date?.slice(0, 4)
                  ? item?.last_air_date?.slice(0, 4)
                  : item?.first_air_date?.slice(0, 4)
              }}
            </p>
          </div>
        </div>

        <div class="info">
          <p class="title">
            {{ item?.name }}
            <!-- <span v-if="isEpisodes">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </span> -->
          </p>
          <!-- <div class="info-bottom">
            <div class="genres">
              <span
                class="genre-item"
                v-for="(genre, index) in Array.from(item?.genres, (x: any) => x.name)"
                :index="index"
                :key="index"
              >
                {{ genre }}
              </span>
            </div>
          </div> -->
        </div>
      </template>
    </el-skeleton>

    <ModalTrailer
      :isOpenModalTrailer="isOpenModalTrailer"
      :item="item"
      :isEpisodes="isEpisodes"
      @setIsTeleportModal="(data: boolean)=>isOpenModalTrailer = data"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getBackdrop } from '~/services/image';
import { getItemHistory } from '~/services/history';
import ModalTrailer from '@/components/ModalTrailer/ModalTrailer.vue';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isOpenModalTrailer = ref<boolean>(false);

const getData = async () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 500);

  if (props?.type || props?.item?.media_type) {
    switch (props?.type || props?.item?.media_type) {
      case 'movie':
        isEpisodes.value = false;

        break;
      case 'tv':
        isEpisodes.value = true;

        break;
      default:
        break;
    }
  }

  if (store.$state.isLogin) {
    if (dataMovie.value?.in_history) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      await useAsyncData(
        `itemhistory/${store.$state?.userAccount?.id}/${props.item?.id}`,
        () => getItemHistory(props.item?.id)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value.success == true) {
            isInHistory.value = true;
            percent.value = movieRespone.data.value?.result?.percent;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }
  }
};

getData();
</script>
<style lang="scss" src="./MovieCardHorizontalTrailer.scss"></style>
