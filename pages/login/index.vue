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
                // {
                //   message: 'Mật khẩu phải có ít nhất 6 ký tụ!',
                //   min: 6,
                //   trigger: ['change', 'blur'],
                // },
              },
            ]"
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

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox
                v-model:checked="formLogin.remember"
                style="user-select: none"
              >
                Ghi nhớ tôi
              </a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Quên mật khẩu?</a>
          </a-form-item>

          <a-form-item>
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
            <NuxtLink :to="{ name: 'signup' }">Dăng ký ngay!</NuxtLink>
          </div>

          <div class="social-login">
            <a-button
              class="facebook-login-btn"
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
              class="google-login-btn"
              id="google-login-btn"
              size="large"
              :loading="loadingGoogleLogin"
              @click="handleClickGoogleLogin"
            >
              <template #icon>
                <nuxt-img
                  :src="getImage('google.png', 'social_media')"
                  alt=""
                  loading="lazy"
                />
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
import { getImage } from '~/services/image';
import { LogIn, loginFacebook, loginGoogle } from '~/services/authentication';
// import { googleAuthCodeLogin } from 'vue3-google-login';
import { ElNotification } from 'element-plus';
import {
  UserOutlined,
  LockOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons-vue';

definePageMeta({
  layout: 'auth',
});

useHead({
  title: 'Đăng nhập | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Đăng nhập | Phimhay247',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Đăng nhập | Phimhay247',
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
  remember: false,
});
const tokenClient = ref<any>({});
const urlBack = computed(() =>
  ['/signup', '/oauth'].includes(router.options.history.state.back)
    ? '/'
    : router.options.history.state.back
);

const reset = () => {
  formLogin.username = '';
  formLogin.password = '';
  formLogin.remember = false;
};

const disabled = computed<boolean>((): boolean => {
  return !(
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formLogin.username) &&
    formLogin.password
  );
});

onBeforeMount(() => {
  // utils.initFacebookSdk();
});

onMounted(() => {
  // tokenClient.value = window.google?.accounts.oauth2.initTokenClient({
  //   client_id: nuxtConfig.app.googleOauth2ClientID,
  //   scope:
  //     'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  //   prompt: 'select_account',
  //   callback: handleGooglePopupCallback,
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
  // });
});

const handleLogin = () => {
  loadingLogin.value = true;

  LogIn({
    email: formLogin.username,
    password: utils.encryptPassword(formLogin.password),
    // password: md5(formLogin.password),
  })
    .then((response: any) => {
      if (response?.isLogin == true) {
        store.isLogin = true;
        store.userAccount = response?.result;
        store.role = response?.result?.role;

        utils.localStorage.setWithExpiry(
          'userAccount',
          { user_token: response.headers.get('Authorization') },
          30
        );

        // navigateTo({ path: '/' });

        navigateTo({ path: urlBack.value });

        reset();
      } else if (response?.isNotExist == true) {
        setTimeout(() => {
          ElNotification.error({
            title: 'Thất bại!',
            message: 'Tài khoản không tồi tại.',
            showClose: false,
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
            showClose: false,
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
        showClose: false,
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
  const { authResponse }: any = await new Promise(window.FB.login);
  if (!authResponse) return;

  loadingFacebookLogin.value = true;

  loginFacebook({
    accessToken: authResponse.accessToken,
  })
    .then((response: any) => {
      // console.log(response?.result);
      if (response.isSignUp == true) {
        ElNotification.success({
          title: 'Thành công!',
          message: 'Bạn đã đăng nhập bằng Facebook thành công tại Phimhay247.',
          showClose: false,
          icon: () =>
            h(CheckCircleFilled, {
              style: 'color: green',
            }),
        });
        store.userAccount = response?.result;
        store.isLogin = true;
        utils.localStorage.setWithExpiry(
          'userAccount',
          { user_token: response.headers.get('Authorization') },
          30
        );
        // navigateTo({ path: '/' });
        navigateTo({ path: urlBack.value });
      } else if (response.isLogin == true) {
        store.userAccount = response?.result;
        store.isLogin = true;
        utils.localStorage.setWithExpiry(
          'userAccount',
          { user_token: response.headers.get('Authorization') },
          30
        );
        // navigateTo({ path: '/' });
        navigateTo({ path: urlBack.value });
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
      loadingFacebookLogin.value = false;
    });
};

// const handleClickGoogleLogin = async () => {
//   // tokenClient.value.requestCode();
//   tokenClient.value.requestAccessToken();
// };

const handleClickGoogleLogin = () => {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  const form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  const params: any = {
    client_id: nuxtConfig.app.googleOauth2ClientID,
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    prompt: 'select_account',
    redirect_uri: 'http://localhost:3000/oauth/google',
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
      .then((response: any) => {
        if (response.isSignUp == true) {
          ElNotification.success({
            title: 'Thành công!',
            message: 'Bạn đã đăng nhập bằng Google thành công tại Phimhay247.',
            showClose: false,
            icon: () =>
              h(CheckCircleFilled, {
                style: 'color: green',
              }),
          });
          store.userAccount = response?.result;
          store.isLogin = true;
          utils.localStorage.setWithExpiry(
            'userAccount',
            {
              user_token: response.headers.get('Authorization'),
            },
            30
          );
          // navigateTo({ path: '/' });
          navigateTo({ path: urlBack.value });
        } else if (response.isLogin == true) {
          store.userAccount = response?.result;
          store.isLogin = true;
          utils.localStorage.setWithExpiry(
            'userAccount',
            {
              user_token: response.headers.get('Authorization'),
            },
            30
          );
          // navigateTo({ path: '/' });
          navigateTo({ path: urlBack.value });
        } else if (response.isLogin == false) {
          ElNotification.error({
            title: 'Thất bại!',
            message: 'Some thing went wrong.',
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
        loadingGoogleLogin.value = false;
      });
  }
};
</script>

<style lang="scss" src="./LoginPage.scss"></style>
