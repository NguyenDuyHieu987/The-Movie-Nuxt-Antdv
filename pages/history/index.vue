<template>
  <div class="history">
    <div v-show="store.isLogin" class="history-container">
      <div v-if="loading">
        <section v-show="responsive" class="topic-history-row">
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
                    destroyPopupOnHide
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
                        <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.9rem"
                          height="1.9rem"
                          viewBox="0 0 512 512"
                        >
                          <circle
                            cx="256"
                            cy="256"
                            r="48"
                            fill="currentColor"
                          />
                          <circle
                            cx="256"
                            cy="416"
                            r="48"
                            fill="currentColor"
                          />
                          <circle cx="256" cy="96" r="48" fill="currentColor" />
                        </svg>
                      </template>
                    </el-button>

                    <template #overlay>
                      <a-menu class="dropdown-viewmore">
                        <a-menu-item key="remove-list">
                          <template #icon>
                            <!-- <InfoCircleOutlined /> -->
                            <!-- <Icon name="bi:info-circle" class="info" /> -->
                            <svg
                              class="info"
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5rem"
                              height="1.5rem"
                              viewBox="0 0 16 16"
                            >
                              <g>
                                <path
                                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                />
                                <path
                                  d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
                                />
                              </g>
                            </svg>
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
                    <!-- <Icon name="ic:sharp-delete-sweep" /> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 16h4v2h-4v-2zm0-8h7v2h-7V8zm0 4h6v2h-6v-2zM3 20h10V8H3v12zM14 5h-3l-1-1H6L5 5H2v2h12V5z"
                      />
                    </svg>
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
                    <!-- <Icon name="fa6-solid:magnifying-glass" /> -->

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288z"
                      />
                    </svg>
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
                    destroyPopupOnHide
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
                        <!-- <Icon name="fa6-solid:ellipsis-vertical" /> -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.9rem"
                          height="1.9rem"
                          viewBox="0 0 512 512"
                        >
                          <circle
                            cx="256"
                            cy="256"
                            r="48"
                            fill="currentColor"
                          />
                          <circle
                            cx="256"
                            cy="416"
                            r="48"
                            fill="currentColor"
                          />
                          <circle cx="256" cy="96" r="48" fill="currentColor" />
                        </svg>
                      </template>
                    </el-button>

                    <template #overlay>
                      <a-menu class="dropdown-viewmore">
                        <a-menu-item key="remove-list">
                          <template #icon>
                            <!-- <InfoCircleOutlined /> -->
                            <!-- <Icon name="bi:info-circle" class="info" /> -->

                            <svg
                              class="info"
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.5rem"
                              height="1.5rem"
                              viewBox="0 0 16 16"
                            >
                              <g>
                                <path
                                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                />
                                <path
                                  d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
                                />
                              </g>
                            </svg>
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
                    <!-- <Icon name="fa6-solid:magnifying-glass" /> -->

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288z"
                      />
                    </svg>
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
                    <!-- <Icon name="ic:sharp-delete-sweep" /> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 16h4v2h-4v-2zm0-8h7v2h-7V8zm0 4h6v2h-6v-2zM3 20h10V8H3v12zM14 5h-3l-1-1H6L5 5H2v2h12V5z"
                      />
                    </svg>
                  </template>
                  Xóa tất cả Phim đã xem
                </el-button>
              </div>
            </div>
          </aside>
        </Teleport>

        <section class="history-main-content" ref="historyContent">
          <div class="padding-content horizontal">
            <h2 class="gradient-title-default underline">
              <span>Lịch sử xem</span>
            </h2>
          </div>

          <div
            class="nav-action padding-content horizontal"
            :style="{
              '--width': historyContent?.offsetWidth + 'px',
            }"
            :class="{ sticky: isStickyNavActiom }"
          >
            <SortTab @onChangeTab="handleChangeTab" />
          </div>

          <div class="movie-history padding-content horizontal">
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

          <div class="skeleton-loadmore padding-content" v-show="loadMore">
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

    <RequireAuth v-if="!store.isLogin" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import MovieCardHorizontalHistory from '@/components/MovieCardHorizontalHistory/MovieCardHorizontalHistory.vue';
import RequireAuth from '@/components/RequireAuth/RequireAuth.vue';
import SortTab from '@/components/SortTab/SortTab.vue';
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

const store = useStore();
const utils = useUtils();
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
const isStickyNavActiom = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const topicImage = ref<string>('/d0YSRmp819pMRnKLfGMgAQchpnR.jpg');
const internalInstance: any = getCurrentInstance();
const historyContent = ref();
const activeTab = ref<string>('all');

const breakpoints = useBreakpoints({
  responsive: 1200,
});

const responsive = breakpoints.isSmallerOrEqual('responsive');

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

    if (!responsive) {
      if (window.scrollY >= 60) {
        isStickyNavActiom.value = true;
      } else {
        isStickyNavActiom.value = false;
      }
    } else {
      if (window.scrollY >= 310) {
        isStickyNavActiom.value = true;
      } else {
        isStickyNavActiom.value = false;
      }
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
      useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/${skip.value}`,
        () => getHistory(activeTab.value, skip.value)
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

  await useAsyncData(
    `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
    () => getHistory(activeTab.value, 1)
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
  if (store.isLogin) {
    await nextTick();

    getData();
  }
});

const getDataWhenRemoveHistory = (data: number) => {
  // dataHistory.value = data;
  dataHistory.value = _.reject(dataHistory.value, (x) => {
    return x.movie_id === data;
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
        `history/search/${store.userAccount?.id}/${activeTab.value}/${e.target.value}`,
        () => searchHistory(e.target.value, activeTab.value)
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

const handleChangeTab = async (value: string) => {
  activeTab.value = value;
  internalInstance.appContext.config.globalProperties.$Progress.start();
  valueInput.value = '';

  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'instant',
  // });

  switch (value) {
    case 'all':
      await useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getHistory(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value?.results?.length > 0) {
            dataHistory.value = movieRespone.data.value?.results;
            total.value = movieRespone.data.value?.total;
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;

            setTimeout(() => {
              const color = dataHistory.value[0]?.dominant_backdrop_color;
              setBackgroundColor(color);
            });
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          internalInstance.appContext.config.globalProperties.$Progress.finish();
        });
      break;
    case 'movie':
      await useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getHistory(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value?.results?.length > 0) {
            dataHistory.value = movieRespone.data.value?.results;
            total.value = movieRespone.data.value?.total;
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;

            setTimeout(() => {
              const color = dataHistory.value[0]?.dominant_backdrop_color;
              setBackgroundColor(color);
            });
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          internalInstance.appContext.config.globalProperties.$Progress.finish();
        });
      break;
    case 'tv':
      await useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getHistory(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value?.results?.length > 0) {
            dataHistory.value = movieRespone.data.value?.results;
            total.value = movieRespone.data.value?.total;
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;

            setTimeout(() => {
              const color = dataHistory.value[0]?.dominant_backdrop_color;
              setBackgroundColor(color);
            });
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          internalInstance.appContext.config.globalProperties.$Progress.finish();
        });
      break;
  }
};
</script>

<style lang="scss" src="./HistoryPage.scss"></style>
