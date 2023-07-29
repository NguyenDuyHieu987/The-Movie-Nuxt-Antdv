<template>
  <div class="signup-container">
    <div v-show="!isSignUp" class="signup-form-container">
      <a-form
        :model="formSignup"
        :rules="rules"
        name="signup-form"
        class="signup-form"
        @finish="handleSignUp"
        hideRequiredMark
      >
        <h1 class="title-signup gradient-title-default">
          <span> Đăng ký </span>
        </h1>

        <a-form-item
          label="Họ và Tên"
          name="fullname"
          :rules="[
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ họ tên của bạn!',
              trigger: ['change', 'blur'],
            },
            {
              message: 'Họ và tên phải có ít nhất 6 ký tụ!',
              min: 6,
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-input
            v-model:value="formSignup.fullname"
            placeholder="Họ và Tên..."
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Tài khoản"
          name="username"
          :rules="[
            {
              required: true,
              message: 'Vui lòng nhập username!',
              trigger: ['change', 'blur'],
            },
            {
              message: 'Username phải có ít nhất 6 ký tụ!',
              min: 6,
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-input
            v-model:value="formSignup.username"
            ref="usernameRef"
            placeholder="Username..."
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
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
          <a-input v-model:value="formSignup.email" placeholder="Email...">
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
          label="Mật khẩu"
          name="password"
          :rules="[
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
          ]"
          has-feedback
        >
          <a-input-password
            v-model:value="formSignup.password"
            placeholder="Mật khẩu..."
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item label="Nhập lại mật khẩu" name="confirmPass" has-feedback>
          <a-input-password
            v-model:value="formSignup.confirmPass"
            placeholder="Xác nhận mật khẩu..."
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            class="signup-form-button"
            type="primary"
            html-type="submit"
            size="large"
            :loading="loadingSignUp"
            :disabled="disabled"
          >
            Đăng ký
          </a-button>
        </a-form-item>

        <div class="bottom-form">
          <p>Hoặc</p>
          <NuxtLink :to="{ name: 'login' }">Đăng nhập ngay!</NuxtLink>
        </div>
      </a-form>
    </div>

    <Transition appear name="slide-left">
      <VerifyForm
        v-model:showAnimation="showAnimation"
        v-model:isShowForm="isSignUp"
        :email="formSignup.email"
        :jwtVerifyEmail="jwtVerifyEmail"
        :otpExpOffset="otpExpOffset"
        v-model:loadingResend="loadingResend"
        v-model:disabled_countdown="disabled_countdown"
        v-model:loadingVerify="loadingVerify"
        @onVerify="handleVerify"
        @onResend="handleResendVerifyEmail"
        @click="handleClickBack"
      >
        <template #title>
          <h1 class="gradient-title-default">
            <span> Xác nhận Email</span>
          </h1>
        </template>
      </VerifyForm>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  LockOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons-vue';
import axios from 'axios';
import { signUp, verifySignUp } from '~/services/authentication';
import VerifyForm from '~/components/VerifyForm/VerifyForm.vue';
import { ElNotification } from 'element-plus';

definePageMeta({
  layout: 'auth',
});

useHead({
  title: 'Đăng ký | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Đăng ký | Phimhay247',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Đăng ký | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi',
});

const formSignup = reactive<any>({
  id: '',
  fullname: '',
  username: '',
  password: '',
  confirmPass: '',
  email: '',
  avatar: '',
});

const utils = useUtils();
const router = useRouter();
const route = useRoute();
const loadingSignUp = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isSignUp = ref<boolean>(false);
const jwtVerifyEmail = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const otpExpOffset = ref<number>(60);
const showAnimation = ref<boolean>(false);

onMounted(() => {});

const reset = () => {
  formSignup.fullname = '';
  formSignup.username = '';
  formSignup.password = '';
  formSignup.confirmPass = '';
  formSignup.email = '';
};

useHead({
  title: 'Phimhay247 - Đăng ký',
  htmlAttrs: { lang: 'vi' },
});

const disabled = computed<boolean>((): boolean => {
  return !(
    (
      formSignup.fullname &&
      formSignup.username &&
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formSignup.email) &&
      formSignup.password &&
      formSignup.confirmPass
    )
    //  &&
    // formSignup.password == formSignup.confirmPass
  );
});

