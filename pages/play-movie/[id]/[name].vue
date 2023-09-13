<template>
  <div class="play-movie padding-content">
    <LoadingCircle v-if="loading" class="loading-page" />

    <div v-else class="play-container">
      <div class="top-page">
        <BackPage
          @onclick="
            navigateTo({
              path: `/info-movie/${dataMovie?.id}/${utils
                .removeVietnameseTones(dataMovie?.name)
                .replaceAll(' ', '+')
                .toLowerCase()}
            `,
            })
          "
        >
          <span> {{ dataMovie?.name }}</span>
        </BackPage>

        <HistoryProgressBar :historyProgress="percentProgressHistory" />
      </div>

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
            :dataMovie="dataMovie"
            videoUrl="feature/Transformer_5.mp4"
            :backdrop="
              getImage(
                dataMovie?.backdrop_path,
                'backdrop',
                'w-' + windowWidth.toString()
              )
            "
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
                    ?.toString()
                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'
                }}</span>
              </template>
            </Tags>

            <Tags tagsLabel="Nội dung:" class="tags-overview">
              <template #tagsInfo>
                <Overview :content="dataMovie?.overview" />
              </template>
            </Tags>

            <RatingMovie :dataMovie="dataMovie" :disabled="disabledRate" />

            <div class="action">
              <div class="left">
                <div class="action-btn" @click="handelAddToList">
                  <a-button type="text" class="modern add">
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
                        <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                      </svg>
                    </template>
                    <span> Danh sách</span>
                  </a-button>
                </div>
              </div>
              <div class="right">
                <Interaction :dataMovie="dataMovie" />

                <div class="action-btn" @click="scrollToComment">
                  <a-button size="large" type="text" class="comment modern">
                    <template #icon>
                      <!-- <Icon name="ic:outline-comment" class="comment" /> -->

                      <svg
                        class="comment"
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.1rem"
                        height="2.1rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4l-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z"
                        />
                      </svg>
                    </template>
                    <span> Bình luận</span>
                  </a-button>
                </div>
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
                          store.allCountries
                        )?.short_name || 'au-my'
                      }`"
                    >
                      {{
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.allCountries
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
                    <NuxtLink
                      :to="`/discover/genre/${
                        getGenreById(item?.id, store.allGenres)?.short_name
                      }`"
                      >{{ item?.name }}
                    </NuxtLink>
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

          <Comment :dataMovie="dataMovie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getBackdrop, getImage } from '~/services/image';
import { getVideoFeature } from '~/services/video';
import { getMovieById } from '~/services/movie';
import { getItemList } from '~/services/list';
import { getItemHistory, add_update_History } from '~/services/history';
import { UpdateView } from '~/services/updateView';
import { getGenreById } from '~/services/genres';
import { getCountryByOriginalLanguage } from '~/services/country';
import BackPage from '~/components/BackPage/BackPage.vue';
import HistoryProgressBar from '~/components/HistoryProgressBar/HistoryProgressBar.vue';
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer.vue';
import Tags from '~/components/Tags/Tags.vue';
import Overview from '~/components/Overview/Overview.vue';
import Interaction from '~/components/Interaction/Interaction.vue';
import RatingMovie from '~/components/RatingMovie/RatingMovie.vue';
import MovieRelated from '~/components/MovieRelated/MovieRelated.vue';
import Comment from '~/components/Comment/Comment.vue';
import LoadingCircle from '~/components/LoadingCircle/LoadingCircle.vue';

const store: any = useStore();
const utils = useUtils();
const route: any = useRoute();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const urlCodeMovie = ref<string>('809431505');
const isAddToList = ref<boolean>(false);
const seconds = ref<number>(0);
const percent = ref<number>(0);
const duration = ref<number>(0);
const isPlayVideo = ref<boolean>(false);
const isUpdateView = ref<boolean>(true);
const isInHistory = ref<boolean>(false);
const percentProgressHistory = ref<number>(0);
const disabledRate = ref<boolean>(false);
const windowWidth = ref<number>(window.innerWidth);

const internalInstance: any = getCurrentInstance();

const getData = async () => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  loading.value = true;
  isEpisodes.value = false;

  await useAsyncData(`movie/short/${route.params?.id}`, () =>
    getMovieById(route.params?.id)
  )
    .then((movieResponed: any) => {
      dataMovie.value = movieResponed.data.value;
      disabledRate.value = movieResponed.data.value?.is_rated == true;
    })
    .catch((e) => {
      navigateTo('/404');
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });

  if (store.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    if (dataMovie.value?.in_history) {
      isInHistory.value = true;
      percentProgressHistory.value = dataMovie.value?.history_progress?.percent;
    }

    // await useAsyncData(
    //   `itemlist/${store?.userAccount?.id}/${route.params?.id}`,
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
    //   `itemhistory/${store?.userAccount?.id}/${route.params?.id}`,
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

useHead({
  title: 'Xem phim - Phim lẻ - ' + dataMovie.value?.name,
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Xem phim - ' + dataMovie.value?.name,
  description: dataMovie.value?.overview,
  ogTitle: 'Xem phim - ' + dataMovie.value?.name,
  ogType: 'video.movie',
  ogUrl: window.location.href,
  ogDescription: dataMovie.value?.overview,
  ogImage: getBackdrop(dataMovie.value?.backdrop_path),
  ogLocale: 'vi',
});

window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'instant',
});

const updateHistory = () => {
  if (isPlayVideo.value == true && store.isLogin) {
    if (
      seconds.value > 0 &&
      percent.value > 0 &&
      // percent.value > percentProgressHistory.value &&
      duration.value > 0
    ) {
      add_update_History({
        media_type: 'movie',
        movie_id: dataMovie.value?.id,
        duration: duration.value,
        percent: percent.value,
        seconds: seconds.value,
      })
        .then((response) => {
          if (response?.success) {
            // percentProgressHistory.value = percent.value;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }
  }
};

onBeforeRouteLeave(() => {
  updateHistory();
});

const onPLayVideoPlayer = (e: any) => {
  duration.value = e?.duration;
  isPlayVideo.value = true;
};

const onTimeUpdateVideoPlayer = (e: any) => {
  if (e?.seconds > 0) {
    percentProgressHistory.value = e.percent;

    if (e.seconds > seconds.value && e.percent > percent.value) {
      if (seconds.value > e.duration - 6) {
        seconds.value = e.seconds;
        percent.value = e.percent;

        // updateHistory();
      } else {
        setTimeout(() => {
          seconds.value = e.seconds;
          percent.value = e.percent;

          // updateHistory();
        }, 5000);
      }

      if (seconds.value > e.duration / 2) {
        if (isUpdateView.value == true) {
          UpdateView(route.params?.id, 'movie');
          isUpdateView.value = false;
        }
      }
    }
  }
};

const handelAddToList = () => {
  if (!store?.isLogin) {
    store.openRequireAuthDialog = true;
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
    if (!utils.handelRemoveItemFromList(dataMovie.value?.id, 'movie')) {
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
