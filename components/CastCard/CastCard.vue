<template>
  <el-skeleton :loading="loading" animated class="cast-item">
    <template #template>
      <div class="cast-img-box">
        <el-skeleton-item class="ant-image" variant="image" />
      </div>
      <div style="margin-top: 7px">
        <el-skeleton-item variant="text" style="width: 90%" />
      </div>
    </template>

    <template #default>
      <div class="cast-item">
        <div class="cast-img-box">
          <!-- <el-image
            class="ant-image"
            :src="getPosterCast(item?.profile_path)"
            :preview="false"
            loading="lazy"
          >
            <template #error>
              <div
                class="el-image error"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 1.4rem;
                "
              >
                Đang tải<span class="dot">...</span>
              </div>
            </template>
            <template #placeholder>
              <div
                class="el-image error"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 1.4rem;
                "
              >
                Đang tải<span class="dot">...</span>
              </div>
            </template>
          </el-image> -->

          <img
            class="ant-image"
            v-lazy="getPosterCast(item?.profile_path)"
            :preview="false"
            loading="lazy"
          />
        </div>

        <div class="info">
          <p class="name">
            {{ item?.name ? item?.name : item?.title }}
          </p>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import { getPosterCast } from '@/services/MovieService';

const props = defineProps({
  item: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
});
</script>
<style lang="scss" src="./CastCard.scss"></style>
