<template>
  <div class="follow">
    <div v-if="store.isLogin" class="follow-container">
      <div v-if="loading">
        <TopicRow
          v-show="responsive"
          v-model:dataRow="dataList"
          v-model:valueInput="valueInput"
          :title="title"
          :total="total"
          :topicImage="topicImage"
          :loadingSearch="loadingSearch"
          :searchRow="searchFollow"
          :deleteAll="removeAllFollowList"
        />

        <Teleport to="#topic-follow-column-teleport">
          <TopicColumn
            v-model:dataColumn="dataList"
            v-model:valueInput="valueInput"
            :title="title"
            :total="total"
            :topicImage="topicImage"
            :loadingSearch="loadingSearch"
            :searchRow="searchFollow"
            :deleteAll="removeAllFollowList"
          />
        </Teleport>

        <section class="follow-main-content" ref="followContent">
          <div class="padding-content horizontal">
            <h2 class="gradient-title-default underline">
              <span>Danh sách phát</span>
            </h2>
          </div>

          <div
            class="nav-action padding-content horizontal"
            :style="{
              '--width': followContent?.offsetWidth + 'px',
            }"
            :class="{ fixed: isFixedNavActiom }"
          >
            <SortTab @onChangeTab="handleChangeTab" />
          </div>

          <Transition name="slide-left">
            <TransitionGroup
              v-show="showData"
              tag="div"
              class="movie-follow padding-content horizontal"
              :duration="0.3"
              @beforeEnter="beforeEnter"
              @enter="enter"
              @beforeLeave="beforeLeave"
              @leave="leave"
            >
              <MovieCardHorizontalFollow
                v-for="(item, index) in dataList"
                :index="index"
                :key="item.id"
                :item="item"
                :type="item?.media_type"
                :getDataWhenRemoveList="getDataWhenRemoveList"
              />
            </TransitionGroup>
          </Transition>

          <div class="skeleton-loadmore" v-show="loadMore">
            <el-skeleton
              :loading="true"
              animated
              v-for="index in 2"
              :key="index"
            >
              <template #template>
                <p class="index-item">{{ dataList?.length + index }}</p>
                <div class="item-skeleton">
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
// import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import MovieCardHorizontalFollow from '~/components/MovieCardHorizontalFollow/MovieCardHorizontalFollow.vue';
import RequireAuth from '~/components/RequireAuth/RequireAuth.vue';
import SortTab from '~/components/SortTab/SortTab.vue';
import TopicRow from '~/components/TopicRow/TopicRow.vue';
import TopicColumn from '~/components/TopicColumn/TopicColumn.vue';
import { getList, searchList } from '~/services/list';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
// import scrollBottom from 'scroll-bottom';
import { useBreakpoints } from '@vueuse/core';
import gsap from 'gsap';

definePageMeta({
  // requireAuth: true,
  // middleware: ['require-auth'],
});

const store = useStore();
const utils = useUtils();
const { isLogin } = storeToRefs<any>(store);
const route = useRoute();
const dataList = ref<any[]>([]);
const valueInput = ref<string>('');
const debounce = ref<any>();
const total = ref<number>(0);
const skip = ref<number>(1);
const loading = ref<boolean>(false);
const loadingSearch = ref<boolean>(false);
const isFixedNavActiom = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const isScroll = ref<boolean>(false);
const topicImage = ref<string>('topic1.jpg');
const followContent = ref();
const title = ref<string>('Phim đã thêm vào danh sách phát');
const activeTab = ref<string>('all');
const showData = ref<boolean>(true);

const breakpoints = useBreakpoints({
  responsive: 1200,
});

const responsive = breakpoints.smallerOrEqual('responsive');

const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Theo dõi - Danh sách',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Theo dõi - Danh sách',
  description: 'Danh sách theo dõi của bạn',
  ogTitle: 'Theo dõi - Danh sách',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Danh sách theo dõi của bạn',
  ogLocale: 'vi',
});

