<template>
  <Transition name="slide-left">
    <div v-show="isShowForm" class="verify-form-container">
      <a-form
        :model="formVerify"
        name="verify-form"
        class="verify-form"
        @finish="handleVerify"
        hideRequiredMark
      >
        <h1 class="title-verify gradient-title-default">
          <span> Xác nhận Email</span>
        </h1>

        <a-form-item
          class="email-form-item"
          label="Email"
          name="email"
          :rules="[
            {
              required: true,
              message:
                'Vui lòng nhập đúng định dạng email (vd: ...@gmail.com)!',
              pattern: new RegExp(
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
              ),
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-input
            v-model:value="formVerify.email"
            placeholder="Email..."
            disabled
          >
            <template #prefix>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4rem"
                height="1.4rem"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0s256 114.6 256 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9c-22.8 21-53.3 33.9-86.8 33.9c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v112c0 17.7 14.3 32 32 32s32-14.3 32-32v-32c0-106-86-192-192-192zm64 192a64 64 0 1 0-128 0a64 64 0 1 0 128 0z"
                />
              </svg>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Mã xác nhận:"
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
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-input
            v-model:value="formVerify.otp"
            ref="otpRef"
            placeholder="Mã xác nhận..."
            type="number"
            allowClear
          >
            <template #prefix>
              <i class="fa-solid fa-key-skeleton"></i>
            </template>
          </a-input>

          <a-button
            type="link"
            size="large"
            @click="handleResendVerifyEmail"
            :disabled="disabled_countdown"
            :loading="loadingResend"
            class="count-down-button"
          >
            <!-- :class="{ disabled: disabled_countdown }" -->

            <span v-if="!loadingResend"> {{ countdown }}</span>
          </a-button>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="verify-form-button"
            size="large"
            :loading="loadingVerify"
            :disabled="disabledVerifyEmail"
          >
            Xác nhận
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  isShowForm: {
    type: Boolean,
    default: true,
  },
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
}>();

const formVerify = reactive<any>({
  email: props.email,
  otp: '',
  otpExpOffset: props.otpExpOffset,
});
const loadingVerify = ref<boolean>(false);
const countdown = ref<string>(props.otpExpOffset + ' s');
const disabled_countdown = defineModel('disabled_countdown', {
  type: Boolean,
  default: true,
});
const loadingResend = defineModel('loadingResend', {
  type: Boolean,
  default: false,
});

const disabledVerifyEmail = computed<boolean>((): boolean => {
  return !(formVerify.email && formVerify.otp.length == 6);
});

watch(
  () => props.isShowForm,
  () => {
    // alert('g');
    if (disabled_countdown.value == true) {
      let a = props.otpExpOffset;
      const interval = setInterval(() => {
        a -= 1;
        if (a == 0) {
          disabled_countdown.value = false;
          clearInterval(interval);
          countdown.value = 'Gửi lại';
        } else if (a >= 0) {
          countdown.value = 'Còn ' + a.toString() + ' s';
        }
      }, 1000);
    } else {
      countdown.value = 'Gửi lại';
    }
  }
);

watch(disabled_countdown, () => {
  // alert('g');
  if (disabled_countdown.value == true) {
    let a = props.otpExpOffset;
    const interval = setInterval(() => {
      a -= 1;
      if (a == 0) {
        disabled_countdown.value = false;
        clearInterval(interval);
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

const handleVerify = () => {
  emits('onVerify', {
    otp: formVerify.otp,
    user_token: props.jwtVerifyEmail,
  });
};

const handleResendVerifyEmail = () => {
  emits('onResend');
};
</script>

<style lang="scss" src="./VerifyForm.scss"></style>
