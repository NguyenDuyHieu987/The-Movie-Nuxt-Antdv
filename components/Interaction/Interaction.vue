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

    <iframe
      :src="`https://www.facebook.com/plugins/like.php?href=${urlShare}&layout&action&size&share=true&height=35&appId`"
      width="100%"
      height="35"
      style="border: none; overflow: hidden"
      scrolling="no"
      frameborder="0"
      allowfullscreen="true"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe>

    <ShareNetwork
      network="facebook"
      :url="urlShare"
      :title="dataMovie?.name"
      :description="dataMovie?.overview"
      :quote="'Xem phim thỏa thích cùng Phimhay247'"
      hashtags="phimhay247.site"
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
