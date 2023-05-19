<template>
  <div>
    <ClientOnly>
      <vue-progress-bar />
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
        <div class="logo"><h2>Phimhay247</h2></div>
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
  </div>
</template>

<script setup>
import axios from 'axios';
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { getUserToken } from '@/services/MovieService';
import { getWithExpiry } from '@/utils/LocalStorage';

// import { useStore } from '@/store/useStore';

const store = useStore();
const router = useRouter();
const route = useRoute();
const loadingHomePage = ref(true);

onBeforeMount(() => {
  // console.log(store.$state);

  if (getWithExpiry('userAccount')?.user_token) {
    getUserToken({ user_token: getWithExpiry('userAccount')?.user_token })
      .then((accountResponse) => {
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
  } else {
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
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--loading-background);

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
  height: 40px;
  width: 43px;
  line-height: 40px;
  border-radius: 5px;
  border: 1px solid #fff;
  background-color: var(--background-content-color1);
  color: #fff;
  text-align: center;
  font-size: 20px;
  box-shadow: 0 5px 4px 0 rgba(0, 0, 0, 0.26) !important;
  transition: all 0.25s;

  &:active {
    opacity: 0.8;
  }
}
</style>
