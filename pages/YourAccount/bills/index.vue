<template>
  <div v-if="isLogin" class="service-page bills padding-content">
    <div class="center-page">This is Bills page</div>
  </div>

  <RequireAuth v-if="!isLogin" />
</template>

<script setup lang="ts">
import RequireAuth from '~/components/RequireAuth/RequireAuth.server.vue';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'service',
});

const store = useStore();
const { isLogin } = storeToRefs<any>(store);

useHead({
  title: 'Lịch sử giao dịch, Hóa đơn - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Lịch sử giao dịch, Hóa đơn - Phimhay247',
  description: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogTitle: 'Lịch sử giao dịch, Hóa đơn - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogLocale: 'vi',
});
</script>

<style scoped lang="scss" src="./BillsPage.scss"></style>
