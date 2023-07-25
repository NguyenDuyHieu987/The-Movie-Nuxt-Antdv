<template>
  <div class="pricing padding-content">
    <div class="pricing-container">
      <div class="pricing-header">
        <h2>Chọn gói dịch vụ phù hợp với bạn</h2>

        <ul>
          <li class="checkmark-group-row">
            <span>Chọn gói dịch vụ phù hợp với bạn</span>
          </li>

          <li class="checkmark-group-row">
            <span>Truy cập thêm nhiều chương trình truyền hình và phim.</span>
          </li>

          <li class="checkmark-group-row">
            <span>Lựa chọn xem trên nhiều thiết bị hơn.</span>
          </li>

          <li class="checkmark-group-row">
            <span>Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.</span>
          </li>
        </ul>
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

  navigateTo(`/payment?plan-order=${selectedPlan.value!.order}`);
};
</script>

<style scoped lang="scss" src="./PricingPage.scss"></style>
