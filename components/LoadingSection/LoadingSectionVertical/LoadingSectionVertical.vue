<template>
  <el-skeleton class="loading-section-vertical" :loading="loading" animated>
    <template #template>
      <div
        class="skeleton-img"
        v-for="(item, index) in 10"
        :index="index"
        :key="index"
        :item="item"
      >
        <el-skeleton-item />
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

<style lang="scss" src="./LoadingSectionVertical.scss"></style>
