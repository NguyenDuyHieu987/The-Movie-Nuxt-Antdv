<template>
  <div class="movie-follow-item-wrapper">
    <p class="index-item">{{ index + 1 }}</p>
    <el-skeleton :loading="loading" animated class="movie-follow-item">
      <template #template>
        <div class="item-skeleton">
          <div class="img-box">
            <el-skeleton-item class="image-skeleton" />
          </div>
          <div style="margin-top: 7px" class="info">
            <el-skeleton-item variant="text" style="width: 40%" />
            <el-skeleton-item variant="text" style="width: 20%" />
            <el-skeleton-item variant="text" style="width: 30%" />
            <div class="overview">
              <el-skeleton-item variant="text" />
              <el-skeleton-item variant="text" style="width: 50%" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <NuxtLink
          :to="{
            path: isEpisodes
              ? `/info/tv/${item?.id}/${item?.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}`
              : `/info/movie/${item?.id}/${item?.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}`,
          }"
          class="movie-follow-item"
        >
          <div class="img-box">
            <!-- v-if="!loading" -->
            <el-image
              class="ant-image"
              :src="getBackdrop(item?.backdrop_path, ',250')"
              :preview="false"
              :lazy="true"
              loading="lazy"
            />
            <div
              v-show="isInHistory"
              class="percent-viewed"
              :style="{ width: percent * 100 + '%' }"
            ></div>
            <div v-show="isInHistory" class="viewed-overlay-bar"></div>
          </div>

          <div class="info">
            <h2 class="title">
              <strong v-if="!isEpisodes">
                {{ item?.name }}
              </strong>

              <strong v-else>
                {{ item?.name }}
                {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
              </strong>
            </h2>

            <p v-if="isEpisodes" class="duration-episode">
              Tập mới nhất:
              {{
                dataMovie?.last_episode_to_air?.episode_number
                  ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                  : ''
              }}
            </p>

            <p v-else class="duration-episode">
              Thời lượng:
              {{ dataMovie?.runtime ? dataMovie?.runtime + ' phút' : '' }}
            </p>

            <div class="year-views">
              <p class="year" v-if="!isEpisodes">
                Năm:
                {{ dataMovie?.release_date?.slice(0, 4) }}
              </p>

              <p class="year" v-else>
                Năm:
                {{
                  dataMovie?.last_air_date?.slice(0, 4)
                    ? dataMovie?.last_air_date?.slice(0, 4)
                    : dataMovie?.first_air_date?.slice(0, 4)
                }}
              </p>

              <p class="views">
                {{ ViewFormatter(dataMovie?.views) }} lượt xem
              </p>
            </div>

            <p class="overview">
              {{ dataMovie?.overview }}
            </p>

            <div class="action">
              <a-dropdown
                :trigger="['click']"
                placement="bottomRight"
                class="dropdown-viewmore"
              >
                <el-button
                  circle
                  shape="circle"
                  size="large"
                  class="viewmore-btn"
                >
                  <template #icon>
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
                  </template>
                </el-button>

                <template #overlay>
                  <a-menu class="dropdown-item-viewmore">
                    <div class="main-action">
                      <a-menu-item key="play">
                        <template #icon>
                          <!-- <font-awesome-icon icon="fa-solid fa-play" /> -->
                          <!-- <i class="fa-sharp fa-regular fa-play"></i> -->
                          <Icon class="play" name="ic:play-arrow" />
                        </template>

                        <NuxtLink
                          v-if="isEpisodes && !loading"
                          :to="{
                            path: `/play/tv/${item?.id}/${item?.name
                              ?.replace(/\s/g, '+')
                              .toLowerCase()}/tap-1`,
                          }"
                          class="btn-play-now"
                        >
                          <span> Đến trang xem phim </span>
                        </NuxtLink>
                        <NuxtLink
                          v-else-if="!isEpisodes && !loading"
                          :to="{
                            path: `/play/movie/${item?.id}/${item?.name
                              ?.replace(/\s/g, '+')
                              .toLowerCase()}`,
                          }"
                          class="btn-play-now"
                        >
                          <span>Đến trang xem phim</span>
                        </NuxtLink>
                      </a-menu-item>
                      <a-menu-item key="share">
                        <template #icon>
                          <!-- <font-awesome-icon icon="fa-solid fa-share" /> -->
                          <!-- <i class="fa-sharp fa-regular fa-share"></i> -->
                          <svg
                            class="icon share"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 256 256"
                          >
                            <path
                              fill="currentColor"
                              d="m240.49 103.52l-80-80A12 12 0 0 0 140 32v36.74c-25.76 3.12-53.66 15.89-76.75 35.47c-29.16 24.74-47.32 56.69-51.14 90A16 16 0 0 0 39.67 207c10.46-11.14 47-45.74 100.33-50.42V192a12 12 0 0 0 20.48 8.48l80-80a12 12 0 0 0 .01-16.96ZM164 163v-19a12 12 0 0 0-12-12c-49 0-86.57 21.56-109.79 40.11c7.13-18.16 19.63-35.22 36.57-49.59C101.3 103.41 128.67 92 152 92a12 12 0 0 0 12-12V61l51 51Z"
                            />
                          </svg>
                        </template>
                        <span>
                          <ShareNetwork
                            network="facebook"
                            :url="urlShare"
                            :title="item?.name"
                            hashtags="phimhay247.site,vite"
                            style="white-space: nowrap; display: block"
                          >
                            Chia sẻ
                          </ShareNetwork>
                        </span>
                      </a-menu-item>
                    </div>

                    <hr />
                    <div class="danger-zone">
                      <a-menu-item
                        key="remove-list"
                        class="remove-list"
                        @click="handleRemoveFromList"
                      >
                        <template #icon>
                          <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </template>
                        <span>Xóa khỏi Danh sách phát</span>
                      </a-menu-item>
                    </div>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </NuxtLink>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
