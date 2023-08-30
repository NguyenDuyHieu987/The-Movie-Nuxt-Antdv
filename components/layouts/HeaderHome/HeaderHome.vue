<template>
  <div class="header-home">
    <div class="header-home-wrapper">
      <h1 class="header-home-title">{{ title }}</h1>

      <el-dropdown
        trigger="hover"
        popper-class="header-home-genre"
        placement="bottom-start"
        :show-timeout="0"
      >
        <span class="el-dropdown-link genre" aria-label="dropdown-genre">
          Thể loại

          <el-icon class="el-icon--right"> </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu class="dropdown-genre">
            <el-dropdown-item
              v-for="(item, index) in genres"
              :index="index"
              :key="index.toString()"
            >
              <span>{{ item.name_vietsub }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { genre } from '~/types';

defineProps<{
  title: string;
}>();

const store = useStore();
const genres = ref<genre[]>(store.allGenres);
</script>

<style lang="scss" src="./HeaderHome.scss"></style>
