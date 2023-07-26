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
        <div class="account-grid-row">
          <div class="row-label">Thông tin tài khoản</div>
          <div class="row-content">
            <div class="row-content-item">
              <div class="left">
                <span class="label">Email: </span>
                <span>{{ userAccount?.email }}</span>
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
                <span class="label">Username: </span>
                <span> {{ userAccount?.username }}</span>
              </div>
            </div>

            <div class="row-content-item password">
              <div class="left">
                <span class="label">Mật khẩu: </span>
                <span>**********</span>
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
                  >Nâng cấp</a-button
                >
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
</script>

<style lang="scss" src="./AccountPage.scss"></style>
