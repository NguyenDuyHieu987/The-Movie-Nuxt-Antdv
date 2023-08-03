<template>
  <div class="payment padding-content">
    <div v-if="store.isLogin" class="payment-container">
      <div class="payment-header">
        <h2>Chọn phương thức thanh toán</h2>
        <p>
          Tư cách thành viên trả phí của bạn sẽ bắt đầu ngay khi bạn thiết lập
          thanh toán.
        </p>

        <div>
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

        <div class="payment-method atm">
          <div class="left">
            <nuxt-img
              :src="getImage('vnpay.png', 'payment', 'w-40')"
              loading="lazy"
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

        <div class="payment-method visa-mastercard">
          <div class="left">
            <nuxt-img
              :src="getImage('mastercard_1.jpg', 'payment', 'w-100')"
              loading="lazy"
            />
            <nuxt-img
              :src="getImage('visa.png', 'payment', 'w-40')"
              loading="lazy"
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
import { getAllPlan } from '~/services/plans';
import RequireAuth from '~/components/RequireAuth/index.vue';
import type { plan } from '@/types';

definePageMeta({
  middleware: [
    (to, from) => {
      if (!to.query.planorder) return navigateTo('/upgrade/plans');

      getAllPlan()
        .then((response: any) => {
          if (
            !response.results?.some(
              (item: plan) => item.order == Number(to.query.planorder)
            )
          )
            navigateTo('/upgrade/plans');
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    },
  ],
  pageTransition: {
    name: 'slide-left',
  },
});

const store = useStore();
const route = useRoute();
const internalInstance: any = getCurrentInstance();

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  internalInstance.appContext.config.globalProperties.$Progress.finish();
});

const handleClickMoMoMethod = () => {};

const handleClickZaloPayMethod = () => {
  // axios
  //   .post('https://sb-openapi.zalopay.vn/v2/create', {
  //     amount: 50000,
  //     app_id: 2554,
  //     app_time: Date.now(),
  //     app_trans_id: 230726_07261000392,
  //     app_user: 'demo',
  //     bank_code: '',
  //     description: 'Thanh toán đơn hàng',
  //     embed_data: { promotioninfo: '', merchantinfo: 'embeddata123' },
  //     item: [
  //       {
  //         itemid: 'knb',
  //         itemname: 'kim nguyen bao',
  //         itemprice: 198400,
  //         itemquantity: 1,
  //       },
  //     ],
  //     key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
  //   })
  //   .then((response: any) => {
  //     console.log(response);
  //   });
};
</script>

<style lang="scss" src="./PaymentPage.scss"></style>
