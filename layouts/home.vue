<template>
  <div
    class="body-content home"
    :class="{
      expand: collapsed || openSiderBarFixed,
      fixed: openSiderBarFixed,
    }"
  >
    <HeaderHome />

    <div class="body-wrapper" id="body-wrapper">
      <SiderHome />
      <Drawer />

      <!-- <section
        v-show="isLogin && $route.path == '/follow'"
        id="topic-follow-column-teleport"
      ></section> -->

      <main class="main-content">
        <!-- <BreadCrumb /> -->
        <div class="container">
          <slot />
        </div>
        <Footer />
      </main>

      <!-- <section
        v-show="isLogin && $route.path == '/history'"
        id="topic-history-column-teleport"
      ></section> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderHome from '~/components/layouts/HeaderHome/HeaderHome.server.vue';
import Drawer from '~/components/layouts/Drawer/Drawer.server.vue';
import SiderHome from '~/components/layouts/SiderHome/SiderHome.server.vue';
import Footer from '~/components/layouts/Footer/Footer.server.vue';
// import BreadCrumb from '~/components/layouts/BreadCrumb';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed, isLogin, openSiderBarFixed } = storeToRefs(store);
</script>

<style lang="scss" src="~/assets/style/homeLayout.scss"></style>
