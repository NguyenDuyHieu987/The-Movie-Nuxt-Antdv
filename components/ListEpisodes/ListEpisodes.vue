<template>
  <div class="list-episodes">
    <div class="control-episodes">
      <el-button
        type="primary"
        plain
        :disabled="currentEpisode == 1"
        @click="handleChangeEpisode(--currentEpisode)"
      >
        <!-- @click="router.push({ params: { tap: `tap-${--currentEpisode}` } })" -->

        Tập trước
      </el-button>
      <el-button
        type="primary"
        plain
        :disabled="
          dataMovie?.last_episode_to_air?.season_number == selectedSeason
            ? currentEpisode == dataMovie?.last_episode_to_air?.episode_number
            : currentEpisode == dataSeason?.episodes?.length
        "
        @click="handleChangeEpisode(++currentEpisode)"
      >
        <!-- @click="router.push({ params: { tap: `tap-${++currentEpisode}` } })" -->

        Tập tiếp
      </el-button>
    </div>
    <h3 class="section-title" style="display: flex; align-items: center">
      <strong style="margin-right: 10px">
        {{ dataMovie?.name }}
        - Tập
        {{ route.params?.tap?.replace('tap-', '') }}
        |
        {{
          dataSeason?.name?.split(' ')[0] === 'Phần' ||
          dataSeason?.name === 'Specials'
            ? dataSeason?.name
            : dataSeason?.name?.replace('Season', 'Phần')
        }}
      </strong>
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

    <!-- <h3 class="section-title width-fit" style="margin: 0px 15px 10px 0px">
      <strong> Chọn phần</strong>
    </h3> -->

    <div
      v-if="loading"
      class="ul-list"
      v-loading="loading"
      element-loading-text="Đang tải tập..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <a-skeleton-button
        :active="true"
        :shape="'default'"
        v-for="(item, index) in dataSeason?.episodes?.slice(
          0,
          dataMovie?.last_episode_to_air?.season_number == selectedSeason
            ? dataMovie?.last_episode_to_air?.episode_number
            : dataSeason?.episodes.length
        )"
        :index="index"
        :key="index"
      >
      </a-skeleton-button>
    </div>

    <ul class="ul-list" v-else>
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
      >
        <NuxtLink @click.prevent="handleChangeEpisode(item?.episode_number)">
          <!-- :to="{
            path: `/play/tv/${dataMovie?.id}/${dataMovie?.name
              ?.replace(/\s/g, '+')
              .toLowerCase()}/tap-${item.episode_number}`,
          }" -->
          {{
            item?.episode_number === dataSeason?.episodes.length
              ? item?.episode_number < 10
                ? '0' + item?.episode_number + '-End'
                : item?.episode_number + '-End'
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
import axios from 'axios';
import { getSeasonTV } from '~/services/appMovieService';

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
  const url_code_movie = dataSeason.episodes?.find(
    (item: any) => item.episode_number == currentEpisode.value
  )?.url_code;

  emit('setUrlCodeMovie', url_code_movie);
};

onBeforeMount(async () => {
  loading.value = true;

  // console.log(route.params?.tap?.replace('tap-', ''));

  await useAsyncData(
    `season/${route.params?.id}/${props.dataMovie?.last_episode_to_air?.season_number}`,
    () => getSeasonTV(route.params?.id, selectedSeason.value)
  )
    .then((episodesRespones: any) => {
      dataSeason.value = episodesRespones.data.value.data;

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

const handleChangeSeason = (value: number) => {
  selectedSeason.value = value;
};

const handleChangeEpisode = (value: number) => {
  currentEpisode.value = value;
  emitUrlCode(dataSeason.value);
};

watch(selectedSeason, async () => {
  loading.value = true;
  router.push({ params: { tap: 'tap-1' } });

  await useAsyncData(
    `season/${route.params?.id}/${props.dataMovie?.last_episode_to_air?.season_number}`,
    () => getSeasonTV(route.params?.id, selectedSeason.value)
  )
    .then((episodesRespones: any) => {
      dataSeason.value = episodesRespones.data.value.data;

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
