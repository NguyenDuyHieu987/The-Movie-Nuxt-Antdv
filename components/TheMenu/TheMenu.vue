<template>
  <a-menu
    :forceSubMenuRender="true"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    mode="inline"
    class="menu-sider-bar"
    theme="dark"
    :subMenuCloseDelay="0.1"
    :subMenuOpenDelay="0.1"
  >
    <a-menu-item key="">
      <template #icon>
        <HomeOutlined />
      </template>
      <NuxtLink :to="{ path: '/' }"><span>Trang chủ</span> </NuxtLink>
    </a-menu-item>

    <a-sub-menu key="movie">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-video-camera" /> -->
        <!-- <i class="fa-regular fa-video"></i> -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            d="M557.6 102.3c-11.53-7.406-25.88-8.391-38.28-2.688L416 147V128c0-35.35-28.65-64-64-64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64v-19.02l103.3 47.36c5.344 2.453 11.03 3.672 16.69 3.672c7.531 0 15.02-2.141 21.59-6.359C569.1 402.3 576 389.7 576 375.1V136C576 122.3 569.1 109.8 557.6 102.3zM368 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h288c8.822 0 16 7.178 16 16V384zM528 363.5L416 312.2V199.8l112-51.33V363.5z"
          />
        </svg>
      </template>
      <template #title>Phim lẻ</template>
      <a-menu-item key="all">
        <NuxtLink
          :to="{
            path: `/discover/movie/all`,
          }"
        >
          <span>Tất cả</span>
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="nowplaying">
        <NuxtLink
          :to="{
            path: `/discover/movie/nowplaying`,
          }"
        >
          <span>Now playing</span>
        </NuxtLink>
      </a-menu-item>

      <a-menu-item key="popular">
        <NuxtLink
          :to="{
            path: `/discover/movie/popular`,
          }"
        >
          <span>Phổ biến</span>
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="toprated">
        <NuxtLink
          :to="{
            path: `/discover/movie/toprated`,
          }"
        >
          <span>Top đánh giá</span>
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="upcoming">
        <NuxtLink
          :to="{
            path: `/discover/movie/upcoming`,
          }"
        >
          <span>Sắp công chiếu</span>
        </NuxtLink>
      </a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="tv">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-film" /> -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M463.1 32h-416C21.49 32-.0001 53.49-.0001 80v352c0 26.51 21.49 48 47.1 48h416c26.51 0 48-21.49 48-48v-352C511.1 53.49 490.5 32 463.1 32zM111.1 408c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 408zM111.1 280c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM111.1 152c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 152zM351.1 400c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V400zM351.1 208c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V208zM463.1 408c0 4.418-3.582 8-8 8h-47.1c-4.418 0-7.1-3.582-7.1-8l0-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V408zM463.1 280c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM463.1 152c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8l0-48c0-4.418 3.582-8 7.1-8h47.1c4.418 0 8 3.582 8 8V152z"
          />
        </svg> -->
        <Icon name="fa6-solid:film"></Icon>
      </template>
      <template #title>Phim bộ</template>
      <a-menu-item key="tv">
        <NuxtLink
          :to="{
            path: `/discover/tv/all`,
          }"
        >
          <span>Tất cả </span>
        </NuxtLink>
      </a-menu-item>

      <a-menu-item key="airingtoday">
        <NuxtLink
          :to="{
            path: `/discover/tv/airingtoday`,
          }"
        >
          <span>Airing today </span>
        </NuxtLink>
      </a-menu-item>

      <a-menu-item key="ontheair">
        <NuxtLink
          :to="{
            path: `/discover/tv/ontheair`,
          }"
        >
          <span>On the air </span>
        </NuxtLink> </a-menu-item
      ><a-menu-item key="tvpopular">
        <NuxtLink
          :to="{
            path: `/discover/tv/tvpopular`,
          }"
        >
          <span>Phổ biến </span>
        </NuxtLink> </a-menu-item
      ><a-menu-item key="tvtoprated">
        <NuxtLink
          :to="{
            path: `/discover/tv/tvtoprated`,
          }"
        >
          <span>Top đánh giá</span>
        </NuxtLink>
      </a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="genres">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-list" /> -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M80 48h-64C7.156 48 0 55.16 0 64v64c0 8.844 7.156 16 16 16h64C88.84 144 96 136.8 96 128V64C96 55.16 88.84 48 80 48zM80 208h-64C7.156 208 0 215.2 0 224v64c0 8.844 7.156 16 16 16h64C88.84 304 96 296.8 96 288V224C96 215.2 88.84 208 80 208zM80 368h-64C7.156 368 0 375.2 0 384v64c0 8.844 7.156 16 16 16h64C88.84 464 96 456.8 96 448v-64C96 375.2 88.84 368 80 368zM192 128h288c17.67 0 32-14.33 32-31.1S497.7 64 480 64H192C174.3 64 160 78.33 160 95.1S174.3 128 192 128zM480 384H192c-17.67 0-32 14.33-32 32s14.33 32 32 32h288c17.67 0 32-14.33 32-32S497.7 384 480 384zM480 224H192C174.3 224 160 238.3 160 256s14.33 32 32 32h288c17.67 0 32-14.33 32-32S497.7 224 480 224z"
          />
        </svg> -->
        <Icon name="fa6-solid:list"></Icon>
      </template>
      <template #title>Thể loại</template>
      <a-menu-item
        v-for="(item, index) in genres"
        :index="index"
        :key="item?.short_name"
      >
        <a-tooltip
          :title="item?.name_vietsub"
          placement="right"
          v-if="item?.name_vietsub?.length > 30"
        >
          <NuxtLink
            :to="{
              path: `/discover/genres/${item?.short_name}`,
            }"
          >
            <span>{{ item?.name_vietsub }}</span>
          </NuxtLink>
        </a-tooltip>
        <NuxtLink
          v-else
          :to="{
            path: `/discover/genres/${item?.short_name}`,
          }"
        >
          <!-- @click="$store.$state.breadCrumbValue = item?.name_vietsub" -->

          <span>{{ item?.name_vietsub }}</span>
        </NuxtLink>
      </a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="years">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-calendar-days" /> -->
        <!-- <i class="fa-sharp fa-light fa-calendar-days"></i> -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M384 64h-32V16C352 7.164 344.8 0 336 0S320 7.164 320 16V64H128V16C128 7.164 120.8 0 112 0S96 7.164 96 16V64H64C28.65 64 0 92.65 0 128v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V128C448 92.65 419.3 64 384 64zM32 224h96v64H32V224zM160 288V224h128v64H160zM288 320v64H160v-64H288zM32 320h96v64H32V320zM64 480c-17.67 0-32-14.33-32-32v-31.1h96V480H64zM160 480v-63.1h128V480H160zM416 448c0 17.67-14.33 32-32 32h-64v-63.1h96V448zM416 384h-96v-64h96V384zM416 288h-96V224h96V288zM416 192H32V128c0-17.67 14.33-32 32-32h320c17.67 0 32 14.33 32 32V192z"
          />
        </svg> -->
        <Icon name="fa6-regular:calendar-days"></Icon>
      </template>
      <template #title>Năm phát hành</template>
      <a-menu-item
        v-for="(item, index) in years"
        :index="index"
        :key="item?.name"
      >
        <NuxtLink
          :to="{
            path: `/discover/years/${
              /^\d+$/.test(item?.name)
                ? item?.name
                : removeVietnameseTones(item?.name)
                    ?.replaceAll(/\s/g, '-')
                    .toLowerCase()
            }`,
          }"
        >
          <span>{{ item?.name }}</span>
        </NuxtLink>
      </a-menu-item>
    </a-sub-menu>

    <a-sub-menu key="countries">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-globe" /> -->
        <!-- <i class="fa-regular fa-globe"></i> -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M256 16C123.5 16 16 123.5 16 256s107.5 240 240 240s239.1-107.5 239.1-240S388.5 16 256 16zM422 160H373.3c-6.391-27.41-15.39-52.18-26.48-73.1C378.2 103.8 404.2 129.2 422 160zM336 256c0 16.98-1.295 32.82-3.176 48H179.2C177.3 288.8 176 272.1 176 256s1.295-32.82 3.176-48h153.6C334.7 223.2 336 239 336 256zM256 448c-21.79 0-50.87-36.42-67.28-96h134.6C306.9 411.6 277.8 448 256 448zM188.7 160C205.1 100.4 234.2 64 256 64s50.87 36.42 67.28 96H188.7zM165.2 86.9C154.1 107.8 145.1 132.6 138.7 160H89.98C107.8 129.2 133.8 103.8 165.2 86.9zM70.32 208h60.25C128.9 223.5 128 239.6 128 256S128.9 288.5 130.6 304H70.32C66.34 288.6 64 272.6 64 256S66.34 223.4 70.32 208zM89.98 352H138.7c6.391 27.41 15.39 52.18 26.48 73.1C133.8 408.2 107.8 382.8 89.98 352zM346.8 425.1C357.9 404.2 366.9 379.4 373.3 352h48.74C404.2 382.8 378.2 408.2 346.8 425.1zM441.7 304h-60.25c1.68-15.51 2.57-31.56 2.57-48s-.8907-32.49-2.57-48h60.25C445.7 223.4 448 239.4 448 256S445.7 288.6 441.7 304z"
          />
        </svg>
      </template>
      <template #title>Quốc gia</template>
      <a-menu-item
        v-for="(item, index) in countries"
        :index="index"
        :key="item?.short_name"
      >
        <NuxtLink
          :to="{
            path: `/discover/countries/${item?.short_name}`,
          }"
        >
          <!-- @click="$store.$state.breadCrumbValue = item?.name" -->

          <span>{{ item?.name }}</span>
        </NuxtLink>
      </a-menu-item>
    </a-sub-menu>

    <a-menu-item key="follow">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-bookmark" /> -->
        <!-- <span class="material-icons-outlined"> playlist_play </span> -->
        <svg
          class="material-icons-outlined playlist"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <g><rect fill="none" height="24" width="24" /></g>
          <g>
            <g>
              <rect height="2" width="11" x="3" y="10" />
              <rect height="2" width="11" x="3" y="6" />
              <rect height="2" width="7" x="3" y="14" />
              <polygon points="16,13 16,21 22,17" />
            </g>
          </g>
        </svg>
      </template>
      <NuxtLink :to="{ path: '/follow' }"> <span>Theo dõi</span></NuxtLink>
    </a-menu-item>

    <a-menu-item key="history">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-clock-rotate-left" /> -->
        <Icon name="fa6-solid:clock-rotate-left" />
      </template>
      <NuxtLink :to="{ path: '/history' }">
        <span>Lịch sử Xem </span>
      </NuxtLink>
    </a-menu-item>

    <a-menu-item key="ranking">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-ranking-star" /> -->
        <Icon name="fa6-solid:ranking-star" />
      </template>
      <NuxtLink :to="{ path: '/ranking' }"> <span>Xếp hạng</span></NuxtLink>
    </a-menu-item>

    <a-menu-item key="pricing">
      <template #icon>
        <!-- <font-awesome-icon icon="fa-solid fa-money-check-dollar" /> -->
        <!-- <i class="fa-regular fa-money-check-dollar-pen"></i> -->
        <Icon name="material-symbols:price-change-outline"></Icon>
      </template>
      <NuxtLink :to="{ path: '/pricing' }"> <span>Pricing</span></NuxtLink>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { HomeOutlined } from '@ant-design/icons-vue';
