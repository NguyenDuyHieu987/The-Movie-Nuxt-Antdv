<template>
  <div class="service-page change-password padding-content">
    <div class="change-page">
      <div v-if="!store.loadingUser">
        <div v-if="isLogin" class="changePass-container">
          <Transition appear name="slide-left">
            <div v-show="showAnimation">
              <div v-show="!isShowVerifyOTPForm" class="changePass-wrapper">
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
                        message: 'Vui lòng nhập mật khẩu cũ!',
                        trigger: ['change', 'blur'],
                      },
                      // {
                      //   message: 'Mật khẩu cũ phải có ít nhất 6 ký tụ!',
                      //   min: 6,
                      //   trigger: ['change', 'blur'],
                      // },
                    ]"
                    has-feedback
                  >
                    <a-input-password
                      v-model:value="formChangePassword.oldPassword"
                      placeholder="Mật khẩu cũ..."
                      allow-clear
                    />
                  </a-form-item>

                  <a-form-item
                    label="Mật khẩu mới"
                    name="newPassword"
                    has-feedback
                  >
                    <a-input-password
                      v-model:value="formChangePassword.newPassword"
                      placeholder="Mật khẩu mới..."
                      allow-clear
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
                      placeholder="Xác nhận lại mật khẩu mới..."
                      allow-clear
                    />
                  </a-form-item>

                  <a-form-item class="logout-all-device">
                    <a-checkbox
                      v-model:checked="formChangePassword.logOutAllDevice"
                    >
                      Đăng xuất khỏi tất cả các thiết bị
                    </a-checkbox>
                  </a-form-item>

                  <a-form-item>
                    <a-button
                      class="submit-form-button submit-btn click-active"
                      type="primary"
                      html-type="submit"
                      size="large"
                      :loading="loadingChangePassword"
                      :disabled="disabled"
                    >
                      Đổi mật khẩu
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>

              <VerifyPinOTPForm
                v-model:isShowForm="isShowVerifyOTPForm"
                :email="store.userAccount?.email"
                :token="chgPwdToken"
                v-model:otpExpOffset="otpExpOffset"
                v-model:loadingResend="loadingResend"
                v-model:disabled_countdown="disabled_countdown"
                v-model:loadingVerify="loadingVerify"
                @onVerify="handleVerify"
                @onResend="handleResendVerifyEmail"
                @onClickBack="handleClickBack"
              >
                <template #title>
                  <h1>Xác nhận thay đổi mật khẩu của bạn</h1>

                  <p>
                    {{ titleVerify }}
                    <strong> {{ store.userAccount?.email }}</strong>
                  </p>
                </template>
              </VerifyPinOTPForm>
            </div>
          </Transition>
        </div>
        <RequireAuth v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
// import { Form, FormItem, InputPassword } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ElNotification } from 'element-plus';
import VerifyPinOTPForm from '~/components/VerifyForm/VerifyPinOTPForm/VerifyPinOTPForm.vue';
import RequireAuth from '~/components/RequireAuth/RequireAuth.server.vue';
import { AccountConfirm, ChangePassword } from '~/services/account';
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
const loadingChangePassword = ref<boolean>(false);
const formChangePassword = reactive<{
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  logOutAllDevice: boolean;
}>({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  logOutAllDevice: false,
});
const showAnimation = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isShowVerifyOTPForm = ref<boolean>(false);
const chgPwdToken = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const otpExpOffset = ref<number>(0);
const titleVerify = ref<string>('Mã xác nhận đã được gửi đến Email: ');
const disabled = computed<boolean>((): boolean => {
  return !(
    formChangePassword.oldPassword &&
    formChangePassword.newPassword &&
    formChangePassword.confirmNewPassword &&
    formChangePassword.oldPassword != formChangePassword.newPassword &&
    formChangePassword.newPassword == formChangePassword.confirmNewPassword
  );
});
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Đỏi mật khẩu',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Đỏi mật khẩu',
  description: 'Đỏi mật khẩu của bạn',
  ogTitle: 'Đỏi mật khẩu',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Đỏi mật khẩu của bạn',
  ogLocale: 'vi',
});

