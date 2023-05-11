<template>
  <div class="prev-playtv-conainer">
    <div class="main-info">
      <div class="backdrop-img">
        <div class="backdrop-wrapper">
          <el-image
            :src="getBackdrop(dataMovie?.backdrop_path)"
            :preview-src-list="srcBackdropList"
            :preview-teleported="true"
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

          <div class="poster-img">
            <el-image
              :src="getPoster(dataMovie?.poster_path)"
              :preview-src-list="srcBackdropList"
              :preview-teleported="true"
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

            <NuxtLink
              v-if="!loading"
              :to="{
                path: `/play/tv/${dataMovie?.id}/${
                  dataMovie?.name
                    ? dataMovie?.name?.replace(/\s/g, '+').toLowerCase()
                    : dataMovie?.title?.replace(/\s/g, '+').toLowerCase()
                }/tap-1`,
              }"
              class="btn-play-now"
            >
              <font-awesome-icon icon="fa-solid fa-play" />
              <span> Xem ngay</span>
            </NuxtLink>

            <strong class="hd-brand">HD</strong>
          </div>
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
            <strong>{{
              dataMovie?.name ? dataMovie?.name : dataMovie?.title
            }}</strong>
            <strong>
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </strong>
          </h2>

          <h3>
            <strong>
              {{
                dataMovie?.original_title
                  ? dataMovie?.original_title
                  : dataMovie?.original_name
              }}
              {{
                `(${
                  dataMovie?.last_air_date?.slice(0, 4)
                    ? dataMovie?.last_air_date?.slice(0, 4)
                    : dataMovie?.last_episode_to_air?.air_date?.slice(0, 4)
                })`
              }}
            </strong>
            <strong>
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
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
          <div class="poster-img-mobile">
            <el-image
              :src="getPoster(dataMovie?.poster_path)"
              :preview-src-list="srcBackdropList"
              :preview-teleported="true"
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

            <NuxtLink
              v-if="!loading"
              :to="{
                path: `/play/tv/${dataMovie?.id}/${
                  dataMovie?.name
                    ? dataMovie?.name?.replace(/\s/g, '+').toLowerCase()
                    : dataMovie?.title?.replace(/\s/g, '+').toLowerCase()
                }/tap-1`,
              }"
              class="btn-play-now"
            >
              <font-awesome-icon icon="fa-solid fa-play" />
              <span> Xem ngay</span>
            </NuxtLink>

            <strong class="hd-brand">HD</strong>
          </div>

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
              <!-- <font-awesome-icon v-if="isAddToList" icon="fa-solid fa-check" />
              <font-awesome-icon v-else icon="fa-solid fa-bookmark" /> -->
              <!-- <span v-if="isAddToList" class="material-icons-outlined">
                playlist_add_check
              </span>
              <span v-else class="material-icons-outlined"> playlist_add </span> -->
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
                    getLanguage(
                      dataMovie?.original_language,
                      store.$state.allCountries
                    )?.short_name
                      ? getLanguage(
                          dataMovie?.original_language,
                          store.$state.allCountries
                        )?.short_name
                      : 'au-my'
                  }`,
                }"
              >
                <span>
                  {{
                    getLanguage(
                      dataMovie?.original_language,
                      store.$state.allCountries
                    )?.name
                      ? getLanguage(
                          dataMovie?.original_language,
                          store.$state.allCountries
                        )?.name
                      : ''
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
                  path: `/discover/genres/${removeVietnameseTones(item?.name)
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
              <label>Số lượng tập: </label>
              {{
                dataMovie?.seasons?.find((item) =>
                  item?.season_number ===
                  dataMovie?.last_episode_to_air?.season_number
                    ? item
                    : null
                ).episode_count + ' tập'
              }}
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
              <label> Thời lượng trên tập: </label>
              <span>
                {{ dataMovie?.episode_run_time[0] + ' phút' }}
              </span>
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

    <LastestEpisodes
      v-if="!checkEmptyDataMovies"
      :dataMovie="dataMovie"
      :numberOfEpisodes="
        dataMovie?.seasons?.find((item) =>
          item.season_number === dataMovie?.last_episode_to_air?.season_number
            ? item
            : null
        )?.episode_count
      "
      :loading="loading"
    />

    <h3 class="section-title">
      <strong>Nội dung phim</strong>
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
        </p>
        <strong class="toggle-content" @click="isOpenContent = !isOpenContent">
          {{ !isOpenContent ? 'Xem thêm' : 'Ẩn bớt' }}
        </strong>
      </a-skeleton>
    </div>

    <div id="trailer-youtube">
      <div class="trailer-youtube" :class="{ active: isOpenTrailerYoutube }">
        <h3 class="section-title">
          <strong>Trailer</strong>
        </h3>
        <iframe
          height="650px"
          width="100%"
          :src="
            dataMovie?.videos?.results?.length !== 0
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
      </div>
    </div>

    <CastCrew :dataCredit="dataCredit" :loading="loading" />

    <MovieSuggest
      v-if="!checkEmptyDataMovies"
      :movieId="dataMovie?.id"
      type="tv"
    />
  </div>
</template>

<script setup>
import { createVNode } from 'vue';
import axios from 'axios';
import {
  getPoster,
  getBackdrop,
  getTvById,
  getLanguage,
  addItemList,
  removeItemList,
  getItemList,
  // getList,
  // getColorImage,
} from '@/services/MovieService';
// import carousel from 'vue-owl-carousel/src/Carousel';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import LastestEpisodes from '@/components/LastestEpisodes/LastestEpisodes.vue';
import CastCrew from '@/components/CastCrew/CastCrew.vue';
import MovieSuggest from '@/components/MovieSuggest/MovieSuggest.vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import {
  Modal,
  // message
} from 'ant-design-vue';
import { removeVietnameseTones } from '@/utils/RemoveVietnameseTones';
import { ElMessage, ElMessageBox } from 'element-plus';
import { message } from 'ant-design-vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const isEpisodes = ref(false);
const dataMovie = ref({});
const dataCredit = ref([]);
// const dataAddToList = ref([]);
const isOpenContent = ref(false);
const isOpenTrailerYoutube = ref(false);
const loading = ref(false);
const srcBackdropList = ref([]);
const isAddToList = ref(false);

