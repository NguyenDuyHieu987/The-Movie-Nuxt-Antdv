<template>
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
    ref="cardItem"
    class="movie-card-item vertical"
    @mouseenter="onMouseEnter"
  >
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item class="skeleton-img" />

        <div class="content-skeleton">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div>
      </template>

      <template #default>
        <div class="img-box">
          <img
            class="ant-image"
            v-lazy="getPoster(item?.poster_path)"
            :preview="false"
            :lazy="true"
            loading="lazy"
          />

          <!-- <a-skeleton-image v-else class="ant-image" /> -->

          <div
            v-if="isInHistory"
            class="percent-viewed"
            :style="{ width: percent * 100 + '%' }"
          ></div>
          <div v-if="isInHistory" class="viewed-overlay-bar"></div>

          <div v-if="!loading" class="duration-episode-box">
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
                  : '? min'
              }}
            </p>
          </div>

          <div v-if="!loading" class="release-date-box">
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
          <a-skeleton
            :loading="loading"
            :active="true"
            :paragraph="{ rows: 2 }"
            :title="false"
          >
            <p class="title">
              {{ item?.name }}
              <!-- <span v-if="isEpisodes">
                {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
              </span> -->
            </p>
            <div class="info-bottom">
              <div class="genres">
                <span
                  class="genre-item"
                  v-for="(genre, index) in Array.from(item?.genres, (x: any) => x.name)"
                  :index="index"
                  :key="index"
                >
                  {{ genre }}
                </span>
                <!-- {{ Array?.from(item?.genres, (x: any) => x.name).join(' • ') }} -->
              </div>
            </div>
          </a-skeleton>
        </div>
      </template>
    </el-skeleton>

    <!-- <div class="detail-flow">
      <div class="backdrop-box">
        <img
          class="ant-image"
          v-lazy="getBackdrop(item?.backdrop_path, ',250')"
          :preview="false"
          :lazy="true"
          loading="lazy"
        />

        <div
          v-if="isInHistory"
          class="percent-viewed"
          :style="{ width: percent * 100 + '%' }"
        ></div>
        <div v-if="isInHistory" class="viewed-overlay-bar"></div>
      </div>

      <div class="bottom-content">
        <div class="widget">
          <div class="left">
            <a-tooltip
              :teleported="false"
              title="Xem ngay"
              content="Xem ngay"
              placement="top"
            >
              <NuxtLink
                v-if="isEpisodes"
                :to="{
                  path: `/play/tv/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}/tap-1`,
                }"
                class="btn-play-now"
              >
                <a-button shape="circle" size="large" type="text">
                  <template #icon>
                    <Icon name="ic:play-arrow" />
                  </template>
                </a-button>
              </NuxtLink>
              <NuxtLink
                v-else
                :to="{
                  path: `/play/movie/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}`,
                }"
                class="btn-play-now"
              >
                <a-button shape="circle" size="large" type="text">
                  <template #icon>
                    <Icon name="ic:play-arrow" />
                  </template>
                </a-button>
              </NuxtLink>
            </a-tooltip>

            <a-tooltip
              :teleported="false"
              :title="
                !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
              "
              :content="
                !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
              "
              placement="top"
            >
              <a-button
                shape="circle"
                size="large"
                type="text"
                @click.prevent="handelAddToList"
              >
                <template #icon>
                  <font-awesome-icon
                    v-if="isAddToList"
                    icon="fa-solid fa-check"
                  />
                  <PlusOutlined v-else />
                </template>
              </a-button>
            </a-tooltip>

            <a-tooltip
              :teleported="false"
              title="Chia sẻ"
              content="Chia sẻ"
              placement="top"
            >
              <ShareNetwork
                network="facebook"
                :url="urlShare"
                :title="item?.name"
                hashtags="phimhay247.site,vite"
                style="white-space: nowrap; display: block"
              >
                <a-button
                  shape="circle"
                  size="large"
                  type="text"
                  @click.prevent=""
                >
                  <template #icon>
                    <font-awesome-icon icon="fa-solid fa-share" />
                  </template>
                </a-button>
              </ShareNetwork>
            </a-tooltip>
          </div>

          <div class="right">
            <a-tooltip
              :teleported="false"
              title="Chi tiết phim"
              content="Chi tiết phim"
              placement="top"
            >
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
              >
                <a-button shape="circle" size="large" type="text">
                  <template #icon>
                    <InfoOutlined />
                  </template>
                </a-button>
              </NuxtLink>
            </a-tooltip>
          </div>
        </div>
        <div class="info">
          <h3 class="title">
            {{ item?.name }}
            <span v-if="isEpisodes">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </span>
          </h3>

          <div class="info-bottom">
            <p class="genres">
              {{ Array.from(item?.genres, (x: any) => x.name).join(' • ') }}
            </p>
          </div>

          <div class="views-imdb">
            <p class="views">{{ ViewFormatter(dataMovie?.views) }} lượt xem</p>

            <p>
              <span
                style="color: green; font-weight: bold"
                v-if="dataMovie?.vote_average >= 8"
              >
                {{ dataMovie?.vote_average.toFixed(2) }}
              </span>
              <span
                style="color: yellow; font-weight: bold"
                v-if="
                  dataMovie?.vote_average >= 5 && dataMovie?.vote_average < 8
                "
              >
                {{ dataMovie?.vote_average.toFixed(2) }}
              </span>
              <span
                style="color: red; font-weight: bold"
                v-if="dataMovie?.vote_average < 5"
              >
                {{ dataMovie?.vote_average.toFixed(2) }}
              </span>
              diểm /
              {{ dataMovie?.vote_count + ' lượt' }}
            </p>
          </div>
        </div>
      </div>
    </div> -->

    <PreviewModal
      :isTeleportPreviewModal="isTeleportPreviewModal"
      v-model="isTeleportPreviewModal"
      :item="item"
      :style="{
        left: left,
        top: top,
        offsetHeight: offsetHeight,
        offsetWidth: offsetWidth,
        imgHeight: imgHeight,
        imgWidth: imgWidth,
      }"
      :interval="interval"
      :isEpisodes="isEpisodes"
      @setIsTeleportModal="(data : boolean) => (isTeleportPreviewModal = data)"
    />
  </NuxtLink>
