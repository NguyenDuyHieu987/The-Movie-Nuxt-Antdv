<template>
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

  <div
    v-if="
      // $route.name == 'index' &&
      loadingHomePage && !store.$state.loadingHomePage
    "
    class="loading-page"
  >
    <div class="loading-page-container">
      <img src="/images/logo.png" alt="" />
      <div class="logo"><h2 class="animated">Phimhay247</h2></div>
    </div>
  </div>

  <div v-else class="app-wrapper">
    <NuxtLayout>
      <NuxtPage />

      <div id="components-back-top-demo-custom">
        <a-back-top class="ant-back-top-inner" :visibilityHeight="600">
          <font-awesome-icon icon="fa-solid fa-chevron-up" />
        </a-back-top>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { getUserToken } from '@/services/MovieService';
import { getWithExpiry } from '@/utils/LocalStorage';

const store: any = useStore();
const router = useRouter();
const route: any = useRoute();
const loadingHomePage = ref<boolean>(true);

onBeforeMount(() => {
  // console.log(store.$state);

  if (getWithExpiry('userAccount')?.user_token) {
    getUserToken({ user_token: getWithExpiry('userAccount')?.user_token })
      .then((accountResponse: any) => {
        // console.log(accountResponse.data?.result);
        if (accountResponse.data?.isLogin == true) {
          store.$state.isLogin = true;
          store.$state.userAccount = accountResponse.data?.result;
          store.$state.role = accountResponse.data?.result?.role;
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
        notification.open({
          message: 'Failed!',
          description: 'Some thing went wrong.',
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
      store.$state.loadingHomePage == true;
    }
    loadingHomePage.value = false;
  }, 2000);
});

// router.beforeResolve((to, from, next) => {
//   console.log(to);
// });
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1000px) {
  #components-back-top-demo-custom .ant-back-top {
    bottom: 30px !important;
    right: 30px !important;
  }
}

@media only screen and (max-width: 680px) {
  #components-back-top-demo-custom .ant-back-top {
    bottom: 20px !important;
    right: 20px !important;
  }
}
.app-wrapper {
  overflow: hidden;
}

.loading-page {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--loading-background);
  overflow: hidden;

  .loading-page-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    user-select: none;

    img {
      width: 64px;
      height: 64px;
    }

    // h3 {
    //   margin: 10px 0px;
    // }
  }
}

#components-back-top-demo-custom .ant-back-top {
  bottom: 40px;
  right: 40px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 45px;
  width: 45px;
  line-height: 45px;
  border-radius: 50%;
  border: 1px solid #fff;
  background-color: var(--background-content-color1);
  color: #fff;
  text-align: center;
  font-size: 20px;
  box-shadow: var(--box-shadow-small) !important;
  transition: all 0.25s;

  &:active {
    opacity: 0.8;
  }
}
</style>