onBeforeMount(() => {
  setTimeout(() => {
    showAnimation.value = true;
  });
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
    return Promise.reject('Mật khẩu mới nhập lại không khớp!');
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  newPassword: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu mới!',
      trigger: ['change', 'blur'],
    },
    // {
    //   message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
    //   min: 6,
    //   trigger: ['change', 'blur'],
    // },
    {
      validator: checkNewPassword,
      trigger: ['change', 'blur'],
    },
  ],
  confirmNewPassword: [
    {
      required: true,
      message: 'Vui lòng nhập lại mật khẩu mới!',
      trigger: ['change', 'blur'],
    },
    {
      validator: checkConfirmNewPassword,
      trigger: ['change', 'blur'],
    },
  ],
};

const reset = () => {
  formChangePassword.oldPassword = '';
  formChangePassword.newPassword = '';
  formChangePassword.confirmNewPassword = '';
};

const handleSubmit = () => {
  if (loadingChangePassword.value) return;

  if (
    otpExpOffset.value > 0 ||
    utils.cookie.getCookie('chg_pwd_token') != null
  ) {
    showAnimation.value = false;

    setTimeout(() => {
      showAnimation.value = true;
      isShowVerifyOTPForm.value = true;
    }, 300);

    return;
  }

  loadingChangePassword.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  AccountConfirm(
    {
      // oldPassword: utils.encryptPassword(formChangePassword.oldPassword),
      // newPassword: utils.encryptPassword(formChangePassword.confirmNewPassword),
      oldPassword: formChangePassword.oldPassword,
      newPassword: formChangePassword.confirmNewPassword,
      logOutAllDevice: formChangePassword.logOutAllDevice,
    },
    'change-password'
  )
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

        chgPwdToken.value = utils.cookie.getCookie('chg_pwd_token')!;
        otpExpOffset.value = response.exp_offset;

        // router.push({
        //   query: {
        //     token: chgPwdToken.value,
        //   },
        // });
        showAnimation.value = false;

        setTimeout(() => {
          showAnimation.value = true;
          isShowVerifyOTPForm.value = true;
        }, 300);
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Mật khẩu cũ không đúng.',
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
        message: 'Gửi Email thất bại.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      internalInstance.appContext.config.globalProperties.$Progress.finish();
      loadingChangePassword.value = false;
    });
};

const handleVerify = (formVerify: { otp: string; token: string }) => {
  if (loadingVerify.value) return;

  loadingVerify.value = true;

  ChangePassword({
    otp: formVerify.otp,
    chgPwdToken: chgPwdToken.value,
  })
    .then((response) => {
      // console.log(response);
      if (response?.success == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Đổi mật khẩu thành công.',
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });

        if (response?.logout_all_device) {
          utils.localStorage.setWithExpiry(
            'user_token',
            response.headers.get('Authorization'),
            24
          );
        }

        navigateTo({ path: '/YourAccount' });
        reset();
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
          message: 'Đổi mật khẩu thất bại.',
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
        message: 'Đổi mật khẩu thất bại.',
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
  if (loadingResend.value) return;

  loadingResend.value = true;

  AccountConfirm(
    {
      // oldPassword: utils.encryptPassword(formChangePassword.oldPassword),
      // newPassword: utils.encryptPassword(formChangePassword.confirmNewPassword),
      oldPassword: formChangePassword.oldPassword,
      newPassword: formChangePassword.confirmNewPassword,
      logOutAllDevice: formChangePassword.logOutAllDevice,
    },
    'change-password'
  )
    .then((response) => {
      // console.log(response);

      titleVerify.value = `Một mã xác nhận khác đã được gửi đến Email: `;

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

        chgPwdToken.value = utils.cookie.getCookie('chg_pwd_token')!;
        otpExpOffset.value = response.exp_offset;
      } else if (response?.isWrongPassword == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Mật khẩu cũ không đúng.',
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
        message: 'Gửi Email thất bại.',
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
    isShowVerifyOTPForm.value = false;
  }, 300);
};
</script>

<style lang="scss" src="./ChangePasswordPage.scss"></style>
