<template>
  <NuxtLink
    :to="{
      path: isEpisodes
        ? `/info/tv/${item?.id}/${
            item?.name
              ? item?.name?.replace(/\s/g, '+').toLowerCase()
              : item?.title?.replace(/\s/g, '+').toLowerCase()
          }`
        : `/info/movie/${item?.id}/${
            item?.name
              ? item?.name?.replace(/\s/g, '+').toLowerCase()
              : item?.title?.replace(/\s/g, '+').toLowerCase()
          }`,
    }"
    class="movie-card-horizontal-item"
  >
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="ant-image" variant="image" />
        </div>
        <div style="margin-top: 7px">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" style="width: 60%" />
        </div>
      </template>

      <template #default>
        <div class="img-box">
          <img
            class="ant-image"
            v-lazy="getBackdrop(dataMovie?.backdrop_path, '350,')"
            :preview="false"
          />

          <!-- <a-skeleton-image v-else class="ant-image" /> -->
          <div
            v-if="isInHistory"
            class="percent-viewed"
            :style="{ width: percent * 100 + '%' }"
          ></div>
          <div v-if="isInHistory" class="viewed-overlay-bar"></div>

          <div class="duration-episode-box">
            <p class="duration-episode">
              {{
                isEpisodes
                  ? dataMovie?.last_episode_to_air?.episode_number
                    ? 'Tập ' + dataMovie?.last_episode_to_air?.episode_number
                    : ''
                  : dataMovie?.runtime
                  ? dataMovie?.runtime + ' min'
                  : ''
              }}
            </p>
          </div>

          <div class="release-date-box">
            <p class="release-date">
              {{
                item?.release_date
                  ? item?.release_date?.slice(0, 4)
                  : item?.last_air_date?.slice(0, 4)
                  ? item?.last_air_date?.slice(0, 4)
                  : item?.first_air_date?.slice(0, 4)
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
              {{ item?.name ? item?.name : item?.title }}
              <span v-if="isEpisodes">
                {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
              </span>
            </p>
            <div class="info-bottom">
              <!-- <p class="genres" v-if="item?.genre_ids">
                {{
                  getAllGenresById(item?.genre_ids, store.$state?.allGenres).join(
                    ' • '
                  )
                }}
              </p> -->
              <p class="genres" v-if="item?.genres">
                {{ Array.from(item?.genres, (x) => x.name).join(' • ') }}
              </p>
              <p
                class="genres"
                v-else-if="item?.genres == undefined && dataMovie?.genres"
              >
                {{ Array.from(dataMovie?.genres, (x) => x.name).join(' • ') }}
              </p>
            </div>
            <!-- </a-skeleton> -->
          </div>
        </a-tooltip>
      </template>
    </el-skeleton>
    <div class="detail-flow" v-if="!loading">
      <div class="backdrop-box">
        <img
          class="ant-image"
          v-show="!loading"
          v-lazy="getBackdrop(dataMovie?.backdrop_path, '350,')"
          :preview="false"
        />

        <div
          v-if="isInHistory"
          class="percent-viewed"
          :style="{ width: percent * 100 + '%' }"
        ></div>
        <div v-if="isInHistory" class="viewed-overlay-bar"></div>
      </div>
      <div class="bottom-content">
        <div class="widget">
          <div class="left">
            <ClientOnly>
              <el-tooltip
                :teleported="false"
                content="Xem ngay"
                placement="top"
              >
                <NuxtLink
                  v-if="isEpisodes"
                  :to="{
                    path: `/play/tv/${item?.id}/${
                      item?.name
                        ? item?.name?.replace(/\s/g, '+').toLowerCase()
                        : item?.title?.replace(/\s/g, '+').toLowerCase()
                    }/tap-1`,
                  }"
                  class="btn-play-now"
                >
                  <a-button shape="circle" size="large">
                    <template #icon>
                      <!-- <font-awesome-icon icon="fa-solid fa-play" /> -->
                      <Icon name="ic:play-arrow" />
                    </template>
                  </a-button>
                </NuxtLink>
                <NuxtLink
                  v-else
                  :to="{
                    path: `/play/movie/${item?.id}/${
                      item?.name
                        ? item?.name?.replace(/\s/g, '+').toLowerCase()
                        : item?.title?.replace(/\s/g, '+').toLowerCase()
                    }`,
                  }"
                  class="btn-play-now"
                >
                  <a-button shape="circle" size="large">
                    <template #icon>
                      <!-- <font-awesome-icon icon="fa-solid fa-play" /> -->
                      <Icon name="ic:play-arrow" />
                    </template>
                  </a-button>
                </NuxtLink>
              </el-tooltip>

              <el-tooltip
                :teleported="false"
                content="Thêm vào danh sách"
                placement="top"
              >
                <a-button
                  shape="circle"
                  size="large"
                  @click.prevent="handelAddToList"
                >
                  <template #icon>
                    <font-awesome-icon
                      v-if="isAddToList"
                      icon="fa-solid fa-check"
                    />

                    <PlusOutlined v-else />
                  </template>
                </a-button>
              </el-tooltip>

              <el-tooltip :teleported="false" content="Chia sẻ" placement="top">
                <ShareNetwork
                  network="facebook"
                  :url="urlShare"
                  :title="dataMovie?.name ? dataMovie?.name : dataMovie?.title"
                  hashtags="phimhay247.site,vite"
                  style="white-space: nowrap; display: block"
                >
                  <a-button shape="circle" size="large" @click.prevent="">
                    <template #icon>
                      <font-awesome-icon icon="fa-solid fa-share" />
                    </template>
                  </a-button>
                </ShareNetwork>
              </el-tooltip>
            </ClientOnly>
          </div>

          <div class="right">
            <ClientOnly>
              <el-tooltip
                :teleported="false"
                content="Chi tiết phim"
                placement="top"
              >
                <NuxtLink
                  :to="{
                    path: isEpisodes
                      ? `/info/tv/${item?.id}/${
                          item?.name
                            ? item?.name?.replace(/\s/g, '+').toLowerCase()
                            : item?.title?.replace(/\s/g, '+').toLowerCase()
                        }`
                      : `/info/movie/${item?.id}/${
                          item?.name
                            ? item?.name?.replace(/\s/g, '+').toLowerCase()
                            : item?.title?.replace(/\s/g, '+').toLowerCase()
                        }`,
                  }"
                >
                  <a-button shape="circle" size="large">
                    <template #icon>
                      <InfoOutlined />
                      <!-- <i class="fa-sharp fa-solid fa-info"></i> -->
                    </template>
                  </a-button>
                </NuxtLink>
              </el-tooltip>
            </ClientOnly>
          </div>
        </div>
        <div class="info">
          <h3 class="title">
            {{ item?.name ? item?.name : item?.title }}
            <span v-if="isEpisodes">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </span>
          </h3>
          <div class="info-bottom">
            <p class="genres" v-if="item?.genres">
              {{ Array.from(item?.genres, (x) => x.name).join(' • ') }}
            </p>
            <p
              class="genres"
              v-else-if="item?.genres == undefined && dataMovie?.genres"
            >
              {{ Array.from(dataMovie?.genres, (x) => x.name).join(' • ') }}
            </p>
          </div>

          <div class="views-imdb">
            <p class="views">{{ ViewFormatter(dataMovie?.views) }} lượt xem</p>

            <p>
              <span
                style="color: green; font-weight: bold"
                v-if="dataMovie?.vote_average >= 8"
              >
                {{ dataMovie?.vote_average.toFixed(2) }}
              </span>
              <span
                style="color: yellow; font-weight: bold"
                v-if="
                  dataMovie?.vote_average >= 5 && dataMovie?.vote_average < 8
                "
              >
                {{ dataMovie?.vote_average.toFixed(2) }}
              </span>
              <span
                style="color: red; font-weight: bold"
                v-if="dataMovie?.vote_average < 5"
              >
                {{ dataMovie?.vote_average.toFixed(2) }}
              </span>
              diểm /
              {{ dataMovie?.vote_count + ' lượt' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import {
  PlusOutlined,
  InfoOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import axios from 'axios';
import {
  getBackdrop,
  getTvById,
  getMovieById,
  getLanguage,
  addItemList,
  removeItemList,
  // getList,
  getItemList,
  getItemHistory,
} from '@/services/MovieService';
import { useRouter } from 'vue-router';
import {
  Modal,
  // message
} from 'ant-design-vue';
import { ElMessage } from 'element-plus';
import { message } from 'ant-design-vue';
import { ViewFormatter } from '@/utils/convertViews';
import { storeToRefs } from 'pinia';

const props = defineProps({
  item: {
    type: Object,
  },
  type: {
    type: String,
  },
});

const store = useStore();
const { allCountries } = storeToRefs(store);
const router = useRouter();
const dataMovie = ref({});
const isEpisodes = ref(false);
const loading = ref(false);
// const dataAddToList = ref([]);
const isAddToList = ref(false);
const isInHistory = ref(false);
const percent = ref(0);
const urlShare = computed(() => window.location);

onMounted(() => {
  const itemMovie = document.querySelectorAll('.movie-card-horizontal-item');

  itemMovie.forEach((x) => {
    x?.addEventListener('mouseenter', (e) => {
      // const rect = x.getBoundingClientRect();

      const detailFlow = x.getElementsByClassName('detail-flow')[0];

      if (detailFlow?.style) {
        // if (rect.left <= 300) {
        if (e.x - x.offsetWidth <= 250) {
          detailFlow.style.left = '0';
          detailFlow.style.right = 'auto';
          detailFlow.style.transform =
            'translateX(0%) translateY(-50%) scale(1.05)';
        }

        // console.log('e: ', e.x);
        // console.log('x:', x.offsetWidth);
        // console.log('rect: ', rect.right);

        if (window.innerWidth - e.x <= x.offsetWidth) {
          detailFlow.style.left = 'auto';
          detailFlow.style.right = '0';
          detailFlow.style.transform =
            'translateX(0%) translateY(-50%) scale(1.05)';
        }
      }
    });
  });
});

onBeforeMount(async () => {
  loading.value = true;

  if (props?.type) {
    switch (props?.type) {
      case 'movie':
        isEpisodes.value = false;
        await useAsyncData(`movie/short/${props.item?.id}`, () =>
          getMovieById(props.item?.id)
        )
          .then((movieResponed) => {
            dataMovie.value = movieResponed.data.value.data;

            setTimeout(() => {
              loading.value = false;
            }, 1000);
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
          .then((tvResponed) => {
            dataMovie.value = tvResponed.data.value.data;

            setTimeout(() => {
              loading.value = false;
            }, 1000);
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
        .then((tvResponed) => {
          dataMovie.value = tvResponed.data.value.data;

          setTimeout(() => {
            loading.value = false;
          }, 1000);
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
        .then((movieResponed) => {
          dataMovie.value = movieResponed.data.value.data;

          setTimeout(() => {
            loading.value = false;
          }, 1000);
        })
        .catch((e) => {
          loading.value = false;
          if (axios.isCancel(e)) return;
        });
    }
  }

  if (store.$state.isLogin) {
    await useAsyncData(
      `itemlist/${store.$state?.userAccount?.id}/${props.item?.id}`,
      () => getItemList(store.$state?.userAccount?.id, props.item?.id)
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
      `itemhistory/${store.$state?.userAccount?.id}/${props.item?.id}`,
      () => getItemHistory(store.$state?.userAccount?.id, props.item?.id)
    )
      .then((movieRespone) => {
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
        router.push({ path: '/login' });
      },
      onCancel() {},
      class: 'require-login-confirm',
    });
  } else {
    if (isAddToList.value == false) {
      isAddToList.value = true;
      message.loading({ content: 'Đang thêm' });
      addItemList(store.$state?.userAccount?.id, {
        media_type: isEpisodes.value ? 'tv' : 'movie',
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
</script>
<style lang="scss" src="./MovieCardHorizontal.scss"></style>
