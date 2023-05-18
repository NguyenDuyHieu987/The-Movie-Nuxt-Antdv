<template>
  <div class="require-auth">
    <a-result title="Bạn cần đăng nhập để sử dụng chức năng này" status="404">
      <template #extra>
        <NuxtLink :to="{ path: '/login' }">
          <a-button class="log-in" size="large"> Đăng nhập ngay </a-button>
        </NuxtLink>
      </template>
    </a-result>
  </div>
</template>

<style scoped lang="scss" src="./RequireAuth.scss"></style>
