<template>
  <div>
    <OwlCarousel
      v-if="data?.length"
      class="carousel-group"
      :items="5"
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
    </OwlCarousel>

    <!-- <ClientOnly>
      <SlickCarousel :arrows="true" :dots="true">
        <slot name="content" />
      </SlickCarousel>
    </ClientOnly> -->
  </div>
</template>

<script setup>
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
