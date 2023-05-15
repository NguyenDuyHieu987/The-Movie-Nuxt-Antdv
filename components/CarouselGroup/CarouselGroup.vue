<template>
  <div>
    <!-- <OwlCarousel
      v-if="data?.length"
      class="carousel-group"
      :items="6"
      :slides-per-view="store.$state.collapsed ? 7 : 6"
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
      :slides-per-view="store.$state.collapsed ? 7 : 6"
      :slides-per-group="6"
      :breakpoints="responsive"
      :space-between="7"
      effect="creative"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }"
      :allow-slide-next="true"
      :allow-slide-prev="true"
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

<script setup>
const store = useStore();

defineProps({
  data: {
    type: Array,
  },
  responsive: {
    type: Object,
  },
});
</script>

<style lang="scss" src="./CarouselGroup.scss"></style>
