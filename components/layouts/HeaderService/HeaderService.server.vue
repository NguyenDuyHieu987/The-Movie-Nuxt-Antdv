<template>
  <header class="header-bar-service">
    <div class="left-header">
      <button class="menu-btn" @click="store.setOpendrawer()">
        <MenuOutlined />
      </button>

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

            <li class="menu-item account">
              <DropdownAccount />
            </li>
          </ul>
        </template>
      </el-skeleton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
import DropdownAccount from '~/components/layouts/Header/DropdownAcount/DropdownAcount.server.vue';
import Notification from '~/components/layouts/Header/Notification/Notification.server.vue';
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

<style lang="scss" src="./HeaderService.scss"></style>
