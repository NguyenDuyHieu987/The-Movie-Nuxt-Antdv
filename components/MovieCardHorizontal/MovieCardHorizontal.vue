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
    class="movie-card-item horizontal"
    ref="cardItem"
    @mouseenter="onMouseEnter"
  >
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="ant-image" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div>
      </template>

      <template #default>
        <div class="img-box">
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

          <div class="duration-episode-box">
            <p v-if="!isEpisodes" class="duration-episode">
              {{ item?.runtime + ' min' }}
            </p>
            <p v-else class="duration-episode">
              {{
                dataMovie?.last_episode_to_air?.episode_number
                  ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                  : ''
              }}
            </p>
          </div>

          <div class="release-date-box">
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
          <!-- <a-skeleton
                :loading="loading"
                :active="true"
                :paragraph="{ rows: 2 }"
                :title="false"
              > -->
          <p class="title">
            {{ item?.name }}
            <span v-if="isEpisodes">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </span>
          </p>
          <div class="info-bottom">
            <p class="genres">
              {{ Array.from(item?.genres, (x: any) => x.name).join(' • ') }}
            </p>
          </div>
          <!-- </a-skeleton> -->
        </div>
      </template>
    </el-skeleton>

    <!-- <div class="detail-flow">
      <div class="backdrop-box">
        <img
          class="ant-image"
          v-show="!loading"
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
    <Teleport to="#__nuxt" v-if="isTeleportPreviewModal">
      <div class="preview-overlay">
        <div
          ref="previewModal"
          class="preview-modal"
          :style="{
            left: x + 'px',
            top: y + 'px',
          }"
          @mouseleave="onMouseLeave"
        >
          <div class="backdrop-box">
            <el-image
              class="ant-image"
              :src="getBackdrop(item?.backdrop_path, ',250')"
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
                        <!-- <font-awesome-icon icon="fa-solid fa-play" /> -->
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
                        <!-- <font-awesome-icon icon="fa-solid fa-play" /> -->
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
                        <!-- <i class="fa-sharp fa-solid fa-info"></i> -->
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
                  {{
                    ' - Phần ' + dataMovie?.last_episode_to_air?.season_number
                  }}
                </span>
              </h3>
              <div class="info-bottom">
                <p class="genres">
                  {{ Array.from(item?.genres, (x: any) => x.name).join(' • ') }}
                </p>
              </div>

              <div class="views-imdb">
                <p class="views">
                  {{ ViewFormatter(dataMovie?.views) }} lượt xem
                </p>

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
                      dataMovie?.vote_average >= 5 &&
                      dataMovie?.vote_average < 8
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
        </div>
      </div>
    </Teleport>
  </NuxtLink>
</template>

<script setup lang="ts">
import { PlusOutlined, InfoOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import {
  getBackdrop,
  getTvById,
  getMovieById,
  getLanguage,
  getItemList,
  getItemHistory,
} from '@/services/MovieService';
import { useRouter } from 'vue-router';
import { ViewFormatter } from '@/utils/convertViews';
import { storeToRefs } from 'pinia';
import {
  handelAddItemToList,
  handelRemoveItemFromList,
} from '~/utils/handelAddRemoveItemList_History';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store: any = useStore();
const { allCountries } = storeToRefs<any>(store);
const router = useRouter();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>((): string => window.location.href);
const isTeleportPreviewModal = ref<boolean>(false);
const cardItem = ref<any>(null);
const previewModal = ref<any>(null);
const x = ref<number>(0);
const y = ref<number>(0);
const interval = ref<any>();

watch(previewModal, () => {
  if (previewModal.value) {
    previewModal.value?.addEventListener('mouseenter', () => {
      isTeleportPreviewModal.value = true;

      previewModal.value.addEventListener('mouseleave', () => {
        isTeleportPreviewModal.value = false;
        clearInterval(interval.value);
      });
    });
  }
});

const onMouseEnter = (e: any) => {
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

  // x.value = offsetX + e.target.offsetWidth / 2 - width / 2;
  // y.value = offsetY + e.target.offsetHeight / 2 - height / 2;

  x.value = offsetX + e.target.offsetWidth / 2;
  y.value = offsetY + e.target.offsetHeight / 2;

  interval.value = setTimeout(() => {
    isTeleportPreviewModal.value = true;
  }, 2000);

  e.target.addEventListener('mouseleave', () => {
    // isTeleportPreviewModal.value = false;
    clearInterval(interval.value);
  });
};

const onMouseLeave = () => {
  console.log('onMouseLeave');
};

onMounted(() => {
  // cardItem.value?.addEventListener('mouseenter', (e: any) => {});
  // cardItem.value?.addEventListener('mouseenter', (e: any) => {
  //   const rect = cardItem.value.getBoundingClientRect();
  //   const detailFlow = cardItem.value.getElementsByClassName(
  //     'detail-flow'
  //   )[0] as HTMLElement;
  //   if (detailFlow?.style) {
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

  if (props?.type) {
    switch (props?.type) {
      case 'movie':
        isEpisodes.value = false;
        await useAsyncData(`movie/short/${props.item?.id}`, () =>
          getMovieById(props.item?.id)
        )
          .then((movieRespone: any) => {
            dataMovie.value = movieRespone.data.value.data;

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
        .then((movieRespone: any) => {
          dataMovie.value = movieRespone.data.value.data;

          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
          if (axios.isCancel(e)) return;
        });
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

    // await useAsyncData(
    //   `itemhistory/${store.$state?.userAccount?.id}/${props.item?.id}`,
    //   () => getItemHistory(store.$state?.userAccount?.id, props.item?.id)
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
      !handelAddItemToList(
        store.$state?.userAccount?.id,
        dataMovie.value?.id,
        props.item.media_type
      )
    ) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (
      !handelRemoveItemFromList(
        store.$state?.userAccount?.id,
        dataMovie.value?.id
      )
    ) {
      isAddToList.value = true;
    }
    return;
  }
};
</script>
<style lang="scss" src="./MovieCardHorizontal.scss"></style>
