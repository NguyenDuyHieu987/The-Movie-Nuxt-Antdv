<template>
  <div class="billboard-animation-container">
    <div
      class="overlay-backdrop"
      :style="`--dominant-backdrop-color: ${currenActiveItem.dominant_backdrop_color[0]}, ${currenActiveItem.dominant_backdrop_color[1]},${currenActiveItem.dominant_backdrop_color[2]}`"
    >
      <!-- <NuxtImg
        :src="getImage(currenActiveItem?.backdrop_path, 'backdrop', 'w-1200')"
        format="avif"
        loading="lazy"
        alt=""
      /> -->
    </div>

    <div class="variant-backdrop"></div>

    <!-- <el-carousel
      ref="billboard"
      class="billboard-slide"
      :class="{ loaded: loading }"
      :interval="7000"
      loop
      direction="vertical"
      arrow="always"
      :pause-on-hover="true"
      indicator-position="none"
      :initial-index="0"
      trigger="click"
      @change="handleChangeCarouel"
    >
      <el-carousel-item
        v-for="(item, index) in dataModel"
        :key="item.id"
        :index="index"
      >
        <BillboardItem :item="item" />
      </el-carousel-item>
    </el-carousel> -->

    <a-carousel
      ref="billboard"
      class="billboard-slide"
      :class="{ loaded: loading }"
      :arrows="false"
      infinite
      :autoplay="true"
      :pause-on-hover="true"
      effect="fade"
      :fade="true"
      :dots="false"
      :speed="500"
      :initial-slide="0"
    >
      <div
        class="billboard-slide-item"
        v-for="(item, index) in dataModel"
        :key="item.id"
        :index="index"
      >
        <BillboardItem :item="item" />
      </div>
    </a-carousel>

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
              width="2.5rem"
              height="2.5rem"
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
              width="2.5rem"
              height="2.5rem"
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

    <a-carousel
      class="carousel-preview-list"
      :class="{ loaded: loading }"
      :arrows="true"
      :infinite="false"
      :autoplay="false"
      :pause-on-hover="true"
      effect="scrollx"
      :dots="false"
      :initial-slide="0"
      :slides-to-show="5"
      :slides-to-scroll="5"
      :speed="100"
      :draggable="true"
      :swipe="true"
      :touch-move="true"
    >
      <div
        v-for="(item, index) in dataModel"
        :key="item.id"
        :index="index"
        class="carousel-preview-item"
      >
        <div class="img-box ratio-2-3">
          <NuxtImg
            :src="getImage(item?.poster_path, 'poster', 'w-200')"
            format="avif"
            loading="lazy"
            alt=""
          />
        </div>

        <div class="info">
          <p class="title">{{ item?.name }}</p>
        </div>
      </div>

      <template #prevArrow>
        <div class="slick-arrow prev">
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
        </div>
      </template>
      <template #nextArrow>
        <div class="slick-arrow next">
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
        </div>
      </template>
    </a-carousel>
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
const currenActiveItem = ref<any>(dataModel.value![0]);
const loading = ref<boolean>(false);

watch(dataModel, () => {
  if (dataModel.value) {
    prevItemCarousel.value =
      dataModel.value![dataModel.value!?.length - 1]?.name;
    nextItemCarousel.value = dataModel.value![1]?.name;
  }
});

onMounted(() => {
  loading.value = true;
});

const handleChangeCarouel = (activeIndex: number) => {
  currenActiveItem.value = dataModel.value![activeIndex];

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

const handleBeforeChangeCarouel = (activeIndex: number, to: number) => {
  currenActiveItem.value = dataModel.value![activeIndex];

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
