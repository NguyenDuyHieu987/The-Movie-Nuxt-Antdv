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
            path: `/play-tv/${dataMovie?.id}__${utils
              .removeVietnameseTones(dataMovie?.name)
              ?.replace(/\s/g, '-')
              .toLowerCase()}/tap-${item?.episode_number}`,
          }"
        >
          {{ 'Tập ' }}
          {{
            // item?.episode_number == dataEpisode.length
            //   ? item?.episode_number < 10
            //     ? '0' + item?.episode_number + ' - End'
            //     : item?.episode_number + ' - End'
            //   :
            +item?.episode_number < 10
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
import { getListEpisode } from '~/services/episode';
import axios from 'axios';

const props = defineProps({
  dataMovie: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
});

const utils = useUtils();
const dataSeason = ref<any>(props.dataMovie?.seasons);
const dataEpisode = ref<any[]>(
  props.dataMovie?.episodes
    ? props.dataMovie?.episodes.filter((item: any) => item.air_date != null)
    : []
);
const loading = ref<boolean>(false);

if (dataEpisode.value.length == 0) {
  loading.value = true;

  getListEpisode(props.dataMovie?.id, props?.dataMovie?.season_id)
    .then((response) => {
      dataEpisode.value = response?.results.filter(
        (item: any) => item.air_date != null
      );
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
}

// // useAsyncData(
// //   `season/${props.dataMovie?.id}/${props?.dataMovie?.season_id}`,
// //   () => getSeason(props.dataMovie?.id, props?.dataMovie?.season_id)
// // )
// getSeason(props.dataMovie?.id, props?.dataMovie?.season_id)
//   .then((response) => {
//     dataSeason.value = response;

//     dataEpisode.value = dataSeason.value?.episodes.filter(
//       (item: any) => item.air_date != null
//     );
//   })
//   .catch((e) => {
//     if (axios.isCancel(e)) return;
//   })
//   .finally(() => {
//     loading.value = false;
//   });
</script>

<style scoped lang="scss" src="./LastestEpisodes.scss"></style>
