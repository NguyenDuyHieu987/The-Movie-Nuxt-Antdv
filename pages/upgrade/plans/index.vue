<template>
  <div class="service-page upgrade padding-content">
    <div class="upgrade-container center-page">
      <!-- <Transition appear name="slide-bottom"> -->
      <!-- v-show="showAnimation" -->
      <div class="upgrade-header">
        <p class="step">BƯỚC 1/2</p>

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
      <!-- </Transition> -->

      <Transition appear name="slide-left">
        <div v-show="showAnimation">
          <PlanGrid @onSelectPlan="handleOnSelectPlan" />
        </div>
      </Transition>

      <div v-show="showAnimation" class="submit-btn-container">
        <a-button @click="onRouteToPaymentPage" type="text" class="submit-btn">
          Tiếp theo
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlanGrid from '~/components/PlanGrid/PlanGrid.vue';
import type { plan } from '~/types';

definePageMeta({
  // layout: 'service',
  // pageTransition: {
  //   name: 'slide-left',
  // },
});

const store = useStore();
const selectedPlan = ref<plan>();
const showAnimation = ref<boolean>(false);

useHead({
  title: 'Nâng cấp tài khoản',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Nâng cấp tài khoản',
  description: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogTitle: 'Nâng cấp tài khoản',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Nâng cấp tài khoản, Dịch vụ, đăng ký gói',
  ogLocale: 'vi',
});

onBeforeMount(() => {
  setTimeout(() => {
    showAnimation.value = true;
  });
});

const handleOnSelectPlan = (plan: plan) => {
  selectedPlan.value = plan;
};

const onRouteToPaymentPage = () => {
  if (!store?.isLogin) {
    store.openRequireAuthDialog = true;
    return;
  }

  navigateTo(
    `/upgrade/PaymentPicker?planorder=${selectedPlan.value!?.order || 3}`
  );
};
</script>

<style lang="scss" src="./UpgradePage.scss"></style>
