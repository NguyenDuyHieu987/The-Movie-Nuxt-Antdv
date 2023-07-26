<template>
  <div class="your-account padding-content">
    <div class="your-account-container">
      <div class="your-account-header">
        <h2>Tài khoản</h2>
        <div class="join-since">
          <span>{{ 'Tham gia từ ' + userAccount?.created_at }}</span>
        </div>
      </div>
      <h2>Username: {{ userAccount?.username }}</h2>
      <h3>Email: {{ userAccount?.email }}</h3>
      <h3>Fullname: {{ userAccount?.full_name }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const store = useStore();
const { userAccount } = storeToRefs(store);

useHead({
  title: 'Profile - Hồ sơ | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Profile - Hồ sơ | Phimhay247',
  description: 'Hồ sơ, thông tin cá nhân',
  ogTitle: 'Profile - Hồ sơ | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hồ sơ, thông tin cá nhân',
  ogLocale: 'vi',
});
</script>

<style lang="scss" src="./AccountPage.scss"></style>
