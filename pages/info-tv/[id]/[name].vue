<template>
  <div class="tv-info">
    <div class="info-conainer" v-if="loading">
      <BackPage @onclick="$router.back()">
        <span> Quay lại</span>
      </BackPage>

      <div class="variant-backdrop"></div>

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
            <nuxt-img
              class="ant-image"
              :src="getBackdrop(dataMovie?.backdrop_path)"
              loading="lazy"
            />
          </div>
          <div class="poster">
            <nuxt-img
              class="ant-image"
              :src="getPoster(dataMovie?.poster_path)"
              loading="lazy"
            />
          </div>

          <div class="overlay-backdrop">
            <nuxt-img
              :src="getBackdrop(dataMovie?.backdrop_path)"
              loading="lazy"
            />
          </div>
        </div>

        <div class="tv-content">
          <!-- <div class="variant-content"></div> -->

          <div class="main-content">
            <div class="detail-content-left">
              <div class="head-content">
                <h1 class="movie-title">
                  {{ dataMovie?.name }}
                  <span>
                    {{
                      ' - Phần ' + dataMovie?.last_episode_to_air?.season_number
                    }}
                  </span>
                </h1>
                <div class="action">
                  <div class="left">
                    <NuxtLink
                      :to="{
                        path: `/play-tv/${dataMovie?.id}/${dataMovie?.name
                          ?.replace(/\s/g, '+')
                          .toLowerCase()}/tap-1`,
                      }"
                    >
                      <a-button size="large" type="text" class="play modern">
                        <template #icon>
                          <Icon name="ic:play-arrow" class="play" />
                        </template>
                        Xem ngay
                      </a-button>
                    </NuxtLink>

                    <NuxtLink @click.prevent="handelAddToList">
                      <a-button size="large" type="text" class="add modern">
                        <template #icon>
                          <Icon v-if="isAddToList" name="ic:baseline-check" />
                          <Icon v-else name="ic:baseline-plus" />
                        </template>
                        <span> Danh sách</span>
                      </a-button>
                    </NuxtLink>

                    <NuxtLink @click.prevent="scrollToTrailer">
                      <a-button size="large" type="text" class="trailer modern">
                        <template #icon>
                          <Icon name="fa6-brands:youtube" class="trailer" />
                        </template>
                        <span> Trailer</span>
                      </a-button>
                    </NuxtLink>
                  </div>

                  <div class="right">
                    <Interaction :dataMovie="dataMovie" />

                    <NuxtLink @click.prevent="scrollToComment">
                      <a-button size="large" type="text" class="comment modern">
                        <template #icon>
                          <Icon name="ic:outline-comment" class="comment" />
                        </template>
                        <span> Bình luận</span>
                      </a-button>
                    </NuxtLink>

                    <!-- <div class="ellipsis">
                      <Icon name="fa6-solid:ellipsis" />
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="overview">
                <Tags tagsLabel="Nội dung:">
                  <template #tagsInfo>
                    <span class="text">{{
                      dataMovie?.overview ||
                      'Sorry! This movie has not been updated overview content.'
                    }}</span>
                  </template>
                </Tags>
              </div>

              <RatingMovie :dataMovie="dataMovie" type="tv" />

              <Tags tagsLabel="Lượt xem:">
                <template #tagsInfo>
                  <span class="text">{{
                    dataMovie?.views
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' lượt xem'
                  }}</span>
                </template>
              </Tags>

              <LastestEpisodes
                :dataMovie="dataMovie"
                :numberOfEpisodes="
                  dataMovie?.seasons?.find(
                    (item:any) =>
                      item.season_number ===
                      dataMovie?.last_episode_to_air?.season_number
                  )?.episode_count
                "
                :loading="loading"
              />
            </div>

            <div class="detail-content-right">
              <Tags tagsLabel="Tên gốc:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{ dataMovie?.original_name }}
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Đang phát:">
                <template #tagsInfo>
                  <span class="tags-item">HD - Vietsub</span>
                </template>
              </Tags>

              <Tags tagsLabel="Ngày phát hành:">
                <template #tagsInfo>
                  <span class="tags-item">
                    <NuxtLink
                      :to="`/discover/year/${release_date?.slice(0, 4)}`"
                    >
                      {{ release_date?.slice(0, 4) }}
                    </NuxtLink>
                    <span>
                      {{ release_date?.slice(4) }}
                    </span>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Quốc gia:">
                <template #tagsInfo>
                  <span class="tags-item">
                    <NuxtLink
                      :to="`/discover/country/${
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.$state.allCountries
                        )?.short_name || 'au-my'
                      }`"
                    >
                      {{
                        getCountryByOriginalLanguage(
                          dataMovie?.original_language,
                          store.$state.allCountries
                        )?.name || ''
                      }}
                    </NuxtLink>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Thể loại:">
                <template #tagsInfo>
                  <span
                    class="tags-item"
                    v-for="(item, index) in dataMovie?.genres"
                    :key="item?.id"
                    :index="index"
                  >
                    <NuxtLink>{{ item?.name }} </NuxtLink>
                    <span>
                      {{ index + 1 != dataMovie?.genres?.length ? ', ' : '' }}
                    </span>
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Số tập:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{
                      dataMovie?.seasons?.find(
                        (item: any) =>
                          item?.season_number ===
                          dataMovie?.last_episode_to_air?.season_number
                      ).episode_count + ' tập'
                    }}
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Thời lượng trêm tập:">
                <template #tagsInfo>
                  <span class="tags-item">
                    {{ dataMovie?.episode_run_time[0] + ' phút' }}
                  </span>
                </template>
              </Tags>

              <Tags tagsLabel="Trạng thái:">
                <template #tagsInfo>
                  <span class="tags-item"> {{ dataMovie?.status }}</span>
                </template>
              </Tags>
            </div>
          </div>

          <Tags
            v-show="dataMovie?.in_history"
            tagsLabel="Đã xem:"
            class="progress-history-tags"
          >
            <template #tagsInfo>
              <HistoryProgressBar
                :historyProgress="dataMovie?.history_progress?.percent"
              />
            </template>
          </Tags>
        </div>
      </div>
      <div class="related-content padding-content">
        <MovieRelated :movieId="dataMovie?.id" type="tv" />

        <CastCrew :dataMovie="dataMovie" />

        <div class="trailer">
          <h2 class="gradient-title-default">Trailer</h2>
          <iframe
            height="100%"
            width="100%"
            :src="// dataMovie?.videos?.length != 0
            //   ? `https://www.youtube.com/embed/${dataMovie?.videos[0]?.key}` // Math.floor(Math.random() * dataMovie?.videos?.length)
            //   :

            'https://www.youtube.com/embed/ndl1W4ltcmg'"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="{0}"
          />
        </div>

        <Comment :dataMovie="dataMovie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { getItemList } from '~/services/list';
