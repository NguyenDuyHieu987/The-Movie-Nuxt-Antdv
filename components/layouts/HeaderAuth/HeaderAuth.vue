<template>
  <header class="header-bar-auth">
    <div class="left-header">
      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <nuxt-img
            :src="getImage('logo.png', 'logo')"
            alt=""
            :height="30"
            :width="30"
          />
          <span> PhimHay247 </span>
        </NuxtLink>
      </div>
    </div>

    <div class="right-header">
      <div class="signup-suggest">
        <span v-if="route.path.toLowerCase() == '/login'" class="signup-note">
          Chưa có tài khoản?
        </span>
        <NuxtLink
          v-if="route.path == '/login'"
          class="signup-btn click-active"
          :to="{ path: '/signup' }"
        >
          <span> Đăng ký ngay</span>
        </NuxtLink>
      </div>

      <NuxtLink
        class="login-btn click-active"
        v-if="
          route.path.toLowerCase() == '/signup' ||
          route.path.toLowerCase() == '/forgotpassword'
        "
        :to="{ path: '/login' }"
      >
        Đăng nhập
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
import { storeToRefs } from 'pinia';

const store = useStore();
const { isLogin } = storeToRefs<any>(store);
const route = useRoute();

onMounted(() => {});
</script>

<style lang="scss" src="./HeaderAuth.scss"></style>
