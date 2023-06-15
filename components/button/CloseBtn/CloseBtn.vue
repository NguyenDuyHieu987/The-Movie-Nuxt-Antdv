<template>
  <Icon name="ic:twotone-close" class="close" :class="class" />
</template>

<script setup lang="ts" scoped>
defineProps({ class: { type: String } });
</script>

<style scoped lang="scss" src="./CloseBtn.scss"></style>
