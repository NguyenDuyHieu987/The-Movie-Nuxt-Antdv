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
        :src="getImage(item?.backdrop_path, 'backdrop')"
        loading="lazy"
        alt=""
      />
    </div>

    <div class="billboard-item-body">
      <div class="info">
        <div class="head">
          <nuxt-img
            class="pngegg"
            :src="getImage('pngegg.png', 'misc')"
            alt=""
          />
          <div>
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
          :to="{
            path:
              item?.media_type == 'movie'
                ? `/play-movie/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}`
                : `/play-tv/${item?.id}/${item?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}/tap-1`,
          }"
        >
          <a-button size="large" type="text" class="play modern">
            <template #icon>
              <!-- <Icon name="ci:play-arrow" class="play" /> -->

              <svg
                class="play"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </template>
            Xem ngay
          </a-button>
        </NuxtLink>

        <NuxtLink
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
                width="32"
                height="32"
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

        <NuxtLink @click.prevent="handelAddToList">
          <a-button size="large" type="text" class="add modern">
            <template #icon>
              <!-- <Icon v-if="isAddToList" name="ic:baseline-check" />
              <Icon v-else name="ic:baseline-plus" /> -->

              <svg
                v-if="isAddToList"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
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
                width="32"
                height="32"
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
        </NuxtLink>
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

onBeforeMount(async () => {
  if (store.isLogin) {
    await useAsyncData(
      `itemlist/${store?.userAccount?.id}/${props.item?.id}`,
      () => getItemList(props.item?.id)
    )
      .then((movieRespone: any) => {
        if (movieRespone.data.value.data.success == true) {
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
    if (
      !utils.handelAddItemToList(
        props.item?.id,
        props.item?.media_type == 'movie' ? 'movie' : 'tv'
      )
    ) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (!utils.handelRemoveItemFromList(props.item?.id)) {
      isAddToList.value = true;
    }
    return;
  }
};
</script>

<style lang="scss" src="./BillboardItem.scss"></style>
