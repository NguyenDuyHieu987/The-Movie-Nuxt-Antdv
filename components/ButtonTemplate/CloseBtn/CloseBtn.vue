<template>
  <!-- <Icon name="ic:twotone-close" class="close" :class="class" /> -->

  <svg
    class="close click-active"
    :class="class"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({ class: { type: String } });
</script>

<style scoped lang="scss" src="./CloseBtn.scss"></style>
