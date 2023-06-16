<template>
  <div class="viewmore-bar">
    <a-button
      class="viewmore-btn"
      type="text"
      shape="circle"
      size="large"
      @click="emits('clickBtn')"
    >
      <Icon v-if="!isOpen" name="ci:chevron-down" />
      <Icon v-else name="ci:chevron-big-up" />
    </a-button>

    <!-- <a-tooltip
              @click="viewMoreRecommend = !viewMoreRecommend"
              v-show="recommends.length"
              :teleported="false"
              :title="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
              :content="!viewMoreRecommend ? 'Hiện thêm' : 'Ẩn bớt'"
              placement="bottom"
            >
          
            </a-tooltip> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>();
const emits = defineEmits();
</script>

<style lang="scss" scoped src="./ViewMoreBar.scss"></style>
