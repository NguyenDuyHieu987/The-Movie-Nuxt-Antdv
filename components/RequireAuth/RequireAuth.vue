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

<script setup>
import GradientButton from '@/components/button/GradientButton';
</script>

<style scoped lang="scss" src="./RequireAuth.scss"></style>
