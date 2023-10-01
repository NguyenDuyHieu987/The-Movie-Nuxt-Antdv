<template>
  <section class="filter-section">
    <a-collapse class="filter-collapse" :bordered="false">
      <template #expandIcon="{ isActive }">
        <CaretRightFilled :rotate="isActive ? 90 : 0" />
      </template>

      <a-collapse-panel key="1" header="Tìm kiếm nâng cao">
        <div class="filter-body">
          <div class="filter-row">
            <div class="filter-label">Danh sách</div>
            <ul class="filter-options">
              <li
                class="filter-option"
                v-for="(item, index) in listFilter"
                :index="index"
                :key="item.value"
                :class="{
                  active: route.query?.type
                    ? item.value == route.query?.type
                    : item.value == 'all',
                }"
              >
                <NuxtLink
                  :to="{
                    query: { ...route.query, type: item.value },
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="filter-row">
            <div class="filter-label">Sắp xếp</div>
            <ul class="filter-options">
              <li
                class="filter-option"
                v-for="(item, index) in listSortBy"
                :index="index"
                :key="item.id"
                :class="{
                  active: item.id == route.query?.sort_by,
                }"
              >
                <NuxtLink
                  :to="{
                    query: { ...route.query, sort_by: item.id },
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="filter-row">
            <div class="filter-label">Thể loại</div>
            <Swiper
              class="filter-options"
              :modules="[SwiperFreeMode, SwiperNavigation]"
              :speed="500"
              :slides-per-view="'auto'"
              :space-between="10"
              :free-mode="true"
              :navigation="{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }"
            >
              <SwiperSlide
                class="filter-option"
                v-for="(item, index) in genres"
                :index="index"
                :key="item?.id"
                :class="{
                  active: item.id == route.query?.genre,
                }"
              >
                <NuxtLink
                  :to="{
                    query: { ...route.query, genre: item.id },
                  }"
                >
                  {{ item?.name_vietsub }}
                </NuxtLink>
              </SwiperSlide>
              <div class="swiper-button-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </div>
              <div class="swiper-button-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </Swiper>
          </div>
          <div class="filter-row">
            <div class="filter-label">Năm</div>
            <Swiper
              class="filter-options"
              :modules="[SwiperFreeMode, SwiperNavigation]"
              :speed="500"
              :slides-per-view="'auto'"
              :space-between="10"
              :free-mode="true"
              :navigation="{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }"
            >
              <SwiperSlide
                class="filter-option"
                v-for="(item, index) in years"
                :index="index"
                :key="item?.name"
                :class="{
                  active: item.name == route.query?.year,
                }"
              >
                <NuxtLink
                  :to="{
                    query: { ...route.query, year: item.name },
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </SwiperSlide>
              <div class="swiper-button-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </div>
              <div class="swiper-button-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </Swiper>
          </div>
          <div class="filter-row">
            <div class="filter-label">Quốc gia</div>
            <Swiper
              class="filter-options"
              :modules="[SwiperFreeMode, SwiperNavigation]"
              :speed="500"
              :slides-per-view="'auto'"
              :space-between="10"
              :free-mode="true"
              :navigation="{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }"
            >
              <SwiperSlide
                class="filter-option"
                v-for="(item, index) in countries"
                :index="index"
                :key="item?.iso_639_1"
                :class="{
                  active: item.iso_639_1 == route.query?.country,
                }"
              >
                <NuxtLink
                  :to="{
                    query: { ...route.query, country: item.iso_639_1 },
                  }"
                >
                  {{ item?.name }}
                </NuxtLink>
              </SwiperSlide>
              <div class="swiper-button-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </div>
              <div class="swiper-button-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3.5rem"
                  height="3.5rem"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </Swiper>
          </div>
        </div>
        <template #extra>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.6rem"
            height="1.6rem"
            viewBox="0 0 24 24"
          >
            <path d="M3 4c2.01 2.59 7 9 7 9v7h4v-7s4.98-6.41 7-9H3z" />
          </svg>
        </template>
      </a-collapse-panel>
    </a-collapse>
  </section>
</template>

<script setup lang="ts">
import { getAllSortBy } from '~/services/sortby';
import { CaretRightFilled } from '@ant-design/icons-vue';
import type { genre, country, year, sortby, formfilter } from '@/types';

const props = defineProps<{
  listFilter: any[];
  cancelFilter: () => void;
}>();

const emits = defineEmits<{
  onFilter: [];
}>();

const store = useStore();
const route: any = useRoute();
const listFilter = ref<any[]>(props.listFilter);
const genres = ref<genre[]>(store.allGenres);
const years = ref<year[]>(store.allYears);
const countries = ref<country[]>(store.allCountries);
// const listSortBy = ref<sortby[]>([]);
const loadingData = defineModel<boolean>('loading', {
  default: false,
});

const { data: listSortBy } = await useAsyncData(
  'sortby/all',
  () => getAllSortBy(),
  {
    transform: (data: any) => {
      return data.results;
    },
  }
);

const onFilter = () => {
  emits('onFilter');
};
</script>

<style lang="scss" src="./FilterSection.scss"></style>
