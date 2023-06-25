<template>
  <div class="lastest-episodes">
    <span class="label">Tâp mới nhất: </span>

    <!-- <div v-if="loading" class="list-lastest-episodes skeleton">
      <a-skeleton-button
        :loading="loading"
        :active="true"
        :shape="'default'"
        v-for="(item, index) in Array.from(
          { length: dataMovie?.last_episode_to_air?.episode_number },
          (_, i) => i + 1
        )
          .reverse()
          .slice(0, 7)"
        :index="index"
        :key="index"
      >
      </a-skeleton-button>
    </div> -->

    <ul class="list-lastest-episodes">
      <li
        v-for="(item, index) in dataSeason.episodes
          ?.slice(0, dataMovie?.last_episode_to_air?.episode_number)
          ?.slice(-7)
          .reverse()"
        :index="index"
        :key="index"
      >
        <NuxtLink
          v-if="item?.episode_number === numberOfEpisodes"
          :to="{
            path: `/play-tv/${dataMovie?.id}/${dataMovie?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}/tap-${item?.episode_number}`,
          }"
        >
          {{ 'Tập ' + item?.episode_number + '-End' }}
        </NuxtLink>
        <NuxtLink
          v-else-if="item?.episode_number !== numberOfEpisodes"
          :to="{
            path: `/play-tv/${dataMovie?.id}/${dataMovie?.name
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
import { getSeasonTV } from '~/services/tv';
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
const loading = ref<boolean>(false);

onBeforeMount(() => {
  loading.value = true;

  useAsyncData(
    `season/${route.params?.id}/${props.dataMovie?.last_episode_to_air?.season_number}`,
    () =>
      getSeasonTV(
        route.params?.id,
        props.dataMovie?.last_episode_to_air?.season_number
      )
  )
    .then((episodesRespones: any) => {
      dataSeason.value = episodesRespones.data.value;
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
