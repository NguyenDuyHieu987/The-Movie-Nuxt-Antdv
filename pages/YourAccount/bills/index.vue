<template>
  <div v-if="isLogin" class="service-page bills center-page padding-content">
    This is Bills page
  </div>

  <RequireAuth v-if="!isLogin" />
</template>

<script setup lang="ts">
import RequireAuth from '~/components/RequireAuth/RequireAuth.vue';
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

useServerSeoMeta({
  title: 'Lịch sử giao dịch, Hóa đơn - Phimhay247',
  description: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogTitle: 'Lịch sử giao dịch, Hóa đơn - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogLocale: 'vi',
});

const internalInstance: any = getCurrentInstance();
</script>

<style scoped lang="scss" src="./BillsPage.scss"></style>
