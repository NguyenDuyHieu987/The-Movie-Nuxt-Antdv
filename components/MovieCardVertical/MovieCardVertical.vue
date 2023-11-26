<template>
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
    ref="cardItem"
    class="movie-card-item vertical"
    @pointerenter="onMouseEnter"
    :style="`--dominant-poster-color: rgb(${item.dominant_poster_color[0]}, ${item.dominant_poster_color[1]},${item.dominant_poster_color[2]})`"
  >
    <!-- <el-skeleton :loading="loading" animated class="ratio-2-3">
      <template #template>
        <el-skeleton-item class="skeleton-img" />
      </template> -->

    <!-- <template #default> -->
    <div class="img-box ratio-2-3">
      <!-- <img
        v-lazy="getImage(item?.poster_path, 'poster')"
        loading="lazy"
        alt=""
      /> -->

      <NuxtImg
        :src="getImage(item?.poster_path, 'poster')"
        format="avif"
        loading="lazy"
        alt=""
      />

      <div v-show="isInHistory" class="viewed-overlay-bar">
        <div
          class="percent-viewed"
          :style="{ width: percent * 100 + '%' }"
        ></div>
      </div>

      <div
        v-if="item?.release_date || item?.last_air_date || item?.first_air_date"
        class="release-date-wrapper"
      >
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

    <div
      class="info"
      :style="`--dominant-poster-box-shadow-color: rgba(${item.dominant_poster_color[0]}, ${item.dominant_poster_color[1]},${item.dominant_poster_color[2]}, 0.35)`"
    >
      <p class="title">
        {{ item?.name }}
      </p>

      <div class="genres">
        <!-- <ClientOnly>
          <NuxtLink
            class="genre-item"
            v-for="(genre, index) in Array.from(item?.genres, (x: genre) => x)"
            :index="index"
            :key="index"
            :to="`/discover/genre/${
              getGenreById(genre.id, store?.allGenres)?.short_name
            }`"
          >
            {{ genre?.name }}
          </NuxtLink>
        </ClientOnly> -->

        <div
          class="genre-item"
          v-for="(genre, index) in Array.from(item?.genres, (x: genre) => x)"
          :index="index"
          :key="index"
          @click.prevent="handleClickGenreItem(genre)"
        >
          {{ genre?.name }}
        </div>
      </div>
    </div>
    <!-- </template>
    </el-skeleton> -->
  </NuxtLink>
</template>
<script setup lang="ts">
import axios from 'axios';
// import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import { getImage } from '~/services/image';
import { getItemHistory } from '~/services/history';
import { getGenreById } from '~/services/genres';
import type { genre } from '~/types';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store = useStore();
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
const timeOut = ref<any>();

const getData = async () => {
  // loading.value = true;

  // setTimeout(() => {
  //   loading.value = false;
  // }, 500);

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

  if (store.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    // await useAsyncData(
    //   `itemlist/${store?.userAccount?.id}/${props.item?.id}`,
    //   () => getItemList(store?.userAccount?.id, props.item?.id)
    // )
    //   .then((response) => {
    //     if (response.data.value.success == true) {
    //       isAddToList.value = true;
    //     }
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });

    if (dataMovie.value?.history_progress) {
      isInHistory.value = true;
      percent.value = dataMovie.value?.history_progress?.percent;
    } else {
      // useAsyncData(
      //   `itemhistory/${store?.userAccount?.id}/${props.item?.id}`,
      //   () => getItemHistory(props.item?.id, props.item?.media_type)
      // )
      getItemHistory(props.item?.id, props.item?.media_type)
        .then((response) => {
          if (response.success == true) {
            isInHistory.value = true;
            percent.value = response?.result?.percent;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }
  }
};

getData();

const onMouseEnter = ({ target }: { target: HTMLElement }) => {
  if (loading.value) return;

  const rect = target.getBoundingClientRect();

  const offsetX = rect.left;
  const offsetY = window.scrollY + rect.top;

  // left.value = offsetX + target.offsetWidth / 2 - width / 2;
  // top.value = offsetY + target.offsetHeight / 2 - height / 2;

  left.value = offsetX + target.offsetWidth / 2;
  top.value = offsetY + target.offsetHeight / 2;

  offsetWidth.value = target.offsetWidth;
  offsetHeight.value = target.offsetHeight;

  imgHeight.value = target.querySelector('img')!?.offsetHeight;
  imgWidth.value = target.querySelector('img')!?.offsetWidth;

  rectBound.value = rect;

  timeOut.value = setTimeout(() => {
    isTeleportPreviewModal.value = true;
  }, 700);

  target.addEventListener('pointerleave', () => {
    // isTeleportPreviewModal.value = false;
    clearTimeout(timeOut.value);
  });
};

const handleClickGenreItem = (genreItem: genre) => {
  navigateTo(
    `/discover/genre/${
      getGenreById(genreItem.id, store?.allGenres)?.short_name
    }`
  );
};
</script>

<style lang="scss" src="./MovieCardVertical.scss"></style>