const checkConfirmPassword = async (_rule: any, value: string) => {
  if (value !== formSignup.password) {
    return Promise.reject('Mật khẩu nhập lại không khớp!');
  } else {
    return Promise.resolve();
  }
};

const rules = {
  confirmPass: [
    {
      required: true,
      message: 'Vui lòng nhập lại mật khẩu!',
      trigger: ['change', 'blur'],
    },
    {
      validator: checkConfirmPassword,
      trigger: ['change', 'blur'],
    },
  ],
};

// const aesjs = require('aes-js');
// const pbkdf2 = require('pbkdf2');

// var textBytes = aesjs.utils.utf8.toBytes('123');
// var aesCtr = new aesjs.ModeOfOperation.ctr(
//   pbkdf2.pbkdf2Sync('123', 'salt', 1, 256 / 8, 'sha512'),
//   new aesjs.Counter(24)
// );
// var encryptedBytes = aesCtr.encrypt(textBytes);
// var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
// console.log(encryptedHex);
// console.log(pbkdf2.pbkdf2Sync('123', 'salt', 1, 256 / 8, 'sha512'));

const handleSignUp = (e: any) => {
  loadingSignUp.value = true;
  formSignup.id = Date.now();
  formSignup.avatar = `${Math.floor(Math.random() * 10) + 1}`;

  verifySignUp(
    {
      id: formSignup.id,
      username: formSignup.username,
      email: formSignup.email,
      // password: md5(formSignup.password),
      password: utils.encryptPassword(formSignup.password),
      full_name: formSignup.fullname,
      avatar: formSignup.avatar,
    },
    'email'
  )
    .then((response: any) => {
      // console.log(response);

      if (response?.isInValidEmail == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Email không tồn tại.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isSended === true) {
        ElNotification.success({
          title: 'Thành công!',
          message: `Mã xác nhận đã được gửi đến đến Email: ${formSignup.email}.`,
          showClose: false,
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
          isSignUp.value = true;
        }, 300);
      } else if (response?.isEmailExist == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Email đã được đăng ký.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isSended == false) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Gửi Email thất bại.',
          showClose: false,
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
        showClose: false,
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingSignUp.value = false;
    });
};

const handleResendVerifyEmail = () => {
  loadingResend.value = true;

  verifySignUp(
    {
      id: formSignup.id,
      username: formSignup.username,
      email: formSignup.email,
      // password: md5(formSignup.password),
      password: utils.encryptPassword(formSignup.password),
      full_name: formSignup.fullname,
      avatar: formSignup.avatar,
    },
    'email'
  )
    .then((response: any) => {
      // console.log(response);

      if (response?.isSended === true) {
        ElNotification.success({
          title: 'Thành công!',
          message: `Mã xác nhận đã được gửi đến đến email: ${formSignup.email}.`,
          showClose: false,
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
      } else if (response?.isInValidEmail == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Email không tồn tại.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isEmailExist == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Email đã được đăng ký.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isSended == false) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Gửi email thất bại.',
          showClose: false,
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
        showClose: false,
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

const handleVerify = (formVerify: any) => {
  loadingVerify.value = true;

  signUp({
    otp: formVerify.otp,
    jwtVerifyEmail: jwtVerifyEmail.value,
  })
    .then((response) => {
      // console.log(response);
      if (response?.isSignUp === true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Bạn đã đăng ký thành công tài khoản tại Phimhay247.',
          showClose: false,
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });

        navigateTo({ path: '/login' });
        reset();
      } else if (response?.isInvalidOTP == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Mã xác nhận không đúng.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isAccountExist == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Tài khoản đã tồn tại.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isOTPExpired == true) {
        ElNotification.error({
          title: 'Thất bại!',
          message: 'Mã xác nhận đã hết hạn.',
          showClose: false,
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
        showClose: false,
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

const handleClickBack = () => {
  showAnimation.value = false;

  setTimeout(() => {
    showAnimation.value = true;
    isSignUp.value = false;
  }, 300);
};
</script>

<style lang="scss" src="./SignupPage.scss"></style>
