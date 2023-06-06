<template>
  <div class="slider-container">
    <Swiper
      class="carousel-group"
      :modules="[
        // SwiperAutoplay,
        SwiperNavigation,
        SwiperVirtual,
      ]"
      :breakpoints="responsive"
      :space-between="0"
      effect="creative"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }"
      :autoplay="{
        delay: 10000,
        pauseOnMouseEnter: true,
        reverseDirection: true,
      }"
      :rewind="true"
      :speed="500"
    >
      <slot name="content" />
      <div class="swiper-button-prev">
        <Icon name="bi:chevron-left"></Icon>
      </div>
      <div class="swiper-button-next">
        <Icon name="bi:chevron-right"></Icon>
      </div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
const store = useStore();

defineProps<{
  data: any[];
  responsive: any;
}>();
</script>

<style lang="scss" src="./CarouselGroup.scss"></style>
