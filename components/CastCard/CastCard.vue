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
          <div class="ant-image">
            <img
              v-lazy="getPosterCast(item?.profile_path)"
              :lazy="true"
              loading="lazy"
            />
          </div>
        </div>

        <div class="info">
          <p class="name">
            {{ item?.name }}
          </p>
          <p class="character">
            {{ item?.character }}
          </p>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { getPosterCast } from '~/services/appMovieService';

const props = defineProps<{
  item: any;
  loading: boolean;
}>();
</script>
<style lang="scss" src="./CastCard.scss"></style>
