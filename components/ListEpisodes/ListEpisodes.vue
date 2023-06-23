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
      <span style="margin-right: 10px">
        {{ dataMovie?.name }}
        - Tập
        {{ route.params?.tap?.replace('tap-', '') }}
        <!-- |
        {{
          dataSeason?.name?.split(' ')[0] === 'Phần' ||
          dataSeason?.name === 'Specials'
            ? dataSeason?.name
            : dataSeason?.name?.replace('Season', 'Phần')
        }} -->
      </span>
      <a-select
        ref="select"
        v-model:value="selectedSeason"
        style="width: 150px"
        @change="handleChangeSeason"
      >
        <a-select-option
          v-for="(item, index) in dataMovie.seasons"
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
      class="list"
      v-loading="loading"
      element-loading-text="Đang tải tập..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item
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
              @click="
                handleChangeEpisode(item?.episode_number);
                scrollToTop();
              "
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
  // (): number =>
  route.params?.tap?.replace('tap-', '')
    ? +route.params?.tap?.replace('tap-', '')
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

const handleChangeSeason = (value: number) => {
  selectedSeason.value = value;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const handleChangeEpisode = (value: number) => {
  currentEpisode.value = value;
  emitUrlCode(dataSeason.value);

  // router.replace({
  //   path: route.path,
  //   params: {
  //     tap: 'tap-' + value,
  //   },
  // });
};

watch(selectedSeason, async () => {
  loading.value = true;
  router.replace({ params: { tap: 'tap-1' } });

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
});

watch(route, () => {
  // currentEpisode.value = +newVal.params?.tap?.replace('tap-', '');
  emitUrlCode(dataSeason.value);
});
</script>

<style scoped lang="scss" src="./ListEpisodes.scss"></style>
