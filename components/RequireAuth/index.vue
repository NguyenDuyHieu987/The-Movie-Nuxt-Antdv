<template>
  <div class="require-auth">
    <a-result
      class="result-view"
      title="Bạn cần đăng nhập để sử dụng chức năng này"
      status="403"
    >
      <template #extra>
        <NuxtLink to="/login">
          <a-button class="default gradient" size="large" type="text">
            Đăng nhập ngay
          </a-button>
        </NuxtLink>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss" src="./RequireAuth.scss"></style>
