<template>
  <Teleport to="#__nuxt" v-if="isTeleportPreviewModal">
    <div class="preview-overlay">
      <div ref="previewModal" class="preview-modal">
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
                {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
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
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import axios from 'axios';
import { PlusOutlined, InfoOutlined } from '@ant-design/icons-vue';
import { ViewFormatter } from '@/utils/convertViews';
import { getBackdrop, getTvById, getMovieById } from '@/services/MovieService';
import {
  handelAddItemToList,
  handelRemoveItemFromList,
} from '~/utils/handelAddRemoveItemList_History';

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
  };
  interval: any;
  isEpisodes: boolean;
}>();

const emit = defineEmits<{ setIsTeleportModal: [data: boolean] }>();

const store: any = useStore();
const dataMovie = ref<any>({});
// const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const previewModal = ref<any>(null);
const urlShare = computed<string>((): string => window.location.href);
const modelValue = defineModel();
// console.log(modelValue);
const isTeleport = computed<boolean>({
  get() {
    return props.isTeleportPreviewModal;
  },
  set(value: boolean) {
    emit('setIsTeleportModal', value);
  },
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

    previewModal.value.style.setProperty(
      '--preview-modal-height',
      previewModal.value.offsetHeight + 'px'
    );

    previewModal.value.style.setProperty('--left', props.style.left + 'px');
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
  if (props.isTeleportPreviewModal == true) {
    if (!dataMovie.value?.id) {
      loading.value = true;
      if (props.isEpisodes) {
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

<style lang="scss" src="./PreviewModal.scss"></style>
