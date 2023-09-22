<template>
  <a-result
    status="500"
    title="404 Not Found"
    sub-title="Ops!, Không thể tìm thấy trang này."
  >
    <template #extra>
      <a-button size="large" @click="$router.push({ path: '/' })"
        >Quay về trang chủ
      </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  setup() {
    document.title = 'Error - 404 Not Found';
  },
};
</script>

<style lang="scss" src="./Error404View.scss"></style>
