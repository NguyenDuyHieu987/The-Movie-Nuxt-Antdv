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

        <!-- <div class="content-skeleton">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div> -->
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

          <!-- <div v-if="!loading" class="duration-episode-box">
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
          </div> -->

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
            <!-- <div class="info-bottom">
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
            </div> -->
          </a-skeleton>
        </div>
      </template>
    </el-skeleton>

    <PreviewModal
      :isTeleportPreviewModal="isTeleportPreviewModal"
      v-model:isTeleport="isTeleportPreviewModal"
      :item="item"
      :style="{
        left: left,
        top: top,
        offsetHeight: offsetHeight,
        offsetWidth: offsetWidth,
        imgHeight: imgHeight,
        imgWidth: imgWidth,
        rectBound: rectBound,
      }"
      :interval="interval"
      :isEpisodes="isEpisodes"
      @setIsTeleportModal="(data : boolean) => (isTeleportPreviewModal = data)"
    />
  </NuxtLink>
</template>
<script setup lang="ts">
import axios from 'axios';
import { getPoster } from '~/services/image';
import { getItemHistory } from '~/services/history';
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
const rectBound = ref<any>(0);
const interval = ref<any>();

const onMouseEnter = ({ target }: { target: HTMLElement }) => {
  if (target) {
    const rect = target.getBoundingClientRect();

    const offsetX = rect.left;
    const offsetY = window.scrollY + rect.top;

    // left.value = offsetX + target.offsetWidth / 2 - width / 2;
    // top.value = offsetY + target.offsetHeight / 2 - height / 2;

    left.value = offsetX + target.offsetWidth / 2;
    top.value = offsetY + target.offsetHeight / 2;

    offsetWidth.value = target.offsetWidth;
    offsetHeight.value = target.offsetHeight;

    imgHeight.value = target.querySelector('img')!.offsetHeight;
    imgWidth.value = target.querySelector('img')!.offsetWidth;

    rectBound.value = rect;

    interval.value = setTimeout(() => {
      isTeleportPreviewModal.value = true;
    }, 2000);

    target.addEventListener('mouseleave', () => {
      // isTeleportPreviewModal.value = false;
      clearInterval(interval.value);
    });
  }
};

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

onBeforeMount(() => {});
getData();
</script>
<style lang="scss" src="./MovieCardVertical.scss"></style>
