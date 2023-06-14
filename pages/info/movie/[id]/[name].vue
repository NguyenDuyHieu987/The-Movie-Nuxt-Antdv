<template>
  <div class="movie-info-conainer">
    <div class="main-info">
      <div class="backdrop-img">
        <div class="backdrop-wrapper">
          <!-- <el-image
            :src="getBackdrop(dataMovie?.backdrop_path)"
            :preview-src-list="srcBackdropList"
            :preview-teleported="true"
            :lazy="true"
            loading="lazy"
          /> -->
          <img
            class="ant-image"
            v-lazy="getBackdrop(dataMovie?.backdrop_path)"
            loading="lazy"
          />
        </div>
        <div class="poster-img">
          <img
            class="ant-image"
            v-lazy="getPoster(dataMovie?.poster_path)"
            loading="lazy"
          />
        </div>

        <div class="overlay-backdrop">
          <img v-lazy="getBackdrop(dataMovie?.backdrop_path)" loading="lazy" />
        </div>
      </div>

      <div class="info-movie"></div>
    </div>

    <!-- <CastCrew :dataCredit="dataCredit" :loading="loading" />-->

    <!--  <MovieSuggest
      v-if="!checkEmptyDataMovies"
      :movieId="dataMovie?.id"
      type="movie"
    /> -->
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getItemList } from '~/services/list';
import { getPoster, getBackdrop } from '~/services/image';
import { getMovieById } from '~/services/movie';
import { getCountryByOriginalLanguage } from '~/services/country';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import CastCrew from '@/components/CastCrew/CastCrew.vue';
import MovieSuggest from '@/components/MovieSuggest/MovieSuggest.vue';

const store = useStore();
const utils = useUtils();
const route: any = useRoute();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const dataCredit = ref<any>({});
const isOpenContent = ref<boolean>(false);
const isOpenTrailerYoutube = ref<boolean>(false);
const loading = ref<boolean>(false);
const srcBackdropList = ref<string[]>([]);
const isAddToList = ref<boolean>(false);

const internalInstance: any = getCurrentInstance();

const setBackgroundColor = (color: string[]) => {
  const main_color = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;

  const backdrop_wrapper = document.getElementsByClassName(
    'backdrop-wrapper'
  )[0] as HTMLElement;

  // backdrop_wrapper.style.setProperty('--dominant-backdrop-color', main_color);
};

const getData = async () => {
  isAddToList.value = false;
  loading.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  srcBackdropList.value = [];
  isEpisodes.value = false;

  await useAsyncData(`movie/detail/${route.params?.id}`, () =>
    getMovieById(route.params?.id, 'images,credits')
  )
    .then((movieResponed: any) => {
      dataMovie.value = movieResponed.data.value;
      dataCredit.value = movieResponed.data.value?.credits;

      useHead({
        title:
          'Thông tin - Phim lẻ - ' + dataMovie.value?.name + ' | Phimhay247',
        htmlAttrs: { lang: 'vi' },
      });

      useSeoMeta({
        title: 'Thông tin - ' + dataMovie.value?.name + ' | Phimhay247',
        description: dataMovie.value?.overview,
        ogTitle: 'Thông tin - ' + dataMovie.value?.name + ' | Phimhay247',
        ogType: 'video.movie',
        ogUrl: window.location.href,
        ogDescription: dataMovie.value?.overview,
        ogImage: getBackdrop(dataMovie.value?.backdrop_path),
        ogLocale: 'vi',
      });

      // movieResponed?.data?.images?.backdrops?.forEach((item) => {
      //   srcBackdropList.value.push(
      //     'https://image.tmdb.org/t/p/original' + item?.file_path
      //   );
      // });

      srcBackdropList.value = Array.from(
        movieResponed.data.value.images?.backdrops,
        (item: any) => 'https://image.tmdb.org/t/p/original' + item?.file_path
      );

      loading.value = false;
      setBackgroundColor(dataMovie.value.dominant_backdrop_color);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    });

  if (store.$state.isLogin) {
    if (dataMovie.value?.in_list) {
      isAddToList.value = true;
    }

    // await useAsyncData(
    //   `itemlist/${store.$state?.userAccount?.id}/${route.params?.id}`,
    //   () => getItemList(route.params?.id)
    // )
    //   .then((movieRespone: any) => {
    //     if (movieRespone.data.value.data.success == true) {
    //       isAddToList.value = true;
    //     }
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
  }
};

onBeforeMount(() => {
  getData();
});

const scrolltoTrailerYoutube = () => {
  const trailer_youtube = document.getElementById(
    'trailer-youtube'
  ) as HTMLElement;
  trailer_youtube.scrollIntoView();
};

const handelAddToList = () => {
  if (!store.$state?.isLogin) {
    store.$state.openRequireAuthDialog = true;
    return;
  }
  if (!isAddToList.value) {
    isAddToList.value = true;
    if (!utils.handelAddItemToList(dataMovie.value?.id, 'movie')) {
      isAddToList.value = false;
    }
    return;
  } else {
    isAddToList.value = false;
    if (!utils.handelRemoveItemFromList(dataMovie.value?.id)) {
      isAddToList.value = true;
    }
    return;
  }
};

router.beforeEach((to) => {
  if (to.params.slug == 'info') {
    dataCredit.value = [];

    getData();
  }
});

watch(route, () => {
  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: 'smooth',
  // });
  // dataCredit.value = [];
  // getData();
});

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

<style lang="scss" src="./InfoMoviePage.scss"></style>
