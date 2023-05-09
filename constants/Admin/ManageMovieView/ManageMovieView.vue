<template>
  <div class="managemovie-container">
    <div class="header-table">
      <h2>Quản lý phim: Phim lẻ</h2>

      <el-tooltip effect="dark" content="Thêm phim" placement="right">
        <el-button
          type="primary"
          :icon="PlusOutlined"
          circle
          size="large"
          @click="$router.push({ name: 'addmovie' })"
        />
      </el-tooltip>
    </div>
    <MovieTable />
  </div>
</template>

<script>
import MovieTable from '@/components/Admin/MovieTable/MovieTable.vue';
import { PlusOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    MovieTable,
  },
  setup() {
    return { PlusOutlined };
  },
};
</script>

<style lang="scss" scoped src="./ManageMovieView.scss"></style>
