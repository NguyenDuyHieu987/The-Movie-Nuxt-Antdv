<template>
  <div class="signup-container">
    <Transition name="slide-fade">
      <div v-if="isSignUp" class="verify-form-container">
        <a-form
          :model="formStateVerify"
          name="verify-form"
          class="verify-form"
          @submit="handleVerify"
        >
          <h1 class="title-verify gradient-title-default">
            <span> Xác nhận Email</span>
          </h1>
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
            <a-input
              v-model:value="formStateVerify.email"
              placeholder="Email..."
              disabled
            >
              <template #prefix>
                <font-awesome-icon icon="fa-solid fa-at" />
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
                message: 'Mã xác nhận phải có 6 ký tụ!',
                min: 6,
                max: 6,
                trigger: ['change', 'blur'],
              },
            ]"
          >
            <a-input
              v-model:value="formStateVerify.otp"
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

    <div v-if="!isSignUp" class="signup-form-container">
      <a-form
        :model="formState"
        :rules="rules"
        name="signup-form"
        class="signup-form"
        @submit="handleSignUp"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
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
            v-model:value="formState.fullname"
            placeholder="Họ và Tên..."
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
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
            v-model:value="formState.username"
            ref="usernameRef"
            placeholder="Username..."
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
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
          <a-input v-model:value="formState.email" placeholder="Email...">
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-at" />
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
            v-model:value="formState.password"
            placeholder="Mật khẩu..."
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item label="Nhập lại mật khẩu" name="checkPass" has-feedback>
          <a-input-password
            v-model:value="formState.checkPass"
            placeholder="Xác nhận mật khẩu..."
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="signup-form-button"
            size="large"
            style="background: transparent"
            :loading="loadingSignUp"
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
import { signUp, verifyEmail } from '~/services/authentication';
import { ElNotification } from 'element-plus';

definePageMeta({
  layout: 'auth',
});

useHead({
  title: 'Đăng ký | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Đăng ký | Phimhay247',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Đăng ký | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi',
});

const formState = reactive<any>({
  id: '',
  fullname: '',
  username: '',
  password: '',
  checkPass: '',
  email: '',
  avatar: '',
});
const formStateVerify = reactive<any>({
  email: '',
  otp: '',
});

const utils = useUtils();
const loadingSignUp = ref<boolean>(false);
const loadingVerify = ref<boolean>(false);
const isSignUp = ref<boolean>(false);
const jwtToken_VerifyEmail = ref<string>('');
const disabled_countdown = ref<boolean>(true);
const loadingResend = ref<boolean>(false);
const countdown = ref<string>('60 s');

watch(isSignUp, () => {
  // alert('g');
  if (disabled_countdown.value == true) {
    let a = 60;
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

watch(disabled_countdown, () => {
  // alert('g');
  if (disabled_countdown.value == true) {
    let a = 60;
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

onMounted(() => {
  // if (disabled_countdown.value == true) {
  //   setInterval(() => {
  //     if (a.value == 0) {
  //       disabled_countdown.value = false;
  //     }
  //     a.value -= 1;
  //     countdown.value = a.value.toString() + ' s';
  //   }, 1000);
  // } else {
  //   countdown.value = 'Gửi lại';
  // }
});

const reset = () => {
  formState.fullname = '';
  formState.username = '';
  formState.password = '';
  formState.checkPass = '';
  formState.email = '';
  formStateVerify.email = '';
  formStateVerify.otp = '';
};

useHead({
  title: 'Phimhay247 - Đăng ký',
  htmlAttrs: { lang: 'vi' },
});

const onFinish = () => {
  // console.log('Success:', values);
};

const onFinishFailed = () => {
  // console.log('Failed:', errorInfo);
};

const disabled = computed<boolean>((): boolean => {
  return !(
    formState.fullname &&
    formState.username &&
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formState.email) &&
    formState.password &&
    formState.checkPass &&
    formState.password == formState.checkPass
  );
});

const disabledVerifyEmail = computed<boolean>((): boolean => {
  return !(formStateVerify.email && formStateVerify.otp.length == 6);
});

const checkConfirmPassword = async (_rule: any, value: string) => {
  if (value !== formState.password) {
    return Promise.reject('Mật khẩu không khớp!');
  } else {
    return Promise.resolve();
  }
};

const rules = {
  checkPass: [
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

const handleSignUp = () => {
  loadingSignUp.value = true;
  formState.id = Date.now();
  formState.avatar = `${Math.floor(Math.random() * 10) + 1}`;

  verifyEmail({
    id: formState.id,
    username: formState.username,
    email: formState.email,
    // password: md5(formState.password),
    password: utils.encryptPassword(formState.password),
    full_name: formState.fullname,
    avatar: formState.avatar,
  })
    .then((response: any) => {
      // console.log(response);

      if (response?.isInValidEmail == true) {
        ElNotification.error({
          title: 'Lỗi!',
          message: 'Email không tồn tại.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isVerify === true) {
        ElNotification.success({
          title: 'Thành công!',
          message: `Mã xác nhận đã được gửi đến đến email: ${formState.email}.`,
          showClose: false,
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
          duration: 7000,
        });

        jwtToken_VerifyEmail.value = response.headers.get('Authorization');

        isSignUp.value = !isSignUp.value;
        formStateVerify.email = formState.email;
      } else if (response.data?.isEmailExist == true) {
        ElNotification.error({
          title: 'Lỗi!',
          message: 'Email đã được đăng ký.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isSendEmail == false) {
        ElNotification.error({
          title: 'Lỗi!',
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
        title: 'Lỗi!',
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
  verifyEmail({
    id: formState.id,
    username: formState.username,
    email: formState.email,
    // password: md5(formState.password),
    password: utils.encryptPassword(formState.password),
    full_name: formState.fullname,
    avatar: formState.avatar,
  })
    .then((response: any) => {
      // console.log(response);

      if (response?.isVerify === true) {
        disabled_countdown.value = true;

        ElNotification.success({
          title: 'Thành công!',
          message: `Mã xác nhận đã được gửi đến đến email: ${formState.email}.`,
          showClose: false,
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
          duration: 7000,
        });

        jwtToken_VerifyEmail.value = response.headers.get('Authorization');
      } else if (response?.isInValidEmail == true) {
        ElNotification.error({
          title: 'Lỗi!',
          message: 'Email không tồn tại.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isEmailExist == true) {
        ElNotification.error({
          title: 'Lỗi!',
          message: 'Email đã được đăng ký.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isSendEmail == false) {
        ElNotification.error({
          title: 'Lỗi!',
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
        title: 'Lỗi!',
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

const handleVerify = () => {
  loadingVerify.value = true;

  signUp({
    otp: formStateVerify.otp,
    user_token: jwtToken_VerifyEmail.value,
  })
    .then((response) => {
      // console.log(response.data);
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
          title: 'Lỗi!',
          message: 'Mã xác nhận không đúng.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isAccountExist == true) {
        ElNotification.error({
          title: 'Lỗi!',
          message: 'Tài khoản đã tồn tại.',
          showClose: false,
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      } else if (response?.isOTPExpired == true) {
        ElNotification.error({
          title: 'Lỗi!',
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
        title: 'Lỗi!',
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
</script>

<style lang="scss" src="./SignupPage.scss"></style>
