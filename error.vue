<template>
  <div>
    <NuxtLayout>
      <a-result status="404" :title="`${error.statusCode} Not Found`">
        <template #subTitle>
          <h2>Ops!, Không thể tìm thấy trang này.</h2>
        </template>
        <template #extra>
          <NuxtLink :to="{ path: '/' }">
            <GradientButton>Quay về trang chủ </GradientButton>
          </NuxtLink>
        </template>
      </a-result>
    </NuxtLayout>
  </div>
</template>
<script setup>
import GradientButton from '@/components/button/GradientButton';
defineProps(['error']);
useHead({
  title: 'Error - 404 Not Found',
  htmlAttrs: { lang: 'vi', amp: true },
});
</script>

<style lang="scss" src="./assets/style/Error404View.scss" scoped></style>
