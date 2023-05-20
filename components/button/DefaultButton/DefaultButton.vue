<template>
  <a-button>
    <template #icon>
      <slot name="icon" />
    </template>
    <slot />
  </a-button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss" src="./DefaultButton.scss"></style>
