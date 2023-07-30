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
      <span v-if="route.path == '/login'" class="signup-note">
        Chưa có tài khoản?
      </span>
      <NuxtLink :to="route.path == '/login' ? '/signup' : '/login'">
        <span v-if="route.path == '/login'"> Đăng ký ngay</span>
        <span v-if="route.path == '/signup'"> Đăng nhập</span>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
import { storeToRefs } from 'pinia';
import _ from 'lodash';

const store = useStore();
const { isLogin } = storeToRefs<any>(store);

const route = useRoute();
onMounted(() => {});

watch(route, () => {
  console.log(route);
});
</script>

<style lang="scss" src="./HeaderAuth.scss"></style>
