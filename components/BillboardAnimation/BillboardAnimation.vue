<template>
  <div class="billboard-animation-container">
    <div class="overlay-backdrop">
      <NuxtImg
        :src="getImage(currenImage, 'backdrop', 'w-1200')"
        format="avif"
        loading="lazy"
        alt=""
      />
    </div>

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
import { getImage } from '~/services/image';
// import { ElCarousel, ElCarouselItem, ElTooltip } from 'element-plus';
import BillboardItem from '~/components/BillboardItem/BillboardItem.vue';

const billboard = ref();
// const data = ref<any[]>([]);
const prevItemCarousel = ref<string>('');
const nextItemCarousel = ref<string>('');
const dataModel = defineModel<any[]>('data');
const currenImage = ref<string>(dataModel.value![0]?.backdrop_path);

watch(dataModel, () => {
  if (dataModel.value) {
    prevItemCarousel.value =
      dataModel.value![dataModel.value!?.length - 1]?.name;
    nextItemCarousel.value = dataModel.value![1]?.name;
  }
});

const handleChangeCarouel = (activeIndex: number) => {
  currenImage.value = dataModel.value![activeIndex]?.backdrop_path;

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
</script>
<style lang="scss" src="./BillboardAnimation.scss"></style>