</template>
<script setup lang="ts">
import axios from 'axios';
import { getPoster, getItemHistory } from '~/services/appMovieService';
import PreviewModal from '@/components/PreviewModal/PreviewModal.vue';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store: any = useStore();
const utils = useUtils();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>((): string => window.location.href);
const isTeleportPreviewModal = ref<boolean>(false);
const cardItem = ref<any>(null);
const left = ref<number>(0);
const top = ref<number>(0);
const offsetWidth = ref<number>(0);
const offsetHeight = ref<number>(0);
const imgHeight = ref<number>(0);
const imgWidth = ref<number>(0);
const interval = ref<any>();

const onMouseEnter = (e: any) => {
  if (e.target) {
    const rect = e.target.getBoundingClientRect();

    const offsetX = rect.left;
    const offsetY = window.scrollY + rect.top;
    let width = (16 / 100) * window.innerWidth;
    let height = (15.5 / 100) * window.innerWidth;
    if (width < 350) {
      width = 350;
    }
    if (height < 330) {
      height = 330;
    }

    // left.value = offsetX + e.target.offsetWidth / 2 - width / 2;
    // top.value = offsetY + e.target.offsetHeight / 2 - height / 2;

    left.value = offsetX + e.target.offsetWidth / 2;
    top.value = offsetY + e.target.offsetHeight / 2;

    offsetWidth.value = e.target.offsetWidth;
    offsetHeight.value = e.target.offsetHeight;

    imgHeight.value = e.target.querySelector('img').offsetHeight;
    imgWidth.value = e.target.querySelector('img').offsetWidth;

    interval.value = setTimeout(() => {
      isTeleportPreviewModal.value = true;
    }, 2000);

    e.target.addEventListener('mouseleave', () => {
      // isTeleportPreviewModal.value = false;
      clearInterval(interval.value);
    });
  }
};

