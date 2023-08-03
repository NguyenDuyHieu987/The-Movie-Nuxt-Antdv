<template>
  <header class="header-bar">
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
            :src="getImage('logo.png', 'logo', 'w-40')"
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
      popupClassName="certain-category-search-dropdown"
      :options="dataSearch"
      :open="isOpenAutoComplete"
      @change="handleChangeInput(valueInput)"
      @focus="isOpenAutoComplete = true"
      @blur="isOpenAutoComplete = false"
      :backfill="true"
    >
      <!-- <template #options="item">
        v-for="(item, index) in dataSearch" :index="index"

        <SearchCard :key="item?.id" :item="item" :type="item.media_type" />
      </template> -->

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
            <!-- <Icon
              name="fa6-solid:magnifying-glass"
              class="fa-magnifying-glass"
            /> -->

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
          </a-tooltip>
        </template>
      </a-input-search>
    </a-auto-complete>

    <div class="right-header">
      <Popover
        trigger="click"
        placement="bottom"
        overlayClassName="popover-search"
        effect="dark"
      >
        <a-button type="text" shape="circle" class="search-btn-mobile">
          <template #icon>
            <!-- <Icon
              name="fa6-solid:magnifying-glass"
              class="fa-magnifying-glass"
            /> -->

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
          </template>
        </a-button>

        <template #content>
          <h3 class="section-title search">
            <span> Tìm kiếm </span>
          </h3>
          <AutoComplete
            v-model:value="valueInput"
            class="search-popover"
            popupClassName="certain-category-search-dropdown"
            :options="dataSearch"
            style="width: 100%"
            :open="isOpenAutoComplete"
            @change="handleChangeInput(valueInput)"
            @focus="isOpenAutoComplete = true"
            @blur="isOpenAutoComplete = false"
          >
            <!-- <template #options="item">
              <SearchCard
                :key="item?.id"
                :item="item"
                :type="item.media_type"
              />
            </template> -->

            <InputSearch
              class="search-popover"
              placeholder="Nhập tên phim để tìm kiếm..."
              size="large"
              allowClear
              bordered
              :loading="loadingSearch"
              @search="handleSearch"
            >
              <template #enterButton>
                <!-- <Icon
                  name="fa6-solid:magnifying-glass"
                  class="fa-magnifying-glass"
                /> -->

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
              </template>
            </InputSearch>
          </AutoComplete>
        </template>
      </Popover>

      <Menu
        class="menu-right-header"
        theme="dark"
        mode="horizontal"
        :selectable="false"
      >
        <MenuItem class="notification" key="notification">
          <Dropdown
            v-if="isLogin"
            :trigger="['click']"
            class="dropdown-notification"
            overlayClassName="dropdown-notification header"
            placement="bottomRight"
          >
            <span v-if="isLogin" class="ant-dropdown-link">
              <Badge :count="3" :overflow-count="9">
                <!-- <Icon name="fa6-regular:bell" class="fa-bell fa-regular" />
                <Icon name="fa6-solid:bell" class="fa-bell fa-solid" /> -->

                <svg
                  class="fa-bell fa-regular"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.2rem"
                  height="2.2rem"
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
                  width="2.2rem"
                  height="2.2rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z"
                  />
                </svg>
              </Badge>
            </span>

            <template #overlay>
              <el-menu class="dropdown-notification">
                <div class="notification-header">
                  <span> Thông báo</span>
                </div>

                <MenuItemGroup class="public" key="public">
                  <template #title>
                    <p>Thông báo chung</p>
                    <p class="count-message">1</p>
                  </template>
                  <MenuItem>Chào mừng bạn đến với Phimhay247</MenuItem>
                </MenuItemGroup>

                <div class="separate" />

                <MenuItemGroup class="private" key="private">
                  <template #title>
                    <p>Thông báo cá nhân</p>
                    <p class="count-message">1</p>
                  </template>
                  <MenuItem>Message 1</MenuItem>
                  <MenuItem>Message 2</MenuItem>
                </MenuItemGroup>
              </el-menu>
            </template>
          </Dropdown>
        </MenuItem>

        <MenuItem class="account" key="account">
          <Dropdown
            :trigger="['click']"
            class="dropdown-account"
            overlayClassName="dropdown-account header"
            placement="bottomRight"
          >
            <span class="ant-dropdown-link">
              <!-- <UserOutlined />
              <CaretDownOutlined /> -->

              <svg
                class="user-outlined"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M858.5 763.6a374 374 0 0 0-80.6-119.5a375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1c-.4.2-.8.3-1.2.5c-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8c2-77.2 33-149.5 87.8-204.3c56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                />
              </svg>
            </span>

            <template #overlay>
              <Menu class="dropdown-account">
                <MenuItem
                  v-if="isLogin"
                  v-once
                  :class="{ active: isLogin }"
                  key="your-account"
                >
                  <NuxtLink to="/YourAccount">
                    <span>Tài khoản</span>
                    <br />
                    <span style="font-size: 1.2rem">
                      {{ userAccount?.email }}
                    </span>
                  </NuxtLink>
                </MenuItem>

                <MenuItem
                  v-if="isLogin && role == 'admin'"
                  v-once
                  key="dashboard"
                >
                  <NuxtLink :to="$config.app.adminWebsiteUrl" target="_blank">
                    Bảng điều khiển
                  </NuxtLink>
                </MenuItem>

                <MenuItem v-if="!isLogin" v-once key="login">
                  <NuxtLink to="/login"> Đăng nhập</NuxtLink>
                </MenuItem>

                <MenuItem
                  v-if="isLogin"
                  v-once
                  key="logout"
                  @click="handleLogout"
                >
                  <span> Đăng xuất</span>
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
        </MenuItem>
      </Menu>
    </div>
  </header>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  Badge,
  Tooltip,
  Popover,
  AutoComplete,
  InputSearch,
} from 'ant-design-vue';
import { getDaTaSearch } from '~/services/search';
import { getImage } from '~/services/image';
// import SearchCard from '~/components/SearchCard';
import { storeToRefs } from 'pinia';
import { MenuOutlined } from '@ant-design/icons-vue';
import { ElMenu } from 'element-plus';

const utils = useUtils();
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

  window.addEventListener('scroll', () => {
    var st = window.scrollY || document.documentElement.scrollTop;

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
  utils.auth.onLogOut();
};
</script>

<style lang="scss" src="./Header.scss"></style>
