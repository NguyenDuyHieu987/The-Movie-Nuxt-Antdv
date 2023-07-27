<template>
  <div class="change-page password padding-content">
    <div v-show="isLogin" class="password-container">
      <Transition appear name="slide-left">
        <div v-show="showAnimation">
          <div v-show="!isChangePassword">
            <div class="changePass-header">
              <h1>Đổi mật khẩu của bạn</h1>
              <p>
                Để bảo vệ tài khoản bạn nên đặt một mật khẩu duy nhất dài ít
                nhất 6 ký tự.
              </p>
            </div>
            <a-form
              :model="formChangePassword"
              :rules="rules"
              name="change-password-form"
              class="form-change-password"
              @finish="handleSubmit"
              hideRequiredMark
            >
              <a-form-item
                label="Mật khẩu cũ"
                name="oldPassword"
                :rules="[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                    trigger: ['change', 'blur'],
                  },
                ]"
                has-feedback
              >
                <a-input-password
                  v-model:value="formChangePassword.oldPassword"
                  placeholder="Mật khẩu cũ..."
                >
                </a-input-password>
              </a-form-item>

              <a-form-item label="Mật khẩu mới" name="newPassword" has-feedback>
                <a-input-password
                  v-model:value="formChangePassword.newPassword"
                  placeholder="Mật khẩu mới..."
                >
                </a-input-password>
              </a-form-item>

              <a-form-item
                label="Xác nhận lại"
                name="confirmNewPassword"
                has-feedback
              >
                <a-input-password
                  v-model:value="formChangePassword.confirmNewPassword"
                  placeholder="Xác nhận lại mật khẩu..."
                >
                </a-input-password>
              </a-form-item>

              <a-form-item>
                <a-button
                  class="submit-form-button click-active"
                  type="primary"
                  html-type="submit"
                  size="large"
                  :loading="laoding"
                >
                  Đổi mật khẩu
                </a-button>
              </a-form-item>
            </a-form>
          </div>

          <VerifyForm
            v-model:isShowForm="isChangePassword"
            :email="formChangePassword.email"
            :jwtVerifyEmail="jwtVerifyEmail"
            :otpExpOffset="otpExpOffset"
            v-model:loadingResend="loadingResend"
            v-model:disabled_countdown="disabled_countdown"
            v-model:loadingVerify="loadingVerify"
            @onVerify="handleVerify"
            @onResend="handleResendVerifyEmail"
          />
        </div>
      </Transition>
    </div>
    <RequireAuth v-if="!isLogin" />
  </div>
</template>

<script setup lang="ts">
import VerifyForm from '~/components/VerifyForm/VerifyForm.vue';
import RequireAuth from '@/components/RequireAuth/RequireAuth.vue';
import { storeToRefs } from 'pinia';

definePageMeta({
  pageTransition: {
    name: 'slide-left',
  },
});

const store: any = useStore();
const { isLogin } = storeToRefs<any>(store);
const laoding = ref<boolean>(false);
const formChangePassword = reactive<{
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}>({
  email: store.userAccount?.email,
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const showAnimation = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isChangePassword = ref<boolean>(false);
const jwtVerifyEmail = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const otpExpOffset = ref<number>(60);

useHead({
  title: 'Lịch sử giao dịch - Hóa đơn - Thanh toán | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Lịch sử giao dịch - Hóa đơn - Thanh toán | Phimhay247',
  description: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogTitle: 'Lịch sử giao dịch - Hóa đơn - Thanh toán | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hóa đơn của bạn. Lịch sử giao dịch',
  ogLocale: 'vi',
});

const internalInstance: any = getCurrentInstance();

onBeforeMount(() => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  setTimeout(() => {
    showAnimation.value = true;
  });
  internalInstance.appContext.config.globalProperties.$Progress.finish();
});

const disabled = computed<boolean>((): boolean => {
  return !(
    (
      formChangePassword.oldPassword &&
      formChangePassword.newPassword &&
      formChangePassword.confirmNewPassword
    )
    // &&
    // formChangePassword.oldPassword != formChangePassword.newPassword &&
    // formChangePassword.newPassword == formChangePassword.confirmNewPassword
  );
});

const checkNewPassword = async (_rule: any, value: string) => {
  if (value == formChangePassword.oldPassword) {
    return Promise.reject('Mật khẩu mới không được trùng với mật khẩu cũ!');
  } else {
    return Promise.resolve();
  }
};

const checkConfirmNewPassword = async (_rule: any, value: string) => {
  if (value !== formChangePassword.newPassword) {
    return Promise.reject('Mật khẩu nhập lại không khớp!');
  } else {
    return Promise.resolve();
  }
};

const rules = {
  newPassword: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu!',
      trigger: ['change', 'blur'],
    },
    {
      message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
      min: 6,
      trigger: ['change', 'blur'],
    },
    {
      validator: checkNewPassword,
      trigger: ['change', 'blur'],
    },
  ],
  confirmNewPassword: [
    {
      required: true,
      message: 'Vui lòng nhập lại mật khẩu!',
      trigger: ['change', 'blur'],
    },
    {
      validator: checkConfirmNewPassword,
      trigger: ['change', 'blur'],
    },
  ],
};

const handleSubmit = () => {
  isChangePassword.value = true;
};

const handleVerify = () => {};

const handleResendVerifyEmail = () => {};
</script>

<style lang="scss" src="./ChangePasswordPage.scss"></style>
