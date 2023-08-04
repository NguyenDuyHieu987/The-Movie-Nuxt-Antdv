<template>
  <div id="app">
    <ClientOnly>
      <vue-progress-bar
        style="
          background: linear-gradient(
            90deg,
            var(--loading-progress-bar1),
            var(--loading-progress-bar2),
            var(--loading-progress-bar3)
          );
        "
      />
    </ClientOnly>

    <SeoKit />
    <OgImageScreenshot />
    <OgImageStatic />

    <div class="app-wrapper">
      <LoadingApp />

      <RequireAuthDialog />

      <NuxtLayout>
        <NuxtPage />

        <el-backtop
          class="app-back-top click-active"
          :visibilityHeight="600"
          @click="onBackTop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 24 24"
          >
            <path
              d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"
            />
          </svg>
        </el-backtop>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { ElNotification } from 'element-plus';
import { getUserToken } from '~/services/authentication';
import LoadingApp from '~/components/LoadingApp/LoadingApp.vue';
import RequireAuthDialog from '~/components/RequireAuthDialog/RequireAuthDialog.vue';

const store = useStore();
const utils = useUtils();
const router = useRouter();
const loadingHomePage = ref<boolean>(true);

const getData = async () => {
  if (utils.localStorage.getWithExpiry('user_account')?.user_token) {
    store.isLogin = true;

    getUserToken({
      user_token: utils.localStorage.getWithExpiry('user_account')?.user_token,
    })
      .then((accountResponse: any) => {
        // console.log(accountResponse);

        if (accountResponse?.isLogin == true) {
          store.isLogin = true;
          store.userAccount = accountResponse?.result;
          store.role = accountResponse?.result?.role;
        } else {
          window.localStorage.removeItem('user_account');
          window.localStorage.removeItem('remember');
          window.localStorage.removeItem('is_login');
          store.userAccount = {};
          store.isLogin = false;
          store.role = 'normal';
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
      });
  }

  // setTimeout(() => {
  //   if (store.loadingApp == false) {
  //     store.loadingApp = true;
  //   }
  //   loadingApp.value = false;
  // }, 2000);
};

onBeforeMount(() => {
  getData();
});

const onBackTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
};
</script>

<style lang="scss" src="~/assets/style/app.scss"></style>
