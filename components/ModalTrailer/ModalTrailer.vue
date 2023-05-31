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
        :src="// dataMovie?.videos?.results?.length != 0
        //   ? `https://www.youtube.com/embed/${dataMovie?.videos?.results[0]?.key}` // Math.floor(Math.random() * dataMovie?.videos?.results?.length)
        //   :

        'https://www.youtube.com/embed/ndl1W4ltcmg'"
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
              <strong v-if="isEpisodes">
                {{ item?.name }}
                {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
              </strong>
              <strong v-else>
                {{ item?.name }}
              </strong>
            </h3>

            <p class="overview">
              {{ item?.overview }}
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
import axios from 'axios';
import { getMovieById } from '~/services/movie';
import { getTvById } from '~/services/tv';
import CloseBtn from '@/components/button/CloseBtn/CloseBtn.vue';

const props = defineProps<{
  isOpenModalTrailer: boolean;
  item: any;
  isEpisodes: boolean;
}>();

const emit = defineEmits<{ setIsTeleportModal: [data: boolean] }>();

const dataMovie = ref<any>({});
const loading = ref<boolean>(false);

const isTeleport = computed<boolean>({
  get() {
    return props.isOpenModalTrailer;
  },
  set(value: boolean) {
    emit('setIsTeleportModal', value);
  },
});

watch(isTeleport, async () => {
  if (props.isOpenModalTrailer == true) {
    if (props.isEpisodes) {
      await useAsyncData(`tv/short/${props.item?.id}`, () =>
        getTvById(props.item?.id)
      )
        .then((tvResponed: any) => {
          dataMovie.value = tvResponed.data.value.data;

          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
          if (axios.isCancel(e)) return;
        });
    } else {
      await useAsyncData(`movie/short/${props.item?.id}`, () =>
        getMovieById(props.item?.id)
      )
        .then((movieRespone: any) => {
          dataMovie.value = movieRespone.data.value.data;

          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
          if (axios.isCancel(e)) return;
        });
    }
  }
});
</script>

<style lang="scss" src="./ModalTrailer.scss"></style>
