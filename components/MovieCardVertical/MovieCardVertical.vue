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
    :style="`--dominant-poster-color: ${item.dominant_poster_color[0]}, ${item.dominant_poster_color[1]},${item.dominant_poster_color[2]}`"
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

      <div class="widget">
        <el-tooltip
          title="Xem ngay"
          content="Xem ngay"
          placement="right"
          popper-class="popper-tooltip"
          :hide-after="0"
          :mouseLeaveDelay="0"
        >
          <a-button
            class="click-active"
            shape="circle"
            size="large"
            type="text"
            @click.prevent="
              navigateTo(
                isEpisodes
                  ? `/play-tv/${item?.id}__${utils
                      .removeVietnameseTones(item?.name)
                      ?.replaceAll(/\s/g, '-')
                      .toLowerCase()}/tap-1`
                  : `/play-movie/${item?.id}__${utils
                      .removeVietnameseTones(item?.name)
                      ?.replaceAll(/\s/g, '-')
                      .toLowerCase()}`
              )
            "
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </template>
          </a-button>
        </el-tooltip>

        <el-tooltip
          :title="!isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'"
          :content="!isAddToList ? 'Thêm vào danh sách' : 'Xóa khỏi danh sách'"
          placement="right"
          popper-class="popper-tooltip"
          :hide-after="0"
          :mouseLeaveDelay="0"
        >
          <a-button
            class="click-active add-list"
            shape="circle"
            size="large"
            type="text"
            @click.prevent="handelAddToList"
          >
            <template #icon>
              <svg
                v-if="isAddToList"
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
              </svg>
            </template>
          </a-button>
        </el-tooltip>

        <el-tooltip
          title="Chia sẻ"
          content="Chia sẻ"
          placement="right"
          popper-class="popper-tooltip"
          :hide-after="0"
          :mouseLeaveDelay="0"
        >
          <ClientOnly>
            <ShareNetwork
              network="facebook"
              :url="urlShare"
              :title="item?.name"
              hashtags="phimhay247.site,vite"
              style="white-space: nowrap; display: block"
              @click.prevent
            >
              <a-button
                class="click-active"
                shape="circle"
                size="large"
                type="text"
                @click.prevent
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7Z"
                    />
                  </svg>
                </template>
              </a-button>
            </ShareNetwork>
          </ClientOnly>
        </el-tooltip>
      </div>
    </div>

    <div class="info">
      <div class="info-box" :class="{ 'no-genres': item?.genres.length == 0 }">
        <div class="title-wrapper">
          <p class="title">
            {{ item?.name }}
          </p>

          <p class="original-title">
            {{ item?.original_name }}
          </p>
        </div>

        <div class="genres-wrapper">
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
import { getItemList } from '~/services/list';
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
const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const isAddToList = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const urlShare = computed<string>((): string => window.location.href);
const isTeleportPreviewModal = ref<boolean>(false);
const cardItem = ref<HTMLElement>();
const left = ref<number>(0);
const top = ref<number>(0);
const offsetWidth = ref<number>(0);
const offsetHeight = ref<number>(0);
const imgHeight = ref<number>(0);
const imgWidth = ref<number>(0);
const rectBound = ref<any>(0);
const timeOut = ref<any>();
const isEpisodes = computed<boolean>(() => props?.item?.media_type == 'tv');

const getData = async () => {
  // loading.value = true;

  // setTimeout(() => {
  //   loading.value = false;
  // }, 500);

  if (props?.type || props?.item?.media_type) {
    switch (props?.type || props?.item?.media_type) {
      case 'movie':
        break;
      case 'tv':
        break;
      default:
        break;
    }
  }

  if (store.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    } else {
      // await useAsyncData(
      //   `itemlist/${store?.userAccount?.id}/${props.item?.id}`,
      //   () => getItemList(store?.userAccount?.id, props.item?.id)
      // )
      getItemList(props.item?.id, props.item?.media_type)
        .then((response) => {
          if (response.success == true) {
            isAddToList.value = true;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }

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

  imgHeight.value = target.querySelector('img')!.offsetHeight;
  imgWidth.value = target.querySelector('img')!.offsetWidth;

  rectBound.value = rect;

  timeOut.value = setTimeout(() => {
    isTeleportPreviewModal.value = true;
  }, 700);

  target.addEventListener('pointerleave', () => {
    // isTeleportPreviewModal.value = false;
    clearTimeout(timeOut.value);
  });
};

const onMouseLeave = () => {
  clearTimeout(timeOut.value);
};

const handelAddToList = (e: any) => {
  if (!store?.isLogin) {
    store.openRequireAuthDialog = true;
    return;
  }

  if (!isAddToList.value) {
    isAddToList.value = true;
    if (!utils.handelAddItemToList(props.item?.id, props.item?.media_type)) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (
      !utils.handelRemoveItemFromList(props.item?.id, props.item?.media_type)
    ) {
      isAddToList.value = true;
    }
    return;
  }
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
