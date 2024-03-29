<template>
  <div class="service-page reset-password padding-content">
    <div class="center-page">
      <div class="resetPass-container">
        <Transition appear name="slide-bottom">
          <div v-show="showAnimation">
            <div class="resetPass-wrapper">
              <div class="resetPass-header">
                <h1>Đặt lại mật khẩu của bạn</h1>
                <p>
                  Để bảo vệ tài khoản bạn nên đặt một mật khẩu duy nhất dài ít
                  nhất 6 ký tự.
                </p>
              </div>
              <a-form
                :model="formResetPassword"
                :rules="rules"
                name="reset-password-form"
                class="form-change-password"
                @finish="handleSubmit"
                hideRequiredMark
              >
                <a-form-item label="Tài khoản" name="username">
                  <a-input
                    v-model:value="formResetPassword.username"
                    ref="usernameRef"
                    placeholder="..."
                    disabled
                  >
                  </a-input>
                </a-form-item>

                <a-form-item label="Email" name="email">
                  <a-input
                    v-model:value="formResetPassword.email"
                    placeholder="..."
                    disabled
                  >
                  </a-input>
                </a-form-item>

                <a-form-item
                  label="Mật khẩu mới"
                  name="newPassword"
                  has-feedback
                >
                  <a-input-password
                    v-model:value="formResetPassword.newPassword"
                    placeholder="Mật khẩu mới..."
                    allow-clear
                    :disabled="isDisabledForm"
                  >
                  </a-input-password>
                </a-form-item>

                <a-form-item
                  label="Xác nhận lại"
                  name="confirmNewPassword"
                  has-feedback
                >
                  <a-input-password
                    v-model:value="formResetPassword.confirmNewPassword"
                    placeholder="Xác nhận lại mật khẩu mới..."
                    allow-clear
                    :disabled="isDisabledForm"
                  />
                </a-form-item>

                <a-form-item>
                  <a-button
                    class="submit-form-button submit-btn click-active"
                    type="primary"
                    html-type="submit"
                    size="large"
                    :loading="loadingResetPassword"
                    :disabled="isDisabledForm || disabled"
                  >
                    Đặt lại mật khẩu
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
// import { Form, FormItem, InputPassword } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ElNotification } from 'element-plus';
import { ResetPassword, VerifyResetPassword } from '~/services/account';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';

definePageMeta({
  layout: 'service',
  pageTransition: {
    name: 'slide-bottom',
  },
});

const store = useStore();
const utils = useUtils();
const route = useRoute();
const loadingResetPassword = ref<boolean>(false);
const formResetPassword = reactive<{
  username: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}>({
  username: '',
  email: '',
  newPassword: '',
  confirmNewPassword: '',
});
const showAnimation = ref<boolean>(false);
const isActionForm = ref<boolean>(false);
const isDisabledForm = ref<boolean>(false);
const rstPwdToken = computed<string>(() => route.query?.token);
const disabled = computed<boolean>((): boolean => {
  return !(
    formResetPassword.newPassword &&
    formResetPassword.confirmNewPassword &&
    formResetPassword.newPassword == formResetPassword.confirmNewPassword
  );
});
const internalInstance: any = getCurrentInstance();

useHead({
  title: 'Đặt lại mật khẩu',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Đặt lại mật khẩu',
  description: 'Đặt lại mật khẩu của bạn',
  ogTitle: 'Đặt lại mật khẩu',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Đặt lại mật khẩu của bạn',
  ogLocale: 'vi',
});

await VerifyResetPassword(rstPwdToken.value)
  .then((response) => {
    if (response.success) {
      formResetPassword.username = response?.result.username;
      formResetPassword.email = response?.result.email;
    } else {
      isDisabledForm.value = true;

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
    isDisabledForm.value = true;

    ElNotification.error({
      title: 'Thất bại!',
      message: 'Some thing went wrong.',
      icon: () =>
        h(CloseCircleFilled, {
          style: 'color: red',
        }),
    });
    if (axios.isCancel(e)) return;
  });

onBeforeMount(() => {
  setTimeout(() => {
    showAnimation.value = true;
  });
});

const checkConfirmNewPassword = async (_rule: any, value: string) => {
  if (value !== formResetPassword.newPassword) {
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

const handleSubmit = () => {
  loadingResetPassword.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  ResetPassword({
    rstPwdToken: rstPwdToken.value,
    newPassword: formResetPassword.confirmNewPassword,
  })
    .then((response) => {
      // console.log(response);
      if (response?.success == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Đặt lại mật khẩu thành công.',
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });

        isDisabledForm.value = true;

        window.localStorage.removeItem('forgot_password');

        navigateTo('/login');
      } else {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Đặt lại mật khẩu thất bại.',
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
      loadingResetPassword.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });
};
</script>

<style lang="scss" src="./ResetPassword.scss"></style>
