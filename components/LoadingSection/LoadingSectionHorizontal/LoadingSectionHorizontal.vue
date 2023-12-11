<template>
  <el-skeleton class="loading-section-horizontal" :loading="true" animated>
    <template #template>
      <div
        class="img-box"
        v-for="(item, index) in 6"
        :index="index"
        :key="index"
        :item="item"
      >
        <el-skeleton-item class="skeleton-img ratio-16-9" variant="image" />
      </div>
    </template>
    <template #default> <slot name="content" /> </template>
  </el-skeleton>
</template>

<script setup lang="ts">
const loading = defineModel<boolean>('loading', {
  default: true,
});
</script>

<style lang="scss" src="./LoadingSectionHorizontal.scss"></style>
