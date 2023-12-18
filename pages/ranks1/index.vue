<template>
  <!-- center-page -->
  <div class="ranks padding-content">
    <div class="ranks-container">
      <div class="rank-header">
        <div class="left">
          <div class="ranks-title">
            <span>Bảng xếp hạng</span>
          </div>
        </div>

        <div class="right">
          <div class="rank-type">
            <div
              v-for="(item, index) in typeRankList"
              :key="index"
              :index="index"
              class="rank-type-item click-active"
              :class="{ active: item.value == formFilterRank.type }"
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

          <div class="rank-sortBy">
            <a-select
              v-model:value="formFilterRank.sortBy"
              style="width: 170px"
              @change="handleChangeType"
              placeholder="Xắp sếp theo"
            >
              <a-select-option value="day" label="Ngày"> Ngày </a-select-option>
              <a-select-option value="week" label="Tuần">
                Tuần
              </a-select-option>
              <a-select-option value="month" label="Tháng">
                Tháng
              </a-select-option>
              <a-select-option value="year" label="Năm"> Năm </a-select-option>
              <a-select-option value="all" label="Tất cả">
                Tất cả
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>

      <RankSection
        class="all"
        :ranksData="ranksData"
        :rankSectionTitle="rankSectionTitle"
        viewAllPath="/ranks"
        main
      />

      <div class="rank-section-list">
        <RankSection
          class="movie"
          :ranksData="ranksMovie"
          rankSectionTitle="Phim lẻ"
          viewAllPath="/ranks"
        />

        <RankSection
          class="movie"
          :ranksData="ranksTV"
          rankSectionTitle="Phim bộ"
          viewAllPath="/ranks"
        />

        <RankSection
          class="movie"
          :ranksData="ranksAnimation"
          rankSectionTitle="Phim hoạt hình"
          viewAllPath="/ranks"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { filterRanks, getRankPlay } from '~/services/ranks';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner.vue';
import RankSection from '~/components/RankSection/RankSection.vue';
import type { formfilterRank, rankType, rankSort } from '~/types';

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
const ranksChina = ref<any[]>([]);
const ranksJapan = ref<any[]>([]);
const pageRank = ref<number>(+route?.query?.page || 1);
const pageSize = ref<number>(20);
const loading = ref<boolean>(false);
const typeRankList = ref<
  {
    value: string;
    label: string;
  }[]
>([
  { label: 'D/S xem nhiều', value: 'hot-play' },
  { label: 'D/S tìm kiếm nhiều', value: 'hot-search' },
  { label: 'D/S đánh giá cao', value: 'high-rate' },
]);
const formFilterRank = computed<formfilterRank>(() => {
  return {
    type: route.query?.type || 'hot-play',
    sortBy: route.query?.sort_by || 'day',
    mediaType: 'all',
    genre: route.query?.genre || '',
    country: route.query?.country || '',
  };
});
const rankSectionTitle = computed<string>(
  () =>
    [
      { title: 'Xem nhiều', value: 'hot-play' },
      { title: 'Tìm kiếm nhiều', value: 'hot-search' },
      { title: 'Đánh giá cao', value: 'high-rate' },
    ].find((item) => item.value == formFilterRank.value.type)?.title!
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

      const itemRank = ranks?.prev_results.find((item1: any, index1: any) => {
        if (item?.movie_id == item1?.movie_id) {
          step = index1 - index;

          return true;
        } else {
          return false;
        }
      });

      const step_text = step >= 0 ? `+${step}` : `-${Math.abs(step)}`;

      return {
        ...item,
        step: step,
        step_text: step_text,
        new: itemRank ? false : true,
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
    `ranks/filter/${formFilterRank.value}/day/${pageRank.value}/10`,
    () => filterRanks(formFilterRank.value)
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

const { data: ranksDataCache, pending } = await useAsyncData(
  `cache/ranks/filter/${formFilterRank.value}/day/${pageRank.value}/10`,
  () => filterRanks(formFilterRank.value),
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

ranksData.value = compareRanks(ranksDataCache.value);
loading.value = false;

// Phim lẻ

const { data: ranksMovieCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    mediaType: 'movie',
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, mediaType: 'movie' })
);

ranksMovie.value = compareRanks(ranksMovieCache.value);

// Phim bộ

const { data: ranksTVCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    mediaType: 'tv',
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, mediaType: 'tv' })
);

ranksTV.value = compareRanks(ranksTVCache.value);

// Hoạt hình

const { data: ranksAnimationCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    genre: 16,
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, genre: 16 })
);

ranksAnimation.value = compareRanks(ranksAnimationCache.value);

// Hành động

const { data: ranksActionCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    genre: 28,
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, genre: 28 })
);

ranksAction.value = compareRanks(ranksActionCache.value);

// Kinh dị

const { data: ranksHorrorCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    genre: 27,
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, genre: 27 })
);

ranksHorror.value = compareRanks(ranksHorrorCache.value);

// Drama

const { data: ranksDramaCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    genre: 18,
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, genre: 18 })
);

ranksDrama.value = compareRanks(ranksDramaCache.value);

// Khoa học viễn tưởng

const { data: ranksScienceFictionCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    genre: 18,
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, genre: 18 })
);

ranksScienceFiction.value = compareRanks(ranksScienceFictionCache.value);

// Âu Mỹ

const { data: ranksENCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    country: 'en',
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, country: 'en' })
);

ranksEN.value = compareRanks(ranksENCache.value);

// Trung Quốc

const { data: ranksChinaCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    country: 'cn',
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, country: 'cn' })
);

ranksChina.value = compareRanks(ranksChinaCache.value);

// Nhật Bản

const { data: ranksJapanCache } = await useAsyncData(
  `cache/ranks/filter/${{
    ...formFilterRank.value,
    country: 'ja',
  }}/day/${pageRank.value}/10`,
  () => filterRanks({ ...formFilterRank.value, country: 'ja' })
);

ranksJapan.value = compareRanks(ranksJapanCache.value);

watch(
  () => formFilterRank.value,
  () => {
    getData();
  }
);

const handleChangeType = (activeKey: any) => {
  router.push({
    query: {
      sort_by: activeKey,
    },
  });
};
</script>

<style lang="scss" src="./RankPage.scss"></style>
