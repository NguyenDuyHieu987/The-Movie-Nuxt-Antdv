<template>
  <div class="pricing padding-content">
    <div class="pricing-container">
      <PlanGrid />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlanGrid from '~/components/PlanGrid/PlanGrid.vue';

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
