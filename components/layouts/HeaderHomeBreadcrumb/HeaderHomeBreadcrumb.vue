<template>
  <div
    class="header-home-breadcrumb"
    :class="{ scrolled: store.headerScrolled }"
  >
    <div class="header-home-breadcrumb-wrapper">
      <div class="breadcrumb-label">
        <slot name="label" />
      </div>
      <h1 class="breadcrumb-title">{{ genreTitle }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { genre } from '~/types';
import { getGenreById } from '~/services/genres';

const store = useStore();
const route = useRoute();
const genreTitle = ref<string>(
  route.params?.genre
    ? getGenreById(route.params.genre, store.allGenres)!.name_vietsub
    : 'Thể loại'
);
</script>

<style lang="scss" src="./HeaderHomeBreadcrumb.scss"></style>
