<template>
  <div>
    <!-- <OwlCarousel
      v-if="data?.length"
      class="carousel-group"
      :autoplay="true"
      :autoHeight="true"
      :stagePadding="0"
      :dots="false"
      :autoplayHoverPause="true"
      :autoplayTimeout="10000"
      :margin="7"
      :autoplaySpeed="500"
      :nav="false"
      :responsive="responsive"
    >
      <slot name="content" />

      <template #prev>
        <div class="owl-prev">
          <Icon name="bi:chevron-left"></Icon>
        </div>
      </template>
      <template #next>
        <div class="owl-next">
          <Icon name="bi:chevron-right"></Icon>
        </div>
      </template>
    </OwlCarousel> -->

    <Swiper
      class="carousel-group"
      :modules="[SwiperAutoplay, SwiperNavigation]"
      :breakpoints="responsive"
      :space-between="7"
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
