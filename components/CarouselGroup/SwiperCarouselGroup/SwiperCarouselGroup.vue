<template>
  <div class="carousel-container">
    <Swiper
      class="carousel-group"
      :class="cardMode || 'horizontal'"
      :modules="[
        // SwiperAutoplay,
        SwiperNavigation,
        SwiperVirtual,
      ]"
      :breakpoints="responsive"
      :space-between="gap || 7"
      :rewind="true"
      :speed="500"
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
    >
      <slot name="content" />

      <div class="swiper-button-prev">
        <!-- <Icon name="bi:chevron-left"/> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5rem"
          height="3.5rem"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </div>
      <div class="swiper-button-next">
        <!-- <Icon name="bi:chevron-right"/> -->

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5rem"
          height="3.5rem"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </Swiper>
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

<style lang="scss" src="./SwiperCarouselGroup.scss"></style>
