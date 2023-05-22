<template>
  <div class="follow">
    <div v-if="isLogin" class="follow-container">
      <a-layout>
        <a-layout-sider
          class="topic-follow-column-responsive"
          width="calc(100% + 40px)"
          v-show="!loading"
        >
          <div class="column-container">
            <div class="top">
              <div class="backdrop">
                <NuxtLink
                  v-if="dataList[0]?.media_type == 'tv' && dataList[0]?.id"
                  :to="{
                    path: `/play/tv/${dataList[0]?.id}/${dataList[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}/tap-1`,
                  }"
                >
                  <img
                    class="ant-image"
                    v-lazy="getBackdrop(topicImage, ',250')"
                    :preview="false"
                  />
                  <div class="play-now">
                    <span>
                      <font-awesome-icon icon="fa-solid fa-play" />
                      PHÁT NGAY
                    </span>
                  </div>
                </NuxtLink>
                <NuxtLink
                  v-else-if="
                    dataList[0]?.media_type == 'movie' && dataList[0]?.id
                  "
                  :to="{
                    path: `/play/movie/${dataList[0]?.id}/${dataList[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}`,
                  }"
                >
                  <img
                    class="ant-image"
                    v-lazy="getBackdrop(topicImage, ',250')"
                    :preview="false"
                  />

                  <div class="play-now">
                    <font-awesome-icon icon="fa-solid fa-play" />
                    <span>PHÁT NGAY</span>
                  </div>
                </NuxtLink>
                <img
                  class="ant-image"
                  v-if="!dataList?.length"
                  v-lazy="getBackdrop(topicImage, ',250')"
                  :preview="false"
                />
              </div>
              <img class="overlay-image" :src="getBackdrop(topicImage)" />

              <div class="info">
                <h2 class="title">
                  <strong>Video đã thêm vào danh sách phát</strong>
                </h2>

                <div class="user-info">
                  <p>
                    <strong>
                      {{ store.$state.userAccount?.username }}
                    </strong>
                  </p>
                  <p class="count-video">
                    {{ total }} video
                    <span> Cập nhật hôm nay </span>
                  </p>

                  <a-dropdown
                    :trigger="['click']"
                    placement="bottomRight"
                    class="dropdown-viewmore"
                  >
                    <el-button
                      circle
                      shape="circle"
                      size="large"
                      class="viewmore-btn-follow"
                      @click.prevent=""
                    >
                      <template #icon>
                        <font-awesome-icon
                          icon="fa-solid fa-ellipsis-vertical"
                        />
                      </template>
                    </el-button>

                    <template #overlay>
                      <a-menu class="dropdown-viewmore">
                        <a-menu-item key="info-list">
                          <template #icon>
                            <!-- <InfoCircleOutlined /> -->
                            <i class="fa-regular fa-circle-info"></i>
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
                  class="remove-all-follow-btn"
                  @click="removeAllFollowList"
                >
                  <template #icon>
                    <!-- <span class="material-icons-outlined"> delete_sweep </span> -->
                    <i class="fa-sharp fa-regular fa-trash-can-list"></i>
                  </template>
                  Xóa tất cả Danh sách phát
                </el-button>
              </div>
              <div class="widget">
                <a-input
                  v-model:value="valueInput"
                  class="search-follow"
                  placeholder="Tìm kiếm trong danh sách video..."
                  size="large"
                  allowClear
                  :loading="loadingSearch"
                  @change="searchFollow"
                >
                  <template #prefix>
                    <!-- <el-tooltip
                      title="Tìm kiếm"
                      content="Tìm kiếm"
                      effect="dark"
                      placement="top"
                    > -->
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    <!-- </el-tooltip> -->
                  </template>
                </a-input>
              </div>
            </div>
          </div>
        </a-layout-sider>
        <Teleport v-if="!loading" to="#topic-follow-column-teleport">
          <a-layout-sider class="topic-follow-column" :width="340">
            <div class="column-container">
              <div class="backdrop">
                <NuxtLink
                  v-if="dataList[0]?.media_type == 'tv' && dataList[0]?.id"
                  :to="{
                    path: `/play/tv/${dataList[0]?.id}/${dataList[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}/tap-1`,
                  }"
                >
                  <img
                    class="ant-image"
                    v-lazy="getBackdrop(topicImage, ',250')"
                    :preview="false"
                  />

                  <div class="play-now">
                    <span>
                      <font-awesome-icon icon="fa-solid fa-play" />
                      PHÁT NGAY
                    </span>
                  </div>
                </NuxtLink>
                <NuxtLink
                  v-else-if="
                    dataList[0]?.media_type == 'movie' && dataList[0]?.id
                  "
                  :to="{
                    path: `/play/movie/${dataList[0]?.id}/${dataList[0]?.name
                      ?.replace(/\s/g, '+')
                      .toLowerCase()}`,
                  }"
                >
                  <img
                    class="ant-image"
                    v-lazy="getBackdrop(topicImage, ',250')"
                    :preview="false"
                  />

                  <div class="play-now">
                    <font-awesome-icon icon="fa-solid fa-play" />
                    <span>PHÁT NGAY</span>
                  </div>
                </NuxtLink>
                <img
                  class="ant-image"
                  v-if="!dataList?.length"
                  v-lazy="getBackdrop(topicImage, ',250')"
                  :preview="false"
                />
              </div>
              <img class="overlay-image" :src="getBackdrop(topicImage)" />
              <div class="info">
                <h2 class="title">
                  <strong>Video đã thêm vào danh sách phát</strong>
                </h2>
                <div class="user-info">
                  <p>
                    <strong>
                      {{ store.$state.userAccount?.username }}
                    </strong>
                  </p>
                  <p class="count-video">
                    {{ total }} video
                    <span> Cập nhật hôm nay </span>
                  </p>
                  <a-dropdown
                    :trigger="['click']"
                    placement="bottomRight"
                    class="dropdown-viewmore"
                  >
                    <el-button
                      circle
                      shape="circle"
                      size="large"
                      class="viewmore-btn-follow"
                      @click.prevent=""
                    >
                      <template #icon>
                        <font-awesome-icon
                          icon="fa-solid fa-ellipsis-vertical"
                        />
                      </template>
                    </el-button>

                    <template #overlay>
                      <a-menu class="dropdown-viewmore">
                        <a-menu-item key="info-list">
                          <template #icon>
                            <!-- <InfoCircleOutlined /> -->
                            <i class="fa-regular fa-circle-info"></i>
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
                  class="search-follow"
                  placeholder="Tìm kiếm trong danh sách video..."
                  size="large"
                  allowClear
                  :loading="loadingSearch"
                  @change="searchFollow"
                >
                  <template #prefix>
                    <!-- <el-tooltip
                      title="Tìm kiếm"
                      content="Tìm kiếm"
                      effect="dark"
                      placement="top"
                    > -->
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    <!-- </el-tooltip> -->
                  </template>
                </a-input>

                <el-button
                  round
                  type="primary"
                  shape="round"
                  class="remove-all-follow-btn"
                  @click="removeAllFollowList"
                >
                  <template #icon>
                    <!-- <span class="material-icons-outlined"> delete_sweep </span> -->
                    <i class="fa-sharp fa-regular fa-trash-can-list"></i>
                  </template>
                  Xóa tất cả Danh sách phát
                </el-button>
              </div>
            </div>
          </a-layout-sider>
        </Teleport>

        <a-layout-content class="follow-main-content">
          <h2 class="gradient-title-default underline">
            <strong>Danh sách phát</strong>
          </h2>

          <section class="movie-follow" v-show="dataList?.length">
            <MovieCardHorizontalFollow
              v-for="(item, index) in dataList"
              :index="index"
              :key="item.id"
              :item="item"
              :type="item?.media_type"
              :getDataWhenRemoveList="getDataWhenRemoveList"
            />
          </section>

          <div class="skeleton-loadmore" v-if="loadMore">
            <el-skeleton
              :loading="true"
              animated
              v-for="index in 2"
              :key="index"
            >
              <template #template>
                <span class="index-item">{{ dataList?.length + index }} </span>
                <div class="item-skeleton">
                  <div class="img-box">
                    <el-skeleton-item class="image-skeleton" variant="image" />
                  </div>
                  <div style="margin-top: 7px" class="info">
                    <el-skeleton-item variant="text" style="width: 40%" />
                    <el-skeleton-item variant="text" style="width: 20%" />
                    <el-skeleton-item variant="text" style="width: 30%" />
                    <div class="overview">
                      <el-skeleton-item variant="text" />
                      <el-skeleton-item variant="text" style="width: 50%" />
                    </div>
                  </div>
                </div>
              </template>
            </el-skeleton>
          </div>
        </a-layout-content>
      </a-layout>
    </div>

    <RequireAuth v-else />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import MovieCardHorizontalFollow from '@/components/MovieCardHorizontalFollow/MovieCardHorizontalFollow.vue';
