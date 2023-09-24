<template>
  <div class="loading-section-vertical">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          v-for="(item, index) in 10"
          :index="index"
          :key="index"
          :item="item"
          class="skeleton-img"
        />
      </template>
      <template #default> <slot name="content" /> </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
const loading = defineModel<boolean>('loading', {
  default: true,
});
</script>

<style lang="scss" src="./LoadingSectionVertical.scss"></style>
