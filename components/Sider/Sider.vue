<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="var(--sider-width)"
    collapsedWidth="var(--sider-collapsed-width)"
    style=""
    class="sider-bar"
  >
    <a-layout-header class="sider-header">
      <div style="display: flex; justify-content: center; align-items: center">
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

        <div v-if="isLogin">
          <h4 style="color: #fff" v-if="!collapsed">
            {{ userAccount?.username }}
          </h4>

          <a-tooltip v-else :title="userAccount?.username" placement="rightTop">
            <a-avatar class="user-name-container">
              <h4 style="color: #fff">
                {{ userAccount?.username?.slice(0, 2).toUpperCase() }}
              </h4>
            </a-avatar>
          </a-tooltip>
        </div>

        <!-- </a-skeleton> -->
      </div>
    </a-layout-header>

    <!-- <a-list>
      <template #header>
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <h3 style="color: #fff" v-if="!collapsed">DuyHieu</h3>
          <div v-else class="user-name-container">
            <h4 style="color: #fff">
              {{ 'DuyHieu'.slice(0, 2).toUpperCase() }}
            </h4>
          </div>
        </div>
      </template>
    <TheMenu />
    </a-list> -->

    <TheMenu />
    <a-layout-footer @click="store.setCollapsed()">
      <div :class="['trigger-collapse', { active: collapsed }]">
        <!-- <DoubleLeftOutlined
          style="transition: all 0.3s"
          v-if="!collapsed"
        />
        <DoubleRightOutlined v-else /> -->
        <i
          style="transition: all 0.3s"
          v-if="!collapsed"
          class="fa-solid fa-chevrons-left"
        ></i>

        <i v-else class="fa-solid fa-chevrons-right"></i>

        <span class="title-trigger-collapse">Đóng</span>
      </div>
    </a-layout-footer>
  </a-layout-sider>
</template>

<script setup>
// import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import TheMenu from '../TheMenu/TheMenu.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed, isLogin, userAccount } = storeToRefs(store);
</script>

<style lang="scss" src="./Sider.scss"></style>
