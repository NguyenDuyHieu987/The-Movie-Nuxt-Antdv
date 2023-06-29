<template>
  <a-drawer
    class="menu-drawer"
    v-model:visible="openDrawer"
    placement="left"
    :closable="false"
  >
    <template #title>
      <div class="user-header">
        <div class="user-image-container" v-if="!collapsed && isLogin">
          <nuxt-img
            class="avatar"
            :src="
              !isNaN(+userAccount?.avatar)
                ? `/images/account_avatar/account${userAccount?.avatar}.jpg`
                : userAccount?.avatar
            "
            alt=""
          />
        </div>

        <h4>
          {{ userAccount?.username }}
        </h4>
      </div>
    </template>
    <TheMenu />
  </a-drawer>

  <!-- <el-drawer
    class="menu-drawer"
    v-model="openDrawer"
    direction="ltr"
    placement="left"
    :show-close="false"
  >
    <template #header>
      <div class="user-header">
        <div class="user-image-container" v-if="!collapsed && isLogin">
          <nuxt-img
            class="avatar"
            :src="
              !isNaN(+userAccount?.avatar)
                ? `/images/account_avatar/account${userAccount?.avatar}.jpg`
                : userAccount?.avatar
            "
            alt=""
          />
        </div>

        <h4>
          {{ userAccount?.username }}
        </h4>
      </div>
    </template>
    <TheMenu />
  </el-drawer> -->
</template>

<script setup lang="ts">
// import { MenufoldOutlined } from '@ant-design/icons-vue';
import TheMenu from '@/components/TheMenu/TheMenu.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed, isLogin, openDrawer, userAccount } = storeToRefs<any>(store);
</script>

<style lang="scss" src="./Drawer.scss"></style>
