<template>
  <header class="header-bar" :class="{ scrolled: store.headerScrolled }">
    <div class="left-header">
      <button class="menu-btn mobile" @click="store.setOpendrawer()">
        <MenuOutlined />
      </button>

      <!-- <button
        v-if="collapsed == true"
        class="menu-btn desktop"
        @click="store.setCollapsed()"
      >
        <MenuOutlined />
      </button> -->

      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <nuxt-img
            :src="getImage('logo.png', 'logo', 'w-45')"
            alt=""
            :height="30"
            :width="30"
            preload
          />
          <span> PhimHay247 </span>
        </NuxtLink>
      </div>

      <!-- <ul class="menu-header">
        <li
          class="menu-header-item"
          :class="{ active: $route.path == '/feature' }"
        >
          <NuxtLink to="/feature">Phim lẻ</NuxtLink>
        </li>
        <li
          class="menu-header-item"
          :class="{ active: $route.path == '/television' }"
        >
          <NuxtLink to="/television">Phim bộ</NuxtLink>
        </li>
      </ul> -->
    </div>

    <a-input-search
      v-model:value="valueInput"
      class="search-header"
      placeholder="Nhập tên phim để tìm kiếm..."
      size="large"
      allowClear
      bordered
      :loading="loadingSearch"
      @change="handleChangeInput(valueInput)"
      @search="handleSearch"
    >
      <template #enterButton>
        <el-tooltip
          content="Tìm kiếm"
          effect="dark"
          placement="bottom"
          popper-class="popper-tooltip"
          :offset="22"
        >
          <svg
            class="fa-magnifying-glass"
            xmlns="http://www.w3.org/2000/svg"
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288z"
            />
          </svg>
        </el-tooltip>
      </template>
    </a-input-search>

    <!-- <a-auto-complete
      v-model:value="valueInput"
      class="search-header"
      popupClassName="certain-category-search-dropdown"
      :options="dataSearch"
      :open="isOpenAutoComplete"
      @change="handleChangeInput(valueInput)"
      @focus="isOpenAutoComplete = true"
      @blur="isOpenAutoComplete = false"
      :backfill="true"
    >
      <template #options="item">
        v-for="(item, index) in dataSearch" :index="index"

        <SearchCard :key="item?.id" :item="item" :type="item.media_type" />
      </template>
    </a-auto-complete> -->

    <div class="right-header">
      <ul class="menu-header">
        <li class="menu-item search-mobile">
          <SearchMobile />
        </li>

        <li
          v-if="isLogin"
          class="menu-item notification"
          :show-timeout="0"
          :hide-timeout="0"
        >
          <Notification />
        </li>

        <li class="menu-item account">
          <DropdownAccount />
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getDaTaSearch } from '~/services/search';
import { getImage } from '~/services/image';
import DropdownAccount from './DropdownAcount/DropdownAcount.vue';
import Notification from './Notification/Notification.vue';
import SearchMobile from './SearchMobile/SearchMobile.vue';
// import SearchCard from '~/components/SearchCard/SearchCard.vue';
import { storeToRefs } from 'pinia';
import { MenuOutlined } from '@ant-design/icons-vue';

const store = useStore();
const { isLogin } = storeToRefs<any>(store);
const router = useRouter();
const route: any = useRoute();
const dataSearch = ref<any[]>([]);
const page = ref<number>(1);
const loadingSearch = ref<boolean>(false);
const isOpenAutoComplete = ref<boolean>(true);
const isShowSearch = ref<boolean>(false);
const debounce = ref<any>();
const valueInput = ref<string>(route.query.q);

onMounted(() => {
  isShowSearch.value = true;

  const header: HTMLElement | null =
    document.querySelector('header.header-bar');
  var lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    var st = window.scrollY || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      // downscroll code
      if (window.scrollY >= 65) {
        store.headerScrolled = true;
        // header!.style.background = '#101010e6';
      } else if (window.scrollY == 0) {
        store.headerScrolled = false;
        // header!.style.background =
        //   'linear-gradient(to bottom, #101010 0%, #10101000 100%)';
      }
    } else if (st < lastScrollTop) {
      // upscroll code
      if (window.scrollY == 0) {
        store.headerScrolled = false;
        // header!.style.background =
        //   'linear-gradient(to bottom, #101010 0%, #10101000 100%)';
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });
});

watchEffect(() => {
  valueInput.value = route.query.q;
});

const handleChangeInput = (query: string) => {
  if (query.length > 0) {
    // loadingSearch.value = true;

    // const url = new URL(location);
    // url.searchParams.set('q', query);
    // window.history.pushState({}, null, url);

    clearTimeout(debounce.value);
    debounce.value = setTimeout(async () => {
      // await useAsyncData(`search/all/${query}`, () =>
      //   getDaTaSearch(query, page.value)
      // )
      //   .then((movieRespone) => {
      //     dataSearch.value = movieRespone.data.value.data?.results;
      //     loadingSearch.value = false;
      //   })
      //   .catch((e) => {
      //     loadingSearch.value = false;
      //     if (axios.isCancel(e)) return;
      //   });

      navigateTo(
        `/search?q=${query?.replaceAll(' ', '+').toLowerCase()}`
        // query: { q: query?.replaceAll(' ', '+').toLowerCase() },
      );
    }, 700);
  } else if (query.length == 0) {
    navigateTo({ path: '/' });
    dataSearch.value = [];
  }
};

const handleSearch = (value: string) => {
  if (value.length > 0) {
    navigateTo(
      `/search?q=${value?.replaceAll(' ', '+').toLowerCase()}`
      // query: { q: value?.replaceAll(' ', '+').toLowerCase() },
    );

    // valueInput.value = '';
    isOpenAutoComplete.value = false;
  }
};
</script>

<style lang="scss" src="./Header.scss"></style>
