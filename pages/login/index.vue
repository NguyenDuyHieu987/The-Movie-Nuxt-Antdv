<template>
  <div class="login-container">
    <div class="login-form-container">
      <a-form
        :model="formState"
        name="login-form"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <h1 class="title-login gradient-title-default">
          <strong>Đăng nhập </strong>
        </h1>

        <a-form-item
          label="Email"
          name="username"
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
          <a-input v-model:value="formState.username" placeholder="Email...">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
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
          ]"
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

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox
              v-model:checked="formState.remember"
              style="user-select: none"
              >Tự động đăng nhập</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">Quên mật khẩu?</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
            size="large"
            @click="handleSubmit"
            :loading="loadingLogin"
            style="background: transparent"
          >
            Đăng nhập
          </a-button>

          <router-link class="play-now" :to="{ path: '/' }"
            >Xem phim ngay</router-link
          >
        </a-form-item>

        <div class="bottom-form">
          <p style="color: #fff">Hoặc</p>
          <router-link :to="{ name: 'signup' }">Dăng ký ngay!</router-link>
        </div>

        <div class="social-login">
          <el-button
            class="facebook-login-btn"
            @click="handleFacebookLogin"
            size="large"
            :loading="loadingFacebookLogin"
          >
            <el-icon class="el-icon--right">
              <Icon class="fa-facebook-f" name="fa6-brands:facebook-f" />

              <!-- <font-awesome-icon icon="fa-brands fa-facebook-f" /> -->
            </el-icon>
            <!-- <template #icon>
                  <font-awesome-icon icon="fa-brands fa-facebook-f" />
                </template> -->
            <span>Đăng nhập bằng Facebook</span>
          </el-button>

          <el-button
            class="google-login-btn"
            id="google-login-btn"
            size="large"
            :loading="loadingGoogleLogin"
            @click="handleGoogleLogin1"
          >
            <!-- <template #icon>
                  <img src="/images/socials/icons8-google-48.png" alt="" />
                </template> -->
            <el-icon class="el-icon--right">
              <img src="/images/socials/icons8-google-48.png" alt="" />
            </el-icon>
            <span>Đăng nhập bằng Google</span>
          </el-button>

          <!-- <el-button
              class="google-login-btn"
              id="google-login-btn1"
              size="large"
              :loading="loadingGoogleLogin"
            >
              <el-icon class="el-icon--right">
                <img src="/images/socials/icons8-google-48.png" alt="" />
              </el-icon>
              <span>Đăng nhập bằng Google</span>
            </el-button> -->

          <!-- <GoogleLogin
              :callback="handleGoogleLogin"
              prompt
              class="google-login-btn"
            /> -->
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
  // FacebookFilled,
} from '@ant-design/icons-vue';
import axios from 'axios';
// import md5 from 'md5';
import { signIn, loginFacebook, loginGoogle } from '@/services/MovieService';
import { setWithExpiry } from '@/utils/LocalStorage';
// import { googleAuthCodeLogin } from 'vue3-google-login';
import { ElNotification } from 'element-plus';
// import { notification } from 'ant-design-vue';
import { encryptPassword } from '@/utils/encrypt';

definePageMeta({
  layout: 'auth',
});

const store: any = useStore();
const loadingLogin = ref<boolean>(false);
const loadingFacebookLogin = ref<boolean>(false);
const loadingGoogleLogin = ref<boolean>(false);
const formState = reactive<any>({
  username: '',
  password: '',
  remember: false,
});
const tokenClient = ref<any>({});

const reset = () => {
  formState.username = '';
  formState.password = '';
  formState.remember = false;
};

useHead({
  title: 'Phimhay247 - Đăng nhập',
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
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formState.username) &&
    formState.password
  );
});

