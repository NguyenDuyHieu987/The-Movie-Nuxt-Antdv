<template>
  <div class="back-page" :class="{ sticky: isSticky }">
    <a-button type="text" @click="emits('onclick')">
      <template #icon>
        <Icon name="ic:baseline-arrow-back" />
      </template>

      <slot />
    </a-button>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{ onclick: [] }>();

const isSticky = ref<boolean>(false);

onMounted(() => {
  window.onscroll = () => {
    if (window.scrollY >= 105) {
      isSticky.value = true;
    } else {
      isSticky.value = false;
    }
  };
});
</script>

<style lang="scss" src="./BackPage.scss"></style>
