<template>
  <div class="service-page payment padding-content">
    <div v-if="store.isLogin" class="payment-container">
      <div class="payment-header">
        <p class="step">BƯỚC 2/2</p>

        <h1>Chọn phương thức thanh toán</h1>

        <p>
          Tư cách thành viên trả phí của bạn sẽ bắt đầu ngay khi bạn thiết lập
          thanh toán.
        </p>

        <div class="encouragement">
          <p>An toàn để an tâm.</p>
          <p>Hủy trực tuyến dễ dàng.</p>
        </div>
      </div>

      <section class="payment-methods">
        <div class="payment-method momo" @click="handleClickMoMoMethod">
          <div class="left">
            <nuxt-img
              :src="getImage('momo.jpg', 'payment', 'w-40')"
              loading="lazy"
              :width="40"
            />
            <span>Ví MoMo</span>
          </div>

          <div class="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.4rem"
              height="2.4rem"
              viewBox="0 0 24 24"
            >
              <path
                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10l-10 10Z"
              />
            </svg>
          </div>
        </div>

        <div class="payment-method zalopay" @click="handleClickZaloPayMethod">
          <div class="left">
            <nuxt-img
              :src="getImage('zalopay.png', 'payment', 'w-40')"
              loading="lazy"
              :width="40"
            />

            <span>Ví điện tử ZaloPay</span>
          </div>

          <div class="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.4rem"
              height="2.4rem"
              viewBox="0 0 24 24"
            >
              <path
                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10l-10 10Z"
              />
            </svg>
          </div>
        </div>

        <div class="payment-method atm" @click="handleClickVNPayMethod">
          <div class="left">
            <nuxt-img
              :src="getImage('vnpay.png', 'payment', 'w-40')"
              loading="lazy"
              :width="40"
            />
            <span>ATM - Ngân hàng nội địa</span>
          </div>

          <div class="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.4rem"
              height="2.4rem"
              viewBox="0 0 24 24"
            >
              <path
                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10l-10 10Z"
              />
            </svg>
          </div>
        </div>

        <div
          class="payment-method visa-mastercard"
          @click="handleClickStripeMethod"
        >
          <div class="left">
            <nuxt-img
              :src="getImage('mastercard_1.jpg', 'payment', 'w-100')"
              loading="lazy"
              :width="100"
            />

            <nuxt-img
              :src="getImage('visa.png', 'payment', 'w-40')"
              loading="lazy"
              :width="40"
            />

            <span>Thẻ ghi nợ - Thẻ tín dụng</span>
          </div>

          <div class="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.4rem"
              height="2.4rem"
              viewBox="0 0 24 24"
            >
              <path
                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10l-10 10Z"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>

    <RequireAuth v-if="!store.isLogin" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getImage } from '~/services/image';
import { getAllPlan, registerPlan } from '~/services/plans';
import RequireAuth from '~/components/RequireAuth/RequireAuth.server.vue';
import type { plan } from '@/types';

definePageMeta({
  layout: 'service',
  middleware: [
    async (to, from) => {
      if (!to.query.planorder) return navigateTo('/upgrade/plans');

      // getAllPlan()
      //   .then((response) => {
      //     if (
      //       !response?.results.some(
      //         (item: plan) => item.order == Number(to.query.planorder)
      //       )
      //     )
      //       return navigateTo('/upgrade/plans');
      //   })
      //   .catch((e) => {
      //     navigateTo('/upgrade/plans');
      //     if (axios.isCancel(e)) return;
      //   });

      const { data: plans } = await useAsyncData(
        `plan/all`,
        () => getAllPlan(),
        {
          transform: (data) => {
            return data?.results;
          },
        }
      );

      if (
        !plans.value.some(
          (item: plan) => item.order == Number(to.query.planorder)
        )
      )
        return navigateTo('/upgrade/plans');
    },
  ],
  pageTransition: {
    name: 'slide-left',
  },
});

const store = useStore();
const route = useRoute();
const planSelected = ref<plan>();

watch(
  route.query,
  async () => {
    if (!route.query.planorder) return navigateTo('/upgrade/plans');

    // getAllPlan()
    //   .then((response) => {
    //     if (
    //       !response?.results.some(
    //         (item: plan) => item.order == Number(route.query.planorder)
    //       )
    //     )
    //       return navigateTo('/upgrade/plans');

    //     planSelected.value = response?.results.find(
    //       (item: plan) => item.order == Number(route.query.planorder)
    //     );
    //   })
    //   .catch((e) => {
    //     navigateTo('/upgrade/plans');
    //     if (axios.isCancel(e)) return;
    //   });

    const { data: plans } = await useAsyncData(`plan/all`, () => getAllPlan(), {
      transform: (data) => {
        return data?.results;
      },
    });

    if (
      !plans.value.some(
        (item: plan) => item.order == Number(route.query.planorder)
      )
    )
      return navigateTo('/upgrade/plans');

    planSelected.value = plans.value.find(
      (item: plan) => item.order == Number(route.query.planorder)
    );
  },
  { immediate: true, deep: true }
);

useHead({
  title: 'Phương thức thanh toán - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Phương thức thanh toán - Phimhay247',
  description: 'Thanh toán gói dịch vụ',
  ogTitle: 'Phương thức thanh toán - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Thanh toán gói dịch vụ',
  ogLocale: 'vi',
});

const handleClickMoMoMethod = () => {};

const handleClickZaloPayMethod = () => {};

const handleClickVNPayMethod = () => {
  store.loadingAppInstance.start();

  registerPlan(planSelected.value!.id, 'VNPAY')
    .then((response) => {
      window.open(response?.url);
      // window.location = response?.url;
    })
    .catch(() => {})
    .finally(() => {
      store.loadingAppInstance.finish();
    });
};

const handleClickStripeMethod = () => {
  store.loadingAppInstance.start();

  registerPlan(planSelected.value!.id, 'STRIPE')
    .then((response) => {
      window.open(response?.url);
      // window.location = response?.url;
    })
    .catch(() => {})
    .finally(() => {
      store.loadingAppInstance.finish();
    });
};
</script>

<style lang="scss" src="./PaymentPage.scss"></style>
