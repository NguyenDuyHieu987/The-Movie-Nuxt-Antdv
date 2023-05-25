<template>
  <a-layout-header class="header">
    <div class="logo">
      <button class="menu-btn mobile" @click="store.setOpendrawer()">
        <menu-outlined v-if="openDrawer == false" />
        <el-icon v-else><Close /></el-icon>
        <!-- <Icon v-else name="ic:sharp-close" /> -->
      </button>
      <button
        v-if="collapsed == true"
        class="menu-btn desktop"
        @click="store.setCollapsed()"
      >
        <menu-outlined />
        <!-- <el-icon v-else><Close /></el-icon> -->
      </button>
      <NuxtLink :to="{ path: '/' }">
        <h1>PhimHay247</h1>
      </NuxtLink>
    </div>

    <a-auto-complete
      v-model:value="valueInput"
      class="center-search-header"
      dropdown-class-name="certain-category-search-dropdown"
      :options="dataSearch"
      style="width: 40%; min-width: 400px; max-width: 500px"
      :open="isOpenAutoComplete"
      @change="handleChangeInput"
      @focus="isOpenAutoComplete = true"
      @blur="isOpenAutoComplete = false"
      :backfill="true"
    >
      <template #option="item">
        <!-- v-for="(item, index) in dataSearch"
        :index="index" 
        -->
        <SearchCard :key="item?.id" :item="item" :type="item.media_type" />
      </template>

      <a-input-search
        class="center-search-header"
        placeholder="Nhập tên phim để tìm kiếm..."
        size="large"
        allowClear
        bordered
        :loading="loadingSearch"
        @search="handleSearch"
      >
        <template #enterButton>
          <a-tooltip
            :teleported="false"
            title="Tìm kiếm"
            content="Tìm kiếm"
            effect="dark"
            placement="bottom"
          >
            <!-- <font-awesome-icon icon="fa-solid fa-magnifying-glass" /> -->
            <Icon
              name="fa6-solid:magnifying-glass"
              class="fa-magnifying-glass"
            />
          </a-tooltip>
        </template>
      </a-input-search>
    </a-auto-complete>

    <div class="right-header">
      <ClientOnly>
        <el-popover
          trigger="click"
          placement="bottom"
          popper-class="popover-search"
          effect="dark"
        >
          <template #reference>
            <a-button type="text" shape="circle" class="search-btn-mobile">
              <template #icon>
                <!-- <SearchOutlined /> -->
                <Icon
                  name="fa6-solid:magnifying-glass"
                  class="fa-magnifying-glass"
                />
              </template>
            </a-button>
          </template>

          <template #title> </template>
          <template #default>
            <h3 class="section-title search">
              <strong> Tìm kiếm </strong>
            </h3>
            <a-auto-complete
              v-model:value="valueInput"
              class="search-poppover"
              dropdown-class-name="certain-category-search-dropdown"
              :options="dataSearch"
              style="width: 100%"
              :open="isOpenAutoComplete"
              @change="handleChangeInput"
              @focus="isOpenAutoComplete = true"
              @blur="isOpenAutoComplete = false"
            >
              <template #option="item">
                <SearchCard
                  :key="item?.id"
                  :item="item"
                  :type="item.media_type"
                />
              </template>
              <a-input-search
                class="search-poppover"
                placeholder="Nhập tên phim để tìm kiếm..."
                size="large"
                allowClear
                bordered
                :loading="loadingSearch"
                @search="handleSearch"
              >
                <template #enterButton>
                  <Icon
                    name="fa6-solid:magnifying-glass"
                    class="fa-magnifying-glass"
                  />
                </template>
              </a-input-search>
            </a-auto-complete>
          </template>
        </el-popover>
      </ClientOnly>

      <a-menu theme="dark" mode="horizontal" :selectable="false">
        <a-menu-item key="notification" v-if="isLogin" v-once>
          <a-dropdown
            :trigger="['click']"
            class="dropdown-notification"
            placement="bottomLeft"
          >
            <a
              class="ant-dropdown-link"
              @click.prevent="
                isOpenDropdownNotification = !isOpenDropdownNotification
              "
            >
              <a-badge :count="3" :overflow-count="9">
                <!-- <Icon name="fa6-regular:bell" class="fa-bell fa-regular" />
                <Icon name="fa6-solid:bell" class="fa-bell fa-solid" /> -->

                <svg
                  class="fa-bell fa-regular"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.249 1.249 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.251 1.251 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5ZM13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145l.007-.147ZM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.003-.225A5.988 5.988 0 0 0 12 3.496Z"
                  />
                </svg>

                <svg
                  class="fa-bell fa-solid"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z"
                  />
                </svg>
              </a-badge>
            </a>

            <template #overlay>
              <el-menu class="dropdown-notification">
                <div class="notification-header">
                  <span> Thông báo</span>
                </div>

                <a-menu-item-group class="public" key="public">
                  <template #title>
                    <p>Thông báo chung</p>
                    <p>1</p>
                  </template>
                  <a-menu-item>Chào mừng bạn đến với Phimhay247</a-menu-item>
                </a-menu-item-group>

                <div class="separate" />

                <a-menu-item-group class="private" key="private">
                  <template #title>
                    <p>Thông báo cá nhân</p>
                    <p>2</p>
                  </template>
                  <a-menu-item>Message 1</a-menu-item>
                  <a-menu-item>Message 2</a-menu-item>
                </a-menu-item-group>
              </el-menu>
            </template>
          </a-dropdown>
        </a-menu-item>

        <a-menu-item class="account" key="account">
          <template #icon>
            <UserOutlined />
          </template>

          <a-dropdown
            :trigger="['click']"
            class="dropdown-account"
            placement="bottomLeft"
          >
            <a class="ant-dropdown-link" @click.prevent>
              <CaretDownOutlined />
            </a>
            <template #overlay>
              <a-menu class="dropdown-account">
                <a-menu-item key="my-profile" v-if="isLogin" v-once>
                  <NuxtLink :to="{ path: '/profile' }"
                    ><span>My Profile</span>
                    <br />
                    <span style="font-size: 12px">{{
                      userAccount?.email
                    }}</span>
                  </NuxtLink>
                </a-menu-item>
                <a-menu-item
                  key="dashboard"
                  v-if="isLogin && role == 'admin'"
                  v-once
                >
                  <!-- <NuxtLink :to="{ path: '/dashboard' }"
                    >Bảng điều khiển
                  </NuxtLink> -->
                  <NuxtLink
                    to="https://dashboard.phimhay247.site/"
                    target="_blank"
                  >
                    Bảng điều khiển
                  </NuxtLink>
                </a-menu-item>
                <a-menu-item key="pricing" v-if="isLogin" v-once>
                  <NuxtLink :to="{ path: '/billing' }">Billing</NuxtLink>
                </a-menu-item>
                <a-menu-item key="logout">
                  <NuxtLink :to="{ path: '/login' }" @click="handleLogout">
                    <span v-if="isLogin" v-once> Đăng xuất</span>
                    <span v-else v-once> Đăng nhập</span>
                  </NuxtLink>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  CaretDownOutlined,
  MenuOutlined,
} from '@ant-design/icons-vue';
import { getDaTaSearch } from '~/services/appMovieService';
import SearchCard from '../SearchCard/SearchCard.vue';
import { Close } from '@element-plus/icons-vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import _ from 'lodash';

