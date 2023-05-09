<template>
  <div class="ranking-container">
    <a-layout>
      <a-layout-content>
        <h2 class="gradient-title-default">
          <strong>Trending</strong>
        </h2>

        <section class="movie-group vertical">
          <MovieCarouselCardVertical
            v-for="(item, index) in trendings"
            :index="index"
            :key="item.id"
            :item="item"
          />
        </section>
        <div class="control-page">
          <!-- <a-pagination
            v-if="trendings?.length"
            v-model:current="pageTrending"
            :total="totalPage"
            :showSizeChanger="false"
            @change="onChangePage"
          /> -->

          <el-pagination
            v-model:current-page="pageTrending"
            background
            layout="prev, pager, next, total"
            :total="totalPage"
            :pager-count="5"
          />
          <!-- @current-change="onChangePage" -->
        </div>
      </a-layout-content>
      <a-layout-sider :width="450" class="sider-rank">
        <h2 class="gradient-title-default">
          <strong> Top xem phim</strong>
        </h2>
        <ul class="tabs-rank">
          <li
            v-for="(item, index) in allTabs"
            :key="item.key"
            :index="index"
            :class="[activeTab == item.key ? 'active' : '', item.key]"
            @click="handleTabClick(item.key)"
          >
            <span> {{ item.tabName }} </span>
          </li>
        </ul>

        <!-- <el-radio-group
          v-model="activeTab"
          @change="handleTabClick"
          class="rank"
        >
          <el-radio-button size="large" label="day" border
            >Top ngày</el-radio-button
          >
          <el-radio-button size="large" label="week" border
            >Top tuần</el-radio-button
          >
          <el-radio-button size="large" label="month" border
            >Top tháng</el-radio-button
          >
          <el-radio-button size="large" label="all" border
            >Tất cả</el-radio-button
          >
        </el-radio-group> -->
        <div
          class="rank-data"
          v-loading="loading"
          element-loading-text="Đang tải..."
          element-loading-background="rgba(0, 0, 0, 0.75)"
        >
          <el-scrollbar height="75vh">
            <RankCard
              v-for="(item, index) in rankData"
              :index="index"
              :key="item.id"
              :item="item"
            />
          </el-scrollbar>
        </div>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import { onBeforeMount, ref, watch } from 'vue';
import MovieCarouselCardVertical from '@/components/Normal/MovieCardVertical/MovieCardVertical.vue';
import RankCard from '@/components/Normal/RankCard/RankCard.vue';
import { getTrending, getRanking } from '@/services/MovieService';
import { useMeta } from 'vue-meta';
import axios from 'axios';

export default {
  components: {
    MovieCarouselCardVertical,
    RankCard,
  },
  setup() {
    const activeTab = ref('day');
    const loading = ref(false);
    const trendings = ref([]);
    const rankData = ref([]);
    const pageTrending = ref(1);
    const totalPage = ref(100);
    const allTabs = ref([
      {
        key: 'day',
        tabName: 'Top ngày',
      },
      {
        key: 'week',
        tabName: 'Top tuần',
      },
      {
        key: 'month',
        tabName: 'Top tháng',
      },
      {
        key: 'all',
        tabName: 'Tất cả',
      },
    ]);

    const getDataRanking = (activeKey) => {
      loading.value = true;
      switch (activeKey) {
        case 'day':
          getRanking(1)
            .then((movieRespone) => {
              rankData.value = movieRespone.data?.results;
              setTimeout(() => {
                loading.value = false;
              }, 1500);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });

          activeTab.value = activeKey;
          break;
        case 'week':
          getRanking(2)
            .then((movieRespone) => {
              rankData.value = movieRespone.data?.results;
              setTimeout(() => {
                loading.value = false;
              }, 1500);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });

          activeTab.value = activeKey;
          break;
        case 'month':
          getRanking(3)
            .then((movieRespone) => {
              rankData.value = movieRespone.data?.results;
              setTimeout(() => {
                loading.value = false;
              }, 1500);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });

          activeTab.value = activeKey;
          break;
        case 'all':
          getRanking(4)
            .then((movieRespone) => {
              rankData.value = movieRespone.data?.results;
              setTimeout(() => {
                loading.value = false;
              }, 1500);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });

          activeTab.value = activeKey;
          break;
      }
    };

    onBeforeMount(() => {
      getTrending(pageTrending.value)
        .then((movieRespone) => {
          trendings.value = movieRespone.data?.results;
          totalPage.value = movieRespone.data?.total_pages * 10;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });

      getDataRanking(activeTab.value);
    });

    watch(pageTrending, () => {
      getTrending(pageTrending.value)
        .then((movieRespone) => {
          trendings.value = movieRespone.data?.results;
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    });

    const handleTabClick = (activeKey) => {
      getDataRanking(activeKey);
    };

    useMeta({
      title: '`Phimhay247 - Xếp hạng',
      htmlAttrs: { lang: 'vi', amp: true },
    });

    // document.title = 'Phimhay247 - Xếp hạng';

    return {
      activeTab,
      loading,
      rankData,
      trendings,
      pageTrending,
      totalPage,
      allTabs,
      handleTabClick,
    };
  },
};
</script>

<style lang="scss" src="./RankingView.scss"></style>
