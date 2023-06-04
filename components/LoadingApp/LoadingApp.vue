<template>
  <div
    v-if="
      // $route.name == 'index' &&
    //   loadingHomePage && !store.$state.loadingHomePage
    "
    class="loading-page"
  >
    <div class="loading-page-container">
      <img src="/images/logo.png" alt="" />
      <div class="logo"><h2 class="animated">Phimhay247</h2></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useStore();
</script>

<style lang="scss" scoped src="./LoadingApp.scss"></style>
