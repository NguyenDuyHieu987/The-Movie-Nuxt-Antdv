<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="var(--sider-width)"
    collapsedWidth="var(--sider-collapsed-width)"
    class="sider-bar"
    :class="{ 'open-fixed': openSiderBarFixed, scrolled: siderScrolled }"
    collapsible
    :defaultCollapsed="true"
    @collapse="handleCollapse"
  >
    <header class="sider-header">
      <div class="user-header" v-if="isLogin">
        <div class="avatar-box" v-if="!collapsed || openSiderBarFixed">
          <NuxtImg
            class="avatar"
            :src="
              // `/images/account_avatar/account${userAccount?.avatar}.jpg`
              !isNaN(+userAccount?.avatar)
                ? getImage(
                    `account${userAccount?.avatar}.jpg`,
                    'user_avatar',
                    'w-50'
                  )
                : userAccount?.avatar
            "
            loading="lazy"
            alt=""
            preload
          />
        </div>

        <div>
          <h4 v-if="!collapsed || openSiderBarFixed">
            {{ userAccount?.username }}
          </h4>

          <el-tooltip
            v-else
            :title="userAccount?.username"
            :content="userAccount?.username"
            popper-class="popper-tooltip"
            placement="right"
          >
            <div class="user-name-text">
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
      <footer class="sider-footer">
        <div :class="['trigger-collapse', { collapsed: collapsed }]">
          <svg
            v-if="collapsed"
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="currentColor"
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
            fill="currentColor"
          >
            <path d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z" />
            <path d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" />
          </svg>

          <span
            v-if="collapsed && openSiderBarFixed"
            class="title-trigger-collapse open"
          >
            Mở
          </span>
          <span v-else-if="!collapsed" class="title-trigger-collapse collapsed">
            Đóng
          </span>
        </div>
      </footer>
    </template>
  </a-layout-sider>
</template>

<script setup lang="ts">
// import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import { getImage } from '~/services/image';
import TheMenu from '~/components/TheMenu/TheMenu.server.vue';
import { storeToRefs } from 'pinia';
import { useBreakpoints } from '@vueuse/core';

const store = useStore();
const { collapsed, isLogin, userAccount, openSiderBarFixed } =
  storeToRefs<any>(store);
const siderScrolled = ref<boolean>(false);

const breakpoints = useBreakpoints({
  desktop: 1300,
});
const largerThanDesktop = breakpoints.greater('desktop');

// watch(largerThanDesktop, () => {
//   if (largerThanDesktop.value) {
//     store.collapsed = false;
//   } else {
//     store.collapsed = true;
//   }
// });

watch(collapsed, (oldVal, newVal) => {
  if (oldVal) {
    store.openSiderBarFixed = false;
  } else {
    if (store.openSiderBarFixed == true) {
      store.openSiderBarFixed = false;
    }
  }
});

onMounted(() => {
  // if (largerThanDesktop.value) {
  //   store.collapsed = false;
  // }

  // window.addEventListener('resize', () => {
  //   if (window.innerWidth > 1300) {
  //     store.collapsed = false;
  //   } else {
  //     store.collapsed = true;
  //   }
  // });

  const menu: HTMLElement | null = document.querySelector(
    '.sider-bar .ant-layout-sider-children'
  );
  const sider_header = document.querySelector(
    '.sider-bar .sider-header'
  ) as HTMLElement;

  menu!.addEventListener('scroll', (e: any) => {
    if (e.target.scrollTop > 0) {
      siderScrolled.value = true;
    } else {
      siderScrolled.value = false;
    }
  });

  const siderBar = document.querySelector('.sider-bar');

  siderBar?.addEventListener('mouseover', (e: any) => {
    if (store.collapsed == true && store.openSiderBarFixed == false) {
      store.openSiderBarFixed = true;
    }

    siderBar?.addEventListener('mouseleave', () => {
      if (store.collapsed == true && store.openSiderBarFixed == true) {
        store.openSiderBarFixed = false;
      }
    });
  });
});

const handleCollapse = () => {
  // if (store.collapsed == true) {
  //   store.collapsed = false;
  //   store.openSiderBarFixed = false;
  // } else {
  //   store.collapsed = true;
  //   store.openSiderBarFixed = false;
  // }
};
</script>

<style lang="scss" src="./Sider.scss"></style>
