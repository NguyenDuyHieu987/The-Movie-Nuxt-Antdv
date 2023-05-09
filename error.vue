<template>
  <NuxtLayout>
    <a-result :status="500" :title="`${error.statusCode} Not Found`">
      <template #subTitle>
        <h3>Ops!, Không thể tìm thấy trang này.</h3></template
      >
      <template #extra>
        <NuxtLink :to="{ path: '/' }">
          <a-button size="large">Quay về trang chủ </a-button>
        </NuxtLink>
      </template>
    </a-result>
  </NuxtLayout>
</template>
<script setup>
defineProps(['error']);
useHead({
  title: 'Error - 404 Not Found',
  htmlAttrs: { lang: 'vi', amp: true },
});
</script>

<style lang="scss" src="./assets/style/Error404View.scss"></style>
