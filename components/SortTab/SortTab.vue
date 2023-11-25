<template>
  <div class="sort-tab">
    <div
      class="tab-item all"
      v-for="(item, index) in allTab"
      :class="{ active: activeTab == item.value }"
      :index="index"
      :key="item.value"
      @click="handleChangeTab(item.value)"
    >
      <span> {{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const allTab = ref<any[]>([
  { value: 'all', label: 'Tất cả' },
  { value: 'movie', label: 'Phim lẻ' },
  { value: 'tv', label: 'Phim bộ' },
]);
const activeTab = ref<string>('all');

const emits = defineEmits<{
  onChangeTab: [data: string];
}>();

const handleChangeTab = (value: string) => {
  if (activeTab.value == value) return;

  activeTab.value = value;

  emits('onChangeTab', value);
};
</script>

<style lang="scss" src="./SortTab.scss"></style>
