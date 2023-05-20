<template>
  <Icon name="ic:twotone-close" class="close" :class="class" />
</template>

<script setup lang="ts">
defineProps<{ class: string }>();
</script>

<style scoped lang="scss" src="./CloseBtn.scss"></style>
