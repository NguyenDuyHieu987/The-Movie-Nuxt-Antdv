<template>
  <div v-show="showAnimation" class="verify-email">
    <div v-if="isShowForm" class="verify-email-container">
      <a-button
        class="back-btn click-active"
        type="text"
        @click="handleClickBack"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            role="img"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"
            />
          </svg>
        </template>
        <span> Quay lại</span>
      </a-button>
      <a-form
        :model="formVerify"
        name="verify-form"
        class="verify-form"
        @finish="handleVerify"
        hideRequiredMark
      >
        <div class="title-verify">
          <slot name="title" />
        </div>

        <!-- <a-form-item
          label="Mã xác nhận"
          name="otp"
          :rules="[
            {
              required: true,
              message: 'Vui lòng nhập mã xác nhận!',
              trigger: ['change', 'blur'],
            },
            {
              message: 'Mã xác nhận phải là 6 số!',
              min: 6,
              max: 6,
              len: 6,
              validator: checkPinOTP,
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-input-number
            v-model:value="formVerify.otp"
            type="number"
            placeholder="Mã xác nhận..."
            :min="0"
            :controls="false"
            allowClear
          >
            <template #prefix>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6rem"
                height="1.6rem"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 4.52-2.98 8.69-7 9.93c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11l7 3.11V11zm-11.59.59L6 13l4 4l8-8l-1.41-1.42L10 14.17z"
                />
              </svg>
            </template>
          </a-input-number>

          <a-button
            type="link"
            size="large"
            @click="handleResendVerifyEmail"
            :disabled="disabled_countdown"
            :loading="loadingResend"
            class="count-down-button"
          >
            <span v-if="!loadingResend"> {{ countdown }}</span>
          </a-button>
        </a-form-item> -->

        <a-form-item class="pin" name="pin" label="Mã xác nhận">
          <PinOTP v-model:pin="formVerify.pin" />
        </a-form-item>

        <a-form-item class="resend" name="resend">
          <a-button
            class="count-down-btn"
            type="text"
            size="large"
            @click="handleResendVerifyEmail"
            :disabled="disabled_countdown"
            :loading="loadingResend"
          >
            <span v-if="!loadingResend"> {{ countdown }}</span>
          </a-button>
        </a-form-item>

        <a-form-item name="submit">
          <a-button
            class="verify-form-button click-active"
            type="primary"
            html-type="submit"
            size="large"
            :loading="loadingVerify"
            :disabled="disabledVerifyEmail"
          >
            Xác nhận
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import PinOTP from '~/components/PinOTP/PinOTP.vue';

const props = defineProps({
  email: {
    type: String,
  },
  jwtVerifyEmail: {
    type: String,
  },
  otpExpOffset: {
    type: Number,
    default: 60,
  },
});

const emits = defineEmits<{
  onVerify: [form: any];
  onResend: [];
  onClickBack: [];
}>();

const route = useRoute();
const showAnimation = defineModel('showAnimation', {
  type: Boolean,
  default: true,
});
const isShowForm = defineModel('isShowForm', {
  type: Boolean,
  default: true,
});
const formVerify = reactive<{
  email: string | undefined;
  otp: number | null;
  pin: number[] | null[];
  otpExpOffset: number;
}>({
  email: props.email,
  otp: null,
  pin: [null, null, null, null, null, null],
  otpExpOffset: props.otpExpOffset,
});
const countdown = ref<string>(props.otpExpOffset + ' s');
const disabled_countdown = defineModel('disabled_countdown', {
  type: Boolean,
  default: true,
});
const loadingResend = defineModel('loadingResend', {
  type: Boolean,
  default: false,
});
const loadingVerify = defineModel('loadingVerify', {
  type: Boolean,
  default: false,
});
const intervalCountdown = ref<any>();

const disabledVerifyEmail = computed<boolean>((): boolean => {
  return !(
    formVerify.email &&
    // formVerify.otp?.toString().length == 6
    !formVerify.pin.some((number) => number?.toString().length == 0)
  );
});

watch(
  () => route.query,
  () => {
    if (route.query?.token) {
      // isShowForm.value = true;
    }
  },
  { deep: true, immediate: true }
);

watch(isShowForm, () => {
  if (disabled_countdown.value == true) {
    formVerify.email = props.email;
    clearInterval(intervalCountdown.value);

    let a = props.otpExpOffset;
    intervalCountdown.value = setInterval(() => {
      a -= 1;
      if (a == 0) {
        disabled_countdown.value = false;
        clearInterval(intervalCountdown.value);
        countdown.value = 'Gửi lại';
      } else if (a >= 0) {
        countdown.value = 'Còn ' + a.toString() + ' s';
      }
    }, 1000);
  } else {
    countdown.value = 'Gửi lại';
  }
});

watch(disabled_countdown, () => {
  if (disabled_countdown.value == true) {
    clearInterval(intervalCountdown.value);

    let a = props.otpExpOffset;
    intervalCountdown.value = setInterval(() => {
      a -= 1;
      if (a == 0) {
        disabled_countdown.value = false;
        clearInterval(intervalCountdown.value);
        countdown.value = 'Gửi lại';
      } else if (a >= 0) {
        countdown.value = 'Còn ' + a.toString() + ' s';
      }
    }, 1000);
  } else {
    countdown.value = 'Gửi lại';
  }
});

onBeforeMount(() => {});

const checkPinOTP = async (_rule: any, value: number) => {
  if (value.toString().length != 6) {
    return Promise.reject('Mã xác nhận phải là 6 số!');
  } else {
    return Promise.resolve();
  }
};

const handleVerify = () => {
  emits('onVerify', {
    // otp: formVerify.otp,
    otp: formVerify.pin.join(''),
    user_token: props.jwtVerifyEmail,
  });
};

const handleResendVerifyEmail = () => {
  emits('onResend');
};

const handleClickBack = () => {
  emits('onClickBack');
};
</script>

<style lang="scss" src="./VerifyPinOTPForm.scss"></style>
