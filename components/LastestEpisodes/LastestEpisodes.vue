<template>
  <div class="lastest-episodes">
    <label class="label">Tập mới nhất: </label>

    <ul v-show="dataEpisode?.length" class="list-lastest-episodes">
      <li
        v-for="(item, index) in dataEpisode?.slice(-7).reverse()"
        :index="index"
        :key="index"
      >
        <NuxtLink
          :to="{
            path: `/play-tv/${dataMovie?.id}__${dataMovie?.name
              ?.replace(/\s/g, '-')
              .toLowerCase()}/tap-${item?.episode_number}`,
          }"
        >
          {{ 'Tập ' }}
          {{
            item?.episode_number == numberOfEpisodes
              ? item?.episode_number < 10
                ? '0' + item?.episode_number + ' - End'
                : item?.episode_number + ' - End'
              : +item?.episode_number < 10
              ? '0' + item?.episode_number
              : item?.episode_number
          }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getSeason } from '~/services/season';
import axios from 'axios';

const props = defineProps({
  dataMovie: {
    type: Object,
  },
  numberOfEpisodes: {
    type: Number,
  },
  loading: {
    type: Boolean,
  },
});

const dataSeason = ref<any>(props.dataMovie);
const dataEpisode = ref<any[]>([]);
const loading = ref<boolean>(false);

onBeforeMount(async () => {
  loading.value = true;

  await useAsyncData(
    `season/${props.dataMovie?.id}/${props?.dataMovie?.season_id}`,
    () => getSeason(props.dataMovie?.id, props?.dataMovie?.season_id)
  )
    .then((episodesRespones) => {
      dataSeason.value = episodesRespones.data.value;

      dataEpisode.value = dataSeason.value?.episodes.filter(
        (item: any) => item.air_date != null
      );
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style scoped lang="scss" src="./LastestEpisodes.scss"></style>
