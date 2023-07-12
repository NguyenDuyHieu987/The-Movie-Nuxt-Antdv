<template>
  <div class="movie-follow-item-wrapper">
    <p class="index-item">{{ index + 1 }}</p>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="skeleton-img" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item variant="text" style="width: 40%" />
          <el-skeleton-item variant="text" style="width: 20%" />
          <el-skeleton-item variant="text" style="width: 30%" />
          <div class="overview">
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" style="width: 50%" />
          </div>
        </div>
      </template>
      <template #default>
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
          class="movie-follow-item"
        >
          <div class="img-box">
            <!-- <el-image
              class="ant-image"
              :src="getBackdrop(item?.backdrop_path, ',250')"
              :preview="false"
              :lazy="true"
              loading="lazy"
              @load="onLoadImg"
            /> -->

            <div class="ant-image">
              <!-- v-lazy="getBackdrop(item?.backdrop_path, ',250')" -->
              <img
                v-lazy="getImage(item?.backdrop_path, 'backdrop', 'h_250')"
                loading="lazy"
              />
            </div>

            <div v-show="isInHistory" class="viewed-overlay-bar">
              <div
                class="percent-viewed"
                :style="{ width: percent * 100 + '%' }"
              ></div>
            </div>
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

            <!-- <p v-if="isEpisodes" class="duration-episode">
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
            </p> -->

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
                {{ utils.viewFormatter(dataMovie?.views) }} lượt xem
              </p>
            </div>

            <p class="overview">
              {{
                dataMovie?.overview ||
                'Sorry! This movie has not been updated overview content.'
              }}
            </p>

            <div class="action">
              <a-dropdown
                :trigger="['click']"
                placement="bottomRight"
                overlayClassName="dropdown-item-viewmore"
                class="dropdown-item-viewmore"
              >
                <el-button
                  circle
                  shape="circle"
                  size="large"
                  text
                  class="viewmore-btn"
                >
                  <template #icon>
                    <!-- <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" /> -->
                    <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.9rem"
                      height="1.9rem"
                      viewBox="0 0 512 512"
                    >
                      <circle cx="256" cy="256" r="48" fill="currentColor" />
                      <circle cx="256" cy="416" r="48" fill="currentColor" />
                      <circle cx="256" cy="96" r="48" fill="currentColor" />
                    </svg>
                  </template>
                </el-button>

                <template #overlay>
                  <a-menu>
                    <div class="main-action">
                      <a-menu-item key="play">
                        <template #icon>
                          <!-- <Icon class="play" name="ci:play-arrow" /> -->

                          <svg
                            class="play"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path fill="currentColor" d="M8 5v14l11-7z" />
                          </svg>
                        </template>

                        <NuxtLink
                          v-if="isEpisodes && !loading"
                          :to="{
                            path: `/play-tv/${item?.id}/${item?.name
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
                            path: `/play-movie/${item?.id}/${item?.name
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
                          <!-- <Icon name="ph:share-fat-bold"  /> -->

                          <svg
                            class="share"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8rem"
                            height="1.8rem"
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
                        class="remove-item"
                        @click="handleRemoveFromList"
                      >
                        <template #icon>
                          <!-- <Icon name="fa6-solid:trash-can" /> -->

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5rem"
                            height="1.5rem"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                            />
                          </svg>
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
import { getBackdrop, getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import axios from 'axios';
import disableScroll from 'disable-scroll';
import { ElButton, ElSkeleton, ElSkeletonItem } from 'element-plus';

const props = defineProps<{
  item: any;
  index: number;
  type: string | undefined;
  getDataWhenRemoveList: (id: number) => void;
}>();

const store = useStore();
const utils = useUtils();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const loadingImg = ref<boolean>(false);
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

const getData = async () => {
  loading.value = true;

  if (props?.type || props?.item?.media_type) {
    switch (props?.type || props?.item?.media_type) {
      case 'movie':
        isEpisodes.value = false;
        await useAsyncData(`movie/short/${props.item?.id}`, () =>
          getMovieById(props.item?.id)
        )
          .then((movieResponed: any) => {
            dataMovie.value = movieResponed.data.value;

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
            dataMovie.value = tvResponed.data.value;

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
  }

  if (dataMovie.value?.in_history) {
    isInHistory.value = true;
    percent.value = dataMovie.value?.history_progress?.percent;
  }

  // await useAsyncData(
  //   `itemhistory/${store?.userAccount?.id}/${props.item?.id}`,
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
};

onBeforeMount(() => {});
getData();

const handleRemoveFromList = async () => {
  if (await utils.handelRemoveItemFromList(dataMovie.value?.id)) {
    props.getDataWhenRemoveList(props.item?.id);
  }
  return;
};

const onLoadImg = (e: any) => {
  loadingImg.value = true;
};
</script>
<style lang="scss" src="./MovieCardHorizontalFollow.scss"></style>
