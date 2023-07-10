<template>
  <div class="profile padding-content">
    <h2>Username: {{ store.$state.userAccount?.username }}</h2>
    <h3>Email: {{ store.$state.userAccount?.email }}</h3>
    <h3>Fullname: {{ store.$state.userAccount?.full_name }}</h3>
  </div>
</template>

<script setup lang="ts">
const store = useStore();

useHead({
  title: 'Profile - Hồ sơ | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Profile - Hồ sơ | Phimhay247',
  description: 'Hồ sơ, thông tin cá nhân',
  ogTitle: 'Profile - Hồ sơ | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hồ sơ, thông tin cá nhân',
  ogLocale: 'vi',
});
</script>

<style lang="scss" src="./ProfilePage.scss"></style>
