<template>
  <div class="history">
    <div v-show="states.isLogin" class="history-container">
      <div v-if="loading">
        <section v-if="responsive" class="topic-history-row">
          <div class="row-container">
            <div class="top">
              <div class="backdrop">
                <NuxtLink
                  v-if="
                    dataHistory[0]?.media_type == 'tv' && dataHistory[0]?.id
                  "
                  class="img-box"
                  :to="{
                    path: `/play-tv/${dataHistory[0]?.id}/${dataHistory[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}/tap-1`,
                  }"
                >
                  <nuxt-img
                    class="ant-image"
                    :src="getImage(topicImage, 'backdrop', 'h_300')"
                  />

                  <div class="play-now">
                    <span>
                      <Icon name="ic:play-arrow" class="play" />
                      PHÁT NGAY
                    </span>
                  </div>
                </NuxtLink>
                <NuxtLink
                  v-else-if="
                    dataHistory[0]?.media_type == 'movie' && dataHistory[0]?.id
                  "
                  class="img-box"
                  :to="{
                    path: `/play-movie/${
                      dataHistory[0]?.id
                    }/${dataHistory[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}`,
                  }"
                >
                  <nuxt-img
                    class="ant-image"
                    :src="getImage(topicImage, 'backdrop', 'h_300')"
                  />
                  <div class="play-now">
                    <Icon name="ic:play-arrow" class="play" />
                    <span>PHÁT NGAY</span>
                  </div>
                </NuxtLink>

                <div v-if="!dataHistory?.length" class="img-box">
                  <nuxt-img
                    class="ant-image"
                    :src="getImage(topicImage, 'backdrop', 'h_300')"
                  />
                </div>
              </div>

              <nuxt-img
                class="overlay-image"
                :src="getImage(topicImage, 'backdrop', 'h_300')"
              />

              <div class="info">
                <h2 class="title">
                  <strong>Phim đã thêm vào danh sách phát</strong>
                </h2>

                <div class="user-info">
                  <p>
                    <strong>
                      {{ store.userAccount?.username }}
                    </strong>
                  </p>
                  <p class="count-video">
                    {{ total }} phim
                    <span> Cập nhật hôm nay </span>
                  </p>

                  <a-dropdown
                    :trigger="['click']"
                    placement="bottomRight"
                    overlayClassName="dropdown-viewmore"
                    class="dropdown-viewmore"
                  >
                    <el-button
                      circle
                      shape="circle"
                      size="large"
                      text
                      class="viewmore-btn-history"
                      @click.prevent=""
                    >
                      <template #icon>
                        <Icon name="fa6-solid:ellipsis-vertical" />
                      </template>
                    </el-button>

                    <template #overlay>
                      <a-menu class="dropdown-viewmore">
                        <a-menu-item key="remove-list">
                          <template #icon>
                            <!-- <InfoCircleOutlined /> -->
                            <!-- <i class="fa-regular fa-circle-info"></i> -->
                            <Icon name="bi:info-circle" class="info" />
                          </template>
                          <span>Thông tin chi tiết</span>
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="box-btn">
                <el-button
                  round
                  type="primary"
                  shape="round"
                  text
                  class="remove-all-history-btn"
                  @click="removeAllHistoryList"
                >
                  <template #icon>
                    <!-- <span class="material-icons-outlined"> delete_sweep </span> -->
                    <!-- <i class="fa-regular fa-trash-can-list"></i> -->
                    <Icon name="ic:sharp-delete-sweep" />
                  </template>
                  Xóa tất cả phim đã xem
                </el-button>
              </div>

              <div class="widget">
                <a-input
                  v-model:value="valueInput"
                  class="search-history"
                  placeholder="Tìm kiếm trong danh sách..."
                  size="large"
                  allowClear
                  bordered
                  :loading="loadingSearch"
                  @change="searchWatchList"
                >
                  <template #prefix>
                    <Icon name="fa6-solid:magnifying-glass" />
                  </template>
                </a-input>
              </div>
            </div>
          </div>
        </section>

        <Teleport :disabled="!loading" to="#topic-history-column-teleport">
          <aside class="topic-history-column" :width="340">
            <div class="column-container">
              <div class="backdrop">
                <NuxtLink
                  v-if="
                    dataHistory[0]?.media_type == 'tv' && dataHistory[0]?.id
                  "
                  class="img-box"
                  :to="{
                    path: `/play-tv/${dataHistory[0]?.id}/${dataHistory[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}/tap-1`,
                  }"
                >
                  <nuxt-img
                    class="ant-image"
                    :src="getImage(topicImage, 'backdrop', 'h_300')"
                  />

                  <div class="play-now">
                    <span>
                      <Icon name="ic:play-arrow" class="play" />
                      PHÁT NGAY
                    </span>
                  </div>
                </NuxtLink>

                <NuxtLink
                  v-else-if="
                    dataHistory[0]?.media_type == 'movie' && dataHistory[0]?.id
                  "
                  class="img-box"
                  :to="{
                    path: `/play-movie/${
                      dataHistory[0]?.id
                    }/${dataHistory[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}`,
                  }"
                >
                  <nuxt-img
                    class="ant-image"
                    :src="getImage(topicImage, 'backdrop', 'h_300')"
                  />

                  <div class="play-now">
                    <Icon name="ic:play-arrow" class="play" />
                    <span>PHÁT NGAY</span>
                  </div>
                </NuxtLink>

                <div v-if="!dataHistory?.length" class="img-box">
                  <nuxt-img
                    class="ant-image"
                    :src="getImage(topicImage, 'backdrop', 'h_300')"
                  />
                </div>
              </div>

              <nuxt-img
                class="overlay-image"
                :src="getImage(topicImage, 'backdrop', 'h_300')"
              />

              <div class="info">
                <h2 class="title">
                  <strong>Phim đã xem</strong>
                </h2>
                <div class="user-info">
                  <p>
                    <strong>
                      {{ store.userAccount?.username }}
                    </strong>
                  </p>
                  <p class="count-video">
                    {{ total }} phim
                    <span> Cập nhật hôm nay </span>
                  </p>
                  <a-dropdown
                    :trigger="['click']"
                    placement="bottomRight"
                    overlayClassName="dropdown-viewmore"
                    class="dropdown-viewmore"
                  >
                    <el-button
                      circle
                      shape="circle"
                      size="large"
                      text
                      class="viewmore-btn-history"
                      @click.prevent=""
                    >
                      <template #icon>
                        <Icon name="fa6-solid:ellipsis-vertical" />
                      </template>
                    </el-button>

                    <template #overlay>
                      <a-menu class="dropdown-viewmore">
                        <a-menu-item key="remove-list">
                          <template #icon>
                            <!-- <InfoCircleOutlined /> -->
                            <!-- <i class="fa-regular fa-circle-info"></i> -->
                            <Icon name="bi:info-circle" class="info" />
                          </template>
                          <span>Thông tin chi tiết</span>
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </div>

              <div class="widget">
                <a-input
                  v-model:value="valueInput"
                  class="search-history"
                  placeholder="Tìm kiếm trong danh sách..."
                  size="large"
                  allowClear
                  bordered
                  :loading="loadingSearch"
                  @change="searchWatchList"
                >
                  <template #prefix>
                    <Icon name="fa6-solid:magnifying-glass" />
                  </template>
                </a-input>

                <el-button
                  round
                  type="primary"
                  shape="round"
                  class="remove-all-history-btn"
                  @click="removeAllHistoryList"
                >
                  <template #icon>
                    <!-- <span class="material-icons-outlined"> delete_sweep </span> -->
                    <!-- <i class="fa-regular fa-trash-can-list"></i> -->
                    <Icon name="ic:sharp-delete-sweep" />
                  </template>
                  Xóa tất cả Phim đã xem
                </el-button>
              </div>
            </div>
          </aside>
        </Teleport>

        <section class="history-main-content padding-content">
          <h2 class="gradient-title-default underline">
            <span>Lịch sử xem</span>
          </h2>
          <div class="movie-history">
            <MovieCardHorizontalHistory
              v-for="(item, index) in dataHistory"
              :index="index"
              :key="item.id"
              :item="item"
              :prevItem="dataHistory[index - 1]"
              :type="item?.media_type"
              :getDataWhenRemoveHistory="getDataWhenRemoveHistory"
            />
          </div>
          <div class="skeleton-loadmore" v-show="loadMore">
            <el-skeleton
              :loading="true"
              animated
              v-for="index in 2"
              :key="index"
            >
              <template #template>
                <div class="img-box">
                  <el-skeleton-item class="skeleton-img" />
                </div>
                <div class="content-skeleton">
                  <el-skeleton-item variant="text" style="width: 40%" />
                  <el-skeleton-item variant="text" style="width: 20%" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                  <div class="overview">
                    <el-skeleton-item variant="text" />
                    <el-skeleton-item variant="text" style="width: 50%" />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </div>
        </section>
      </div>
    </div>

    <RequireAuth v-if="!states.isLogin" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import MovieCardHorizontalHistory from '@/components/MovieCardHorizontalHistory/MovieCardHorizontalHistory.vue';
