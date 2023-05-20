<template>
  <div>
    <RequireAuthDialog />

    <a-layout class="app-wrapper">
      <Header />
      <a-layout :class="[collapsed ? 'expand' : '', 'body-content']">
        <Sider />
        <Drawer />

        <a-layout
          v-show="isLogin && $route.path == '/follow'"
          id="topic-follow-column-teleport"
        ></a-layout>

        <a-layout class="main-content">
          <!-- <BreadCrumb /> -->
          <a-layout-content class="container">
            <div class="wrapper">
              <slot />
            </div>
          </a-layout-content>
          <Footer />
        </a-layout>

        <a-layout
          v-show="isLogin && $route.path == '/history'"
          id="topic-history-column-teleport"
        ></a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import Drawer from '@/components/Drawer/Drawer.vue';
import Sider from '@/components/Sider/Sider.vue';
import Footer from '@/components/Footer/Footer.vue';
// import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import { storeToRefs } from 'pinia';
import RequireAuthDialog from '@/components/RequireAuthDialog/RequireAuthDialog.vue';

const store = useStore();
const { collapsed, isLogin } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 2160px) {
  .ant-layout.main-content {
  }
}

.ant-layout {
  background-color: var(--background-content-color);
  // background-color: transparent;
}

.body-content {
  position: relative;
  min-height: calc(100vh - var(--header-height));
  margin-left: var(--sider-width);
  margin-top: var(--header-height);
  // transition: all 0.2s;
  // overflow: hidden;

  &.expand {
    margin-left: var(--sider-collapsed-width);
  }
}

.ant-layout.main-content {
  // position: relative;
  max-width: var(--max-app-width);
  // width: 100%;
  margin: 0px auto;
  overflow: hidden;
}

.ant-layout-content.container {
  padding: 15px 20px;
  background-color: transparent;

  & > .wrapper {
    width: 100%;
    height: 100%;
    padding-bottom: 70px;
  }
}

@media (prefers-color-scheme: dark) {
  .ant-layout-content.container {
    // background-color: var(--background-content-color);
  }
}

@media only screen and (max-width: 900px) {
  .body-content {
    margin-left: 0px !important;
  }
  .ant-layout-content.container {
    padding: 15px 15px;

    & > .wrapper {
      padding-bottom: 30px;
    }
  }
}
</style>
