<template>
  <div class="require-auth">
    <a-result title="Bạn cần đăng nhập để sử dụng chức năng này" status="403">
      <template #extra>
        <NuxtLink :to="{ path: '/login' }">
          <GradientButton size="large"> Đăng nhập ngay </GradientButton>
        </NuxtLink>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import GradientButton from '@/components/button/GradientButton/GradientButton.vue';
</script>

<style scoped lang="scss" src="./RequireAuth.scss"></style>
