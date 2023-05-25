<template>
  <div class="lastest-episodes">
    <h3 class="section-title">
      <strong>Tập mới nhất</strong>
    </h3>

    <div v-if="loading" class="list-lastest-episodes skeleton">
      <a-skeleton-button
        :loading="loading"
        :active="true"
        :shape="'default'"
        v-for="(item, index) in Array.from(
          { length: dataMovie?.last_episode_to_air?.episode_number },
          (_, i) => i + 1
        )
          .reverse()
          .slice(0, 10)"
        :index="index"
        :key="index"
      >
      </a-skeleton-button>
    </div>

    <ul v-else class="list-lastest-episodes">
      <li
        v-for="(item, index) in dataSeason.episodes
          ?.slice(0, dataMovie?.last_episode_to_air?.episode_number)
          ?.slice(-10)
          .reverse()"
        :index="index"
        :key="index"
      >
        <NuxtLink
          v-if="item?.episode_number === numberOfEpisodes"
          :to="{
            path: `/play/tv/${dataMovie?.id}/${dataMovie?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}/tap-${item?.episode_number}`,
          }"
        >
          {{ 'Tập ' + item?.episode_number + '-End' }}
        </NuxtLink>
        <NuxtLink
          v-else-if="item?.episode_number !== numberOfEpisodes"
          :to="{
            path: `/play/tv/${dataMovie?.id}/${dataMovie?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}/tap-${item?.episode_number}`,
          }"
        >
          {{ 'Tập ' + item?.episode_number }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getSeasonTV } from '~/services/movieService';
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
const route: any = useRoute();
const dataSeason = ref<any>({});
const loadingLastestEpisodes = ref<boolean>(false);

onBeforeMount(() => {
  loadingLastestEpisodes.value = true;

  useAsyncData(
    `season/${route.params?.id}/${props.dataMovie?.last_episode_to_air?.season_number}`,
    () =>
      getSeasonTV(
        route.params?.id,
        props.dataMovie?.last_episode_to_air?.season_number
      )
  )
    .then((episodesRespones: any) => {
      dataSeason.value = episodesRespones.data.value.data;
      loadingLastestEpisodes.value = false;
    })
    .catch((e) => {
      loadingLastestEpisodes.value = false;
      if (axios.isCancel(e)) return;
    });
});
</script>

<style scoped lang="scss" src="./LastestEpisodes.scss"></style>
