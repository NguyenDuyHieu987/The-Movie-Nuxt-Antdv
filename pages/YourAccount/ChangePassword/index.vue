<template>
  <div class="change-page password padding-content">
    <div v-if="isLogin" class="password-container">
      <Transition appear name="slide-left">
        <div v-show="showAnimation">
          <div v-if="!isChangePassword">
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
            <Form
              :model="formChangePassword"
              :rules="rules"
              name="change-password-form"
              class="form-change-password"
              @finish="handleSubmit"
              hideRequiredMark
            >
              <FormItem
                label="Mật khẩu cũ"
                name="oldPassword"
                :rules="[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                    trigger: ['change', 'blur'],
                  },
                  // {
                  //   message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
                  //   min: 6,
                  //   trigger: ['change', 'blur'],
                  // },
                ]"
                has-feedback
              >
                <InputPassword
                  v-model:value="formChangePassword.oldPassword"
                  placeholder="Mật khẩu cũ..."
                />
              </FormItem>

              <FormItem label="Mật khẩu mới" name="newPassword" has-feedback>
                <InputPassword
                  v-model:value="formChangePassword.newPassword"
                  placeholder="Mật khẩu mới..."
                >
                </InputPassword>
              </FormItem>

              <FormItem
                label="Xác nhận lại"
                name="confirmNewPassword"
                has-feedback
              >
                <InputPassword
                  v-model:value="formChangePassword.confirmNewPassword"
                  placeholder="Xác nhận lại mật khẩu..."
                />
              </FormItem>

              <FormItem>
                <a-button
                  class="submit-form-button click-active"
                  type="primary"
                  html-type="submit"
                  size="large"
                  :loading="loadingChangePassword"
                >
                  Đổi mật khẩu
                </a-button>
              </FormItem>
            </Form>
          </div>

          <VerifyPinOTPForm
            v-model:isShowForm="isChangePassword"
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
    <RequireAuth v-if="!isLogin" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { Form, FormItem, InputPassword } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ElNotification } from 'element-plus';
import VerifyPinOTPForm from '~/components/VerifyForm/VerifyPinOTPForm/VerifyPinOTPForm.vue';
import RequireAuth from '~/components/RequireAuth/RequireAuth.vue';
import { accountVerify, ChangePassword } from '~/services/account';
import { storeToRefs } from 'pinia';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';

definePageMeta({
  pageTransition: {
    name: 'slide-left',
  },
});

const store: any = useStore();
const utils = useUtils();
const { isLogin } = storeToRefs<any>(store);
const loadingChangePassword = ref<boolean>(false);
const formChangePassword = reactive<{
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}>({
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
const otpExpOffset = ref<number>(0);
const titleVerify = ref<string>('Mã xác nhận đã được gửi đến Email: ');
const internalInstance: any = getCurrentInstance();

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

const rules: Record<string, Rule[]> = {
  newPassword: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu!',
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
      message: 'Vui lòng nhập lại mật khẩu!',
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
  if (otpExpOffset.value > 0) {
    showAnimation.value = false;

    setTimeout(() => {
      showAnimation.value = true;
      isChangePassword.value = true;
    }, 300);

    return;
  }

  loadingChangePassword.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  accountVerify(
    {
      oldPassword: utils.encryptPassword(formChangePassword.oldPassword),
      newPassword: utils.encryptPassword(formChangePassword.confirmNewPassword),
    },
    'change-password'
  )
    .then((response: any) => {
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
          isChangePassword.value = true;
          internalInstance.appContext.config.globalProperties.$Progress.finish();
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
        message: 'Gửi Email thất bại.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingChangePassword.value = false;
    });
};

const handleVerify = (formVerify: any) => {
  loadingVerify.value = true;

  ChangePassword({
    otp: formVerify.otp,
    jwtVerifyEmail: jwtVerifyEmail.value,
  })
    .then((response: any) => {
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
  loadingResend.value = true;

  accountVerify(
    {
      oldPassword: utils.encryptPassword(formChangePassword.oldPassword),
      newPassword: utils.encryptPassword(formChangePassword.confirmNewPassword),
    },
    'change-password'
  )
    .then((response: any) => {
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
    isChangePassword.value = false;
  }, 300);
};
</script>

<style lang="scss" src="./ChangePasswordPage.scss"></style>
