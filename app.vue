<template>
  <div id="app">
    <ClientOnly>
      <vue-progress-bar
        style="
          background: linear-gradient(
            90deg,
            var(--loading-progress-bar1),
            var(--loading-progress-bar2),
            var(--loading-progress-bar3)
          );
        "
      />
    </ClientOnly>

    <SeoKit />
    <OgImageScreenshot />
    <OgImageStatic />

    <div class="app-wrapper">
      <LoadingApp />

      <RequireAuthDialog />

      <NuxtLayout>
        <NuxtPage />

        <el-backtop
          class="app-back-top click-active"
          :visibilityHeight="600"
          @click="onBackTop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 24 24"
          >
            <path
              d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"
            />
          </svg>
        </el-backtop>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingApp from '~/components/LoadingApp/LoadingApp.vue';
import RequireAuthDialog from '~/components/RequireAuthDialog/RequireAuthDialog.vue';

const onBackTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
};
</script>

<style lang="scss" src="~/assets/style/app.scss"></style>
