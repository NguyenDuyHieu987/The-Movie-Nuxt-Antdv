<template>
  <div class="require-auth">
    <a-result
      class="result-view"
      title="Bạn cần đăng nhập để sử dụng chức năng này"
      status="403"
    >
      <template #extra>
        <a-button
          @click="$router.back()"
          type="text"
          size="large"
          class="default"
        >
          Quay lại
        </a-button>

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

<style lang="scss" src="./RequireAuth.scss"></style>
