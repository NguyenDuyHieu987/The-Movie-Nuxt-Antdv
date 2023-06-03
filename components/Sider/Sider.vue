<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="var(--sider-width)"
    collapsedWidth="var(--sider-collapsed-width)"
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

        <div v-show="isLogin">
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
      </div>
    </a-layout-header>

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

<script setup lang="ts">
// import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import TheMenu from '../TheMenu/TheMenu.vue';
import { useStore } from '@/store/useStore';
import { storeToRefs } from 'pinia';

const store: any = useStore();
const { collapsed, isLogin, userAccount } = storeToRefs<any>(store);
onMounted(() => {
  const menu: HTMLElement | null = document.querySelector(
    '.sider-bar .ant-layout-sider-children'
  );
  const sider_header = document.querySelector('.sider-header') as HTMLElement;
  menu!.addEventListener('scroll', (e: any) => {
    if (e.target.scrollTop > 0) {
      // if (store.$state.isLogin) {
      sider_header.style.backgroundColor = 'var(--background-content-color)';
      // }
    } else {
      sider_header.style.backgroundColor = 'transparent';
    }
  });
});
</script>

<style lang="scss" src="./Sider.scss"></style>
