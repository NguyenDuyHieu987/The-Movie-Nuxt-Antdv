<template>
  <div class="carousel-container">
    <a-carousel
      class="carousel-slick"
      ref="carouselSlick"
      :arrows="true"
      :infinite="false"
      :autoplay="false"
      :pause-on-hover="true"
      effect="scrollx"
      :dots="false"
      :initial-slide="0"
      :slides-to-show="5"
      :slides-to-scroll="5"
      :speed="200"
      :draggable="true"
      :swipe="true"
      :touch-move="true"
      :focus-on-select="false"
    >
      <slot name="content" />

      <template #prevArrow>
        <div class="slick-arrow prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.5rem"
            height="3.5rem"
            viewBox="0 0 320 512"
          >
            <path
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256L246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
        </div>
      </template>
      <template #nextArrow>
        <div class="slick-arrow next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.5rem"
            height="3.5rem"
            viewBox="0 0 320 512"
          >
            <path
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            />
          </svg>
        </div>
      </template>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: any[];
  responsive: any;
  gap?: number;
  cardMode?: 'horizontal' | 'vertical';
}>();
</script>

<style lang="scss" src="./SlickCarouselGroup.scss"></style>
