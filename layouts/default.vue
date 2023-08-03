<template>
  <div :class="[collapsed ? 'expand' : '', 'body-content']">
    <Header />

    <div class="body-wrapper" id="body-wrapper">
      <Sider />
      <Drawer />

      <section
        v-show="isLogin && $route.path == '/follow'"
        id="topic-follow-column-teleport"
      ></section>

      <main class="main-content">
        <!-- <BreadCrumb /> -->
        <div class="container">
          <slot />
        </div>
        <Footer />
      </main>

      <section
        v-show="isLogin && $route.path == '/history'"
        id="topic-history-column-teleport"
      ></section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layouts/Header';
import Drawer from '~/components/layouts/Drawer';
import Sider from '~/components/layouts/Sider';
import Footer from '~/components/layouts/Footer';
// import BreadCrumb from '~/components/layouts/BreadCrumb';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed, isLogin } = storeToRefs(store);
</script>

<style lang="scss" src="~/assets/style/defaultLayout.scss"></style>
