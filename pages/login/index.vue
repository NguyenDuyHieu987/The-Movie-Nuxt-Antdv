<template>
  <div class="login">
    <div class="login-container">
      <div class="login-form-container">
        <a-form
          :model="formLogin"
          name="login-form"
          class="login-form"
          @finish="handleLogin"
          hideRequiredMark
        >
          <h1 class="title-login gradient-title-default">
            <span>Đăng nhập </span>
          </h1>

          <a-form-item
            label="Tài khoản"
            name="username"
            :rules="[
              {
                required: true,
                message: 'Vui lòng nhập email!',
                trigger: ['change', 'blur'],
              },
              {
                message:
                  'Vui lòng nhập đúng định dạng email (vd: ...@gmail.com)!',
                pattern: new RegExp(
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                ),
                trigger: ['change', 'blur'],
              },
            ]"
          >
            <a-input v-model:value="formLogin.username" placeholder="Email...">
              <template #prefix>
                <UserOutlined />
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
              // {
              //   message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
              //   min: 6,
              //   trigger: ['change', 'blur'],
              // },
            ]"
            has-feedback
          >
            <a-input-password
              v-model:value="formLogin.password"
              placeholder="Mật khẩu..."
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item class="remember-me" name="remember-me">
            <a-checkbox v-model:checked="formLogin.rememberMe">
              Ghi nhớ tôi
            </a-checkbox>
            <NuxtLink
              class="forgot-password-btn click-active"
              to="/ForgotPassword"
            >
              Quên mật khẩu?
            </NuxtLink>
          </a-form-item>

          <a-form-item class="submit" name="submit">
            <a-button
              class="login-form-button"
              html-type="submit"
              size="large"
              :loading="loadingLogin"
              :disabled="disabled"
            >
              Đăng nhập
            </a-button>

            <NuxtLink class="play-now" :to="{ path: '/' }">
              Xem phim ngay
            </NuxtLink>
          </a-form-item>

          <div class="bottom-form">
            <p>Hoặc</p>
          </div>

          <!-- <div class="separate"></div> -->

          <div class="social-login">
            <a-button
              class="facebook-login-btn click-active"
              size="large"
              :loading="loadingFacebookLogin"
              @click="handleClickFacebookLogin"
            >
              <template #icon>
                <svg
                  class="fa-facebook-f"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6rem"
                  height="1.6rem"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="m279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </template>
              <span>Đăng nhập bằng Facebook</span>
            </a-button>

            <a-button
              class="google-login-btn click-active"
              id="google-login-btn"
              size="large"
              :loading="loadingGoogleLogin"
              @click="handleClickGoogleLogin"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:v="https://vecta.io/nano"
                  width="1.6rem"
                  height="1.6rem"
                  viewBox="0 0 186.69 190.5"
                >
                  <g transform="translate(1184.583 765.171)">
                    <path
                      clip-path="none"
                      mask="none"
                      d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                      fill="#4285f4"
                    />
                    <path
                      clip-path="none"
                      mask="none"
                      d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                      fill="#34a853"
                    />
                    <path
                      clip-path="none"
                      mask="none"
                      d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                      fill="#fbbc05"
                    />
                    <path
                      d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                      fill="#ea4335"
                      clip-path="none"
                      mask="none"
                    />
                  </g>
                </svg>
              </template>
              <span>Đăng nhập bằng Google</span>
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ElNotification } from 'element-plus';
import { LogIn, loginFacebook, loginGoogle } from '~/services/authentication';
import {
  UserOutlined,
  LockOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons-vue';

definePageMeta({
  layout: 'auth',
  pageTransition: {
    name: 'slide-top',
  },
});

useHead({
  title: 'Đăng nhập',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Đăng nhập',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Đăng nhập',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi',
});

const nuxtConfig = useRuntimeConfig();
const store = useStore();
const router: any = useRouter();
const route = useRoute();
const utils = useUtils();
const loadingLogin = ref<boolean>(false);
const loadingFacebookLogin = ref<boolean>(false);
const loadingGoogleLogin = ref<boolean>(false);
const formLogin = reactive<any>({
  username: '',
  password: '',
  rememberMe: true,
});
const tokenClient = ref<any>();
const urlBack = computed(() =>
  router.options.history.state?.back
    ? [
        '/signup',
        '/oauth',
        '/forgotpassword',
        '/resetpassword',
        '/changeemail',
      ].some((item) =>
        router.options.history.state?.back.toLowerCase().startsWith(item)
      )
      ? '/'
      : router.options.history.state.back
    : '/'
);
const disabled = computed<boolean>((): boolean => {
  return !(
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formLogin.username) &&
    formLogin.password
  );
});

const reset = () => {
  formLogin.username = '';
  formLogin.password = '';
  formLogin.rememberMe = false;
};

onBeforeMount(() => {
  utils.initFacebookSdk();
  // utils.initGoogleGSIClient();
});

