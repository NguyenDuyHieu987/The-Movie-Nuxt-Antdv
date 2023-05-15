<template>
  <div class="cast-crew">
    <a-tabs v-model:activeKey="activeTabCast" v-show="dataCredit?.cast?.length">
      <a-tab-pane key="1" tab="Diễn viên">
        <CarouselGroup
          :data="dataCredit?.cast?.slice(0, 20)"
          :responsive="responsiveCarousel"
        >
          <template #content>
            <SwiperSlide
              v-for="(item, index) in dataCredit?.cast?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                :loading="loading"
              />
            </SwiperSlide>
          </template>
        </CarouselGroup>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Đội ngũ" force-render>
        <CarouselGroup
          :data="dataCredit?.crew?.slice(0, 20)"
          :responsive="responsiveCarousel"
        >
          <template #content>
            <SwiperSlide
              v-for="(item, index) in dataCredit?.crew?.slice(0, 20)"
            >
              <CastCard
                :item="item"
                :index="index"
                :key="item.id"
                :loading="loading"
              />
            </SwiperSlide>
          </template>
        </CarouselGroup>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import CastCard from '@/components/CastCard/CastCard.vue';
import CarouselGroup from '@/components/CarouselGroup/CarouselGroup.vue';

defineProps({
  dataCredit: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
});

const activeTabCast = ref('1');
const responsiveCarousel = ref({
  0: {
    items: 2,
    slideBy: 2,
  },
  520: {
    items: 3,
    slideBy: 3,
  },
  750: {
    items: 4,
    slideBy: 4,
  },
  830: {
    items: 4,
    slideBy: 4,
  },
  1000: {
    items: 5,
    slideBy: 5,
  },
  1175: {
    items: 6,
    slideBy: 6,
  },
  1300: {
    items: 7,
    slideBy: 7,
  },
  1400: {
    items: 7,
    slideBy: 7,
  },
  1500: {
    items: 8,
    slideBy: 8,
  },
  1700: {
    items: 9,
    slideBy: 9,
  },
  2000: {
    items: 10,
    slideBy: 10,
  },
  2200: {
    items: 12,
    slideBy: 12,
  },
});
</script>

<style lang="scss" scoped src="./CastCrew.scss"></style>
