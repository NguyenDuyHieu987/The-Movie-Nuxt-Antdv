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
import Header from '@/components/layouts/Header/Header.vue';
import Drawer from '@/components/layouts/Drawer/Drawer.vue';
import Sider from '@/components/layouts/Sider/Sider.vue';
import Footer from '@/components/layouts/Footer/Footer.vue';
// import BreadCrumb from '@/components/layouts/BreadCrumb/BreadCrumb.vue';
import { storeToRefs } from 'pinia';
import RequireAuthDialog from '@/components/RequireAuthDialog/RequireAuthDialog.vue';

const store = useStore();
const { collapsed, isLogin } = storeToRefs(store);
</script>

<style lang="scss" scoped src="../assets/style/defaultLayout.scss"></style>
