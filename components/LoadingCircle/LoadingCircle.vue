<template>
  <div class="loading-circle" :class="class">
    <Icon name="icon-park-outline:loading-four" />
  </div>
</template>

<script setup lang="ts">
defineProps({ class: { type: String } });
</script>

<style scoped lang="scss" src="./LoadingCircle.scss"></style>
