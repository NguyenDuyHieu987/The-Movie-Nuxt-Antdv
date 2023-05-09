<template>
  <a-result title="Bạn cần đăng nhập để sử dụng chức năng này">
    <template #extra>
      <NuxtLink :to="{ path: '/login' }">
        <a-button key="console" size="large"> Đăng nhập ngay </a-button>
      </NuxtLink>
    </template>
  </a-result>
</template>
