<template>
  <div class="movie-card-item-suggest">
    <el-skeleton :loading="loading" animated>
      <template #template>
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
      </template>

      <template #default>
        <div class="img-box" @click="onClickPlay">
          <!-- v-lazy="getBackdrop(item?.backdrop_path, ',300')" -->
          <img
            class="ant-image"
            v-lazy="getImage(item?.backdrop_path + '/tr:h-250', 'backdrop')"
            loading="lazy"
          />

          <div v-show="isInHistory" class="viewed-overlay-bar">
            <div
              class="percent-viewed"
              :style="{ width: percent * 100 + '%' }"
            ></div>
          </div>

          <div class="play-icon">
            <Icon name="ic:play-arrow" class="play" />
          </div>
        </div>

        <NuxtLink
          class="info"
          :to="{
            path: isEpisodes
              ? `/info-tv/${item?.id}/${item?.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}`
              : `/info-movie/${item?.id}/${item?.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}`,
          }"
        >
          <p class="title">
            {{ item?.name }}
            <!-- <span v-if="isEpisodes">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </span> -->
          </p>
          <div class="middle">
            <div class="left">
              <div
                v-if="
                  item?.release_date ||
                  item?.last_air_date ||
                  item?.first_air_date
                "
                class="release-date-box"
              >
                <span v-if="!isEpisodes" class="release-date">
                  {{ item?.release_date?.slice(0, 4) }}
                </span>
                <span v-else class="release-date">
                  {{
                    item?.last_air_date?.slice(0, 4)
                      ? item?.last_air_date?.slice(0, 4)
                      : item?.first_air_date?.slice(0, 4)
                  }}
                </span>
              </div>
              <span class="views">
                {{ utils.viewFormatter(item?.views) }} lượt xem
              </span>
            </div>
            <div class="right">
              <a-button
                class="add"
                shape="circle"
                size="large"
                type="text"
                @click.prevent="handelAddToList"
              >
                <template #icon>
                  <Icon v-if="isAddToList" name="ic:baseline-check" />
                  <Icon v-else name="ic:baseline-plus" />
                </template>
              </a-button>
            </div>
          </div>
          <div class="bottom">
            <p class="overview">
              {{
                item?.overview ||
                'Sorry! This movie has not been updated overview content.'
              }}
            </p>
          </div>
        </NuxtLink>
      </template>
    </el-skeleton>

    <ModalTrailer
      :isOpenModalTrailer="isOpenModalTrailer"
      :item="item"
      :isEpisodes="isEpisodes"
      @setIsTeleportModal="(data: boolean)=>isOpenModalTrailer = data"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getBackdrop, getImage } from '~/services/image';
import { getItemHistory } from '~/services/history';
import { getItemList } from '~/services/list';
import ModalTrailer from '@/components/ModalTrailer/ModalTrailer.vue';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';

const props = defineProps<{
  item: any;
  type: string;
}>();

const utils = useUtils();
const store = useStore();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isOpenModalTrailer = ref<boolean>(false);
const isAddToList = ref<boolean>(false);

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
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      await useAsyncData(
        `itemlist/${store.$state?.userAccount?.id}/${props.item?.id}`,
        () => getItemList(props.item?.id)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value.success == true) {
            isAddToList.value = true;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }

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

const handelAddToList = (e: any) => {
  if (!store.$state?.isLogin) {
    store.$state.openRequireAuthDialog = true;
    return;
  }
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (!utils.handelAddItemToList(props.item?.id, props.item.media_type)) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (!utils.handelRemoveItemFromList(props.item?.id)) {
      isAddToList.value = true;
    }
    return;
  }
};

const onClickPlay = () => {
  navigateTo({
    path: isEpisodes.value
      ? `/play-tv/${props.item?.id}/${props.item?.name
          ?.replace(/\s/g, '+')
          .toLowerCase()}/tap-1`
      : `/play-movie/${props.item?.id}/${props.item?.name
          ?.replace(/\s/g, '+')
          .toLowerCase()}`,
  });
};
</script>
<style lang="scss" src="./MovieCardSuggest.scss"></style>
