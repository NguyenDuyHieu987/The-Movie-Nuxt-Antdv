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
    <!-- <el-image
      :src="getBackdrop(item?.backdrop_path)"
      :preview="false"
      loading="lazy"
      lazy
    ></el-image> -->

    <img
      class="ant-image"
      v-lazy="getBackdrop(item?.backdrop_path)"
      :preview="false"
      loading="lazy"
      lazy
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
        <a-button size="large" class="play">
          <template #icon>
            <Icon name="ic:play-arrow" class="play" />
          </template>
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
            Xem ngay
          </NuxtLink>
        </a-button>

        <a-button size="large" class="info">
          <template #icon>
            <Icon name="bi:info-circle" class="info" />
          </template>
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
            Chi tiết
          </NuxtLink>
        </a-button>

        <a-button size="large" class="add">
          <template #icon>
            <PlusOutlined />
          </template>
          <span> Thêm</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios';
import { getAllGenresById, getBackdrop } from '@/services/MovieService';
import { PlusOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  item: {
    type: Object,
  },
});
const store = useStore();
</script>

<style lang="scss" src="./SlideTopicItem.scss"></style>
