<template>
  <Teleport to="#__nuxt" v-if="isTeleportPreviewModal">
    <div class="preview-overlay">
      <div
        ref="previewModal"
        class="preview-modal"
        @mouseover="onClickPreviewModal"
      >
        <el-skeleton :loading="loading" animated>
          <template #template>
            <div class="backdrop-box">
              <el-skeleton-item class="skeleton-img" />
            </div>

            <div class="bottom-content">
              <div class="widget">
                <div class="left">
                  <el-skeleton-item class="circle" />
                  <el-skeleton-item class="circle" />
                  <el-skeleton-item class="circle" />
                </div>
                <div class="right">
                  <el-skeleton-item class="circle" />
                </div>
              </div>
              <div class="info">
                <el-skeleton-item variant="text" />
                <el-skeleton-item variant="text" style="width: 60%" />
                <el-skeleton-item variant="text" style="width: 80%" />
              </div>
            </div>
          </template>

          <template #default>
            <div class="backdrop-box">
              <nuxt-img
                class="ant-image"
                :src="getImage(item?.backdrop_path, 'backdrop', 'h-250')"
                loading="lazy"
                alt=""
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
                    :mouseLeaveDelay="0"
                  >
                    <NuxtLink
                      v-if="isEpisodes"
                      :to="{
                        path: `/play-tv/${item?.id}/${item?.name
                          ?.replace(/\s/g, '+')
                          .toLowerCase()}/ep-1`,
                      }"
                      class="btn-play-now"
                    >
                      <a-button shape="circle" size="large" type="text">
                        <template #icon>
                          <!-- <Icon name="ic:play-arrow" /> -->

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </template>
                      </a-button>
                    </NuxtLink>
                    <NuxtLink
                      v-else
                      :to="{
                        path: `/play-movie/${item?.id}/${item?.name
                          ?.replace(/\s/g, '+')
                          .toLowerCase()}`,
                      }"
                      class="btn-play-now"
                    >
                      <a-button shape="circle" size="large" type="text">
                        <template #icon>
                          <!-- <Icon name="ci:play-arrow" /> -->

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
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
                    :mouseLeaveDelay="0"
                  >
                    <a-button
                      shape="circle"
                      size="large"
                      type="text"
                      @click.prevent="handelAddToList"
                    >
                      <template #icon>
                        <!-- <Icon v-if="isAddToList" name="ic:baseline-check" />
                        <Icon v-else name="ic:baseline-plus" /> -->

                        <svg
                          v-if="isAddToList"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.8rem"
                          height="1.8rem"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                          />
                        </svg>

                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.8rem"
                          height="1.8rem"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                        </svg>
                      </template>
                    </a-button>
                  </a-tooltip>

                  <a-tooltip
                    :teleported="false"
                    title="Chia sẻ"
                    content="Chia sẻ"
                    placement="top"
                    :mouseLeaveDelay="0"
                    @click.prevent
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
                        @click.prevent
                      >
                        <template #icon>
                          <!-- <Icon name="fa6-solid:share" class="fa6-solid" /> -->
                          <!-- <Icon name="mdi:share" /> -->

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8rem"
                            height="1.8rem"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7Z"
                            />
                          </svg>
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
                    :mouseLeaveDelay="0"
                  >
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
                    >
                      <a-button shape="circle" size="large" type="text">
                        <template #icon>
                          <!-- <InfoOutlined /> -->

                          <!-- <Icon
                            class="info-icon"
                            name="mdi:information-variant"
                          /> -->

                          <svg
                            class="info-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8rem"
                            height="1.8rem"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94Z"
                            />
                          </svg>
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
                <div class="evidence-tags">
                  <span class="evidence-item country">
                    {{
                      getCountryByOriginalLanguage(
                        item?.original_language,
                        store.allCountries
                      )?.name || ''
                    }}
                  </span>
                  <span v-if="isEpisodes" class="evidence-item lastest-episode">
                    {{
                      dataMovie?.last_episode_to_air?.episode_number
                        ? 'Tập ' +
                          dataMovie?.last_episode_to_air?.episode_number
                        : ''
                    }}
                  </span>
                </div>

                <div class="views-imdb">
                  <p class="views">
                    {{ utils.viewFormatter(dataMovie?.views) }} lượt xem
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
          </template>
        </el-skeleton>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import axios from 'axios';
import { PlusOutlined, InfoOutlined } from '@ant-design/icons-vue';
import { getBackdrop, getImage } from '~/services/image';
import { getCountryByOriginalLanguage } from '~/services/country';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';

