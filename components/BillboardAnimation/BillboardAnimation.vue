<template>
  <div class="billboard-animation-container">
    <!-- <div class="overlay-backdrop">
      <img :src="getBackdrop(trendings[0]?.backdrop_path)" />
    </div> -->
    <div class="variant-backdrop"></div>

    <el-carousel
      class="billboard-slide"
      :interval="7000"
      loop
      direction="vertical"
      arrow="always"
      :pause-on-hover="true"
      trigger="click"
      ref="billboard"
      @change="handleChangeCarouel"
    >
      <el-carousel-item
        v-for="(item, index) in dataModel"
        :key="item.id"
        :index="index"
      >
        <BillboardItem :item="item" />
      </el-carousel-item>

      <ClientOnly>
        <div class="carousel-arrow" v-show="dataModel?.length">
          <el-tooltip
            :teleported="false"
            :title="prevItemCarousel"
            :content="prevItemCarousel"
            popper-class="popper-tooltip"
            placement="top"
            :hide-after="0"
          >
            <a-button
              class="click-active"
              @click="billboard.prev()"
              size="large"
              type="text"
              shape="circle"
              aria-label="prev billboard"
            >
              <template #icon>
                <!-- <Icon name="fa6-solid:chevron-left"/> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.2rem"
                  height="2.2rem"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256L246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                  />
                </svg>
              </template>
            </a-button>
          </el-tooltip>

          <el-tooltip
            :teleported="false"
            :title="nextItemCarousel"
            :content="nextItemCarousel"
            popper-class="popper-tooltip"
            placement="top"
            :hide-after="0"
          >
            <a-button
              class="click-active"
              @click="billboard.next()"
              size="large"
              type="text"
              shape="circle"
              aria-label="next billboard"
            >
              <template #icon>
                <!-- <Icon name="fa6-solid:chevron-right"/> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.2rem"
                  height="2.2rem"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  />
                </svg>
              </template>
            </a-button>
          </el-tooltip>
        </div>
      </ClientOnly>
    </el-carousel>
  </div>
</template>
<script setup lang="ts">
// import { ElCarousel, ElCarouselItem, ElTooltip } from 'element-plus';
import BillboardItem from '~/components/BillboardItem/BillboardItem.vue';

const props = defineProps<{ data1: any[] }>();

const billboard = ref();
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
