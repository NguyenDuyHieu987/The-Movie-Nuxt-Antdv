<template>
  <div class="movie-info-conainer">
    <div class="main-info">
      <div class="backdrop-img">
        <div class="backdrop-wrapper">
          <el-image
            :src="getBackdrop(dataMovie?.backdrop_path)"
            :preview-src-list="srcBackdropList"
            :preview-teleported="true"
            :lazy="true"
            loading="lazy"
          >
            <template #placeholder>
              <div
                class="ant-image"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                Đang tải<span class="dot">...</span>
              </div>
            </template>
            <template #error>
              <div
                class="el-image error"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                Đang tải<span class="dot">...</span>
              </div>
            </template>
          </el-image>
        </div>
        <div class="overlay-backdrop">
          <img :src="getBackdrop(dataMovie?.backdrop_path)" />
        </div>
      </div>

      <div class="info-movie">
        <a-skeleton
          :loading="loading"
          :active="true"
          :paragraph="{ rows: 2 }"
          :title="false"
        >
          <h2>
            <strong>{{ dataMovie?.name }}</strong>
          </h2>

          <h3>
            <strong>
              {{
                dataMovie?.original_title
                  ? dataMovie?.original_title
                  : dataMovie?.original_name
              }}
              {{ `(${dataMovie?.release_date?.slice(0, 4)})` }}
            </strong>
          </h3>
        </a-skeleton>

        <div v-if="loading" class="widget-skeleton">
          <a-skeleton-button
            :loading="loading"
            :active="true"
            :size="'default'"
            :block="false"
            v-for="(item, index) in 3"
            :index="index"
            :key="index"
          >
          </a-skeleton-button>
        </div>

        <div v-else class="widget">
          <div class="widget-2">
            <div
              class="btn-trailer"
              id="btn-trailer"
              @click="
                () => {
                  isOpenTrailerYoutube = !isOpenTrailerYoutube;
                  if (isOpenTrailerYoutube) scrolltoTrailerYoutube();
                }
              "
            >
              <font-awesome-icon icon="fa-brands fa-youtube" />
              <span>Trailer</span>
            </div>

            <div
              class="btn-add-to-list"
              :class="{ active: isAddToList }"
              @click="handelAddToList"
            >
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

              <!-- <Icon v-if="isAddToList" name="ic:twotone-playlist-add-check" />
              <Icon v-else name="ic:twotone-playlist-add" /> -->

              <span v-if="!isAddToList"> Thêm vòa D/sách</span>
              <span v-else> Xóa khỏi D/sách</span>
            </div>
          </div>
        </div>

        <div class="misc">
          <a-skeleton
            :loading="loading"
            :active="true"
            :paragraph="{ rows: 8, width: 400 }"
            :title="false"
          >
            <p>
              <label>Đang phát: </label>
              <span style="color: red; font-weight: bold"> HD VietSub </span>
            </p>

            <p v-if="!checkEmptyDataMovies">
              <label>Ngày Phát Hành: </label>
              <NuxtLink
                :to="{
                  path: `/discover/years/${
                    dataMovie?.first_air_date?.slice(0, 4)
                      ? dataMovie?.first_air_date?.slice(0, 4)
                      : dataMovie?.release_date?.slice(0, 4)
                  }`,
                }"
              >
                {{
                  dataMovie?.first_air_date?.slice(0, 4)
                    ? dataMovie?.first_air_date?.slice(0, 4)
                    : dataMovie?.release_date?.slice(0, 4)
                }}
              </NuxtLink>
              {{
                dataMovie?.last_air_date?.slice(4, 10)
                  ? dataMovie?.last_air_date?.slice(4, 10)
                  : dataMovie?.release_date?.slice(
                      4,
                      dataMovie?.release_date.length
                    )
              }}
            </p>

            <p v-if="dataMovie?.original_language">
              <label>Quốc gia: </label>
              <NuxtLink
                :to="{
                  path: `/discover/countries/${
                    getCountryByOriginalLanguage(
                      dataMovie?.original_language,
                      store.$state.allCountries
                    )?.short_name || 'au-my'
                  }`,
                }"
              >
                <span>
                  {{
                    getCountryByOriginalLanguage(
                      dataMovie?.original_language,
                      store.$state.allCountries
                    )?.name || ''
                  }}
                </span>
              </NuxtLink>
            </p>
            <p v-if="dataMovie?.genres">
              <label>Thể loại: </label>

              <NuxtLink
                v-for="(item, index) in dataMovie?.genres"
                :key="item?.id"
                :index="index"
                :to="{
                  path: `/discover/genres/${utils
                    .removeVietnameseTones(item?.name)
                    ?.replaceAll(/\s/g, '-')
                    ?.toLowerCase()}`,
                }"
              >
                {{
                  index !== dataMovie?.genres.length - 1
                    ? item?.name + ', '
                    : item?.name
                }}
              </NuxtLink>
            </p>

            <p>
              <label>Diểm đánh giá: </label>
              <span
                style="color: green; font-weight: bold"
                v-if="dataMovie?.vote_average >= 8"
              >
                {{ dataMovie?.vote_average?.toFixed(2) }}
              </span>
              <span
                style="color: yellow; font-weight: bold"
                v-if="
                  dataMovie?.vote_average >= 5 && dataMovie?.vote_average < 8
                "
              >
                {{ dataMovie?.vote_average?.toFixed(2) }}
              </span>
              <span
                style="color: red; font-weight: bold"
                v-if="dataMovie?.vote_average < 5"
              >
                {{ dataMovie?.vote_average?.toFixed(2) }}
              </span>
            </p>

            <p>
              <label>Lượt xem: </label>
              <span>{{
                dataMovie?.views
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'
              }}</span>
            </p>

            <p>
              <label>Thời lượng: </label>
              <span>{{ dataMovie?.runtime + ' phút' }}</span>
            </p>

            <p>
              <label>Trạng thái: </label>
              {{ dataMovie?.status }}
            </p>
          </a-skeleton>
        </div>

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

        <div style="margin-top: 15px">
          <a-skeleton
            style="width: 100%"
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
      </div>
    </div>

    <!-- <CastCrew :dataCredit="dataCredit" :loading="loading" />

    <MovieSuggest
      v-if="!checkEmptyDataMovies"
      :movieId="dataMovie?.id"
      type="movie"
    /> -->
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getItemList } from '~/services/list';
import { getPoster, getBackdrop } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getCountryByOriginalLanguage } from '~/services/country';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import CastCrew from '@/components/CastCrew/CastCrew.vue';
import MovieSuggest from '@/components/MovieSuggest/MovieSuggest.vue';