import RequireAuth from '@/components/RequireAuth/RequireAuth.vue';
import {
  getList,
  getBackdrop,
  searchList,
  getColorImage,
} from '@/services/MovieService';
import disableScroll from 'disable-scroll';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import scrollBottom from 'scroll-bottom';
import { conrfirmMessageModal } from '~/utils/messageModal';
import { handleRemoveAllitemFromList } from '~/utils/handelAddRemoveItemList_History';

definePageMeta({
  // requireAuth: true,
  // middleware: ['require-auth'],
});

const store: any = useStore();
const { isLogin } = storeToRefs<any>(store);
const route = useRoute();
const dataList = ref<any[]>([]);
const valueInput = ref<string>('');
const debounce = ref<any>();
const total = ref<number>(0);
const skip = ref<number>(1);
const internalInstance: any = getCurrentInstance();
const loading = ref<boolean>(false);
const loadingSearch = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const isScroll = ref<boolean>(false);
const topicImage = ref<string>('/d0YSRmp819pMRnKLfGMgAQchpnR.jpg');

// document.title = 'Phimhay247 - Theo dõi';
useHead({
  title: 'Phimhay247 - Theo dõi',
  htmlAttrs: { lang: 'vi' },
});

const setBackgroundColor = (color: string[]) => {
  const main_color = `linear-gradient(to bottom, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1), rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5), rgba(0, 0, 0, 1));`;

  // const main_color = `linear-gradient(to bottom, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1) 0%, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.33) 33%, rgba(0, 0, 0, 1) 100%);`;

  const topic_follow_column = document.getElementsByClassName(
    'topic-follow-column'
  )[0] as HTMLElement;

  if (topic_follow_column) {
    topic_follow_column.setAttribute(
      'style',
      `background-image: ${main_color}`
    );
    // topic_follow_column.style.setProperty('--main-color', main_color);

    // const search_follow =
    //   topic_follow_column.querySelector('.search-follow');

    const ant_input_affix_wrapper = topic_follow_column.getElementsByClassName(
      'ant-input-affix-wrapper'
    )[0] as HTMLElement;
    ant_input_affix_wrapper.setAttribute(
      'style',
      `border-bottom: 2px solid rgb(${color[0]}, ${color[1]}, ${color[2]});`
    );
  }

  const topic_follow_column_responsive = document.getElementsByClassName(
    'topic-follow-column-responsive'
  )[0] as HTMLElement;

  if (topic_follow_column_responsive) {
    topic_follow_column_responsive.setAttribute(
      'style',
      `background-image: ${main_color}`
    );

    // const search_follow =
    //   topic_follow_column_responsive.querySelector('.search-follow');

    const ant_input_affix_wrapper =
      topic_follow_column_responsive.getElementsByClassName(
        'ant-input-affix-wrapper'
      )[0] as HTMLElement;

    ant_input_affix_wrapper.setAttribute(
      'style',
      `border-bottom: 2px solid rgb(${color[0]}, ${color[1]}, ${color[2]});`
    );
  }

  // topic_follow_column.style = `background: url("${getBackdrop(
  //   dataList.value[0]?.backdrop_path
  // )}");`;

  // topic_follow_column.style.setProperty(
  //   '--main-color',
  //   `${main_color}`
  // );
};

