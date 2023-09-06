<template>
  <div class="cast-item">
    <el-skeleton :loading="loading" animated class="cast-item">
      <template #template>
        <div class="img-box">
          <el-skeleton-item class="skeleton-img" />
        </div>
        <div class="content-skeleton">
          <el-skeleton-item variant="text" style="width: 70%" />
          <el-skeleton-item variant="text" style="width: 100%" />
        </div>
      </template>

      <template #default>
        <div class="img-box">
          <div class="ant-image">
            <img
              v-lazy="getPosterCast(item?.profile_path)"
              :lazy="true"
              loading="lazy"
              @load="onLoadImg"
            />
          </div>
        </div>

        <div class="info">
          <p class="name">
            {{ item?.name }}
          </p>
          <p v-if="type == 'cast'" class="character">
            {{ item?.character }}
          </p>
          <p v-else-if="type == 'crew'" class="job">
            {{ item?.job }}
          </p>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { getPosterCast } from '~/services/image';

const props = defineProps<{
  item: any;
  type: string;
}>();

const loading = ref<boolean>(false);

onBeforeMount(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 300);
});

const onLoadImg = (e: any) => {
  // const image = document.querySelector('.img-box img') as HTMLImageElement;
  // console.log(image.getAttribute('lazy'));
  // loading.value = image.getAttribute('lazy') == 'loading';
};
</script>
<style lang="scss" src="./CastCard.scss"></style>
