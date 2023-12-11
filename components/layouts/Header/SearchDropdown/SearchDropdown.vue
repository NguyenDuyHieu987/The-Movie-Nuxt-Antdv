<template>
  <div
    class="search-dropdown"
    :class="{ show: isFocusSearchInput }"
    @pointerdown.prevent="handleMouseDownSearchDropdown"
  >
    <div class="search-dropdown-container">
      <div class="search-dropdown-wrapper">
        <div
          v-if="dataSearch?.length && isShowSearchResults"
          class="search-results"
        >
          <div class="search-results-list">
            <div class="search-dropdown-header results">
              <div class="left">Kết quả tìm kiếm</div>
              <div class="right click-active" @click="handleClearSearchHistory">
                <NuxtLink
                  class="view-all"
                  :to="`/search?q=${searchQuery
                    ?.replaceAll(' ', '+')
                    .toLowerCase()}`"
                >
                  Tất cả
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2rem"
                    height="1.2rem"
                    viewBox="0 0 320 512"
                    fill="currentColor"
                  >
                    <path
                      d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>

            <div
              v-for="(item, index) in dataSearchResults"
              :key="index"
              :index="index"
              class="search-results-item"
            >
              <p class="search-query-suggested">{{ item?.name }}</p>

              <span class="remove-search-history">Xóa</span>
            </div>
          </div>
        </div>
        <div
          v-if="
            store.isLogin &&
            store.dataSearchHistory?.length &&
            !isShowSearchResults
          "
          class="search-history"
        >
          <div class="search-dropdown-header history">
            <div class="left">Lịch sử tìm kiếm</div>
            <div class="right click-active" @click="handleClearSearchHistory">
              Xóa lịch sử
            </div>
          </div>

          <div class="search-history-list">
            <div
              v-for="(item, index) in store.dataSearchHistory"
              :key="index"
              :index="index"
              class="search-history-item"
            >
              <p class="search-query">{{ item?.query }}</p>

              <svg
                class="remove-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="1.4rem"
                height="1.4rem"
                viewBox="0 0 16 16"
                @click="handleRemoveSearchHistory(item?.id)"
              >
                <path
                  fill="currentColor"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div v-if="dataTopSearch?.length" class="top-search"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import _ from 'lodash';
import { removeSearchHistory, clearSearchHistory } from '~/services/search';

const store = useStore();

const props = defineProps<{
  searchQuery: string;
}>();
const dataSearch = defineModel<any[]>('dataSearch');
const dataTopSearch = defineModel<any[]>('dataTopSearch');
const dataSearchHistory = defineModel<any[]>('dataSearchHistory');
const isShowSearchResults = defineModel('isShowSearchResults', {
  type: Boolean,
  default: false,
});
const isFocusSearchInput = defineModel('isFocusSearchInput', {
  type: Boolean,
  default: false,
});
const dataSearchResults = ref<any[]>([]);
const searchResultsSimilarHistory = ref<any[]>([]);

function areStringsSimilar(
  str1: string,
  str2: { name: string; original_name: string }
) {
  console.log(str1, str2);

  console.log(
    _.includes(str1, str2.name) ||
      _.includes(str2.name, str1) ||
      _.includes(str1, str2.original_name) ||
      _.includes(str2.original_name, str1)
  );

  return (
    _.includes(str1, str2.name) ||
    _.includes(str2.name, str1) ||
    _.includes(str1, str2.original_name) ||
    _.includes(str2.original_name, str1)
  );
}

watch(dataSearch, () => {
  if (dataSearch.value!?.length > 0) {
    dataSearchResults.value = dataSearch.value!;

    // searchResultsSimilarHistory.value = dataSearch.value!.filter((item) =>
    //   dataSearchHistory.value!.some((item1) =>
    //     areStringsSimilar(item1?.query, item)
    //   )
    // );

    // // searchResultsSimilarHistory.value = searchResultsSimilarHistory.value.map(
    // //   (item) => dataSearchHistory.value!.find((item1) => true)
    // // );

    // console.log(searchResultsSimilarHistory.value);

    // const sortedArray = [
    //   ...searchResultsSimilarHistory.value,
    //   ...dataSearch.value!.filter(
    //     (item) =>
    //       !dataSearchHistory.value!.some((item1) =>
    //         areStringsSimilar(item1?.query, item)
    //       )
    //   ),
    // ];

    // dataSearchResults.value = sortedArray;
  } else {
    dataSearchResults.value = [];
  }
});

const handleMouseDownSearchDropdown = (e: any) => {
  e.preventDefault();
};

const handleRemoveSearchHistory = async (id: string) => {
  await removeSearchHistory(id)
    .then((response) => {
      if (response?.success) {
        dataSearchHistory.value = _.reject(dataSearchHistory.value, (x) => {
          return x.id === id;
        });

        store.dataSearchHistory = _.reject(store.dataSearchHistory, (x) => {
          return x.id === id;
        });
      }
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};

const handleClearSearchHistory = async () => {
  await clearSearchHistory()
    .then((response) => {
      if (response?.success) {
        dataSearchHistory.value = [];
        store.dataSearchHistory = [];
      }
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};
</script>

<style lang="scss" src="./SearchDropdown.scss"></style>
