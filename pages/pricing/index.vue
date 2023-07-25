<template>
  <div class="pricing padding-content">
    <div class="pricing-container">
      <div>
        <p>Chọn gói dịch vụ phù hợp với bạn</p>
        <p>Truy cập thêm nhiều chương trình truyền hình và phim.</p>
        <p>Lựa chọn xem trên nhiều thiết bị hơn.</p>
        <p>Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.</p>
      </div>
      <PlanGrid @onSelectPlan="handleOnSelectPlan" />

      <div class="submit-btn-container">
        <a-button @click="onRouteToPaymentPage" type="text" class="submit-btn">
          Tiếp theo
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlanGrid from '~/components/PlanGrid/PlanGrid.vue';
import type { plan } from '@/types';

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

const store = useStore();
const selectedPlan = ref<plan>();
const internalInstance: any = getCurrentInstance();

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  internalInstance.appContext.config.globalProperties.$Progress.finish();
});

const handleOnSelectPlan = (plan: plan) => {
  selectedPlan.value = plan;
};

const onRouteToPaymentPage = () => {
  if (!store?.isLogin) {
    store.openRequireAuthDialog = true;
    return;
  }

  navigateTo(`/payment?plan=${selectedPlan.value!.id}`);
};
</script>

<style scoped lang="scss" src="./PricingPage.scss"></style>
