<template>
  <div class="cast-crew">
    <a-tabs v-model:activeKey="activeTabCast" v-show="dataCredit?.cast?.length">
      <a-tab-pane key="cast" tab="Diễn viên">
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
      <a-tab-pane key="crew" tab="Đội ngũ" force-render>
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

<script setup lang="ts">
import CastCard from '@/components/CastCard/CastCard.vue';
import CarouselGroup from '@/components/CarouselGroup/CarouselGroup.vue';

defineProps<{
  dataCredit: any;
  loading: boolean;
}>();

const activeTabCast = ref<string>('cast');
// const responsiveCarousel = ref<any>({
//   0: {
//     items: 2,
//     slideBy: 2,
//   },
//   520: {
//     items: 3,
//     slideBy: 3,
//   },
//   750: {
//     items: 4,
//     slideBy: 4,
//   },
//   830: {
//     items: 4,
//     slideBy: 4,
//   },
//   1000: {
//     items: 5,
//     slideBy: 5,
//   },
//   1175: {
//     items: 6,
//     slideBy: 6,
//   },
//   1300: {
//     items: 7,
//     slideBy: 7,
//   },
//   1400: {
//     items: 7,
//     slideBy: 7,
//   },
//   1500: {
//     items: 8,
//     slideBy: 8,
//   },
//   1700: {
//     items: 9,
//     slideBy: 9,
//   },
//   2000: {
//     items: 10,
//     slideBy: 10,
//   },
//   2200: {
//     items: 12,
//     slideBy: 12,
//   },
// });

const responsiveCarousel = ref<any>({
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
  },
  500: {
    slidesPerView: 3,
    slidesPerGroup: 3,
  },
  650: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1000: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1100: {
    slidesPerView: 5,
    slidesPerGroup: 5,
  },
  1400: {
    slidesPerView: 6,
    slidesPerGroup: 6,
  },
  1550: {
    slidesPerView: 7,
    slidesPerGroup: 7,
  },
  1700: {
    slidesPerView: 8,
    slidesPerGroup: 8,
  },
});
</script>

<style lang="scss" scoped src="./CastCrew.scss"></style>
