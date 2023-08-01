<template>
  <div class="movie-info">
    <LoadingCircle v-if="loading" class="loading-page" />

    <div class="info-conainer" v-else>
      <BackPage @onclick="$router.back()">
        <span> Quay lại</span>
      </BackPage>

      <div class="variant-backdrop"></div>

      <div class="main-info">
        <div class="backdrop-img">
          <div class="backdrop-wrapper">
            <!-- <el-image
              :src="getBackdrop(dataMovie?.backdrop_path)"
              :preview-src-list="srcBackdropList"
              :preview-teleported="true"
              :lazy="true"
              loading="lazy"
            /> -->
            <nuxt-img
              class="ant-image"
              :src="
                getImage(
                  dataMovie?.backdrop_path,
                  'backdrop',
                  'w-' + windowWidth.toString()
                )
              "
              loading="lazy"
            />
          </div>
          <div class="poster">
            <div class="poster-wrapper">
              <nuxt-img
                class="ant-image"
                :src="getImage(dataMovie?.poster_path, 'poster', 'w-250')"
                loading="lazy"
              />
            </div>
          </div>

          <div class="overlay-backdrop">
            <nuxt-img
              :src="
                getImage(
                  dataMovie?.backdrop_path,
                  'backdrop',
                  'w-' + windowWidth.toString()
                )
              "
              loading="lazy"
            />
          </div>
        </div>

        <div class="movie-content">
          <!-- <div class="variant-content"></div> -->

          <div class="main-content">
            <div class="detail-content-left">
              <div class="head-content">
                <h1 class="movie-title">{{ dataMovie?.name }}</h1>
                <div class="action">
                  <div class="left">
                    <NuxtLink
                      class="action-btn"
                      :to="{
                        path: `/play-movie/${dataMovie?.id}/${dataMovie?.name
                          ?.replace(/\s/g, '+')
                          .toLowerCase()}`,
                      }"
                    >
                      <a-button size="large" type="text" class="play modern">
                        <template #icon>
                          <!-- <Icon name="ci:play-arrow" class="play" /> -->

                          <svg
                            class="play"
                            xmlns="http://www.w3.org/2000/svg"
                            width="3rem"
                            height="3rem"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </template>
                        Xem ngay
                      </a-button>
                    </NuxtLink>

                    <div class="action-btn">
                      <a-button size="large" type="text" class="add modern">
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

                    <div class="action-btn" @click="scrollToTrailer">
                      <a-button size="large" type="text" class="trailer modern">
                        <template #icon>
                          <!-- <Icon name="fa6-brands:youtube" class="trailer" /> -->

                          <svg
                            class="trailer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.8rem"
                            height="1.8rem"
                            viewBox="0 0 576 512"
                          >
                            <path
                              d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597c-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821c11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205l-142.739 81.201z"
                            />
                          </svg>
                        </template>
                        <span> Trailer</span>
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

                    <!-- <div class="ellipsis">
                      <Icon name="fa6-solid:ellipsis" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.9rem"
                        height="1.9rem"
                        viewBox="0 0 512 512"
                      >
                        <circle cx="256" cy="256" r="48" fill="currentColor" />
                        <circle cx="256" cy="416" r="48" fill="currentColor" />
                        <circle cx="256" cy="96" r="48" fill="currentColor" />
                      </svg>
                    </div> -->
                  </div>
                </div>
              </div>

              <Tags tagsLabel="Nội dung:" class="tags-overview">
                <template #tagsInfo>
                  <Overview :content="dataMovie?.overview" />
                  <!-- <span class="text">
                      {{
                        dataMovie?.overview ||
                        'Sorry! This movie has not been updated overview content.'
                      }}
                    </span> -->
                </template>
              </Tags>

              <RatingMovie
                :dataMovie="dataMovie"
                type="movie"
                :disabled="disabledRate"
              />

              <Tags tagsLabel="Lượt xem:">
                <template #tagsInfo>
                  <span class="text">{{
                    dataMovie?.views
                      ?.toString()
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'
                  }}</span>
                </template>
              </Tags>
            </div>

            <div class="detail-content-right">
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
                      :to="`/discover/year/${dataMovie?.release_date?.slice(
                        0,
                        4
                      )}`"
                    >
                      {{ dataMovie?.release_date?.slice(0, 4) }}
                    </NuxtLink>
                    <span>
                      {{ dataMovie?.release_date?.slice(4) }}
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
                    >
                      {{ item?.name }}
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

          <Tags
            v-show="dataMovie?.in_history"
            tagsLabel="Đã xem:"
            class="progress-history-tags"
          >
            <template #tagsInfo>
              <HistoryProgressBar
                :historyProgress="dataMovie?.history_progress?.percent"
              />
            </template>
          </Tags>
        </div>
      </div>
      <div class="related-content padding-content">
        <MovieRelated :movieId="dataMovie?.id" type="movie" />

        <CastCrew :dataMovie="dataMovie" />

        <div class="trailer" id="trailer">
          <h2 class="gradient-title-default">Trailer</h2>
          <iframe
            height="100%"
            width="100%"
            :src="// dataMovie?.videos?.length != 0
            //   ? `https://www.youtube.com/embed/${dataMovie?.videos[0]?.key}` // Math.floor(Math.random() * dataMovie?.videos?.length)
            //   :

            'https://www.youtube.com/embed/itnqEauWQZM'"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="{0}"
          />
        </div>

        <Comment :dataMovie="dataMovie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getItemList } from '~/services/list';
