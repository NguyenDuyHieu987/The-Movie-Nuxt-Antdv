<template>
  <div id="app">
    <div class="app-wrapper error">
      <NuxtLayout>
        <a-result
          class="error-page"
          status="404"
          :title="`${error.statusCode} ${error.statusMessage}`"
        >
          <template #subTitle>
            <h3>Ops!, Không thể tìm thấy trang này.</h3>
          </template>
          <template #extra>
            <a-button
              @click="$router.back()"
              type="text"
              size="large"
              class="default"
            >
              Quay lại
            </a-button>

            <NuxtLink :to="{ path: '/' }">
              <a-button type="text" size="large" class="default gradient">
                Quay về trang chủ
              </a-button>
            </NuxtLink>
          </template>
        </a-result>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: any }>();

useHead({
  title: `Lỗi - ${props.error.statusCode}`,
  htmlAttrs: { lang: 'vi' },
});
</script>

<style lang="scss" src="~/assets/style/errorPage.scss"></style>
