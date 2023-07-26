<template>
  <div v-if="isLogin" class="billing padding-content">This is Billing page</div>
  <RequireAuth v-else />
</template>

<script setup lang="ts">
import RequireAuth from '@/components/RequireAuth/RequireAuth.vue';
import { storeToRefs } from 'pinia';

const store: any = useStore();
const { isLogin } = storeToRefs<any>(store);

useHead({
  title: 'Lịch sử giao dịch - Hóa đơn - Thanh toán | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Lịch sử giao dịch - Hóa đơn - Thanh toán | Phimhay247',
  description: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogTitle: 'Lịch sử giao dịch - Hóa đơn - Thanh toán | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogLocale: 'vi',
});

const internalInstance: any = getCurrentInstance();
onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  internalInstance.appContext.config.globalProperties.$Progress.finish();
});
</script>

<style scoped lang="scss" src="./BillingPage.scss"></style>
