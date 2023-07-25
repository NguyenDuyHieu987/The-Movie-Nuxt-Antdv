<template>
  <div class="require-auth">
    <a-result title="Bạn cần đăng nhập để sử dụng chức năng này" status="403">
      <template #extra>
        <NuxtLink to="/login">
          <a-button size="large" type="text" class="default gradient">
            Đăng nhập ngay
          </a-button>
        </NuxtLink>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss" src="./RequireAuth.scss"></style>
