<template>
  <div class="prev-play-conainer">
    <div class="main-info">
      <div class="backdrop-img">
        <el-image
          :src="
            getPoster(
              dataMovie?.backdrop_path
                ? dataMovie?.backdrop_path
                : dataMovie?.poster_path
            )
          "
          :preview-src-list="srcBackdropList"
          :preview-teleported="true"
        >
          <template #placeholder>
            <div
              class="ant-image"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              Đang tải<span class="dot">...</span>
            </div>
          </template>
          <template #error>
            <div
              class="el-image error"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              Đang tải<span class="dot">...</span>
            </div>
          </template>
        </el-image>
      </div>

      <div class="info-movie">
        <a-skeleton
          :loading="loading"
          :active="true"
          :paragraph="{ rows: 2 }"
          :title="false"
        >
          <h2>
            <strong>{{
              dataMovie?.name ? dataMovie?.name : dataMovie?.title
            }}</strong>
            <strong v-if="isEpisodes">
              {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
            </strong>
          </h2>

          <strong>
            {{
              dataMovie?.original_title
                ? dataMovie?.original_title
                : dataMovie?.original_name
            }}
            {{
              isEpisodes
                ? `(${
                    dataMovie?.last_air_date?.slice(0, 4)
                      ? dataMovie?.last_air_date?.slice(0, 4)
                      : dataMovie?.last_episode_to_air?.air_date?.slice(0, 4)
                  })`
                : `(${dataMovie?.release_date?.slice(0, 4)})`
            }}
          </strong>

          <strong v-if="isEpisodes">
            {{ ' - Phần ' + dataMovie?.last_episode_to_air?.season_number }}
          </strong>
        </a-skeleton>

        <div v-if="loading" class="widget-skeleton">
          <a-skeleton-button
            :active="true"
            :size="'default'"
            :block="false"
            v-for="(item, index) in 3"
            :index="index"
            :key="index"
          >
          </a-skeleton-button>
        </div>

        <div v-else class="widget">
          <router-link
            v-if="isEpisodes"
            :to="{
              name: 'playtv',
              params: {
                id: dataMovie?.id,
                name: dataMovie?.name
                  ? dataMovie?.name?.replace(/\s/g, '+').toLowerCase()
                  : dataMovie?.title?.replace(/\s/g, '+').toLowerCase(),
                tap: 'tap-1',
              },
            }"
            class="btn-play-now"
          >
            <font-awesome-icon icon="fa-solid fa-play" />
            <span> Xem ngay</span>
          </router-link>
          <router-link
            v-else-if="!isEpisodes"
            :to="{
              name: 'play',
              params: {
                id: dataMovie?.id,
                name: dataMovie?.name
                  ? dataMovie?.name?.replace(/\s/g, '+').toLowerCase()
                  : dataMovie?.title?.replace(/\s/g, '+').toLowerCase(),
              },
            }"
            class="btn-play-now"
          >
            <font-awesome-icon icon="fa-solid fa-play" />
            <span> Xem ngay</span>
          </router-link>

          <span
            class="btn-trailer"
            id="btn-trailer"
            @click="
              () => {
                isOpenTrailerYoutube = !isOpenTrailerYoutube;
                if (isOpenTrailerYoutube) scrolltoTrailerYoutube();
              }
            "
          >
            <font-awesome-icon icon="fa-brands fa-youtube" />
            <span>Trailer</span>
          </span>

          <!-- v-if="$store.state.isLogin" -->

          <!-- <a-popconfirm
            ok-text="Có"
            cancel-text="Không"
            class="btn-add-to-list"
            :class="{ active: isAddToList }"
            @confirm="handelAddToList"
          >
            <template #title>
              <p v-if="!isAddToList">Bạn có muốn thêm phìm vào</p>
              <p v-else>Bạn có muốn xoá phìm khỏi</p>
              <p>danh sách phát không?</p>
            </template>
            <template #icon><question-circle-outlined /></template>

            <span>
              <font-awesome-icon v-if="isAddToList" icon="fa-solid fa-check" />
              <font-awesome-icon v-else icon="fa-solid fa-bookmark" />
              <span v-if="!isAddToList"> Add to list</span>
              <span v-else> Remove list</span>
            </span>
          </a-popconfirm> -->

          <!-- <span v-else class="btn-add-to-list">
            <font-awesome-icon icon="fa-solid fa-bookmark" />
            <span> Add to list</span>
          </span> -->

          <span
            class="btn-add-to-list"
            :class="{ active: isAddToList }"
            @click="handelAddToList"
          >
            <font-awesome-icon v-if="isAddToList" icon="fa-solid fa-check" />
            <font-awesome-icon v-else icon="fa-solid fa-bookmark" />
            <span v-if="!isAddToList"> Add to list</span>
            <span v-else> Remove list</span>
          </span>
        </div>

        <div class="misc">
          <a-skeleton
            :loading="loading"
            :active="true"
            :paragraph="{ rows: 8, width: 400 }"
            :title="false"
          >
            <p>
              <label>Đang phát: </label>
              <span style="color: red; font-weight: bold"> HD VietSub </span>
            </p>

            <p v-if="!checkEmptyDataMovies">
              <label>Ngày Phát Hành: </label>
              <router-link
                :to="{
                  name: 'discover',
                  params: {
                    slug: 'years',
                    slug2: dataMovie?.first_air_date?.slice(0, 4)
                      ? dataMovie?.first_air_date?.slice(0, 4)
                      : dataMovie?.release_date?.slice(0, 4),
                  },
                }"
              >
                {{
                  dataMovie?.first_air_date?.slice(0, 4)
                    ? dataMovie?.first_air_date?.slice(0, 4)
                    : dataMovie?.release_date?.slice(0, 4)
                }}
              </router-link>
              {{
                dataMovie?.last_air_date?.slice(4, 10)
                  ? dataMovie?.last_air_date?.slice(4, 10)
                  : dataMovie?.release_date?.slice(
                      4,
                      dataMovie?.release_date.length
                    )
              }}
            </p>

            <p v-if="dataMovie?.original_language">
              <label>Quốc gia: </label>
              <router-link
                :to="{
                  name: 'discover',
                  params: {
                    slug: 'countries',
                    slug2: getLanguage(
                      dataMovie?.original_language,
                      $store.state.allCountries
                    )?.short_name
                      ? getLanguage(
                          dataMovie?.original_language,
                          $store.state.allCountries
                        )?.short_name
                      : 'au-my',
                  },
                }"
              >
                <span>
                  {{
                    getLanguage(
                      dataMovie?.original_language,
                      $store.state.allCountries
                    )?.name
                      ? getLanguage(
                          dataMovie?.original_language,
                          $store.state.allCountries
                        )?.name
                      : ''
                  }}
                </span>
              </router-link>
            </p>
            <p v-if="dataMovie?.genres">
              <label>Thể loại: </label>

              <router-link
                v-for="(item, index) in dataMovie?.genres"
                :key="item?.id"
                :index="index"
                :to="{
                  name: 'discover',
                  params: {
                    slug: 'genres',
                    slug2: removeVietnameseTones(item?.name)
                      ?.replaceAll(/\s/g, '-')
                      ?.toLowerCase(),
                  },
                }"
              >
                {{
                  index !== dataMovie?.genres.length - 1
                    ? item?.name + ', '
                    : item?.name
                }}
              </router-link>
            </p>

            <p>
              <label>Diểm IMDb: </label>
              <span style="color: yellow; font-weight: bold">
                {{ dataMovie?.vote_average?.toFixed(2) }}
              </span>
            </p>

            <p v-if="isEpisodes">
              <label>Số lượng tập: </label>
              {{
                dataMovie?.seasons?.find((item) =>
                  item?.season_number ===
                  dataMovie?.last_episode_to_air?.season_number
                    ? item
                    : null
                ).episode_count + ' tập'
              }}
            </p>

            <p>
              <label v-if="isEpisodes"> Thời lượng trên tập: </label>
              <label v-else>Thời lượng: </label>
              <span v-if="isEpisodes">
                {{ dataMovie?.episode_run_time[0] + ' phút' }}
              </span>
              <span v-else>{{ dataMovie?.runtime + ' phút' }}</span>
            </p>

            <p>
              <label>Trạng thái: </label>
              {{ dataMovie?.status }}
            </p>
          </a-skeleton>
        </div>

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

        <a-skeleton
          style="margin-top: 15px"
          :loading="loading"
          :active="true"
          :paragraph="{ rows: 1, width: '100%' }"
          :title="false"
        >
          <RatingMovie
            v-if="!checkEmptyDataMovies"
            :voteAverage="dataMovie?.vote_average"
            :voteCount="dataMovie?.vote_count"
            :movieId="dataMovie?.id"
            :isEpisodes="isEpisodes"
          />
        </a-skeleton>
      </div>
    </div>

    <LastestEpisodes
      v-if="isEpisodes"
      :dataMovie="dataMovie"
      :numberOfEpisodes="
        dataMovie?.seasons?.find((item) =>
          item.season_number === dataMovie?.last_episode_to_air?.season_number
            ? item
            : null
        )?.episode_count
      "
      :loading="loading"
    />

    <h3 class="section-title">
      <strong>Nội dung phim</strong>
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
        </p>
        <strong class="toggle-content" @click="isOpenContent = !isOpenContent">
          {{ !isOpenContent ? 'Xem thêm' : 'Ẩn bớt' }}
        </strong>
      </a-skeleton>
    </div>

    <div id="trailer-youtube">
      <div class="trailer-youtube" :class="{ active: isOpenTrailerYoutube }">
        <h3 class="section-title">
          <strong>Trailer</strong>
        </h3>
        <iframe
          height="650px"
          width="100%"
          :src="
            dataMovie?.videos?.results?.length !== 0
              ? `https://www.youtube.com/embed/${
                  dataMovie?.videos?.results[
                    Math.floor(
                      Math.random() * dataMovie?.videos?.results?.length
                    )
                  ]?.key
                }`
              : 'https://www.youtube.com/embed/ndl1W4ltcmg'
          "
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="{0}"
        />
      </div>
    </div>

    <!-- <h3 class="section-title">
      <strong>Diễn viên</strong>
    </h3> -->

    <a-tabs v-model:activeKey="activeTabCast" v-show="!checkEmptyDataMovies">
      <a-tab-pane key="1" tab="Diễn viên">
        <carousel
          v-if="dataCredit?.cast?.length"
          class="cast"
          :items="4"
          :autoplay="true"
          :loop="true"
          :dots="false"
          :autoplayHoverPause="true"
          :autoplayTimeout="5000"
          :margin="7"
          :autoplaySpeed="500"
          :navText="[btnPrev, btnNext]"
          :responsive="responsiveCarousel"
        >
          <CastCard
            v-for="(item, index) in dataCredit?.cast"
            :src="
              getPoster(
                item?.backdrop_path ? item?.backdrop_path : item?.poster_path
              )
            "
            :item="item"
            :index="index"
            :key="item.id"
            :loading="loading"
          />
        </carousel>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Đội ngũ" force-render>
        <carousel
          v-if="dataCredit?.crew?.length"
          class="cast"
          :items="4"
          :autoplay="true"
          :loop="true"
          :dots="false"
          :autoplayHoverPause="true"
          :autoplayTimeout="5000"
          :margin="7"
          :autoplaySpeed="500"
          :navText="[btnPrev, btnNext]"
          :responsive="responsiveCarousel"
        >
          <CastCard
            v-for="(item, index) in dataCredit?.crew"
            :src="
              getPoster(
                item?.backdrop_path ? item?.backdrop_path : item?.poster_path
              )
            "
            :item="item"
            :index="index"
            :key="item.id"
            :loading="loading"
          />
        </carousel>
      </a-tab-pane>
    </a-tabs>

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
  onMounted,
  watch,
  createVNode,
  computed,
  h,
  getCurrentInstance,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import carousel from 'vue-owl-carousel/src/Carousel';
