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
              : item.name?.replace('Season', 'Phần')
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
            v-for="(item, index) in dataEpisode"
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
              :id="`episode-${item?.episode_number}`"
            >
              <a
                :href="`/play-tv/${dataMovie?.id}__${utils
                  .removeVietnameseTones(dataMovie?.name)
                  ?.replace(/\s/g, '-')
                  .toLowerCase()}/tap-${item?.episode_number}`"
                @click.prevent="handleChangeEpisode(item)"
              >
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
              </a>
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
import { getListSeason, getSeason } from '~/services/season';
import { getListEpisode } from '~/services/episode';

const props = defineProps<{
  dataMovie: any;
}>();

const emit = defineEmits<{
  changeUrlCode: [url: string];
  changeEpisode: [episode: any];
}>();

const route: any = useRoute();
const utils = useUtils();
const router = useRouter();
const dataSeason = ref<any>(props.dataMovie?.seasons);
const dataEpisode = ref<any[]>(
  props.dataMovie?.episodes
    ? props.dataMovie?.episodes
        .filter((item: any) => item.air_date != null)
        .reverse()
    : []
);
const selectedSeasonId = ref<string>(props.dataMovie?.season_id);
const currentEpisode = ref<number>(
  route.params?.ep?.replace('tap-', '')
    ? +route.params?.ep?.replace('tap-', '')
    : 1
);
const loading = ref(false);

const emitUrlCode = () => {
  // const url_code_movie = dataSeason.episodes?.find(
  //   (item: any) => item.episode_number == currentEpisode.value
  // )?.url_code;

  let urlCode = `The_Witcher_S1_Ep1.mp4`;

  if (currentEpisode.value > 1 && currentEpisode.value <= 8) {
    urlCode = `The_Witcher_S1_Ep${currentEpisode.value}.mp4`;
  } else if (currentEpisode.value > 8) {
    urlCode = `The_Witcher_S1_Ep8.mp4`;
  }

  emit('changeUrlCode', urlCode);
};

const getData = async () => {
  loading.value = true;

  useAsyncData(`season/list/${props.dataMovie?.series_id}`, () =>
    getListSeason(props.dataMovie?.series_id)
  )
    // getListSeason(props.dataMovie?.series_id)
    .then((response) => {
      dataSeason.value = response.data.value?.results;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
};

// getData();

if (dataEpisode.value.length == 0) {
  loading.value = true;

  getListEpisode(props.dataMovie?.id, props?.dataMovie?.season_id)
    .then((response) => {
      dataEpisode.value = response?.results
        .filter((item: any) => item.air_date != null)
        .reverse();
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  emitUrlCode();

  emit(
    'changeEpisode',
    dataEpisode.value.find(
      (item) => item?.episode_number == currentEpisode.value
    )
  );

  // const episode = document.getElementById(
  //   `episode-${currentEpisode.value}`
  // ) as HTMLElement;

  // episode.scrollIntoView();
});

const handleChangeSeason = async (value: string) => {
  selectedSeasonId.value = value;

  loading.value = true;
  window.history.replaceState(null, '', 'tap-1');

  // await useAsyncData(
  //   `season/get/${props.dataMovie?.id}/${selectedSeasonId.value}`,
  //   () => getSeason(props.dataMovie?.id, selectedSeasonId.value)
  // )
  await getSeason(props.dataMovie?.id, selectedSeasonId.value)
    .then((response) => {
      dataEpisode.value = response?.episodes
        .filter((item: any) => item.air_date != null)
        .reverse();
    })
    .catch((e) => {
      loading.value = false;
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleChangeEpisode = (item: any) => {
  if (currentEpisode.value == item?.episode_number) return;

  window.history.replaceState(null, '', 'tap-' + item?.episode_number);

  currentEpisode.value = item?.episode_number;

  emitUrlCode();

  emit('changeEpisode', item);

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped lang="scss" src="./ListEpisodes.scss"></style>