const store = useStore();
const utils = useUtils();
const route: any = useRoute();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const dataCredit = ref<any>({});
const isOpenContent = ref<boolean>(false);
const isOpenTrailerYoutube = ref<boolean>(false);
const loading = ref<boolean>(false);
const srcBackdropList = ref<string[]>([]);
const isAddToList = ref<boolean>(false);

const internalInstance: any = getCurrentInstance();

onMounted(() => {});

const getData = async () => {
  isAddToList.value = false;
  loading.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  srcBackdropList.value = [];
  isEpisodes.value = false;

  await useAsyncData(`movie/detail/${route.params?.id}`, () =>
    getMovieById(route.params?.id, 'images,credits')
  )
    .then((movieResponed: any) => {
      dataMovie.value = movieResponed.data.value;
      dataCredit.value = movieResponed.data.value?.credits;

      useHead({
        title:
          'Thông tin - Phim lẻ - ' + dataMovie.value?.name + ' | Phimhay247',
        htmlAttrs: { lang: 'vi' },
      });

      useSeoMeta({
        title: 'Thông tin - ' + dataMovie.value?.name + ' | Phimhay247',
        description: dataMovie.value?.overview,
        ogTitle: 'Thông tin - ' + dataMovie.value?.name + ' | Phimhay247',
        ogType: 'video.movie',
        ogUrl: window.location.href,
        ogDescription: dataMovie.value?.overview,
        ogImage: getBackdrop(dataMovie.value?.backdrop_path),
        ogLocale: 'vi',
      });

      // movieResponed?.data?.images?.backdrops?.forEach((item) => {
      //   srcBackdropList.value.push(
      //     'https://image.tmdb.org/t/p/original' + item?.file_path
      //   );
      // });

      srcBackdropList.value = Array.from(
        movieResponed.data.value.images?.backdrops,
        (item: any) => 'https://image.tmdb.org/t/p/original' + item?.file_path
      );

      loading.value = false;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });

  if (store.$state.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
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
  }
};

onBeforeMount(() => {
  getData();
});

onMounted(() => {
  // getData();
});

const scrolltoTrailerYoutube = () => {
  const trailer_youtube = document.getElementById(
    'trailer-youtube'
  ) as HTMLElement;
  trailer_youtube.scrollIntoView();
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

router.beforeEach((to) => {
  if (to.params.slug == 'info') {
    dataCredit.value = [];

    getData();
  }
});

watch(route, () => {
  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'smooth',
  // });
  // dataCredit.value = [];
  // getData();
});

const checkEmptyDataMovies = computed(() => {
  if (Object.keys(dataMovie.value).length == 0) return true;
  else return false;
});

window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth',
});
</script>

<style lang="scss" src="./PrevPlayView.scss"></style>
