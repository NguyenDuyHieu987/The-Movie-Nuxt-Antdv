<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="var(--sider-width)"
    collapsedWidth="var(--sider-collapsed-width)"
    class="sider-bar"
    collapsible
  >
    <header class="sider-header">
      <div class="user-header">
        <div
          class="user-image-container"
          v-if="!collapsed && isLogin && userAccount?.avatar"
        >
          <nuxt-img
            class="avatar"
            :src="
              !isNaN(+userAccount?.avatar) // ? `/images/account_avatar/account${userAccount?.avatar}.jpg`
                ? getImage(`account${userAccount?.avatar}.jpg`, 'user_avatar')
                : userAccount?.avatar
            "
            loading="lazy"
            alt=""
          />
        </div>

        <div v-if="isLogin">
          <h4 v-if="!collapsed">
            {{ userAccount?.username }}
          </h4>

          <el-tooltip
            v-else
            :title="userAccount?.username"
            :content="userAccount?.username"
            popper-class="popper-tooltip"
            placement="right"
          >
            <div class="user-name-container">
              <h4>
                {{ userAccount?.username?.slice(0, 2).toUpperCase() }}
              </h4>
            </div>
          </el-tooltip>
        </div>
      </div>
    </header>

    <TheMenu />

    <template #trigger>
      <!-- @click="store.setCollapsed()" -->
      <footer class="sider-footer">
        <div :class="['trigger-collapse', { active: collapsed }]">
          <!-- <DoubleLeftOutlined
                style="transition: all 0.3s"
                v-if="!collapsed"
              />
              <DoubleRightOutlined v-else /> -->

          <!-- <Icon v-if="!collapsed" name="ic:baseline-keyboard-double-arrow-left" />
            <Icon v-else name="ic:baseline-keyboard-double-arrow-right" /> -->

          <svg
            v-if="collapsed"
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <path d="M6.41 6L5 7.41L9.58 12L5 16.59L6.41 18l6-6z" />
            <path d="m13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z" />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <path d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z" />
            <path d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" />
          </svg>

          <span class="title-trigger-collapse">Đóng</span>
        </div>
      </footer>
    </template>
  </a-layout-sider>
</template>

<script setup lang="ts">
// import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import { getImage } from '~/services/image';
import TheMenu from '~/components/TheMenu/TheMenu.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed, isLogin, userAccount } = storeToRefs<any>(store);

onMounted(() => {
  const menu: HTMLElement | null = document.querySelector(
    '.sider-bar .ant-layout-sider-children'
  );
  const sider_header = document.querySelector('.sider-header') as HTMLElement;

  menu!.addEventListener('scroll', (e: any) => {
    if (e.target.scrollTop > 0) {
      // if (store.isLogin) {
      sider_header.style.backgroundColor = 'var(--background-content-color)';
      // }
    } else {
      sider_header.style.backgroundColor = 'transparent';
    }
  });
});
</script>

<style lang="scss" src="./Sider.scss"></style>
