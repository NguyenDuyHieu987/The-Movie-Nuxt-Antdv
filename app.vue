<template>
  <div>
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

    <div class="app-wrapper">
      <NuxtLayout>
        <NuxtPage />

        <el-backtop class="app-back-top" :visibilityHeight="600">
          <font-awesome-icon icon="fa-solid fa-chevron-up" />
        </el-backtop>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { getUserToken } from '~/services/authentication';
import LoadingApp from '@/components/LoadingApp/LoadingApp.vue';

const store = useStore();
const utils = useUtils();
const router = useRouter();
const loadingHomePage = ref<boolean>(true);

const getData = async () => {
  if (utils.localStorage.getWithExpiry('userAccount')?.user_token) {
    getUserToken({
      user_token: utils.localStorage.getWithExpiry('userAccount')?.user_token,
    })
      .then((accountResponse: any) => {
        // console.log(accountResponse.data?.result);
        if (accountResponse?.isLogin == true) {
          store.$state.isLogin = true;
          store.$state.userAccount = accountResponse?.result;
          store.$state.role = accountResponse?.result?.role;
        } else {
          window.localStorage.removeItem('userAccount');
          window.localStorage.removeItem('userToken');
          window.localStorage.removeItem('remember');
          window.localStorage.removeItem('isLogin');
          store.$state.userAccount = {};
          store.$state.role = 'normal';
          store.$state.isLogin = false;
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

  setTimeout(() => {
    if (store.$state.loadingHomePage == false) {
      store.$state.loadingHomePage = true;
    }
    loadingHomePage.value = false;
  }, 2000);
};

onBeforeMount(() => {
  getData();
});
</script>

<style lang="scss" scoped src="./assets/style/app.scss"></style>
