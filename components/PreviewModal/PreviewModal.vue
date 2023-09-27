<template>
  <Teleport to="#__nuxt" v-if="isTeleportPreviewModal">
    <div class="preview-overlay">
      <div
        ref="previewModal"
        class="preview-modal"
        :class="{
          disappear: isDisappear,
          'only-left': isOnlyLeft,
          'only-right': isOnlyRight,
        }"
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
                  <el-tooltip
                    title="Xem ngay"
                    content="Xem ngay"
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
                    :mouseLeaveDelay="0"
                  >
                    <NuxtLink
                      v-if="isEpisodes"
                      :to="{
                        path: `/play-tv/${item?.id}__${utils
                          .removeVietnameseTones(item?.name)
                          ?.replaceAll(/\s/g, '-')
                          .toLowerCase()}/tap-1`,
                      }"
                      class="btn-play-now"
                    >
                      <a-button
                        class="click-active"
                        shape="circle"
                        size="large"
                        type="text"
                      >
                        <template #icon>
                          <!-- <Icon name="ic:play-arrow" /> -->

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path fill="currentColor" d="M8 5v14l11-7z" />
                          </svg>
                        </template>
                      </a-button>
                    </NuxtLink>
                    <NuxtLink
                      v-else
                      :to="{
                        path: `/play-movie/${item?.id}__${utils
                          .removeVietnameseTones(item?.name)
                          ?.replaceAll(/\s/g, '-')
                          .toLowerCase()}`,
                      }"
                      class="btn-play-now"
                    >
                      <a-button
                        class="click-active"
                        shape="circle"
                        size="large"
                        type="text"
                      >
                        <template #icon>
                          <!-- <Icon name="ci:play-arrow" /> -->

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path fill="currentColor" d="M8 5v14l11-7z" />
                          </svg>
                        </template>
                      </a-button>
                    </NuxtLink>
                  </el-tooltip>

                  <el-tooltip
                    :title="
                      !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
                    "
                    :content="
                      !isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'
                    "
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
                    :mouseLeaveDelay="0"
                  >
                    <a-button
                      class="click-active"
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
                            fill="currentColor"
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
                          <path
                            fill="currentColor"
                            d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                          />
                        </svg>
                      </template>
                    </a-button>
                  </el-tooltip>

                  <el-tooltip
                    title="Chia sẻ"
                    content="Chia sẻ"
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
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
                        class="click-active"
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
                              fill="currentColor"
                              d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7Z"
                            />
                          </svg>
                        </template>
                      </a-button>
                    </ShareNetwork>
                  </el-tooltip>
                </div>

                <div class="right">
                  <el-tooltip
                    title="Chi tiết phim"
                    content="Chi tiết phim"
                    placement="top"
                    popper-class="popper-tooltip"
                    :hide-after="0"
                    :mouseLeaveDelay="0"
                  >
                    <NuxtLink
                      :to="{
                        path: isEpisodes
                          ? `/info-tv/${item?.id}__${utils
                              .removeVietnameseTones(item?.name)
                              ?.replaceAll(/\s/g, '-')
                              .toLowerCase()}`
                          : `/info-movie/${item?.id}__${utils
                              .removeVietnameseTones(item?.name)
                              ?.replaceAll(/\s/g, '-')
                              .toLowerCase()}`,
                      }"
                    >
                      <a-button
                        class="click-active"
                        shape="circle"
                        size="large"
                        type="text"
                      >
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
                              fill="currentColor"
                              d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94Z"
                            />
                          </svg>
                        </template>
                      </a-button>
                    </NuxtLink>
                  </el-tooltip>
                </div>
              </div>
              <div class="info">
                <!-- <h3 class="title">
                  {{ item?.name }}
                  <span v-if="isEpisodes">
                    {{
                      ' - Phần ' + dataMovie?.last_episode_to_air?.season_number
                    }}
                  </span>
                </h3> -->

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

                <div class="evidence-tags">
                  <span class="evidence-item country">
                    {{
                      getCountryByOriginalLanguage(
                        item?.original_language,
                        store.allCountries
                      )?.name || ''
                    }}
                  </span>
                  <!-- <span v-if="isEpisodes" class="evidence-item lastest-episode">
                    {{
                      dataMovie?.last_episode_to_air?.episode_number
                        ? 'Tập ' +
                          dataMovie?.last_episode_to_air?.episode_number
                        : ''
                    }}
                  </span> -->
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
// import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import { getImage } from '~/services/image';
import { getCountryByOriginalLanguage } from '~/services/country';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import gsap from 'gsap';

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
  timeOut: any;
  isEpisodes: boolean;
}>();

const emit = defineEmits<{ setIsTeleportModal: [data: boolean] }>();

