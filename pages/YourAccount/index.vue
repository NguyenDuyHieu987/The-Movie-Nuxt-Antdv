<template>
  <div class="your-account padding-content">
    <div v-if="isLogin" class="your-account-container">
      <Transition appear name="slide-bottom">
        <div v-show="showAnimation">
          <div class="your-account-header">
            <h1>Tài khoản của bạn</h1>
            <div class="join-since">
              <span>{{ 'Tham gia từ ' + joinSince }} </span>
            </div>
          </div>

          <section class="account-grid">
            <div class="account-grid-row info-account">
              <div class="row-label">
                <span>Thông tin tài khoản</span>
                <Teleport to="#bottom-zone" :disabled="!responesive">
                  <!-- <a-button
                    class="delete-account-btn"
                    type="text"
                    @click="deleteAccount"
                  >
                    Xóa tài khoản
                  </a-button> -->

                  <a-button
                    class="switch-account-btn click-active"
                    type="text"
                    @click="navigateTo('/login')"
                  >
                    Chuyển tài khoản
                  </a-button>
                </Teleport>
              </div>
              <div class="row-content">
                <div class="row-content-item">
                  <div class="left">
                    <span class="label">Tài khoản: </span>
                    <span> {{ userAccount?.username }}</span>
                  </div>
                </div>

                <div class="row-content-item">
                  <div class="left">
                    <span class="label">Họ và tên: </span>
                    <span> {{ userAccount?.full_name }}</span>
                  </div>
                </div>

                <div class="row-content-item">
                  <div class="left">
                    <span class="label">Email: </span>
                    <span>{{ userAccount?.email }}</span>
                  </div>
                  <div v-if="userAccount?.auth_type == 'email'" class="right">
                    <NuxtLink
                      class="click-active"
                      to="/YourAccount/ChangeEmail"
                    >
                      Thay đổi email
                    </NuxtLink>
                  </div>
                </div>

                <div
                  v-if="userAccount?.auth_type == 'email'"
                  class="row-content-item password"
                >
                  <div class="left">
                    <span class="label">Mật khẩu: </span>
                    <span>**********</span>
                  </div>
                  <div class="right">
                    <NuxtLink
                      class="click-active"
                      to="/YourAccount/ChangePassword"
                    >
                      Thay đổi mật khẩu
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <div class="account-grid-row">
              <div class="row-label">Thông tin gói dịch vụ</div>
              <div class="row-content">
                <div class="row-content-item">
                  <div class="left">
                    <span>Miên phí</span>
                  </div>
                  <div class="right">
                    <a-button
                      class="upgrade-btn click-active"
                      type="text"
                      @click="navigateTo('/upgrade/plans')"
                    >
                      Nâng cấp
                    </a-button>
                  </div>
                </div>
              </div>
            </div>

            <div class="account-grid-row">
              <div class="row-label">Lịch sử giao dịch</div>
              <div class="row-content">
                <div class="row-content-item">
                  <div class="left">
                    <span>Không có hóa đơn nào gần đây</span>
                  </div>

                  <div class="right">
                    <NuxtLink to="/bills"> Xem thêm </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="bottom-zone" class="bottom-zone">
            <a-button class="logout-btn click-active" type="text">
              <span @click="handleLogout">Đăng xuất</span>
            </a-button>
          </div>
        </div>
      </Transition>
    </div>

    <RequireAuth v-if="!isLogin" />
  </div>
</template>

<script setup lang="ts">
import RequireAuth from '@/components/RequireAuth/RequireAuth.vue';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import 'moment/locale/vi';
import { useBreakpoints } from '@vueuse/core';

definePageMeta({
  pageTransition: {
    name: 'slide-bottom',
  },
});

const store = useStore();
const utils = useUtils();
const { isLogin, userAccount } = storeToRefs<any>(store);
const breakPoints = useBreakpoints({
  responesive: 650,
});
const showAnimation = ref<boolean>(false);

const responesive = breakPoints.smallerOrEqual('responesive');

const joinSince = computed<string>(() =>
  moment(store.userAccount?.created_at)
    .locale('vi')
    .format('MMMM Do YYYY, h:mm a')
);

useHead({
  title: 'Profile - Hồ sơ | Phimhay247',
  htmlAttrs: { lang: 'vi' },
});

useServerSeoMeta({
  title: 'Profile - Hồ sơ | Phimhay247',
  description: 'Hồ sơ, thông tin cá nhân',
  ogTitle: 'Profile - Hồ sơ | Phimhay247',
  ogType: 'video.movie',
  // ogUrl: window.location.href,
  ogDescription: 'Hồ sơ, thông tin cá nhân',
  ogLocale: 'vi',
});

onBeforeMount(() => {
  setTimeout(() => {
    showAnimation.value = true;
  });
});

const deleteAccount = () => {
  utils.conrfirmMessageModal({
    title: 'Thông Báo',
    message: 'Bạn có muốn chắc muốn xóa tài khoản này?',
    okText: 'Có, Tôi chắc',
    onOk: async function () {
      // if (await ) {
      // }
    },
    onCancel() {},
  });
};

const handleLogout = () => {
  utils.auth.onLogOut();
};
</script>

<style lang="scss" src="./AccountPage.scss"></style>