import { getPoster, getBackdrop, getImage } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getGenreById } from '~/services/genres';
import { getCountryByOriginalLanguage } from '~/services/country';
import BackPage from '@/components/BackPage/BackPage.vue';
import Tags from '@/components/Tags/Tags.vue';
import Overview from '@/components/Overview/Overview.vue';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import CastCrew from '@/components/CastCrew/CastCrew.vue';
import MovieRelated from '@/components/MovieRelated/MovieRelated.vue';
import HistoryProgressBar from '@/components/HistoryProgressBar/HistoryProgressBar.vue';
import Comment from '@/components/Comment/Comment.vue';
import LoadingCircle from '@/components/LoadingCircle/LoadingCircle.vue';

definePageMeta({
  middleware: (to, from) => {},
});

const store = useStore();
const utils = useUtils();
const route: any = useRoute();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const dataCredit = ref<any>({});
const loading = ref<boolean>(false);
const srcBackdropList = ref<string[]>([]);
const isAddToList = ref<boolean>(false);
const disabledRate = ref<boolean>(false);
const windowWidth = ref<number>(window.innerWidth);

const internalInstance: any = getCurrentInstance();

const setBackgroundColor = (color: string[]) => {
  const main_color = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;

  const backdrop_wrapper = document.getElementsByClassName(
    'backdrop-wrapper'
  )[0] as HTMLElement;

  // backdrop_wrapper.style.setProperty('--dominant-backdrop-color', main_color);
};

const getData = async () => {
  isAddToList.value = false;
  isEpisodes.value = false;
  loading.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  srcBackdropList.value = [];

  await useAsyncData(`movie/detail/${route.params?.id}`, () =>
    getMovieById(route.params?.id, 'videos')
  )
    .then((movieResponed: any) => {
      dataMovie.value = movieResponed.data.value;
      // dataCredit.value = movieResponed.data.value?.credits;
      disabledRate.value = movieResponed.data.value?.is_rated == true;

      // movieResponed?.data?.images?.backdrops?.forEach((item) => {
      //   srcBackdropList.value.push(
      //     'https://image.tmdb.org/t/p/original' + item?.file_path
      //   );
      // });

      // srcBackdropList.value = Array.from(
      //   movieResponed.data.value.images?.backdrops,
      //   (item: any) => 'https://image.tmdb.org/t/p/original' + item?.file_path
      // );

      setBackgroundColor(dataMovie.value.dominant_backdrop_color);
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

  if (store.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
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
  }
};

onBeforeMount(() => {
  // console.log(router.options.history.state);
  getData();
});

useHead({
  title: 'Thông tin - Phim lẻ - ' + dataMovie.value?.name + ' | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Thông tin - ' + dataMovie.value?.name + ' | Phimhay247',
  description: dataMovie.value?.overview,
  ogTitle: 'Thông tin - ' + dataMovie.value?.name + ' | Phimhay247',
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

const handelAddToList = () => {
  if (!store.isLogin) {
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

const scrollToTrailer = () => {
  const trailer = document.getElementById('trailer') as HTMLElement;
  trailer.scrollIntoView();
};

const scrollToComment = () => {
  const comment = document.getElementById('comment') as HTMLElement;
  comment.scrollIntoView();
};
</script>

<style lang="scss" src="./InfoMoviePage.scss"></style>
