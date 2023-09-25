<template>
  <el-skeleton class="loading-section-horizontal" :loading="loading" animated>
    <template #template>
      <el-skeleton-item
        v-for="(item, index) in 6"
        :index="index"
        :key="index"
        :item="item"
        class="skeleton-img"
      />
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