const internalInstance = getCurrentInstance();

onMounted(() => {});

const getData = async () => {
  isAddToList.value = false;
  loading.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  useHead({
    title:
      'Phimhay247 - Thông tin - ' +
      Array?.from(
        route.params?.name?.split('+'),
        (x) => x.charAt(0).toUpperCase() + x.slice(1)
      ).join(' ')
        ? 'Phimhay247 - Thông tin - ' +
          Array?.from(
            route.params?.name?.split('+'),
            (x) => x.charAt(0).toUpperCase() + x.slice(1)
          ).join(' ')
        : 'Phimhay247 - Thông tin - ' +
          Array?.from(
            route.params?.name?.split('+'),
            (x) => x.charAt(0).toUpperCase() + x.slice(1)
          ).join(' '),
    htmlAttrs: { lang: 'vi', amp: true },
  });

  srcBackdropList.value = [];

  await useAsyncData(`tv/detail/${route.params?.id}`, () =>
    getTvById(route.params?.id, 'images,credits')
  )
    .then((tvResponed) => {
      isEpisodes.value = true;
      dataMovie.value = tvResponed.data.value.data;
      dataCredit.value = tvResponed.data.value.data?.credits;
      dataCredit.value = tvResponed.data.value.data?.credits;

      // tvResponed?.data?.images?.backdrops?.forEach((item) => {
      //   srcBackdropList.value.push(
      //     'https://image.tmdb.org/t/p/original' + item?.file_path
      //   );
      // });

      srcBackdropList.value = Array.from(
        tvResponed.data.value.data.images?.backdrops,
        (item) => 'https://image.tmdb.org/t/p/original' + item?.file_path
      );

      setTimeout(() => {
        loading.value = false;
        internalInstance.appContext.config.globalProperties.$Progress.finish();
      }, 1500);
    })
    .catch((e) => {
      loading.value = false;
      if (axios.isCancel(e)) return;
    });

  if (store.$state.isLogin) {
    await useAsyncData(
      `itemlist/${store.$state?.userAccount?.id}/${route.params?.id}`,
      () => getItemList(store.$state?.userAccount?.id, route.params?.id)
    )
      .then((movieRespone) => {
        if (movieRespone.data.value.data.success == true) {
          isAddToList.value = true;
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    // getList(store.$state?.userAccount?.id)
    //   .then((movieRespone) => {
    //     dataAddToList.value = movieRespone?.data?.items;

    //     dataAddToList.value?.map((item) => {
    //       if (item?.id == route.params?.id) {
    //         isAddToList.value = true;
    //       }
    //     });
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
  const trailer_youtube = document.getElementById('trailer-youtube');
  trailer_youtube.scrollIntoView();
};

const handelAddToList = () => {
  if (!store.$state.isLogin) {
    Modal.confirm({
      title: 'Bạn cần đăng nhập để sử dụng chức năng này.',
      icon: createVNode(QuestionCircleOutlined),
      // content: createVNode('div', 'Bạn có muốn đăng nhập không?'),
      content: createVNode('h3', {}, 'Đăng nhập ngay?'),
      okText: 'Có',
      okType: 'primary',
      cancelText: 'Không',
      centered: true,
      onOk() {
        navigateTo({ path: '/login' });
      },
      onCancel() {},
      class: 'require-login-confirm',
    });
  } else {
    if (isAddToList.value == false) {
      isAddToList.value = true;
      message.loading({ content: 'Đang thêm' });
      addItemList(store.$state?.userAccount?.id, {
        media_type: 'tv',
        media_id: dataMovie.value?.id,
      })
        .then((response) => {
          if (response.data.success == true) {
            setTimeout(() => {
              message.destroy();
              ElMessage({
                type: 'success',
                message: `Thêm thành công!`,
              });
            }, 500);
          } else {
            message.destroy();
            isAddToList.value = false;
            ElMessage({
              type: 'error',
              message: `Thêm thất bại!`,
            });
          }
        })
        .catch((e) => {
          message.destroy();
          isAddToList.value = false;
          ElMessage({
            type: 'error',
            message: `Thêm thất bại!`,
          });
          if (axios.isCancel(e)) return;
        });
    } else {
      isAddToList.value = false;
      message.loading({ content: 'Đang xóa' });

      removeItemList(store.$state?.userAccount?.id, {
        media_id: dataMovie.value?.id,
      })
        .then((movieRespone) => {
          if (movieRespone.data?.success == true) {
            setTimeout(() => {
              message.destroy();
              ElMessage({
                type: 'success',
                message: `Xóa thành công!`,
              });
            }, 500);
          } else {
            message.destroy();
            isAddToList.value = true;
            ElMessage({
              type: 'error',
              message: `Xóa thất bại!`,
            });
          }
        })
        .catch((e) => {
          message.destroy();
          isAddToList.value = true;
          ElMessage({
            type: 'error',
            message: `Xóa thất bại!`,
          });
          if (axios.isCancel(e)) return;
        });
    }
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

<style lang="scss" src="./PrevPlayTVView.scss"></style>