import RequireAuth from '@/components/RequireAuth/RequireAuth.vue';
import { getBackdrop, getImage, getColorImage } from '~/services/image';
import { getHistory, searchHistory } from '~/services/history';
import disableScroll from 'disable-scroll';
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { ElButton, ElSkeleton, ElSkeletonItem } from 'element-plus';
// import scrollBottom from 'scroll-bottom';
import { useBreakpoints } from '@vueuse/core';

definePageMeta({
  // requireAuth: true,
  // middleware: ['require-auth'],
});

const store: any = useStore();
const utils = useUtils();
const states = useStates();
const { isLogin } = storeToRefs<any>(store);
const route: any = useRoute();
const valueInput = ref<string>('');
const debounce = ref<any>();
const total = ref<number>(0);
const skip = ref<number>(1);
const dataHistory = ref<any[]>([]);
const loading = ref<boolean>(false);
const isScroll = ref<boolean>(false);
const loadingSearch = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const topicImage = ref<string>('/d0YSRmp819pMRnKLfGMgAQchpnR.jpg');
const internalInstance: any = getCurrentInstance();

const breakpoints = useBreakpoints({
  responsive: 1200,
});

const responsive = breakpoints.smallerOrEqual('responsive');

useHead({
  title: 'Lịch sử xem ' + ' | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Lịch sử xem ' + ' | Phimhay247',
  description: 'Lịch sử xem dõi của bạn',
  ogTitle: 'Lịch sử xem ' + ' | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Lịch sử xem dõi của bạn',
  ogLocale: 'vi',
});

