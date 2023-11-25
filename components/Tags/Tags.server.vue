<template>
  <div class="tags" :class="class">
    <label class="tags-label">{{ tagsLabel }}</label>
    <slot name="tagsInfo" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tagsLabel: string;
  link?: boolean | false;
  multiple?: boolean | false;
  class?: string;
}>();
</script>

<style lang="scss" scoped src="./Tags.scss"></style>
