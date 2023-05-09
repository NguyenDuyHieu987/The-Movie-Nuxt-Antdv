<template>
  <!-- <a-drawer
    placement="left"
    :visible="openDrawer"
    @close="onClose"
    :width="250"
    :closable="true"
  >
    <template #extra>
      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <h1>Phimhay247</h1>
        </NuxtLink>
      </div>
    </template>
    <TheMenu />
  </a-drawer> -->

  <el-drawer
    v-if="openDrawer"
    v-model="openDrawer"
    direction="ltr"
    placement="left"
    :show-close="false"
  >
    <template #header>
      <div class="logo">
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <div class="user-image-container" v-if="!collapsed && isLogin">
            <img
              class="avatar"
              :src="
                !isNaN(+userAccount?.avatar)
                  ? `/images/account_avatar/account${userAccount?.avatar}.jpg`
                  : userAccount?.avatar
              "
            />
          </div>

          <h4 style="color: #fff">
            {{ userAccount?.username }}
          </h4>
        </div>
      </div>
    </template>
    <TheMenu />
  </el-drawer>
</template>

<script setup>
// import { MenufoldOutlined } from '@ant-design/icons-vue';
import TheMenu from '../TheMenu/TheMenu.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const visible = ref(false);
const { collapsed, isLogin, openDrawer, userAccount } = storeToRefs(store);
</script>

<style lang="scss" src="./Drawer.scss"></style>