// import axios from 'axios';
import {
  getBackdrop,
  getMovieById,
  getTvById,
  getItemHistory,
} from '@/services/MovieService';
import axios from 'axios';
import disableScroll from 'disable-scroll';
import { ViewFormatter } from '@/utils/convertViews';
import { handelRemoveItemFromList } from '~/utils/handelAddRemoveItemList_History';

const props = defineProps<{
  item: any;
  index: number;
  type: string | undefined;
  getDataWhenRemoveList: (id: number) => void;
}>();

const store: any = useStore();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>((): string => window.location.href);

onMounted(() => {
  const ant_btn = document.querySelectorAll('.action .viewmore-btn');

  ant_btn?.forEach((btn) => {
    btn?.addEventListener('click', () => {
      if (btn?.classList.contains('ant-dropdown-open')) {
        disableScroll.on();
      } else {
        disableScroll.off();
      }
    });

    btn?.addEventListener('blur', () => {
      disableScroll.off();
    });
  });
});

onBeforeMount(async () => {
  loading.value = true;

  if (props?.type) {
    switch (props?.type) {
      case 'movie':
        isEpisodes.value = false;
        await useAsyncData(`movie/short/${props.item?.id}`, () =>
          getMovieById(props.item?.id)
        )
          .then((movieResponed: any) => {
            dataMovie.value = movieResponed.data.value.data;

            loading.value = false;
          })
          .catch((e) => {
            loading.value = false;
            if (axios.isCancel(e)) return;
          });
        break;
      case 'tv':
        isEpisodes.value = true;

        await useAsyncData(`tv/short/${props.item?.id}`, () =>
          getTvById(props.item?.id)
        )
          .then((tvResponed: any) => {
            dataMovie.value = tvResponed.data.value.data;

            loading.value = false;
          })
          .catch((e) => {
            loading.value = false;
            if (axios.isCancel(e)) return;
          });
        break;
      default:
        break;
    }
  } else {
    if (props?.item?.media_type == 'tv' || props?.item?.type) {
      isEpisodes.value = true;

      await useAsyncData(`tv/short/${props.item?.id}`, () =>
        getTvById(props.item?.id)
      )
        .then((tvResponed: any) => {
          dataMovie.value = tvResponed.data.value.data;

          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
          if (axios.isCancel(e)) return;
        });
    } else {
      isEpisodes.value = false;
      await useAsyncData(`movie/short/${props.item?.id}`, () =>
        getMovieById(props.item?.id)
      )
        .then((movieResponed: any) => {
          dataMovie.value = movieResponed.data.value.data;

          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
          if (axios.isCancel(e)) return;
        });
    }
  }

  if (dataMovie.value?.in_history) {
    isInHistory.value = true;
    percent.value = dataMovie.value?.history_progress?.percent;
  }

  // await useAsyncData(
  //   `itemhistory/${store.$state?.userAccount?.id}/${props.item?.id}`,
  //   () => getItemHistory(props.item?.id)
  // )
  //   .then((movieRespone: any) => {
  //     if (movieRespone.data.value.data.success == true) {
  //       isInHistory.value = true;
  //       percent.value = movieRespone.data.value.data?.result?.percent;
  //     }
  //   })
  //   .catch((e) => {
  //     if (axios.isCancel(e)) return;
  //   });
});

const handleRemoveFromList = async () => {
  if (
    await handelRemoveItemFromList(
      store.$state?.userAccount?.id,
      dataMovie.value?.id
    )
  ) {
    props.getDataWhenRemoveList(props.item?.id);
  }
  return;
};
</script>
<style lang="scss" src="./MovieCardHorizontalFollow.scss"></style>
