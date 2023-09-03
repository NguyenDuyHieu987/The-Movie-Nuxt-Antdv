<template>
  <div class="lastest-episodes">
    <label class="label">Tâp mới nhất: </label>

    <ul v-show="dataSeason?.episodes?.length" class="list-lastest-episodes">
      <li
        v-for="(item, index) in dataSeason?.episodes?.slice(-7).reverse()"
        :index="index"
        :key="index"
      >
        <NuxtLink
          v-if="item?.episode_number === numberOfEpisodes"
          :to="{
            path: `/play-tv/${dataMovie?.id}/${dataMovie?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}/ep-${item?.episode_number}`,
          }"
        >
          {{ 'Tập ' + item?.episode_number + '-End' }}
        </NuxtLink>
        <NuxtLink
          v-else-if="item?.episode_number !== numberOfEpisodes"
          :to="{
            path: `/play-tv/${dataMovie?.id}/${dataMovie?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}/ep-${item?.episode_number}`,
          }"
        >
          {{ 'Tập ' + item?.episode_number }}
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

const route: any = useRoute();
const dataSeason = ref<any>(props.dataMovie);
const loading = ref<boolean>(false);

onBeforeMount(() => {
  // loading.value = true;
  // useAsyncData(
  //   `season/${route.params?.id}/${props?.dataMovie?.season_id}`,
  //   () => getSeason(route.params?.id, props?.dataMovie?.season_id)
  // )
  //   .then((episodesRespones: any) => {
  //     dataSeason.value = episodesRespones.data.value;
  //   })
  //   .catch((e) => {
  //     if (axios.isCancel(e)) return;
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
});
</script>

<style scoped lang="scss" src="./LastestEpisodes.scss"></style>
