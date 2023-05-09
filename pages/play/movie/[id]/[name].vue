<template>
  <div class="play-container">
    <div class="video-player">
      <div class="video-player-wrapper">
        <iframe
          id="vimeo-player"
          :src="`https://player.vimeo.com/video/${urlCodeMovie}`"
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
            fill="#000000"
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
            fill="#000000"
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
        {{ dataMovie?.name ? dataMovie?.name : dataMovie?.title }}
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
              path: `/info/movie/${dataMovie?.id}/${
                dataMovie?.name
                  ? dataMovie?.name?.replace(/\s/g, '+').toLowerCase()
                  : dataMovie?.title?.replace(/\s/g, '+').toLowerCase()
              }`,
            }"
          >
            <strong class="toggle-content"> Chi tiết </strong>
          </NuxtLink>
        </p>
      </a-skeleton>
    </div>

    <h3 class="section-title">
      <strong> Bình luận</strong>
    </h3>
    <div
      class="fb-comments"
      :data-href="urlComment"
      data-width="100%"
      data-numposts="10"
    ></div>

    <MovieSuggest
      v-if="!checkEmptyDataMovies"
      :movieId="dataMovie?.id"
      type="movie"
    />
  </div>
</template>

<script setup>
import { createVNode } from 'vue';
import axios from 'axios';
import {
  getBackdrop,
  getMovieById,
  // getList,
  getItemList,
  getItemHistory,
  addItemList,
  removeItemList,
  add_update_History,
  UpdateViewMovie,
} from '@/services/MovieService';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import MovieSuggest from '@/components/MovieSuggest/MovieSuggest.vue';
import {
  // PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { ElMessage } from 'element-plus';
import {
  Modal,
  // message
} from 'ant-design-vue';
import { message } from 'ant-design-vue';
import Player from '@vimeo/player';

const store = useStore();
const route = useRoute();
const router = useRouter();
const isEpisodes = ref(false);
const dataMovie = ref({});
const isOpenContent = ref(false);
const urlComment = computed(() => window.location);
const loading = ref(false);
const urlCodeMovie = ref('809431505');
const isAddToList = ref(false);
// const dataAddToList = ref([]);
const seconds = ref(0);
const percent = ref(0);
const duration = ref(0);
const isPlayVideo = ref(false);
const isUpdataView = ref(true);
const isInHistory = ref(false);
const dataItemHistory = ref({});

const internalInstance = getCurrentInstance();

onBeforeRouteLeave(() => {
  if (isPlayVideo.value == true && store.$state.isLogin) {
    // if (isInHistory.value == true) {
    //   if (
    //     seconds.value > dataItemHistory.value?.seconds &&
    //     percent.value > dataItemHistory.value?.percent &&
    //     dataItemHistory.value?.seconds < duration.value
    //   ) {
    //     add_update_History(store.$state.userAccount?.id, {
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
    //       add_update_History(store.$state.userAccount?.id, {
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
    //   add_update_History(store.$state.userAccount?.id, {
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
      add_update_History(store.$state.userAccount?.id, {
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

onMounted(() => {
  const iframe = document.querySelector('#vimeo-player');
  const player = new Player(iframe);

  player.on('play', function (e) {
    // alert('play');
    duration.value = e.duration;
    isPlayVideo.value = true;
  });

  player.on('timeupdate', function (e) {
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

  useHead({
    title:
      'Phimhay247 - Xem phim - ' +
      Array?.from(
        route.params?.name?.split('+'),
        (x) => x.charAt(0).toUpperCase() + x.slice(1)
      ).join(' ')
        ? 'Phimhay247 - Xem phim - ' +
          Array?.from(
            route.params?.name?.split('+'),
            (x) => x.charAt(0).toUpperCase() + x.slice(1)
          ).join(' ')
        : 'Phimhay247 - Xem phim - ' +
          Array?.from(
            route.params?.name?.split('+'),
            (x) => x.charAt(0).toUpperCase() + x.slice(1)
          ).join(' '),
    htmlAttrs: { lang: 'vi', amp: true },
  });

  isEpisodes.value = false;

  await useAsyncData(`movie/short/${route.params?.id}`, () =>
    getMovieById(route.params?.id)
  )
    .then((movieResponed) => {
      dataMovie.value = movieResponed.data.value.data;

      setTimeout(() => {
        loading.value = false;
        internalInstance.appContext.config.globalProperties.$Progress.finish();
      }, 1500);
    })
    .catch((e) => {
      loading.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
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

    await useAsyncData(
      `itemhistory/${store.$state?.userAccount?.id}/${route.params?.id}`,
      () => getItemHistory(store.$state?.userAccount?.id, route.params?.id)
    )
      .then((movieRespone) => {
        if (movieRespone.data.value.data.success == true) {
          isInHistory.value = true;
          dataItemHistory.value = movieRespone.data.value.data?.result;
        } else {
          isInHistory.value = false;
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

router.beforeEach(() => {
  // if (to.params.slug == 'play') {
  //   dataCredit.value = [];
  //   getData();
  // }
});

watch(route, () => {});

const checkEmptyDataMovies = computed(() => {
  if (Object.keys(dataMovie.value).length == 0) return true;
  else return false;
});

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
        media_type: 'movie',
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

window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth',
});
</script>

<style lang="scss" src="./PlayView.scss"></style>
