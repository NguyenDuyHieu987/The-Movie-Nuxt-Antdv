<template>
  <div class="like-share">
    <div
      class="fb-like"
      :data-href="urlShare"
      data-width=""
      data-layout=""
      data-action=""
      data-size=""
      data-share="true"
    ></div>

    <ShareNetwork
      network="facebook"
      :url="urlShare"
      :title="dataMovie?.name"
      :description="dataMovie?.overview"
      hashtags="phimhay247.site,vite"
    >
      <a-button round type="primary" shape="round">
        <template #icon>
          <share-alt-outlined />
        </template>
        Chia sẻ
      </a-button>
    </ShareNetwork>
  </div>
</template>

<script setup lang="ts">
import { ShareAltOutlined } from '@ant-design/icons-vue';

const props = defineProps<{ dataMovie: any }>();
// const route = useRoute();

// alert(window.location.href);
const urlShare = computed<string>((): string => window.location.href);
// alert(encodeURIComponent(urlShare.value));
</script>

<style lang="scss" scoped src="./Interaction.scss"></style>
