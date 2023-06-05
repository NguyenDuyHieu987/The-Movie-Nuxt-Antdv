<template>
  <div class="comment-container">
    <h3 class="section-title">
      <span> Bình luận</span>
    </h3>
    <div
      class="fb-comments"
      :data-href="urlComment"
      data-width="100%"
      data-numposts="10"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ urlComment: string }>();
</script>
