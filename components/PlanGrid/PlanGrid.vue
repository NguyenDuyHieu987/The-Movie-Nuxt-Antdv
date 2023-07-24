<template>
  <section class="plan-grid">
    <div class="plan-sider">
      <div
        v-for="(item, index) in plans"
        :key="index"
        :index="index"
        class="plan-box-selector"
        :class="{ selected: item.id == selected }"
        @click="selected = item.id"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>

    <div class="plan-body">
      <table class="plan-table">
        <thead class="plan-header">
          <tr>
            <th class="plan-feature price">Giá hàng tháng</th>
            <th class="plan-feature video-quality">Chất lượng video</th>
            <th class="plan-feature resolution">Độ phân giải</th>
            <th class="plan-feature support-devices">
              Các thiết bị bạn có thể dùng để xem
            </th>
          </tr>
        </thead>

        <tbody class="plan-grid-feature-table-body">
          <tr
            v-for="(item, index) in plans"
            :key="index"
            :index="index"
            :class="{ selected: item.id == selected }"
          >
            <td>{{ item.price }}</td>
            <td>{{ item.video_quality }}</td>
            <td>{{ item.resolution }}</td>
            <td>{{ item.support_devices }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getAllPlan } from '~/services/plans';
import axios from 'axios';
import type { plan } from '@/types';

const plans = ref<plan[]>([]);
const loading = ref<boolean>(false);
const selected = ref<string>('');

onBeforeMount(async () => {
  await nextTick();

  await useAsyncData(`plan/all`, () => getAllPlan())
    .then((response: any) => {
      plans.value = response.data.value?.results;
      selected.value = response.data.value?.results.find(
        (item: plan) => item.name == 'Cao cấp'
      ).id;
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style scoped lang="scss" src="./PlanGrid.scss"></style>
services/plans
