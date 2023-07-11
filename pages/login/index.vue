<template>
  <div class="login-container">
    <div class="login-form-container">
      <a-form
        :model="formState"
        name="login-form"
        class="login-form"
        @submit="handleSubmit"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
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
            >
              Ghi nhớ tôi
            </a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Quên mật khẩu?</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            html-type="submit"
            class="login-form-button"
            size="large"
            :loading="loadingLogin"
            style="background: transparent"
          >
            Đăng nhập
          </a-button>

          <NuxtLink class="play-now" :to="{ path: '/' }"
            >Xem phim ngay</NuxtLink
          >
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
            @click="handleFacebookLogin"
          >
            <template #icon>
              <Icon class="fa-facebook-f" name="fa6-brands:facebook-f" />
            </template>
            <span>Đăng nhập bằng Facebook</span>
          </a-button>

          <a-button
            class="google-login-btn"
            id="google-login-btn"
            size="large"
            :loading="loadingGoogleLogin"
            @click="handleGoogleLogin"
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
} from '@ant-design/icons-vue';
import axios from 'axios';
import { getImage } from '~/services/image';
import { signIn, loginFacebook, loginGoogle } from '~/services/authentication';
// import { googleAuthCodeLogin } from 'vue3-google-login';
import { ElNotification } from 'element-plus';

definePageMeta({
  layout: 'auth',
});

useHead({
  title: 'Đăng nhập | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useSeoMeta({
  title: 'Đăng nhập | Phimhay247',
  description: 'Xem phim thỏa thích cùng Phimhay247',
  ogTitle: 'Đăng nhập | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Xem phim thỏa thích cùng Phimhay247',
  ogLocale: 'vi',
});

const store = useStore();
const router: any = useRouter();
const route = useRoute();
const utils = useUtils();
const loadingLogin = ref<boolean>(false);
const loadingFacebookLogin = ref<boolean>(false);
const loadingGoogleLogin = ref<boolean>(false);
const formState = reactive<any>({
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
  formState.username = '';
  formState.password = '';
  formState.remember = false;
};

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

  signIn({
    email: formState.username,
    password: utils.encryptPassword(formState.password),
    // password: md5(formState.password),
    // user_token: randomToken(40),
  })
    .then((response: any) => {
      if (response?.isLogin == true) {
        store.$state.isLogin = true;
        store.$state.userAccount = response?.result;
        store.$state.role = response?.result?.role;

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
            title: 'Lỗi!',
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
            title: 'Lỗi!',
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

const handleFacebookLogin = async () => {
  const { authResponse }: any = await new Promise(window.FB.login);

  if (!authResponse) return;

  // const profileUser = await accountService.apiAuthenticate(
  //   authResponse.accessToken
  // );

  // console.log(profileUser);

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
        store.$state.userAccount = response?.result;
        store.$state.isLogin = true;

        utils.localStorage.setWithExpiry(
          'userAccount',
          { user_token: response.headers.get('Authorization') },
          30
        );

        // navigateTo({ path: '/' });
        navigateTo({ path: urlBack.value });
      } else if (response.isLogin == true) {
        store.$state.userAccount = response?.result;
        store.$state.isLogin = true;

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
      loadingFacebookLogin.value = false;
    });
};

onBeforeMount(() => {
  utils.initFacebookSdk();
});

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id:
      '973707203186-4f3sedatri213ib2f5j01ts0qj9c3fk0.apps.googleusercontent.com',
    // ux_mode: 'redirect',
    callback: handleGooglePopupCallback,
  });

  // window.google.accounts.id.prompt();

  // window.google.accounts.id.renderButton(
  //   document.getElementById('google-login-btn') as HTMLElement,
  //   {
  //     theme: 'outline',
  //     size: 'large',
  //   }
  // );

  // console.log(route.query.code);

  tokenClient.value = window.google.accounts.oauth2.initTokenClient({
    client_id:
      '973707203186-4f3sedatri213ib2f5j01ts0qj9c3fk0.apps.googleusercontent.com',
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    // ux_mode: 'redirect',
    // select_account: true,
    // redirect_uri: window.location.origin + '/oauth/google',
    prompt: 'select_account',
    callback: handleGooglePopupCallback,
  });
});

const handleGoogleLogin = () => {
  // tokenClient.value.requestCode();
  tokenClient.value.requestAccessToken();
};

const handleGooglePopupCallback = (authResponse: any) => {
  if (authResponse && authResponse?.access_token) {
    loadingGoogleLogin.value = true;

    loginGoogle({
      accessToken: authResponse?.access_token,
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

          store.$state.userAccount = response?.result;
          store.$state.isLogin = true;

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
          store.$state.userAccount = response?.result;
          store.$state.isLogin = true;

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
            title: 'Lỗi!',
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
        loadingGoogleLogin.value = false;
      });
  }
};
</script>

<style lang="scss" src="./LoginPage.scss"></style>