const store = useStore();
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
const isDisappear = ref<boolean>(false);
const isOnlyLeft = ref<boolean>(false);
const isOnlyRight = ref<boolean>(false);
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
  //   // if (document.querySelector('.preview-modal') == null) return;
  //   if (isTeleport.value == true && !e.target.closest('.preview-modal')) {
  //     isDisappear.value = true;
  //     setTimeout(() => {
  //       isDisappear.value = false;
  //       isTeleport.value = false;
  //     }, 250);
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

    let minRecLeft =
      +getComputedStyle(document.documentElement)
        .getPropertyValue('--sider-width')
        .replace('px', '') + 45;

    if (window.innerWidth < 900) {
      minRecLeft = 15;
    }

    if (store.collapsed && window.innerWidth >= 900) {
      +getComputedStyle(document.documentElement)
        .getPropertyValue('--sider-width')
        .replace('px', '') + 30;
    }

    isOnlyLeft.value = false;
    isOnlyRight.value = false;

    if (props.style.rectBound.left <= minRecLeft) {
      // previewModal.value.style.setProperty(
      //   '--left',
      //   props.style.rectBound.left + 'px'
      // );

      // previewModal.value.style.transform = 'translateX(0%) translateY(-50%)';

      isOnlyLeft.value = true;

      previewModal.value.style.setProperty(
        '--left',
        props.style.rectBound.left + 'px'
      );

      previewModal.value.style.setProperty(
        '--left-only',
        props.style.rectBound.left * 1.15 + 'px'
      );

      previewModal.value.style.transform =
        'translateX(0%) translateY(-50%) scale(1.3)';
    } else {
      const minRectRight = window.innerWidth - props.style.rectBound.right;

      if (minRectRight <= 45) {
        // previewModal.value.style.right = minRectRight - 15 + 'px';
        // previewModal.value.style.transform = 'translateX(0%) translateY(-50%)';

        isOnlyRight.value = true;

        previewModal.value.style.setProperty('--left', 'auto');

        previewModal.value.style.setProperty(
          '--right',
          minRectRight - 14 + 'px'
        );

        previewModal.value.style.setProperty(
          '--right-only',
          minRectRight + 14 * 1.8 + 'px'
        );

        previewModal.value.style.transform =
          'translateX(0%) translateY(-50%) scale(1.3)';
      } else {
        previewModal.value.style.setProperty('--left', props.style.left + 'px');
      }
    }

    previewModal.value.style.setProperty('--top', props.style.top + 'px');

    previewModal.value?.addEventListener('mouseenter', () => {
      isTeleport.value = true;
    });

    previewModal.value.addEventListener('mouseleave', (el: any) => {
      isDisappear.value = true;

      // setTimeout(() => {
      //   isDisappear.value = false;
      //   isTeleport.value = false;
      // }, 250);

      // gsap.fromTo(
      //   '.preview-modal',
      //   {
      //     width: '22vw',
      //     minWidth: 350,
      //   },
      //   {
      //     width: props.style.offsetWidth,
      //     minWidth: props.style.offsetWidth,
      //     maxHeight: props.style.offsetHeight,
      //     duration: 0.25,
      //     onComplete: () => {
      //       isDisappear.value = false;
      //       isTeleport.value = false;
      //     },
      //   }
      // );

      if (isOnlyLeft.value) {
        gsap.fromTo(
          '.preview-modal',
          {
            left: props.style.rectBound.left * 1.15 + 'px',
            width: '17vw',
            minWidth: 260,
            transform: 'translateX(0%) translateY(-50%) scale(1.3)',
          },
          {
            left: props.style.rectBound.left + 'px',
            width: props.style.offsetWidth,
            minWidth: props.style.offsetWidth,
            transform: `translateX(0%) translateY(calc(${props.style.offsetHeight}px / (-2)))
          scale(1)`,
            duration: 0.2,
            onComplete: () => {
              isDisappear.value = false;
              isTeleport.value = false;
            },
          }
        );
        return;
      } else if (isOnlyRight.value) {
        const minRectRight = window.innerWidth - props.style.rectBound.right;

        gsap.fromTo(
          '.preview-modal',
          {
            width: '17vw',
            minWidth: 260,
            right: minRectRight + 14 * 1.8 + 'px',
            transform: 'translateX(0%) translateY(-50%) scale(1.3)',
          },
          {
            right: minRectRight - 14 + 'px',
            width: props.style.offsetWidth,
            minWidth: props.style.offsetWidth,
            transform: `translateX(0%) translateY(calc(${props.style.offsetHeight}px / (-2)))
          scale(1)`,
            duration: 0.2,
            onComplete: () => {
              isDisappear.value = false;
              isTeleport.value = false;
            },
          }
        );
        return;
      }

      gsap.fromTo(
        '.preview-modal',
        {
          width: '17vw',
          minWidth: 260,
          transform: 'translateX(-50%) translateY(-50%) scale(1.3)',
        },
        {
          width: props.style.offsetWidth,
          minWidth: props.style.offsetWidth,
          transform: `translateX(-50%) translateY(calc(${props.style.offsetHeight}px / (-2)))
          scale(1)`,
          duration: 0.2,
          onComplete: () => {
            isDisappear.value = false;
            isTeleport.value = false;
          },
        }
      );
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

        if (dataMovie.value?.history_progress) {
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
          ? `/info-tv/${props.item?.id}__${utils
              .removeVietnameseTones(props.item?.name)
              ?.replaceAll(/\s/g, '-')
              .toLowerCase()}`
          : `/info-movie/${props.item?.id}__${utils
              .removeVietnameseTones(props.item?.name)
              ?.replaceAll(/\s/g, '-')
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
