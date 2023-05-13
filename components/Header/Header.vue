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
        <a-tooltip title="Trang chủ">
          <h1>PhimHay247</h1>
        </a-tooltip>
      </NuxtLink>
    </div>

    <a-auto-complete
      v-model:value="valueInput"
      class="center-search-header"
      dropdown-class-name="certain-category-search-dropdown"
      :options="dataSearch"
      style="width: 40%; min-width: 400px; max-width: 550px"
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
        <el-popover trigger="click" placement="bottom" class="popover-search">
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
                class="center-search-header-responsive"
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

      <a-menu
        theme="dark"
        mode="horizontal"
        :selectable="false"
        style="height: 100%; background: transparent"
        triggerSubMenuAction="click"
      >
        <a-menu-item key="notification" v-show="isLogin">
          <a-dropdown
            :trigger="['click']"
            class="dropdown-notification"
            placement="bottomLeft"
          >
            <a class="ant-dropdown-link" @click.prevent>
              <a-badge :count="3" :overflow-count="9">
                <font-awesome-icon
                  icon="fa-regular fa-bell"
                  class="fa-regular"
                />
                <font-awesome-icon icon="fa-solid fa-bell" class="fa-solid" />

                <!-- <Icon name="fa6-regular:bell" class="fa-bell fa-regular" />
                <Icon name="fa6-solid:bell" class="fa-bell fa-solid" /> -->
              </a-badge>
            </a>

            <template #overlay>
              <a-menu class="dropdown-notification">
                <a-layout-header class="notification-header">
                  <span> Thông báo</span>
                </a-layout-header>

                <a-menu-item-group class="public" key="public">
                  <template #title>
                    <p>Thông báo chung</p>
                    <p>1</p>
                  </template>
                  <a-menu-item key="1"
                    >Chào mừng bạn đến với Phimhay247</a-menu-item
                  >
                </a-menu-item-group>

                <div class="separate" />

                <a-menu-item-group class="private" key="private">
                  <template #title>
                    <p>Thông báo cá nhân</p>
                    <p>2</p>
                  </template>
                  <a-menu-item key="1">Message 1</a-menu-item>
                  <a-menu-item key="2">Message 2</a-menu-item>
                </a-menu-item-group>
              </a-menu>
            </template>
          </a-dropdown>
        </a-menu-item>

        <a-menu-item key="account">
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
                <a-menu-item key="my-profile" v-show="isLogin">
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
                  v-show="isLogin && role == 'admin'"
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
                <a-menu-item key="pricing" v-show="isLogin">
                  <NuxtLink :to="{ path: '/billing' }">Billing</NuxtLink>
                </a-menu-item>
                <a-menu-item key="logout">
                  <NuxtLink :to="{ path: '/login' }" @click="handleLogout">
                    <span v-if="isLogin"> Đăng xuất</span>
                    <span v-else> Đăng nhập</span>
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

<script setup>
import {
  UserOutlined,
  CaretDownOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { getDaTaSearch } from '@/services/MovieService';
import SearchCard from '../SearchCard/SearchCard.vue';
import { Close } from '@element-plus/icons-vue';
import axios from 'axios';
import { useStore } from '@/store/useStore';
import { storeToRefs } from 'pinia';

const store = useStore();
const { openDrawer, collapsed, isLogin, userAccount, role } =
  storeToRefs(store);
const router = useRouter();
const dataSearch = ref([]);
const page = ref(1);
const loadingSearch = ref(false);
const isOpenAutoComplete = ref(true);
const debounce = ref();
const valueInput = ref('');

const handleChangeInput = (query) => {
  if (query.length > 0) {
    loadingSearch.value = true;

    clearTimeout(debounce.value);
    debounce.value = setTimeout(async () => {
      await useAsyncData(`search/all/${query}`, () =>
        getDaTaSearch(query, page.value)
      )
        .then((movieRespone) => {
          dataSearch.value = movieRespone.data.value.data?.results;
          setTimeout(() => {
            loadingSearch.value = false;
          }, 500);
        })
        .catch((e) => {
          loadingSearch.value = false;
          if (axios.isCancel(e)) return;
        });
    }, 500);
  } else if (query.length == 0) {
    dataSearch.value = [];
  }
};

const handleSearch = (value) => {
  if (value.length > 0) {
    navigateTo(`/discover/search/${value?.replaceAll(' ', '+').toLowerCase()}`);
    //   {
    //   name: 'discover',
    //   params: {
    //     slug: 'search',
    //     slug2: value?.replaceAll(' ', '+').toLowerCase(),
    //   },
    // }

    valueInput.value = '';
    isOpenAutoComplete.value = false;
  }
};

const handleLogout = () => {
  if (isLogin.value) {
    store.$state.userAccount = {};
    store.$state.isLogin = false;
    store.$state.role = 'normal';

    window.localStorage.removeItem('userAccount');
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('remember');
    window.localStorage.removeItem('isLogin');
  }
};

onMounted(() => {
  const header = document.querySelector('.ant-layout-header.header');
  var lastScrollTop = 0;
  window.onscroll = () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      if (window.scrollY >= 65) {
        // header.style.backgroundColor = '#000';
        header.style.background = '#0b0b0bcc';
      } else if (window.scrollY == 0) {
        header.style.background =
          'linear-gradient(to bottom, #050505 0, #05050500 100%)';
      }
    } else if (st < lastScrollTop) {
      // upscroll code
      if (window.scrollY == 0) {
        header.style.background =
          'linear-gradient(to bottom, #050505 0, #05050500 100%)';
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };
});
</script>

<style lang="scss" src="./Header.scss"></style>