import {
  getAllGenre,
  getAllNational,
  getAllYear,
} from '@/services/MovieService';
import axios from 'axios';
import { removeVietnameseTones } from '@/utils/RemoveVietnameseTones';

const route = useRoute();
const store = useStore();
const state = reactive({
  selectedKeys: [
    route.path
      .replaceAll('discover', '')
      .replaceAll(route.params?.slug ? route.params?.slug : '', '')
      .replaceAll(route.params?.id ? route.params?.id : '', '')
      .replaceAll(route.params?.name ? route.params?.name : '', '')
      .replaceAll('/', ''),
  ],
  openKeys: [
    route.path
      .replaceAll('discover', '')
      .replaceAll(route.params?.slug2 ? route.params?.slug2 : '', '')
      .replaceAll(route.params?.id ? route.params?.id : '', '')
      .replaceAll(route.params?.name ? route.params?.name : '', '')
      .replaceAll('/', ''),
  ],
  // preOpenKeys: ['1'],
});

const genres = ref([]);
const years = ref([]);
const countries = ref([]);

onBeforeMount(async () => {
  Promise.all([
    await useAsyncData(`genre/all`, () => getAllGenre()),
    await useAsyncData(`year/all`, () => getAllYear()),
    await useAsyncData(`country/all`, () => getAllNational()),
  ])
    .then((response) => {
      genres.value = response[0].data.value.data;
      years.value = response[1].data.value.data.sort(function (a, b) {
        return +b.name.slice(-4) - +a.name.slice(-4);
      });
      countries.value = response[2].data.value.data;

      store.$state.allGenres = response[0].data.value.data;
      store.$state.allYears = response[1].data.value.data.sort(function (a, b) {
        return +b.name.slice(-4) - +a.name.slice(-4);
      });
      store.$state.allCountries = response[2].data.value.data;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});

watch(route, () => {
  state.selectedKeys = [
    route.path
      .replaceAll('discover', '')
      .replaceAll(route.params?.slug ? route.params?.slug : '', '')
      .replaceAll(route.params?.id ? route.params?.id : '', '')
      .replaceAll(route.params?.name ? route.params?.name : '', '')
      .replaceAll('/', ''),
  ];

  state.openKeys = [
    route.path
      .replaceAll('discover', '')
      .replaceAll(route.params?.slug2 ? route.params?.slug2 : '', '')
      .replaceAll(route.params?.id ? route.params?.id : '', '')
      .replaceAll(route.params?.name ? route.params?.name : '', '')
      .replaceAll('/', ''),
  ];
});
</script>

<style lang="scss" src="./TheMenu.scss"></style>