onMounted(async () => {
  // tokenClient.value = window.google?.accounts.oauth2.initTokenClient({
  //   client_id: nuxtConfig.app.googleOauth2ClientID,
  //   scope:
  //     'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  //   prompt: 'select_account',
  //   callback: handleGooglePopupCallback,
  //   use_fedcm_for_prompt: true,
  // });
  // tokenClient.value = window.google?.accounts.oauth2.initCodeClient({
  //   client_id: nuxtConfig.app.googleOauth2ClientID,
  //   scope:
  //     'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  //   ux_mode: 'popup',
  //   // select_account: true,
  //   redirect_uri: window.location.origin,
  //   prompt: 'select_account',
  //   callback: handleGooglePopupCallback,
  //   use_fedcm_for_prompt: true,
  // });
});

const handleLogin = () => {
  if (loadingLogin.value) return;

  loadingLogin.value = true;

  LogIn({
    email: formLogin.username,
    // password: utils.encryptPassword(formLogin.password),
    password: formLogin.password,
  })
    .then((response) => {
      if (response?.isLogin == true) {
        store.userAccount = response?.result;

        utils.localStorage.setWithExpiry(
          'user_token',
          response.headers.get('Authorization'),
          24
        );

        // navigateTo({ path: '/' });

        navigateTo({ path: urlBack.value });

        reset();
      } else if (response?.isNotExist == true) {
        setTimeout(() => {
          ElNotification.error({
            title: 'Thất bại!',
            message: 'Tài khoản không tồi tại.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red',
              }),
          });
        }, 1000);
      } else if (response?.isWrongPassword == true) {
        setTimeout(() => {
          ElNotification.error({
            title: 'Thất bại!',
            message: 'Sai tài khoản hoặc mật khẩu.',
            icon: () =>
              h(CloseCircleFilled, {
                style: 'color: red',
              }),
          });
        }, 1000);
      }
    })
    .catch((e) => {
      ElNotification.error({
        title: 'Failed!',
        message: 'Some thing went wrong.',
        icon: () =>
          h(CloseCircleFilled, {
            style: 'color: red',
          }),
      });
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loadingLogin.value = false;
    });
};

const handleClickFacebookLogin = async () => {
  const {
    authResponse,
    status,
  }: {
    authResponse: any;
    status: string;
  } = await new Promise(window.FB.login);

  if (!authResponse) return;

  loadingFacebookLogin.value = true;

  loginFacebook({
    accessToken: authResponse.accessToken,
  })
    .then((response) => {
      // console.log(response?.result);
      if (response.isSignUp == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Bạn đã đăng nhập bằng Facebook thành công tại Phimhay247.',
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });
        store.userAccount = response?.result;
        utils.localStorage.setWithExpiry(
          'user_token',
          response.headers.get('Authorization'),
          24
        );
        // navigateTo({ path: '/' });
        navigateTo({ path: urlBack.value });
      } else if (response.isLogin == true) {
        store.userAccount = response?.result;
        utils.localStorage.setWithExpiry(
          'user_token',
          response.headers.get('Authorization'),
          24
        );
        // navigateTo({ path: '/' });
        navigateTo({ path: urlBack.value });
      }
    })
    .catch((e) => {
      console.log(e);
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
      loadingFacebookLogin.value = false;
    });
};

// const handleClickGoogleLogin = async () => {
//   // tokenClient.value.requestCode();
//   tokenClient.value.requestAccessToken();
// };

const handleClickGoogleLogin = () => {
  let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  const form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.

  const params:
    | {
        client_id: number;
        scope: string;
        prompt: string;
        redirect_uri: string;
        response_type: string;
        include_granted_scopes: string;
      }
    | any = {
    client_id: nuxtConfig.app.googleOauth2ClientID,
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    prompt: 'select_account',
    redirect_uri: window.location.origin + '/oauth/google',
    response_type: 'token',
    include_granted_scopes: 'true',
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.

  document.body.appendChild(form);
  form.submit();
};

const handleGooglePopupCallback = (googleOauthResponse: any) => {
  // console.log(googleOauthResponse);

  if (googleOauthResponse && googleOauthResponse?.access_token) {
    loadingGoogleLogin.value = true;

    loginGoogle({
      accessToken: googleOauthResponse?.access_token,
    })
      .then((response) => {
        if (response.isSignUp == true) {
          ElNotification.success({
            title: 'Thành công!',
            message: 'Bạn đã đăng nhập bằng Google thành công tại Phimhay247.',
            icon: () =>
              h(CheckCircleFilled, {
                style: 'color: green',
              }),
          });
          store.userAccount = response?.result;
          utils.localStorage.setWithExpiry(
            'user_token',
            {
              user_token: response.headers.get('Authorization'),
            },
            24
          );
          // navigateTo({ path: '/' });
          navigateTo({ path: urlBack.value });
        } else if (response.isLogin == true) {
          store.userAccount = response?.result;
          utils.localStorage.setWithExpiry(
            'user_token',
            {
              user_token: response.headers.get('Authorization'),
            },
            24
          );
          // navigateTo({ path: '/' });
          navigateTo({ path: urlBack.value });
        } else if (response.isLogin == false) {
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
        loadingGoogleLogin.value = false;
      });
  }
};
</script>

<style lang="scss" src="./LoginPage.scss"></style>
