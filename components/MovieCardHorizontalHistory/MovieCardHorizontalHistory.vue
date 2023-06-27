<template>
  <div class="movie-history-item-wrapper">
    <p class="timeline" v-if="timeLine?.length">
      <span v-if="timeLine.includes('-')">
        {{ timeLine.split(' - ')[0] }}
        <span style="margin: 0px 5px">-</span>
        {{ timeLine.split(' - ')[1] }}
      </span>
      <span v-else>
        {{ timeLine }}
      </span>
    </p>
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
          class="movie-history-item"
        >
          <div class="img-box">
            <div class="ant-image">
              <img
                v-lazy="getBackdrop(item?.backdrop_path, ',250')"
                loading="lazy"
              />
            </div>

            <div class="viewed-overlay-bar">
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
              <a-tooltip
                title="Xóa khỏi Lịch sử xem"
                content="Xóa khỏi Lịch sử xem"
                effect="dark"
                placement="bottom"
                :teleported="false"
                popper-class="el-tooltip"
                :mouseLeaveDelay="0"
              >
                <el-button
                  circle
                  shape="circle"
                  size="large"
                  text
                  class="remove-btn"
                  @click.prevent="handleRemoveFromHistory"
                >
                  <template #icon>
                    <!-- <Close /> -->
                    <i class="fa-light fa-xmark"></i>
                  </template>
                </el-button>
              </a-tooltip>

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
                  class="viewmore-btn"
                  text
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
                          <Icon class="play" name="ic:play-arrow" />
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
                      <a-menu-item key="add-list" @click="handelAddToList">
                        <template #icon>
                          <!-- <span
                            v-if="isAddToList"
                            class="material-icons-outlined"
                          >
                            playlist_add_check
                          </span>

                          <span v-else class="material-icons-outlined">
                            playlist_add
                          </span> -->

                          <Icon
                            class="icon-material"
                            v-if="isAddToList"
                            name="ic:twotone-playlist-add-check"
                          />
                          <Icon
                            class="icon-material"
                            v-else
                            name="ic:twotone-playlist-add"
                          />
                        </template>

                        <span v-if="isAddToList">Xóa khỏi Danh sách phát</span>
                        <span v-else>Thêm vào Danh sách phát</span>
                      </a-menu-item>

                      <a-menu-item key="share">
                        <template #icon>
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
                        key="remove-history"
                        class="remove-item"
                        @click="handleRemoveFromHistory"
                      >
                        <template #icon>
                          <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </template>
                        <span>Xóa khỏi Lịch sử xem</span>
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
import disableScroll from 'disable-scroll';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

const props = defineProps<{
  item: any;
  prevItem: any;
  type: string | undefined;
  getDataWhenRemoveHistory: (id: number) => void;
}>();

const store: any = useStore();
const utils = useUtils();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const urlShare = computed<string>((): string => window.location.href);
const percent = ref<number>(0);
const isAddToList = ref<boolean>(false);
const differenceDate = ref<number>(0);
const timeLine = ref<string>('');

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
  percent.value = props.item?.percent;

  const prev_date_old = new Date(props.prevItem?.created_at);
  const date_old = new Date(props.item?.created_at);
  const date_new = new Date();
  // console.log(date_old.toISOString().slice(0, 10));
  // console.log(date_new.toISOString());
  differenceDate.value = date_new.getTime() - date_old.getTime();
  const totalDays = Math.round(differenceDate.value / (1000 * 3600 * 24));
  // console.log(totalDays + ' days to world Cup');

  // const moment = require('moment');
  // const date_old1 = moment(date_old).format('DD/MM/YYYY');
  const date_old_moment_format =
    _.capitalize(moment(date_old).locale('vi').fromNow()) +
    ' - ' +
    moment(date_old).locale('vi').format('LL');
  // console.log(moment(date_old).locale('vi').format('dddd'));
  // console.log(moment(date_old).locale('vi').fromNow());

  if (props?.prevItem) {
    if (
      prev_date_old.toISOString().slice(0, 9) !=
      date_old.toISOString().slice(0, 9)
    ) {
      switch (totalDays) {
        case 0:
          timeLine.value = 'Hôm nay';
          break;
        case 1:
          timeLine.value = 'Hôm qua';
          break;
        // case 2:
        //   timeLine.value = '2 Ngày trước';
        //   break;
        // case 3:
        //   timeLine.value = '3 Ngày trước';
        //   break;
        // case 4:
        //   timeLine.value = '4 Ngày trước';
        //   break;
        // case 5:
        //   timeLine.value = '5 Ngày trước';
        //   break;
        // case 6:
        //   timeLine.value = '6 Ngày trước';
        //   break;
        // case 7:
        //   timeLine.value = '1 Tuần trước';
        //   break;
        default:
          timeLine.value = date_old_moment_format;
          break;
      }
    }
  } else {
    switch (totalDays) {
      case 0:
        timeLine.value = 'Hôm nay';
        break;
      case 1:
        timeLine.value = 'Hôm qua';
        break;
      default:
        timeLine.value = date_old_moment_format;
        break;
    }
  }

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

  if (dataMovie.value?.in_list) {
    isAddToList.value = true;
  }

  // await useAsyncData(
  //   `itemlist/${store.$state?.userAccount?.id}/${props.item?.id}`,
  //   () => getItemList( props.item?.id)
  // )
  //   .then((movieRespone: any) => {
  //     if (movieRespone.data.value.data.success == true) {
  //       isAddToList.value = true;
  //     }
  //   })
  //   .catch((e) => {
  //     if (axios.isCancel(e)) return;
  //   });
};

getData();

const handelAddToList = () => {
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (
      !utils.handelAddItemToList(dataMovie.value?.id, props.item.media_type)
    ) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (!utils.handelRemoveItemFromList(dataMovie.value?.id)) {
      isAddToList.value = true;
    }
    return;
  }
};

const handleRemoveFromHistory = async () => {
  if (await utils.handleRemoveItemFromHistory(dataMovie.value?.id)) {
    props.getDataWhenRemoveHistory(props.item?.id);
  }
  return;
};
</script>
<style lang="scss" src="./MovieCardHorizontalHistory.scss"></style>
