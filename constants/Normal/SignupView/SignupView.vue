<template>
  <div class="signup-form-container">
    <a-form
      :model="formState"
      :rules="rules"
      name="normal_signup"
      class="signup-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1 class="title-signup">
        <strong> Đăng ký </strong>
      </h1>

      <a-form-item
        label="Họ và Tên"
        name="fullname"
        :rules="[
          {
            required: true,
            message: 'Please input your full name!',
            trigger: ['change', 'blur'],
          },
        ]"
      >
        <a-input v-model:value="formState.fullname" placeholder="Họ và Tên...">
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
            message: 'Please input username!',
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
            message: 'Please input correct format email!',
            pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
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
            message: 'Please input password!',
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
          @click="handleSubmit"
          style="background: transparent"
          :loading="loadingSignUp"
        >
          Đăng ký
        </a-button>
      </a-form-item>

      <p style="text-align: center; margin: 20px 0px 15px 0px; color: #fff">
        Hoặc
      </p>

      <div style="display: flex; justify-content: center">
        <router-link :to="{ name: 'login' }">Đăng nhập ngay!</router-link>
      </div>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, computed, h, ref } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons-vue';
import axios from 'axios';
import { signUp, emailValidation } from '@/services/MovieService';
import md5 from 'md5';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
// import { notification } from 'ant-design-vue';
import { useMeta } from 'vue-meta';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter();
    const formState = reactive({
      fullname: '',
      username: '',
      password: '',
      checkPass: '',
      email: '',
    });
    const loadingSignUp = ref(false);

    const reset = () => {
      formState.fullname = '';
      formState.username = '';
      formState.password = '';
      formState.checkPass = '';
      formState.email = '';
    };

    useMeta({
      title: '`Phimhay247 - Đăng ký',
      htmlAttrs: { lang: 'vi', amp: true },
    });

    const onFinish = () => {
      // console.log('Success:', values);
    };

    const onFinishFailed = () => {
      // console.log('Failed:', errorInfo);
    };

    const disabled = computed(() => {
      return !(
        formState.fullname &&
        formState.username &&
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formState.email) &&
        formState.password &&
        formState.checkPass &&
        formState.password == formState.checkPass
      );
    });

    const checkConfirmPassword = async (_rule, value) => {
      if (value !== formState.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      checkPass: [
        {
          required: true,
          message: 'Please input password again!',
          trigger: ['change', 'blur'],
        },
        {
          validator: checkConfirmPassword,
          trigger: ['change', 'blur'],
        },
      ],
    };

    // const rand = function () {
    //   return Math.random().toString(36).substring(2); // remove `0.`
    // };

    // const token = function () {
    //   return rand() + rand() + rand() + rand(); // to make it longer
    // };

    const randomToken = require('random-token').create(
      'abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    );

    const handleSubmit = () => {
      loadingSignUp.value = true;

      emailValidation(formState.email).then((response) => {
        if (response.data.is_smtp_valid.value == true) {
          signUp({
            id: Date.now(),
            username: formState.username,
            email: formState.email,
            password: md5(formState.password),
            full_name: formState.fullname,
            avatar: `${Math.floor(Math.random() * 10) + 1}`,
            user_token: randomToken(40),
          })
            .then((response) => {
              if (response?.data?.isSignUp === true) {
                setTimeout(() => {
                  loadingSignUp.value = false;
                  // notification.open({
                  //   message: 'Thành công!',
                  //   description:
                  //     'Bạn đã đăng ký thành công tài khoản tại Phimhay247.',
                  //   icon: () =>
                  //     h(CheckCircleFilled, {
                  //       style: 'color: green',
                  //     }),
                  // });

                  ElNotification.success({
                    title: 'Thành công!',
                    message:
                      'Bạn đã đăng ký thành công tài khoản tại Phimhay247.',
                    icon: () =>
                      h(CheckCircleFilled, {
                        style: 'color: green',
                      }),
                  });
                  router.push({ path: '/login' });
                }, 1000);
                reset();
              } else {
                setTimeout(() => {
                  loadingSignUp.value = false;
                  // notification.open({
                  //   message: 'Lỗi!',
                  //   description: 'Email đã được đăng ký.',
                  //   icon: () =>
                  //     h(CheckCircleFilled, {
                  //       style: 'color: red',
                  //     }),
                  // });

                  ElNotification.error({
                    title: 'Lỗi!',
                    message: 'Email đã được đăng ký.',
                    icon: () =>
                      h(CloseCircleFilled, {
                        style: 'color: red',
                      }),
                  });
                }, 1000);
              }
            })
            .catch((e) => {
              setTimeout(() => {
                loadingSignUp.value = false;
                // notification.open({
                //   message: 'Failed!',
                //   description: 'Some thing went wrong.',
                //   icon: () =>
                //     h(CloseCircleFilled, {
                //       style: 'color: red',
                //     }),
                // });

                ElNotification.error({
                  title: 'Failed!',
                  message: 'Some thing went wrong.',
                  icon: () =>
                    h(CloseCircleFilled, {
                      style: 'color: red',
                    }),
                });
              }, 1000);
              if (axios.isCancel(e)) return;
            });
        } else {
          loadingSignUp.value = false;
          // notification.open({
          //   message: 'Lỗi!',
          //   description: 'Email không tồn tại.',
          //   icon: () =>
          //     h(CloseCircleFilled, {
          //       style: 'color: red',
          //     }),
          // });

          ElNotification.error({
            title: 'Lỗi!',
            message: 'Email không tồn tại.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red',
              }),
          });
        }
      });
    };

    return {
      formState,
      disabled,
      rules,
      loadingSignUp,
      onFinish,
      onFinishFailed,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" src="./SignupView.scss"></style>