onMounted(() => {
  const headerHeight = +getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .replace('px', '');

  window.addEventListener('scroll', () => {
    if (dataList.value?.length == 0) {
      return;
    }

    if (followContent?.value) {
      if (window.scrollY >= followContent.value.offsetTop + headerHeight) {
        isFixedNavActiom.value = true;
      } else {
        isFixedNavActiom.value = false;
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
      dataList.value?.length < total.value
    ) {
      loadMore.value = true;
      useAsyncData(
        `list/get/${store.userAccount?.id}/${activeTab.value}/${skip.value}`,
        () => getList(activeTab.value, skip.value)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value?.results?.length > 0) {
            setTimeout(() => {
              loadMore.value = false;
              dataList.value = dataList.value.concat(
                movieRespone.data.value?.results
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
  await useAsyncData(
    `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
    () => getList(activeTab.value, 1)
  )
    .then((movieRespone: any) => {
      if (movieRespone.data.value?.results?.length > 0) {
        dataList.value = movieRespone.data.value?.results;
        total.value = movieRespone.data.value?.total;
        topicImage.value = dataList.value[0]?.backdrop_path;
        skip.value++;
      }

      // if (dataList.value?.length == 0) {
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
    });
};

onBeforeMount(async () => {
  if (store.isLogin) {
    await nextTick();

    getData();
  }
});

const getDataWhenRemoveList = (data: number) => {
  // dataList.value = data;
  dataList.value = _.reject(dataList.value, (x) => {
    return x.movie_id === data;
  });
  total.value = dataList.value?.length;
  topicImage.value = dataList.value[0]?.backdrop_path;
};

const removeAllFollowList = () => {
  if (dataList.value?.length > 0) {
    utils.conrfirmMessageModal({
      title: 'Thông Báo',
      message: 'Bạn có muốn xóa toàn bộ Danh sách phát không?',
      onOk: async function () {
        if (await utils.handleRemoveAllitemFromList()) {
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

    internalInstance.appContext.config.globalProperties.$Progress.start();

    clearTimeout(debounce.value);

    debounce.value = setTimeout(() => {
      useAsyncData(
        `list/search/${store.userAccount?.id}/${activeTab.value}/${e.target.value}`,
        () => searchList(e.target.value, activeTab.value)
      )
        .then((movieRespone: any) => {
          dataList.value = movieRespone.data.value?.results;
        })
        .catch((e) => {
          loadingSearch.value = false;
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          loadingSearch.value = false;
          internalInstance.appContext.config.globalProperties.$Progress.finish();
        });
    }, 500);
  }
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

  showData.value = false;

  setTimeout(() => {
    showData.value = true;
  }, 350);

  switch (value) {
    case 'all':
      await useAsyncData(
        `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getList(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          dataList.value = movieRespone.data.value?.results;
          // title.value = 'Phim đã thêm vào danh sách phát';
          total.value = movieRespone.data.value?.total;

          if (movieRespone.data.value?.results?.length > 0) {
            topicImage.value = dataList.value[0]?.backdrop_path;
            skip.value = 2;
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
        `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getList(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          dataList.value = movieRespone.data.value?.results;
          // title.value = 'Phim lẻ';
          total.value = movieRespone.data.value?.total;

          if (movieRespone.data.value?.results?.length > 0) {
            topicImage.value = dataList.value[0]?.backdrop_path;
            skip.value = 2;
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
        `list/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getList(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          dataList.value = movieRespone.data.value?.results;
          // title.value = 'Phim bộ';
          total.value = movieRespone.data.value?.total;

          if (movieRespone.data.value?.results?.length > 0) {
            topicImage.value = dataList.value[0]?.backdrop_path;
            skip.value = 2;
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

const beforeEnter = (el: any) => {
  el.style.display = 'none';
};

const enter = (el: any, done: () => void) => {
  gsap.to(el, {
    display: 'flex',
    delay: 0.3,
    duration: 0,
    onComplete: done,
  });
};

const beforeLeave = (el: any) => {
  if (!showData.value) {
    el.style.display = 'none';
    return;
  }

  el.style.transform = 'translateX(0)';
  el.style.opacity = '1';
};

const leave = (el: any, done: () => void) => {
  if (!showData.value) {
    gsap.to(el, {
      display: 'none',
      duration: 0,
      onComplete: done,
    });
    return;
  }

  gsap.to(el, {
    x: '100%',
    opacity: 0,
    duration: 0.3,
    onComplete: done,
  });
};
</script>

<style lang="scss" src="./FollowPage.scss"></style>
