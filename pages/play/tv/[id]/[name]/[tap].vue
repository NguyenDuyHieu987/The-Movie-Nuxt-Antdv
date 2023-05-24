<template>
  <div class="playtv-container">
    <div class="video-player">
      <div class="video-player-wrapper">
        <iframe
          v-if="urlCodeMovie"
          id="okru-player"
          width="100%"
          height="100%"
          :src="`//ok.ru/videoembed/${
            urlCodeMovie ? urlCodeMovie : '3056793684585'
          }`"
          frameborder="0"
          allow="autoplay"
          allowfullscreen
        ></iframe>
        <iframe
          v-else
          id="vimeo-player"
          src="https://player.vimeo.com/video/809431505"
          width="100%"
          height="100%"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div class="overlay-backdrop">
        <img :src="getBackdrop(dataMovie?.backdrop_path)" />
      </div>
    </div>

    <ListEpisodes
      v-if="!checkEmptyDataMovies"
      :dataMovie="dataMovie"
      :numberOfEpisodes="
        dataMovie?.seasons?.find((item: any) =>
          item.season_number === dataMovie?.last_episode_to_air?.season_number
            ? item
            : null
        )?.episode_count
      "
      @setUrlCodeMovie="(data: string) => getUrlCodeMovie(data)"
    />

    <h3 class="section-title width-fit" style="margin-top: 15px">
      <strong> Đánh giá phim</strong>
    </h3>

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
      <Interaction v-else :dataMovie="dataMovie" />
      <a-skeleton-button
        v-if="loading"
        :loading="loading"
        :active="true"
        :size="'default'"
        :block="false"
        class="skeleton-add-to-list"
      >
      </a-skeleton-button>
      <a-button
        v-else
        round
        shape="round"
        type="primary"
        class="add-to-list-btn"
        :class="{ active: isAddToList }"
        @click="handelAddToList"
      >
        <template #icon>
          <!-- <font-awesome-icon v-if="isAddToList" icon="fa-solid fa-check" />
          <PlusOutlined v-else /> -->
          <svg
            v-if="isAddToList"
            class="material-icons-outlined"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#fff"
          >
            <g><rect fill="none" height="24" width="24" /></g>
            <g>
              <g>
                <rect height="2" width="11" x="3" y="10" />
                <rect height="2" width="11" x="3" y="6" />
                <rect height="2" width="7" x="3" y="14" />
                <polygon
                  points="20.59,11.93 16.34,16.17 14.22,14.05 12.81,15.46 16.34,19 22,13.34"
                />
              </g>
            </g>
          </svg>
          <svg
            v-else
            class="material-icons-outlined"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#fff"
          >
            <g><rect fill="none" height="24" width="24" /></g>
            <g>
              <path
                d="M14,10H3v2h11V10z M14,6H3v2h11V6z M18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18z M3,16h7v-2H3V16z"
              />
            </g>
          </svg>
        </template>
        <span v-if="!isAddToList"> Thêm vòa danh sách</span>
        <span v-else style="margin-left: 8px"> Xóa khỏi danh sách</span>
      </a-button>
    </div>

    <div style="margin-top: 15px">
      <a-skeleton
        style="width: 360px"
        :loading="loading"
        :active="true"
        :paragraph="{ rows: 2, width: '50%' }"
        :title="false"
      >
        <RatingMovie
          v-show="!checkEmptyDataMovies"
          :voteAverage="dataMovie?.vote_average"
          :voteCount="dataMovie?.vote_count"
          :movieId="dataMovie?.id"
          :isEpisodes="isEpisodes"
        />
      </a-skeleton>
    </div>

    <h3 class="section-title">
      <strong v-if="!checkEmptyDataMovies">
        {{ dataMovie?.name }}
        {{
          ` (${
            dataMovie?.last_air_date?.slice(0, 4)
              ? dataMovie?.last_air_date?.slice(0, 4)
              : dataMovie?.release_date?.slice(0, 4)
          })`
        }}
      </strong>
      <strong v-else> Nội dung phim </strong>
    </h3>
    <div class="movie-content">
      <a-skeleton
        :loading="loading"
        :active="true"
        :paragraph="{ rows: 3, width: '40%' }"
        :title="false"
      >
        <p :class="{ open: isOpenContent }">
          {{ dataMovie?.overview }}
          <NuxtLink
            :to="{
              path: `/info/tv/${dataMovie?.id}/${dataMovie?.name
                ?.replace(/\s/g, '+')
                .toLowerCase()}`,
            }"
          >
            <strong class="toggle-content"> Chi tiết </strong>
          </NuxtLink>
        </p>
      </a-skeleton>
    </div>

    <Comment :urlComment="urlComment" />

    <MovieSuggest
      v-if="!checkEmptyDataMovies"
      :movieId="dataMovie?.id"
      type="tv"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
  getBackdrop,
  getTvById,
  // getList,
  getItemList,
  add_update_History,
  UpdateViewMovie,
  getItemHistory,
} from '@/services/MovieService';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import MovieSuggest from '@/components/MovieSuggest/MovieSuggest.vue';
import Comment from '@/components/Comment/Comment.vue';
import ListEpisodes from '@/components/ListEpisodes/ListEpisodes.vue';
import {
  handelAddItemToList,
  handelRemoveItemFromList,
} from '@/utils/handelAddRemoveItemList_History';
import Player from '@vimeo/player';

const route: any = useRoute();
const store: any = useStore();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const isOpenContent = ref<boolean>(false);
const urlComment = computed<string>((): string => window.location.href);
const loading = ref<boolean>(false);
const urlCodeMovie = ref<string>('');
const isAddToList = ref<boolean>(false);
const seconds = ref<number>(0);
const percent = ref<number>(0);
const duration = ref<number>(0);
const isPlayVideo = ref<boolean>(false);
const isUpdataView = ref<boolean>(true);
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
    //       media_type: 'tv',
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
    //         media_type: 'tv',
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
    //     media_type: 'tv',
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
        media_type: 'tv',
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

onMounted(() => {
  const iframe = document.querySelector('#vimeo-player') as HTMLIFrameElement;
  const player = new Player(iframe);

  player.on('play', function (e: any) {
    // alert('play');
    duration.value = e.duration;
    isPlayVideo.value = true;
  });

  player.on('timeupdate', function (e: any) {
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
          if (isUpdataView.value == true) {
            UpdateViewMovie(route.params?.id);
            isUpdataView.value = false;
          }
        }
      }

      // console.log('seconds:', seconds.value);
      // console.log('percent:', percent.value);

      // alert('Time update');
    }
  });
});

const getData = async () => {
  loading.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  await useAsyncData(`tv/short/${route.params?.id}`, () =>
    getTvById(route.params?.id)
  )
    .then((tvResponed: any) => {
      isEpisodes.value = true;
      dataMovie.value = tvResponed.data.value.data;

      useHead({
        title:
          'Xem phim - Phim bộ - ' +
          dataMovie.value?.name +
          ' - Phần ' +
          dataMovie.value?.last_episode_to_air?.season_number +
          ' | Phimhay247',
        htmlAttrs: { lang: 'vi' },
      });

      useSeoMeta({
        title:
          'Xem phim - Phim bộ - ' +
          dataMovie.value?.name +
          ' - Phần ' +
          dataMovie.value?.last_episode_to_air?.season_number +
          ' | Phimhay247',
        description: dataMovie.value?.overview,
        ogTitle:
          'Xem phim - Phim bộ - ' +
          dataMovie.value?.name +
          ' - Phần ' +
          dataMovie.value?.last_episode_to_air?.season_number +
          ' | Phimhay247',
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
    //   () => getItemHistory(route.params?.id)
    // );
    // getItemList(route.params?.id)
    //   .then((movieRespone) => {
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

onMounted(() => {
  // getData();
});

router.beforeEach(() => {
  // if (to.params.slug == 'play') {
  //   dataCredit.value = [];
  //   getData();
  // }
});

watch(route, () => {});

const getUrlCodeMovie = (data: string) => {
  urlCodeMovie.value = data;
};

const checkEmptyDataMovies = computed(() => {
  if (Object.keys(dataMovie.value).length == 0) return true;
  else return false;
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
        dataMovie.value?.id,
        'tv'
      )
    ) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (
      !handelRemoveItemFromList(
        store.$state?.userAccount?.id,
        dataMovie.value?.id
      )
    ) {
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

<style lang="scss" src="./PlayViewTV.scss"></style>