const handleSubmit = () => {
  loadingLogin.value = true;

  useAsyncData(
    `login/${formState.username}/${encryptPassword(formState.password)}`,
    () =>
      signIn({
        email: formState.username,
        password: encryptPassword(formState.password),
        // password: md5(formState.password),
        // user_token: randomToken(40),
      })
  )
    .then((response: any) => {
      if (response.data.value.data?.isLogin == true) {
        store.$state.isLogin = true;
        store.$state.userAccount = response.data.value.data?.result;
        store.$state.role = response.data.value.data?.result?.role;

        // window.localStorage.setItem('remember', formState.remember);

        if (formState.remember) {
          // window.localStorage.setItem(
          //   'userAccount',
          //   JSON.stringify({
          //     value: { user_token: response.data.value.headers.get('Authorization') },
          //   })
          // );

          setWithExpiry(
            'userAccount',
            { user_token: response.data.value.headers.get('Authorization') },
            30
          );
        } else {
          // setWithExpiry('isLogin', true, 30);
          setWithExpiry(
            'userAccount',
            { user_token: response.data.value.headers.get('Authorization') },
            30
          );
        }

        setTimeout(() => {
          loadingLogin.value = false;
          navigateTo({ path: '/' });
        }, 1000);
        // }

        reset();
      } else if (response.data.value.data?.isNotExist == true) {
        setTimeout(() => {
          loadingLogin.value = false;

          ElNotification.error({
            title: 'Lỗi!',
            message: 'Tài khoản không tồi tại.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red',
              }),
          });
        }, 1000);
      } else if (response.data.value.data?.isWrongPassword == true) {
        setTimeout(() => {
          loadingLogin.value = false;

          ElNotification.error({
            title: 'Lỗi!',
            message: 'Sai tài khoản hoặc mật khẩu.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red',
              }),
          });
        }, 1000);
      } else if (response.data.value.data.isLogin == false) {
        loadingLogin.value = false;
        ElNotification.error({
          title: 'Failed!',
          message: 'Some thing went wrong.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      }
    })
    .catch((e) => {
      loadingLogin.value = false;

      ElNotification.error({
        title: 'Failed!',
        message: 'Some thing went wrong.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    });
};

const handleFacebookLogin = async () => {
  const { authResponse }: any = await new Promise(window.FB.login);

  if (!authResponse) return;

  // const profileUser = await accountService.apiAuthenticate(
  //   authResponse.accessToken
  // );

  // console.log(profileUser);

  loadingFacebookLogin.value = true;

  useAsyncData(`login/facebook/${authResponse.accessToken}`, () =>
    loginFacebook({
      accessToken: authResponse.accessToken,
    })
  )
    .then((response: any) => {
      // console.log(response.data.value.data?.result);

      if (response.data.value.data.isSignUp == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Bạn đã đăng nhập bằng Facebook thành công tại Phimhay247.',
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });
        store.$state.userAccount = response.data.value.data?.result;
        store.$state.isLogin = true;

        setWithExpiry(
          'userAccount',
          { user_token: response.data.value.headers.get('Authorization') },
          30
        );

        loadingFacebookLogin.value = false;
        navigateTo({ path: '/' });
      } else if (response.data.value.data.isLogin == true) {
        store.$state.userAccount = response.data.value.data?.result;
        store.$state.isLogin = true;

        setWithExpiry(
          'userAccount',
          { user_token: response.data.value.headers.get('Authorization') },
          30
        );

        loadingFacebookLogin.value = false;
        navigateTo({ path: '/' });
      } else if (response.data.value.data.isLogin == false) {
        loadingFacebookLogin.value = false;
        ElNotification.error({
          title: 'Failed!',
          message: 'Some thing went wrong.',
          icon: () =>
            h(CloseCircleFilled, {
              style: 'color: red',
            }),
        });
      }
    })
    .catch((e) => {
      loadingFacebookLogin.value = false;

      ElNotification.error({
        title: 'Failed!',
        message: 'Some thing went wrong.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    });
};

onMounted(() => {
  const google = window.google;
  google.accounts.id.initialize({
    client_id:
      '973707203186-4f3sedatri213ib2f5j01ts0qj9c3fk0.apps.googleusercontent.com',
    callback: handleGoogleLogin,
  });

  // google.accounts.id.renderButton(
  //   document.getElementById('google-login-btn1') as HTMLElement,
  //   {
  //     theme: 'outline',
  //     size: 'large',
  //   }
  // );

  tokenClient.value = google.accounts.oauth2.initTokenClient({
    client_id:
      '973707203186-4f3sedatri213ib2f5j01ts0qj9c3fk0.apps.googleusercontent.com',
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    callback: (authResponse: any) => {
      if (authResponse && authResponse?.access_token) {
        loadingGoogleLogin.value = true;

        useAsyncData(`login/google/${authResponse?.access_token}`, () =>
          loginGoogle({
            accessToken: authResponse?.access_token,
          })
        )
          .then((response: any) => {
            if (response.data.value.data.isSignUp == true) {
              ElNotification.success({
                title: 'Thành công!',
                message:
                  'Bạn đã đăng nhập bằng Google thành công tại Phimhay247.',
                icon: () =>
                  h(CheckCircleFilled, {
                    style: 'color: green',
                  }),
              });

              store.$state.userAccount = response.data.value.data?.result;
              store.$state.isLogin = true;

              setWithExpiry(
                'userAccount',
                {
                  user_token: response.data.value.headers.get('Authorization'),
                },
                30
              );

              loadingGoogleLogin.value = false;
              navigateTo({ path: '/' });
            } else if (response.data.value.data.isLogin == true) {
              store.$state.userAccount = response.data.value.data?.result;
              store.$state.isLogin = true;

              setWithExpiry(
                'userAccount',
                {
                  user_token: response.data.value.headers.get('Authorization'),
                },
                30
              );

              loadingGoogleLogin.value = false;
              navigateTo({ path: '/' });
            } else if (response.data.value.data.isLogin == false) {
              loadingGoogleLogin.value = false;
              ElNotification.error({
                title: 'Failed!',
                message: 'Some thing went wrong.',
                icon: () =>
                  h(CloseCircleFilled, {
                    style: 'color: red',
                  }),
              });
            }
          })
          .catch((e) => {
            loadingGoogleLogin.value = false;

            ElNotification.error({
              title: 'Failed!',
              message: 'Some thing went wrong.',
              icon: () =>
                h(CloseCircleFilled, {
                  style: 'color: red',
                }),
            });
            if (axios.isCancel(e)) return;
          });
      }
    },
  });

  google.accounts.id.prompt();
});

const handleGoogleLogin = () => {
  tokenClient.value.requestAccessToken();
};
</script>

<style lang="scss" src="./LoginView.scss"></style>