const props = defineProps<{
  isTeleportPreviewModal: boolean;
  item: any;
  style: {
    left: number;
    top: number;
    offsetHeight: number;
    offsetWidth: number;
    imgHeight: number;
    imgWidth: number;
    rectBound: any;
  };
  interval: any;
  isEpisodes: boolean;
}>();

const emit = defineEmits<{ setIsTeleportModal: [data: boolean] }>();

const store: any = useStore();
const utils = useUtils();
const dataMovie = ref<any>({});
// const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const previewModal = ref<any>(null);
const urlShare = computed<string>((): string => window.location.href);
const isTeleport = defineModel<boolean>('isTeleport');
// const isTeleport = computed<boolean>({
//   get() {
//     return props.isTeleportPreviewModal;
//   },
//   set(value: boolean) {
//     emit('setIsTeleportModal', value);
//   },
// });

onMounted(() => {
  // window.addEventListener('pointermove', (e: any) => {
  //   if (document.querySelector('.preview-modal') == null) return;
  //   if (isTeleport.value == true && !e.target.closest('.preview-modal')) {
  //     isTeleport.value = false;
  //   }
  // });
});

watch(previewModal, () => {
  if (previewModal.value) {
    previewModal.value.style.setProperty(
      '--width',
      props.style.offsetWidth + 'px'
    );
    previewModal.value.style.setProperty(
      '--height',
      props.style.offsetHeight + 'px'
    );
    previewModal.value.style.setProperty(
      '--img-height',
      props.style.imgHeight + 'px'
    );

    if (props.style.rectBound.left <= 300) {
      previewModal.value.style.setProperty(
        '--left',
        props.style.rectBound.left + 'px'
      );
      previewModal.value.style.transform = 'translateX(0%) translateY(-50%)';
    } else {
      const rectRight = window.innerWidth - props.style.rectBound.right;

      if (rectRight <= 100) {
        previewModal.value.style.right = rectRight - 15 + 'px';
        previewModal.value.style.setProperty('--left', 'auto');
        previewModal.value.style.transform = 'translateX(0%) translateY(-50%)';
      } else {
        previewModal.value.style.setProperty('--left', props.style.left + 'px');
      }
    }

    previewModal.value.style.setProperty('--top', props.style.top + 'px');

    previewModal.value?.addEventListener('mouseenter', () => {
      isTeleport.value = true;

      previewModal.value.addEventListener('mouseleave', () => {
        isTeleport.value = false;
      });
    });
  }
});

watch(isTeleport, async () => {
  if (isTeleport.value == true) {
    if (!dataMovie.value?.id) {
      loading.value = true;
      if (props.isEpisodes) {
        await useAsyncData(`tv/short/${props.item?.id}`, () =>
          getTvById(props.item?.id)
        )
          .then((tvResponed: any) => {
            dataMovie.value = tvResponed.data.value;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            setTimeout(() => {
              loading.value = false;
            }, 500);
          });
      } else {
        await useAsyncData(`movie/short/${props.item?.id}`, () =>
          getMovieById(props.item?.id)
        )
          .then((movieRespone: any) => {
            dataMovie.value = movieRespone.data.value;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            setTimeout(() => {
              loading.value = false;
            }, 500);
          });
      }

      if (store.isLogin) {
        if (dataMovie.value?.in_list) {
          isAddToList.value = true;
        }

        if (dataMovie.value?.in_history) {
          isInHistory.value = true;
          percent.value = dataMovie.value?.history_progress?.percent;
        }
      }
    }
  }
});

const actionBtn = ref<any>(null);

const onClickPreviewModal = (e: any) => {
  actionBtn.value = e.target.closest('.ant-btn');

  e.target.addEventListener('click', () => {
    if (!actionBtn.value) {
      navigateTo({
        path: props.isEpisodes
          ? `/info-tv/${props.item?.id}/${props.item?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}`
          : `/info-movie/${props.item?.id}/${props.item?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}`,
      });
    }
  });
};

const handelAddToList = (e: any) => {
  if (!store?.isLogin) {
    store.openRequireAuthDialog = true;
    return;
  }

  if (!isAddToList.value) {
    isAddToList.value = true;
    if (
      !utils.handelAddItemToList(dataMovie.value?.id, props.item?.media_type)
    ) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (
      !utils.handelRemoveItemFromList(
        dataMovie.value?.id,
        props.item?.media_type
      )
    ) {
      isAddToList.value = true;
    }
    return;
  }
};

const getPopupContainer = () => document.querySelector('.preview-modal');
</script>

<style lang="scss" src="./PreviewModal.scss"></style>
