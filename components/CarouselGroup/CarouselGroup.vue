<template>
  <carousel
    v-if="data?.length"
    class="carousel-group"
    :items="5"
    :autoplay="true"
    :dots="true"
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
  </carousel>
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
