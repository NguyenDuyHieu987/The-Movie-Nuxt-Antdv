<template>
  <div class="upgrade center-page padding-content">
    <div class="upgrade-container">
      <Transition
        appear
        name="slide-bottom"
        @beforeEnter="beforeEnter"
        @enter="enter"
        @beforeLeave="beforeLeave"
        @leave="leave"
      >
        <div class="upgrade-header">
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
import gsap from 'gsap';

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

const beforeEnter = (el: any) => {
  el.style.transform = 'translateX(50px)';
  el.style.opacity = '0';
};

const enter = (el: any, done: () => void) => {
  gsap.to(el, {
    x: 0,
    opacity: 1,
    duration: 0.3,
    onComplete: done,
  });
};

const beforeLeave = (el: any) => {
  el.style.transform = 'translateX(0)';
  el.style.opacity = '1';
};

const leave = (el: any, done: () => void) => {
  gsap.to(el, {
    x: -50,
    opacity: 0,
    duration: 0.3,
    onComplete: done,
  });
};
</script>

<style lang="scss" src="./UpgradePage.scss"></style>
