<template>
  <div class="service-page change-email padding-content">
    <div class="change-page">
      <div v-if="!store.loadingUser">
        <div v-if="isLogin" class="email-container">
          <Transition appear name="slide-left">
            <div v-show="showAnimation">
              <div v-if="!isChangeEmail">
                <a-button class="back-page-btn click-active" type="text">
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
                  <NuxtLink to="/YourAccount"> Tài khoản</NuxtLink>
                </a-button>

                <div class="changeEmail-header">
                  <div class="note">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8rem"
                      height="8rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm7 10c0 4.52-2.98 8.69-7 9.93c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11l7 3.11V11zm-11.59.59L6 13l4 4l8-8l-1.41-1.42L10 14.17z"
                      />
                    </svg>
                    <h1>Trước tiên, Hãy xác nhận Email này là của bạn</h1>
                    <p>
                      Trước khi cấp phép thực hiện bất kỳ thay đổi nào, chúng
                      tôi cần đảm bảo đây là bạn.
                    </p>
                  </div>
                </div>

                <a-form
                  :model="formChangeEmail"
                  name="change-email-form"
                  class="form-change-email"
                  :class="{ disabled: loadingChangeEmail }"
                  @finish="handleSubmit"
                  hideRequiredMark
                >
                  <a-form-item class="email" name="email">
                    <button
                      class="submit-form-button submit-btn click-active"
                      html-type="submit"
                    >
                      <div class="left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="3rem"
                          height="3rem"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5l8-5v10zm-8-7L4 6h16l-8 5z"
                          />
                        </svg>
                        <span> {{ store.userAccount?.email }}</span>
                      </div>

                      <div class="right">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4rem"
                          height="2.4rem"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10l-10 10Z"
                          />
                        </svg>
                      </div>
                    </button>
                  </a-form-item>
                </a-form>
              </div>

              <VerifyPinOTPForm
                v-model:isShowForm="isChangeEmail"
                :email="store.userAccount?.email"
                :jwtVerifyEmail="jwtVerifyEmail"
                v-model:otpExpOffset="otpExpOffset"
                v-model:loadingResend="loadingResend"
                v-model:disabled_countdown="disabled_countdown"
                v-model:loadingVerify="loadingVerify"
                @onVerify="handleVerify"
                @onResend="handleResendVerifyEmail"
                @onClickBack="handleClickBack"
              >
                <template #title>
                  <h1>Xác nhận Email của bạn</h1>

                  <p>
                    {{ titleVerify }}
                    <strong> {{ store.userAccount?.email }}</strong>
                  </p>
                </template>
              </VerifyPinOTPForm>
            </div>
          </Transition>
        </div>
        <RequireAuth v-if="!isLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ElNotification } from 'element-plus';
import VerifyPinOTPForm from '~/components/VerifyForm/VerifyPinOTPForm/VerifyPinOTPForm.vue';
import RequireAuth from '~/components/RequireAuth/RequireAuth.server.vue';
import { AccountConfirm, VerifyEmail } from '~/services/account';
import { storeToRefs } from 'pinia';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';

definePageMeta({
  layout: 'service',
  pageTransition: {
    name: 'slide-left',
  },
});

const store = useStore();
const utils = useUtils();
const { isLogin } = storeToRefs<any>(store);
const loadingChangeEmail = ref<boolean>(false);
const formChangeEmail = reactive<{
  email: string | undefined;
}>({
  email: store.userAccount?.email,
});
const showAnimation = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isChangeEmail = ref<boolean>(false);
const jwtVerifyEmail = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const otpExpOffset = ref<number>(0);
const titleVerify = ref<string>('Mã xác nhận đã được gửi đến Email: ');
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Thay đỏi Email - Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Thay đỏi Email - Phimhay247',
  description: 'Đỏi Email của bạn',
  ogTitle: 'Thay đổi Email - Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Đỏi Email của bạn',
  ogLocale: 'vi',
});

onBeforeMount(() => {
  setTimeout(() => {
    showAnimation.value = true;
  });
});

const handleSubmit = () => {
  if (loadingChangeEmail.value) return;

  if (
    otpExpOffset.value > 0 ||
    utils.cookie.getCookie('verify_your_email') != null
  ) {
    showAnimation.value = false;

    setTimeout(() => {
      showAnimation.value = true;
      isChangeEmail.value = true;
    }, 300);

    return;
  }

  loadingChangeEmail.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  AccountConfirm({ email: store.userAccount?.email }, 'email')
    .then((response) => {
      // console.log(response);

      if (response?.isSended === true) {
        ElNotification.success({
          title: 'Thành công!',
          message: `Mã xác nhận đã được gửi đến đến Email: ${store.userAccount?.email}.`,
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
          duration: 7000,
        });

        jwtVerifyEmail.value = response.headers.get('Authorization');
        otpExpOffset.value = response.exp_offset;

        // router.push({
        //   query: {
        //     token: jwtVerifyEmail.value,
        //   },
        // });

        showAnimation.value = false;

        setTimeout(() => {
          showAnimation.value = true;
          isChangeEmail.value = true;
        }, 300);
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Sai mật khẩu.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isSended == false) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Gửi Email thất bại.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: 'Thất bại!',
        message: 'Some thing went wrong.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      internalInstance.appContext.config.globalProperties.$Progress.finish();
      loadingChangeEmail.value = false;
    });
};

const handleVerify = (formVerify: any) => {
  loadingVerify.value = true;

  VerifyEmail({
    otp: formVerify.otp,
    jwtVerifyEmail: jwtVerifyEmail.value,
  })
    .then((response) => {
      // console.log(response);
      if (response?.success == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Thay đổi email thành công.',
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });

        navigateTo({ path: '/YourAccount' });
      } else if (response?.isInvalidOTP == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Mã xác nhận không đúng.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isOTPExpired == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Mã xác nhận đã hết hạn.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.success == false) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Some thing went wrong.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: 'Thất bại!',
        message: 'Some thing went wrong.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingVerify.value = false;
    });
};

const handleResendVerifyEmail = () => {
  loadingResend.value = true;

  AccountConfirm({ email: store.userAccount?.email }, 'email')
    .then((response) => {
      // console.log(response);

      if (response?.isSended === true) {
        ElNotification.success({
          title: 'Thành công!',
          message: `Mã xác nhận đã được gửi đến đến Email: ${store.userAccount?.email}.`,
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
          duration: 7000,
        });

        disabled_countdown.value = true;

        jwtVerifyEmail.value = response.headers.get('Authorization');
        otpExpOffset.value = response.exp_offset;

        // router.push({
        //   query: {
        //     token: jwtVerifyEmail.value,
        //   },
        // });
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Sai mật khẩu.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isSended == false) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Gửi Email thất bại.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: 'Thất bại!',
        message: 'Some thing went wrong.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingResend.value = false;
    });
};

const handleClickBack = () => {
  showAnimation.value = false;

  setTimeout(() => {
    showAnimation.value = true;
    isChangeEmail.value = false;
  }, 300);
};
</script>

<style lang="scss" src="./ChangeEmailPage.scss"></style>
