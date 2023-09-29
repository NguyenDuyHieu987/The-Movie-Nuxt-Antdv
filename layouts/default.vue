<template>
  <div
    class="body-content"
    :class="[
      collapsed || openSiderBarFixed ? 'expand' : '',
      openSiderBarFixed ? 'fixed' : '',
    ]"
  >
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
import Header from '~/components/layouts/Header/Header.vue';
import Drawer from '~/components/layouts/Drawer/Drawer.vue';
import Sider from '~/components/layouts/Sider/Sider.vue';
import Footer from '~/components/layouts/Footer/Footer.vue';
// import BreadCrumb from '~/components/layouts/BreadCrumb';
import { storeToRefs } from 'pinia';

const store = useStore();
const { collapsed, isLogin, openSiderBarFixed } = storeToRefs(store);
</script>

<style lang="scss" src="~/assets/style/defaultLayout.scss"></style>
