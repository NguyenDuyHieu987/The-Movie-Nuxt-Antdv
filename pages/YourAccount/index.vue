<template>
  <div class="your-account padding-content">
    <div class="your-account-container">
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
            <a-button class="delete-account" type="text" @click="deleteAccount">
              Xóa tài khoản
            </a-button>
          </div>
          <div class="row-content">
            <div class="row-content-item">
              <div class="left">
                <span class="label">Username: </span>
                <span> {{ userAccount?.username }}</span>
              </div>
            </div>

            <div class="row-content-item">
              <div class="left">
                <span class="label">Email: </span>
                <span>{{ userAccount?.email }}</span>
              </div>
              <div v-show="userAccount?.auth_type == 'email'" class="right">
                <NuxtLink class="click-active" to="/ChangeEmail">
                  Thay đổi email
                </NuxtLink>
              </div>
            </div>

            <div class="row-content-item">
              <div class="left">
                <span class="label">Họ và tên: </span>
                <span> {{ userAccount?.full_name }}</span>
              </div>
              <div class="right">
                <NuxtLink class="click-active" to="/ChangeFullname">
                  Đổi tên mới
                </NuxtLink>
              </div>
            </div>

            <div class="row-content-item password">
              <div class="left">
                <span class="label">Mật khẩu: </span>
                <span>**********</span>
              </div>
              <div class="right">
                <NuxtLink class="click-active" to="/ChangePassword">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import moment from 'moment';
import 'moment/locale/vi';

const store = useStore();
const utils = useUtils();
const { userAccount } = storeToRefs<any>(store);

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

onBeforeMount(() => {});

const deleteAccount = () => {
  utils.conrfirmMessageModal({
    title: 'Thông Báo',
    message: 'Bạn có muốn chắc muốn xóa tài khoản này không?',
    onOk: async function () {
      // if (await ) {
      // }
    },
    onCancel() {},
  });
};
</script>

<style lang="scss" src="./AccountPage.scss"></style>
