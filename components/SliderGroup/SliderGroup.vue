<template>
  <div class="slider-group">
    <div
      ref="silder"
      class="slider-group-wrapper"
      :class="{
        dragging: sliderState.isDragging,
      }"
      @pointerdown="onPointerDownSlider"
      @pointermove="onPointerMoveSlider"
      @pointerup="onPointerUpSlider"
      @scroll="onScollSlider"
    >
      <slot name="content" />
    </div>

    <!-- <div
      class="slider-button-prev"
      :class="{
        enable: sliderState.isScrollable && !sliderState.isStartScroll,
      }"
    ></div> -->

    <div
      class="slider-button-next"
      :class="{ disabled: sliderState.isEndScroll }"
    ></div>
  </div>
</template>

<script setup lang="ts">
const store = useStore();

const silder = ref();
const sliderState = reactive({
  isScrubbing: false,
  isDragging: false,
  isStartScroll: false,
  isScrollable: true,
  isEndScroll: false,
});

defineProps<{
  data: any[];
}>();

onMounted(() => {
  window.addEventListener('pointermove', (e: any) => {
    if (e.target.closest('.slider-group-wrapper')) {
      return;
    }

    onPointerMoveSlider(e);
  });

  window.addEventListener('pointerup', onPointerUpSlider);
});

const onPointerDownSlider = (e: any) => {
  sliderState.isScrubbing = true;
};

const onPointerMoveSlider = (e: any) => {
  if (sliderState.isScrubbing) {
    sliderState.isDragging = true;

    silder.value.scrollLeft -= e.movementX;
    handleArrows(silder.value.scrollLeft);
  }
};

const onPointerUpSlider = () => {
  sliderState.isScrubbing = false;
  sliderState.isDragging = false;
};

const handleArrows = (scrollVal: number) => {
  let maxScrollableWidth = silder.value.scrollWidth - silder.value.clientWidth;

  sliderState.isStartScroll = scrollVal <= 0;

  sliderState.isScrollable = scrollVal > 0;

  sliderState.isEndScroll = scrollVal == maxScrollableWidth;

  // arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? 'none' : 'flex';
  // arrowIcons[1].parentElement.style.display =
  //   maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex';
};

const onScollSlider = (e: any) => {
  handleArrows(silder.value.scrollLeft);
};
</script>

<style lang="scss" src="./SliderGroup.scss"></style>
