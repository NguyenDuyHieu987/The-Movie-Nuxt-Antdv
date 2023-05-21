<template>
  <div class="control-page">
    <a-pagination
      class="pagination"
      :current="page"
      :total="total"
      :pageSize="pageSize"
      :showSizeChanger="false"
      :responsive="true"
      @change="onChangePage"
    />
    <!-- :show-total="(total) => `Tổng ${total}`" -->

    <!-- <el-pagination
      :current-page="page"
      background
      layout="prev, pager, next, total"
      :total="total"
      :pager-count="5"
      @current-change="onChangePage"
    /> -->
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: {
    type: Number,
  },
  total: {
    type: Number,
    default: 100,
  },
  pageSize: {
    type: Number,
  },
  onChangePage: {
    type: Function,
  },
});
const modelValue = defineModel();
// console.log(modelValue);
</script>

<style lang="scss" src="./ControlPage.scss"></style>
