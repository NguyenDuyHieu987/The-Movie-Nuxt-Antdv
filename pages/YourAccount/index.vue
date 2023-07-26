<template>
  <div class="your-account padding-content">
    <div class="your-account-container">
      <div class="your-account-header">
        <h1>Tài khoản</h1>
        <div class="join-since">
          <span>{{ 'Tham gia từ ' + joinSince }} </span>
        </div>
      </div>
      <h2>Username: {{ userAccount?.username }}</h2>
      <h3>Email: {{ userAccount?.email }}</h3>
      <h3>Fullname: {{ userAccount?.full_name }}</h3>
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
  moment(store.userAccount?.created_at).format('MMMM Do YYYY, h:mm:ss a')
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
  moment.locale('vi');

  console.log(moment.locale());
});
</script>

<style lang="scss" src="./AccountPage.scss"></style>