const setBackgroundColor = (color: string[]) => {
  const main_color = `linear-gradient(to bottom, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1), rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5), rgba(0, 0, 0, 1));`;

  // const main_color = `linear-gradient(to bottom, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1) 0%, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.33) 33%, rgba(0, 0, 0, 1) 100%);`;
  const topic_history_column = document.getElementsByClassName(
    'topic-history-column'
  )[0] as HTMLElement;

  if (topic_history_column) {
    topic_history_column.setAttribute(
      'style',
      `background-image: ${main_color}`
    );

    // const search_history =
    //   topic_history_column.querySelector('.search-history');

    const ant_input_affix_wrapper = topic_history_column.getElementsByClassName(
      'ant-input-affix-wrapper'
    )[0] as HTMLElement;
    ant_input_affix_wrapper.setAttribute(
      'style',
      `border-bottom: 2px solid rgb(${color[0]}, ${color[1]}, ${color[2]});`
    );
  }

  const topic_history_row =
    document.getElementsByClassName('topic-history-row')[0];

  if (topic_history_row) {
    topic_history_row.setAttribute('style', `background-image: ${main_color}`);

    // const search_history =
    //   topic_history_row.querySelector('.search-history');

    const ant_input_affix_wrapper = topic_history_row.getElementsByClassName(
      'ant-input-affix-wrapper'
    )[0] as HTMLElement;
    ant_input_affix_wrapper.setAttribute(
      'style',
      `border-bottom: 2px solid rgb(${color[0]}, ${color[1]}, ${color[2]});`
    );
  }

  // topic_history_column.style = `background: url("${getBackdrop(
  //   dataHistory.value[0]?.backdrop_path
  // )}");`;

  // topic_history_column.style.setProperty(
  //   '--main-color',
  //   `${main_color}`
  // );
};

