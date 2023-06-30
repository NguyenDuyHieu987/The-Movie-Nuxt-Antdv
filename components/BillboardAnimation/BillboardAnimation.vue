<template>
  <div class="billboard-animation-container">
    <!-- <div class="overlay-backdrop">
      <img :src="getBackdrop(trendings[0]?.backdrop_path)" />
    </div> -->
    <div class="variant-backdrop"></div>

    <el-carousel
      :interval="7000"
      loop
      direction="vertical"
      arrow="always"
      :pause-on-hover="false"
      trigger="click"
      ref="billboard"
      class="billboard-slide"
      @change="handleChangeCarouel"
    >
      <el-carousel-item
        v-for="(item, index) in dataModel"
        :key="item.id"
        :index="index"
      >
        <BillboardItem :item="item" />
      </el-carousel-item>

      <div class="carousel-arrow" v-show="dataModel?.length">
        <el-tooltip
          :teleported="false"
          :title="prevItemCarousel"
          :content="prevItemCarousel"
          popper-class="el-tooltip"
          placement="top"
        >
          <a-button
            @click="billboard.prev()"
            size="large"
            type="text"
            shape="circle"
          >
            <template #icon>
              <Icon name="fa6-solid:chevron-left"></Icon>
            </template>
          </a-button>
        </el-tooltip>

        <el-tooltip
          :teleported="false"
          :title="nextItemCarousel"
          :content="nextItemCarousel"
          popper-class="el-tooltip"
          placement="top"
        >
          <a-button
            @click="billboard.next()"
            size="large"
            type="text"
            shape="circle"
          >
            <template #icon>
              <Icon name="fa6-solid:chevron-right"></Icon>
            </template>
          </a-button>
        </el-tooltip>
      </div>
    </el-carousel>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import BillboardItem from '../BillboardItem/BillboardItem.vue';
import { getTrending } from '~/services/trending';
import { ElCarousel, ElCarouselItem, ElTooltip } from 'element-plus';

const props = defineProps<{ data1: any[] }>();

const billboard = ref<any>();
// const data = ref<any[]>([]);
const prevItemCarousel = ref<string>('');
const nextItemCarousel = ref<string>('');
const dataCompute = computed<any[]>(() => props.data1);
const dataModel = defineModel<any[]>('data');

onBeforeMount(() => {});

watch(dataModel, () => {
  if (dataModel.value) {
    prevItemCarousel.value =
      dataModel.value![dataModel.value!?.length - 1]?.name;
    nextItemCarousel.value = dataModel.value![1]?.name;
  }
});

const handleChangeCarouel = (activeIndex: number) => {
  if (activeIndex == dataModel.value!?.length - 1) {
    prevItemCarousel.value = dataModel.value![activeIndex - 1]?.name;
    nextItemCarousel.value = dataModel.value![0]?.name;
  } else if (activeIndex == 0) {
    prevItemCarousel.value =
      dataModel.value![dataModel.value!?.length - 1]?.name;
    nextItemCarousel.value = dataModel.value![activeIndex + 1]?.name;
  } else {
    prevItemCarousel.value = dataModel.value![activeIndex - 1]?.name;
    nextItemCarousel.value = dataModel.value![activeIndex + 1]?.name;
  }
};

// const handleSwitchCarouel = (activeIndex: number) => {
//   const el_carousel_topic_home = document.querySelector(
//     '.el-carousel.topic-home'
//   ) as HTMLElement;

//   const index_silde_topic_item_active = el_carousel_topic_home?.querySelector(
//     '.el-carousel__item.is-active'
//   ) as HTMLElement;

//   let index = +index_silde_topic_item_active!.getAttribute('index')! + 1;
//   if (index == 11) {
//     index = 0;
//   }

//   const img_silde_topic_item_active =
//     el_carousel_topic_home.getElementsByClassName(
//       'el-carousel__item is-active'
//     )[0] as HTMLElement;

//   const overlay_backdrop = document.getElementsByClassName(
//     'overlay-backdrop'
//   )[0] as HTMLElement;
//   const img_overlay_backdrop = overlay_backdrop.querySelector(
//     'img'
//   ) as HTMLImageElement;

//   if (getComputedStyle(el_carousel_topic_home).display == 'block') {
//     if (activeIndex == index) {
//       if (index == 0) {
//         img_overlay_backdrop.src =
//           el_carousel_topic_home.querySelectorAll<HTMLImageElement>(
//             '.el-carousel__item .el-image'
//           )[0].src;
//       } else {
//         if (img_silde_topic_item_active?.nextElementSibling) {
//           img_overlay_backdrop.src =
//             img_silde_topic_item_active.nextElementSibling.querySelector<HTMLImageElement>(
//               '.el-image'
//             )!.src;
//         }
//       }
//     } else {
//       if (activeIndex == 10) {
//         img_overlay_backdrop.src =
//           el_carousel_topic_home.querySelectorAll<HTMLImageElement>(
//             '.el-carousel__item .el-image'
//           )[10].src;
//       } else {
//         if (img_silde_topic_item_active?.previousElementSibling) {
//           img_overlay_backdrop.src =
//             img_silde_topic_item_active.previousElementSibling.querySelector<HTMLImageElement>(
//               '.el-image'
//             )!.src;
//         }
//       }
//     }
//   }
// };

// const handleSwitchCarouelResponsive = (activeIndex: number) => {
//   const el_carousel_topic_home_responsive = document.querySelector(
//     '.el-carousel.topic-home-responsive'
//   ) as HTMLElement;

//   const index_silde_topic_item_active =
//     el_carousel_topic_home_responsive.querySelector(
//       '.el-carousel__item.is-active'
//     ) as HTMLElement;

//   let index = +index_silde_topic_item_active!.getAttribute('index')! + 1;
//   if (index == 11) {
//     index = 0;
//   }

//   const img_silde_topic_item_active =
//     el_carousel_topic_home_responsive.getElementsByClassName(
//       'el-carousel__item is-active'
//     )[0];

//   const overlay_backdrop = document.getElementsByClassName(
//     'overlay-backdrop'
//   )[0] as HTMLElement;
//   const img_overlay_backdrop = overlay_backdrop.querySelector(
//     'img'
//   ) as HTMLImageElement;

//   if (getComputedStyle(el_carousel_topic_home_responsive).display == 'block') {
//     if (activeIndex == index) {
//       if (index == 0) {
//         img_overlay_backdrop.src =
//           el_carousel_topic_home_responsive.querySelectorAll<HTMLImageElement>(
//             '.el-carousel__item .el-image img'
//           )[0].src;
//       } else {
//         if (img_silde_topic_item_active?.nextElementSibling) {
//           img_overlay_backdrop.src =
//             img_silde_topic_item_active.nextElementSibling.querySelector<HTMLImageElement>(
//               '.el-image img'
//             )!.src;
//         }
//       }
//     } else {
//       if (activeIndex == 10) {
//         img_overlay_backdrop.src =
//           el_carousel_topic_home_responsive.querySelectorAll<HTMLImageElement>(
//             '.el-carousel__item .el-image img'
//           )[10].src;
//       } else {
//         if (img_silde_topic_item_active?.previousElementSibling) {
//           img_overlay_backdrop.src =
//             img_silde_topic_item_active.previousElementSibling.querySelector<HTMLImageElement>(
//               '.el-image img'
//             )!.src;
//         }
//       }
//     }
//   }
// };
</script>
<style lang="scss" src="./BillboardAnimation.scss"></style>
