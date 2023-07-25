<template>
  <div class="payment padding-content">
    <div v-show="store.isLogin" class="payment-container">
      <div class="payment-header">
        <h2>Chọn cách thanh toán</h2>
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
        <div class="payment-method momo">
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
              width="3.5rem"
              height="3.5rem"
              viewBox="0 0 24 24"
            >
              <path d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </div>
        </div>

        <div class="payment-method zalopay">
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
              width="3.5rem"
              height="3.5rem"
              viewBox="0 0 24 24"
            >
              <path d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </div>
        </div>

        <div class="payment-method atm">
          <div class="left">
            <nuxt-img
              :src="getImage('vnpay.png', 'payment', 'w-40')"
              loading="lazy"
            />
            <span>Thẻ ATM</span>
          </div>

          <div class="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3.5rem"
              height="3.5rem"
              viewBox="0 0 24 24"
            >
              <path d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
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
              width="3.5rem"
              height="3.5rem"
              viewBox="0 0 24 24"
            >
              <path d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </div>
        </div>
      </section>
    </div>
    <RequireAuth v-if="!store.isLogin" />
  </div>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
import RequireAuth from '@/components/RequireAuth/RequireAuth.vue';

const store = useStore();
</script>

<style scoped lang="scss" src="./PaymentPage.scss"></style>