onMounted(() => {
  const ant_btn = document.getElementsByClassName('viewmore-btn-history')[0];

  ant_btn?.addEventListener('click', () => {
    if (ant_btn?.classList.contains('ant-dropdown-open')) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  });

  ant_btn?.addEventListener('blur', () => {
    disableScroll.off();
  });

  window.addEventListener('scroll', () => {
    if (dataHistory.value?.length == 0) {
      return;
    }

    isScroll.value = true;
    // console.log(window.scrollY + window.innerHeight);
    // console.log(document.documentElement.scrollHeight);
    const scrollHeight = Math.round(window.scrollY + window.innerHeight);

    if (
      scrollHeight == document.documentElement.scrollHeight &&
      // Math.floor(scrollBottom()) == 0 &&
      isScroll.value == true &&
      total.value > 20 &&
      dataHistory.value?.length < total.value
    ) {
      loadMore.value = true;
      useAsyncData(`history/get/${store.userAccount?.id}/${skip.value}`, () =>
        getHistory(skip.value)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value.data?.result?.length > 0) {
            setTimeout(() => {
              loadMore.value = false;
              dataHistory.value = dataHistory.value.concat(
                movieRespone.data.value.data?.result
              );
            }, 2000);
            skip.value += 1;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }
  });
});

const getData = async () => {
  internalInstance.appContext.config.globalProperties.$Progress.start();

  await useAsyncData(`history/get/${store.userAccount?.id}/1`, () =>
    getHistory(1)
  )
    .then((movieRespone: any) => {
      if (movieRespone.data.value?.result?.items?.length > 0) {
        dataHistory.value = movieRespone.data.value?.result?.items;
        total.value = movieRespone.data.value?.total;
        topicImage.value = dataHistory.value[0]?.backdrop_path;
        skip.value++;

        setTimeout(() => {
          const color = dataHistory.value[0]?.dominant_backdrop_color;
          setBackgroundColor(color);
        });
      }

      // if (dataHistory.value?.length == 0) {
      //   useAsyncData(`image/color/${topicImage.value}`, () =>
      //     getColorImage(topicImage.value)
      //   )
      //     .then((colorResponse: any) => {
      //       const color = colorResponse.data.value?.color;
      //       setBackgroundColor(color);
      //     })
      //     .catch((e) => {
      //       if (axios.isCancel(e)) return;
      //     });
      // }
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = true;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });
};

onBeforeMount(async () => {
  await nextTick();

  getData();
});

const getDataWhenRemoveHistory = (data: number) => {
  // dataHistory.value = data;
  dataHistory.value = _.reject(dataHistory.value, (x) => {
    return x.id === data;
  });
  total.value = dataHistory.value?.length;
};

const removeAllHistoryList = () => {
  if (dataHistory.value?.length > 0) {
    utils.conrfirmMessageModal({
      title: 'Thông Báo',
      message: 'Bạn có muốn xóa toàn bộ Lịch sử xem không?',
      onOk: async function () {
        if (await utils.handleRemoveAllitemFromHistory()) {
          dataHistory.value = [];
        }
      },
      onCancel() {},
    });
  }
};

watch(route, () => {
  // getData();
});

const searchWatchList = (e: any) => {
  if (e.target.value.length >= 0) {
    loadingSearch.value = true;

    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
      useAsyncData(
        `history/search/${store.userAccount?.id}/${e.target.value}`,
        () => searchHistory(e.target.value)
      )
        .then((movieRespone: any) => {
          dataHistory.value = movieRespone.data.value.data?.results;
          setTimeout(() => {
            loadingSearch.value = false;
          }, 500);
        })
        .catch((e) => {
          loadingSearch.value = false;
          if (axios.isCancel(e)) return;
        });
    }, 500);
  }
  // else if (valueInput.value.length == 0) {
  //   dataHistory.value = [];
  // }
};
</script>

<style lang="scss" src="./HistoryPage.scss"></style>
