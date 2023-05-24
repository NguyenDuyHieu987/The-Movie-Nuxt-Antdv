<template>
  <div>This is Billing page</div>
</template>

<script setup lang="ts">
useHead({
  title: 'Billing - Hóa đơn - Thanh toán | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Billing - Hóa đơn - Thanh toán | Phimhay247',
  description: 'Hóa đơn của bạn. Thanh toán gói cước',
  ogTitle: 'Billing - Hóa đơn - Thanh toán | Phimhay247',
  ogType: 'video.movie',
  ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Thanh toán gói cước',
  ogLocale: 'vi',
});

const internalInstance: any = getCurrentInstance();
onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
});

onMounted(() => {
  internalInstance.appContext.config.globalProperties.$Progress.finish();
});
</script>

<style scoped lang="scss" src="./Billing.scss"></style>
