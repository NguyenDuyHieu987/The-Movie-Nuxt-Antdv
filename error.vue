<template>
  <div>
    <NuxtLayout>
      <Result status="404" :title="`${error.statusCode} Not Found`">
        <template #subTitle>
          <h2>Ops!, Không thể tìm thấy trang này.</h2>
        </template>
        <template #extra>
          <NuxtLink :to="{ path: '/' }">
            <a-button type="text" size="large" class="default gradient">
              Quay về trang chủ
            </a-button>
          </NuxtLink>
        </template>
      </Result>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { Result } from 'ant-design-vue';

defineProps(['error']);
useHead({
  title: 'Error - 404 Not Found',
  htmlAttrs: { lang: 'vi' },
});
</script>

<style lang="scss" src="~/assets/style/error404Page.scss" scoped></style>
