<template>
  <div class="managemovie-container">
    <div class="header-table">
      <h2>Quản lý phim: Phim bộ</h2>

      <el-tooltip effect="dark" content="Thêm phim" placement="right">
        <el-button
          type="primary"
          :icon="PlusOutlined"
          circle
          size="large"
          @click="$router.push({ name: 'addtv' })"
        />
      </el-tooltip>
    </div>
    <TVTable />
  </div>
</template>

<script>
import TVTable from '@/components/Admin/TVTable/TVTable.vue';
import { PlusOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    TVTable,
  },
  setup() {
    return { PlusOutlined };
  },
};
</script>

<style lang="scss" scoped src="./ManageTVView.scss"></style>