onMounted(() => {
  // cardItem.value?.addEventListener('mouseenter', (e: any) => {});
  // cardItem.value?.addEventListener('mouseenter', (e: any) => {
  //   const rect = cardItem.value.getBoundingClientRect();
  //   const detailFlow = cardItem.value.getElementsByClassName(
  //     'detail-flow'
  //   )[0] as HTMLElement;
  //   if (detailFlow?.style) {
  //     // if (rect.left <= 300) {
  //     if (e.x - cardItem.value.offsetWidth <= 230) {
  //       detailFlow.style.left = '10px';
  //       detailFlow.style.right = 'auto';
  //       detailFlow.style.transform =
  //         'translateX(0%) translateY(-50%) scale(1.1)';
  //     }
  //     if (window.innerWidth - e.x <= cardItem.value.offsetWidth) {
  //       detailFlow.style.left = 'auto';
  //       detailFlow.style.right = '10px';
  //       detailFlow.style.transform =
  //         'translateX(0%) translateY(-50%) scale(1.1)';
  //     }
  //   }
  // });
});

onBeforeMount(async () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 500);

  if (props?.type) {
    switch (props?.type) {
      case 'movie':
        isEpisodes.value = false;

        // await useAsyncData(`movie/short/${props.item?.id}`, () =>
        //   getMovieById(props.item?.id)
        // )
        //   .then((movieResponed: any) => {
        //     dataMovie.value = movieResponed.data.value.data;

        //     loading.value = false;
        //   })
        //   .catch((e) => {
        //     loading.value = false;
        //     if (axios.isCancel(e)) return;
        //   });
        break;
      case 'tv':
        isEpisodes.value = true;

        // await useAsyncData(`tv/short/${props.item?.id}`, () =>
        //   getTvById(props.item?.id)
        // )
        //   .then((tvResponed: any) => {
        //     dataMovie.value = tvResponed.data.value.data;

        //     loading.value = false;
        //   })
        //   .catch((e) => {
        //     loading.value = false;
        //     if (axios.isCancel(e)) return;
        //   });
        break;
      default:
        break;
    }
  } else {
    if (props?.item?.media_type == 'tv' || props?.item?.type) {
      isEpisodes.value = true;

      // await useAsyncData(`tv/short/${props.item?.id}`, () =>
      //   getTvById(props.item?.id)
      // )
      //   .then((tvResponed: any) => {
      //     dataMovie.value = tvResponed.data.value.data;

      //     loading.value = false;
      //   })
      //   .catch((e) => {
      //     loading.value = false;
      //     if (axios.isCancel(e)) return;
      //   });
    } else {
      isEpisodes.value = false;

      // await useAsyncData(`movie/short/${props.item?.id}`, () =>
      //   getMovieById(props.item?.id)
      // )
      //   .then((movieResponed: any) => {
      //     dataMovie.value = movieResponed.data.value.data;

      //     loading.value = false;
      //   })
      //   .catch((e) => {
      //     loading.value = false;
      //     if (axios.isCancel(e)) return;
      //   });
    }
  }

  if (store.$state.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    if (dataMovie.value?.in_history) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    }

    // await useAsyncData(
    //   `itemlist/${store.$state?.userAccount?.id}/${props.item?.id}`,
    //   () => getItemList(store.$state?.userAccount?.id, props.item?.id)
    // )
    //   .then((movieRespone: any) => {
    //     if (movieRespone.data.value.data.success == true) {
    //       isAddToList.value = true;
    //     }
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });

    await useAsyncData(
      `itemhistory/${store.$state?.userAccount?.id}/${props.item?.id}`,
      () => getItemHistory(props.item?.id)
    )
      .then((movieRespone: any) => {
        if (movieRespone.data.value.data.success == true) {
          isInHistory.value = true;
          percent.value = movieRespone.data.value.data?.result?.percent;
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }
});

const handelAddToList = () => {
  if (!store.$state?.isLogin) {
    store.$state.openRequireAuthDialog = true;
    return;
  }
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
</script>
<style lang="scss" src="./MovieCardVertical.scss"></style>
