<template>
  <div class="play-container">
    <div class="video-player">
      <iframe
        v-if="isEpisodes"
        width="100%"
        height="100%"
        :src="`//ok.ru/videoembed/${
          urlCodeMovie ? urlCodeMovie : '3056793684585'
        }`"
        frameborder="0"
        allow="autoplay"
        allowfullscreen
      ></iframe>

      <!-- <iframe
        v-else
        width="100%"
        height="100%"
        :src="`//ok.ru/videoembed/${'3056793684585'}`"
        frameborder="0"
        allow="autoplay"
        allowfullscreen
      ></iframe> -->

      <iframe
        v-else
        src="https://player.vimeo.com/video/807171046"
        width="100%"
        height="100%"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <ListEpisodes
      v-if="isEpisodes"
      :dataMovie="dataMovie"
      :numberOfEpisodes="
        dataMovie?.seasons?.find((item) =>
          item.season_number === dataMovie?.last_episode_to_air?.season_number
            ? item
            : null
        )?.episode_count
      "
      @setUrlCodeMovie="(data) => getUrlCodeMovie(data)"
    />

    <h3 class="section-title width-fit" style="margin-top: 10px">
      <strong> Đánh giá phim</strong>
    </h3>

    <a-skeleton-button
      v-if="loading"
      :loading="loading"
      :active="true"
      :size="'default'"
      :block="false"
      class="skeleton-interaction"
    >
    </a-skeleton-button>
    <Interaction v-else :dataMovie="dataMovie" />

    <div>
      <a-skeleton
        style="margin-top: 15px"
        :loading="loading"
        :active="true"
        :paragraph="{ rows: 1, width: '40%' }"
        :title="false"
      >
        <RatingMovie
          v-show="!checkEmptyDataMovies"
          :voteAverage="dataMovie?.vote_average"
          :voteCount="dataMovie?.vote_count"
          :movieId="dataMovie?.id"
          :isEpisodes="isEpisodes"
        />
      </a-skeleton>
    </div>

    <h3 class="section-title">
      <strong v-if="!checkEmptyDataMovies">
        {{ dataMovie?.name ? dataMovie?.name : dataMovie?.title }}
        {{
          ` (${
            dataMovie?.last_air_date?.slice(0, 4)
              ? dataMovie?.last_air_date?.slice(0, 4)
              : dataMovie?.release_date?.slice(0, 4)
          })`
        }}
      </strong>
      <strong v-else> Nội dung phim </strong>
    </h3>
    <div class="movie-content">
      <a-skeleton
        :loading="loading"
        :active="true"
        :paragraph="{ rows: 3, width: '40%' }"
        :title="false"
      >
        <p :class="{ open: isOpenContent }">
          {{ dataMovie?.overview }}
          <router-link
            :to="{
              name: 'info',
              params: {
                id: dataMovie?.id,
                name: dataMovie?.name
                  ? dataMovie?.name?.replace(/\s/g, '+').toLowerCase()
                  : dataMovie?.title?.replace(/\s/g, '+').toLowerCase(),
              },
            }"
          >
            <strong class="toggle-content"> Chi tiết </strong>
          </router-link>
        </p>
      </a-skeleton>
    </div>

    <h3 class="section-title">
      <strong> Bình luận</strong>
    </h3>
    <div
      class="fb-comments"
      :data-href="urlComment"
      data-width="100%"
      data-numposts="10"
    ></div>

    <MovieSuggest
      v-if="!checkEmptyDataMovies"
      :dataMovie="dataMovie"
      :isEpisodes="isEpisodes"
    />
  </div>
</template>

<script>
import {
  ref,
  onBeforeMount,
  watch,
  computed,
  onMounted,
  getCurrentInstance,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import {
  getAllGenresById,
  getPoster,
  getTvById,
  getMovieById,
  // getMovieByCredit,
} from '~/services/appMovieService';
import Interaction from '@/components/Normal/Interaction/Interaction.vue';
import RatingMovie from '@/components/Normal/RatingMovie/RatingMovie.vue';
import MovieSuggest from '@/components/Normal/MovieSuggest/MovieSuggest.vue';
import ListEpisodes from '@/components/Normal/ListEpisodes/ListEpisodes.vue';
import { useMeta } from 'vue-meta';

const route = useRoute();
const router = useRouter();
const genresName = ref([]);
const isEpisodes = ref(false);
const dataMovie = ref({});
const dataCredit = ref([]);
const dataSimilar = ref([]);
const dataRecommend = ref([]);
const isOpenContent = ref(false);
const isOpenTrailerYoutube = ref(false);
const urlComment = computed(() => window.location);
const loading = ref(false);
const urlCodeMovie = ref('');

const btnPrev = ref('<i class="fa-solid fa-chevron-left "></i>');
const btnNext = ref('<i class="fa-solid fa-chevron-right "></i>');
const internalInstance = getCurrentInstance();

const getData = () => {
  loading.value = true;
  internalInstance.appContext.config.globalProperties.$Progress.start();

  useMeta({
    title:
      '`Phimhay247 - Xem phim - ' +
      Array?.from(
        route.params?.name?.split('+'),
        (x) => x.charAt(0).toUpperCase() + x.slice(1)
      ).join(' ')
        ? '`Phimhay247 - Xem phim - ' +
          Array?.from(
            route.params?.name?.split('+'),
            (x) => x.charAt(0).toUpperCase() + x.slice(1)
          ).join(' ')
        : '`Phimhay247 - Xem phim - ' +
          Array?.from(
            route.params?.name?.split('+'),
            (x) => x.charAt(0).toUpperCase() + x.slice(1)
          ).join(' '),
    htmlAttrs: { lang: 'vi', amp: true },
  });

  // document.title = `${Array?.from(
  //   route.params?.name?.split('+'),
  //   (x) => x.charAt(0).toUpperCase() + x.slice(1)
  // ).join(' ')} - Xem phim`;

  getTvById(route.params?.id)
    .then((tvResponed) => {
      if (tvResponed?.data?.not_found === true)
        getMovieById(route.params?.id)
          .then((movieResponed) => {
            isEpisodes.value = false;
            dataMovie.value = movieResponed?.data;

            setTimeout(() => {
              loading.value = false;
              internalInstance.appContext.config.globalProperties.$Progress.finish();
            }, 1500);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      else {
        isEpisodes.value = true;
        dataMovie.value = tvResponed?.data;

        setTimeout(() => {
          loading.value = false;
          internalInstance.appContext.config.globalProperties.$Progress.finish();
        }, 1500);
      }
    })
    .catch((e) => {
      loading.value = false;
      if (axios.isCancel(e)) return;
    });
};

onBeforeMount(() => {
  getData();
});

onMounted(() => {
  // getData();
});

router.beforeEach(() => {
  // if (to.params.slug == 'play') {
  //   dataCredit.value = [];
  //   getData();
  // }
});

watch(route, () => {});

const getUrlCodeMovie = (data) => {
  urlCodeMovie.value = data;
};

const checkEmptyDataMovies = computed(() => {
  if (Object.keys(dataMovie.value).length == 0) return true;
  else return false;
});

window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth',
});
</script>

<style lang="scss" src="./PlayView.scss"></style>
