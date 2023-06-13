<template>
  <a-layout-sider :width="450" class="sider-rank">
    <div class="rank-side-header">
      <h2 class="gradient-title-default underline">
        <span> Top xem phim</span>
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
    </div>
    <div
      class="rank-side-content"
      v-loading="loading"
      element-loading-text="Đang tải..."
      element-loading-background="rgba(0, 0, 0, 0.75)"
    >
      <RankCard
        v-for="(item, index) in rankData"
        :index="index"
        :key="item.id"
        :item="item"
        :type="item.media_type"
      />
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import RankCard from '@/components/RankCard/RankCard.vue';
import { getRanking } from '~/services/ranking';
import axios from 'axios';

interface tab {
  key: string;
  tabName: string;
}

const activeTab = ref<string>('day');
const loading = ref(false);
const rankData = ref<any[]>([]);
const allTabs = ref<tab[]>([
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

const getData = async (activeKey: string) => {
  if (activeTab.value != activeKey) {
    loading.value = true;
    switch (activeKey) {
      case 'day':
        await useAsyncData(`ranking/all/1`, () => getRanking(1))
          .then((movieRespone: any) => {
            rankData.value = movieRespone.data.value?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            loading.value = false;
          });

        break;
      case 'week':
        await useAsyncData(`ranking/all/2`, () => getRanking(2))
          .then((movieRespone: any) => {
            rankData.value = movieRespone.data.value?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            loading.value = false;
          });

        break;
      case 'month':
        await useAsyncData(`ranking/all/3`, () => getRanking(3))
          .then((movieRespone: any) => {
            rankData.value = movieRespone.data.value?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            loading.value = false;
          });

        break;
      case 'all':
        await useAsyncData(`ranking/all/4`, () => getRanking(4))
          .then((movieRespone: any) => {
            rankData.value = movieRespone.data.value?.results;
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          })
          .finally(() => {
            loading.value = false;
          });

        break;
    }
    activeTab.value = activeKey;
  }
};

onBeforeMount(async () => {});
await useAsyncData(`ranking/all/1`, () => getRanking(1))
  .then((movieRespone: any) => {
    rankData.value = movieRespone.data.value?.results;
    setTimeout(() => {
      loading.value = false;
    }, 1500);
  })
  .catch((e) => {
    if (axios.isCancel(e)) return;
  });

const handleTabClick = (activeKey: any) => {
  getData(activeKey);
};
</script>

<style lang="scss" src="./RankSide.scss"></style>
