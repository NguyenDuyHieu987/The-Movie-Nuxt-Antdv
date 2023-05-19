<template>
  <a-collapse :bordered="false">
    <!-- ghost -->
    <template #expandIcon="{ isActive }">
      <CaretRightFilled :rotate="isActive ? 90 : 0" />
    </template>

    <a-collapse-panel key="1" header="Tìm kiếm nâng cao">
      <div class="filter-bar">
        <div class="list-input-filter">
          <a-button
            class="filter-btn"
            :disabled="disableBtnFilter"
            @click="handleFilterMovie"
          >
            Lọc phim
          </a-button>
          <ClientOnly>
            <el-select
              ref="select"
              v-model="formSelect.country"
              style="width: 150px"
              @change="handleChange"
              size="large"
              placeholder="Quốc gia"
            >
              <el-option
                v-for="(item, index) in countries"
                :index="index"
                :key="item?.iso_639_1"
                :value="item?.iso_639_1"
                :label="item?.name"
              />
            </el-select>

            <el-select
              ref="select"
              v-model="formSelect.year"
              style="width: 170px"
              @change="handleChange"
              size="large"
              placeholder="Năm phát hành"
            >
              <el-option
                v-for="(item, index) in years"
                :index="index"
                :key="item?.name"
                :value="item?.name"
                :label="item?.name"
              />
            </el-select>

            <el-select
              ref="select"
              v-model="formSelect.genre"
              style="width: 170px"
              @change="handleChange"
              size="large"
              placeholder="Thể loại"
            >
              <el-option
                v-for="(item, index) in genres"
                :index="index"
                :key="item?.id"
                :value="item?.id"
                :label="item?.name_vietsub"
              />
            </el-select>

            <el-select
              ref="select"
              v-model="formSelect.sortBy"
              style="width: 170px"
              @change="handleChange"
              size="large"
              placeholder="Sắp xếp theo"
            >
              <el-option
                v-for="(item, index) in listSortBy"
                :index="index"
                :key="item?.id"
                :value="item?.id"
                :label="item?.name"
              />
            </el-select>

            <el-select
              ref="select"
              v-model="formSelect.type"
              style="width: 170px"
              @change="handleChange"
              size="large"
            >
              <el-option value="all" label="Tất cả" />
              <el-option value="movieall" label="Phim lẻ" />
              <el-option value="tvall" label="Phim bộ" />
            </el-select>
          </ClientOnly>

          <a-button
            class="cancel-filter-btn"
            :disabled="disableBtnFilter"
            @click="handleCancelFilter"
            :danger="true"
          >
            Hủy lọc
          </a-button>
        </div>
      </div>
      <template #extra>
        <Icon name="ic:sharp-filter-alt" />
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup>
import {
  getAllGenre,
  getAllNational,
  getAllYear,
  FilterDataMovie,
  getAllSortBy,
} from '@/services/MovieService';
import axios from 'axios';
// import listSortBy from '../constants/Sortby';
import { CaretRightFilled } from '@ant-design/icons-vue';

const emit = defineEmits('dataFiltered');
const props = defineProps({
  cancelFilter: {
    type: Function,
  },
});
const modelValue = defineModel();

// console.log(modelValue);

const route = useRoute();

const movieType = computed(() => {
  if (route.params?.slug?.includes('movie')) {
    if (route.params?.slug2?.replace('/', '') == 'all') {
      return 'movieall';
    } else {
      return 'movieall';
    }
  } else if (route.params?.slug?.includes('tv')) {
    if (route.params?.slug2?.replace('/', '') == 'all') {
      return 'tvall';
    } else {
      return 'tvall';
    }
  } else if (route.params?.slug == 'search') {
    return 'all';
  } else {
    return 'all';
  }
});

const formSelect = reactive({
  type: movieType.value,
  sortBy: '',
  genre: '',
  year: '',
  country: '',
  pageFilter: 1,
});

// const movieType = computed(() => route.params.slug.replace('/', ''));
// alert(movieType.value);

watch(route, () => {
  resetFilter();
});

const genres = ref([]);
const years = ref([]);
const countries = ref([]);
const listSortBy = ref([]);

onBeforeMount(async () => {
  Promise.all([
    await useAsyncData(`genre/all`, () => getAllGenre()),
    await useAsyncData(`year/all`, () => getAllYear()),
    await useAsyncData(`country/all`, () => getAllNational()),
    await useAsyncData(`sortby/all`, () => getAllSortBy()),
  ])
    .then((response) => {
      genres.value = response[0].data.value.data;
      years.value = response[1].data.value.data.sort((a, b) => {
        return +b.name.slice(-4) - +a.name.slice(-4);
      });
      countries.value = response[2].data.value.data;
      listSortBy.value = response[3].data.value.data;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
});

const disableBtnFilter = computed(
  () =>
    formSelect.type == movieType.value &&
    formSelect.sortBy == '' &&
    formSelect.genre == '' &&
    formSelect.year == '' &&
    formSelect.country == ''
);

const handleFilterMovie = () => {
  FilterDataMovie(formSelect)
    .then((movieResponse) => {
      emit('dataFiltered', movieResponse?.data?.results, formSelect);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });
};

const resetFilter = () => {
  formSelect.type = movieType.value;
  formSelect.sortBy = '';
  formSelect.genre = '';
  formSelect.year = '';
  formSelect.country = '';
};

const handleCancelFilter = () => {
  resetFilter();
  props.cancelFilter();
};
</script>

<style lang="scss" scoped src="./FilterBar.scss"></style>
