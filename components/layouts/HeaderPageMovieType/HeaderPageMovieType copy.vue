<template>
  <div
    class="header-page-type-movie"
    :class="{ scrolled: store.headerScrolled }"
  >
    <div class="header-page-type-movie-wrapper">
      <h1 class="header-page-type-movie-title">{{ title }}</h1>

      <el-dropdown
        trigger="hover"
        popper-class="header-page-type-movie-genre"
        placement="bottom-start"
        :show-timeout="0"
        :tabindex="-1"
      >
        <span class="el-dropdown-link genre" aria-label="dropdown-genre">
          {{ genreDropdownTitle }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
            />
          </svg>
        </span>

        <template #dropdown>
          <el-dropdown-menu class="dropdown-genre">
            <el-dropdown-item
              v-for="(item, index) in genres"
              :index="index"
              :key="index.toString()"
              @click="handleSelectGenre(item)"
            >
              <NuxtLink :to="{ query: { genre: item.id } }">
                <span>{{ item.name_vietsub }}</span>
              </NuxtLink>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { genre } from '~/types';
import { getGenreById } from '~/services/genres';

defineProps<{
  title: string;
}>();

const emits = defineEmits<{
  genSelected: [genSelected: genre];
}>();

const store = useStore();
const route = useRoute();
const genres = ref<genre[]>(store.allGenres);
const genreDropdownTitle = ref<string>(
  route.query?.genre
    ? getGenreById(route.query?.genre, store.allGenres)!.name_vietsub
    : 'Thể loại'
);

const handleSelectGenre = (item: genre) => {
  genreDropdownTitle.value = item.name_vietsub;
  emits('genSelected', item);
};
</script>

<style lang="scss" src="./HeaderPageMovieType.scss"></style>
