<template>
  <div class="pricing padding-content">This is Pricing page</div>
</template>

<script setup lang="ts">
useHead({
  title: 'Pricing - Nâng cấp tài khoản - Gói & Dịch vụ | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Pricing - Nâng cấp tài khoản - Gói & Dịch vụ | Phimhay247',
  description: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogTitle: 'Pricing - Nâng cấp tài khoản - Gói & Dịch vụ | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogLocale: 'vi',
});

const internalInstance: any = getCurrentInstance();

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  internalInstance.appContext.config.globalProperties.$Progress.finish();
});
</script>

<style scoped lang="scss" src="./PricingPage.scss"></style>
