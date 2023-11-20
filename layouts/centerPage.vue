<template>
  <div class="body-content-center-page">
    <HeaderCenterPage />

    <div class="body-wrapper" id="body-wrapper">
      <Drawer />

      <main class="main-content">
        <!-- <BreadCrumb /> -->
        <div class="container">
          <slot />
        </div>

        <Footer />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCenterPage from '~/components/layouts/HeaderCenterPage/HeaderCenterPage.server.vue';
import Drawer from '~/components/layouts/Drawer/Drawer.server.vue';
import Footer from '~/components/layouts/Footer/Footer.server.vue';
</script>

<style lang="scss" src="~/assets/style/centerPageLayout.scss"></style>
