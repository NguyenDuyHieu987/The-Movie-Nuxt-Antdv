<template>
  <div class="loading-circle" :class="class">
    <Icon name="icon-park-outline:loading-four" class="loading-icon" />

    <!-- <Icon name="eos-icons:loading" /> -->
    <!-- <Icon name="line-md:loading-twotone-loop" /> -->
    <!-- <Icon name="line-md:loading-loop" /> -->
  </div>
</template>

<script setup lang="ts">
defineProps({ class: { type: String } });
</script>

<style lang="scss" src="./LoadingCircle.scss"></style>
