<template>
  <div
    :to="{
      path:
        item?.media_type == 'movie'
          ? `/info/movie/${item?.id}/${
              item?.name
                ? item?.name?.replace(/\s/g, '+').toLowerCase()
                : item?.title?.replace(/\s/g, '+').toLowerCase()
            }`
          : `/info/tv/${item?.id}/${
              item?.name
                ? item?.name?.replace(/\s/g, '+').toLowerCase()
                : item?.title?.replace(/\s/g, '+').toLowerCase()
            }`,
    }"
    class="topic-item"
  >
    <el-image
      class="el-image"
      :src="getBackdrop(item?.backdrop_path)"
      :preview="false"
      :lazy="true"
      loading="lazy"
    />

    <div class="topic-item-body">
      <div class="info">
        <div class="head">
          <img class="pngegg" src="/images/pngegg.png" />
          <div>
            <p class="release-date">
              {{
                item?.release_date
                  ? item?.release_date
                  : item?.last_air_date
                  ? item?.last_air_date
                  : item?.first_air_date
              }}
            </p>

            <p class="genres">
              {{
                getAllGenresById(item?.genre_ids, store.$state?.allGenres).join(
                  ' • '
                )
              }}
            </p>

            <!-- {{ getAllGenresById(item?.genres).join(' • ') }} -->
            <!-- <span class="genres" v--else-if="data?.genres">
                {{ Array.from(item?.genres, (x) => x.name).join(' • ') }}
              </span> -->
          </div>
        </div>

        <h1 class="title">
          {{ item?.name ? item?.name : item?.title }}
        </h1>

        <p class="overview">{{ item?.overview }}</p>
      </div>

      <div class="action">
        <NuxtLink
          :to="{
            path:
              item?.media_type == 'movie'
                ? `/play/movie/${item?.id}/${
                    item?.name
                      ? item?.name?.replace(/\s/g, '+').toLowerCase()
                      : item?.title?.replace(/\s/g, '+').toLowerCase()
                  }`
                : `/play/tv/${item?.id}/${
                    item?.name
                      ? item?.name?.replace(/\s/g, '+').toLowerCase()
                      : item?.title?.replace(/\s/g, '+').toLowerCase()
                  }/tap-1`,
          }"
        >
          <a-button size="large" type="text" class="play">
            <template #icon>
              <Icon name="ic:play-arrow" class="play" />
              <!-- <svg
                class="play"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
              >
                <path fill="#fff" d="M8 5v14l11-7L8 5z" />
              </svg> -->
            </template>
            Xem ngay
          </a-button>
        </NuxtLink>

        <NuxtLink
          :to="{
            path:
              item?.media_type == 'movie'
                ? `/info/movie/${item?.id}/${
                    item?.name
                      ? item?.name?.replace(/\s/g, '+').toLowerCase()
                      : item?.title?.replace(/\s/g, '+').toLowerCase()
                  }`
                : `/info/tv/${item?.id}/${
                    item?.name
                      ? item?.name?.replace(/\s/g, '+').toLowerCase()
                      : item?.title?.replace(/\s/g, '+').toLowerCase()
                  }`,
          }"
        >
          <a-button size="large" type="text" class="info">
            <template #icon>
              <Icon name="bi:info-circle" class="info" />
            </template>
            Chi tiết
          </a-button>
        </NuxtLink>

        <NuxtLink @click.prevent="handelAddToList">
          <a-button size="large" type="text" class="add">
            <template #icon>
              <Icon v-if="isAddToList" name="ic:baseline-check" />
              <Icon v-else name="ic:baseline-plus" />
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
import {
  getAllGenresById,
  getItemList,
  getBackdrop,
} from '@/services/MovieService';
import {
  handelAddItemToList,
  handelRemoveItemFromList,
} from '@/utils/handelAddRemoveItemList';

const props = defineProps<{
  item: any;
}>();
const store: any = useStore();
const isAddToList = ref<boolean>(false);

onBeforeMount(async () => {
  if (store.$state.isLogin) {
    await useAsyncData(
      `itemlist/${store.$state?.userAccount?.id}/${props.item?.id}`,
      () => getItemList(store.$state?.userAccount?.id, props.item?.id)
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
  if (!store.$state?.isLogin) {
    store.$state.openRequireAuthDialog = true;
    return;
  }
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (
      !handelAddItemToList(
        store.$state?.userAccount?.id,
        props.item?.id,
        props.item?.media_type == 'movie' ? 'movie' : 'tv'
      )
    ) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (
      !handelRemoveItemFromList(store.$state?.userAccount?.id, props.item?.id)
    ) {
      isAddToList.value = true;
    }
    return;
  }
};
</script>

<style lang="scss" src="./SlideTopicItem.scss"></style>
