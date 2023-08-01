<template>
  <div
    :to="{
      path:
        item?.media_type == 'movie'
          ? `/info-movie/${item?.id}/${item?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}`
          : `/info-tv/${item?.id}/${item?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}`,
    }"
    class="billboard-item"
  >
    <!-- <el-image
        class="ant-image"
        :src="getBackdrop(item?.backdrop_path)"
        :preview="false"
        :lazy="true"
        loading="lazy"
      /> -->

    <div class="img-wrapper">
      <nuxt-img
        class="ant-image"
        :src="
          getImage(
            item?.backdrop_path,
            'backdrop',
            'w-' + windowWidth.toString()
          )
        "
        loading="lazy"
        alt=""
      />
    </div>

    <div class="billboard-item-body">
      <div class="info">
        <div class="head">
          <!-- <nuxt-img
            class="pngegg"
            :src="getImage('pngegg.png', 'misc')"
            alt=""
          /> -->

          <div class="pngegg-icon">
            <svg
              enable-background="new 0 0 512 512"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="6rem"
            >
              <linearGradient
                id="SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="5.984"
                x2="506.016"
                y1="256"
                y2="256"
              >
                <stop offset="0" stop-color="#0cafd5" />
                <stop offset="1" stop-color="#9b31ff" />
              </linearGradient>
              <g>
                <path
                  d="m477.24 92.46h-442.48c-15.86 0-28.77 12.91-28.77 28.77v269.55c0 15.86 12.91 28.77 28.77 28.77h442.49c15.86 0 28.77-12.91 28.77-28.77v-269.55c0-15.87-12.91-28.77-28.78-28.77zm8.76 298.31c0 4.83-3.93 8.76-8.76 8.76h-442.48c-4.83 0-8.76-3.93-8.76-8.76v-269.54c0-4.83 3.93-8.76 8.76-8.76h442.49c4.83 0 8.76 3.93 8.76 8.76v269.54zm-387.29-171.21c-4.68-4.68-4.68-12.25 0-16.92l26.56-26.56c4.65-4.65 12.25-4.65 16.89 0 2.35 2.35 3.52 5.41 3.52 8.48v111.6c0 6.6-5.36 11.96-11.96 11.96s-11.96-5.36-11.96-11.96v-82.72l-6.15 6.12c-4.66 4.68-12.26 4.68-16.9 0zm181.95 91.42h20.81c7.65 0 14.6-3.12 19.62-8.14s8.14-11.96 8.14-19.62v-42.86-42.89c0-7.65-3.12-14.6-8.14-19.62s-11.96-8.14-19.62-8.14h-20.81c-7.65 0-14.57 3.12-19.62 8.14-5.02 5.02-8.14 11.96-8.14 19.62v42.89 42.86c0 7.65 3.12 14.6 8.14 19.62 5.05 5.02 11.97 8.14 19.62 8.14zm-3.83-113.5c0-1.05.43-2.01 1.13-2.69.71-.71 1.64-1.13 2.69-1.13h20.81c1.05 0 2.01.43 2.69 1.13.71.68 1.13 1.64 1.13 2.69v30.93h-28.46v-30.93zm0 54.85h28.46v30.9c0 1.05-.43 2.01-1.13 2.69-.68.71-1.64 1.13-2.69 1.13h-20.81c-1.05 0-1.98-.43-2.69-1.13-.71-.68-1.13-1.64-1.13-2.69v-30.9zm101.8 58.65c10.52 0 20.07-4.28 26.96-11.2 6.92-6.89 11.23-16.44 11.23-26.96v-64.94c0-10.52-4.31-20.07-11.23-26.96-6.89-6.92-16.44-11.2-26.96-11.2-10.49 0-20.04 4.28-26.96 11.2-6.89 6.89-11.2 16.44-11.2 26.96v64.94c0 10.52 4.31 20.07 11.2 26.96 6.92 6.92 16.47 11.2 26.96 11.2zm-14.23-103.1c0-3.91 1.62-7.46 4.2-10.06 2.58-2.58 6.15-4.17 10.03-4.17 3.91 0 7.48 1.59 10.06 4.17 2.58 2.61 4.2 6.15 4.2 10.06v64.94c0 3.91-1.62 7.46-4.2 10.06-2.58 2.58-6.15 4.17-10.06 4.17-3.88 0-7.46-1.59-10.03-4.17-2.58-2.61-4.2-6.15-4.2-10.06zm-162.43 103.1c10.52 0 20.07-4.28 26.99-11.2 6.89-6.89 11.2-16.44 11.2-26.96v-64.94c0-10.52-4.31-20.07-11.2-26.96-6.92-6.92-16.47-11.2-26.99-11.2-10.49 0-20.04 4.28-26.96 11.2-6.89 6.89-11.2 16.44-11.2 26.96v64.94c0 10.52 4.31 20.07 11.2 26.96 6.92 6.92 16.47 11.2 26.96 11.2zm-14.23-103.1c0-3.91 1.62-7.46 4.2-10.06 2.58-2.58 6.15-4.17 10.03-4.17 3.91 0 7.48 1.59 10.06 4.17 2.58 2.61 4.2 6.15 4.2 10.06v64.94c0 3.91-1.62 7.46-4.2 10.06-2.58 2.58-6.15 4.17-10.06 4.17-3.88 0-7.46-1.59-10.03-4.17-2.58-2.61-4.2-6.15-4.2-10.06zm239.16 134.39c0 5.53-4.48 10.01-10.01 10.01h-321.78c-5.53 0-10.01-4.48-10.01-10.01s4.48-10.01 10.01-10.01h321.79c5.52.01 10 4.49 10 10.01z"
                  fill="url(#SVGID_1_)"
                />
              </g>
            </svg>
          </div>

          <div class="head-info">
            <p class="release-date" v-if="item?.media_type == 'movie'">
              {{ item?.release_date }}
            </p>
            <p v-else class="release-date">
              {{
                item?.last_air_date ? item?.last_air_date : item?.first_air_date
              }}
            </p>

            <!-- <p class="genres">
              {{ Array.from(item?.genres, (x: any) => x.name).join(' • ') }}
            </p> -->

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
          </div>
        </div>

        <h1 class="title">
          {{ item?.name }}
        </h1>

        <p class="overview">{{ item?.overview }}</p>
      </div>

      <div class="action">
        <NuxtLink
          class="action-btn"
          :to="{
            path:
              item?.media_type == 'movie'
                ? `/play-movie/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}`
                : `/play-tv/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}/ep-1`,
          }"
        >
          <a-button size="large" type="text" class="play modern">
            <template #icon>
              <!-- <Icon name="ci:play-arrow" class="play" /> -->

              <svg
                class="play"
                xmlns="http://www.w3.org/2000/svg"
                width="3rem"
                height="3rem"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </template>
            Xem ngay
          </a-button>
        </NuxtLink>

        <NuxtLink
          class="action-btn"
          :to="{
            path:
              item?.media_type == 'movie'
                ? `/info-movie/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}`
                : `/info-tv/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}`,
          }"
        >
          <a-button size="large" type="text" class="info modern">
            <template #icon>
              <!-- <Icon name="bi:info-circle" class="info" /> -->

              <svg
                class="info"
                xmlns="http://www.w3.org/2000/svg"
                width="1.8rem"
                height="1.8rem"
                viewBox="0 0 16 16"
              >
                <g fill="currentColor">
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
                  />
                </g>
              </svg>
            </template>
            Chi tiết
          </a-button>
        </NuxtLink>

        <div class="action-btn" @click="handelAddToList">
          <a-button size="large" type="text" class="add modern">
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
            <span> Danh sách</span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getBackdrop, getImage } from '~/services/image';
import { getItemList } from '~/services/list';

const props = defineProps<{
  item: any;
}>();
const store: any = useStore();
const utils = useUtils();
const isAddToList = ref<boolean>(false);
const windowWidth = ref<number>(window.innerWidth);

onBeforeMount(async () => {
  if (store.isLogin) {
    await useAsyncData(
      `itemlist/${store?.userAccount?.id}/${props.item?.id}`,
      () => getItemList(props.item?.id, props.item?.media_type)
    )
      .then((movieRespone: any) => {
        if (movieRespone.data.value.success == true) {
          isAddToList.value = true;
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }
});

const handelAddToList = () => {
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
</script>

<style lang="scss" src="./BillboardItem.scss"></style>
