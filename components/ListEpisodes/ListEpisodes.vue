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
            : currentEpisode == dataSeason?.episodes?.length
        "
        @click="handleChangeEpisode(++currentEpisode)"
      >
        Tập tiếp
      </a-button>
    </div> -->

    <h3 class="movie-title">
      <span>
        {{ dataMovie?.name }}
        - Tập
        {{ route.params?.ep?.replace('ep-', '') }}
        <!-- |
        {{
          dataSeason?.name?.split(' ')[0] === 'Phần' ||
          dataSeason?.name === 'Specials'
            ? dataSeason?.name
            : dataSeason?.name?.replace('Season', 'Phần')
        }} -->
      </span>

      <a-select
        v-show="dataMovie?.seasons && dataMovie?.seasons?.length"
        v-model:value="selectedSeason"
        style="width: 150px"
        @change="handleChangeSeason"
      >
        <a-select-option
          v-for="(item, index) in dataMovie?.seasons"
          :key="item?.id"
          :index="index"
          :value="item?.season_number"
          >{{
            item.name?.split(' ')[0] === 'Phần' || item.name === 'Specials'
              ? item.name
              : item.name.replace('Season', 'Phần')
          }}
        </a-select-option>
      </a-select>
    </h3>

    <div
      v-show="dataSeason?.episodes && dataSeason?.episodes?.length"
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
            v-for="(item, index) in dataSeason?.episodes?.slice(
              0,
              dataMovie?.last_episode_to_air?.season_number == selectedSeason
                ? dataMovie?.last_episode_to_air?.episode_number
                : dataSeason?.episodes.length
            )"
            :index="index"
            :key="index"
          >
          </el-skeleton-item>
        </template>

        <template #default>
          <ul class="list-container">
            <li
              v-for="(item, index) in dataSeason?.episodes?.slice(
                0,
                dataMovie?.last_episode_to_air?.season_number == selectedSeason
                  ? dataMovie?.last_episode_to_air?.episode_number
                  : dataSeason?.episodes.length
              )"
              :index="index"
              :key="item.id"
              :class="{ active: currentEpisode == item?.episode_number }"
              @click="handleChangeEpisode(item?.episode_number)"
            >
              <span>
                {{
                  item?.episode_number === dataSeason?.episodes.length
                    ? item?.episode_number < 10
                      ? '0' + item?.episode_number + '-End'
                      : item?.episode_number + '-End'
                    : +item?.episode_number < 10
                    ? '0' + item?.episode_number
                    : item?.episode_number
                }}
              </span>
            </li>
          </ul>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getSeasonTV } from '~/services/tv';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';

const props = defineProps<{
  dataMovie: any;
  numberOfEpisodes: number;
}>();

const emit = defineEmits<{ setUrlCodeMovie: [url: string] }>();

const route: any = useRoute();
const router = useRouter();
const dataSeason = ref<any>({});
const selectedSeason = ref<number>(props?.dataMovie?.number_of_seasons);
const currentEpisode = ref<number>(
  route.params?.ep?.replace('ep-', '')
    ? +route.params?.ep?.replace('ep-', '')
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
  loading.value = true;

  await useAsyncData(
    `season/${route.params?.id}/${props.dataMovie?.last_episode_to_air?.season_number}`,
    () => getSeasonTV(route.params?.id, selectedSeason.value)
  )
    .then((episodesRespones: any) => {
      dataSeason.value = episodesRespones.data.value;

      emitUrlCode(dataSeason.value);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    });
});

const handleChangeSeason = async (value: number) => {
  selectedSeason.value = value;

  loading.value = true;
  window.history.replaceState(null, '', 'ep-1');

  await useAsyncData(
    `season/${route.params?.id}/${props.dataMovie?.last_episode_to_air?.season_number}`,
    () => getSeasonTV(route.params?.id, selectedSeason.value)
  )
    .then((episodesRespones: any) => {
      dataSeason.value = episodesRespones.data.value;

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

  window.history.replaceState(null, '', 'ep-' + value);

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
