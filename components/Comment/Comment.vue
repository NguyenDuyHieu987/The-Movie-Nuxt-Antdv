<template>
  <div class="comment" id="comment">
    <h2 class="gradient-title-default">Bình luận</h2>
    <div class="comment-body">
      <!-- <div
        class="fb-comments"
        :data-href="urlComment"
        data-width="100%"
        data-numposts="10"
      ></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  dataMovie: any;
  urlComment: string;
}>();
</script>

<style lang="scss" src="./Comment.scss"></style>
