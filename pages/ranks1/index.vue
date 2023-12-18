<template>
  <div class="ranks padding-content">
    <div class="ranks-container">
      <h2 class="ranks-title">
        <span>Bảng xếp hạng</span>
      </h2>

      <div class="rank-type">
        <div
          v-for="(item, index) in typeRankList"
          :key="index"
          :index="index"
          class="rank-type-item click-active"
          :class="{ active: item.value == typeRank }"
        >
          <NuxtLink
            :to="{
              query: {
                type: item.value,
              },
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>

      <section class="rank-section all">
        <div class="rank-section-header">
          <h3 class="rank-section-title">Xem nhiều</h3>
          <NuxtLink to="/" class="view-all click-active">Tất cả</NuxtLink>
        </div>
        <div class="rank-section-body">
          <div class="rank-body-list">
            <NuxtLink
              v-for="(item, index) in ranksData"
              :key="index"
              :index="index"
              :to="{
                path:
                  item?.media_type == 'tv'
                    ? `/info-tv/${item?.id}__${utils
                        .removeVietnameseTones(item?.name)
                        ?.replaceAll(/\s/g, '-')
                        .toLowerCase()}`
                    : `/info-movie/${item?.id}__${utils
                        .removeVietnameseTones(item?.name)
                        ?.replaceAll(/\s/g, '-')
                        .toLowerCase()}`,
              }"
              class="rank-body-item"
              :style="{
                backgroundImage:
                  'url(' +
                  getImage(item?.backdrop_path, 'backdrop', 'w-1000') +
                  ')',
              }"
            >
              <div class="rank-number">{{ index + 1 }}</div>

              <div class="info">{{ item?.name }}</div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { filterRanks, getRankPlay } from '~/services/ranks';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';
import { getImage } from '~/services/image';

const utils = useUtils();
const router = useRouter();
const route = useRoute();
const ranksData = ref<any[]>([]);
const ranksMovie = ref<any[]>([]);
const ranksTV = ref<any[]>([]);
const ranksAnimation = ref<any[]>([]);
const ranksAction = ref<any[]>([]);
const ranksHorror = ref<any[]>([]);
const ranksDrama = ref<any[]>([]);
const ranksScienceFiction = ref<any[]>([]);
const ranksEN = ref<any[]>([]);
const ranksJapan = ref<any[]>([]);
const ranksChina = ref<any[]>([]);
const pageTrending = ref<number>(+route?.query?.page || 1);
const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const typeRankList = ref<
  {
    value: string;
    label: string;
  }[]
>([
  { label: 'Danh sách xem nhiều', value: 'hot-play' },
  { label: 'Danh sách tìm kiếm nhiều', value: 'hot-search' },
  { label: 'Danh sách đánh giá cao', value: 'high-rate' },
]);
const typeRank = computed<string | 'hot-play' | 'hot-search' | 'high-rate'>(
  () => route.query?.type
);
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Bảng xếp hạng',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Bảng xếp hạng',
  description: 'Trending, bảng xếp hạng',
  ogTitle: 'Bảng xếp hạng',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Trending, bảng xếp hạng',
  ogLocale: 'vi',
});

const compareRanks = (ranks: any): any[] => {
  if (ranks?.results.length > 0 && ranks?.prev_results.length) {
    let step: number = 0;

    const rankCompared: any[] = ranks?.results.map((item: any, index: any) => {
      step = 0;

      ranks?.prev_results.find((item1: any, index1: any) => {
        if (item?.movie_id == item1?.movie_id) {
          step = index - index1;
          return true;
        } else {
          false;
        }
      });

      return {
        ...item,
        step: step,
      };
    });

    return rankCompared;
  }

  return [];
};

const getData = async () => {
  loading.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  await useAsyncData(
    `ranks/${typeRank.value}/day/${pageTrending.value}/10`,
    () => filterRanks(typeRank.value, 'day', pageTrending.value)
  )
    .then((response) => {
      ranksData.value = compareRanks(response.data.value);
      pageSize.value = response.data.value?.page_size;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });
};

loading.value = true;

const { data: rankingsCache, pending } = await useAsyncData(
  `cache/ranks/${typeRank.value}/day/${pageTrending.value}/10`,
  () => filterRanks(typeRank.value, 'day', pageTrending.value),
  {
    // transform: (data: any) => {
    //   totalPage.value = data?.total;
    //   pageSize.value = data?.page_size;
    //   loading.value = false;
    //   return data.results;
    // },
    // server: false,
  }
);

ranksData.value = compareRanks(rankingsCache.value);

pageSize.value = rankingsCache.value?.page_size;
loading.value = false;

watch(
  () => route.query,
  () => {
    if (typeRank.value) {
      getData();
    }
  }
);
</script>

<style lang="scss" src="./RankPage.scss"></style>
