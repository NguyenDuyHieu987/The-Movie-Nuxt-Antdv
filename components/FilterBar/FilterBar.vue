<template>
  <a-collapse class="filter-bar" :bordered="false">
    <!-- ghost -->
    <template #expandIcon="{ isActive }">
      <CaretRightFilled :rotate="isActive ? 90 : 0" />
    </template>

    <a-collapse-panel key="1" header="Tìm kiếm nâng cao">
      <div class="filter-body">
        <div class="list-input-filter">
          <a-button
            class="filter-btn click-active"
            :disabled="disableBtnFilter"
            @click="handleFilterMovie"
          >
            Lọc phim
          </a-button>
          <!-- <ClientOnly>
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
          </ClientOnly> -->

          <a-select
            ref="select"
            v-model:value="formSelect.country"
            style="width: 150px"
            @change="handleChange"
            size="large"
            placeholder="Quốc gia"
          >
            <a-select-option v-if="formSelect.country == ''" value="">
              Quốc gia
            </a-select-option>

            <a-select-option
              v-for="(item, index) in countries"
              :index="index"
              :key="item?.iso_639_1"
              :value="item?.iso_639_1"
            >
              {{ item?.name }}
            </a-select-option>
          </a-select>

          <a-select
            ref="select"
            v-model:value="formSelect.year"
            style="width: 170px"
            @change="handleChange"
            size="large"
            placeholder="Năm phát hành"
          >
            <a-select-option v-if="formSelect.year == ''" value="">
              Năm phát hành
            </a-select-option>
            <a-select-option
              v-for="(item, index) in years"
              :index="index"
              :key="item?.name"
              :value="item?.name"
            >
              {{ item?.name }}
            </a-select-option>
          </a-select>

          <a-select
            ref="select"
            v-model:value="formSelect.genre"
            style="width: 170px"
            @change="handleChange"
            size="large"
            placeholder="Thể loại"
          >
            <a-select-option v-if="formSelect.genre == ''" value="">
              Thể loại
            </a-select-option>
            <a-select-option
              v-for="(item, index) in genres"
              :index="index"
              :key="item?.id"
              :value="item?.id"
            >
              {{ item?.name_vietsub }}
            </a-select-option>
          </a-select>

          <a-select
            ref="select"
            v-model:value="formSelect.sortBy"
            style="width: 170px"
            @change="handleChange"
            size="large"
            placeholder="Sắp xếp theo"
          >
            <a-select-option v-if="formSelect.sortBy == ''" value="">
              Sắp xếp theo
            </a-select-option>
            <a-select-option
              v-for="(item, index) in listSortBy"
              :index="index"
              :key="item?.id"
              :value="item?.id"
            >
              {{ item?.name }}
            </a-select-option>
          </a-select>

          <a-select
            ref="select"
            v-model:value="formSelect.type"
            style="width: 170px"
            @change="handleChange"
            size="large"
            placeholder="Tất cả"
          >
            <a-select-option value="all"> Tất cả </a-select-option>
            <a-select-option value="movieall"> Phim lẻ </a-select-option>
            <a-select-option value="tvall"> Phim bộ </a-select-option>
          </a-select>

          <a-button
            class="cancel-filter-btn click-active"
            :disabled="disableBtnFilter"
            danger
            @click="handleCancelFilter"
          >
            Hủy lọc
          </a-button>
        </div>
      </div>
      <template #extra>
        <!-- <Icon name="ic:sharp-filter-alt" /> -->

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6rem"
          height="1.6rem"
          viewBox="0 0 24 24"
        >
          <path d="M3 4c2.01 2.59 7 9 7 9v7h4v-7s4.98-6.41 7-9H3z" />
        </svg>
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import { FilterDataMovie } from '~/services/discover';
import { getAllGenre } from '~/services/genres';
import { getAllCountry } from '~/services/country';
import { getAllYear } from '~/services/year';
import { getAllSortBy } from '~/services/sortby';
import axios from 'axios';
import { CaretRightFilled } from '@ant-design/icons-vue';
import type { genre, country, year, sortby } from '@/types';

const emits = defineEmits<{
  dataFiltered: [data: any[], formSelect: any];
}>();

const props = defineProps<{
  cancelFilter: () => void;
}>();

const route: any = useRoute();
const genres = ref<genre[]>([]);
const years = ref<year[]>([]);
const countries = ref<country[]>([]);
const listSortBy = ref<sortby[]>([]);
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

watch(route, () => {
  resetFilter();
});

onBeforeMount(async () => {
  Promise.all([
    await useAsyncData(`genre/all`, () => getAllGenre()),
    await useAsyncData(`year/all`, () => getAllYear()),
    await useAsyncData(`country/all`, () => getAllCountry()),
    await useAsyncData(`sortby/all`, () => getAllSortBy()),
  ])
    .then((response: any) => {
      genres.value = response[0].data.value?.results;
      years.value = response[1].data.value?.results.sort(
        (a: year, b: year): number => {
          return +b.name.slice(-4) - +a.name.slice(-4);
        }
      );
      countries.value = response[2].data.value?.results;
      listSortBy.value = response[3].data.value?.results;
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

const handleFilterMovie = async () => {
  await useAsyncData(`discover/all/${formSelect}}`, () =>
    FilterDataMovie(formSelect)
  )
    .then((movieResponse) => {
      emits('dataFiltered', movieResponse?.data.value.results, formSelect);
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

const handleChange = () => {
  // console.log(formSelect);
};
</script>

<style lang="scss" src="./FilterBar.scss"></style>
