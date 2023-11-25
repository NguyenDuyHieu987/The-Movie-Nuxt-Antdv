<template>
  <NuxtLayout>
    <a-result
      class="error-page"
      status="404"
      :title="`${error.statusCode} Not Found`"
    >
      <template #subTitle>
        <h3>Ops!, Không thể tìm thấy trang này.</h3>
      </template>
      <template #extra>
        <NuxtLink :to="{ path: '/' }">
          <a-button type="text" size="large" class="default gradient">
            Quay về trang chủ
          </a-button>
        </NuxtLink>
      </template>
    </a-result>
  </NuxtLayout>
</template>
<script setup lang="ts">
defineProps(['error']);
useHead({
  title: 'Error - 404 Not Found',
  htmlAttrs: { lang: 'vi' },
});
</script>

<style lang="scss" src="~/assets/style/error404Page.scss"></style>
