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
      />
    </div>

    <div class="billboard-item-body">
      <div class="info">
        <div class="head">
          <nuxt-img class="pngegg" src="/images/pngegg.png" alt="" />
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
              <Icon name="ic:play-arrow" class="play" />
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
              <Icon name="bi:info-circle" class="info" />
            </template>
            Chi tiết
          </a-button>
        </NuxtLink>

        <NuxtLink @click.prevent="handelAddToList">
          <a-button size="large" type="text" class="add modern">
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
import { getBackdrop, getImage } from '~/services/image';
import { getItemList } from '~/services/list';

const props = defineProps<{
  item: any;
}>();
const store: any = useStore();
const utils = useUtils();
const isAddToList = ref<boolean>(false);

onBeforeMount(async () => {
  if (store.$state.isLogin) {
    await useAsyncData(
      `itemlist/${store.$state?.userAccount?.id}/${props.item?.id}`,
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
  if (!store.$state?.isLogin) {
    store.$state.openRequireAuthDialog = true;
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
