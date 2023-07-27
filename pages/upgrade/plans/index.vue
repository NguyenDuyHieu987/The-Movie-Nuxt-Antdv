<template>
  <div class="upgrade padding-content">
    <div class="upgrade-container">
      <Transition appear name="slide-bottom">
        <div v-show="showAnimation" class="upgrade-header">
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
      </Transition>

      <PlanGrid @onSelectPlan="handleOnSelectPlan" />

      <div class="submit-btn-container">
        <a-button
          v-show="selectedPlan?.id"
          @click="onRouteToPaymentPage"
          type="text"
          class="submit-btn"
        >
          Tiếp theo
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlanGrid from '~/components/PlanGrid/PlanGrid.vue';
import type { plan } from '@/types';

definePageMeta({
  // layout: 'service',
  // pageTransition: {
  //   name: 'slide-left',
  // },
});

useHead({
  title: 'Nâng cấp tài khoản - Gói & Dịch vụ | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Nâng cấp tài khoản - Gói & Dịch vụ | Phimhay247',
  description: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogTitle: 'Nâng cấp tài khoản - Gói & Dịch vụ | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogLocale: 'vi',
});

const store = useStore();
const selectedPlan = ref<plan>();
const internalInstance: any = getCurrentInstance();
const showAnimation = ref<boolean>(false);

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  setTimeout(() => {
    showAnimation.value = true;
  });
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

  navigateTo(`/upgrade/payment?planorder=${selectedPlan.value!?.order || 3}`);
};
</script>

<style lang="scss" src="./UpgradePage.scss"></style>
