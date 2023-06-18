<template>
  <div class="play-movie padding-content">
    <div v-if="dataMovie?.id" class="play-container">
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
            :loading="loading"
          />
        </div>
        <div class="overlay-backdrop">
          <img :src="getBackdrop(dataMovie?.backdrop_path)" />
        </div>
      </div>

      <div class="reaction-view">
        <a-skeleton-button
          v-if="loading"
          :loading="loading"
          :active="true"
          :size="'default'"
          :block="false"
          class="skeleton-interaction"
        >
        </a-skeleton-button>
        <Interaction :dataMovie="dataMovie" />

        <a-button
          round
          shape="round"
          type="primary"
          class="add-to-list-btn"
          :class="{ active: isAddToList }"
          @click="handelAddToList"
        >
          <template #icon>
            <Icon v-if="isAddToList" name="ic:twotone-playlist-add-check" />
            <Icon v-else name="ic:twotone-playlist-add" />
          </template>
          <span v-if="!isAddToList"> Thêm vòa danh sách</span>
          <span v-else style="margin-left: 8px"> Xóa khỏi danh sách</span>
        </a-button>
      </div>

      <RatingMovie
        :voteAverage="dataMovie?.vote_average"
        :voteCount="dataMovie?.vote_count"
        :movieId="dataMovie?.id"
        type="movie"
      />

      <MovieRelated :movieId="dataMovie?.id" type="movie" />
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
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import MovieRelated from '@/components/MovieRelated/MovieRelated.vue';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue';
import Player from '@vimeo/player';

const store: any = useStore();
const utils = useUtils();
const route: any = useRoute();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const isOpenContent = ref<boolean>(false);
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
    // if (isInHistory.value == true) {
    //   if (
    //     seconds.value > dataItemHistory.value?.seconds &&
    //     percent.value > dataItemHistory.value?.percent &&
    //     dataItemHistory.value?.seconds < duration.value
    //   ) {
    //     add_update_History( {
    //       media_type: 'movie',
    //       media_id: dataMovie.value?.id,
    //       duration: duration.value,
    //       percent: percent.value,
    //       seconds: seconds.value,
    //     }).catch((e) => {
    //       if (axios.isCancel(e)) return;
    //     });
    //   } else {
    //     if (seconds.value > 0 && percent.value > 0) {
    //       add_update_History( {
    //         media_type: 'movie',
    //         media_id: dataMovie.value?.id,
    //         duration: dataItemHistory.value?.duration,
    //         percent: dataItemHistory.value?.percent,
    //         seconds: dataItemHistory.value?.seconds,
    //       }).catch((e) => {
    //         if (axios.isCancel(e)) return;
    //       });
    //     }
    //   }
    // } else {
    //   add_update_History( {
    //     media_type: 'movie',
    //     media_id: dataMovie.value?.id,
    //     duration: duration.value,
    //     percent: percent.value,
    //     seconds: seconds.value,
    //   }).catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
    // }

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

// onMounted(() => {
//   const iframe = document.querySelector('#vimeo-player') as HTMLIFrameElement;
//   const player = new Player(iframe);

//   player.on('play', function (e: any) {
//     // alert('play');
//     duration.value = e.duration;
//     isPlayVideo.value = true;
//   });

//   player.on('timeupdate', function (e: any) {
//     if (e?.seconds > 0) {
//       if (e.seconds > seconds.value && e.percent > percent.value) {
//         if (seconds.value > e.duration - 6) {
//           seconds.value = e.seconds;
//           percent.value = e.percent;
//         } else {
//           setTimeout(() => {
//             seconds.value = e.seconds;
//             percent.value = e.percent;
//           }, 5000);
//         }

//         if (seconds.value > e.duration / 2) {
//           if (isUpdateView.value == true) {
//             UpdateViewMovie(route.params?.id);
//             isUpdateView.value = false;
//           }
//         }
//       }

//       // console.log('seconds:', seconds.value);
//       // console.log('percent:', percent.value);

//       // alert('Time update');
//     }
//   });
// });

const getData = async () => {
  loading.value = true;
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

      loading.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    })
    .catch((e) => {
      loading.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
      if (axios.isCancel(e)) return;
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

window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth',
});
</script>

<style lang="scss" src="./PlayMoviePage.scss"></style>
