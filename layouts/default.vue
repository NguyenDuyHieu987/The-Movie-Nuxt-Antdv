<template>
  <a-layout class="app-wrapper">
    <Header />
    <a-layout :class="[collapsed ? 'expand' : '', 'body-content']">
      <Sider />
      <Drawer />

      <a-layout
        v-show="$route.path == '/follow'"
        id="topic-follow-column-teleport"
      ></a-layout>

      <a-layout class="main-content">
        <BreadCrumb />
        <a-layout-content class="container">
          <div class="wrapper">
            <slot />
          </div>
        </a-layout-content>
        <Footer />
      </a-layout>

      <a-layout
        v-show="$route.path == '/history'"
        id="topic-history-column-teleport"
      ></a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Header from '@/components/Header/Header.vue';
import Drawer from '@/components/Drawer/Drawer.vue';
import Sider from '@/components/Sider/Sider.vue';
import Footer from '@/components/Footer/Footer.vue';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed } = storeToRefs(store);
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
  margin-left: var(--sider-width);
  min-height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
  // transition: all 0.2s;
  overflow: hidden;

  &.expand {
    margin-left: var(--sider-collapsed-width);
  }
}

.ant-layout.main-content {
  width: 100%;
  // height: 100%;
  max-width: 2160px;
  margin: 0px auto;
  overflow: hidden;
  // position: relative;
}

.ant-layout-content.container {
  // min-height: calc(100vh - 130px);
  padding: 15px 20px;
  // background-color: var(--background-content-color);
  background-color: transparent;

  & > .wrapper {
    width: 100%;
  }
}
@media (prefers-color-scheme: dark) {
  .ant-layout-content.container {
    // background-color: var(--background-content-color);
  }
}

@media only screen and (max-width: 900px) {
  .ant-layout-content.container {
    padding: 15px 15px;
  }
}

@media only screen and (max-width: 800px) {
  .body-content {
    margin-left: 0px;
  }
}
</style>
