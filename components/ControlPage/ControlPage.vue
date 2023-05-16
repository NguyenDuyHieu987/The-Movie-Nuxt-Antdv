<template>
  <div class="control-page">
    <!-- <a-pagination
        v-model:current="page"
        :total="totalPage"
        :show-total="(total) => `Tổng ${total}`"
        :showSizeChanger="false"
        @change="onChangePage"
      /> -->

    <el-pagination
      :current-page="page"
      background
      layout="prev, pager, next, total"
      :total="totalPage"
      :pager-count="5"
      @current-change="onChangePage"
    />
  </div>
</template>

<script setup>
defineProps({
  page: {
    type: Number,
  },
  total: {
    type: Number,
    default: 100,
  },
  onChangePage: {
    type: Function,
  },
});
</script>

<style lang="scss" scoped src="./ControlPage.scss"></style>
