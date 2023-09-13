<template>
  <div class="list-episodes">
    <!-- <div class="control-episodes">
      <a-button
        type="text"
        plain
        :disabled="currentEpisode == 1"
        @click="handleChangeEpisode(--currentEpisode)"
      >
        Tập trước
      </a-button>
      <a-button
        type="text"
        plain
        :disabled="
          dataMovie?.last_episode_to_air?.season_number == selectedSeason
            ? currentEpisode == dataMovie?.last_episode_to_air?.episode_number
            : currentEpisode == dataEpisode?.length
        "
        @click="handleChangeEpisode(++currentEpisode)"
      >
        Tập tiếp
      </a-button>
    </div> -->

    <h2 class="movie-title title-default">
      Danh sách tập
      <!-- <span>
        {{ dataMovie?.name }}
        - Tập
        {{ currentEpisode }}
      </span> -->

      <!-- <a-select
        v-show="dataSeason && dataSeason?.length"
        v-model:value="selectedSeasonId"
        style="width: 150px"
        @change="handleChangeSeason(selectedSeasonId)"
      >
        <a-select-option
          v-for="(item, index) in dataSeason"
          :key="item?.id"
          :index="index"
          :value="item?.season_id"
          >{{
            item.name?.split(' ')[0] === 'Phần' || item.name === 'Specials'
              ? item.name
              : item.name.replace('Season', 'Phần')
          }}
        </a-select-option>
      </a-select> -->
    </h2>

    <div
      v-show="dataEpisode?.length"
      class="list"
      v-loading="loading"
      element-loading-text="Đang tải tập..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item
            class="episode-item"
            variant="button"
            v-for="(item, index) in dataEpisode?.slice(0, dataEpisode.length)"
            :index="index"
            :key="index"
          />
        </template>

        <template #default>
          <ul class="list-container">
            <li
              v-for="(item, index) in dataEpisode"
              :index="index"
              :key="item.id"
              :class="{ active: currentEpisode == item?.episode_number }"
              @click.prevent="handleChangeEpisode(item?.episode_number)"
            >
              <NuxtLink
                :to="{
                  path: `/play-tv/${dataMovie?.id}/${dataMovie?.name
                    ?.replace(/\s/g, '+')
                    .toLowerCase()}/tap-${item?.episode_number}`,
                }"
              >
                {{
                  item?.episode_number == dataSeason.value?.episodes
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
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import axios from 'axios';
import { getSeason } from '~/services/season';

const props = defineProps<{
  dataMovie: any;
  numberOfEpisodes: number;
}>();

const emit = defineEmits<{ setUrlCodeMovie: [url: string] }>();

const route: any = useRoute();
const router = useRouter();
const dataSeason = ref<any>(props.dataMovie?.seasons);
const dataEpisode = ref<any[]>(
  props.dataMovie?.episodes.filter((item: any) => item.air_date != null)
);
const selectedSeasonId = ref<string>(props.dataMovie?.season_id);
const currentEpisode = ref<number>(
  route.params?.ep?.replace('tap-', '')
    ? +route.params?.ep?.replace('tap-', '')
    : 1
);
const loading = ref(false);

const emitUrlCode = (dataSeason: any) => {
  // const url_code_movie = dataSeason.episodes?.find(
  //   (item: any) => item.episode_number == currentEpisode.value
  // )?.url_code;

  let url_code_movie = `The_Witcher_S1_Ep1.mp4`;

  if (currentEpisode.value > 1 && currentEpisode.value <= 8) {
    url_code_movie = `The_Witcher_S1_Ep${currentEpisode.value}.mp4`;
  } else if (currentEpisode.value > 8) {
    url_code_movie = `The_Witcher_S1_Ep8.mp4`;
  }

  emit('setUrlCodeMovie', url_code_movie);
};

onBeforeMount(async () => {
  emitUrlCode(dataSeason.value);

  // loading.value = true;

  // await useAsyncData(
  //   `season/${route.params?.id}/${selectedSeasonId.value}`,
  //   () => getSeason(route.params?.id, selectedSeasonId.value)
  // )
  //   .then((episodesRespones) => {
  //     dataSeason.value = episodesRespones.data.value;

  //     emitUrlCode(dataSeason.value);
  //   })
  //   .catch((e) => {
  //     if (axios.isCancel(e)) return;
  //   })
  //   .finally(() => {
  //     setTimeout(() => {
  //       loading.value = false;
  //     }, 500);
  //   });
});

const handleChangeSeason = async (value: string) => {
  selectedSeasonId.value = value;

  loading.value = true;
  window.history.replaceState(null, '', 'tap-1');

  await useAsyncData(
    `season/${route.params?.id}/${selectedSeasonId.value}`,
    () => getSeason(route.params?.id, selectedSeasonId.value)
  )
    .then((episodesRespones: any) => {
      dataSeason.value = episodesRespones.data.value;

      dataEpisode.value = dataSeason.value?.episodes.filter(
        (item: any) => item.air_date != null
      );

      emitUrlCode(dataSeason.value);

      setTimeout(() => {
        loading.value = false;
      }, 1000);
    })
    .catch((e) => {
      loading.value = false;
      if (axios.isCancel(e)) return;
    });
};

const handleChangeEpisode = (value: number) => {
  if (currentEpisode.value == value) return;

  window.history.replaceState(null, '', 'tap-' + value);

  currentEpisode.value = value;
  emitUrlCode(dataSeason.value);

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped lang="scss" src="./ListEpisodes.scss"></style>
