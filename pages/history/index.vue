<template>
  <div class="history">
    <div v-show="store.isLogin" class="history-container">
      <div v-if="loading">
        <TopicRow
          v-show="responsive"
          v-model:dataRow="dataHistory"
          v-model:valueInput="valueInput"
          :title="title"
          :total="total"
          :topicImage="topicImage"
          :loadingSearch="loadingSearch"
          :searchRow="searchHistoryT"
          :deleteAll="removeAllHistoryList"
        />

        <Teleport :disabled="!loading" to="#topic-history-column-teleport">
          <TopicColumn
            v-model:dataColumn="dataHistory"
            v-model:valueInput="valueInput"
            :title="title"
            :total="total"
            :topicImage="topicImage"
            :loadingSearch="loadingSearch"
            :searchRow="searchHistoryT"
            :deleteAll="removeAllHistoryList"
          />
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
            :class="{ fixed: isFixedNavActiom }"
          >
            <SortTab @onChangeTab="handleChangeTab" />
          </div>

          <Transition name="slide-left">
            <TransitionGroup
              v-show="showData"
              tag="div"
              class="movie-history padding-content horizontal"
              :duration="0.2"
              @beforeLeave="beforeLeave"
              @leave="leave"
            >
              <MovieCardHorizontalHistory
                v-for="(item, index) in dataHistory"
                :index="index"
                :key="item.id"
                :item="item"
                :prevItem="dataHistory[index - 1]"
                :type="item?.media_type"
                :getDataWhenRemoveHistory="getDataWhenRemoveHistory"
              />
            </TransitionGroup>
          </Transition>

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
import TopicRow from '@/components/TopicRow/TopicRow.vue';
import TopicColumn from '@/components/TopicColumn/TopicColumn.vue';
import { getHistory, searchHistory } from '~/services/history';
import disableScroll from 'disable-scroll';
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';
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
const route: any = useRoute();
const valueInput = ref<string>('');
const debounce = ref<any>();
const total = ref<number>(0);
const skip = ref<number>(1);
const dataHistory = ref<any[]>([]);
const loading = ref<boolean>(false);
const isScroll = ref<boolean>(false);
const loadingSearch = ref<boolean>(false);
const isFixedNavActiom = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const topicImage = ref<string>('topic1.jpg');
const internalInstance: any = getCurrentInstance();
const historyContent = ref();
const title = ref<string>('Phim đã xem');
const activeTab = ref<string>('all');
const showData = ref<boolean>(true);

const breakpoints = useBreakpoints({
  responsive: 1200,
});

const responsive = breakpoints.smallerOrEqual('responsive');

useHead({
  title: 'Lịch sử xem ' + ' | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Lịch sử xem ' + ' | Phimhay247',
  description: 'Lịch sử xem dõi của bạn',
  ogTitle: 'Lịch sử xem ' + ' | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Lịch sử xem dõi của bạn',
  ogLocale: 'vi',
});

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

  const headerHeight = +getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .replace('px', '');

  window.addEventListener('scroll', () => {
    if (dataHistory.value?.length == 0) {
      return;
    }

    if (historyContent?.value) {
      if (window.scrollY >= historyContent.value.offsetTop + headerHeight) {
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
      dataHistory.value?.length < total.value
    ) {
      loadMore.value = true;
      useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/${skip.value}`,
        () => getHistory(activeTab.value, skip.value)
      )
        .then((movieRespone: any) => {
          if (movieRespone.data.value?.results?.length > 0) {
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
      if (movieRespone.data.value?.results?.length > 0) {
        dataHistory.value = movieRespone.data.value?.results;
        total.value = movieRespone.data.value?.total;
        topicImage.value = dataHistory.value[0]?.backdrop_path;
        skip.value++;
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
  topicImage.value = dataHistory.value[0]?.backdrop_path;
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

const searchHistoryT = (e: any) => {
  if (e.target.value.length >= 0) {
    loadingSearch.value = true;

    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
      useAsyncData(
        `history/search/${store.userAccount?.id}/${activeTab.value}/${e.target.value}`,
        () => searchHistory(e.target.value, activeTab.value)
      )
        .then((movieRespone: any) => {
          dataHistory.value = movieRespone.data.value?.results;
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

  switch (value) {
    case 'all':
      await useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getHistory(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          dataHistory.value = movieRespone.data.value?.results;
          total.value = movieRespone.data.value?.total;

          if (movieRespone.data.value?.results?.length > 0) {
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          internalInstance.appContext.config.globalProperties.$Progress.finish();
          setTimeout(() => {
            showData.value = true;
          }, 300);
        });
      break;
    case 'movie':
      await useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getHistory(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          dataHistory.value = movieRespone.data.value?.results;
          total.value = movieRespone.data.value?.total;

          if (movieRespone.data.value?.results?.length > 0) {
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          internalInstance.appContext.config.globalProperties.$Progress.finish();
          setTimeout(() => {
            showData.value = true;
          }, 300);
        });
      break;
    case 'tv':
      await useAsyncData(
        `history/get/${store.userAccount?.id}/${activeTab.value}/1`,
        () => getHistory(activeTab.value, 1)
      )
        .then((movieRespone: any) => {
          dataHistory.value = movieRespone.data.value?.results;
          total.value = movieRespone.data.value?.total;

          if (movieRespone.data.value?.results?.length > 0) {
            topicImage.value = dataHistory.value[0]?.backdrop_path;
            skip.value = 2;
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        })
        .finally(() => {
          internalInstance.appContext.config.globalProperties.$Progress.finish();
          setTimeout(() => {
            showData.value = true;
          }, 300);
        });
      break;
  }
};

const beforeLeave = (el: any) => {
  el.style.transform = 'translateX(0)';
  el.style.opacity = '1';
};

const leave = (el: any, done: () => void) => {
  // el.style.transform = 'translateY(100%)';
  // el.style.opacity = '0';

  if (!showData.value) {
    gsap.to(el, {
      display: 'none',
      duration: 0,
      onComplete: done,
    });
    return;
  }

  gsap.to(el, {
    opacity: 0,
    x: '100%',
    duration: 0.2,
    onComplete: done,
  });
};
</script>

<style lang="scss" src="./HistoryPage.scss"></style>
