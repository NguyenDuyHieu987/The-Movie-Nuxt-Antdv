<template>
  <header class="header-bar-center-page">
    <div class="header-bar-center-page-container">
      <div class="left-header">
        <div class="logo">
          <NuxtLink :to="{ path: '/' }">
            <nuxt-img
              :src="getImage('logo.png', 'logo')"
              alt=""
              :height="30"
              :width="30"
              preload
            />
            <span> PhimHay247 </span>
          </NuxtLink>
        </div>

        <NuxtLink
          v-if="$route.path == '/contact'"
          class="helpcenter-logo"
          to="/help"
        >
          Trung tâm trợ giúp
        </NuxtLink>
      </div>

      <div class="right-header">
        <el-skeleton :loading="loadingUser" animated>
          <template #template>
            <el-skeleton-item
              class="menu-item skeleton"
              variant="button"
              v-for="(item, index) in 2"
              :index="index"
              :key="index"
            />
          </template>

          <template #default>
            <ul class="menu-header">
              <li
                v-if="isLogin"
                class="menu-item notification"
                :show-timeout="0"
                :hide-timeout="0"
              >
                <Notification />
              </li>

              <li class="menu-item account" v-if="isLogin">
                <DropdownAccount />
              </li>

              <li v-else class="menu-item login-header">
                <NuxtLink to="/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.3rem"
                    height="2.3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38a9.947 9.947 0 0 0-12.28 0A7.957 7.957 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
                    />
                  </svg>
                  <span> Đăng Nhập</span>
                </NuxtLink>
              </li>
            </ul>
          </template>
        </el-skeleton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
import DropdownAccount from '~/components/layouts/Header/DropdownAcount/DropdownAcount.vue';
import Notification from '~/components/layouts/Header/Notification/Notification.vue';
import { MenuOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import _ from 'lodash';

const store = useStore();
const utils = useUtils();
const { isLogin, loadingUser } = storeToRefs<any>(store);

onMounted(() => {});

const handleLogout = () => {
  if (isLogin) {
    store.logOut();
  }
};
</script>

<style lang="scss" src="./HeaderCenterPage.scss"></style>
