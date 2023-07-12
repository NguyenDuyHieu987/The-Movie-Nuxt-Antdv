<template>
  <header class="header-bar">
    <div class="left-header">
      <button class="menu-btn mobile" @click="store.setOpendrawer()">
        <!-- v-if="!openDrawer" -->
        <Icon name="ant-design:menu-outlined" class="menu" />
        <!-- <Icon v-else name="ic:baseline-close" class="close" /> -->
      </button>
      <button
        v-if="collapsed == true"
        class="menu-btn desktop"
        @click="store.setCollapsed()"
      >
        <Icon name="ant-design:menu-outlined" />
      </button>
      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <nuxt-img
            :src="getImage('logo.png', 'logo')"
            loading="lazy"
            alt=""
            :height="30"
            :width="30"
          />
          <span> PhimHay247 </span>
        </NuxtLink>
      </div>
    </div>

    <a-auto-complete
      v-model:value="valueInput"
      class="search-header"
      dropdown-class-name="certain-category-search-dropdown"
      :options="dataSearch"
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
        class="search-header"
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
            popper-class="el-tooltip"
          >
            <Icon
              name="fa6-solid:magnifying-glass"
              class="fa-magnifying-glass"
            />
          </a-tooltip>
        </template>
      </a-input-search>
    </a-auto-complete>

    <div class="right-header">
      <a-popover
        trigger="click"
        placement="bottom"
        overlayClassName="popover-search"
        effect="dark"
      >
        <a-button type="text" shape="circle" class="search-btn-mobile">
          <template #icon>
            <Icon
              name="fa6-solid:magnifying-glass"
              class="fa-magnifying-glass"
            />
          </template>
        </a-button>

        <template #content>
          <h3 class="section-title search">
            <span> Tìm kiếm </span>
          </h3>
          <a-auto-complete
            v-model:value="valueInput"
            class="search-popover"
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
              class="search-popover"
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
      </a-popover>

      <a-menu theme="dark" mode="horizontal" :selectable="false">
        <a-menu-item :class="{ disabled: !isLogin }" key="notification">
          <a-dropdown
            v-if="isLogin"
            v-once
            :trigger="['click']"
            class="dropdown-notification"
            overlayClassName="dropdown-notification"
            placement="bottomLeft"
          >
            <span v-if="isLogin" v-once class="ant-dropdown-link">
              <a-badge :count="3" :overflow-count="9">
                <!-- <Icon name="fa6-regular:bell" class="fa-bell fa-regular" />
                <Icon name="fa6-solid:bell" class="fa-bell fa-solid" /> -->

                <svg
                  class="fa-bell fa-regular"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
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
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z"
                  />
                </svg>
              </a-badge>
            </span>

            <template #overlay>
              <el-menu class="dropdown-notification">
                <div class="notification-header">
                  <span> Thông báo</span>
                </div>

                <a-menu-item-group class="public" key="public">
                  <template #title>
                    <p>Thông báo chung</p>
                    <p class="count-message">1</p>
                  </template>
                  <a-menu-item>Chào mừng bạn đến với Phimhay247</a-menu-item>
                </a-menu-item-group>

                <div class="separate" />

                <a-menu-item-group class="private" key="private">
                  <template #title>
                    <p>Thông báo cá nhân</p>
                    <p class="count-message">1</p>
                  </template>
                  <a-menu-item>Message 1</a-menu-item>
                  <a-menu-item>Message 2</a-menu-item>
                </a-menu-item-group>
              </el-menu>
            </template>
          </a-dropdown>
        </a-menu-item>

        <a-menu-item class="account" key="account">
          <a-dropdown
            :trigger="['click']"
            class="dropdown-account"
            overlayClassName="dropdown-account"
            placement="bottomLeft"
          >
            <span class="ant-dropdown-link">
              <UserOutlined />

              <CaretDownOutlined />
            </span>
            <template #overlay>
              <a-menu class="dropdown-account">
                <a-menu-item
                  :class="{ active: isLogin }"
                  key="my-profile"
                  v-if="isLogin"
                  v-once
                >
                  <NuxtLink :to="{ path: '/profile' }"
                    ><span>My Profile</span>
                    <br />
                    <span style="font-size: 1.2rem">{{
                      userAccount?.email
                    }}</span>
                  </NuxtLink>
                </a-menu-item>
                <a-menu-item
                  key="dashboard"
                  v-if="isLogin && role == 'admin'"
                  v-once
                >
                  <NuxtLink :to="$config.app.adminWebsiteUrl" target="_blank">
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
  </header>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getDaTaSearch } from '~/services/search';
import { getImage } from '~/services/image';
import SearchCard from '@/components/SearchCard/SearchCard.vue';
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import { ElMenu, ElMenuItem } from 'element-plus';

const store = useStore();
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

onMounted(() => {
  const header: HTMLElement | null =
    document.querySelector('header.header-bar');
  var lastScrollTop = 0;
  window.onscroll = () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      if (window.scrollY >= 65) {
        header!.style.background = '#101010e6';
      } else if (window.scrollY == 0) {
        header!.style.background =
          'linear-gradient(to bottom, #101010 0, #10101000 100%)';
      }
    } else if (st < lastScrollTop) {
      // upscroll code
      if (window.scrollY == 0) {
        header!.style.background =
          'linear-gradient(to bottom, #101010 0, #10101000 100%)';
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

    // valueInput.value = '';
    isOpenAutoComplete.value = false;
  }
};

const handleLogout = () => {
  if (isLogin) {
    store.userAccount = {};
    store.isLogin = false;
    store.role = 'normal';

    window.localStorage.removeItem('userAccount');
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('remember');
    window.localStorage.removeItem('isLogin');
  }
};
</script>

<style lang="scss" src="./Header.scss"></style>
