<template>
  <div class="slider-group">
    <slot name="content" />

    <div
      class="slider-button-next"
      :class="{ disabled: isEndScrollbrDrag }"
    ></div>
  </div>
</template>

<script setup lang="ts">
const store = useStore();
const isEndScrollbrDrag = ref<boolean>(false);

defineProps<{
  data: any[];
}>();

const onScrollbarDrag = (e: any) => {
  if (e.isEnd) {
    if (isEndScrollbrDrag.value == false) {
      isEndScrollbrDrag.value = true;
      return;
    }
  } else {
    if (isEndScrollbrDrag.value == true) {
      isEndScrollbrDrag.value = false;
      return;
    }
  }
};
</script>

<style lang="scss" src="./SliderGroup.scss"></style>
