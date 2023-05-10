<template>
  <div class="slide-topic-home">
    <el-carousel
      :interval="5000"
      height="80vh"
      loop
      trigger="click"
      :pause-on-hover="true"
      indicator-position="none"
      arrow="always"
      class="topic-home-responsive"
      @change="handleSwitchCarouelResponsive"
    >
      <el-carousel-item
        v-for="(item, index) in trendings"
        :key="item.id"
        :index="index"
      >
        <SlideTopicItem :item="item" />
      </el-carousel-item>
    </el-carousel>

    <div class="overlay-backdrop">
      <img :src="getBackdrop(trendings[0]?.backdrop_path)" />
    </div>

    <el-carousel
      :interval="5000"
      type="card"
      height="80vh"
      loop
      trigger="click"
      :pause-on-hover="true"
      ref="topicHome"
      class="topic-home"
      @change="handleSwitchCarouel"
    >
      <el-carousel-item
        v-for="(item, index) in trendings"
        :key="item.id"
        :index="index"
      >
        <SlideTopicItem :item="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
import axios from 'axios';
import SlideTopicItem from '../SlideTopicItem/SlideTopicItem.vue';
import { getTrending, getBackdrop } from '@/services/MovieService';

// const trendings = ref([]);

const props = defineProps({
  trendings: {
    type: Array,
  },
});

onBeforeMount(async () => {
  // await useAsyncData('trending/all/1', () => getTrending(1))
  //   .then((response) => {
  //     trendings.value = response.data.value.data?.results;
  //   })
  //   .catch((e) => {
  //     if (axios.isCancel(e)) return;
  //   });
});

const handleSwitchCarouel = (e) => {
  const el_carousel_topic_home = document.querySelector(
    '.el-carousel.topic-home'
  );

  const index_silde_topic_item_active = el_carousel_topic_home.querySelector(
    '.el-carousel__item.is-active'
  );
  let index = +index_silde_topic_item_active.getAttribute('index') + 1;
  if (index == 11) {
    index = 0;
  }

  const img_silde_topic_item_active =
    el_carousel_topic_home.getElementsByClassName(
      'el-carousel__item is-active'
    )[0];

  const overlay_backdrop =
    document.getElementsByClassName('overlay-backdrop')[0];
  const img_overlay_backdrop = overlay_backdrop.querySelector('img');

  if (getComputedStyle(el_carousel_topic_home).display == 'block') {
    if (e == index) {
      if (index == 0) {
        img_overlay_backdrop.src = el_carousel_topic_home.querySelectorAll(
          '.el-carousel__item .el-image img'
        )[0].src;
      } else {
        if (img_silde_topic_item_active?.nextElementSibling) {
          img_overlay_backdrop.src =
            img_silde_topic_item_active.nextElementSibling.querySelector(
              '.el-image img'
            ).src;
        }
      }
    } else {
      if (e == 10) {
        img_overlay_backdrop.src = el_carousel_topic_home.querySelectorAll(
          '.el-carousel__item .el-image img'
        )[10].src;
      } else {
        if (img_silde_topic_item_active?.previousElementSibling) {
          img_overlay_backdrop.src =
            img_silde_topic_item_active.previousElementSibling.querySelector(
              '.el-image img'
            ).src;
        }
      }
    }
  }
};

const handleSwitchCarouelResponsive = (e) => {
  const el_carousel_topic_home_responsive = document.querySelector(
    '.el-carousel.topic-home-responsive'
  );

  const index_silde_topic_item_active =
    el_carousel_topic_home_responsive.querySelector(
      '.el-carousel__item.is-active'
    );
  let index = +index_silde_topic_item_active.getAttribute('index') + 1;
  if (index == 11) {
    index = 0;
  }

  const img_silde_topic_item_active =
    el_carousel_topic_home_responsive.getElementsByClassName(
      'el-carousel__item is-active'
    )[0];

  const overlay_backdrop =
    document.getElementsByClassName('overlay-backdrop')[0];
  const img_overlay_backdrop = overlay_backdrop.querySelector('img');

  if (getComputedStyle(el_carousel_topic_home_responsive).display == 'block') {
    if (e == index) {
      if (index == 0) {
        img_overlay_backdrop.src =
          el_carousel_topic_home_responsive.querySelectorAll(
            '.el-carousel__item .el-image img'
          )[0].src;
      } else {
        if (img_silde_topic_item_active?.nextElementSibling) {
          img_overlay_backdrop.src =
            img_silde_topic_item_active.nextElementSibling.querySelector(
              '.el-image img'
            ).src;
        }
      }
    } else {
      if (e == 10) {
        img_overlay_backdrop.src =
          el_carousel_topic_home_responsive.querySelectorAll(
            '.el-carousel__item .el-image img'
          )[10].src;
      } else {
        if (img_silde_topic_item_active?.previousElementSibling) {
          img_overlay_backdrop.src =
            img_silde_topic_item_active.previousElementSibling.querySelector(
              '.el-image img'
            ).src;
        }
      }
    }
  }
};
</script>
<style lang="scss" src="./SlideTopicHome.scss"></style>
