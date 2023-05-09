<template>
  <div class="dashboard-container">
    <DashBoardTable />
  </div>
</template>

<script>
import DashBoardTable from '@/components/Admin/DashBoardTable/DashBoardTable.vue';

export default {
  components: {
    DashBoardTable,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped src="./DashBoardView.scss"></style>
