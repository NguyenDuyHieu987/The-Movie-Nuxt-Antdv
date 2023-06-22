<template>
  <div class="movie-follow-item-wrapper">
    <p class="index-item">{{ index + 1 }}</p>
    <el-skeleton :loading="loading" animated>
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
              <img
                v-lazy="getBackdrop(item?.backdrop_path, ',250')"
                loading="lazy"
              />
            </div>

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
                    <Icon name="fa6-solid:ellipsis-vertical" />
                  </template>
                </el-button>

                <template #overlay>
                  <a-menu>
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

                          <Icon name="ph:share-fat-bold" class="share" />
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
import { getBackdrop } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import axios from 'axios';
import disableScroll from 'disable-scroll';

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
};

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