onMounted(() => {
  // const ant_btn = document.querySelector(
  //   '.topic-follow-column .viewmore-btn-follow'
  // );
  const ant_btn = document.getElementsByClassName('viewmore-btn-follow')[0];
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
});

const getData = () => {
  loading.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  useAsyncData(`list/get/${store.$state.userAccount?.id}/1`, () =>
    getList(store.$state.userAccount?.id)
  )
    .then((movieRespone: any) => {
      if (movieRespone.data.value.data?.result?.items?.length > 0) {
        dataList.value = movieRespone.data.value.data?.result?.items;
        total.value = movieRespone.data.value.data?.total;
        topicImage.value = dataList.value[0]?.backdrop_path;

        setTimeout(() => {
          const color = dataList.value[0]?.dominant_backdrop_color;
          setBackgroundColor(color);
        });
      }

      if (dataList.value?.length == 0) {
        useAsyncData(`image/color/${topicImage.value}`, () =>
          getColorImage(topicImage.value)
        )
          .then((colorResponse: any) => {
            const color = colorResponse.data.value.data?.color;
            setBackgroundColor(color);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      }

      internalInstance.appContext.config.globalProperties.$Progress.finish();
      loading.value = false;
    })
    .catch((e) => {
      internalInstance.appContext.config.globalProperties.$Progress.finish();
      if (axios.isCancel(e)) return;
    });
};

onBeforeMount(() => {
  getData();

  // var scrollBefore = 0;
  // const scrollBottom = require('scroll-bottom');

  window.addEventListener('scroll', () => {
    isScroll.value = true;
  });

  window.onscroll = () => {
    if (
      Math.floor(scrollBottom()) == 0 &&
      isScroll.value == true &&
      total.value > 20 &&
      dataList.value?.length < total.value
    ) {
      loadMore.value = true;
      useAsyncData(
        `list/get/${store.$state.userAccount?.id}/${skip.value}`,
        () => getList(store.$state.userAccount?.id, skip.value)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value.data?.result?.length > 0) {
            setTimeout(() => {
              loadMore.value = false;
              dataList.value = dataList.value.concat(
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
  };
});

const getDataWhenRemoveList = (data: number) => {
  // dataList.value = data;
  dataList.value = _.reject(dataList.value, (x) => {
    return x.id === data;
  });
  // total.value = data?.length;
};

watch(route, () => {
  // getData();
});

const removeAllFollowList = () => {
  if (dataList.value?.length > 0) {
    conrfirmMessageModal({
      title: 'Thông Báo',
      message: 'Bạn có muốn xóa toàn bộ Danh sách phát không?',
      onOk: async function () {
        if (await handleRemoveAllitemFromList(store?.$state.userAccount?.id)) {
          dataList.value = [];
        }
      },
      onCancel() {},
    });
  }
};

const searchFollow = (e: any) => {
  if (e.target.value.length >= 0) {
    loadingSearch.value = true;

    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
      useAsyncData(
        `list/search/${store.$state.userAccount?.id}/${e.target.value}`,
        () => searchList(store?.$state.userAccount?.id, e.target.value)
      )
        .then((movieRespone: any) => {
          dataList.value = movieRespone.data.value.data?.results;
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
  //   dataList.value = [];
  // }
};

const onLoadMore = () => {
  loadMore.value = true;
  getList(store.$state.userAccount?.id, skip.value)
    .then((movieRespone) => {
      if (movieRespone.data?.result?.length > 0) {
        setTimeout(() => {
          loadMore.value = false;
          dataList.value = dataList.value.concat(movieRespone.data?.result);
        }, 2000);
        skip.value += 1;
      }
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};
</script>

<style lang="scss" src="./FollowView.scss"></style>
