<template>
  <div class="play-tv padding-content">
    <LoadingCircle v-if="loading" class="loading-page" />

    <div v-else class="play-container">
      <div class="top-page">
        <BackPage
          @onclick="
            navigateTo({
              path: `/info-tv/${dataMovie?.id}/${dataMovie?.name
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
            :videoUrl="getVideoTelevisons(urlCodeMovie)"
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
              :dataMovie="dataMovie"
              type="tv"
              :disabled="disabledRate"
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
                      :to="`/discover/year/${release_date?.slice(0, 4)}`"
                    >
                      {{ release_date?.slice(0, 4) }}
                    </NuxtLink>
                    <span>
                      {{ release_date?.slice(4) }}
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

              <Tags tagsLabel="Số tập:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{
                      dataMovie?.seasons?.find(
                        (item: any) =>
                          item?.season_number ===
                          dataMovie?.last_episode_to_air?.season_number
                      ).episode_count + ' tập'
                    }}
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Thời lượng trêm tập:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{ dataMovie?.episode_run_time[0] + ' phút' }}
                  </span>
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

        <ListEpisodes
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

        <div class="related-content">
          <MovieRelated :movieId="dataMovie?.id" type="tv" />

          <Comment :dataMovie="dataMovie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getBackdrop } from '~/services/image';
import { getVideoTelevisons } from '~/services/video';
import { getTvById } from '~/services/tv';
import { getItemList } from '~/services/list';
import { getItemHistory, add_update_History } from '~/services/history';
import { UpdateView } from '~/services/updateView';
import { getCountryByOriginalLanguage } from '~/services/country';
import BackPage from '@/components/BackPage/BackPage.vue';
import HistoryProgressBar from '@/components/HistoryProgressBar/HistoryProgressBar.vue';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue';
import Tags from '@/components/Tags/Tags.vue';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import MovieRelated from '@/components/MovieRelated/MovieRelated.vue';
import Comment from '@/components/Comment/Comment.vue';
import ListEpisodes from '@/components/ListEpisodes/ListEpisodes.vue';
import LoadingCircle from '@/components/LoadingCircle/LoadingCircle.vue';

const route: any = useRoute();
const utils = useUtils();
const store: any = useStore();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const loading = ref<boolean>(false);
const urlCodeMovie = ref<string>('The_Witcher_S1_Ep1.mp4');
const isAddToList = ref<boolean>(false);
const seconds = ref<number>(0);
const percent = ref<number>(0);
const duration = ref<number>(0);
const isPlayVideo = ref<boolean>(false);
const isUpdateView = ref<boolean>(true);
const isInHistory = ref<boolean>(false);
const percentProgressHistory = ref<number>(0);
const release_date = computed<string>(
  () => dataMovie.value?.last_air_date || dataMovie.value?.first_air_date || ''
);
const disabledRate = ref<boolean>(false);

const internalInstance: any = getCurrentInstance();

const getData = async () => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  isEpisodes.value = true;
  loading.value = true;

  await useAsyncData(`tv/short/${route.params?.id}`, () =>
    getTvById(route.params?.id)
  )
    .then((tvResponed: any) => {
      dataMovie.value = tvResponed.data.value;
      disabledRate.value = tvResponed.data.value?.is_rated == true;

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
    })
    .catch((e) => {
      navigateTo('/404');
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false;
      }, 500);
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });

  if (store.$state.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    if (dataMovie.value?.in_history) {
      isInHistory.value = true;
      percentProgressHistory.value = dataMovie.value?.history_progress?.percent;
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

window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'instant',
});

onBeforeRouteLeave(() => {
  // updateHistory();
});

const updateHistory = () => {
  if (isPlayVideo.value == true && store.$state.isLogin) {
    if (
      seconds.value > 0 &&
      percent.value > 0 &&
      // percent.value > percentProgressHistory.value &&
      duration.value > 0
    ) {
      add_update_History({
        media_type: 'tv',
        media_id: dataMovie.value?.id,
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

const getUrlCodeMovie = (data: string) => {
  urlCodeMovie.value = data;
};

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

        updateHistory();
      } else {
        setTimeout(() => {
          seconds.value = e.seconds;
          percent.value = e.percent;

          updateHistory();
        }, 5000);
      }

      if (seconds.value > e.duration / 2) {
        if (isUpdateView.value == true) {
          UpdateView(route.params?.id, 'tv');
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
    if (!utils.handelAddItemToList(dataMovie.value?.id, 'tv')) {
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

<style lang="scss" src="./PlayTvPage.scss"></style>
