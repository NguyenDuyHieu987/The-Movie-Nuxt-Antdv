<template>
  <div>This is Pricing page</div>
</template>

<script setup lang="ts">
useHead({
  title: 'Pricing - Dịch vụ | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Pricing - Dịch vụ | Phimhay247',
  description: 'Dịch vụ, ưu đãi, đặc quyền, đăng ký gói',
  ogTitle: 'Pricing - Dịch vụ | Phimhay247',
  ogType: 'video.movie',
  ogUrl: window.location.href,
  ogDescription: 'Dịch vụ, ưu đãi, đặc quyền, đăng ký gói',
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

<style scoped lang="scss" src="./PricingPage.scss"></style>
