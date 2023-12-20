<template>
  <div
    class="comment-content"
    :class="{
      collapse: !isShowMore && commentContent.length > 8000,
      'show-more': isShowMore && commentContent.length > 8000,
    }"
    ref="commentContentEl"
  >
    <div class="comment-content-box">
      <slot name="replyTo"></slot>

      <!-- <p>{{ commentContent }}</p> -->

      <div class="formatted-comment" v-html="sanitizedHtmlComment"></div>
    </div>

    <span
      class="show-more"
      v-if="!isShowMore && commentContent.length > 8000"
      @click="isShowMore = true"
    >
      Đọc thêm
    </span>
    <span
      class="collapse"
      v-else-if="isShowMore && commentContent.length > 8000"
      @click="handleClickCollapse"
    >
      Thu gọn
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    sanitizedHtmlComment: string;
    commentContent: string;
  }>(),
  {
    sanitizedHtmlComment: '',
    commentContent: '',
  }
);

const commentContentEl = ref<HTMLElement>();
const isShowMore = ref<boolean>(false);

const handleClickCollapse = () => {
  isShowMore.value = false;
  commentContentEl.value?.scrollIntoView();
};
</script>

<style lang="scss" src="./CommentContent.scss"></style>
