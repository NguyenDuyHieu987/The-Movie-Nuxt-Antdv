<template>
  <div class="play-movie padding-content">
    <div v-if="loading" class="play-container">
      <BackPage
        @onclick="
          navigateTo({
            path: `/info/movie/${dataMovie?.id}/${dataMovie?.name
              .replaceAll(' ', '+')
              .toLowerCase()}
          `,
          })
        "
      >
        <span> {{ dataMovie?.name }}</span>
      </BackPage>
      <div class="video">
        <div class="video-wrapper">
          <!-- <iframe
              id="vimeo-player"
              :src="`https://player.vimeo.com/video/${urlCodeMovie}`"
              width="100%"
              height="100%"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe> -->

          <!-- <iframe
              id="okru-player"
              width="100%"
              height="100%"
              :src="`//ok.ru/videoembed/${'3056793684585'}`"
              frameborder="0"
              allow="autoplay"
              allowfullscreen
            ></iframe> -->

          <VideoPlayer
            :videoUrl="getVideoFeature('Transformer_5.mov')"
            :backdrop="getBackdrop(dataMovie?.backdrop_path)"
            @onPlay="(e) => onPLayVideoPlayer(e)"
            @onTimeUpdate="(e) => onTimeUpdateVideoPlayer(e)"
          />
        </div>
      </div>

      <div class="movie-content">
        <div class="main-content">
          <div class="detail-content-left">
            <h2 class="movie-title">{{ dataMovie?.name }}</h2>

            <Tags tagsLabel="Lượt xem:">
              <template #tagsInfo>
                <span class="text">{{
                  dataMovie?.views
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'
                }}</span>
              </template>
            </Tags>

            <div class="overview">
              <Tags tagsLabel="Nội dung:">
                <template #tagsInfo>
                  <span class="text">{{
                    dataMovie?.overview ||
                    'Sorry! This movie has not been updated overview content.'
                  }}</span>
                </template>
              </Tags>
            </div>

            <RatingMovie
              :voteAverage="dataMovie?.vote_average"
              :voteCount="dataMovie?.vote_count"
              :movieId="dataMovie?.id"
              type="movie"
            />

            <div class="action">
              <div class="left">
                <NuxtLink @click.prevent="handelAddToList">
                  <a-button type="text" class="modern add">
                    <template #icon>
                      <Icon v-if="isAddToList" name="ic:baseline-check" />
                      <Icon v-else name="ic:baseline-plus" />
                    </template>
                    <span> Danh sách</span>
                  </a-button>
                </NuxtLink>
              </div>
              <div class="right">
                <Interaction :dataMovie="dataMovie" />

                <NuxtLink @click.prevent="scrollToComment">
                  <a-button size="large" type="text" class="comment modern">
                    <template #icon>
                      <Icon name="ic:outline-comment" class="comment" />
                    </template>
                    <span> Bình luận</span>
                  </a-button>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="detail-content-right">
            <div class="box-short-content">
              <Tags tagsLabel="Tên gốc:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{ dataMovie?.original_name }}
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Đang phát:">
                <template #tagsInfo>
                  <span class="tags-item">HD - Vietsub</span>
                </template>
              </Tags>

              <Tags tagsLabel="Ngày phát hành:">
                <template #tagsInfo>
                  <span class="tags-item">
                    <NuxtLink
                      :to="`/discover/year/${dataMovie?.release_date.slice(
                        0,
                        4
                      )}`"
                    >
                      {{ dataMovie?.release_date.slice(0, 4) }}
                    </NuxtLink>
                    <span>
                      {{ dataMovie?.release_date.slice(4) }}
                    </span>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Quốc gia:">
                <template #tagsInfo>
                  <span class="tags-item">
                    <NuxtLink
                      :to="`/discover/country/${
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.$state.allCountries
                        )?.short_name || 'au-my'
                      }`"
                    >
                      {{
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.$state.allCountries
                        )?.name || ''
                      }}
                    </NuxtLink>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Thể loại:">
                <template #tagsInfo>
                  <span
                    class="tags-item"
                    v-for="(item, index) in dataMovie?.genres"
                    :key="item?.id"
                    :index="index"
                  >
                    <NuxtLink>{{ item?.name }} </NuxtLink>
                    <span>
                      {{ index + 1 != dataMovie?.genres?.length ? ', ' : '' }}
                    </span>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Thời lượng:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{ dataMovie?.runtime + ' phút' }}</span
                  >
                </template>
              </Tags>

              <Tags tagsLabel="Trạng thái:">
                <template #tagsInfo>
                  <span class="tags-item"> {{ dataMovie?.status }}</span>
                </template>
              </Tags>
            </div>
          </div>
        </div>

        <div class="related-content">
          <MovieRelated :movieId="dataMovie?.id" type="movie" />

          <Comment :urlComment="urlComment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getBackdrop } from '~/services/image';
import { getVideoFeature } from '~/services/video';
import { getMovieById } from '~/services/movie';
import { getItemList } from '~/services/list';
import { getItemHistory, add_update_History } from '~/services/history';
import { UpdateViewMovie } from '~/services/movie';
import { getCountryByOriginalLanguage } from '~/services/country';
import BackPage from '@/components/BackPage/BackPage.vue';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue';
import Tags from '@/components/Tags/Tags.vue';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import MovieRelated from '@/components/MovieRelated/MovieRelated.vue';

const store: any = useStore();
const utils = useUtils();
const route: any = useRoute();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const urlComment = computed<string>((): string => window.location.href);
const loading = ref<boolean>(false);
const urlCodeMovie = ref<string>('809431505');
const isAddToList = ref<boolean>(false);
const seconds = ref<number>(0);
const percent = ref<number>(0);
const duration = ref<number>(0);
const isPlayVideo = ref<boolean>(false);
const isUpdateView = ref<boolean>(true);
const isInHistory = ref<boolean>(false);
const dataItemHistory = ref<any>({});

const internalInstance: any = getCurrentInstance();

onBeforeRouteLeave(() => {
  if (isPlayVideo.value == true && store.$state.isLogin) {
    if (seconds.value > 0 && percent.value > 0 && duration.value > 0) {
      add_update_History({
        media_type: 'movie',
        media_id: dataMovie.value?.id,
        duration: duration.value,
        percent: percent.value,
        seconds: seconds.value,
      }).catch((e) => {
        if (axios.isCancel(e)) return;
      });
    }
  }
});

const getData = async () => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  isEpisodes.value = false;

  await useAsyncData(`movie/short/${route.params?.id}`, () =>
    getMovieById(route.params?.id)
  )
    .then((movieResponed: any) => {
      dataMovie.value = movieResponed.data.value;

      useHead({
        title:
          'Xem phim - Phim lẻ - ' + dataMovie.value?.name + ' | Phimhay247',
        htmlAttrs: { lang: 'vi' },
      });

      useSeoMeta({
        title: 'Xem phim - ' + dataMovie.value?.name + ' | Phimhay247',
        description: dataMovie.value?.overview,
        ogTitle: 'Xem phim - ' + dataMovie.value?.name + ' | Phimhay247',
        ogType: 'video.movie',
        ogUrl: window.location.href,
        ogDescription: dataMovie.value?.overview,
        ogImage: getBackdrop(dataMovie.value?.backdrop_path),
        ogLocale: 'vi',
      });
    })
    .catch((e) => {
      navigateTo('/404');
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = true;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });

  if (store.$state.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    if (dataMovie.value?.in_history) {
      isInHistory.value = true;
      dataItemHistory.value = dataMovie.value?.history_progress;
    }

    // await useAsyncData(
    //   `itemlist/${store.$state?.userAccount?.id}/${route.params?.id}`,
    //   () => getItemList(route.params?.id)
    // )
    //   .then((movieRespone: any) => {
    //     if (movieRespone.data.value.data.success == true) {
    //       isAddToList.value = true;
    //     }
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });

    // await useAsyncData(
    //   `itemhistory/${store.$state?.userAccount?.id}/${route.params?.id}`,
    //   () => getItemHistory(route.params?.id)
    // )
    //   .then((movieRespone: any) => {
    //     if (movieRespone.data.value.data.success == true) {
    //       isInHistory.value = true;
    //       dataItemHistory.value = movieRespone.data.value.data?.result;
    //     } else {
    //       isInHistory.value = false;
    //     }
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
  }
};

onBeforeMount(() => {
  getData();
});

// window.scrollTo({
//   top: 0,
//   left: 0,
//   behavior: 'smooth',
// });

const onPLayVideoPlayer = (e: any) => {
  duration.value = e?.duration;
  isPlayVideo.value = true;
};

const onTimeUpdateVideoPlayer = (e: any) => {
  if (e?.seconds > 0) {
    if (e.seconds > seconds.value && e.percent > percent.value) {
      if (seconds.value > e.duration - 6) {
        seconds.value = e.seconds;
        percent.value = e.percent;
      } else {
        setTimeout(() => {
          seconds.value = e.seconds;
          percent.value = e.percent;
        }, 5000);
      }

      if (seconds.value > e.duration / 2) {
        if (isUpdateView.value == true) {
          UpdateViewMovie(route.params?.id);
          isUpdateView.value = false;
        }
      }
    }
  }
};

const handelAddToList = () => {
  if (!store.$state?.isLogin) {
    store.$state.openRequireAuthDialog = true;
    return;
  }
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (!utils.handelAddItemToList(dataMovie.value?.id, 'movie')) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (!utils.handelRemoveItemFromList(dataMovie.value?.id)) {
      isAddToList.value = true;
    }
    return;
  }
};

const scrollToComment = () => {
  const comment = document.getElementById('comment') as HTMLElement;
  comment.scrollIntoView();
};
</script>

<style lang="scss" src="./PlayMoviePage.scss"></style>
