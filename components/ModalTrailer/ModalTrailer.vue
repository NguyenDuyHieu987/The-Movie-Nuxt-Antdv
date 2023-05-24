<template>
  <Teleport v-if="isOpenModalTrailer" to="body">
    <a-modal
      v-model:visible="isTeleport"
      width="1300px"
      centered
      class="modal-trailer"
      :closable="false"
    >
      <CloseBtn @click="isTeleport = false" />

      <iframe
        height="650px"
        width="100%"
        :src="
          dataMovie?.videos?.results?.length != 0
            ? `https://www.youtube.com/embed/${
                dataMovie?.videos?.results[
                  Math.floor(Math.random() * dataMovie?.videos?.results?.length)
                ]?.key
              }`
            : 'https://www.youtube.com/embed/ndl1W4ltcmg'
        "
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="{0}"
      />
      <template #footer>
        <div class="content">
          <div class="info">
            <h3>
              <strong> {{ item?.name }}</strong>
            </h3>

            <p class="overview">
              {{ dataMovie?.overview }}
            </p>
          </div>
          <div class="action">
            <a-button
              class="default"
              size="large"
              type="text"
              @click="isTeleport = false"
            >
              Đóng
            </a-button>
            <NuxtLink
              v-if="isEpisodes"
              :to="{
                path: `/play/tv/${item?.id}/${item?.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}/tap-1`,
              }"
              class="btn-play-now"
            >
              Xem ngay
            </NuxtLink>
            <NuxtLink
              v-else-if="!isEpisodes"
              :to="{
                path: `/play/movie/${item?.id}/${item?.name
                  ?.replace(/\s/g, '+')
                  .toLowerCase()}`,
              }"
              class="btn-play-now"
            >
              Xem ngay
            </NuxtLink>
          </div>
        </div>
      </template>
    </a-modal>
  </Teleport>
</template>

<script setup lang="ts">
import CloseBtn from '@/components/button/CloseBtn/CloseBtn.vue';

const props = defineProps<{
  isOpenModalTrailer: boolean;
  item: any;
  dataMovie: any;
  isEpisodes: boolean;
}>();

const emit = defineEmits<{ setIsTeleportModal: [data: boolean] }>();

const isTeleport = computed<boolean>({
  get() {
    return props.isOpenModalTrailer;
  },
  set(value: boolean) {
    emit('setIsTeleportModal', value);
  },
});
</script>

<style lang="scss" src="./ModalTrailer.scss"></style>