import {
  getAllGenresById,
  getPoster,
  getTvById,
  getMovieById,
  getLanguage,
  // getMovieByCredit,
  // getTvByCredit,
  addItemList,
  removeItemList,
  getList,
  // getMovieBySimilar,
  // getTrending,
} from '~/services/appMovieService';
import Interaction from '@/components/Normal/Interaction/Interaction.vue';
import RatingMovie from '@/components/Normal/RatingMovie/RatingMovie.vue';
import LastestEpisodes from '@/components/Normal/LastestEpisodes/LastestEpisodes.vue';
import CastCard from '@/components/Normal/CastCard/CastCard.vue';
import MovieSuggest from '@/components/Normal/MovieSuggest/MovieSuggest.vue';
import { useStore } from 'vuex';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import {
  Modal,
  // message
} from 'ant-design-vue';
import { removeVietnameseTones } from '~/utils/removeVietnameseTones';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useMeta } from 'vue-meta';

export default {
  components: {
    carousel,
    Interaction,
    RatingMovie,
    LastestEpisodes,
    CastCard,
    MovieSuggest,
    // QuestionCircleOutlined,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const genresName = ref([]);
    const isEpisodes = ref(false);
    const dataMovie = ref({});
    const dataCredit = ref([]);
    const dataAddToList = ref([]);
    const dataSimilar = ref([]);
    const dataRecommend = ref([]);
    const responsiveCarousel = ref({
      0: {
        items: 2,
      },
      520: {
        items: 3,
      },
      750: {
        items: 4,
      },
      830: {
        items: 4,
      },
      1000: {
        items: 5,
      },
      1175: {
        items: 6,
      },
      1300: {
        items: 6,
      },
      1400: {
        items: 7,
      },
      1500: {
        items: 8,
      },
      1700: {
        items: 9,
      },
      2000: {
        items: 10,
      },
      2200: {
        items: 12,
      },
    });
    const isOpenContent = ref(false);
    const isOpenTrailerYoutube = ref(false);
    const loading = ref(false);
    const srcBackdropList = ref([]);
    const isAddToList = ref(false);

    const btnPrev = ref('<i class="fa-solid fa-chevron-left"></i>');
    const btnNext = ref('<i class="fa-solid fa-chevron-right"></i>');
    const internalInstance = getCurrentInstance();

    const getData = () => {
      isAddToList.value = false;
      loading.value = true;

      internalInstance.appContext.config.globalProperties.$Progress.start();

      useMeta({
        title:
          '`Phimhay247 - Thông tin - ' +
          Array?.from(
            route.params?.name?.split('+'),
            (x) => x.charAt(0).toUpperCase() + x.slice(1)
          ).join(' ')
            ? '`Phimhay247 - Thông tin - ' +
              Array?.from(
                route.params?.name?.split('+'),
                (x) => x.charAt(0).toUpperCase() + x.slice(1)
              ).join(' ')
            : '`Phimhay247 - Thông tin - ' +
              Array?.from(
                route.params?.name?.split('+'),
                (x) => x.charAt(0).toUpperCase() + x.slice(1)
              ).join(' '),
        htmlAttrs: { lang: 'vi', amp: true },
      });

      // document.title = `${Array?.from(
      //   route.params?.name?.split('+'),
      //   (x) => x.charAt(0).toUpperCase() + x?.slice(1)
      // ).join(' ')} - Thông tin`;

      srcBackdropList.value = [];

      getTvById(route.params?.id, 'images,credits')
        .then((tvResponed) => {
          if (tvResponed?.data?.not_found === true)
            getMovieById(route.params?.id, 'images,credits')
              .then((movieResponed) => {
                isEpisodes.value = false;
                dataMovie.value = movieResponed?.data;
                dataCredit.value = movieResponed?.data?.credits;

                // movieResponed?.data?.images?.backdrops?.forEach((item) => {
                //   srcBackdropList.value.push(
                //     'https://image.tmdb.org/t/p/original' + item?.file_path
                //   );
                // });

                srcBackdropList.value = Array.from(
                  movieResponed?.data?.images?.backdrops,
                  (item) =>
                    'https://image.tmdb.org/t/p/original' + item?.file_path
                );

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
            dataCredit.value = tvResponed?.data?.credits;
            dataCredit.value = tvResponed?.data?.credits;

            // tvResponed?.data?.images?.backdrops?.forEach((item) => {
            //   srcBackdropList.value.push(
            //     'https://image.tmdb.org/t/p/original' + item?.file_path
            //   );
            // });

            srcBackdropList.value = Array.from(
              tvResponed?.data?.images?.backdrops,
              (item) => 'https://image.tmdb.org/t/p/original' + item?.file_path
            );

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

      // getMovieByCredit(isEpisodes.value ? 'tv' : 'movie', route.params?.id)
      //   .then((movieResponed) => {
      //     dataCredit.value = movieResponed?.data;
      //   })
      //   .catch((e) => {
      //     loading.value = false;
      //     if (axios.isCancel(e)) return;
      //   });

      if (store.state.isLogin) {
        getList(store.state?.userAccount?.id)
          .then((movieRespone) => {
            dataAddToList.value = movieRespone?.data?.items;

            dataAddToList.value?.map((item) => {
              if (item?.id == route.params?.id) {
                isAddToList.value = true;
              }
            });
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      }
    };

    onBeforeMount(() => {
      getData();
    });

    onMounted(() => {
      // getData();
    });

    const scrolltoTrailerYoutube = () => {
      const trailer_youtube = document.getElementById('trailer-youtube');
      trailer_youtube.scrollIntoView();
    };

    const handelAddToList = () => {
      if (!store.state.isLogin) {
        Modal.confirm({
          title: 'Bạn cần đăng nhập để sử dụng chức năng này.',
          icon: createVNode(QuestionCircleOutlined),
          // content: createVNode('div', 'Bạn có muốn đăng nhập không?'),
          content: createVNode('h3', {}, 'Đăng nhập ngay?'),
          okText: 'Có',
          okType: 'primary',
          cancelText: 'Không',
          onOk() {
            router.push({ path: '/login' });
          },
          onCancel() {},
          class: 'require-login-confirm',
        });
      } else {
        if (isAddToList.value == false) {
          ElMessageBox({
            title: 'Thông báo',
            message: h(
              'h3',
              null,
              'Bạn có muốn thêm phim vào danh sách theo dõi không?'
            ),
            showCancelButton: true,
            showClose: false,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonText = 'Đang thêm...';
                instance.confirmButtonLoading = true;
                addItemList(store.state?.userAccount?.id, {
                  media_type: isEpisodes.value ? 'tv' : 'movie',
                  media_id: dataMovie.value?.id,
                })
                  .then((response) => {
                    if (response.data.success == true) {
                      setTimeout(() => {
                        done();
                        setTimeout(() => {
                          isAddToList.value = true;
                          instance.confirmButtonLoading = false;
                        }, 300);
                      }, 2000);
                    } else {
                      ElMessage({
                        type: 'error',
                        message: `Thêm không thành công!`,
                      });
                    }
                  })
                  .catch((e) => {
                    isAddToList.value = false;
                    instance.confirmButtonLoading = false;
                    ElMessage({
                      type: 'error',
                      message: `Thêm không thành công!`,
                    });
                    if (axios.isCancel(e)) return;
                  });
              } else {
                done();
              }
            },
          }).then(() => {
            ElMessage({
              type: 'success',
              message: `Thêm thành công!`,
            });
          });

          // message.loading({ content: 'Đang thêm...', duration: 2 });
          // if (response.data.success == true) {
          //   setTimeout(() => {
          //     message.success({ content: 'Thêm thành công!', duration: 2 });
          //     isAddToList.value = true;
          //   }, 2200);
          // }
        } else {
          ElMessageBox({
            title: 'Thông báo',
            message: h(
              'h3',
              null,
              'Bạn có muốn xóa phim khỏi danh sách theo dõi không?'
            ),
            showCancelButton: true,
            showClose: false,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonText = 'Đang xóa...';
                instance.confirmButtonLoading = true;
                removeItemList(store.state?.userAccount?.id, {
                  media_id: dataMovie.value?.id,
                })
                  .then((response) => {
                    if (response.data.success == true) {
                      setTimeout(() => {
                        done();
                        setTimeout(() => {
                          isAddToList.value = false;
                          instance.confirmButtonLoading = false;
                        }, 300);
                      }, 2000);
                    } else {
                      ElMessage({
                        type: 'error',
                        message: `Xóa không thành công!`,
                      });
                    }
                  })
                  .catch((e) => {
                    isAddToList.value = true;
                    instance.confirmButtonLoading = false;
                    ElMessage({
                      type: 'error',
                      message: `Xóa không thành công!`,
                    });
                    if (axios.isCancel(e)) return;
                  });
              } else {
                done();
              }
            },
          }).then(() => {
            ElMessage({
              type: 'success',
              message: `Xóa thành công!`,
            });
          });

          // removeItemList(store.state?.userAccount?.id, {
          //   media_id: dataMovie.value?.id,
          // }).then((response) => {
          //   message.loading({ content: 'Đang xóa...', duration: 2 });

          //   if (response.data.success == true) {
          //     setTimeout(() => {
          //       message.success({ content: 'Xóa thành công!', duration: 2 });
          //       isAddToList.value = false;
          //     }, 2200);
          //   }
          // });
        }
      }
    };

    const handelRequireLogin = () => {
      router.push({ path: '/login' });
    };

    router.beforeEach((to) => {
      if (to.params.slug == 'info') {
        dataCredit.value = [];

        getData();
      }
    });

    // watch(isEpisodes, () => {
    //   getData();
    // });

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

    return {
      responsiveCarousel,
      srcBackdropList,
      genresName,
      isEpisodes,
      dataMovie,
      dataCredit,
      isOpenContent,
      isOpenTrailerYoutube,
      dataSimilar,
      dataRecommend,
      btnPrev,
      btnNext,
      loading,
      activeTabCast: ref('1'),
      isAddToList,
      checkEmptyDataMovies,
      getPoster,
      getAllGenresById,
      getLanguage,
      scrolltoTrailerYoutube,
      handelAddToList,
      handelRequireLogin,
      removeVietnameseTones,
    };
  },
};
</script>

<style lang="scss" src="./PrevPlayView.scss"></style>