const store: any = useStore();
const { openDrawer, collapsed, isLogin, userAccount, role } =
  storeToRefs<any>(store);
const router = useRouter();
const route: any = useRoute();
const dataSearch = ref<any[]>([]);
const page = ref<number>(1);
const loadingSearch = ref<boolean>(false);
const isOpenAutoComplete = ref<boolean>(true);
const debounce = ref<any>();
const valueInput = ref<string>(route.query.q);
const isOpenDropdownNotification = ref<boolean>(false);

onMounted(() => {
  const header: HTMLElement | null = document.querySelector(
    '.ant-layout-header.header'
  );
  var lastScrollTop = 0;
  window.onscroll = () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      if (window.scrollY >= 65) {
        // header.style.backgroundColor = '#000';
        header!.style.background = '#0b0b0bcc';
      } else if (window.scrollY == 0) {
        header!.style.background =
          'linear-gradient(to bottom, #050505 0, #05050500 100%)';
      }
    } else if (st < lastScrollTop) {
      // upscroll code
      if (window.scrollY == 0) {
        header!.style.background =
          'linear-gradient(to bottom, #050505 0, #05050500 100%)';
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };
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
    }, 500);
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

    // (valueInput.value as string) = '';
    valueInput.value = '';
    isOpenAutoComplete.value = false;
  }
};

const handleLogout = () => {
  if (isLogin) {
    store.$state.userAccount = {};
    store.$state.isLogin = false;
    store.$state.role = 'normal';

    window.localStorage.removeItem('userAccount');
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('remember');
    window.localStorage.removeItem('isLogin');
  }
};
</script>

<style lang="scss" src="./Header.scss"></style>