import { getPoster, getBackdrop } from '~/services/image';
import { getTvById } from '~/services/tv';
import { getCountryByOriginalLanguage } from '~/services/country';
import BackPage from '@/components/BackPage/BackPage.vue';
import Tags from '@/components/Tags/Tags.vue';
import Comment from '@/components/Comment/Comment.vue';
import Interaction from '@/components/Interaction/Interaction.vue';
import RatingMovie from '@/components/RatingMovie/RatingMovie.vue';
import LastestEpisodes from '~/components/LastestEpisodes/LastestEpisodes.vue';
import CastCrew from '@/components/CastCrew/CastCrew.vue';
import MovieRelated from '@/components/MovieRelated/MovieRelated.vue';
import HistoryProgressBar from '@/components/HistoryProgressBar/HistoryProgressBar.vue';

const store = useStore();
const utils = useUtils();
const route: any = useRoute();
const router = useRouter();
const isEpisodes = ref<boolean>(false);
const dataMovie = ref<any>({});
const dataCredit = ref<any>({});
const loading = ref<boolean>(false);
const srcBackdropList = ref<string[]>([]);
const isAddToList = ref<boolean>(false);
const release_date = computed<string>(
  () => dataMovie.value?.last_air_date || dataMovie.value?.first_air_date || ''
);

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
  isEpisodes.value = true;

  internalInstance.appContext.config.globalProperties.$Progress.start();

  srcBackdropList.value = [];

  await useAsyncData(`tv/detail/${route.params?.id}`, () =>
    getTvById(route.params?.id, 'videos')
  )
    .then((movieResponed: any) => {
      dataMovie.value = movieResponed.data.value;
      // dataCredit.value = movieResponed.data.value?.credits;

      useHead({
        title:
          'Thông tin - Phim bộ - ' + dataMovie.value?.name + ' | Phimhay247',
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

      // srcBackdropList.value = Array.from(
      //   movieResponed.data.value.images?.backdrops,
      //   (item: any) => 'https://image.tmdb.org/t/p/original' + item?.file_path
      // );

      setBackgroundColor(dataMovie.value.dominant_backdrop_color);
    })
    .catch((e) => {
      navigateTo('/404');
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = true;
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

// router.beforeEach((to) => {
//   if (to.params.slug == 'info') {
//     dataCredit.value = [];
//     getData();
//   }
// });

// window.scrollTo({
//   top: 0,
//   left: 0,
//   behavior: 'smooth',
// });

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

const scrollToTrailer = () => {
  const trailer = document.getElementById('trailer') as HTMLElement;
  trailer.scrollIntoView();
};

const scrollToComment = () => {
  const comment = document.getElementById('comment') as HTMLElement;
  comment.scrollIntoView();
};
</script>

<style lang="scss" src="./InfoTvPage.scss"></style>
