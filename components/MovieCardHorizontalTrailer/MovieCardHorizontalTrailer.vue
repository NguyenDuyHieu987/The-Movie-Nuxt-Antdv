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
    class="movie-card-horizontal-item"
  >
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="ant-image" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div>
      </template>

      <template #default>
        <div class="img-box">
          <img
            class="ant-image"
            v-lazy="getBackdrop(item?.backdrop_path, ',250')"
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

          <div v-if="!loading" class="duration-episode-box">
            <p v-if="!isEpisodes" class="duration-episode">
              {{ dataMovie?.runtime + ' min' }}
            </p>
            <p v-else class="duration-episode">
              {{
                dataMovie?.last_episode_to_air?.episode_number
                  ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                  : ''
              }}
            </p>
          </div>

          <div
            class="youtub-icon"
            v-if="!loading"
            @click.prevent="handleClickTrailerIcon"
          >
            <font-awesome-icon icon="fa-brands fa-youtube" />
          </div>

          <div v-if="!loading" class="release-date-box">
            <p class="release-date" v-if="!isEpisodes">
              {{ item?.release_date?.slice(0, 4) }}
            </p>
            <p v-else class="release-date">
              {{
                dataMovie?.last_air_date?.slice(0, 4)
                  ? dataMovie?.last_air_date?.slice(0, 4)
                  : dataMovie?.first_air_date?.slice(0, 4)
              }}
            </p>
          </div>
        </div>
        <a-tooltip
          :title="
            getLanguage(item?.original_language, store.$state.allCountries)
              ?.name
              ? getLanguage(item?.original_language, store.$state.allCountries)
                  ?.name
              : ''
          "
        >
          <div class="info">
            <!-- <a-skeleton
                :loading="loading"
                :active="true"
                :paragraph="{ rows: 2 }"
                :title="false"
              > -->
            <p class="title">
              {{ item?.name }}
              <span v-if="isEpisodes">
                {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
              </span>
            </p>
            <div class="info-bottom">
              <!-- <p class="genres" v-if="item?.genre_ids">
                  {{
                    getAllGenresById(
                      item?.genre_ids,
                      store.state?.allGenres
                    ).join(' • ')
                  }}
                </p> -->
              <p class="genres" v-if="dataMovie?.genres">
                {{
                  Array?.from(dataMovie?.genres, (x: any) => x.name).join(' • ')
                }}
              </p>
            </div>
            <!-- </a-skeleton> -->
          </div>
        </a-tooltip>

        <a-modal
          v-model:visible="isOenModalTrailer"
          width="1300px"
          centered
          class="modal-trailer"
          :closable="false"
        >
          <CloseBtn @click="isOenModalTrailer = false" />

          <iframe
            height="650px"
            width="100%"
            :src="
              dataMovie?.videos?.results?.length != 0
                ? `https://www.youtube.com/embed/${
                    dataMovie?.videos?.results[
                      Math.floor(
                        Math.random() * dataMovie?.videos?.results?.length
                      )
                    ]?.key
                  }`
                : 'https://www.youtube.com/embed/ndl1W4ltcmg'
            "
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="{0}"
          />
          <template #footer>
            <div class="content">
              <div class="info">
                <h3>
                  <strong> {{ item?.name }}</strong>
                </h3>

                <p class="overview">
                  {{ dataMovie?.overview }}
                </p>
              </div>
              <div class="action">
                <a-button size="large" type="text" @click="handleCancel"
                  >Đóng
                </a-button>
                <NuxtLink
                  v-if="isEpisodes"
                  :to="{
                    path: `/play/tv/${item?.id}/${item?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}/tap-1`,
                  }"
                  class="btn-play-now"
                >
                  Xem ngay
                </NuxtLink>
                <NuxtLink
                  v-else-if="!isEpisodes"
                  :to="{
                    path: `/play/movie/${item?.id}/${item?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}`,
                  }"
                  class="btn-play-now"
                >
                  Xem ngay
                </NuxtLink>
              </div>
            </div>
          </template>
        </a-modal>
      </template>
    </el-skeleton>
  </NuxtLink>
</template>

<script setup lang="ts">
import axios from 'axios';
import CloseBtn from '@/components/button/CloseBtn/CloseBtn.vue';
import {
  getBackdrop,
  getTvById,
  getMovieById,
  getLanguage,
  getItemHistory,
} from '@/services/MovieService';

const props = defineProps<{
  item: any;
  type: string | undefined;
}>();

const store: any = useStore();
const dataMovie = ref<any>({});
const isEpisodes = ref<boolean>(false);
const loading = ref<boolean>(false);
const isInHistory = ref<boolean>(false);
const percent = ref<number>(0);
const isOenModalTrailer = ref<boolean>(false);

onBeforeMount(async () => {
  loading.value = true;

  if (props?.type) {
    switch (props?.type) {
      case 'movie':
        isEpisodes.value = false;
        await useAsyncData(`movie/short/${props.item?.id}`, () =>
          getMovieById(props.item?.id)
        )
          .then((movieResponed: any) => {
            dataMovie.value = movieResponed.data.value.data;

            loading.value = false;
          })
          .catch((e) => {
            loading.value = false;
            if (axios.isCancel(e)) return;
          });
        break;
      case 'tv':
        isEpisodes.value = true;

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
        break;
      default:
        break;
    }
  } else {
    if (props?.item?.media_type == 'tv' || props?.item?.type) {
      isEpisodes.value = true;

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
      isEpisodes.value = false;
      await useAsyncData(`movie/short/${props.item?.id}`, () =>
        getMovieById(props.item?.id)
      )
        .then((movieResponed: any) => {
          dataMovie.value = movieResponed.data.value.data;

          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
          if (axios.isCancel(e)) return;
        });
    }
  }

  if (store.$state.isLogin) {
    await useAsyncData(
      `itemhistory/${store.$state?.userAccount?.id}/${props.item?.id}`,
      () => getItemHistory(store.$state?.userAccount?.id, props.item?.id)
    )
      .then((movieRespone: any) => {
        if (movieRespone.data.value.data.success == true) {
          isInHistory.value = true;
          percent.value = movieRespone.data.value.data?.result?.percent;
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }
});

const handleClickTrailerIcon = () => {
  isOenModalTrailer.value = true;
};

const handleCancel = () => {
  isOenModalTrailer.value = false;
};
</script>
<style lang="scss" src="./MovieCardHorizontalTrailer.scss"></style>
